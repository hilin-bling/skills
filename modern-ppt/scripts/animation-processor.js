/**
 * 动画处理器 - 后处理注入动画 XML
 *
 * 通过修改 PPTX 内的 XML 文件添加切换动画和元素动画
 * 支持 Windows (PowerShell) 和跨平台 (Node.js)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const {
    generateTransitionXML,
    generateElementAnimationXML,
    generateCompoundAnimationXML,
    generateTimingXML,
    generateAppearAnimationXML,
    ENTRANCE_ANIMATIONS,
    EMPHASIS_ANIMATIONS
} = require('./animation-engine');
const { ANIMATION_TEMPLATES, STYLE_TEMPLATE_MAPPING } = require('./animation-library');

// ==========================================
// 切换动画 XML 模板（简化版）
// ==========================================
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
    split: (speed = 'med', orient = 'horz', dir = 'out') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:split orient="${orient}" dir="${dir}"/></p:transition>`,
    zoom: (speed = 'med', dir = 'in') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:zoom dir="${dir}"/></p:transition>`,
    circle: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:circle/></p:transition>`,
    diamond: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:diamond/></p:transition>`,
    wedge: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wedge/></p:transition>`,
    wheel: (speed = 'med', spokes = 4) => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wheel spokes="${spokes}"/></p:transition>`,
    newsflash: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:newsflash/></p:transition>`,
    blinds: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:blinds orient="${orient}"/></p:transition>`,
    checker: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:checker orient="${orient}"/></p:transition>`,
    comb: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:comb orient="${orient}"/></p:transition>`,
    random: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:random/></p:transition>`
};

// ==========================================
// 从 XML 中提取元素 ID
// ==========================================
function extractShapeIds(slideXml) {
    const shapeIds = [];
    const regex = /<p:sp[^>]*>[\s\S]*?<p:nvSpPr>\s*<p:cNvPr[^>]*id="(\d+)"[^>]*name="([^"]*)"/g;
    let match;

    while ((match = regex.exec(slideXml)) !== null) {
        const id = parseInt(match[1]);
        const name = match[2];
        // 跳过背景形状和装饰形状
        if (!name.includes('Shape 0') && id > 1) {
            shapeIds.push({ id, name });
        }
    }

    return shapeIds;
}

// ==========================================
// 生成切换动画 XML
// ==========================================
function getTransitionXML(transitionType, speed = 'med') {
    const template = TRANSITION_XML[transitionType];
    if (template) {
        return template(speed);
    }
    return TRANSITION_XML.fade(speed);
}

// ==========================================
// Windows 平台处理函数
// ==========================================
function processPPTXWindows(inputPath, outputPath, options = {}) {
    const {
        animationTemplate = 'professional',
        styleName = 'deepSpace',
        slideTypes = []  // 每个幻灯片的类型 ['cover', 'content', 'content', 'end']
    } = options;

    // 获取动画模板
    const templateName = STYLE_TEMPLATE_MAPPING[styleName] || animationTemplate;
    const template = ANIMATION_TEMPLATES[templateName] || ANIMATION_TEMPLATES.professional;

    const baseDir = path.dirname(inputPath);
    const tempDir = path.join(baseDir, `temp_anim_${Date.now()}`);
    const slidesDir = path.join(tempDir, 'ppt', 'slides');
    const zipPath = inputPath.replace('.pptx', '_temp.zip');
    const outputZipPath = outputPath.replace('.pptx', '_out.zip');

    try {
        // 1. 复制为 ZIP
        fs.copyFileSync(inputPath, zipPath);

        // 2. 解压
        const psUnzip = `Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force`;
        execSync(psUnzip, { shell: 'powershell.exe', encoding: 'utf8' });

        // 3. 处理每个幻灯片
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

                // 添加切换动画
                const transitionConfig = template.transitions[slideType] || template.transitions.default || { type: 'fade', speed: 'med' };
                const transitionXml = getTransitionXML(transitionConfig.type, transitionConfig.speed);

                // 移除已有的 transition
                content = content.replace(/<p:transition[^>]*>[\s\S]*?<\/p:transition>/g, '');

                // 在 </p:spTree> 后添加 transition (在 </p:cSld> 之前)
                if (content.includes('</p:spTree>')) {
                    content = content.replace('</p:spTree>', `</p:spTree>\n    ${transitionXml}`);
                }

                // 添加简化的元素动画（仅appear，兼容性好）
                if (template.elements && !slideType.includes('cover') && !slideType.includes('end')) {
                    const shapeIds = extractShapeIds(content);

                    if (shapeIds.length > 0) {
                        const animations = [];
                        let delay = 300; // 初始延迟
                        let idCounter = 3; // 起始ID

                        // 只对前几个可见元素添加appear动画
                        const maxElements = Math.min(shapeIds.length, 6);
                        for (let i = 0; i < maxElements; i++) {
                            const shape = shapeIds[i];
                            // 跳过装饰性元素（通常id较小）
                            if (shape.id <= 2) continue;

                            animations.push(generateAppearAnimationXML(shape.id, delay, idCounter));
                            idCounter += 10; // 每个动画占用10个id
                            delay += 200; // 级联延迟
                        }

                        if (animations.length > 0) {
                            const timingXml = generateTimingXML(animations);

                            // 移除已有的 timing
                            content = content.replace(/<p:timing[^>]*>[\s\S]*?<\/p:timing>/g, '');

                            // 在 </p:sld> 前添加 timing
                            content = content.replace('</p:sld>', `    ${timingXml}\n</p:sld>`);
                        }
                    }
                }

                fs.writeFileSync(slidePath, content, 'utf8');
            });
        }

        // 4. 重新打包
        const psZip = `Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outputZipPath}' -Force`;
        execSync(psZip, { shell: 'powershell.exe', encoding: 'utf8' });

        // 5. 重命名为 .pptx
        if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        fs.renameSync(outputZipPath, outputPath);

        // 6. 清理
        fs.unlinkSync(zipPath);
        const psCleanup = `Remove-Item -Path '${tempDir}' -Recurse -Force`;
        execSync(psCleanup, { shell: 'powershell.exe', encoding: 'utf8' });

        return { success: true, message: '动画注入成功' };
    } catch (error) {
        console.error('处理失败:', error.message);
        // 清理临时文件
        try {
            if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
            if (fs.existsSync(outputZipPath)) fs.unlinkSync(outputZipPath);
            execSync(`Remove-Item -Path '${tempDir}' -Recurse -Force`, { shell: 'powershell.exe' });
        } catch (e) { }

        return { success: false, message: error.message };
    }
}

// ==========================================
// 为所有生成的 PPT 添加动画
// ==========================================
function addAnimationsToAll(directory, template = 'moderate') {
    const styleFiles = {
        'PPT_深空紫.pptx': 'deepSpace',
        'PPT_学术蓝.pptx': 'academic',
        'PPT_可爱童趣.pptx': 'playful',
        'PPT_商务精英.pptx': 'corporate',
        'PPT_科技未来.pptx': 'tech',
        'PPT_极简主义.pptx': 'minimal',
        'PPT_自然绿意.pptx': 'nature',
        'PPT_复古怀旧.pptx': 'vintage',
        'PPT_活力橙黄.pptx': 'energetic',
        'PPT_医疗健康.pptx': 'medical',
        'PPT_金融财经.pptx': 'finance',
        'PPT_中国风.pptx': 'chinese'
    };

    console.log('\n========================================');
    console.log('为 PPT 添加炫酷动画');
    console.log(`模板: ${template}`);
    console.log('========================================\n');

    const results = [];

    Object.entries(styleFiles).forEach(([filename, style]) => {
        const inputPath = path.join(directory, filename);

        if (fs.existsSync(inputPath)) {
            const tempPath = path.join(directory, `temp_${filename}`);
            fs.copyFileSync(inputPath, tempPath);

            const result = processPPTXWindows(tempPath, inputPath, {
                animationTemplate: template,
                styleName: style,
                slideTypes: ['cover', 'content', 'content', 'content', 'end']
            });

            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }

            if (result.success) {
                results.push({ file: filename, success: true });
                console.log(`  ✓ ${filename} - 动画注入成功`);
            } else {
                results.push({ file: filename, success: false });
                console.log(`  ✗ ${filename} - ${result.message}`);
            }
        } else {
            console.log(`  - ${filename} - 文件不存在`);
        }
    });

    console.log('\n========================================');
    const successCount = results.filter(r => r.success).length;
    console.log(`完成: ${successCount}/${results.length} 个文件成功添加动画`);
    console.log('========================================\n');

    return results;
}

// ==========================================
// 单文件处理函数
// ==========================================
function addAnimationsToFile(inputPath, outputPath, options = {}) {
    return processPPTXWindows(inputPath, outputPath || inputPath, options);
}

// ==========================================
// 命令行入口
// ==========================================
function main() {
    const args = process.argv.slice(2);
    const template = args[0] || 'moderate';

    const desktop = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    addAnimationsToAll(desktop, template);
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    processPPTXWindows,
    addAnimationsToAll,
    addAnimationsToFile,
    extractShapeIds,
    getTransitionXML,
    TRANSITION_XML
};

// 直接运行
if (require.main === module) {
    main();
}