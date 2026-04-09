/**
 * 测试脚本 - 验证 Modern Word v8.0 生成效果
 */

const { ModernWordUltimate, generateAllTemplates } = require('./modern-word-ultimate');
const path = require('path');

async function testSingleStyle() {
    console.log('开始测试单个风格文档生成...\n');

    // 使用学术蓝风格
    const doc = new ModernWordUltimate('academic', {
        headerText: '现代Word文档测试',
        footerText: 'Modern Word v8.0'
    });

    // 封面页
    doc.cover(
        '现代Word文档生成器',
        'Dribbble 顶级设计水准测试',
        '张三',
        '创新科技研究院',
        '2025年3月30日'
    );

    // 目录
    doc.toc();

    // 第一章 - 风格概述
    doc.section('第一章 项目概述', 1);
    doc.paragraph('本项目旨在创建一个现代化的Word文档生成器，支持18种精心设计的视觉风格，达到Dribbble顶级设计水准。通过使用docx库，我们可以生成高质量、专业的Word文档，适用于各种场景。');
    doc.paragraph('现代文档设计需要注重排版细节、色彩搭配和视觉层次。一个好的文档不仅内容丰富，还要具有良好的阅读体验。');

    doc.subsection('1.1 核心特性');
    doc.paragraph('支持18种精选视觉风格，包括极光、赛博朋克、玻璃态等现代设计风格。每种风格都经过精心设计，包含完整的配色方案和排版参数。');

    // 信息卡片
    doc.infoCards('核心特性一览', [
        { title: '18种风格', desc: '精心设计的视觉风格库', icon: '🎨' },
        { title: '中文优化', desc: '针对中文排版进行深度优化', icon: '📝' },
        { title: '专业表格', desc: '支持隔行变色和装饰线条', icon: '📊' }
    ]);

    // 第二章 - 数据展示
    doc.section('第二章 数据展示', 1);

    doc.subsection('2.1 关键指标');
    doc.dataStats('项目关键指标', [
        { value: '18', label: '风格数量', highlight: true },
        { value: '40+', label: '内容模板' },
        { value: '100%', label: '中文支持' }
    ]);

    doc.subsection('2.2 性能对比');
    doc.table('性能对比数据', [
        { name: '传统Word', speed: '较慢', quality: '一般', features: '基础' },
        { name: 'Modern Word v7', speed: '较快', quality: '良好', features: '丰富' },
        { name: 'Modern Word v8', speed: '极快', quality: '顶级', features: '全面' }
    ], { headers: ['方案', '速度', '质量', '功能'] });

    // 第三章 - 引用与结论
    doc.section('第三章 总结', 1);

    doc.quote('好的设计是显而易见的，伟大的设计是透明的。', 'Joe Sparano');

    doc.conclusion(
        ['Modern Word v8.0 实现了Dribbble顶级设计水准', '支持完整的中文排版优化', '提供了丰富的内容组件'],
        ['继续优化暗色主题效果', '增加更多专业模板', '支持图表和图像插入']
    );

    // 参考文献
    doc.references([
        'Microsoft Word 官方文档. https://docs.microsoft.com/word',
        'docx 库文档. https://docx.js.org/',
        'Dribbble 设计趋势 2025. https://dribbble.com/'
    ]);

    // 结尾页
    doc.end('感谢阅读', '如有问题请联系', 'support@modernword.com');

    // 保存文档
    const outputPath = path.join(__dirname, 'test-output.docx');
    await doc.save(outputPath);
    console.log(`\n测试文档已生成: ${outputPath}`);
}

async function main() {
    try {
        await testSingleStyle();
        console.log('\n测试完成！');
    } catch (error) {
        console.error('测试失败:', error);
    }
}

main();