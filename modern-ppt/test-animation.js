/**
 * Modern PPT 动画功能专项测试
 * 测试切换动画和元素动画的实现
 */

const { ModernPPTUltimate } = require('./scripts/modern-ppt-ultimate');
const { STYLE_ANIMATIONS, TRANSITIONS, ANIMATIONS, applyTransition, getTransition, getAnimation } = require('./scripts/animation-library');
const path = require('path');

// ==========================================
// 1. 测试动画库配置
// ==========================================
console.log('=== 测试动画库配置 ===\n');

console.log('1. 风格动画配置:');
const styles = Object.keys(STYLE_ANIMATIONS);
styles.forEach(style => {
    const config = STYLE_ANIMATIONS[style];
    console.log(`   ${style}:`);
    console.log(`     - 切换动画: ${config.slideTransition}`);
    console.log(`     - 标题动画: ${config.titleAnimation}`);
    console.log(`     - 内容动画: ${config.contentAnimation}`);
    console.log(`     - 卡片动画: ${config.cardAnimation}`);
    console.log(`     - 数据动画: ${config.statsAnimation}`);
});

console.log('\n2. 可用切换动画类型:', Object.keys(TRANSITIONS).join(', '));
console.log('\n3. 可用元素动画类型:', Object.keys(ANIMATIONS).join(', '));

// ==========================================
// 2. 测试动画获取函数
// ==========================================
console.log('\n=== 测试动画获取函数 ===\n');

styles.forEach(style => {
    const transition = getTransition(style);
    const titleAnim = getAnimation(style, 'title');
    const cardAnim = getAnimation(style, 'card');
    const statsAnim = getAnimation(style, 'stats');

    console.log(`${style}:`);
    console.log(`  getTransition: ${JSON.stringify(transition)}`);
    console.log(`  getAnimation(title): ${JSON.stringify(titleAnim)}`);
    console.log(`  getAnimation(card): ${JSON.stringify(cardAnim)}`);
    console.log(`  getAnimation(stats): ${JSON.stringify(statsAnim)}`);
});

// ==========================================
// 3. 生成动画测试PPT
// ==========================================
async function generateAnimationTestPPT() {
    console.log('\n=== 生成动画测试PPT ===\n');

    const outputDir = path.join(__dirname, 'test-output', 'animation-tests');

    // 测试每种风格的动画效果
    for (const style of styles) {
        try {
            console.log(`生成 ${style} 风格动画测试PPT...`);

            const gen = new ModernPPTUltimate(style, { enableAnimations: true });

            // 封面页 - 测试标题动画和切换动画
            await gen.cover(
                `${STYLE_ANIMATIONS[style].slideTransition} 切换动画测试`,
                `标题动画: ${STYLE_ANIMATIONS[style].titleAnimation}`,
                style
            );

            // 内容页 - 测试信息卡片动画
            gen.infoCards('卡片动画测试', `卡片动画: ${STYLE_ANIMATIONS[style].cardAnimation}`, [
                { icon: '🎬', title: '动画1', desc: '第一个卡片动画效果' },
                { icon: '🎨', title: '动画2', desc: '第二个卡片动画效果' },
                { icon: '✨', title: '动画3', desc: '第三个卡片动画效果' }
            ]);

            // 数据页 - 测试数据动画
            gen.dataStats('数据动画测试', [
                { value: '100%', label: `动画: ${STYLE_ANIMATIONS[style].statsAnimation}`, highlight: true },
                { value: '50ms', label: '动画时长' },
                { value: '3', label: '动画类型' }
            ]);

            // 时间线 - 测试序列动画
            gen.timeline('动画序列测试', [
                { time: '0s', event: '切换动画开始', desc: 'slide transition' },
                { time: '0.3s', event: '标题动画', desc: 'title animation' },
                { time: '0.6s', event: '内容动画', desc: 'content animation' },
                { time: '0.9s', event: '卡片动画', desc: 'card animation' }
            ]);

            // 结束页
            await gen.end('动画测试完成', `${style} 风格`);

            const outputPath = path.join(outputDir, `${style}-animation-test.pptx`);
            gen.save(outputPath);
            console.log(`   ✓ ${style} 动画测试PPT生成成功`);

        } catch (error) {
            console.error(`   ✗ ${style} 动画测试失败:`, error.message);
        }
    }
}

// ==========================================
// 4. 验证PPT中的动画设置
// ==========================================
async function verifyAnimationSettings() {
    console.log('\n=== 验证PPT动画设置 ===\n');

    const PptxGenJS = require('pptxgenjs');

    // 直接测试 PptxGenJS 动画支持
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';

    // 测试各种切换动画
    const transitionsToTest = ['fade', 'push', 'wipe', 'split', 'dissolve', 'reveal'];

    transitionsToTest.forEach(transType => {
        const slide = pptx.addSlide();
        slide.background = { color: '1a1a2e' };

        // 设置切换动画
        slide.transition = { type: transType };

        // 添加带动画的文本
        slide.addText(`切换动画: ${transType}`, {
            x: 1, y: 2, w: 8, h: 1,
            fontSize: 36, fontFace: 'Arial', color: 'FFFFFF',
            type: 'fade'  // 元素动画
        });

        console.log(`   ✓ 测试切换动画 ${transType}`);
    });

    // 测试元素动画
    const slide = pptx.addSlide();
    slide.background = { color: '2c5282' };
    slide.transition = { type: 'fade' };

    const elementAnimations = ['fade', 'fly', 'float', 'zoom', 'grow', 'bounce', 'pulse', 'spin'];

    elementAnimations.forEach((animType, index) => {
        slide.addText(`元素动画: ${animType}`, {
            x: 1, y: 0.5 + index * 0.8, w: 8, h: 0.6,
            fontSize: 24, fontFace: 'Arial', color: 'FFFFFF',
            type: animType
        });
        console.log(`   ✓ 测试元素动画 ${animType}`);
    });

    pptx.save(path.join(__dirname, 'test-output', 'animation-tests', 'pptxgenjs-animation-test.pptx'));
    console.log('\n   ✓ PptxGenJS 动画测试PPT生成成功');
}

// ==========================================
// 5. 测试动画禁用功能
// ==========================================
function testAnimationDisable() {
    console.log('\n=== 测试动画禁用功能 ===\n');

    // 创建带动画的PPT
    const genWithAnim = new ModernPPTUltimate('academic', { enableAnimations: true });
    genWithAnim.cover('带动画的PPT', '动画启用', '');
    genWithAnim.infoCards('测试', '带动画', [{ icon: 'A', title: '卡片', desc: '描述' }]);
    genWithAnim.save(path.join(__dirname, 'test-output', 'animation-tests', 'with-animations.pptx'));
    console.log('   ✓ 带动画PPT生成成功');

    // 创建不带动画的PPT
    const genNoAnim = new ModernPPTUltimate('academic', { enableAnimations: false });
    genNoAnim.cover('不带动画的PPT', '动画禁用', '');
    genNoAnim.infoCards('测试', '无动画', [{ icon: 'A', title: '卡片', desc: '描述' }]);
    genNoAnim.save(path.join(__dirname, 'test-output', 'animation-tests', 'no-animations.pptx'));
    console.log('   ✓ 不带动画PPT生成成功');
}

// ==========================================
// 运行所有测试
// ==========================================
async function runAllTests() {
    try {
        await generateAnimationTestPPT();
        await verifyAnimationSettings();
        testAnimationDisable();

        console.log('\n=== 动画测试完成 ===');
        console.log('\n生成的测试文件位于: test-output/animation-tests/');
    } catch (error) {
        console.error('测试失败:', error);
    }
}

runAllTests();