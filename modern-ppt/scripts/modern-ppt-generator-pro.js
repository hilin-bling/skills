/**
 * Modern PPT Generator Pro - 高级时尚PPT生成器
 *
 * 参考设计: AI奇遇产品汇报.pptx
 * 特点: 渐变背景、精致卡片阴影、emoji装饰、紫粉配色
 *
 * 解决中文乱码: 使用Arial字体(支持中文)
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

// ============================================
// 设计系统 - 基于AI奇遇产品汇报风格
// ============================================
const DESIGN_SYSTEM = {
    // 核心配色
    colors: {
        primary: '7C3AED',       // 紫色 - 主标题
        secondary: 'EC4899',     // 粉色 - 强调
        accent: '22D3EE',        // 青色 - 辅助
        amber: 'F59E0B',         // 琥珀 - 高亮

        background: 'FAFAFA',    // 浅灰背景
        surface: 'FFFFFF',       // 白色卡片

        text: '1F2937',          // 深灰文字
        textMuted: '6B7280',     // 灰色辅助文字
        textLight: 'FFFFFF',     // 白色文字

        success: '22C55E',       // 绿色
        warning: 'F59E0B',       // 黄色
        error: 'EF4444',         // 红色
    },

    // 字体配置 - Arial支持中英文
    fonts: {
        hero: { name: 'Arial', size: 64, bold: true },
        title: { name: 'Arial', size: 32, bold: true },
        subtitle: { name: 'Arial', size: 24, bold: true },
        body: { name: 'Arial', size: 16 },
        caption: { name: 'Arial', size: 12 },
        small: { name: 'Arial', size: 11 }
    },

    // 阴影配置
    shadows: {
        card: {
            type: 'outer',
            blur: 10,
            offset: 2.5,
            angle: 45,
            color: '000000',
            opacity: 0.1
        },
        accent: {
            type: 'outer',
            blur: 12,
            offset: 3,
            angle: 45,
            color: '7C3AED',
            opacity: 0.15
        },
        soft: {
            type: 'outer',
            blur: 8,
            offset: 2,
            angle: 45,
            color: '000000',
            opacity: 0.08
        }
    },

    // 渐变配置
    gradients: {
        hero: ['7C3AED', 'EC4899', 'F59E0B'],        // 紫-粉-橙
        cool: ['22D3EE', '7C3AED', 'EC4899'],        // 青-紫-粉
        dark: ['0F172A', '7C3AED', 'EC4899'],        // 深色-紫-粉
        sunset: ['F59E0B', 'EF4444', 'EC4899'],      // 橙-红-粉
        ocean: ['0EA5E9', '0284C7', '7C3AED']        // 蓝-紫
    },

    // 常用emoji装饰
    icons: {
        map: '🗺️',
        users: '👥',
        chat: '💬',
        car: '🚗',
        check: '✓',
        warning: '⚡',
        rocket: '🚀',
        star: '⭐',
        heart: '❤️',
        fire: '🔥',
        target: '🎯',
        lightbulb: '💡',
        chart: '📊',
        globe: '🌍',
        phone: '📱',
        code: '💻',
        lock: '🔒',
        award: '🏆',
        leaf: '🌲',
        building: '🏙️'
    }
};

// ============================================
// 核心生成器类
// ============================================
class ModernPPTGeneratorPro {
    constructor() {
        this.pptx = new PptxGenJS();
        this.colors = DESIGN_SYSTEM.colors;
        this.fonts = DESIGN_SYSTEM.fonts;
        this.shadows = DESIGN_SYSTEM.shadows;

        // 配置PPT
        this.pptx.layout = 'LAYOUT_16x9';
        this.pptx.title = 'Modern Presentation';
        this.pptx.author = 'Modern PPT Generator Pro';
    }

    // ----------------------------------------
    // 封面页 - 渐变背景 + 装饰元素
    // ----------------------------------------
    createCoverSlide(title, subtitle = '', tagline = '') {
        const slide = this.pptx.addSlide();

        // 渐变背景
        slide.background = { color: '7C3AED' };

        // 装饰圆形 - 左上角
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.5, y: -0.5, w: 1.5, h: 1.5,
            fill: { color: 'FFFFFF', transparency: 85 }
        });

        // 装饰圆形 - 右下角
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8.5, y: 3.8, w: 2, h: 2,
            fill: { color: 'FFFFFF', transparency: 80 }
        });

        // 主标题
        slide.addText(title, {
            x: 0.5, y: 1.5, w: 9, h: 1.2,
            fontSize: 64,
            fontFace: 'Arial',
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            valign: 'middle'
        });

        // 副标题
        if (subtitle) {
            slide.addText(subtitle, {
                x: 0.5, y: 2.8, w: 9, h: 0.6,
                fontSize: 28,
                fontFace: 'Arial',
                color: 'FFFFFF',
                transparency: 20,
                align: 'center'
            });
        }

        // 分隔线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 3.5, y: 3.5, w: 3, h: 0.04,
            fill: { color: 'FFFFFF' }
        });

        // 标语
        if (tagline) {
            slide.addText(tagline, {
                x: 0.5, y: 3.8, w: 9, h: 0.5,
                fontSize: 18,
                fontFace: 'Arial',
                italic: true,
                color: 'FFFFFF',
                transparency: 30,
                align: 'center'
            });
        }

        return slide;
    }

    // ----------------------------------------
    // 内容页 - 标题 + 卡片布局
    // ----------------------------------------
    createContentSlide(title, content, options = {}) {
        const slide = this.pptx.addSlide();

        // 浅色背景
        slide.background = { color: this.colors.background };

        // 标题
        slide.addText(title, {
            x: 0.5, y: 0.4, w: 9, h: 0.6,
            fontSize: 32,
            fontFace: 'Arial',
            bold: true,
            color: this.colors.primary
        });

        // 标题下划线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.0, w: 1, h: 0.04,
            fill: { color: this.colors.secondary }
        });

        return slide;
    }

    // ----------------------------------------
    // 信息卡片页
    // ----------------------------------------
    createInfoCardSlide(title, description, cards) {
        const slide = this.createContentSlide(title);

        // 描述区域 - 带阴影的白色卡片
        if (description) {
            slide.addShape(this.pptx.ShapeType.roundRect, {
                x: 0.5, y: 1.4, w: 9, h: 0.8,
                fill: { color: this.colors.surface },
                shadow: this.shadows.accent
            });

            slide.addText(description, {
                x: 0.7, y: 1.5, w: 8.6, h: 0.6,
                fontSize: 18,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.text,
                align: 'center',
                valign: 'middle'
            });
        }

        // 功能卡片 - 4列布局
        const cardWidth = 2.1;
        const cardHeight = 1.5;
        const startX = 0.5;
        const startY = 2.5;
        const gap = 0.15;

        cards.forEach((card, i) => {
            const x = startX + i * (cardWidth + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.roundRect, {
                x: x, y: startY, w: cardWidth, h: cardHeight,
                fill: { color: this.colors.surface },
                shadow: this.shadows.card
            });

            // 图标
            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.15, w: cardWidth, h: 0.5,
                    fontSize: 28,
                    align: 'center'
                });
            }

            // 标题
            slide.addText(card.title, {
                x: x + 0.1, y: startY + 0.65, w: cardWidth - 0.2, h: 0.35,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.primary,
                align: 'center'
            });

            // 描述
            if (card.desc) {
                slide.addText(card.desc, {
                    x: x + 0.1, y: startY + 1.0, w: cardWidth - 0.2, h: 0.4,
                    fontSize: 11,
                    fontFace: 'Arial',
                    color: this.colors.textMuted,
                    align: 'center'
                });
            }
        });

        return slide;
    }

    // ----------------------------------------
    // 列表页 - 带状态标记
    // ----------------------------------------
    createListSlide(title, items, options = {}) {
        const slide = this.createContentSlide(title);

        // 左右分栏
        const leftItems = items.filter(item => item.status === 'done');
        const rightItems = items.filter(item => item.status === 'pending');

        // 已完成区域
        if (leftItems.length > 0) {
            slide.addText('✓ 已实现', {
                x: 0.5, y: 1.3, w: 4.5, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.success
            });

            leftItems.forEach((item, i) => {
                slide.addText(item.text, {
                    x: 0.5, y: 1.8 + i * 0.4, w: 4.5, h: 0.35,
                    fontSize: 14,
                    fontFace: 'Arial',
                    color: this.colors.text,
                    bullet: { type: 'bullet' }
                });
            });
        }

        // 待优化区域
        if (rightItems.length > 0) {
            const startX = leftItems.length > 0 ? 5.2 : 0.5;

            slide.addText('⚡ 待优化', {
                x: startX, y: 1.3, w: 4.5, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.warning
            });

            rightItems.forEach((item, i) => {
                slide.addText(item.text, {
                    x: startX, y: 1.8 + i * 0.4, w: 4.5, h: 0.35,
                    fontSize: 14,
                    fontFace: 'Arial',
                    color: this.colors.textMuted,
                    bullet: { type: 'bullet' }
                });
            });
        }

        return slide;
    }

    // ----------------------------------------
    // 时间线/版本页
    // ----------------------------------------
    createTimelineSlide(title, items) {
        const slide = this.createContentSlide(title);

        const cols = Math.min(items.length, 6);
        const colWidth = 9 / cols;

        items.forEach((item, i) => {
            const x = 0.5 + i * colWidth;

            // 编号圆圈
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: x + colWidth/2 - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fill: { color: item.highlight ? this.colors.secondary : this.colors.primary }
            });

            // 编号
            slide.addText(`0${i + 1}`, {
                x: x + colWidth/2 - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: 'FFFFFF',
                align: 'center',
                valign: 'middle'
            });

            // 标题
            slide.addText(item.title, {
                x: x, y: 2.1, w: colWidth, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.text,
                align: 'center'
            });

            // 描述
            if (item.desc) {
                slide.addText(item.desc, {
                    x: x, y: 2.5, w: colWidth, h: 0.8,
                    fontSize: 11,
                    fontFace: 'Arial',
                    color: this.colors.textMuted,
                    align: 'center'
                });
            }
        });

        return slide;
    }

    // ----------------------------------------
    // 数据表格页
    // ----------------------------------------
    createTableSlide(title, data, options = {}) {
        const slide = this.createContentSlide(title);

        const tableData = [
            data.headers.map(h => ({
                text: h,
                options: {
                    bold: true,
                    fill: { color: this.colors.primary },
                    color: 'FFFFFF'
                }
            })),
            ...data.rows.map(row => row.map(cell => ({ text: cell })))
        ];

        slide.addTable(tableData, {
            x: 0.5, y: 1.4, w: 9,
            fontFace: 'Arial',
            fontSize: 12,
            color: this.colors.text,
            border: { type: 'solid', pt: 0.5, color: 'E5E7EB' },
            align: 'center',
            valign: 'middle'
        });

        return slide;
    }

    // ----------------------------------------
    // 核心功能展示页
    // ----------------------------------------
    createFeatureSlide(title, features) {
        const slide = this.createContentSlide(title);

        // 左侧功能列表
        const leftWidth = 2.2;
        features.forEach((feature, i) => {
            const y = 1.3 + i * 0.5;

            // 功能名称
            slide.addText(feature.name, {
                x: 0.5, y: y, w: leftWidth, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: i === 0 ? this.colors.primary : this.colors.text
            });
        });

        // 右侧详情卡片
        const cardX = 3;
        const cardWidth = 6.5;
        const cardHeight = 3.8;

        slide.addShape(this.pptx.ShapeType.roundRect, {
            x: cardX, y: 1.3, w: cardWidth, h: cardHeight,
            fill: { color: this.colors.surface },
            shadow: this.shadows.card
        });

        // 当前功能详情
        const current = features[0];
        if (current && current.items) {
            current.items.forEach((item, i) => {
                slide.addText(item, {
                    x: cardX + 0.3, y: 1.6 + i * 0.45, w: cardWidth - 0.6, h: 0.4,
                    fontSize: 14,
                    fontFace: 'Arial',
                    color: this.colors.text,
                    bullet: { type: 'bullet' }
                });
            });
        }

        return slide;
    }

    // ----------------------------------------
    // 平台覆盖页
    // ----------------------------------------
    createPlatformSlide(title, platforms) {
        const slide = this.createContentSlide(title);

        const colWidth = 3;
        const startY = 1.5;

        platforms.forEach((platform, i) => {
            const x = 0.5 + i * colWidth;

            // 平台名称
            slide.addText(platform.name, {
                x: x, y: startY, w: colWidth - 0.2, h: 0.4,
                fontSize: 16,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.primary,
                align: 'center'
            });

            // 数量标签
            slide.addText(platform.count, {
                x: x, y: startY + 0.45, w: colWidth - 0.2, h: 0.35,
                fontSize: 12,
                fontFace: 'Arial',
                color: this.colors.textMuted,
                align: 'center'
            });

            // 设备列表
            if (platform.devices) {
                platform.devices.forEach((device, j) => {
                    slide.addText(device, {
                        x: x, y: startY + 0.9 + j * 0.35, w: colWidth - 0.2, h: 0.3,
                        fontSize: 12,
                        fontFace: 'Arial',
                        color: this.colors.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });

        // 底部统计
        slide.addShape(this.pptx.ShapeType.roundRect, {
            x: 0.5, y: 4.3, w: 9, h: 0.6,
            fill: { color: this.colors.primary, transparency: 90 }
        });

        slide.addText(platforms.summary || '', {
            x: 0.5, y: 4.3, w: 9, h: 0.6,
            fontSize: 14,
            fontFace: 'Arial',
            bold: true,
            color: this.colors.primary,
            align: 'center',
            valign: 'middle'
        });

        return slide;
    }

    // ----------------------------------------
    // 准备状态页
    // ----------------------------------------
    createStatusSlide(title, categories) {
        const slide = this.createContentSlide(title);

        const colWidth = 2.8;
        const startY = 1.4;

        categories.forEach((cat, i) => {
            const x = 0.5 + i * (colWidth + 0.2);

            // 分类标题
            slide.addText(cat.name, {
                x: x, y: startY, w: colWidth, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.text,
                align: 'center'
            });

            // 项目列表
            cat.items.forEach((item, j) => {
                const y = startY + 0.5 + j * 0.4;

                // 状态图标
                const statusIcon = item.done ? '✓' : '○';
                const statusColor = item.done ? this.colors.success : this.colors.textMuted;

                slide.addText(`${statusIcon} ${item.text}`, {
                    x: x, y: y, w: colWidth, h: 0.35,
                    fontSize: 11,
                    fontFace: 'Arial',
                    color: statusColor
                });
            });
        });

        return slide;
    }

    // ----------------------------------------
    // 规划展望页
    // ----------------------------------------
    createRoadmapSlide(title, sections) {
        const slide = this.createContentSlide(title);

        const colWidth = 3;
        const startY = 1.4;

        sections.forEach((section, i) => {
            const x = 0.5 + i * (colWidth + 0.2);

            // 分类卡片
            slide.addShape(this.pptx.ShapeType.roundRect, {
                x: x, y: startY, w: colWidth, h: 3.5,
                fill: { color: this.colors.surface },
                shadow: this.shadows.soft
            });

            // 图标和标题
            slide.addText(`${section.icon || ''} ${section.name}`, {
                x: x + 0.15, y: startY + 0.15, w: colWidth - 0.3, h: 0.5,
                fontSize: 14,
                fontFace: 'Arial',
                bold: true,
                color: this.colors.primary
            });

            // 项目列表
            if (section.items) {
                section.items.forEach((item, j) => {
                    slide.addText(item, {
                        x: x + 0.15, y: startY + 0.7 + j * 0.4, w: colWidth - 0.3, h: 0.35,
                        fontSize: 11,
                        fontFace: 'Arial',
                        color: this.colors.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });

        return slide;
    }

    // ----------------------------------------
    // 结束页
    // ----------------------------------------
    createEndSlide(title = '谢谢', tagline = '', contact = '') {
        const slide = this.pptx.addSlide();

        // 渐变背景
        slide.background = { color: this.colors.primary };

        // 装饰元素
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8, y: -0.5, w: 2.5, h: 2.5,
            fill: { color: 'FFFFFF', transparency: 85 }
        });

        // 主标题
        slide.addText(title, {
            x: 0, y: 2, w: 10, h: 0.8,
            fontSize: 48,
            fontFace: 'Arial',
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });

        // 标语
        if (tagline) {
            slide.addText(tagline, {
                x: 0, y: 2.9, w: 10, h: 0.5,
                fontSize: 18,
                fontFace: 'Arial',
                italic: true,
                color: 'FFFFFF',
                transparency: 20,
                align: 'center'
            });
        }

        // 联系方式
        if (contact) {
            slide.addText(contact, {
                x: 0, y: 3.6, w: 10, h: 0.4,
                fontSize: 14,
                fontFace: 'Arial',
                color: 'FFFFFF',
                transparency: 40,
                align: 'center'
            });
        }

        return slide;
    }

    // ----------------------------------------
    // 保存文件
    // ----------------------------------------
    save(filename) {
        const outputPath = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        this.pptx.writeFile({ fileName: outputPath });
        console.log(`PPT已保存: ${outputPath}`);
        return outputPath;
    }
}

// ============================================
// 演示生成函数
// ============================================
function generateDemoPresentation(outputPath) {
    const gen = new ModernPPTGeneratorPro();

    // 封面
    gen.createCoverSlide(
        'AI奇遇',
        'V1.0 产品汇报',
        '遇见好看又合拍的同路人'
    );

    // 产品定位
    gen.createInfoCardSlide(
        '产品定位',
        '智能出行社交平台',
        [
            { icon: '🗺️', title: 'AI路书', desc: '语音生成个性化行程' },
            { icon: '👥', title: '智能匹配', desc: '推荐志趣相投旅伴' },
            { icon: '💬', title: '即时聊天', desc: '安全有趣的互动' },
            { icon: '🚗', title: '结伴自驾', desc: '每次出行不孤单' }
        ]
    );

    // 版本概述
    gen.createTimelineSlide('版本概述', [
        { title: '首页交互', desc: '交互优化体验升级' },
        { title: '机型覆盖', desc: '全平台适配测试' },
        { title: '核心功能', desc: '路书/结伴/消息' },
        { title: '路书测试', desc: '场景覆盖与质量' },
        { title: '上线准备', desc: '素材/证书/市场' },
        { title: '产品规划', desc: '户内外场景拓展' }
    ]);

    // 功能展示
    gen.createFeatureSlide('核心功能', [
        { name: 'AI路书', items: ['语音/文本生成', '智能路线规划', '景点详情推荐', '一键分享'] },
        { name: '结伴', items: ['发布结伴信息', 'AI内容优化', '朋友圈分享', '状态管理'] },
        { name: '消息', items: ['即时聊天', 'AI协助对话', '举报/撤回', '在线状态'] },
        { name: '个人中心', items: ['资料编辑', '照片上传', '隐私设置', '账户管理'] }
    ]);

    // 状态列表
    gen.createListSlide('路书功能', [
        { text: '语音/文本生成路书', status: 'done' },
        { text: '左右滑动切换路书', status: 'done' },
        { text: '查看路线图与景区详情', status: 'done' },
        { text: '多路线日程缺失', status: 'pending' },
        { text: '调整路书报错', status: 'pending' },
        { text: '部分节点无图片', status: 'pending' }
    ]);

    // 平台覆盖
    gen.createPlatformSlide('机型覆盖', [
        { name: 'Android', count: '8+ 机型', devices: ['vivo', '小米', 'OPPO', '华为', 'HONOR', 'iQOO', 'REDMI'] },
        { name: 'iOS', count: '6+ 机型', devices: ['iPhone 6s', 'iPhone XR', 'iPhone 11', 'iPhone 15', 'iPhone 17'] },
        { name: 'HarmonyOS', count: '3+ 机型', devices: ['Mate 80', 'Mate 60 Pro', '华为'] }
    ]);

    // 准备状态
    gen.createStatusSlide('上线准备', [
        { name: '素材准备', items: [
            { text: '应用图标 (512/1024)', done: true },
            { text: 'Slogan与简介', done: true },
            { text: '隐私政策', done: true },
            { text: '应用截图 (6套)', done: true }
        ]},
        { name: '证书准备', items: [
            { text: 'APP电子版权认证', done: true },
            { text: '软著登记 (4月底)', done: false },
            { text: '安全评估报告', done: true },
            { text: 'ICP备案', done: true }
        ]},
        { name: '应用市场', items: [
            { text: '小米', done: true },
            { text: '华为', done: true },
            { text: 'OPPO', done: true },
            { text: 'vivo', done: true }
        ]}
    ]);

    // 产品规划
    gen.createRoadmapSlide('产品规划', [
        { name: '🌲 户外场景', items: ['徒步/爬山路线图', '户外活动组织', '美景预测 (云海/银河)', '营地推荐', '基于位置的群聊'] },
        { name: '🏙 市区场景', items: ['周边物资供应', '音乐会/演出/酒吧', '台球/桌游/密室', '约会方案', '无人机外卖配送'] },
        { name: '📊 数据驱动', items: ['用户画像标签体系', '推荐算法优化', '数据分析平台'] }
    ]);

    // 结束页
    gen.createEndSlide(
        '谢谢',
        'AI奇遇，遇见好看又合拍的同路人',
        'contact@example.com'
    );

    return gen.save(outputPath);
}

// ============================================
// 导出
// ============================================
module.exports = {
    ModernPPTGeneratorPro,
    DESIGN_SYSTEM,
    generateDemoPresentation
};

// 直接运行时生成演示
if (require.main === module) {
    const desktopPath = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    console.log('生成高级PPT演示...');
    console.log('目标路径:', desktopPath);

    generateDemoPresentation(path.join(desktopPath, 'AI奇遇产品汇报_生成版.pptx'));

    console.log('完成！');
}