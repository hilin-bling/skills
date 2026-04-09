/**
 * 生成所有12种风格PPT模板
 * 每种风格有独特的内容和布局
 */

const { generateAllTemplates, TEMPLATE_CONTENT } = require('./modern-ppt-ultimate');
const path = require('path');

const desktop = process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'Desktop')
    : path.join(process.env.HOME || '/tmp', 'Desktop');

async function main() {
    console.log('==============================================');
    console.log('Modern PPT Generator Ultimate');
    console.log('12种风格 · 独特内容 · 专属布局');
    console.log('==============================================\n');

    console.log('风格列表:');
    Object.keys(TEMPLATE_CONTENT).forEach((key, i) => {
        const t = TEMPLATE_CONTENT[key];
        console.log(`  ${String(i + 1).padStart(2)}. ${t.name} - ${t.scenario}`);
    });
    console.log('');

    const results = await generateAllTemplates(desktop);

    console.log('\n==============================================');
    console.log('生成结果');
    console.log('==============================================\n');

    const success = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'error');

    console.log(`✓ 成功: ${success.length} 个`);
    success.forEach(r => console.log(`    ${r.name}`));

    if (failed.length > 0) {
        console.log(`\n✗ 失败: ${failed.length} 个`);
        failed.forEach(r => console.log(`    ${r.name}: ${r.error}`));
    }

    console.log('\n==============================================');
    console.log(`输出目录: ${desktop}`);
    console.log('==============================================');
}

main().catch(console.error);