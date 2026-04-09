const { ModernPPTPro, ELEGANT_THEMES, generateAllThemes } = require('./modern-ppt-pro');
const path = require('path');

const desktop = process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, 'Desktop')
    : path.join(process.env.HOME || '/tmp', 'Desktop');

// 选择5种主题
const themes = [
    { key: 'deepSpace', name: '深空紫' },
    { key: 'midnight', name: '午夜蓝' },
    { key: 'roseGold', name: '玫瑰金' },
    { key: 'aurora', name: '极光绿' },
    { key: 'neoPurple', name: '暗夜紫粉' }
];

async function generateAll() {
    console.log('开始生成5种风格PPT模板...\n');

    for (const theme of themes) {
        console.log(`生成主题: ${theme.name}`);

        const gen = new ModernPPTPro(theme.key);

        await gen.cover('产品汇报', 'V1.0 版本', '遇见更好的自己');

        gen.infoCards('产品定位', '智能服务平台', [
            { icon: '🚀', title: '快速部署', desc: '一键启动服务' },
            { icon: '🔒', title: '安全可靠', desc: '企业级安全保障' },
            { icon: '📊', title: '数据分析', desc: '实时数据监控' },
            { icon: '🎯', title: '精准定位', desc: '智能推荐系统' }
        ]);

        gen.timeline('版本规划', [
            { title: '需求分析', desc: '用户调研' },
            { title: '设计开发', desc: '敏捷迭代' },
            { title: '测试上线', desc: '质量保障' },
            { title: '运营优化', desc: '数据驱动' }
        ]);

        gen.featureList('核心功能', [
            { name: '智能分析', items: ['数据可视化', '趋势预测', '异常检测', '报告生成'] },
            { name: '用户管理', items: ['权限控制', '角色分配', '操作日志'] },
            { name: '系统集成', items: ['API接口', '第三方对接', '数据同步'] }
        ]);

        gen.statusList('功能状态', [
            { text: '核心模块开发完成', status: 'done' },
            { text: '用户认证系统', status: 'done' },
            { text: '数据报表功能', status: 'done' },
            { text: '性能优化待完成', status: 'pending' },
            { text: '移动端适配', status: 'pending' }
        ]);

        gen.platforms('平台覆盖', [
            { name: 'Web端', count: '完整功能', devices: ['Chrome', 'Firefox', 'Safari', 'Edge'] },
            { name: '移动端', count: 'iOS/Android', devices: ['iOS 14+', 'Android 10+'] },
            { name: '桌面端', count: '跨平台', devices: ['Windows', 'macOS', 'Linux'] }
        ], '全平台覆盖，统一体验');

        gen.prepStatus('上线准备', [
            { name: '技术准备', items: [
                { text: '服务器部署', done: true },
                { text: '数据库迁移', done: true },
                { text: '性能测试', done: false }
            ]},
            { name: '运营准备', items: [
                { text: '用户手册', done: true },
                { text: '培训材料', done: false },
                { text: '客服支持', done: true }
            ]},
            { name: '合规准备', items: [
                { text: '隐私政策', done: true },
                { text: '安全评估', done: true },
                { text: '备案审批', done: false }
            ]}
        ]);

        gen.roadmap('发展规划', [
            { name: '🎯 短期目标', items: ['功能完善', '用户体验优化', '性能提升', 'Bug修复'] },
            { name: '📈 中期规划', items: ['市场拓展', '生态建设', '合作伙伴'] },
            { name: '🌟 长期愿景', items: ['行业领先', '技术创新', '全球化'] }
        ]);

        await gen.end('谢谢', '期待与您的合作', 'contact@example.com');

        gen.save(path.join(desktop, `PPT_${theme.name}.pptx`));
        console.log(`完成: ${theme.name}\n`);
    }

    console.log('---');
    console.log('全部模板生成完成！');
    console.log('文件位置:', desktop);
}

generateAll().catch(console.error);