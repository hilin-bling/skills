/**
 * Modern PPT 技能测试脚本
 * 测试所有12种风格的基本生成能力
 */

const { ModernPPTUltimate, generateAllTemplates } = require('./scripts/modern-ppt-ultimate');
const path = require('path');

async function testBasicGeneration() {
    console.log('=== 测试 Modern PPT Ultimate 基本功能 ===\n');

    // 测试学术风格
    console.log('1. 测试学术蓝风格 (academic)...');
    try {
        const gen = new ModernPPTUltimate('academic');

        // 封面
        await gen.cover('基于深度学习的图像识别研究', '答辩人：张三 | 导师：李教授', '计算机科学与技术学院');
        console.log('   ✓ 封面页生成成功');

        // 提纲
        gen.outline('汇报提纲', [
            { num: '01', title: '研究背景与意义' },
            { num: '02', title: '文献综述' },
            { num: '03', title: '研究方法' },
            { num: '04', title: '实验设计与结果' },
            { num: '05', title: '结论与展望' }
        ]);
        console.log('   ✓ 提纲页生成成功');

        // 信息卡片
        gen.infoCards('研究背景', '研究意义与价值', [
            { icon: '📚', title: '理论意义', desc: '填补研究空白，完善理论体系' },
            { icon: '💡', title: '应用价值', desc: '解决实际问题，推动产业发展' },
            { icon: '🔬', title: '创新点', desc: '方法创新，提升识别精度' }
        ]);
        console.log('   ✓ 信息卡片页生成成功');

        // 数据统计
        gen.dataStats('实验结果', [
            { value: '96.5%', label: '准确率', change: '+3.2%', highlight: true },
            { value: '0.89', label: 'F1分数', change: '+0.05' },
            { value: '32M', label: '参数量' },
            { value: '15ms', label: '推理时间' }
        ]);
        console.log('   ✓ 数据统计页生成成功');

        // 结束页
        await gen.end('谢谢聆听', '敬请各位老师批评指正', 'zhangsan@university.edu');
        console.log('   ✓ 结束页生成成功');

        // 保存
        const outputPath = path.join(__dirname, 'test-output', 'academic-test.pptx');
        gen.save(outputPath);
        console.log(`   ✓ PPT保存成功: ${outputPath}`);

    } catch (error) {
        console.error('   ✗ 学术风格测试失败:', error.message);
    }

    console.log('\n2. 测试深空紫风格 (deepSpace)...');
    try {
        const gen = new ModernPPTUltimate('deepSpace');

        await gen.cover('AI产品发布会', '智创未来 · 科技赋能', '2024年度新品发布');
        gen.infoCards('产品定位', '核心亮点', [
            { icon: '🚀', title: '高效性能', desc: '处理速度提升300%' },
            { icon: '🛡️', title: '安全可靠', desc: '数据加密保护' },
            { icon: '🌐', title: '云端协同', desc: '多端实时同步' }
        ]);
        gen.dataStats('市场数据', [
            { value: '50万+', label: '活跃用户', highlight: true },
            { value: '99.9%', label: '系统可用性' },
            { value: '200+', label: '企业客户' }
        ]);
        await gen.end('感谢关注', '让我们一起创造未来');

        const outputPath = path.join(__dirname, 'test-output', 'deepspace-test.pptx');
        gen.save(outputPath);
        console.log('   ✓ 深空紫风格测试成功');

    } catch (error) {
        console.error('   ✗ 深空紫风格测试失败:', error.message);
    }

    console.log('\n3. 测试中国风风格 (chinese)...');
    try {
        const gen = new ModernPPTUltimate('chinese');

        await gen.cover('非遗文化传承项目', '匠心传承 · 文化永续', '传统文化保护与创新发展');
        gen.infoCards('项目背景', '文化价值', [
            { icon: '🏮', title: '非遗项目', desc: '保护传统技艺' },
            { icon: '🎊', title: '匠心大师', desc: '传承非遗精神' },
            { icon: '🧧', title: '创新传承', desc: '融合现代元素' }
        ]);
        await gen.end('感谢关注', '传承文化，延续匠心');

        const outputPath = path.join(__dirname, 'test-output', 'chinese-test.pptx');
        gen.save(outputPath);
        console.log('   ✓ 中国风风格测试成功');

    } catch (error) {
        console.error('   ✗ 中国风风格测试失败:', error.message);
    }

    console.log('\n=== 测试完成 ===');
}

async function testAllStyles() {
    console.log('\n=== 测试所有12种风格 ===\n');

    const styles = [
        'deepSpace', 'academic', 'playful', 'corporate',
        'tech', 'minimal', 'nature', 'vintage',
        'energetic', 'medical', 'finance', 'chinese'
    ];

    const outputDir = path.join(__dirname, 'test-output', 'all-styles');

    for (const style of styles) {
        try {
            const gen = new ModernPPTUltimate(style);
            await gen.cover(`${style} 风格演示`, 'Modern PPT Ultimate', '风格测试');
            gen.dataStats('数据展示', [
                { value: '100%', label: '完成度', highlight: true },
                { value: '12', label: '风格数' },
                { value: '40+', label: '页面类型' }
            ]);
            await gen.end('演示结束', '感谢观看');

            const outputPath = path.join(outputDir, `${style}-demo.pptx`);
            gen.save(outputPath);
            console.log(`✓ ${style} 风格生成成功`);
        } catch (error) {
            console.error(`✗ ${style} 风格生成失败:`, error.message);
        }
    }

    console.log('\n=== 所有风格测试完成 ===');
}

// 运行测试
testBasicGeneration()
    .then(() => testAllStyles())
    .catch(console.error);