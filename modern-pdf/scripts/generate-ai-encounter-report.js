/**
 * AI奇遇APP产品汇报 - PDF文档生成脚本
 * 使用 tech 未来风格
 */

const { ModernPDFUltimate } = require('./modern-pdf-ultimate');

async function generatePDF() {
    console.log('生成 PDF 文档...');

    const gen = new ModernPDFUltimate('tech');

    // 封面
    gen.cover('AI奇遇APP产品汇报', 'V1.0版本 | 产品部', '2024年3月');

    // 目录
    gen.toc([
        { num: '01', title: '开发周期与团队' },
        { num: '02', title: '首页交互优化' },
        { num: '03', title: '机型覆盖测试' },
        { num: '04', title: '功能模块测试' },
        { num: '05', title: '上线准备情况' },
        { num: '06', title: '产品规划' }
    ]);

    // 第一章：开发周期与团队
    gen.heading('一、开发周期与团队', 1);

    gen.body('自2月7日至今，共计投入2后端、3前端、1测试、1产品，共计7人。');

    gen.heading('版本发布历程', 2);
    gen.table('版本发布记录', [
        { date: '3月17日', version: 'V1.0.0', desc: '首次发布' },
        { date: '3月20日', version: 'V1.0.1', desc: '修复字体显示异常' },
        { date: '3月26日', version: 'V1.0.2', desc: '重构首页交互' }
    ]);

    // 第二章：首页交互优化
    gen.heading('二、首页交互优化', 1);

    gen.body('当前界面交互，有待进一步优化，前端技术实现难度较大。计划参考友商进行优化：');

    gen.infoCards('友商交互方案', [
        { title: '青藤之恋', desc: '手动点击切换内容，上下滑动显示详情' },
        { title: '牵手', desc: '左右滑动切换内容，上下滑动查看主页信息' }
    ]);

    // 第三章：机型覆盖测试
    gen.heading('三、机型覆盖测试', 1);

    gen.heading('Android测试机型', 2);
    gen.table('Android设备测试', [
        { brand: 'vivo', model: 'U1', system: 'Android 13' },
        { brand: '小米', model: 'MI PLAY', system: 'Android 8.1.0' },
        { brand: '华为', model: 'JKM-AL00a', system: 'HarmonyOS 2.0' },
        { brand: '华为', model: 'Mate 80', system: 'HarmonyOS 6.0' },
        { brand: '华为', model: 'MATE 60 PRO', system: 'HarmonyOS 4.2' },
        { brand: '小米', model: '小米14', system: 'HyperOS 1.0' },
        { brand: 'OPPO', model: 'Find X7', system: 'Android 16' },
        { brand: '荣耀', model: 'Honor 100 Pro', system: 'MagicOS 10.0' }
    ]);

    gen.heading('iOS测试机型', 2);
    gen.table('iOS设备测试', [
        { model: 'iPhone XR', system: 'iOS 18.7.6' },
        { model: 'iPhone 6s', system: 'iOS 15.8.6' },
        { model: 'iPhone 11', system: 'iOS 26.3 / 15.4.1' },
        { model: 'iPhone 15', system: 'iOS 26.3.1' },
        { model: 'iPhone 15 Pro', system: 'iOS 26.3.1' },
        { model: 'iPhone 17', system: 'iOS 26.3.1' }
    ]);

    // 第四章：功能模块测试
    gen.heading('四、功能模块测试', 1);

    gen.heading('功能测试汇总', 2);
    gen.table('功能模块测试结果', [
        { module: '路书', status: '基本通过', note: '部分华为机型图片加载慢' },
        { module: '结伴', status: '通过', note: '发布、朋友圈分享正常' },
        { module: '消息', status: '通过', note: '聊天、举报、AI协助正常' },
        { module: '个人中心', status: '通过', note: '资料编辑、登录退出正常' },
        { module: '系统推荐', status: '通过', note: '基于路书推荐正常' }
    ]);

    gen.heading('路书场景测试', 2);
    gen.table('路书场景测试详情', [
        { scenario: '标准路书生成', result: '基本通过', issue: '多条路线缺日程、调整报错' },
        { scenario: '口语形式生成', result: '不稳定', issue: '上下文无连贯性' },
        { scenario: '修改路书', result: '不稳定', issue: '时间/偏好/目的地修改不稳定' },
        { scenario: '上下文理解', result: '不稳定', issue: '间断提问理解困难' }
    ]);

    // 第五章：上线准备情况
    gen.heading('五、上线准备情况', 1);

    gen.heading('应用信息', 2);
    gen.infoCards('应用基础信息', [
        { title: '应用名称', desc: 'AI奇遇' },
        { title: 'Slogan', desc: 'AI奇遇，遇见好看又合拍的同路人' },
        { title: '应用图标', desc: '512x512, 1024x1024' },
        { title: '年龄分级', desc: '18+' }
    ]);

    gen.heading('上线证书准备', 2);
    gen.table('证书状态', [
        { cert: 'APP电子版权认证证书', status: '已完成' },
        { cert: '计算机软件著作权登记证书', status: '申请中(4月底)' },
        { cert: '资质材料评估', status: '已完成' },
        { cert: 'APP ICP备案', status: '已完成' },
        { cert: '自定义评估报告', status: '已完成' }
    ]);

    gen.heading('应用市场状态', 2);
    gen.table('应用市场认证', [
        { store: '小米', status: '已认证' },
        { store: '华为', status: '已认证' },
        { store: 'OPPO', status: '已认证' },
        { store: 'vivo', status: '已认证' },
        { store: '应用宝', status: '已认证' },
        { store: 'App Store', status: '已付费$99' }
    ]);

    // 第六章：产品规划
    gen.heading('六、产品规划', 1);

    gen.body('产品初步完成用户找女搭子的需求，构建信息展示及在线交流工具。后续规划如下：');

    gen.heading('户外场景拓展', 2);
    gen.infoCards('户外功能', [
        { title: '徒步路线', desc: '爬山路线图、轨迹分享' },
        { title: '户外活动', desc: '摆摊、野炊、报名支付' },
        { title: '美景预测', desc: '云瀑、银河、日出指数' },
        { title: '营地推荐', desc: '露营地查找、预定分享' }
    ]);

    gen.heading('市区场景拓展', 2);
    gen.infoCards('市区功能', [
        { title: '音乐会/演出', desc: '艺术活动搭子' },
        { title: '娱乐场所', desc: '酒吧、台球、桌游' },
        { title: '私密空间', desc: '密室、私人影院' },
        { title: '氛围餐厅', desc: '小巷美食推荐' }
    ]);

    gen.heading('数据驱动产品', 2);
    gen.infoCards('数据功能', [
        { title: '用户画像', desc: '标签体系构建' },
        { title: '推荐算法', desc: '内容+搭子推荐' },
        { title: '数据分析', desc: '运营工具支撑' },
        { title: '偏好分析', desc: '聊天记录分析' }
    ]);

    // 结尾
    gen.end('谢谢阅读', 'AI奇遇，遇见好看又合拍的同路人');

    // 保存
    const outputPath = 'C:\\Users\\Administrator\\Desktop\\AI奇遇APP产品汇报.pdf';
    gen.save(outputPath);
    console.log('PDF 文档已保存:', outputPath);
}

// 运行
generatePDF().catch(console.error);