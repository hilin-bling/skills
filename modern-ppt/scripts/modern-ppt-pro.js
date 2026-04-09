/**
 * Modern PPT Generator Pro - 高级专业版
 *
 * 中间页面采用更精致的设计：
 * - 左侧彩色边栏配白色编号
 * - 卡片阴影效果（使用边框模拟）
 * - 更清晰的视觉层次
 * - 紫色主色调 + 粉色强调色
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
        content: 'FAFAFA',
        primary: '7C3AED',
        secondary: 'EC4899',
        accent: '06B6D4',
        text: '1F2937',
        textMuted: '6B7280',
        sidebar: '7C3AED'
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
        textMuted: '64748B',
        sidebar: '3B82F6'
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
        textMuted: '9CA3AF',
        sidebar: 'EC4899'
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
        textMuted: '6B7280',
        sidebar: '10B981'
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
        textMuted: '71717A',
        sidebar: '8B5CF6'
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
        textMuted: '78716C',
        sidebar: '78716C'
    }
};

const DEFAULT_THEME = ELEGANT_THEMES.deepSpace;

class ModernPPTPro {
    constructor(themeName = 'deepSpace') {
        this.pptx = new PptxGenJS();
        this.pptx.layout = 'LAYOUT_16x9';
        this.theme = ELEGANT_THEMES[themeName] || DEFAULT_THEME;
        this.slideCount = 0;
    }

    // 生成渐变背景
    async _createGradientBackground(colors, direction = 'diagonal') {
        let sharp;
        try {
            sharp = require('sharp');
        } catch (e) {
            return null;
        }

        const width = 1920;
        const height = 1080;

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
            await sharp(Buffer.from(svg)).png().toFile(outputPath);
            return outputPath;
        } catch (e) {
            return null;
        }
    }

    // 封面页
    async cover(title, subtitle = '', tagline = '') {
        const slide = this.pptx.addSlide();
        const t = this.theme;

        const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);
        if (gradientPath) {
            slide.background = { path: gradientPath };
        } else {
            slide.background = { color: t.cover.colors[0] };
        }

        // 装饰圆
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.8, y: -0.8, w: 2, h: 2,
            fill: { color: 'FFFFFF', transparency: 90 }
        });
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8.5, y: 4, w: 2.5, h: 2.5,
            fill: { color: t.accent, transparency: 85 }
        });
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

        if (tagline) {
            slide.addText(tagline, {
                x: 0.5, y: 4.1, w: 9, h: 0.5,
                fontSize: 16, fontFace: 'Arial', italic: true,
                color: 'FFFFFF', transparency: 25, align: 'center'
            });
        }

        this.slideCount++;
    }

    // 内容页基础 - 带左侧边栏
    contentSlide(title, showSidebar = true, stepNum = null) {
        const slide = this.pptx.addSlide();
        const t = this.theme;

        slide.background = { color: t.content };

        // 左侧边栏（可选）
        if (showSidebar) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0, y: 0, w: 0.25, h: 5.63,
                fill: { color: t.sidebar }
            });

            // 步骤编号
            if (stepNum !== null) {
                const num = String(stepNum).padStart(2, '0');
                slide.addText(num, {
                    x: 0, y: 0.3, w: 0.25, h: 0.5,
                    fontSize: 14, fontFace: 'Arial', bold: true,
                    color: 'FFFFFF', align: 'center', valign: 'middle'
                });
            }
        }

        // 标题
        const titleX = showSidebar ? 0.5 : 0.5;
        slide.addText(title, {
            x: titleX, y: 0.35, w: 9, h: 0.55,
            fontSize: 26, fontFace: 'Arial', bold: true,
            color: t.primary
        });

        // 标题下强调线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: titleX, y: 0.92, w: 1.5, h: 0.04,
            fill: { color: t.secondary }
        });

        return slide;
    }

    // 信息卡片页 - 精致卡片设计
    infoCards(title, description, cards) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        // 描述区域 - 大卡片
        if (description) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 1.25, w: 9, h: 0.7,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 1 }
            });

            slide.addText(description, {
                x: 0.7, y: 1.32, w: 8.6, h: 0.55,
                fontSize: 15, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });
        }

        // 功能卡片 - 4列布局
        const cardW = 2.15, cardH = 1.6, gap = 0.12, startX = 0.55, startY = 2.2;

        cards.forEach((card, i) => {
            const x = startX + i * (cardW + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: cardH,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.75 }
            });

            // 顶部装饰条
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: 0.08,
                fill: { color: t.primary }
            });

            // 图标
            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.2, w: cardW, h: 0.45,
                    fontSize: 28, align: 'center'
                });
            }

            // 标题
            slide.addText(card.title, {
                x: x + 0.1, y: startY + 0.7, w: cardW - 0.2, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            // 描述
            if (card.desc) {
                slide.addText(card.desc, {
                    x: x + 0.1, y: startY + 1.08, w: cardW - 0.2, h: 0.4,
                    fontSize: 11, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        });

        return slide;
    }

    // 时间线页 - 步骤式布局
    timeline(title, items) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        const cols = Math.min(items.length, 6);
        const colW = 9 / cols;

        // 连接线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.75, w: 9, h: 0.03,
            fill: { color: 'E5E7EB' }
        });

        items.forEach((item, i) => {
            const x = 0.5 + i * colW;
            const centerX = x + colW / 2;

            // 编号圆
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: centerX - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fill: { color: item.highlight ? t.secondary : t.primary },
                line: { color: 'FFFFFF', width: 2 }
            });

            slide.addText(String(i + 1).padStart(2, '0'), {
                x: centerX - 0.25, y: 1.5, w: 0.5, h: 0.5,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });

            // 标题
            slide.addText(item.title, {
                x: x, y: 2.15, w: colW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

            // 描述
            if (item.desc) {
                slide.addText(item.desc, {
                    x: x + 0.1, y: 2.55, w: colW - 0.2, h: 0.6,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        });

        return slide;
    }

    // 功能列表页 - 左右分栏设计
    featureList(title, features) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        // 左侧功能标签区
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.25, w: 2.2, h: 3.9,
            fill: { color: 'FFFFFF' },
            line: { color: 'E5E7EB', width: 0.5 }
        });

        // 左侧标签标题
        slide.addText('功能模块', {
            x: 0.6, y: 1.35, w: 2, h: 0.35,
            fontSize: 12, fontFace: 'Arial', bold: true,
            color: t.textMuted
        });

        // 功能标签
        features.forEach((f, i) => {
            const isActive = i === 0;

            // 标签背景
            if (isActive) {
                slide.addShape(this.pptx.ShapeType.rect, {
                    x: 0.6, y: 1.75 + i * 0.55, w: 2, h: 0.45,
                    fill: { color: t.primary, transparency: 90 }
                });
            }

            slide.addText(f.name, {
                x: 0.6, y: 1.75 + i * 0.55, w: 2, h: 0.45,
                fontSize: 13, fontFace: 'Arial', bold: isActive,
                color: isActive ? t.primary : t.text,
                valign: 'middle'
            });
        });

        // 右侧详情卡片
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 2.9, y: 1.25, w: 6.6, h: 3.9,
            fill: { color: 'FFFFFF' },
            line: { color: 'E5E7EB', width: 0.5 }
        });

        // 详情标题
        const current = features[0];
        if (current) {
            slide.addText(current.name + ' 详情', {
                x: 3.1, y: 1.4, w: 6.2, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });
        }

        // 详情列表
        if (current && current.items) {
            current.items.forEach((item, i) => {
                // 列表项背景
                slide.addShape(this.pptx.ShapeType.rect, {
                    x: 3.1, y: 1.9 + i * 0.55, w: 6.2, h: 0.48,
                    fill: { color: i % 2 === 0 ? 'F9FAFB' : 'FFFFFF' }
                });

                // Bullet点
                slide.addShape(this.pptx.ShapeType.ellipse, {
                    x: 3.2, y: 2.02 + i * 0.55, w: 0.15, h: 0.15,
                    fill: { color: t.secondary }
                });

                slide.addText(item, {
                    x: 3.45, y: 1.9 + i * 0.55, w: 5.8, h: 0.48,
                    fontSize: 13, fontFace: 'Arial',
                    color: t.text, valign: 'middle'
                });
            });
        }

        return slide;
    }

    // 状态列表页 - 双列对比设计
    statusList(title, items) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        const done = items.filter(i => i.status === 'done');
        const pending = items.filter(i => i.status === 'pending');

        // 左侧 - 已完成
        if (done.length > 0) {
            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 1.25, w: 4.3, h: Math.max(1.5, done.length * 0.45 + 0.5),
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 标题栏
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 1.25, w: 4.3, h: 0.45,
                fill: { color: '22C55E' }
            });

            slide.addText('已实现', {
                x: 0.6, y: 1.28, w: 4.1, h: 0.4,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', valign: 'middle'
            });

            done.forEach((item, i) => {
                // Check图标
                slide.addText('✓', {
                    x: 0.6, y: 1.75 + i * 0.4, w: 0.25, h: 0.35,
                    fontSize: 12, color: '22C55E', valign: 'middle'
                });

                slide.addText(item.text, {
                    x: 0.85, y: 1.75 + i * 0.4, w: 3.8, h: 0.35,
                    fontSize: 12, fontFace: 'Arial',
                    color: t.text, valign: 'middle'
                });
            });
        }

        // 右侧 - 待优化
        if (pending.length > 0) {
            const startX = done.length > 0 ? 5.0 : 0.5;

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: startX, y: 1.25, w: 4.3, h: Math.max(1.5, pending.length * 0.45 + 0.5),
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 标题栏 - 橙色
            slide.addShape(this.pptx.ShapeType.rect, {
                x: startX, y: 1.25, w: 4.3, h: 0.45,
                fill: { color: 'F59E0B' }
            });

            slide.addText('待优化', {
                x: startX + 0.1, y: 1.28, w: 4.1, h: 0.4,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', valign: 'middle'
            });

            pending.forEach((item, i) => {
                // Clock图标
                slide.addText('⏳', {
                    x: startX + 0.1, y: 1.75 + i * 0.4, w: 0.25, h: 0.35,
                    fontSize: 12, valign: 'middle'
                });

                slide.addText(item.text, {
                    x: startX + 0.35, y: 1.75 + i * 0.4, w: 3.8, h: 0.35,
                    fontSize: 12, fontFace: 'Arial',
                    color: t.textMuted, valign: 'middle'
                });
            });
        }

        return slide;
    }

    // 平台覆盖页 - 三列卡片
    platforms(title, data, summary = '') {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        const colW = 2.9, startY = 1.35;

        data.forEach((p, i) => {
            const x = 0.55 + i * colW;

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW - 0.1, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 顶部标题区
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW - 0.1, h: 0.6,
                fill: { color: t.primary }
            });

            slide.addText(p.name, {
                x: x, y: startY + 0.05, w: colW - 0.1, h: 0.35,
                fontSize: 15, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            slide.addText(p.count, {
                x: x, y: startY + 0.35, w: colW - 0.1, h: 0.25,
                fontSize: 11, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 20, align: 'center'
            });

            // 设备列表
            if (p.devices) {
                p.devices.forEach((d, j) => {
                    slide.addText(d, {
                        x: x + 0.15, y: startY + 0.75 + j * 0.35, w: colW - 0.4, h: 0.3,
                        fontSize: 11, fontFace: 'Arial',
                        color: t.text,
                        bullet: { type: 'bullet', color: t.secondary }
                    });
                });
            }
        });

        // 底部统计条
        if (summary) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: 4.3, w: 9, h: 0.6,
                fill: { color: t.primary, transparency: 90 },
                line: { color: t.primary, width: 0.5 }
            });

            slide.addText(summary, {
                x: 0.5, y: 4.3, w: 9, h: 0.6,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center', valign: 'middle'
            });
        }

        return slide;
    }

    // 准备状态页 - 三列进度卡片
    prepStatus(title, categories) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        const colW = 2.85, startY = 1.35;

        categories.forEach((cat, i) => {
            const x = 0.55 + i * (colW + 0.15);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.4,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 标题栏
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 0.5,
                fill: { color: 'F3F4F6' }
            });

            slide.addText(cat.name, {
                x: x + 0.1, y: startY + 0.05, w: colW - 0.2, h: 0.4,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center', valign: 'middle'
            });

            // 进度项
            cat.items.forEach((item, j) => {
                const itemY = startY + 0.65 + j * 0.45;

                // 状态图标背景
                slide.addShape(this.pptx.ShapeType.ellipse, {
                    x: x + 0.15, y: itemY + 0.05, w: 0.28, h: 0.28,
                    fill: { color: item.done ? '22C55E' : 'E5E7EB' }
                });

                // 状态图标
                slide.addText(item.done ? '✓' : '', {
                    x: x + 0.15, y: itemY + 0.05, w: 0.28, h: 0.28,
                    fontSize: 10, fontFace: 'Arial', bold: true,
                    color: 'FFFFFF', align: 'center', valign: 'middle'
                });

                slide.addText(item.text, {
                    x: x + 0.5, y: itemY, w: colW - 0.65, h: 0.38,
                    fontSize: 11, fontFace: 'Arial',
                    color: item.done ? t.text : t.textMuted, valign: 'middle'
                });
            });

            // 进度统计
            const doneCount = cat.items.filter(i => i.done).length;
            const total = cat.items.length;
            const percent = Math.round(doneCount / total * 100);

            slide.addText(`${doneCount}/${total} (${percent}%)`, {
                x: x + 0.1, y: startY + 3, w: colW - 0.2, h: 0.35,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: percent === 100 ? '22C55E' : t.primary, align: 'center'
            });
        });

        return slide;
    }

    // 规划页 - 三列时间卡片
    roadmap(title, sections) {
        const slide = this.contentSlide(title, true, ++this.slideCount);
        const t = this.theme;

        const colW = 2.9, startY = 1.35;

        sections.forEach((s, i) => {
            const x = 0.55 + i * (colW + 0.1);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.5,
                fill: { color: 'FFFFFF' },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            // 顶部装饰条 - 渐变色效果（用不同深浅）
            const colors = [t.primary, t.secondary, t.accent];
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 0.08,
                fill: { color: colors[i % 3] }
            });

            // 标题区背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY + 0.08, w: colW, h: 0.55,
                fill: { color: colors[i % 3], transparency: 95 }
            });

            // 标题
            slide.addText(s.name, {
                x: x + 0.15, y: startY + 0.15, w: colW - 0.3, h: 0.45,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: colors[i % 3], valign: 'middle'
            });

            // 项目列表
            if (s.items) {
                s.items.forEach((item, j) => {
                    // Bullet
                    slide.addShape(this.pptx.ShapeType.ellipse, {
                        x: x + 0.2, y: startY + 0.85 + j * 0.42 + 0.08, w: 0.12, h: 0.12,
                        fill: { color: colors[i % 3] }
                    });

                    slide.addText(item, {
                        x: x + 0.4, y: startY + 0.85 + j * 0.42, w: colW - 0.55, h: 0.38,
                        fontSize: 11, fontFace: 'Arial',
                        color: t.text, valign: 'middle'
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

        const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);
        if (gradientPath) {
            slide.background = { path: gradientPath };
        } else {
            slide.background = { color: t.cover.colors[0] };
        }

        // 装饰圆
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 7.8, y: -0.3, w: 2.2, h: 2.2,
            fill: { color: t.accent, transparency: 85 }
        });
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.5, y: 3.5, w: 1.5, h: 1.5,
            fill: { color: 'FFFFFF', transparency: 90 }
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
async function generateProDemo(outputPath, themeName = 'deepSpace') {
    const gen = new ModernPPTPro(themeName);

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
    ], '17+ 测试机型覆盖三大主流平台');

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

// 生成所有主题
async function generateAllThemes(outputDir) {
    const themes = Object.keys(ELEGANT_THEMES);

    for (const themeName of themes) {
        const theme = ELEGANT_THEMES[themeName];
        const outputPath = path.join(outputDir, `PPT_${theme.name}.pptx`);
        console.log(`\n生成主题: ${theme.name}`);

        try {
            await generateProDemo(outputPath, themeName);
        } catch (e) {
            console.log(`主题 ${theme.name} 生成失败:`, e.message);
        }
    }
}

module.exports = {
    ModernPPTPro,
    ELEGANT_THEMES,
    generateProDemo,
    generateAllThemes
};

if (require.main === module) {
    const desktop = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    (async () => {
        console.log('生成高级风格PPT...');
        console.log('目标路径:', desktop);

        await generateProDemo(path.join(desktop, 'AI奇遇产品汇报_高级版.pptx'), 'deepSpace');

        console.log('\n完成！');
    })();
}