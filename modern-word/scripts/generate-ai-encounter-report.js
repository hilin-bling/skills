/**
 * AI奇遇APP产品汇报 - Word文档生成脚本
 * 使用 tech 未来风格
 */

const { ModernWordUltimate } = require('./modern-word-ultimate');

async function generateWord() {
    console.log('生成 Word 文档...');

    const doc = new ModernWordUltimate('tech');

    // 封面
    doc.cover('AI奇遇APP产品汇报', 'V1.0版本', '产品部', '2024年3月');

    // 目录
    doc.toc();

    // 第一章：开发周期与团队
    doc.section('一、开发周期与团队', 1);

    doc.paragraph('自2月7日至今，共计投入2后端、3前端、1测试、1产品，共计7人。', { indent: true });

    doc.subsection('1.1 版本发布历程', 2);
    doc.table('版本发布记录', [
        { date: '3月17日', version: 'V1.0.0', description: '首次发布' },
        { date: '3月20日', version: 'V1.0.1', description: '修复系统字体设置过大，显示异常问题' },
        { date: '3月26日', version: 'V1.0.2', description: '重构首页交互及语音生成路书问题' }
    ], { headers: ['发布日期', '版本号', '更新说明'] });

    // 第二章：首页交互优化
    doc.section('二、首页交互优化', 1);

    doc.paragraph('当前界面交互，有待进一步优化，前端技术实现难度较大。计划参考友商进行优化：', { indent: true });

    doc.infoCards('友商交互方案', [
        { title: '青藤之恋', desc: '采用手动点击切换内容，上下滑动显示详情' },
        { title: '牵手', desc: '采用左右滑动切换内容，上下滑动查看用户主页信息' }
    ]);

    // 第三章：机型覆盖测试
    doc.section('三、机型覆盖测试', 1);

    doc.subsection('3.1 Android测试机型', 2);
    doc.table('Android设备测试', [
        { brand: 'vivo', model: 'U1 V1818A', system: 'Android 13' },
        { brand: '小米', model: 'MI PLAY', system: 'Android 8.1.0' },
        { brand: '华为', model: 'JKM-AL00a', system: 'HarmonyOS 2.0.0' },
        { brand: '华为', model: 'Mate 80', system: 'HarmonyOS 6.0.0' },
        { brand: '华为', model: 'MATE 60 PRO', system: 'HarmonyOS 4.2.0' },
        { brand: '小米', model: '小米14', system: 'HyperOS 1.0' },
        { brand: '小米', model: 'REDMI Turbo4', system: 'HyperOS' },
        { brand: '荣耀', model: 'HONOR 100 Pro', system: 'MagicOS 10.0' },
        { brand: 'OPPO', model: 'Find X7', system: 'Android 16' },
        { brand: 'OPPO', model: 'Reno 14Pro', system: 'Android 16' },
        { brand: 'iQOO', model: 'Z3 V2073A', system: 'Android 13' }
    ], { headers: ['品牌', '机型', '系统版本'] });

    doc.subsection('3.2 iOS测试机型', 2);
    doc.table('iOS设备测试', [
        { model: 'iPhone XR', system: 'iOS 18.7.6' },
        { model: 'iPhone 6s', system: 'iOS 15.8.6' },
        { model: 'iPhone 11', system: 'iOS 26.3 / 15.4.1' },
        { model: 'iPhone 15', system: 'iOS 26.3.1' },
        { model: 'iPhone 15 Pro', system: 'iOS 26.3.1' },
        { model: 'iPhone 17', system: 'iOS 26.3.1' }
    ], { headers: ['机型', '系统版本'] });

    // 第四章：功能模块测试
    doc.section('四、功能模块测试', 1);

    doc.subsection('4.1 功能测试汇总', 2);
    doc.table('功能模块测试结果', [
        { module: '路书', status: '基本通过', note: '部分华为机型图片加载慢' },
        { module: '结伴', status: '通过', note: '发布、朋友圈分享功能正常' },
        { module: '消息', status: '通过', note: '聊天、举报、AI协助功能正常' },
        { module: '个人中心', status: '通过', note: '资料编辑、登录退出正常' },
        { module: '系统推荐', status: '通过', note: '基于路书推荐用户正常' }
    ], { headers: ['功能模块', '测试结果', '备注'] });

    doc.subsection('4.2 路书场景测试', 2);
    doc.table('路书场景测试详情', [
        { scenario: '标准路书生成', result: '基本通过', issue: '多条路线缺少日程、调整报错' },
        { scenario: '口语形式生成', result: '不稳定', issue: '上下文无连贯性，生成失败' },
        { scenario: '修改路书', result: '不稳定', issue: '时间/偏好/目的地修改不稳定' },
        { scenario: '上下文理解', result: '不稳定', issue: '间断性提问理解困难' }
    ], { headers: ['测试场景', '测试结果', '问题描述'] });

    // 第五章：上线准备情况
    doc.section('五、上线准备情况', 1);

    doc.subsection('5.1 上线素材准备', 2);
    doc.infoCards('应用信息', [
        { title: '应用名称', desc: 'AI奇遇' },
        { title: 'Slogan', desc: 'AI奇遇，遇见好看又合拍的同路人' },
        { title: '应用图标', desc: '512x512, 1024x1024' },
        { title: '年龄分级', desc: '18+' }
    ]);

    doc.subsection('5.2 上线证书准备', 2);
    doc.table('证书状态', [
        { cert: 'APP电子版权认证证书', status: '已完成', note: '' },
        { cert: '计算机软件著作权登记证书', status: '申请中', note: '预计4月底' },
        { cert: '资质材料评估', status: '已完成', note: '' },
        { cert: 'APP ICP备案', status: '已完成', note: '' },
        { cert: '自定义评估报告', status: '已完成', note: '' }
    ], { headers: ['证书名称', '状态', '备注'] });

    doc.subsection('5.3 应用市场状态', 2);
    doc.table('应用市场认证', [
        { store: '小米', account: 'wwwangelll@126.com', status: '已认证' },
        { store: '华为', account: '17774907095', status: '已认证' },
        { store: 'OPPO', account: '17774907095', status: '已认证' },
        { store: 'vivo', account: '17774907095', status: '已认证' },
        { store: '应用宝', account: 'QQ:3901594639', status: '已认证' },
        { store: '苹果App Store', account: 'woshilaizhuchede2@126.com', status: '已付费$99' }
    ], { headers: ['应用市场', '账号', '状态'] });

    // 第六章：产品规划
    doc.section('六、产品规划', 1);

    doc.paragraph('产品初步完成用户找女搭子的需求，构建信息展示及在线交流工具。后续规划如下：', { indent: true });

    doc.subsection('6.1 户外场景拓展', 2);
    doc.list([
        '徒步、爬山路线图及浆板、玩水路线分布——参考两步路的轨迹图等功能',
        '户外活动组织支撑：包含户外摆摊、野炊等活动的发布、报名、费用支付、AA费用计算工具',
        '美景预测：包含云瀑、云海、银河、流星、日出、夕阳的指数预测——参考天文通小程序',
        '营地推荐：包含露营地的查找、预定、体验分享及野营地位置分享等功能',
        '基于位置的群聊功能，通过目的地在线群聊，解决用户社恐心理',
        '周边物资供应：包含周边商店、农家乐、民宿、酒店、赶集场所等信息呈现',
        '基于周边县城的无人机外卖配送服务',
        '基于实地体验、建立信任关系的土货销售'
    ]);

    doc.subsection('6.2 市区场景拓展', 2);
    doc.list([
        '音乐会、演出、酒吧、清吧、台球、桌游、密室、私人影院、轰趴馆',
        '氛围餐厅、小巷美食等适合异性搭子交友的约会方案推荐'
    ]);

    doc.subsection('6.3 数据驱动产品', 2);
    doc.list([
        '用户画像标签体系',
        '推荐算法：基于人的内容推荐，基于人的匹配搭子推荐',
        '数据分析平台',
        '运营工具支撑',
        '基于用户聊天记录、操作记录的用户偏好分析'
    ]);

    // 结尾
    doc.end('谢谢阅读', 'AI奇遇，遇见好看又合拍的同路人');

    // 保存
    const outputPath = 'C:\\Users\\Administrator\\Desktop\\AI奇遇APP产品汇报.docx';
    doc.save(outputPath);
    console.log('Word 文档已保存:', outputPath);
}

// 运行
generateWord().catch(console.error);