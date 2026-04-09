/**
 * AI奇遇APP产品汇报 - Excel文档生成脚本
 * 使用 tech 未来风格
 */

const { ModernExcelUltimate } = require('./modern-excel-ultimate');

async function generateExcel() {
    console.log('生成 Excel 文档...');

    const gen = new ModernExcelUltimate('tech');

    // Sheet 1: 概览仪表盘
    gen.createSheet('项目概览');

    await gen.dashboard({
        title: 'AI奇遇APP V1.0 项目概览',
        metrics: [
            { name: '团队规模', value: '7人', change: '', status: 'up' },
            { name: '开发周期', value: '2月7日-至今', change: '', status: 'up' },
            { name: '当前版本', value: 'V1.0.2', change: '', status: 'up' },
            { name: '功能通过率', value: '85%', change: '+15%', status: 'up' },
            { name: '机型覆盖', value: '12+设备', change: '', status: 'up' },
            { name: '应用市场', value: '6个平台', change: '', status: 'up' }
        ]
    });

    // Sheet 2: 版本发布记录
    gen.createSheet('版本发布');

    await gen.dataTable({
        title: '版本发布历程',
        headers: ['发布日期', '版本号', '更新说明', '状态'],
        data: [
            ['3月17日', 'V1.0.0', '首次发布', '已发布'],
            ['3月20日', 'V1.0.1', '修复系统字体设置过大，显示异常问题', '已发布'],
            ['3月26日', 'V1.0.2', '重构首页交互及语音生成路书问题', '已发布']
        ],
        options: { autoFit: true, styled: true }
    });

    // Sheet 3: 功能测试
    gen.createSheet('功能测试');

    await gen.dataTable({
        title: '功能模块测试结果',
        headers: ['功能模块', '功能描述', '测试结果', '备注'],
        data: [
            ['路书', '左右滑动切换路书，上下滑动查看详情', '基本通过', '部分华为机型图片加载慢'],
            ['路书', '点击录音按钮，语音生成路书', '基本通过', '稳定性和数据需优化'],
            ['路书', '切换文本及语音输入', '基本通过', '鸿蒙系统键盘弹出有延迟'],
            ['路书', '查看路书路线图', '基本通过', '日程路线显示需优化'],
            ['路书', '查看景区详情', '通过', ''],
            ['路书', '查看景区周边信息', '基本通过', '鸿蒙导航调起问题'],
            ['结伴', '查看用户发布的结伴信息', '通过', ''],
            ['结伴', '通过语音、AI优化发布结伴', '通过', ''],
            ['结伴', '结伴信息发布朋友圈', '通过', ''],
            ['消息', '文字、表情聊天', '通过', ''],
            ['消息', '举报聊天信息', '通过', ''],
            ['消息', '撤回聊天信息', '通过', ''],
            ['消息', 'AI协助聊天', '通过', ''],
            ['个人中心', '更新头像、昵称', '通过', ''],
            ['个人中心', '上传照片', '通过', ''],
            ['个人中心', '编辑标签、简介', '通过', ''],
            ['个人中心', '登录、退出、注销', '通过', ''],
            ['系统推荐', '基于路书推荐用户', '通过', ''],
            ['系统推荐', '系统定期推荐用户', '通过', '']
        ],
        options: { autoFit: true, styled: true, conditionalFormat: true }
    });

    // Sheet 4: 机型测试
    gen.createSheet('机型测试');

    await gen.dataTable({
        title: 'Android设备测试',
        headers: ['品牌', '机型', '系统版本', '测试类型'],
        data: [
            ['vivo', 'U1 V1818A', 'Android 13', '测试手机'],
            ['小米', 'MI PLAY', 'Android 8.1.0', '测试手机'],
            ['华为', 'JKM-AL00a', 'HarmonyOS 2.0.0', '测试手机'],
            ['华为', 'Mate 80', 'HarmonyOS 6.0.0', '同事手机'],
            ['华为', 'MATE 60 PRO', 'HarmonyOS 4.2.0', '同事手机'],
            ['vivo', 'vivo', 'Android 8.1.0', '同事手机'],
            ['小米', '小米14', 'HyperOS 1.0', '同事手机'],
            ['小米', 'REDMI Turbo4', 'HyperOS', '同事手机'],
            ['荣耀', 'HONOR 100 Pro', 'MagicOS 10.0', '同事手机'],
            ['OPPO', 'Find X7', 'Android 16', '同事手机'],
            ['OPPO', 'Reno 14Pro', 'Android 16', '同事手机'],
            ['iQOO', 'Z3 V2073A', 'Android 13', '同事手机']
        ],
        options: { autoFit: true, styled: true }
    });

    await gen.dataTable({
        title: 'iOS设备测试',
        headers: ['机型', '系统版本', '测试类型'],
        data: [
            ['iPhone XR', 'iOS 18.7.6', '测试手机'],
            ['iPhone 6s', 'iOS 15.8.6', '同事手机'],
            ['iPhone 11', 'iOS 26.3', '同事手机'],
            ['iPhone 11', 'iOS 15.4.1', '同事手机'],
            ['iPhone 15', 'iOS 26.3.1', '同事手机'],
            ['iPhone 15 Pro', 'iOS 26.3.1', '同事手机'],
            ['iPhone 17', 'iOS 26.3.1', '同事手机']
        ],
        options: { autoFit: true, styled: true }
    });

    // Sheet 5: 上线准备
    gen.createSheet('上线准备');

    await gen.dataTable({
        title: '上线素材准备',
        headers: ['项目', '内容', '状态'],
        data: [
            ['Slogan', 'AI奇遇，遇见好看又合拍的同路人', '完成'],
            ['应用名称', 'AI奇遇', '完成'],
            ['应用图标', '512x512, 1024x1024', '完成'],
            ['一句话简介', 'AI奇遇APP，您的智能出行社交伙伴', '完成'],
            ['隐私政策', '法务已审核完成', '完成'],
            ['权限信息', '相机、相册、位置、麦克、通讯录', '完成'],
            ['年龄分级', '18+', '完成'],
            ['应用介绍截图', '6个应用市场，6套', '进行中']
        ],
        options: { autoFit: true, styled: true }
    });

    await gen.dataTable({
        title: '上线证书准备',
        headers: ['证书名称', '状态', '备注'],
        data: [
            ['APP电子版权认证证书', '已完成', ''],
            ['计算机软件著作权登记证书', '申请中', '预计4月底'],
            ['资质材料评估', '已完成', ''],
            ['APP ICP备案', '已完成', ''],
            ['自定义评估报告', '已完成', '']
        ],
        options: { autoFit: true, styled: true }
    });

    await gen.dataTable({
        title: '应用市场认证状态',
        headers: ['应用市场', '账号', '状态'],
        data: [
            ['小米', 'wwwangelll@126.com', '已认证'],
            ['华为', '17774907095', '已认证'],
            ['OPPO', '17774907095', '已认证'],
            ['vivo', '17774907095', '已认证'],
            ['应用宝', 'QQ:3901594639', '已认证'],
            ['苹果App Store', 'woshilaizhuchede2@126.com', '已付费$99']
        ],
        options: { autoFit: true, styled: true }
    });

    // Sheet 6: 路书场景测试
    gen.createSheet('路书场景测试');

    await gen.dataTable({
        title: '路书场景测试详情',
        headers: ['测试场景', '测试结果', '问题描述'],
        data: [
            ['标准路书生成', '基本通过', '多条路线缺少日程；调整路书报错；描述不按格式无法生成'],
            ['口语形式生成', '不稳定', '上下文无连贯性，出现无关话题，生成失败'],
            ['修改路书时间', '不稳定', '修改时间不稳定'],
            ['修改路书偏好主题', '不稳定', '修改偏好不稳定'],
            ['修改路书目的地', '不稳定', '修改目的地不稳定'],
            ['删除途经地', '不稳定', '删除途经地不稳定'],
            ['新增途经地', '不稳定', '新增途经地不稳定'],
            ['间断性上下文理解', '不稳定', '间断提问理解困难']
        ],
        options: { autoFit: true, styled: true, conditionalFormat: true }
    });

    // 保存
    const outputPath = 'C:\\Users\\Administrator\\Desktop\\AI奇遇APP产品汇报.xlsx';
    await gen.save(outputPath);
    console.log('Excel 文档已保存:', outputPath);
}

// 运行
generateExcel().catch(console.error);