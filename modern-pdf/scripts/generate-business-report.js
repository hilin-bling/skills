/**
 * 商务报告场景生成脚本
 * 生成一个完整的年度工作总结 PDF 文档
 */

const { ModernPDFUltimate } = require('./modern-pdf-ultimate');
const path = require('path');

async function generateBusinessReport() {
    console.log('========================================');
    console.log('商务报告 PDF 生成器');
    console.log('========================================\n');

    const gen = new ModernPDFUltimate('corporate');

    // 封面
    gen.cover(
        '2024年度工作总结',
        '技术研发部 | 汇报人：王经理',
        '砥砺前行，共创未来'
    );

    // 目录
    gen.toc([
        { num: '01', title: '年度概览', page: 3 },
        { num: '02', title: '关键业绩', page: 4 },
        { num: '03', title: '项目回顾', page: 5 },
        { num: '04', title: '团队建设', page: 6 },
        { num: '05', title: '问题与挑战', page: 7 },
        { num: '06', title: '明年规划', page: 8 }
    ]);

    // 执行摘要
    gen.executiveSummary('年度概览',
        '2024年技术研发部在公司战略指导下，圆满完成各项年度目标。团队规模稳定增长至15人，项目交付率达到98%，技术创新成果显著。全年完成12个重大项目，获得3项技术创新奖，为公司业务发展提供了坚实的技术支撑。核心系统可用性达99.2%，效率提升45%。'
    );

    // 关键业绩指标 - 数据统计
    gen.dataStats('关键业绩指标', [
        { value: '¥2,580万', label: '项目产值', change: '+35%', highlight: true },
        { value: '156个', label: '交付功能', change: '+28%' },
        { value: '99.2%', label: '系统可用性' },
        { value: '45%', label: '效率提升', change: '+15%' }
    ]);

    // 重点项目回顾 - 表格
    gen.table('重点项目回顾', [
        { name: 'CRM系统升级', status: '已完成', result: '提前2周交付' },
        { name: '数据中台建设', status: '已完成', result: '按期上线' },
        { name: '移动APP重构', status: '已完成', result: '用户增长50%' },
        { name: '安全合规改造', status: '已完成', result: '通过等保三级' }
    ], ['项目名称', '状态', '成果']);

    // 团队建设 - 组织架构图
    gen.orgChart('团队建设', {
        root: { name: '研发部', title: '15人' },
        children: [
            { name: '前端组', title: '4人' },
            { name: '后端组', title: '6人' },
            { name: '测试组', title: '3人' },
            { name: '运维组', title: '2人' }
        ]
    });

    // 问题与挑战 - 信息卡片
    gen.infoCards('问题与挑战', [
        { icon: '⚠️', title: '需求变更频繁', desc: '建立变更管理流程' },
        { icon: '🔧', title: '技术债务累积', desc: '制定重构计划' },
        { icon: '👥', title: '人员流动', desc: '完善培养机制' }
    ]);

    // 明年规划 - 时间线
    gen.timeline('2025年规划', [
        { date: 'Q1', title: '架构优化', desc: '核心系统重构' },
        { date: 'Q2', title: 'AI平台建设', desc: '智能化升级' },
        { date: 'Q3', title: '技术输出', desc: '开源项目发布' },
        { date: 'Q4', title: '创新孵化', desc: '新技术探索' }
    ]);

    // 结尾页
    gen.end('谢谢', '新的一年，再创佳绩', 'wangmanager@company.com');

    // 保存文件
    const outputPath = path.join(__dirname, '..', 'output', 'corporate-annual-report.pdf');
    gen.save(outputPath);

    console.log('✓ 商务报告已生成: ' + outputPath);
    console.log('📄 共 10 页，商务精英风格');
    console.log('========================================\n');
}

module.exports = { generateBusinessReport };

// 直接运行
if (require.main === module) {
    generateBusinessReport().catch(console.error);
}