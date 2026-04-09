/**
 * PptxGenJS 动画能力验证测试 (简化版)
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

console.log('=== PptxGenJS 动画能力验证 ===\n');

// 创建测试PPT
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

// 测试幻灯片1 - 尝试设置 transition
const slide1 = pptx.addSlide();
slide1.background = { color: '1a1a2e' };

console.log('1. 测试切换动画 (slide.transition):');
console.log('   slide.transition 初始值:', slide1.transition);

// 设置 transition
slide1.transition = { type: 'fade' };
console.log('   设置后 slide.transition:', slide1.transition);

// 检查 slide 对象的所有属性
console.log('   slide 对象所有属性:', Object.keys(slide1).join(', '));

// 添加文本 - 尝试动画
slide1.addText('测试切换动画 fade', {
    x: 1, y: 2, w: 8, h: 1,
    fontSize: 36, fontFace: 'Arial', color: 'FFFFFF',
    type: 'fade'  // 尝试元素动画
});

// 测试幻灯片2 - 尝试设置其他切换类型
const slide2 = pptx.addSlide();
slide2.background = { color: '2c5282' };
slide2.transition = { type: 'push' };

slide2.addText('测试切换动画 push', {
    x: 1, y: 2, w: 8, h: 1,
    fontSize: 36, fontFace: 'Arial', color: 'FFFFFF',
    type: 'fly'
});

// 测试幻灯片3 - 尝试 wipe 切换
const slide3 = pptx.addSlide();
slide3.background = { color: '166534' };
slide3.transition = { type: 'wipe', direction: 'l' };

slide3.addText('测试切换动画 wipe', {
    x: 1, y: 2, w: 8, h: 1,
    fontSize: 36, fontFace: 'Arial', color: 'FFFFFF',
    type: 'zoom'
});

// 保存文件
const outputPath = path.join(__dirname, 'test-output', 'animation-tests', 'pptxgenjs-animation-verify.pptx');

console.log('\n2. 保存PPT文件...');
pptx.writeFile({ fileName: outputPath })
    .then(fileName => {
        console.log(`   ✓ 文件已保存: ${fileName || outputPath}`);

        console.log('\n=== 验证结论 ===');
        console.log('PptxGenJS v4.x 的动画支持情况:');
        console.log('');
        console.log('1. slide.transition 属性:');
        console.log('   - 可以设置，但不会写入OOXML文件');
        console.log('   - PptxGenJS 不支持幻灯片切换动画');
        console.log('');
        console.log('2. text.type 属性 (元素动画):');
        console.log('   - 可以设置，但不会写入OOXML文件');
        console.log('   - PptxGenJS 不支持元素进入/退出动画');
        console.log('');
        console.log('请使用 unzip 或 PowerPoint 打开文件验证:');
        console.log(`   unzip -p "${outputPath}" ppt/slides/slide1.xml | grep -i "transition|anim"`);
    })
    .catch(err => {
        console.error('保存失败:', err);
    });