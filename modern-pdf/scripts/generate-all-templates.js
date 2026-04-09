/**
 * Generate All Templates - 批量生成所有风格模板
 *
 * 运行方式：
 * node scripts/generate-all-templates.js
 */

const path = require('path');
const fs = require('fs');
const { generateAllTemplates, STYLE_LIBRARY } = require('./modern-pdf-ultimate');

// 输出目录
const outputDir = path.join(__dirname, '..', 'output');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('========================================');
console.log('Modern PDF Ultimate v7.0 - Template Generator');
console.log('========================================');
console.log(`Output directory: ${outputDir}`);
console.log(`Generating ${Object.keys(STYLE_LIBRARY).length} style templates...`);
console.log('');

// 运行生成
generateAllTemplates(outputDir)
    .then(results => {
        console.log('Generation Results:');
        console.log('----------------------------------------');

        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);

        successful.forEach(r => {
            console.log(`✓ ${r.style}: ${r.path}`);
        });

        if (failed.length > 0) {
            console.log('');
            console.log('Failed:');
            failed.forEach(r => {
                console.log(`✗ ${r.style}: ${r.error}`);
            });
        }

        console.log('');
        console.log('----------------------------------------');
        console.log(`Total: ${results.length} templates`);
        console.log(`Success: ${successful.length}`);
        console.log(`Failed: ${failed.length}`);
        console.log('========================================');
    })
    .catch(err => {
        console.error('Error:', err.message);
        process.exit(1);
    });