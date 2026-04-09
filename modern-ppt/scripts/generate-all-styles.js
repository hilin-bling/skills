/**
 * 生成所有12种风格的PPT模板
 */

const { ModernPPTUltra, STYLE_LIBRARY, generateAllStyles } = require('./modern-ppt-ultra');
const path = require('path');

const desktop = process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'Desktop')
    : path.join(process.env.HOME || '/tmp', 'Desktop');

async function main() {
    console.log('========================================');
    console.log('Modern PPT Generator - 12种风格模板');
    console.log('========================================\n');

    const results = await generateAllStyles(desktop);

    console.log('\n========================================');
    console.log('生成结果汇总');
    console.log('========================================\n');

    const success = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'error');

    console.log(`成功: ${success.length} 个`);
    success.forEach(r => console.log(`  ✓ ${r.name} -> ${r.path}`));

    if (failed.length > 0) {
        console.log(`\n失败: ${failed.length} 个`);
        failed.forEach(r => console.log(`  ✗ ${r.name}: ${r.error}`));
    }

    console.log('\n========================================');
    console.log('文件位置:', desktop);
    console.log('========================================');
}

main().catch(console.error);