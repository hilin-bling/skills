/**
 * 技术文档场景生成脚本
 * 生成一个完整的 API 技术白皮书 PDF 文档
 */

const { ModernPDFUltimate } = require('./modern-pdf-ultimate');
const path = require('path');

async function generateTechDoc() {
    console.log('========================================');
    console.log('技术文档 PDF 生成器');
    console.log('========================================\n');

    const gen = new ModernPDFUltimate('tech');

    // 封面
    gen.cover(
        'NeuralAI',
        '下一代智能助手技术白皮书',
        'Redefine Intelligence'
    );

    // 目录
    gen.toc([
        { num: '01', title: '产品概述', page: 3 },
        { num: '02', title: '痛点分析', page: 4 },
        { num: '03', title: '解决方案', page: 5 },
        { num: '04', title: '技术架构', page: 6 },
        { num: '05', title: 'API文档', page: 7 },
        { num: '06', title: '代码示例', page: 8 },
        { num: '07', title: '性能指标', page: 9 },
        { num: '08', title: '应用场景', page: 10 },
        { num: '09', title: '定价方案', page: 11 }
    ]);

    // 产品概述
    gen.heading('产品概述', 1);
    gen.body('NeuralAI 是下一代智能助手平台，基于自主研发的大语言模型，为企业提供智能化解决方案。平台支持多模态交互、知识管理、自动化流程等核心能力，帮助企业提升效率、降低成本。');

    // 痛点分析 - 信息卡片
    gen.infoCards('痛点分析', [
        { icon: '⏰', title: '效率低下', desc: '重复性工作占60%时间' },
        { icon: '🔄', title: '信息孤岛', desc: '多系统数据不互通' },
        { icon: '📊', title: '决策困难', desc: '缺乏数据支撑' },
        { icon: '💰', title: '成本高昂', desc: '人工成本持续上涨' }
    ]);

    // 解决方案 - 信息卡片
    gen.infoCards('解决方案', [
        { icon: '🤖', title: 'AI Agent', desc: '自主完成任务执行' },
        { icon: '🔗', title: '智能集成', desc: '一键连接所有系统' },
        { icon: '📈', title: '数据洞察', desc: '实时分析辅助决策' },
        { icon: '⚡', title: '效率提升', desc: '10倍工作效率增长' }
    ]);

    // 技术架构
    gen.architecture('技术架构', [
        { name: '应用层', components: ['Web App', 'Mobile App', 'API Gateway'] },
        { name: '服务层', components: ['AI Engine', 'Data Pipeline', 'Auth Service'] },
        { name: '基础层', components: ['Kubernetes', 'GPU Cluster', 'Object Storage'] }
    ]);

    // API 概览
    gen.apiOverview('API概览', [
        { method: 'POST', path: '/v1/chat', desc: '对话交互接口' },
        { method: 'POST', path: '/v1/complete', desc: '文本补全接口' },
        { method: 'GET', path: '/v1/models', desc: '模型列表查询' },
        { method: 'POST', path: '/v1/embed', desc: '文本向量生成' }
    ]);

    // 代码示例
    gen.codeBlock('代码示例', {
        language: 'Python',
        code: `import neuralai

# 创建客户端
client = neuralai.Client(api_key="your_key")

# 发送对话请求
response = client.chat(
    messages=[
        {"role": "user", "content": "帮我分析销售数据"}
    ]
)
print(response.content)`
    });

    // 性能指标
    gen.dataStats('性能指标', [
        { value: '<100ms', label: '响应延迟' },
        { value: '99.99%', label: '服务可用性' },
        { value: '10B+', label: '参数规模' },
        { value: '50+', label: '支持语言' }
    ]);

    // 应用场景
    gen.useCases('应用场景', [
        { industry: '金融', scenarios: ['智能客服', '风控分析', '报告生成'] },
        { industry: '医疗', scenarios: ['病历分析', '辅助诊断', '药物研发'] },
        { industry: '教育', scenarios: ['智能批改', '个性化学习', '内容生成'] }
    ]);

    // 定价方案
    gen.pricing('定价方案', [
        { name: 'Starter', price: '¥99/月', features: ['5K请求/月', '基础模型', '邮件支持'] },
        { name: 'Pro', price: '¥499/月', features: ['50K请求/月', '高级模型', '优先支持'], recommended: true },
        { name: 'Enterprise', price: '定制', features: ['无限请求', '私有部署', '专属服务'] }
    ]);

    // 结尾页
    gen.end('Thank You', 'The Future is Now', 'hello@neuralai.com');

    // 保存文件
    const outputPath = path.join(__dirname, '..', 'output', 'tech-api-documentation.pdf');
    gen.save(outputPath);

    console.log('✓ 技术文档已生成: ' + outputPath);
    console.log('📄 共 11 页，科技未来风格');
    console.log('========================================\n');
}

module.exports = { generateTechDoc };

// 直接运行
if (require.main === module) {
    generateTechDoc().catch(console.error);
}