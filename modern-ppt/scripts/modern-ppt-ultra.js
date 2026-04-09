/**
 * Modern PPT Generator Ultra - 终极版
 *
 * 支持12种精选风格，每种风格都经过精心设计
 * 自动根据内容推荐合适的风格
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const { STYLE_LIBRARY, recommendStyle, getStyle } = require('./style-library');

class ModernPPTUltra {
    constructor(styleName = 'deepSpace') {
        this.pptx = new PptxGenJS();
        this.pptx.layout = 'LAYOUT_16x9';
        this.style = getStyle(styleName);
        this.styleName = styleName;
        this.slideCount = 0;
    }

    // 切换风格
    setStyle(styleName) {
        this.style = getStyle(styleName);
        this.styleName = styleName;
    }

    // 创建渐变背景
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

    // 获取文本颜色（处理深色背景）
    _getTextColor(isDark = false) {
        return isDark ? 'FFFFFF' : this.style.text;
    }

    // ==========================================
    // 封面页
    // ==========================================
    async cover(title, subtitle = '', tagline = '') {
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark || t.cover.type === 'gradient';

        // 背景处理
        if (t.cover.type === 'gradient') {
            const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);
            if (gradientPath) {
                slide.background = { path: gradientPath };
            } else {
                slide.background = { color: t.cover.colors[0] };
            }
        } else {
            slide.background = { color: t.cover.color };
        }

        // 装饰元素
        this._addDecorations(slide, 'cover');

        // 主标题
        const textColor = isDark ? 'FFFFFF' : t.text;
        slide.addText(title, {
            x: 0.5, y: 1.6, w: 9, h: 1.3,
            fontSize: 52, fontFace: 'Arial', bold: true,
            color: textColor, align: 'center'
        });

        if (subtitle) {
            slide.addText(subtitle, {
                x: 0.5, y: 3.0, w: 9, h: 0.5,
                fontSize: 22, fontFace: 'Arial',
                color: textColor, transparency: isDark ? 15 : 30, align: 'center'
            });
        }

        // 分隔线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 3.5, y: 3.7, w: 3, h: 0.03,
            fill: { color: t.accent }
        });

        if (tagline) {
            slide.addText(tagline, {
                x: 0.5, y: 4.0, w: 9, h: 0.5,
                fontSize: 15, fontFace: 'Arial', italic: true,
                color: textColor, transparency: isDark ? 25 : 40, align: 'center'
            });
        }

        this.slideCount++;
    }

    // 添加装饰元素
    _addDecorations(slide, type) {
        const t = this.style;

        if (type === 'cover' || type === 'end') {
            // 通用装饰圆
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: -0.8, y: -0.8, w: 2, h: 2,
                fill: { color: t.accent, transparency: 85 }
            });
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: 8.5, y: 4, w: 2.5, h: 2.5,
                fill: { color: t.secondary, transparency: 80 }
            });
        }

        // 特殊风格装饰
        if (t.decorations && type === 'cover') {
            // 可爱风格添加装饰
            if (this.styleName === 'playful') {
                const emojis = ['⭐', '🌈', '🎀'];
                emojis.forEach((emoji, i) => {
                    slide.addText(emoji, {
                        x: 0.5 + i * 3.2, y: 0.3, w: 0.6, h: 0.6,
                        fontSize: 28
                    });
                });
            }
            // 中国风装饰
            if (this.styleName === 'chinese') {
                slide.addText('🏮', {
                    x: 0.8, y: 0.3, w: 0.6, h: 0.6, fontSize: 28
                });
                slide.addText('🎊', {
                    x: 8.6, y: 0.3, w: 0.6, h: 0.6, fontSize: 28
                });
            }
        }
    }

    // ==========================================
    // 内容页基础
    // ==========================================
    contentSlide(title, showSidebar = true) {
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark;

        slide.background = { color: t.content };

        // 左侧边栏
        if (showSidebar) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0, y: 0, w: 0.22, h: 5.63,
                fill: { color: t.sidebar }
            });

            // 步骤编号
            const num = String(this.slideCount).padStart(2, '0');
            slide.addText(num, {
                x: 0, y: 0.3, w: 0.22, h: 0.45,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });
        }

        // 标题
        const titleX = showSidebar ? 0.45 : 0.5;
        const titleColor = isDark ? 'FFFFFF' : t.primary;
        slide.addText(title, {
            x: titleX, y: 0.32, w: 9, h: 0.5,
            fontSize: 24, fontFace: 'Arial', bold: true,
            color: titleColor
        });

        // 标题下划线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: titleX, y: 0.85, w: 1.3, h: 0.04,
            fill: { color: t.secondary }
        });

        return slide;
    }

    // ==========================================
    // 信息卡片页
    // ==========================================
    infoCards(title, description, cards) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        // 描述区域
        if (description) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.45, y: 1.15, w: 9.1, h: 0.65,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(description, {
                x: 0.6, y: 1.22, w: 8.8, h: 0.5,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: this._getTextColor(isDark), align: 'center'
            });
        }

        // 卡片
        const cardW = 2.15, cardH = 1.55, gap = 0.12, startX = 0.5, startY = 2.1;

        cards.forEach((card, i) => {
            const x = startX + i * (cardW + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: cardH,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            // 顶部装饰条
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: 0.06,
                fill: { color: t.primary }
            });

            // 图标
            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.15, w: cardW, h: 0.42,
                    fontSize: 26, align: 'center'
                });
            }

            // 标题
            slide.addText(card.title, {
                x: x + 0.08, y: startY + 0.62, w: cardW - 0.16, h: 0.32,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            // 描述
            if (card.desc) {
                slide.addText(card.desc, {
                    x: x + 0.08, y: startY + 0.98, w: cardW - 0.16, h: 0.45,
                    fontSize: 10, fontFace: 'Arial',
                    color: this._getTextColor(isDark), transparency: 30, align: 'center'
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 时间线页
    // ==========================================
    timeline(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const cols = Math.min(items.length, 6);
        const colW = 9 / cols;

        // 连接线
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.65, w: 9, h: 0.03,
            fill: { color: t.cardBorder }
        });

        items.forEach((item, i) => {
            const x = 0.5 + i * colW;
            const centerX = x + colW / 2;

            // 编号圆
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: centerX - 0.22, y: 1.4, w: 0.44, h: 0.44,
                fill: { color: item.highlight ? t.secondary : t.primary },
                line: { color: 'FFFFFF', width: 2 }
            });

            slide.addText(String(i + 1).padStart(2, '0'), {
                x: centerX - 0.22, y: 1.4, w: 0.44, h: 0.44,
                fontSize: 11, fontFace: 'Arial', bold: true,
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
                    x: x + 0.1, y: 2.35, w: colW - 0.2, h: 0.55,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 功能列表页
    // ==========================================
    featureList(title, features) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        // 左侧标签区
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.45, y: 1.15, w: 2.1, h: 3.8,
            fill: { color: isDark ? t.cardBg : 'FFFFFF' },
            line: { color: t.cardBorder, width: 0.5 }
        });

        // 标签标题
        slide.addText('功能模块', {
            x: 0.55, y: 1.22, w: 1.9, h: 0.3,
            fontSize: 11, fontFace: 'Arial', bold: true,
            color: t.textMuted
        });

        features.forEach((f, i) => {
            const isActive = i === 0;

            if (isActive) {
                slide.addShape(this.pptx.ShapeType.rect, {
                    x: 0.55, y: 1.55 + i * 0.5, w: 1.9, h: 0.42,
                    fill: { color: t.primary, transparency: isDark ? 80 : 90 }
                });
            }

            slide.addText(f.name, {
                x: 0.55, y: 1.55 + i * 0.5, w: 1.9, h: 0.42,
                fontSize: 12, fontFace: 'Arial', bold: isActive,
                color: isActive ? t.primary : t.text, valign: 'middle'
            });
        });

        // 右侧详情卡片
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 2.7, y: 1.15, w: 6.85, h: 3.8,
            fill: { color: isDark ? t.cardBg : 'FFFFFF' },
            line: { color: t.cardBorder, width: 0.5 }
        });

        const current = features[0];
        if (current) {
            slide.addText(current.name + ' 详情', {
                x: 2.9, y: 1.28, w: 6.5, h: 0.38,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary
            });
        }

        if (current && current.items) {
            current.items.forEach((item, i) => {
                // 交替背景
                slide.addShape(this.pptx.ShapeType.rect, {
                    x: 2.9, y: 1.72 + i * 0.52, w: 6.5, h: 0.48,
                    fill: { color: i % 2 === 0 ? (isDark ? '1F2937' : 'F9FAFB') : (isDark ? t.cardBg : 'FFFFFF') }
                });

                // Bullet点
                slide.addShape(this.pptx.ShapeType.ellipse, {
                    x: 3.0, y: 1.85 + i * 0.52, w: 0.12, h: 0.12,
                    fill: { color: t.secondary }
                });

                slide.addText(item, {
                    x: 3.2, y: 1.72 + i * 0.52, w: 6.1, h: 0.48,
                    fontSize: 12, fontFace: 'Arial',
                    color: t.text, valign: 'middle'
                });
            });
        }

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 状态列表页
    // ==========================================
    statusList(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const done = items.filter(i => i.status === 'done');
        const pending = items.filter(i => i.status === 'pending');

        // 已完成
        if (done.length > 0) {
            const cardH = Math.max(1.3, done.length * 0.4 + 0.55);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.45, y: 1.15, w: 4.35, h: cardH,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.45, y: 1.15, w: 4.35, h: 0.42,
                fill: { color: '22C55E' }
            });

            slide.addText('已实现', {
                x: 0.55, y: 1.18, w: 4.15, h: 0.38,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', valign: 'middle'
            });

            done.forEach((item, i) => {
                slide.addText('✓', {
                    x: 0.55, y: 1.62 + i * 0.38, w: 0.25, h: 0.32,
                    fontSize: 11, color: '22C55E', valign: 'middle'
                });

                slide.addText(item.text, {
                    x: 0.8, y: 1.62 + i * 0.38, w: 3.85, h: 0.32,
                    fontSize: 11, fontFace: 'Arial',
                    color: t.text, valign: 'middle'
                });
            });
        }

        // 待优化
        if (pending.length > 0) {
            const startX = done.length > 0 ? 5.0 : 0.45;
            const cardH = Math.max(1.3, pending.length * 0.4 + 0.55);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: startX, y: 1.15, w: 4.35, h: cardH,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: startX, y: 1.15, w: 4.35, h: 0.42,
                fill: { color: 'F59E0B' }
            });

            slide.addText('待优化', {
                x: startX + 0.1, y: 1.18, w: 4.15, h: 0.38,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', valign: 'middle'
            });

            pending.forEach((item, i) => {
                slide.addText('⏳', {
                    x: startX + 0.1, y: 1.62 + i * 0.38, w: 0.25, h: 0.32,
                    fontSize: 11, valign: 'middle'
                });

                slide.addText(item.text, {
                    x: startX + 0.35, y: 1.62 + i * 0.38, w: 3.85, h: 0.32,
                    fontSize: 11, fontFace: 'Arial',
                    color: t.textMuted, valign: 'middle'
                });
            });
        }

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 平台覆盖页
    // ==========================================
    platforms(title, data, summary = '') {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colW = 2.9, startY = 1.25;

        data.forEach((p, i) => {
            const x = 0.5 + i * colW;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW - 0.1, h: 2.7,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW - 0.1, h: 0.55,
                fill: { color: t.primary }
            });

            slide.addText(p.name, {
                x: x, y: startY + 0.05, w: colW - 0.1, h: 0.32,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            slide.addText(p.count, {
                x: x, y: startY + 0.32, w: colW - 0.1, h: 0.22,
                fontSize: 10, fontFace: 'Arial',
                color: 'FFFFFF', transparency: 20, align: 'center'
            });

            if (p.devices) {
                p.devices.forEach((d, j) => {
                    slide.addText(d, {
                        x: x + 0.12, y: startY + 0.7 + j * 0.32, w: colW - 0.35, h: 0.28,
                        fontSize: 10, fontFace: 'Arial',
                        color: t.text,
                        bullet: { type: 'bullet', color: t.secondary }
                    });
                });
            }
        });

        if (summary) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.45, y: 4.1, w: 9.1, h: 0.55,
                fill: { color: t.primary, transparency: isDark ? 80 : 90 },
                line: { color: t.primary, width: 0.5 }
            });

            slide.addText(summary, {
                x: 0.45, y: 4.1, w: 9.1, h: 0.55,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center', valign: 'middle'
            });
        }

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 准备状态页
    // ==========================================
    prepStatus(title, categories) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colW = 2.85, startY = 1.25;

        categories.forEach((cat, i) => {
            const x = 0.5 + i * (colW + 0.15);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.3,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 0.45,
                fill: { color: isDark ? '1F2937' : 'F3F4F6' }
            });

            slide.addText(cat.name, {
                x: x + 0.1, y: startY + 0.05, w: colW - 0.2, h: 0.38,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center', valign: 'middle'
            });

            cat.items.forEach((item, j) => {
                const itemY = startY + 0.58 + j * 0.42;

                slide.addShape(this.pptx.ShapeType.ellipse, {
                    x: x + 0.12, y: itemY + 0.05, w: 0.26, h: 0.26,
                    fill: { color: item.done ? '22C55E' : t.cardBorder }
                });

                slide.addText(item.done ? '✓' : '', {
                    x: x + 0.12, y: itemY + 0.05, w: 0.26, h: 0.26,
                    fontSize: 10, fontFace: 'Arial', bold: true,
                    color: 'FFFFFF', align: 'center', valign: 'middle'
                });

                slide.addText(item.text, {
                    x: x + 0.45, y: itemY, w: colW - 0.6, h: 0.36,
                    fontSize: 10, fontFace: 'Arial',
                    color: item.done ? t.text : t.textMuted, valign: 'middle'
                });
            });

            const doneCount = cat.items.filter(i => i.done).length;
            const total = cat.items.length;
            const percent = Math.round(doneCount / total * 100);

            slide.addText(`${doneCount}/${total} (${percent}%)`, {
                x: x + 0.1, y: startY + 2.95, w: colW - 0.2, h: 0.3,
                fontSize: 10, fontFace: 'Arial', bold: true,
                color: percent === 100 ? '22C55E' : t.primary, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 规划页
    // ==========================================
    roadmap(title, sections) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colW = 2.9, startY = 1.25;
        const accentColors = [t.primary, t.secondary, t.accent];

        sections.forEach((s, i) => {
            const x = 0.5 + i * (colW + 0.1);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 3.4,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: colW, h: 0.06,
                fill: { color: accentColors[i % 3] }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY + 0.06, w: colW, h: 0.5,
                fill: { color: accentColors[i % 3], transparency: 95 }
            });

            slide.addText(s.name, {
                x: x + 0.12, y: startY + 0.12, w: colW - 0.24, h: 0.42,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: accentColors[i % 3], valign: 'middle'
            });

            if (s.items) {
                s.items.forEach((item, j) => {
                    slide.addShape(this.pptx.ShapeType.ellipse, {
                        x: x + 0.18, y: startY + 0.78 + j * 0.4 + 0.08, w: 0.1, h: 0.1,
                        fill: { color: accentColors[i % 3] }
                    });

                    slide.addText(item, {
                        x: x + 0.35, y: startY + 0.78 + j * 0.4, w: colW - 0.5, h: 0.36,
                        fontSize: 10, fontFace: 'Arial',
                        color: t.text, valign: 'middle'
                    });
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 数据统计页（新增）
    // ==========================================
    dataStats(title, stats) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const cardW = 2.1, gap = 0.15, startX = 0.55;

        stats.forEach((stat, i) => {
            const x = startX + i * (cardW + gap);

            // 卡片背景
            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.25, w: cardW, h: 1.8,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            // 数值
            slide.addText(stat.value, {
                x: x, y: 1.45, w: cardW, h: 0.7,
                fontSize: 36, fontFace: 'Arial', bold: true,
                color: stat.highlight ? t.accent : t.primary, align: 'center'
            });

            // 标签
            slide.addText(stat.label, {
                x: x, y: 2.15, w: cardW, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });

            // 变化指示
            if (stat.change) {
                const isPositive = stat.change.startsWith('+');
                slide.addText(stat.change, {
                    x: x, y: 2.5, w: cardW, h: 0.3,
                    fontSize: 11, fontFace: 'Arial', bold: true,
                    color: isPositive ? '22C55E' : 'EF4444', align: 'center'
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 引用页（新增）
    // ==========================================
    quote(title, quoteText, author = '') {
        const slide = this.contentSlide(title, false);
        const t = this.style;
        const isDark = t.isDark;

        // 引号装饰
        slide.addText('"', {
            x: 0.8, y: 1.3, w: 1, h: 1,
            fontSize: 72, fontFace: 'Georgia',
            color: t.primary, transparency: 70
        });

        // 引用文本
        slide.addText(quoteText, {
            x: 1.5, y: 1.8, w: 7, h: 1.5,
            fontSize: 22, fontFace: 'Arial', italic: true,
            color: isDark ? 'FFFFFF' : t.text, align: 'center'
        });

        // 作者
        if (author) {
            slide.addText('— ' + author, {
                x: 1.5, y: 3.5, w: 7, h: 0.4,
                fontSize: 14, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        }

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 图片展示页（新增）
    // ==========================================
    imageSlide(title, imagePath, caption = '') {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        // 图片容器
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.15, w: 9, h: 3.3,
            fill: { color: isDark ? t.cardBg : 'F9FAFB' },
            line: { color: t.cardBorder, width: 0.5 }
        });

        // 添加图片
        if (imagePath) {
            try {
                slide.addImage({
                    path: imagePath,
                    x: 0.7, y: 1.35, w: 8.6, h: 2.9
                });
            } catch (e) {
                // 图片加载失败，显示占位符
                slide.addText('📷 图片', {
                    x: 0.5, y: 2.5, w: 9, h: 0.5,
                    fontSize: 18, fontFace: 'Arial',
                    color: t.textMuted, align: 'center'
                });
            }
        }

        // 说明文字
        if (caption) {
            slide.addText(caption, {
                x: 0.5, y: 4.55, w: 9, h: 0.35,
                fontSize: 11, fontFace: 'Arial', italic: true,
                color: t.textMuted, align: 'center'
            });
        }

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 结束页
    // ==========================================
    async end(title = '谢谢', tagline = '', contact = '') {
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark || t.cover.type === 'gradient';

        // 背景
        if (t.cover.type === 'gradient') {
            const gradientPath = await this._createGradientBackground(t.cover.colors, t.cover.direction);
            if (gradientPath) {
                slide.background = { path: gradientPath };
            } else {
                slide.background = { color: t.cover.colors[0] };
            }
        } else {
            slide.background = { color: t.cover.color };
        }

        // 装饰
        this._addDecorations(slide, 'end');

        const textColor = isDark ? 'FFFFFF' : t.text;

        slide.addText(title, {
            x: 0, y: 2, w: 10, h: 0.7,
            fontSize: 42, fontFace: 'Arial', bold: true,
            color: textColor, align: 'center'
        });

        if (tagline) {
            slide.addText(tagline, {
                x: 0, y: 2.8, w: 10, h: 0.42,
                fontSize: 15, fontFace: 'Arial', italic: true,
                color: textColor, transparency: isDark ? 18 : 35, align: 'center'
            });
        }

        if (contact) {
            slide.addText(contact, {
                x: 0, y: 3.4, w: 10, h: 0.32,
                fontSize: 12, fontFace: 'Arial',
                color: textColor, transparency: isDark ? 35 : 50, align: 'center'
            });
        }
    }

    // ==========================================
    // 保存
    // ==========================================
    save(filename) {
        const out = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        this.pptx.writeFile({ fileName: out });
        console.log(`保存成功: ${out}`);
        return out;
    }
}

// ==========================================
// 批量生成所有风格模板
// ==========================================
async function generateAllStyles(outputDir) {
    const styles = Object.keys(STYLE_LIBRARY);
    const results = [];

    for (const styleName of styles) {
        const style = STYLE_LIBRARY[styleName];
        const outputPath = path.join(outputDir, `PPT_${style.name}.pptx`);
        console.log(`\n生成风格: ${style.name}`);

        try {
            const gen = new ModernPPTUltra(styleName);

            await gen.cover(style.name, '产品汇报 V1.0', style.description);

            gen.infoCards('产品定位', '智能服务平台', [
                { icon: '🚀', title: '核心优势', desc: '差异化竞争' },
                { icon: '🎯', title: '目标用户', desc: '精准定位' },
                { icon: '💡', title: '创新亮点', desc: '技术突破' },
                { icon: '📈', title: '发展前景', desc: '市场广阔' }
            ]);

            gen.timeline('发展历程', [
                { title: '启动阶段', desc: '团队组建' },
                { title: '研发阶段', desc: '产品开发' },
                { title: '测试阶段', desc: '质量保障' },
                { title: '上线阶段', desc: '正式发布' }
            ]);

            gen.dataStats('关键数据', [
                { value: '10万+', label: '用户数量', change: '+156%', highlight: true },
                { value: '99.9%', label: '系统可用性', change: '+2.3%' },
                { value: '4.8分', label: '用户评分' },
                { value: '500+', label: '合作伙伴' }
            ]);

            gen.featureList('核心功能', [
                { name: '智能分析', items: ['数据可视化', '趋势预测', '异常检测'] },
                { name: '用户管理', items: ['权限控制', '角色分配', '操作日志'] },
                { name: '系统集成', items: ['API接口', '第三方对接', '数据同步'] }
            ]);

            gen.statusList('项目进度', [
                { text: '核心模块开发完成', status: 'done' },
                { text: '用户认证系统', status: 'done' },
                { text: '数据报表功能', status: 'done' },
                { text: '性能优化待完成', status: 'pending' },
                { text: '移动端适配', status: 'pending' }
            ]);

            gen.platforms('平台覆盖', [
                { name: 'Web端', count: '完整功能', devices: ['Chrome', 'Firefox', 'Safari'] },
                { name: '移动端', count: 'iOS/Android', devices: ['iOS 14+', 'Android 10+'] },
                { name: '桌面端', count: '跨平台', devices: ['Windows', 'macOS'] }
            ], '全平台覆盖，统一体验');

            gen.quote('设计理念', '简约而不简单，让复杂变简单', '设计团队');

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
                { name: '🎯 短期目标', items: ['功能完善', '用户体验优化', '性能提升'] },
                { name: '📈 中期规划', items: ['市场拓展', '生态建设', '合作伙伴'] },
                { name: '🌟 长期愿景', items: ['行业领先', '技术创新', '全球化'] }
            ]);

            await gen.end('谢谢', '期待与您的合作', 'contact@example.com');

            gen.save(outputPath);
            results.push({ style: styleName, name: style.name, status: 'success', path: outputPath });
        } catch (e) {
            console.log(`风格 ${style.name} 生成失败:`, e.message);
            results.push({ style: styleName, name: style.name, status: 'error', error: e.message });
        }
    }

    return results;
}

module.exports = {
    ModernPPTUltra,
    STYLE_LIBRARY,
    generateAllStyles,
    recommendStyle,
    getStyle
};