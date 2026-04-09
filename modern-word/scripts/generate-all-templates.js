/**
 * 批量生成所有风格模板脚本
 *
 * 运行方式：
 * node scripts/generate-all-templates.js
 */

const path = require('path');
const fs = require('fs');
const { generateAllTemplates, ModernWordUltimate, STYLE_LIBRARY } = require('./modern-word-ultimate');

// 输出目录
const outputDir = path.join(__dirname, '..', 'assets', 'templates');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 生成所有模板
async function main() {
    console.log('========================================');
    console.log('Modern Word Ultimate v7.0');
    console.log('批量生成所有风格模板');
    console.log('========================================\n');

    console.log(`输出目录: ${outputDir}\n`);

    try {
        const results = await generateAllTemplates(outputDir);

        console.log('\n========================================');
        console.log('生成完成！模板列表：');
        console.log('========================================\n');

        results.forEach(({ styleName, filePath }) => {
            const style = STYLE_LIBRARY[styleName];
            console.log(`[${styleName}] ${style.name} - ${filePath}`);
        });

        console.log('\n共计生成 ' + results.length + ' 个文档模板');

    } catch (error) {
        console.error('生成失败:', error.message);
        console.error(error.stack);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    main();
}

module.exports = { main, generateAllTemplates };