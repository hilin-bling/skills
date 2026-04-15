/**
 * 学术报告场景生成脚本
 * 生成一个完整的论文答辩风格 PDF 文档
 */

const { ModernPDFUltimate } = require('./modern-pdf-ultimate');
const path = require('path');

async function generateAcademicReport() {
    console.log('========================================');
    console.log('学术报告 PDF 生成器');
    console.log('========================================\n');

    const gen = new ModernPDFUltimate('academic');

    // 封面
    gen.cover(
        '基于深度学习的图像识别研究',
        '答辩人：张三 | 导师：李教授',
        '计算机科学与技术学院 | 2024年6月'
    );

    // 目录
    gen.toc([
        { num: '01', title: '研究背景与意义', page: 3 },
        { num: '02', title: '文献综述', page: 4 },
        { num: '03', title: '研究方法', page: 5 },
        { num: '04', title: '实验设计与结果', page: 6 },
        { num: '05', title: '方法对比', page: 7 },
        { num: '06', title: '结论与展望', page: 8 },
        { num: '07', title: '参考文献', page: 9 }
    ]);

    // 汇报提纲
    gen.outline('汇报提纲', [
        { num: '01', title: '研究背景与意义' },
        { num: '02', title: '文献综述' },
        { num: '03', title: '研究方法' },
        { num: '04', title: '实验设计与结果' },
        { num: '05', title: '结论与展望' }
    ]);

    // 研究背景 - 信息卡片
    gen.infoCards('研究背景', [
        { icon: '📚', title: '理论意义', desc: '填补深度学习图像识别研究空白' },
        { icon: '💡', title: '应用价值', desc: '解决实际场景中的识别难题' },
        { icon: '🔬', title: '创新点', desc: '提出新的网络架构设计' },
        { icon: '📊', title: '预期成果', desc: '论文发表与专利申请' }
    ]);

    // 文献综述
    gen.literature('文献综述', [
        { author: 'He et al. (2016)', content: 'ResNet残差网络，解决深层网络训练问题' },
        { author: 'Vaswani et al. (2017)', content: 'Transformer架构，开创注意力机制新范式' },
        { author: 'Dosovitskiy et al. (2020)', content: 'Vision Transformer，将Transformer应用于视觉任务' },
        { author: 'Liu et al. (2021)', content: 'Swin Transformer，层次化视觉Transformer' }
    ]);

    // 研究方法
    gen.methodology('研究方法', [
        { title: '数据准备', desc: '构建大规模图像数据集并进行预处理' },
        { title: '模型设计', desc: '设计新型网络架构和训练策略' },
        { title: '实验验证', desc: '在多个基准数据集上进行实验对比' },
        { title: '结果分析', desc: '分析性能指标并验证有效性' }
    ]);

    // 实验结果 - 数据统计
    gen.dataStats('实验结果', [
        { value: '96.5%', label: '准确率', change: '+3.2%', highlight: true },
        { value: '0.89', label: 'F1分数' },
        { value: '12ms', label: '推理时间', change: '-40%' },
        { value: '95.2%', label: '召回率' }
    ]);

    // 方法对比 - 表格
    gen.table('方法对比', [
        { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M', time: '15ms' },
        { method: 'ViT-Base', accuracy: '94.3%', params: '86M', time: '25ms' },
        { method: 'Swin-T', accuracy: '95.1%', params: '28M', time: '18ms' },
        { method: '本文方法', accuracy: '96.5%', params: '32M', time: '12ms' }
    ], ['方法', '准确率', '参数量', '推理时间']);

    // 结论与展望
    gen.conclusion('结论与展望',
        [
            '提出了一种新的图像识别方法，结合CNN和Transformer优势',
            '在多个数据集上取得了领先的识别准确率',
            '模型参数量适中，推理速度快，适合实际部署'
        ],
        [
            '进一步优化模型结构，探索轻量化方案',
            '扩展到更多视觉任务（检测、分割）',
            '在移动端和边缘设备上进行部署验证'
        ]
    );

    // 结尾页
    gen.end('谢谢聆听', '敬请各位老师批评指正', 'zhangsan@university.edu.cn');

    // 保存文件
    const outputPath = path.join(__dirname, '..', 'output', 'academic-thesis-defense.pdf');
    gen.save(outputPath);

    console.log('✓ 学术报告已生成: ' + outputPath);
    console.log('📄 共 10 页，学术蓝风格');
    console.log('========================================\n');
}

module.exports = { generateAcademicReport };

// 直接运行
if (require.main === module) {
    generateAcademicReport().catch(console.error);
}