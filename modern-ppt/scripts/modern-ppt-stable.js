/**
 * Modern PPT Generator Pro v2 - 稳定版
 *
 * 移除了可能导致兼容性问题的复杂效果
 * 参考: AI奇遇产品汇报.pptx
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

// 设计系统
const DESIGN = {
    colors: {
        primary: '7C3AED',
        secondary: 'EC4899',
        accent: '22D3EE',
        amber: 'F59E0B',
        background: 'FAFAFA',
        surface: 'FFFFFF',
        text: '1F2937',
        textMuted: '6B7280',
        success: '22C55E',
        warning: 'F59E0B'
    }
};

class ModernPPTPro {
    constructor() {
        this.pptx = new PptxGenJS();
        this.pptx.layout = 'LAYOUT_16x9';
    }

    // 封面页
    cover(title, subtitle = '', tagline = '') {
        const slide = this.pptx.addSlide();
        slide.background = { color: DESIGN.colors.primary };

        // 装饰圆 - 左上
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.5, y: -0.5, w: 1.5, h: 1.5,
            fill: { color: 'FFFFFF', transparency: 85 }
        });

        // 装饰圆 - 右下
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8.5, y: 3.8, w: 2, h: 2,
            fill: { color: 'FFFFFF', transparency: 80 }
        });

        // 标题
        slide.addText(title, {
            x: 0.5, y: 1.5, w: 9, h: 1.2,
            fontSize: 64, fontFace: 'Arial', bold: true,
            color: 'FFFFFF', align: 'center'
        });

        // 副标题
        if (subtitle) {
            slide.addText(subtitle, {
                x: 0.5, y: 2.8, w: 9, h: 0.6,
                fontSize: 28, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 20, align: 'center'
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
                fontSize: 18, fontFace: 'Arial', italic: true,
                color: 'FFFFFF', transparency: 30, align: 'center'
            });
        }
    }

    // 内容页基础
    contentSlide(title) {
        const slide = this.pptx.addSlide();
        slide.background = { color: DESIGN.colors.background };

        // 标题
        slide.addText(title, {
            x: 0.5, y: 0.4, w: 9, h: 0.6,
            fontSize: 32, fontFace: 'Arial', bold: true,
            color: DESIGN.colors.primary
        });

        // 标题下划线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.0, w: 1, h: 0.04,
            fill: { color: DESIGN.colors.secondary }
        });

        return slide;
    }

    // 信息卡片页
    infoCards(title, description, cards) {
        const slide = this.contentSlide(title);

        // 描述卡片
        if (description) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 1.4, w: 9, h: 0.8,
                fill: { color: DESIGN.colors.surface },
                line: { color: 'E5E7EB', width: 1 }
            });

            slide.addText(description, {
                x: 0.7, y: 1.5, w: 8.6, h: 0.6,
                fontSize: 18, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.text, align: 'center'
            });
        }

        // 功能卡片
        const cardW = 2.1, cardH = 1.5, gap = 0.15, startX = 0.5, startY = 2.5;

        cards.forEach((card, i) => {
            const x = startX + i * (cardW + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: cardH,
                fill: { color: DESIGN.colors.surface },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 图标
            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.15, w: cardW, h: 0.5,
                    fontSize: 28, align: 'center'
                });
            }

            // 标题
            slide.addText(card.title, {
                x: x + 0.1, y: startY + 0.65, w: cardW - 0.2, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.primary, align: 'center'
            });

            // 描述
            if (card.desc) {
                slide.addText(card.desc, {
                    x: x + 0.1, y: startY + 1.0, w: cardW - 0.2, h: 0.4,
                    fontSize: 11, fontFace: 'Arial',
                    color: DESIGN.colors.textMuted, align: 'center'
                });
            }
        });
    }

    // 时间线页
    timeline(title, items) {
        const slide = this.contentSlide(title);

        const cols = Math.min(items.length, 6);
        const colW = 9 / cols;

        items.forEach((item, i) => {
            const x = 0.5 + i * colW;

            // 编号圆
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: x + colW/2 - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fill: { color: item.highlight ? DESIGN.colors.secondary : DESIGN.colors.primary }
            });

            slide.addText(`0${i + 1}`, {
                x: x + colW/2 - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });

            // 标题
            slide.addText(item.title, {
                x: x, y: 2.1, w: colW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.text, align: 'center'
            });

            // 描述
            if (item.desc) {
                slide.addText(item.desc, {
                    x: x, y: 2.5, w: colW, h: 0.8,
                    fontSize: 11, fontFace: 'Arial',
                    color: DESIGN.colors.textMuted, align: 'center'
                });
            }
        });
    }

    // 功能列表页
    featureList(title, features) {
        const slide = this.contentSlide(title);

        // 左侧功能标签
        const leftW = 2.2;
        features.forEach((f, i) => {
            slide.addText(f.name, {
                x: 0.5, y: 1.3 + i * 0.5, w: leftW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: i === 0 ? DESIGN.colors.primary : DESIGN.colors.text
            });
        });

        // 右侧详情卡片
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 3, y: 1.3, w: 6.5, h: 3.8,
            fill: { color: DESIGN.colors.surface },
            line: { color: 'E5E7EB', width: 0.5 }
        });

        // 详情列表
        const current = features[0];
        if (current && current.items) {
            current.items.forEach((item, i) => {
                slide.addText(item, {
                    x: 3.3, y: 1.6 + i * 0.45, w: 6, h: 0.4,
                    fontSize: 14, fontFace: 'Arial',
                    color: DESIGN.colors.text,
                    bullet: { type: 'bullet' }
                });
            });
        }
    }

    // 状态列表页
    statusList(title, items) {
        const slide = this.contentSlide(title);

        const done = items.filter(i => i.status === 'done');
        const pending = items.filter(i => i.status === 'pending');

        // 已完成
        if (done.length > 0) {
            slide.addText('✓ 已实现', {
                x: 0.5, y: 1.3, w: 4.5, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.success
            });

            done.forEach((item, i) => {
                slide.addText(item.text, {
                    x: 0.5, y: 1.8 + i * 0.4, w: 4.5, h: 0.35,
                    fontSize: 14, fontFace: 'Arial',
                    color: DESIGN.colors.text,
                    bullet: { type: 'bullet' }
                });
            });
        }

        // 待优化
        if (pending.length > 0) {
            const startX = done.length > 0 ? 5.2 : 0.5;

            slide.addText('⚡ 待优化', {
                x: startX, y: 1.3, w: 4.5, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.warning
            });

            pending.forEach((item, i) => {
                slide.addText(item.text, {
                    x: startX, y: 1.8 + i * 0.4, w: 4.5, h: 0.35,
                    fontSize: 14, fontFace: 'Arial',
                    color: DESIGN.colors.textMuted,
                    bullet: { type: 'bullet' }
                });
            });
        }
    }

    // 平台覆盖页
    platforms(title, data) {
        const slide = this.contentSlide(title);

        const colW = 3, startY = 1.5;

        data.forEach((p, i) => {
            const x = 0.5 + i * colW;

            slide.addText(p.name, {
                x: x, y: startY, w: colW - 0.2, h: 0.4,
                fontSize: 16, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.primary, align: 'center'
            });

            slide.addText(p.count, {
                x: x, y: startY + 0.45, w: colW - 0.2, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: DESIGN.colors.textMuted, align: 'center'
            });

            if (p.devices) {
                p.devices.forEach((d, j) => {
                    slide.addText(d, {
                        x: x, y: startY + 0.9 + j * 0.35, w: colW - 0.2, h: 0.3,
                        fontSize: 12, fontFace: 'Arial',
                        color: DESIGN.colors.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });

        // 底部统计
        if (data.summary) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 4.3, w: 9, h: 0.6,
                fill: { color: 'F3E8FF' }
            });

            slide.addText(data.summary, {
                x: 0.5, y: 4.3, w: 9, h: 0.6,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.primary, align: 'center', valign: 'middle'
            });
        }
    }

    // 准备状态页
    prepStatus(title, categories) {
        const slide = this.contentSlide(title);

        const colW = 2.8, startY = 1.4;

        categories.forEach((cat, i) => {
            const x = 0.5 + i * (colW + 0.2);

            slide.addText(cat.name, {
                x: x, y: startY, w: colW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.text, align: 'center'
            });

            cat.items.forEach((item, j) => {
                const icon = item.done ? '✓' : '○';
                const color = item.done ? DESIGN.colors.success : DESIGN.colors.textMuted;

                slide.addText(`${icon} ${item.text}`, {
                    x: x, y: startY + 0.5 + j * 0.4, w: colW, h: 0.35,
                    fontSize: 11, fontFace: 'Arial',
                    color: color
                });
            });
        });
    }

    // 规划页
    roadmap(title, sections) {
        const slide = this.contentSlide(title);

        const colW = 3, startY = 1.4;

        sections.forEach((s, i) => {
            const x = 0.5 + i * (colW + 0.2);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.5,
                fill: { color: DESIGN.colors.surface },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 标题
            slide.addText(`${s.icon || ''} ${s.name}`, {
                x: x + 0.15, y: startY + 0.15, w: colW - 0.3, h: 0.5,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: DESIGN.colors.primary
            });

            // 项目
            if (s.items) {
                s.items.forEach((item, j) => {
                    slide.addText(item, {
                        x: x + 0.15, y: startY + 0.7 + j * 0.4, w: colW - 0.3, h: 0.35,
                        fontSize: 11, fontFace: 'Arial',
                        color: DESIGN.colors.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });
    }

    // 结束页
    end(title = '谢谢', tagline = '', contact = '') {
        const slide = this.pptx.addSlide();
        slide.background = { color: DESIGN.colors.primary };

        // 装饰
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8, y: -0.5, w: 2.5, h: 2.5,
            fill: { color: 'FFFFFF', transparency: 85 }
        });

        slide.addText(title, {
            x: 0, y: 2, w: 10, h: 0.8,
            fontSize: 48, fontFace: 'Arial', bold: true,
            color: 'FFFFFF', align: 'center'
        });

        if (tagline) {
            slide.addText(tagline, {
                x: 0, y: 2.9, w: 10, h: 0.5,
                fontSize: 18, fontFace: 'Arial', italic: true,
                color: 'FFFFFF', transparency: 20, align: 'center'
            });
        }

        if (contact) {
            slide.addText(contact, {
                x: 0, y: 3.6, w: 10, h: 0.4,
                fontSize: 14, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 40, align: 'center'
            });
        }
    }

    save(filename) {
        const out = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        this.pptx.writeFile({ fileName: out });
        console.log(`保存成功: ${out}`);
        return out;
    }
}

// 生成演示PPT
function generateDemo(outputPath) {
    const gen = new ModernPPTPro();

    gen.cover('AI奇遇', 'V1.0 产品汇报', '遇见好看又合拍的同路人');

    gen.infoCards('产品定位', '智能出行社交平台', [
        { icon: '🗺️', title: 'AI路书', desc: '语音生成个性化行程' },
        { icon: '👥', title: '智能匹配', desc: '推荐志趣相投旅伴' },
        { icon: '💬', title: '即时聊天', desc: '安全有趣的互动' },
        { icon: '🚗', title: '结伴自驾', desc: '每次出行不孤单' }
    ]);

    gen.timeline('版本概述', [
        { title: '首页交互', desc: '交互优化体验升级' },
        { title: '机型覆盖', desc: '全平台适配测试' },
        { title: '核心功能', desc: '路书/结伴/消息' },
        { title: '路书测试', desc: '场景覆盖与质量' },
        { title: '上线准备', desc: '素材/证书/市场' },
        { title: '产品规划', desc: '户内外场景拓展' }
    ]);

    gen.featureList('核心功能', [
        { name: 'AI路书', items: ['语音/文本生成', '智能路线规划', '景点详情推荐', '一键分享'] },
        { name: '结伴', items: ['发布结伴信息', 'AI内容优化', '朋友圈分享', '状态管理'] },
        { name: '消息', items: ['即时聊天', 'AI协助对话', '举报/撤回', '在线状态'] },
        { name: '个人中心', items: ['资料编辑', '照片上传', '隐私设置', '账户管理'] }
    ]);

    gen.statusList('路书功能', [
        { text: '语音/文本生成路书', status: 'done' },
        { text: '左右滑动切换路书', status: 'done' },
        { text: '查看路线图与景区详情', status: 'done' },
        { text: '多路线日程缺失', status: 'pending' },
        { text: '调整路书报错', status: 'pending' },
        { text: '部分节点无图片', status: 'pending' }
    ]);

    gen.platforms('机型覆盖', [
        { name: 'Android', count: '8+ 机型', devices: ['vivo', '小米', 'OPPO', '华为', 'HONOR', 'iQOO', 'REDMI'] },
        { name: 'iOS', count: '6+ 机型', devices: ['iPhone 6s', 'iPhone XR', 'iPhone 11', 'iPhone 15', 'iPhone 17'] },
        { name: 'HarmonyOS', count: '3+ 机型', devices: ['Mate 80', 'Mate 60 Pro', '华为'] }
    ]);

    gen.prepStatus('上线准备', [
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

    gen.roadmap('产品规划', [
        { name: '🌲 户外场景', items: ['徒步/爬山路线图', '户外活动组织', '美景预测 (云海/银河)', '营地推荐', '基于位置的群聊'] },
        { name: '🏙 市区场景', items: ['周边物资供应', '音乐会/演出/酒吧', '台球/桌游/密室', '约会方案', '无人机外卖配送'] },
        { name: '📊 数据驱动', items: ['用户画像标签体系', '推荐算法优化', '数据分析平台'] }
    ]);

    gen.end('谢谢', 'AI奇遇，遇见好看又合拍的同路人', 'contact@example.com');

    return gen.save(outputPath);
}

module.exports = { ModernPPTPro, generateDemo };

if (require.main === module) {
    const desktop = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    console.log('生成稳定版PPT...');
    generateDemo(path.join(desktop, 'AI奇遇产品汇报_稳定版.pptx'));
}