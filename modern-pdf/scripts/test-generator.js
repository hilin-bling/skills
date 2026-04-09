/**
 * Test Generator - 测试 PDF 生成 v8.0
 *
 * 快速验证 PDF 生成功能，达到 Dribbble 顶级设计水准
 */

const path = require('path');
const fs = require('fs');
const { ModernPDFUltimate, STYLE_LIBRARY } = require('./modern-pdf-ultimate');

// 输出目录
const outputDir = path.join(__dirname, '..', 'output', 'test');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('========================================');
console.log('Modern PDF Ultimate v8.0 - Test Generator');
console.log('Dribbble-Grade Professional PDF Generator');
console.log('========================================');

// 测试风格列表（精选代表性风格）
const testStyles = [
    'academic',      // 学术蓝 - 专业严谨
    'aurora',        // 极光 - 创意梦幻
    'cyberpunk',     // 赛博朋克 - 霓虹科技
    'glass',         // 玻璃态 - 现代简约
    'monochrome',    // 单色大师 - 极简艺术
    'gradient',      // 渐变流 - 动态渐变
    'pastel',        // 柔和梦境 - 温馨浪漫
    'tech',          // 科技未来 - 前沿创新
    'corporate',     // 商务精英 - 专业干练
    'chinese'        // 中国风 - 传统典雅
];

let successCount = 0;
let failCount = 0;

testStyles.forEach(styleName => {
    console.log(`\nTesting style: ${styleName}`);

    try {
        const gen = new ModernPDFUltimate(styleName);
        const style = STYLE_LIBRARY[styleName];

        // 封面页
        gen.cover(
            `${style.name} Demo`,
            'Modern PDF Ultimate v8.0',
            'Dribbble-Grade Professional PDF'
        );

        // 目录页
        gen.toc([
            { num: '01', title: 'Introduction', page: 3 },
            { num: '02', title: 'Core Features', page: 4 },
            { num: '03', title: 'Performance', page: 5 },
            { num: '04', title: 'Timeline', page: 6 },
            { num: '05', title: 'Conclusion', page: 7 }
        ]);

        // 信息卡片页
        gen.infoCards('Core Features', [
            { icon: 'A', title: 'Gradient Backgrounds', desc: 'Beautiful gradient effects for covers' },
            { icon: 'B', title: 'Typography System', desc: '8-level font hierarchy system' },
            { icon: 'C', title: 'Decorative Elements', desc: 'Lines, dots, circles, triangles' },
            { icon: 'D', title: 'Data Visualization', desc: 'Charts, tables, timelines' }
        ]);

        // 数据统计页
        gen.dataStats('Performance Metrics', [
            { value: '99.9%', label: 'Accuracy', change: '+5.2%' },
            { value: '120ms', label: 'Response Time', change: '-12%' },
            { value: '50+', label: 'Page Types' }
        ]);

        // 时间线页
        gen.timeline('Project Timeline', [
            { date: '2024-01', title: 'Design Phase', desc: 'Initial planning and design' },
            { date: '2024-03', title: 'Development', desc: 'Core implementation' },
            { date: '2024-06', title: 'Testing', desc: 'Quality assurance' },
            { date: '2024-09', title: 'Launch', desc: 'Public release' }
        ]);

        // 结尾页
        gen.end('Thank You', 'Created with Modern PDF Ultimate v8.0', 'modern-pdf@example.com');

        // 保存
        const outputPath = path.join(outputDir, `${styleName}-demo.pdf`);
        gen.save(outputPath);

        console.log(`  Success! Pages: ${gen.pageCount}`);
        successCount++;

    } catch (err) {
        console.error(`  Error: ${err.message}`);
        failCount++;
    }
});

console.log('\n========================================');
console.log(`Test completed: ${successCount} passed, ${failCount} failed`);
console.log(`Output directory: ${outputDir}`);
console.log('========================================');