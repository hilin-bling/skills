/**
 * 多风格测试脚本 - 展示 18 种风格的优化效果
 */

const { ModernWordUltimate } = require('./modern-word-ultimate');
const path = require('path');
const fs = require('fs');

// 风格展示数据
const styleShowcase = {
    aurora: {
        title: '极光设计系统',
        subtitle: 'Aurora Design System'
    },
    cyberpunk: {
        title: '赛博朋克报告',
        subtitle: 'Cyberpunk Report'
    },
    glassmorphism: {
        title: '玻璃态提案',
        subtitle: 'Glassmorphism Proposal'
    },
    monochrome: {
        title: '黑白艺术画册',
        subtitle: 'Monochrome Art Book'
    },
    gradient: {
        title: '渐变流品牌手册',
        subtitle: 'Gradient Flow Brand Book'
    },
    pastel: {
        title: '柔和梦境产品目录',
        subtitle: 'Pastel Dream Catalog'
    },
    academic: {
        title: '学术论文模板',
        subtitle: 'Academic Paper Template'
    },
    corporate: {
        title: '企业年度报告',
        subtitle: 'Corporate Annual Report'
    },
    tech: {
        title: '科技产品白皮书',
        subtitle: 'Tech Product Whitepaper'
    },
    minimal: {
        title: '极简设计作品集',
        subtitle: 'Minimal Design Portfolio'
    },
    nature: {
        title: '自然环保报告',
        subtitle: 'Nature Conservation Report'
    },
    vintage: {
        title: '复古怀旧纪念册',
        subtitle: 'Vintage Memorial Book'
    },
    energetic: {
        title: '活力运动宣传册',
        subtitle: 'Energetic Sports Brochure'
    },
    medical: {
        title: '医疗健康科普',
        subtitle: 'Medical Health Guide'
    },
    finance: {
        title: '金融投资分析报告',
        subtitle: 'Finance Investment Analysis'
    },
    chinese: {
        title: '中国风文化展示',
        subtitle: 'Chinese Cultural Showcase'
    },
    creative: {
        title: '创意艺术提案',
        subtitle: 'Creative Art Proposal'
    },
    corporateStandard: {
        title: '企业标准合同',
        subtitle: 'Corporate Standard Contract'
    }
};

async function generateStyleShowcase(styleName) {
    const showcase = styleShowcase[styleName] || { title: '示例文档', subtitle: 'Sample Document' };

    const doc = new ModernWordUltimate(styleName, {
        headerText: showcase.title,
        footerText: `Modern Word v8.0 - ${styleName}`
    });

    // 封面页
    doc.cover(
        showcase.title,
        showcase.subtitle,
        '设计团队',
        'Modern Word Creator',
        new Date().toLocaleDateString('zh-CN')
    );

    // 目录
    doc.toc();

    // 第一章 - 设计理念
    doc.section('第一章 设计理念', 1);
    doc.paragraph('本文档展示了 Modern Word v8.0 的专业级设计能力，达到 Dribbble 顶级设计水准。每种风格都经过精心设计，包含完整的配色方案、装饰元素和排版参数。');
    doc.paragraph('我们注重每一个设计细节：从装饰线条的宽度到颜色的搭配，从标题的层级到段落的间距，都经过反复推敲和优化。');

    // 风格特点卡片
    doc.infoCards('风格特点', [
        { title: '配色方案', desc: '精心挑选的色彩搭配', icon: '🎨' },
        { title: '装饰元素', desc: '专业的线条和色块装饰', icon: '✨' },
        { title: '排版优化', desc: '针对中文阅读优化', icon: '📖' }
    ]);

    // 第二章 - 数据展示
    doc.section('第二章 数据展示', 1);

    doc.subsection('2.1 关键指标');
    doc.dataStats('项目数据统计', [
        { value: '18', label: '风格总数', highlight: true, sublabel: '种精选风格' },
        { value: '40+', label: '内容模板', sublabel: '专业组件' },
        { value: '100%', label: '中文支持', sublabel: '完整兼容' },
        { value: '5', label: '标题层级', sublabel: '完整层级' }
    ]);

    doc.subsection('2.2 功能对比');
    doc.table('功能对比表', [
        { feature: '风格支持', v6: '12种', v7: '18种', v8: '18种+' },
        { feature: '装饰线条', v6: '基础', v7: '增强', v8: '专业级' },
        { feature: '中文优化', v6: '一般', v7: '良好', v8: '完美' },
        { feature: '表格样式', v6: '基础', v7: '增强', v8: 'Dribbble级' }
    ], { headers: ['功能', 'v6.0', 'v7.0', 'v8.0'] });

    // 第三章 - 内容组件
    doc.section('第三章 内容组件', 1);

    doc.subsection('3.1 引用组件');
    doc.quote('设计不是看起来怎样或感觉怎样，设计是关于它如何工作的。', 'Steve Jobs');

    doc.subsection('3.2 列表组件');
    doc.list([
        '支持多种内容类型模板',
        '专业的数据可视化组件',
        '灵活的布局系统',
        '完整的中文排版支持'
    ], { ordered: true });

    doc.subsection('3.3 时间线组件');
    doc.timeline('发展历程', [
        { date: '2023 Q1', title: '项目启动', desc: '开始研发 Modern Word 生成器' },
        { date: '2023 Q3', title: 'v7.0 发布', desc: '支持18种风格，优化基础功能' },
        { date: '2025 Q1', title: 'v8.0 发布', desc: '达到 Dribbble 顶级设计水准' }
    ]);

    // 第四章 - 总结
    doc.section('第四章 总结', 1);

    doc.conclusion(
        ['成功实现了 Dribbble 顶级设计水准', '完整的中文排版优化支持', '18种精选视觉风格库'],
        ['增加图表和图像支持', '提供更多专业模板', '支持自定义风格创建']
    );

    // 参考文献
    doc.references([
        'Microsoft Word 官方文档. https://docs.microsoft.com/word',
        'docx 库文档. https://docx.js.org/',
        'Dribbble 设计趋势 2025. https://dribbble.com/'
    ]);

    // 结尾页
    doc.end('感谢阅读', '如有疑问请联系我们', 'hello@modernword.com');

    // 保存
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${styleName}-showcase.docx`);
    await doc.save(outputPath);

    return outputPath;
}

async function main() {
    const styles = Object.keys(styleShowcase);
    console.log(`开始生成 ${styles.length} 种风格的展示文档...\n`);

    for (const styleName of styles) {
        try {
            const outputPath = await generateStyleShowcase(styleName);
            console.log(`[${styleName}] 已生成: ${outputPath}`);
        } catch (error) {
            console.error(`[${styleName}] 生成失败:`, error.message);
        }
    }

    console.log('\n所有风格展示文档已生成完成！');
}

main();