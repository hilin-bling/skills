/**
 * Modern PPT Generator Premium - 高级优雅版
 *
 * 精选优雅背景渐变配色，参考 Apple/Linear/Notion 设计语言
 * 所有颜色都经过视觉测试，确保专业美观
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

// ============================================
// 精选优雅背景配色方案
// ============================================
const ELEGANT_THEMES = {
    // 主题1：深空紫 - 神秘优雅
    deepSpace: {
        name: '深空紫',
        cover: {
            type: 'gradient',
            colors: ['1a1a2e', '16213e', '0f3460'],
            direction: 'diagonal'
        },
        content: 'F8F9FA',
        primary: '6366F1',
        secondary: '8B5CF6',
        accent: '06B6D4',
        text: '1F2937',
        textMuted: '6B7280'
    },

    // 主题2：午夜蓝 - 专业沉稳
    midnight: {
        name: '午夜蓝',
        cover: {
            type: 'gradient',
            colors: ['0F172A', '1E293B', '334155'],
            direction: 'diagonal'
        },
        content: 'FFFFFF',
        primary: '3B82F6',
        secondary: '2563EB',
        accent: 'F59E0B',
        text: '1E293B',
        textMuted: '64748B'
    },

    // 主题3：玫瑰金 - 温暖精致
    roseGold: {
        name: '玫瑰金',
        cover: {
            type: 'gradient',
            colors: ['1F1D2B', '2D2B44', '3D3A52'],
            direction: 'diagonal'
        },
        content: 'FAFAF9',
        primary: 'EC4899',
        secondary: 'F472B6',
        accent: 'FBBF24',
        text: '1F2937',
        textMuted: '9CA3AF'
    },

    // 主题4：极光绿 - 科技清新
    aurora: {
        name: '极光绿',
        cover: {
            type: 'gradient',
            colors: ['0D1117', '161B22', '21262D'],
            direction: 'diagonal'
        },
        content: 'FFFFFF',
        primary: '10B981',
        secondary: '059669',
        accent: '3B82F6',
        text: '111827',
        textMuted: '6B7280'
    },

    // 主题5：暗夜紫粉 - 潮流时尚
    neoPurple: {
        name: '暗夜紫粉',
        cover: {
            type: 'gradient',
            colors: ['18181B', '27272A', '3F3F46'],
            direction: 'diagonal'
        },
        content: 'FAFAFA',
        primary: '8B5CF6',
        secondary: 'EC4899',
        accent: '22D3EE',
        text: '18181B',
        textMuted: '71717A'
    },

    // 主题6：石墨灰 - 商务简约
    slate: {
        name: '石墨灰',
        cover: {
            type: 'gradient',
            colors: ['1C1917', '292524', '44403C'],
            direction: 'diagonal'
        },
        content: 'FAFAF9',
        primary: '78716C',
        secondary: '57534E',
        accent: 'EA580C',
        text: '1C1917',
        textMuted: '78716C'
    }
};

// 默认主题
const DEFAULT_THEME = ELEGANT_THEMES.deepSpace;

// ============================================
// Premium 生成器
// ============================================
class ModernPPTPremium {
    constructor(themeName = 'deepSpace') {
        this.pptx = new PptxGenJS();
        this.pptx.layout = 'LAYOUT_16x9';
        this.theme = ELEGANT_THEMES[themeName] || DEFAULT_THEME;
    }

    // 生成渐变背景图片
    async _createGradientBackground(colors, direction = 'diagonal') {
        // 尝试使用sharp生成渐变图片
        let sharp;
        try {
            sharp = require('sharp');
        } catch (e) {
            // Sharp不可用，返回null使用纯色
            return null;
        }

        const width = 1920;
        const height = 1080;

        // 创建SVG渐变
        let gradientDef;
        if (direction === 'diagonal') {
            gradientDef = `<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">`;
        } else if (direction === 'horizontal') {
            gradientDef = `<linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">`;
        } else {
            gradientDef = `<linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">`;
        }

        const stops = colors.map((c, i) => {
            const offset = (i / (colors.length - 1)) * 100;
            return `<stop offset="${offset}%" style="stop-color:#${c}"/>`;
        }).join('');

        const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>${gradientDef}${stops}</linearGradient></defs>
            <rect width="100%" height="100%" fill="url(#g)"/>
        </svg>`;

        const outputPath = `D:/Software/Devlop/AI/temp-gradient-${Date.now()}.png`;

        try {
            await sharp(Buffer.from(svg))
                .png()
                .toFile(outputPath);
            return outputPath;
        } catch (e) {
            return null;
        }
    }

    // 封面页 - 带优雅渐变背景
    async cover(title, subtitle = '', tagline = '') {
        const slide = this.pptx.addSlide();
        const t = this.theme;

        // 尝试创建渐变背景
        const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);

        if (gradientPath) {
            slide.background = { path: gradientPath };
        } else {
            // 回退到纯色
            slide.background = { color: t.cover.colors[0] };
        }

        // 装饰圆形 - 左上
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.8, y: -0.8, w: 2, h: 2,
            fill: { color: 'FFFFFF', transparency: 90 }
        });

        // 装饰圆形 - 右下
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8.5, y: 4, w: 2.5, h: 2.5,
            fill: { color: t.accent, transparency: 85 }
        });

        // 装饰圆形 - 右上小圆
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8, y: 0.5, w: 1, h: 1,
            fill: { color: t.secondary, transparency: 70 }
        });

        // 主标题
        slide.addText(title, {
            x: 0.5, y: 1.8, w: 9, h: 1.2,
            fontSize: 56, fontFace: 'Arial', bold: true,
            color: 'FFFFFF', align: 'center'
        });

        // 副标题
        if (subtitle) {
            slide.addText(subtitle, {
                x: 0.5, y: 3.1, w: 9, h: 0.5,
                fontSize: 24, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 15, align: 'center'
            });
        }

        // 分隔线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 3.5, y: 3.8, w: 3, h: 0.03,
            fill: { color: t.accent }
        });

        // 标语
        if (tagline) {
            slide.addText(tagline, {
                x: 0.5, y: 4.1, w: 9, h: 0.5,
                fontSize: 16, fontFace: 'Arial', italic: true,
                color: 'FFFFFF', transparency: 25, align: 'center'
            });
        }
    }

    // 内容页
    contentSlide(title) {
        const slide = this.pptx.addSlide();
        const t = this.theme;

        slide.background = { color: t.content };

        // 标题
        slide.addText(title, {
            x: 0.5, y: 0.35, w: 9, h: 0.6,
            fontSize: 28, fontFace: 'Arial', bold: true,
            color: t.primary
        });

        // 标题下渐变线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 0.95, w: 1.2, h: 0.04,
            fill: { color: t.secondary }
        });

        return slide;
    }

    // 信息卡片页
    infoCards(title, description, cards) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        // 描述卡片
        if (description) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 1.3, w: 9, h: 0.75,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            slide.addText(description, {
                x: 0.7, y: 1.38, w: 8.6, h: 0.6,
                fontSize: 16, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });
        }

        // 卡片
        const cardW = 2.1, cardH = 1.45, gap = 0.15, startX = 0.5, startY = 2.35;

        cards.forEach((card, i) => {
            const x = startX + i * (cardW + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: cardH,
                fill: { color: 'FFFFFF' },
                line: { color: 'F3F4F6', width: 0.5 }
            });

            // 图标
            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.12, w: cardW, h: 0.45,
                    fontSize: 26, align: 'center'
                });
            }

            // 标题
            slide.addText(card.title, {
                x: x + 0.08, y: startY + 0.58, w: cardW - 0.16, h: 0.32,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            // 描述
            if (card.desc) {
                slide.addText(card.desc, {
                    x: x + 0.08, y: startY + 0.92, w: cardW - 0.16, h: 0.4,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        });

        return slide;
    }

    // 时间线页
    timeline(title, items) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        const cols = Math.min(items.length, 6);
        const colW = 9 / cols;

        items.forEach((item, i) => {
            const x = 0.5 + i * colW;

            // 编号圆
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: x + colW/2 - 0.22, y: 1.45, w: 0.44, h: 0.44,
                fill: { color: item.highlight ? t.secondary : t.primary }
            });

            slide.addText(`0${i + 1}`, {
                x: x + colW/2 - 0.22, y: 1.45, w: 0.44, h: 0.44,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });

            // 标题
            slide.addText(item.title, {
                x: x, y: 2.0, w: colW, h: 0.35,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

            // 描述
            if (item.desc) {
                slide.addText(item.desc, {
                    x: x, y: 2.35, w: colW, h: 0.7,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        });

        return slide;
    }

    // 功能列表页
    featureList(title, features) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        // 左侧功能标签
        const leftW = 2.0;
        features.forEach((f, i) => {
            slide.addText(f.name, {
                x: 0.5, y: 1.25 + i * 0.45, w: leftW, h: 0.38,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: i === 0 ? t.primary : t.text
            });
        });

        // 右侧详情卡片
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 2.8, y: 1.25, w: 6.7, h: 3.6,
            fill: { color: 'FFFFFF' },
            line: { color: 'F3F4F6', width: 0.5 }
        });

        // 详情列表
        const current = features[0];
        if (current && current.items) {
            current.items.forEach((item, i) => {
                slide.addText(item, {
                    x: 3.1, y: 1.5 + i * 0.42, w: 6.2, h: 0.38,
                    fontSize: 13, fontFace: 'Arial',
                    color: t.text,
                    bullet: { type: 'bullet' }
                });
            });
        }

        return slide;
    }

    // 状态列表页
    statusList(title, items) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        const done = items.filter(i => i.status === 'done');
        const pending = items.filter(i => i.status === 'pending');

        // 已完成
        if (done.length > 0) {
            slide.addText('✓ 已实现', {
                x: 0.5, y: 1.25, w: 4.3, h: 0.38,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: '22C55E'
            });

            done.forEach((item, i) => {
                slide.addText(item.text, {
                    x: 0.5, y: 1.7 + i * 0.38, w: 4.3, h: 0.32,
                    fontSize: 12, fontFace: 'Arial',
                    color: t.text,
                    bullet: { type: 'bullet' }
                });
            });
        }

        // 待优化
        if (pending.length > 0) {
            const startX = done.length > 0 ? 5.0 : 0.5;

            slide.addText('⚡ 待优化', {
                x: startX, y: 1.25, w: 4.3, h: 0.38,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: 'F59E0B'
            });

            pending.forEach((item, i) => {
                slide.addText(item.text, {
                    x: startX, y: 1.7 + i * 0.38, w: 4.3, h: 0.32,
                    fontSize: 12, fontFace: 'Arial',
                    color: t.textMuted,
                    bullet: { type: 'bullet' }
                });
            });
        }

        return slide;
    }

    // 平台覆盖页
    platforms(title, data, summary = '') {
        const slide = this.contentSlide(title);
        const t = this.theme;

        const colW = 2.9, startY = 1.4;

        data.forEach((p, i) => {
            const x = 0.5 + i * colW;

            slide.addText(p.name, {
                x: x, y: startY, w: colW - 0.2, h: 0.38,
                fontSize: 15, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(p.count, {
                x: x, y: startY + 0.4, w: colW - 0.2, h: 0.3,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });

            if (p.devices) {
                p.devices.forEach((d, j) => {
                    slide.addText(d, {
                        x: x, y: startY + 0.8 + j * 0.32, w: colW - 0.2, h: 0.28,
                        fontSize: 11, fontFace: 'Arial',
                        color: t.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });

        // 底部统计
        if (summary) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 4.15, w: 9, h: 0.55,
                fill: { color: t.primary, transparency: 92 }
            });

            slide.addText(summary, {
                x: 0.5, y: 4.15, w: 9, h: 0.55,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center', valign: 'middle'
            });
        }

        return slide;
    }

    // 准备状态页
    prepStatus(title, categories) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        const colW = 2.7, startY = 1.3;

        categories.forEach((cat, i) => {
            const x = 0.5 + i * (colW + 0.2);

            slide.addText(cat.name, {
                x: x, y: startY, w: colW, h: 0.38,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

            cat.items.forEach((item, j) => {
                const icon = item.done ? '✓' : '○';
                const color = item.done ? '22C55E' : t.textMuted;

                slide.addText(`${icon} ${item.text}`, {
                    x: x, y: startY + 0.45 + j * 0.38, w: colW, h: 0.32,
                    fontSize: 10, fontFace: 'Arial',
                    color: color
                });
            });
        });

        return slide;
    }

    // 规划页
    roadmap(title, sections) {
        const slide = this.contentSlide(title);
        const t = this.theme;

        const colW = 2.9, startY = 1.3;

        sections.forEach((s, i) => {
            const x = 0.5 + i * (colW + 0.15);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.3,
                fill: { color: 'FFFFFF' },
                line: { color: 'F3F4F6', width: 0.5 }
            });

            // 标题
            slide.addText(`${s.icon || ''} ${s.name}`, {
                x: x + 0.12, y: startY + 0.12, w: colW - 0.24, h: 0.45,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            // 项目
            if (s.items) {
                s.items.forEach((item, j) => {
                    slide.addText(item, {
                        x: x + 0.12, y: startY + 0.62 + j * 0.38, w: colW - 0.24, h: 0.32,
                        fontSize: 10, fontFace: 'Arial',
                        color: t.text,
                        bullet: { type: 'bullet' }
                    });
                });
            }
        });

        return slide;
    }

    // 结束页
    async end(title = '谢谢', tagline = '', contact = '') {
        const slide = this.pptx.addSlide();
        const t = this.theme;

        // 使用渐变背景
        const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);

        if (gradientPath) {
            slide.background = { path: gradientPath };
        } else {
            slide.background = { color: t.cover.colors[0] };
        }

        // 装饰
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 7.8, y: -0.3, w: 2.2, h: 2.2,
            fill: { color: t.accent, transparency: 85 }
        });

        slide.addText(title, {
            x: 0, y: 2, w: 10, h: 0.75,
            fontSize: 44, fontFace: 'Arial', bold: true,
            color: 'FFFFFF', align: 'center'
        });

        if (tagline) {
            slide.addText(tagline, {
                x: 0, y: 2.85, w: 10, h: 0.45,
                fontSize: 16, fontFace: 'Arial', italic: true,
                color: 'FFFFFF', transparency: 18, align: 'center'
            });
        }

        if (contact) {
            slide.addText(contact, {
                x: 0, y: 3.5, w: 10, h: 0.35,
                fontSize: 13, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 35, align: 'center'
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

// ============================================
// 演示生成
// ============================================
async function generatePremiumDemo(outputPath, themeName = 'deepSpace') {
    const gen = new ModernPPTPremium(themeName);

    await gen.cover('AI奇遇', 'V1.0 产品汇报', '遇见好看又合拍的同路人');

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
        { name: 'Android', count: '8+ 机型', devices: ['vivo', '小米', 'OPPO', '华为', 'HONOR'] },
        { name: 'iOS', count: '6+ 机型', devices: ['iPhone 6s', 'XR', '11', '15', '17'] },
        { name: 'HarmonyOS', count: '3+ 机型', devices: ['Mate 80', 'Mate 60 Pro', '华为'] }
    ], '17+ 测试机型覆盖三大主流平台，100% 功能验证通过');

    gen.prepStatus('上线准备', [
        { name: '素材准备', items: [
            { text: '应用图标', done: true },
            { text: 'Slogan与简介', done: true },
            { text: '隐私政策', done: true },
            { text: '应用截图', done: true }
        ]},
        { name: '证书准备', items: [
            { text: 'APP电子版权', done: true },
            { text: '软著登记', done: false },
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
        { name: '🌲 户外场景', items: ['徒步/爬山路线图', '户外活动组织', '美景预测', '营地推荐', '位置群聊'] },
        { name: '🏙 市区场景', items: ['周边物资供应', '音乐会/演出', '台球/桌游/密室', '约会方案'] },
        { name: '📊 数据驱动', items: ['用户画像标签', '推荐算法优化', '数据分析平台'] }
    ]);

    await gen.end('谢谢', 'AI奇遇，遇见好看又合拍的同路人', 'contact@example.com');

    return gen.save(outputPath);
}

// 生成所有主题的模板
async function generateAllThemes(outputDir) {
    const themes = Object.keys(ELEGANT_THEMES);

    for (const themeName of themes) {
        const theme = ELEGANT_THEMES[themeName];
        const outputPath = path.join(outputDir, `PPT_${theme.name}.pptx`);
        console.log(`\n生成主题: ${theme.name}`);

        try {
            await generatePremiumDemo(outputPath, themeName);
        } catch (e) {
            console.log(`主题 ${theme.name} 生成失败:`, e.message);
        }
    }
}

module.exports = {
    ModernPPTPremium,
    ELEGANT_THEMES,
    generatePremiumDemo,
    generateAllThemes
};

// 直接运行
if (require.main === module) {
    const desktop = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    (async () => {
        console.log('生成优雅风格PPT...');
        console.log('目标路径:', desktop);

        // 生成单个主题演示
        await generatePremiumDemo(path.join(desktop, 'AI奇遇产品汇报_优雅版.pptx'), 'deepSpace');

        // 可选：生成所有主题
        // await generateAllThemes(desktop);

        console.log('\n完成！');
    })();
}