/**
 * Modern PPT 分层动画系统测试
 *
 * 测试新的动画后端架构：
 * - COMBackend: Windows + PowerPoint（最佳效果）
 * - XMLBackend: 跨平台（基础动画）
 * - NullBackend: 降级方案
 */

const path = require('path');
const { ModernPPTUltimate } = require('./scripts/modern-ppt-ultimate');
const AnimationFacade = require('./scripts/animation-facade');

const outputDir = path.join(__dirname, 'test-output', 'animation-v2');

console.log('=== Modern PPT 分层动画系统测试 ===\n');

// 检查可用后端
const facade = new AnimationFacade();
console.log('可用后端:');
facade.getAvailableBackends().forEach(b => {
    console.log(`  - ${b.name}: ${b.description}`);
});
console.log(`\n高级动画支持: ${facade.hasPremiumAnimations() ? '是 (COM可用)' : '否 (仅基础动画)'}`);
console.log('');

// ==========================================
// 测试函数
// ==========================================
async function testWithBackend(backendName, styleName = 'deepSpace') {
    console.log(`\n--- 测试后端: ${backendName} ---`);

    try {
        const gen = new ModernPPTUltimate(styleName, {
            animationTemplate: 'extreme',
            enableAnimations: true,
            animationBackend: backendName
        });

        // 封面页
        await gen.cover(
            '炫酷动画演示',
            `后端: ${backendName}`,
            'Modern PPT v5.0'
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
            { value: '200+', label: '企业客户' }
        ]);

        // 结束页
        await gen.end('感谢观看', '欢迎体验');

        // 保存
        const outputPath = path.join(outputDir, `${backendName}-demo.pptx`);
        await gen.save(outputPath);

        console.log(`  ✓ 成功: ${outputPath}`);
        return { backend: backendName, success: true };

    } catch (error) {
        console.error(`  ✗ 失败: ${error.message}`);
        return { backend: backendName, success: false, error: error.message };
    }
}

// ==========================================
// 运行测试
// ==========================================
async function runTests() {
    const fs = require('fs');

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const results = [];

    // 测试所有后端
    const backends = ['com', 'xml', 'null'];

    for (const backend of backends) {
        const result = await testWithBackend(backend, 'deepSpace');
        results.push(result);
    }

    // 自动选择测试
    console.log('\n--- 测试自动选择 ---');
    try {
        const gen = new ModernPPTUltimate('tech', {
            animationTemplate: 'extreme',
            enableAnimations: true
            // 不指定后端，自动选择
        });

        await gen.cover('自动选择测试', '最佳后端', 'Auto Select');
        gen.infoCards('测试', '自动', [{ icon: '✓', title: '成功', desc: '测试通过' }]);
        await gen.end('完成', '');

        const outputPath = path.join(outputDir, 'auto-select-demo.pptx');
        await gen.save(outputPath);

        results.push({ backend: 'auto', success: true });
        console.log(`  ✓ 自动选择测试成功`);
    } catch (error) {
        results.push({ backend: 'auto', success: false, error: error.message });
        console.error(`  ✗ 自动选择测试失败: ${error.message}`);
    }

    // 总结
    console.log('\n========================================');
    console.log('测试结果总结');
    console.log('========================================');

    const successCount = results.filter(r => r.success).length;
    console.log(`成功: ${successCount}/${results.length}`);

    results.forEach(r => {
        console.log(`  ${r.success ? '✓' : '✗'} ${r.backend}${r.error ? ': ' + r.error : ''}`);
    });

    console.log('\n========================================');
    console.log('验证方法:');
    console.log('1. 使用 PowerPoint 打开生成的 PPT 文件');
    console.log('2. 进入"幻灯片放映"查看动画效果');
    console.log('3. 观察切换动画是否炫酷流畅');
    console.log(`\n输出目录: ${outputDir}`);
    console.log('========================================');
}

runTests().catch(console.error);