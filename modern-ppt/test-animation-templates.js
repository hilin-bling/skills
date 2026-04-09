/**
 * Modern PPT 炫酷动画测试脚本
 *
 * 测试三套动画模板的效果：
 * - professional: 专业简洁（商务汇报）
 * - moderate: 适度炫酷（产品展示）
 * - extreme: 极致炫酷（发布会）
 */

const path = require('path');
const { ModernPPTUltimate } = require('./scripts/modern-ppt-ultimate');
const { ANIMATION_TEMPLATES, getTemplateNames } = require('./scripts/animation-library');

const outputDir = path.join(__dirname, 'test-output', 'animation-templates');

console.log('=== Modern PPT 炫酷动画测试 ===\n');

// 显示可用的动画模板
console.log('可用动画模板:');
getTemplateNames().forEach(name => {
    const template = ANIMATION_TEMPLATES[name];
    console.log(`  - ${name}: ${template.displayName} - ${template.description}`);
});
console.log('');

// ==========================================
// 测试函数
// ==========================================
async function testAnimationTemplate(templateName, styleName = 'deepSpace') {
    console.log(`\n--- 测试模板: ${templateName} (风格: ${styleName}) ---`);

    try {
        const gen = new ModernPPTUltimate(styleName, {
            animationTemplate: templateName,
            enableAnimations: true
        });

        // 封面页
        await gen.cover(
            `动画模板演示`,
            `${ANIMATION_TEMPLATES[templateName].displayName}`,
            templateName
        );

        // 信息卡片页
        gen.infoCards('核心功能', '产品亮点', [
            { icon: '🚀', title: '高效性能', desc: '处理速度提升300%' },
            { icon: '🛡️', title: '安全可靠', desc: '企业级数据保护' },
            { icon: '🌐', title: '云端协同', desc: '多端实时同步' }
        ]);

        // 数据统计页
        gen.dataStats('市场数据', [
            { value: '50万+', label: '活跃用户', change: '+120%', highlight: true },
            { value: '99.9%', label: '系统可用性' },
            { value: '200+', label: '企业客户', change: '+50' }
        ]);

        // 时间线页
        gen.timeline('发展历程', [
            { time: '2021', event: '项目启动', desc: '团队成立，开始研发' },
            { time: '2022', event: '产品上线', desc: '首个版本发布' },
            { time: '2023', event: '快速增长', desc: '用户突破10万' },
            { time: '2024', event: '行业领先', desc: '市场占有率第一' }
        ]);

        // 结束页
        await gen.end('感谢观看', '欢迎体验', 'contact@example.com');

        // 保存（会自动注入动画）
        const outputPath = path.join(outputDir, `${templateName}-demo.pptx`);
        await gen.save(outputPath);

        console.log(`  ✓ 成功生成: ${outputPath}`);
        return { template: templateName, success: true };

    } catch (error) {
        console.error(`  ✗ 失败: ${error.message}`);
        return { template: templateName, success: false, error: error.message };
    }
}

// ==========================================
// 运行测试
// ==========================================
async function runTests() {
    const results = [];

    // 测试三套模板
    for (const templateName of ['professional', 'moderate', 'extreme']) {
        const result = await testAnimationTemplate(templateName, 'deepSpace');
        results.push(result);
    }

    // 测试不同风格使用不同模板
    console.log('\n--- 测试风格-模板映射 ---');

    const styleTests = [
        { style: 'academic', expectedTemplate: 'professional' },
        { style: 'playful', expectedTemplate: 'extreme' },
        { style: 'tech', expectedTemplate: 'extreme' },
        { style: 'corporate', expectedTemplate: 'professional' }
    ];

    for (const test of styleTests) {
        const result = await testAnimationTemplate(
            ANIMATION_TEMPLATES[STYLE_TEMPLATE_MAPPING[test.style]]?.name || 'professional',
            test.style
        );
        results.push(result);
    }

    // 总结
    console.log('\n========================================');
    console.log('测试结果总结');
    console.log('========================================');

    const successCount = results.filter(r => r.success).length;
    console.log(`成功: ${successCount}/${results.length}`);

    results.forEach(r => {
        console.log(`  ${r.success ? '✓' : '✗'} ${r.template}`);
    });

    console.log('\n========================================');
    console.log('验证方法:');
    console.log('1. 使用 PowerPoint 打开生成的 PPT 文件');
    console.log('2. 点击"幻灯片放映"查看动画效果');
    console.log('3. 或点击"切换"和"动画"选项卡查看设置');
    console.log(`\n输出目录: ${outputDir}`);
    console.log('========================================');
}

// 需要导入 STYLE_TEMPLATE_MAPPING
const { STYLE_TEMPLATE_MAPPING } = require('./scripts/animation-library');

runTests().catch(console.error);