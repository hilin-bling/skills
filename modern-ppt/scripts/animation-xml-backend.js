/**
 * XML后端 - OOXML后处理动画注入
 *
 * 跨平台方案，通过修改PPTX内的XML文件添加动画
 * 支持简单的切换动画
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ANIMATION_TEMPLATES, STYLE_TEMPLATE_MAPPING } = require('./animation-library');

// 切换动画 XML 模板
const TRANSITION_XML = {
    fade: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:fade/></p:transition>`,
    fadeThroughBlack: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:fade thruBlk="true"/></p:transition>`,
    push: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="${dir}"/></p:transition>`,
    pushLeft: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="l"/></p:transition>`,
    pushRight: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="r"/></p:transition>`,
    wipe: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="${dir}"/></p:transition>`,
    wipeLeft: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="l"/></p:transition>`,
    wipeRight: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="r"/></p:transition>`,
    dissolve: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:dissolve/></p:transition>`,
    zoom: (speed = 'med', dir = 'in') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:zoom dir="${dir}"/></p:transition>`,
    circle: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:circle/></p:transition>`,
    wedge: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wedge/></p:transition>`,
    newsflash: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:newsflash/></p:transition>`,
    wheel: (speed = 'med', spokes = 4) => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wheel spokes="${spokes}"/></p:transition>`
};

class XMLAnimationBackend {
    constructor() {
        this.name = 'xml';
        this.description = 'OOXML Backend (cross-platform, basic animations)';
    }

    /**
     * 始终可用（跨平台）
     */
    isAvailable() {
        return true;
    }

    /**
     * 获取切换动画XML
     */
    _getTransitionXML(type, speed = 'med') {
        const template = TRANSITION_XML[type];
        if (template) {
            return template(speed);
        }
        return TRANSITION_XML.fade(speed);
    }

    /**
     * 应用动画（仅切换动画）
     */
    applyAnimations(inputPath, outputPath, options = {}) {
        const { template = {}, slideTypes = [] } = options;

        // 获取模板配置
        const templateName = template.name || 'professional';
        const transitions = template.transitions || {};

        const baseDir = path.dirname(inputPath);
        const tempDir = path.join(baseDir, `temp_xml_${Date.now()}`);
        const slidesDir = path.join(tempDir, 'ppt', 'slides');
        const zipPath = inputPath.replace('.pptx', '_temp.zip');
        const outputZipPath = outputPath.replace('.pptx', '_out.zip');

        try {
            // 1. 复制为ZIP
            fs.copyFileSync(inputPath, zipPath);

            // 2. 解压
            if (process.platform === 'win32') {
                const psUnzip = `Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force`;
                execSync(psUnzip, { shell: 'powershell.exe', encoding: 'utf8' });
            } else {
                execSync(`unzip -o "${zipPath}" -d "${tempDir}"`, { encoding: 'utf8' });
            }

            // 3. 处理幻灯片
            if (fs.existsSync(slidesDir)) {
                const slideFiles = fs.readdirSync(slidesDir)
                    .filter(f => f.match(/^slide\d+\.xml$/))
                    .sort((a, b) => {
                        const numA = parseInt(a.match(/\d+/)[0]);
                        const numB = parseInt(b.match(/\d+/)[0]);
                        return numA - numB;
                    });

                slideFiles.forEach((slideFile, index) => {
                    const slidePath = path.join(slidesDir, slideFile);
                    let content = fs.readFileSync(slidePath, 'utf8');

                    // 获取幻灯片类型
                    const slideType = slideTypes[index] || 'content';

                    // 获取切换配置
                    const transConfig = transitions[slideType] || transitions.default || { type: 'fade', speed: 'med' };
                    const transitionXml = this._getTransitionXML(transConfig.type, transConfig.speed);

                    // 移除已有的transition
                    content = content.replace(/<p:transition[^>]*>[\s\S]*?<\/p:transition>/g, '');

                    // 添加新的transition
                    if (content.includes('</p:spTree>')) {
                        content = content.replace('</p:spTree>', `</p:spTree>\n    ${transitionXml}`);
                    }

                    fs.writeFileSync(slidePath, content, 'utf8');
                });
            }

            // 4. 重新打包
            if (process.platform === 'win32') {
                const psZip = `Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outputZipPath}' -Force`;
                execSync(psZip, { shell: 'powershell.exe', encoding: 'utf8' });
            } else {
                execSync(`cd "${tempDir}" && zip -r "${outputZipPath}" .`, { encoding: 'utf8' });
            }

            // 5. 重命名
            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }
            fs.renameSync(outputZipPath, outputPath);

            // 6. 清理
            fs.unlinkSync(zipPath);
            if (process.platform === 'win32') {
                execSync(`Remove-Item -Path '${tempDir}' -Recurse -Force`, { shell: 'powershell.exe' });
            } else {
                execSync(`rm -rf "${tempDir}"`, { encoding: 'utf8' });
            }

            return { success: true };
        } catch (error) {
            // 清理
            try {
                if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
                if (fs.existsSync(outputZipPath)) fs.unlinkSync(outputZipPath);
            } catch (e) { }

            return { success: false, reason: error.message };
        }
    }
}

module.exports = XMLAnimationBackend;
module.exports.TRANSITION_XML = TRANSITION_XML;