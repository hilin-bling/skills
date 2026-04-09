/**
 * Modern PPT Generator Ultimate - 终极版
 *
 * 每种风格独特的布局和内容
 * 支持30+种页面类型
 * 支持切换动画和元素动画
 *
 * v6.0 - 现代美学升级：
 * - 内容感知动画引擎
 * - 现代布局系统（非对称、大字体、卡片化）
 * - 智能动画时长调整
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const { STYLE_LIBRARY, getStyle, MODERN_LAYOUT_BASE } = require('./style-library');
const { TEMPLATE_CONTENT } = require('./template-content');
const { STYLE_ANIMATIONS, applyTransition, ANIMATION_TEMPLATES, STYLE_TEMPLATE_MAPPING } = require('./animation-library');
const AnimationFacade = require('./animation-facade');

// 导入现代美学引擎
let ContentEngine = null;
let LayoutEngine = null;
try {
    ContentEngine = require('./animation-content-engine');
    LayoutEngine = require('./modern-layout-engine');
} catch (e) {
    // 模块加载失败时使用默认行为
}

class ModernPPTUltimate {
    constructor(styleName = 'deepSpace', options = {}) {
        this.pptx = new PptxGenJS();
        this.pptx.layout = 'LAYOUT_16x9';
        this.style = getStyle(styleName);
        this.styleName = styleName;
        this.slideCount = 0;
        this.enableAnimations = options.enableAnimations !== false;
        this.animationDelay = 0;

        // 动画模板系统
        this.animationTemplate = options.animationTemplate ||
                                  STYLE_TEMPLATE_MAPPING[styleName] ||
                                  'moderate';
        this._slideTypes = [];  // 记录每个幻灯片的类型

        // 动画后端选择
        this.animationBackend = options.animationBackend || null; // null=自动选择

        // 现代美学参数
        this.useModernLayout = options.useModernLayout !== false;  // 默认启用现代布局
        this.useContentAwareAnimation = options.useContentAwareAnimation !== false;

        // 获取现代布局参数
        this.layoutParams = MODERN_LAYOUT_BASE || {};
    }

    /**
     * 设置动画模板
     * @param {string} templateName - 模板名称: 'professional' | 'moderate' | 'extreme'
     */
    setAnimationTemplate(templateName) {
        if (ANIMATION_TEMPLATES[templateName]) {
            this.animationTemplate = templateName;
        } else {
            console.warn(`动画模板 "${templateName}" 不存在，使用默认模板`);
        }
        return this;
    }

    /**
     * 获取当前动画模板
     */
    getAnimationTemplate() {
        return ANIMATION_TEMPLATES[this.animationTemplate];
    }

    /**
     * 记录幻灯片类型
     */
    _recordSlideType(type) {
        this._slideTypes.push(type);
    }

    // ==========================================
    // 基础方法
    // ==========================================

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

        const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs>${gradientDef}${stops}</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`;

        const outputPath = `D:/Software/Devlop/AI/temp-gradient-${Date.now()}.png`;

        try {
            await sharp(Buffer.from(svg)).png().toFile(outputPath);
            return outputPath;
        } catch (e) {
            return null;
        }
    }

    _getTextColor(isDark = false) {
        return isDark ? 'FFFFFF' : this.style.text;
    }

    // 应用切换动画
    _applySlideTransition(slide, slideType = 'content') {
        if (!this.enableAnimations) return;

        const styleAnim = STYLE_ANIMATIONS[this.styleName] || STYLE_ANIMATIONS.deepSpace;
        let transitionType = 'fade';

        switch (slideType) {
            case 'cover':
                transitionType = 'fade';
                break;
            case 'end':
                transitionType = 'fade';
                break;
            case 'timeline':
                transitionType = styleAnim.slideTransition === 'push' ? 'wipe' : styleAnim.slideTransition;
                break;
            default:
                transitionType = styleAnim.slideTransition || 'fade';
        }

        applyTransition(slide, this.styleName, transitionType);
    }

    // 获取元素动画配置（支持内容感知）
    _getAnimationForType(elementType, element = null, context = {}) {
        if (!this.enableAnimations) return {};

        // 使用内容感知动画引擎
        if (this.useContentAwareAnimation && ContentEngine) {
            const animConfig = ContentEngine.selectBestAnimation(
                { contentType: elementType, ...element },
                context
            );
            return { type: animConfig.type || 'fade' };
        }

        const styleAnim = STYLE_ANIMATIONS[this.styleName] || STYLE_ANIMATIONS.deepSpace;

        // PptxGenJS 动画格式
        const animationMap = {
            'fade': { type: 'fade' },
            'appear': { type: 'appear' },
            'fly': { type: 'fly' },
            'float': { type: 'float' },
            'zoom': { type: 'zoom' },
            'grow': { type: 'grow' },
            'spin': { type: 'spin' },
            'bounce': { type: 'bounce' },
            'pulse': { type: 'pulse' }
        };

        let animName = 'fade';
        switch (elementType) {
            case 'title':
                animName = styleAnim.titleAnimation || 'fade';
                break;
            case 'card':
                animName = styleAnim.cardAnimation || 'fade';
                break;
            case 'stats':
                animName = styleAnim.statsAnimation || 'fade';
                break;
            default:
                animName = styleAnim.contentAnimation || 'fade';
        }

        // 转换为有效的动画名称
        if (animName.includes('flyIn') || animName.includes('fly')) {
            return { type: 'fly' };
        }
        if (animName.includes('float')) {
            return { type: 'float' };
        }
        if (animName.includes('zoom')) {
            return { type: 'zoom' };
        }
        if (animName.includes('grow')) {
            return { type: 'grow' };
        }
        if (animName.includes('bounce')) {
            return { type: 'bounce' };
        }
        if (animName.includes('pulse')) {
            return { type: 'pulse' };
        }

        return animationMap[animName] || { type: 'fade' };
    }

    async cover(title, subtitle = '', tagline = '') {
        this._recordSlideType('cover');
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark || t.cover.type === 'gradient';

        // 应用切换动画
        this._applySlideTransition(slide, 'cover');

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

        this._addDecorations(slide, 'cover');

        const textColor = isDark ? 'FFFFFF' : t.text;
        const titleAnim = this._getAnimationForType('title');

        // 使用现代布局参数
        const typography = this.layoutParams?.typography || {};
        const asymmetry = this.layoutParams?.asymmetry || {};

        if (this.useModernLayout && t.category !== 'minimal') {
            // 现代非对称布局
            const titleX = 0.08;  // 左侧偏移
            const titleFontSize = typography.heroTitle || 72;
            const subtitleFontSize = typography.subtitle || 24;

            slide.addText(title, {
                x: titleX, y: 1.6, w: 6, h: 1.3,
                fontSize: Math.min(titleFontSize, 64), fontFace: 'Arial', bold: true,
                color: textColor, align: 'left',
                ...titleAnim
            });

            if (subtitle) {
                slide.addText(subtitle, {
                    x: titleX, y: 3.0, w: 5, h: 0.5,
                    fontSize: subtitleFontSize, fontFace: 'Arial',
                    color: textColor, transparency: isDark ? 15 : 30, align: 'left',
                    ...titleAnim
                });
            }

            // 强调线 - 短线，左侧对齐
            slide.addShape(this.pptx.ShapeType.rect, {
                x: titleX, y: 3.6, w: 1.5, h: 0.03,
                fill: { color: t.accent }
            });

            if (tagline) {
                slide.addText(tagline, {
                    x: titleX, y: 3.9, w: 4.5, h: 0.5,
                    fontSize: 15, fontFace: 'Arial', italic: true,
                    color: textColor, transparency: isDark ? 25 : 40, align: 'left'
                });
            }
        } else {
            // 传统居中布局（极简风格）
            slide.addText(title, {
                x: 0.5, y: 1.6, w: 9, h: 1.3,
                fontSize: 52, fontFace: 'Arial', bold: true,
                color: textColor, align: 'center',
                ...titleAnim
            });

            if (subtitle) {
                slide.addText(subtitle, {
                    x: 0.5, y: 3.0, w: 9, h: 0.5,
                    fontSize: 22, fontFace: 'Arial',
                    color: textColor, transparency: isDark ? 15 : 30, align: 'center',
                    ...titleAnim
                });
            }

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
        }

        this.slideCount++;
    }

    _addDecorations(slide, type) {
        const t = this.style;

        if (type === 'cover' || type === 'end') {
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: -0.8, y: -0.8, w: 2, h: 2,
                fill: { color: t.accent, transparency: 85 }
            });
            slide.addShape(this.pptx.ShapeType.ellipse, {
                x: 8.5, y: 4, w: 2.5, h: 2.5,
                fill: { color: t.secondary, transparency: 80 }
            });
        }

        if (t.decorations && type === 'cover') {
            if (this.styleName === 'playful') {
                ['⭐', '🌈', '🎀'].forEach((emoji, i) => {
                    slide.addText(emoji, {
                        x: 0.5 + i * 3.2, y: 0.3, w: 0.6, h: 0.6, fontSize: 28
                    });
                });
            }
            if (this.styleName === 'chinese') {
                slide.addText('🏮', { x: 0.8, y: 0.3, w: 0.6, h: 0.6, fontSize: 28 });
                slide.addText('🎊', { x: 8.6, y: 0.3, w: 0.6, h: 0.6, fontSize: 28 });
            }
        }
    }

    contentSlide(title, showSidebar = true) {
        this._recordSlideType('content');
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark;

        // 应用切换动画
        this._applySlideTransition(slide, 'content');

        slide.background = { color: t.content };

        if (showSidebar) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0, y: 0, w: 0.22, h: 5.63,
                fill: { color: t.sidebar }
            });

            const num = String(this.slideCount).padStart(2, '0');
            slide.addText(num, {
                x: 0, y: 0.3, w: 0.22, h: 0.45,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });
        }

        const titleX = showSidebar ? 0.45 : 0.5;
        const titleColor = isDark ? 'FFFFFF' : t.primary;
        const titleAnim = this._getAnimationForType('title');

        slide.addText(title, {
            x: titleX, y: 0.32, w: 9, h: 0.5,
            fontSize: 24, fontFace: 'Arial', bold: true,
            color: titleColor,
            ...titleAnim
        });

        slide.addShape(this.pptx.ShapeType.rect, {
            x: titleX, y: 0.85, w: 1.3, h: 0.04,
            fill: { color: t.secondary }
        });

        return slide;
    }

    async end(title = '谢谢', tagline = '', contact = '') {
        this._recordSlideType('end');
        const slide = this.pptx.addSlide();
        const t = this.style;
        const isDark = t.isDark || t.cover.type === 'gradient';

        // 应用切换动画
        this._applySlideTransition(slide, 'end');

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

        this._addDecorations(slide, 'end');

        const textColor = isDark ? 'FFFFFF' : t.text;
        const titleAnim = this._getAnimationForType('title');

        slide.addText(title, {
            x: 0, y: 2, w: 10, h: 0.7,
            fontSize: 42, fontFace: 'Arial', bold: true,
            color: textColor, align: 'center',
            ...titleAnim
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

    async save(filename, options = {}) {
        const out = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        const injectAnimations = options.injectAnimations !== false && this.enableAnimations;

        // 先保存文件 (异步)
        await this.pptx.writeFile({ fileName: out });
        console.log(`保存成功: ${out}`);

        // 使用AnimationFacade后处理注入动画
        if (injectAnimations) {
            // 等待文件完全写入
            await new Promise(resolve => setTimeout(resolve, 300));

            // 获取动画模板配置
            const template = ANIMATION_TEMPLATES[this.animationTemplate] || ANIMATION_TEMPLATES.moderate;

            // 创建动画门面并应用动画
            const facadeOptions = {};
            if (this.animationBackend) {
                facadeOptions.backend = this.animationBackend;
            }

            const facade = new AnimationFacade(facadeOptions);
            const result = facade.applyAnimations(out, out, {
                template,
                slideTypes: this._slideTypes
            });

            if (result.success) {
                console.log(`动画应用成功`);
            } else {
                console.warn(`动画应用失败: ${result.reason}`);
            }
        }

        return out;
    }

    /**
     * 设置动画后端
     * @param {string} backend - 'com' | 'xml' | 'null'
     */
    setAnimationBackend(backend) {
        this.animationBackend = backend;
        return this;
    }

    // 同步保存（不注入动画）
    saveSync(filename) {
        const out = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        this.pptx.writeFile({ fileName: out });
        console.log(`保存成功: ${out}`);
        return out;
    }

    // ==========================================
    // 通用页面类型
    // ==========================================

    infoCards(title, description, cards) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;
        const cardAnim = this._getAnimationForType('card');

        if (description) {
            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.45, y: 1.15, w: 9.1, h: 0.65,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 },
                ...cardAnim
            });

            slide.addText(description, {
                x: 0.6, y: 1.22, w: 8.8, h: 0.5,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: this._getTextColor(isDark), align: 'center',
                ...cardAnim
            });
        }

        const cardW = 2.15, cardH = 1.55, gap = 0.12, startX = 0.5, startY = 2.1;

        cards.forEach((card, i) => {
            const x = startX + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: cardH,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 },
                ...cardAnim
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: startY, w: cardW, h: 0.06,
                fill: { color: t.primary }
            });

            if (card.icon) {
                slide.addText(card.icon, {
                    x: x, y: startY + 0.15, w: cardW, h: 0.42,
                    fontSize: 26, align: 'center'
                });
            }

            slide.addText(card.title, {
                x: x + 0.08, y: startY + 0.62, w: cardW - 0.16, h: 0.32,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

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

    dataStats(title, stats) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;
        const statsAnim = this._getAnimationForType('stats');

        const cardW = 2.1, gap = 0.15, startX = 0.55;

        stats.forEach((stat, i) => {
            const x = startX + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.25, w: cardW, h: 1.8,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 },
                ...statsAnim
            });

            slide.addText(stat.value, {
                x: x, y: 1.45, w: cardW, h: 0.7,
                fontSize: 36, fontFace: 'Arial', bold: true,
                color: stat.highlight ? t.accent : t.primary, align: 'center'
            });

            slide.addText(stat.label, {
                x: x, y: 2.15, w: cardW, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });

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
    // 学术风格专用
    // ==========================================

    outline(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const y = 1.3 + i * 0.75;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.65,
                fill: { color: i % 2 === 0 ? 'FFFFFF' : 'F8FAFC' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(item.num, {
                x: 0.7, y: y + 0.1, w: 0.6, h: 0.45,
                fontSize: 24, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(item.title, {
                x: 1.4, y: y + 0.15, w: 7.8, h: 0.4,
                fontSize: 18, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    literature(title, papers) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        papers.forEach((paper, i) => {
            const y = 1.25 + i * 0.85;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.75,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(paper.author, {
                x: 0.7, y: y + 0.1, w: 2.5, h: 0.28,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(paper.content, {
                x: 0.7, y: y + 0.4, w: 8.5, h: 0.28,
                fontSize: 11, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    methodology(title, steps) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const stepW = 2.1, gap = 0.15;

        steps.forEach((step, i) => {
            const x = 0.55 + i * (stepW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: stepW, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: stepW, h: 0.5,
                fill: { color: t.primary }
            });

            slide.addText(step.title, {
                x: x, y: 1.35, w: stepW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            slide.addText(step.desc, {
                x: x + 0.1, y: 1.95, w: stepW - 0.2, h: 1.5,
                fontSize: 11, fontFace: 'Arial',
                color: t.text, align: 'center', valign: 'top'
            });

            if (i < steps.length - 1) {
                slide.addText('→', {
                    x: x + stepW + 0.02, y: 2.5, w: 0.15, h: 0.4,
                    fontSize: 20, color: t.primary
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    comparison(title, rows) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        // 表头
        const headers = ['方法', '准确率', '参数量'];
        const colWidths = [3, 2.5, 2.5];

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.25, w: 8, h: 0.45,
            fill: { color: t.primary }
        });

        let xPos = 0.5;
        headers.forEach((header, i) => {
            slide.addText(header, {
                x: xPos, y: 1.28, w: colWidths[i], h: 0.4,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center', valign: 'middle'
            });
            xPos += colWidths[i];
        });

        rows.forEach((row, i) => {
            const y = 1.75 + i * 0.5;
            const isOurs = row.method === 'Ours';

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 8, h: 0.45,
                fill: { color: isOurs ? t.primary : (i % 2 === 0 ? 'FFFFFF' : 'F8FAFC'), transparency: isOurs ? 90 : 0 }
            });

            xPos = 0.5;
            [row.method, row.accuracy, row.params].forEach((cell, j) => {
                slide.addText(cell, {
                    x: xPos, y: y + 0.05, w: colWidths[j], h: 0.35,
                    fontSize: 11, fontFace: 'Arial', bold: isOurs,
                    color: isOurs ? t.primary : t.text, align: 'center', valign: 'middle'
                });
                xPos += colWidths[j];
            });
        });

        this.slideCount++;
        return slide;
    }

    conclusion(title, contributions, future) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        // 贡献
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.25, w: 4.3, h: 2.5,
            fill: { color: isDark ? t.cardBg : 'FFFFFF' },
            line: { color: t.cardBorder, width: 0.5 }
        });

        slide.addText('主要贡献', {
            x: 0.6, y: 1.35, w: 4.1, h: 0.35,
            fontSize: 14, fontFace: 'Arial', bold: true,
            color: t.primary
        });

        contributions.forEach((item, i) => {
            slide.addText('✓ ' + item, {
                x: 0.6, y: 1.8 + i * 0.45, w: 4.1, h: 0.4,
                fontSize: 11, fontFace: 'Arial',
                color: t.text
            });
        });

        // 展望
        slide.addShape(this.pptx.ShapeType.rect, {
            x: 5.0, y: 1.25, w: 4.3, h: 2.5,
            fill: { color: isDark ? t.cardBg : 'FFFFFF' },
            line: { color: t.cardBorder, width: 0.5 }
        });

        slide.addText('未来工作', {
            x: 5.1, y: 1.35, w: 4.1, h: 0.35,
            fontSize: 14, fontFace: 'Arial', bold: true,
            color: t.secondary
        });

        future.forEach((item, i) => {
            slide.addText('→ ' + item, {
                x: 5.1, y: 1.8 + i * 0.45, w: 4.1, h: 0.4,
                fontSize: 11, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 可爱童趣风格专用
    // ==========================================

    schedule(title, schedule) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const rowH = 0.45;

        schedule.forEach((item, i) => {
            const y = 1.2 + i * rowH;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: rowH - 0.05,
                fill: { color: i % 2 === 0 ? 'FFF0F5' : 'FFFFFF' },
                line: { color: 'FFB6C1', width: 0.5 }
            });

            slide.addText(item.icon || '', {
                x: 0.55, y: y, w: 0.4, h: rowH - 0.05,
                fontSize: 16, valign: 'middle'
            });

            slide.addText(item.time, {
                x: 1.0, y: y, w: 1.5, h: rowH - 0.05,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: t.primary, valign: 'middle'
            });

            slide.addText(item.activity, {
                x: 2.6, y: y, w: 6.8, h: rowH - 0.05,
                fontSize: 11, fontFace: 'Arial',
                color: t.text, valign: 'middle'
            });
        });

        this.slideCount++;
        return slide;
    }

    weeklyTheme(title, activities) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const dayW = 1.7, gap = 0.12;

        activities.forEach((act, i) => {
            const x = 0.55 + i * (dayW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: dayW, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'FFB6C1', width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: dayW, h: 0.45,
                fill: { color: t.primary }
            });

            slide.addText(act.day, {
                x: x, y: 1.22, w: dayW, h: 0.4,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            slide.addText(act.theme, {
                x: x + 0.05, y: 1.75, w: dayW - 0.1, h: 0.6,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

            slide.addText(act.activity, {
                x: x + 0.05, y: 2.4, w: dayW - 0.1, h: 0.8,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    goals(title, areas) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const colW = 2.1, gap = 0.15;

        areas.forEach((area, i) => {
            const x = 0.55 + i * (colW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'FFB6C1', width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 0.45,
                fill: { color: t.secondary }
            });

            slide.addText(area.name, {
                x: x, y: 1.22, w: colW, h: 0.4,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            area.goals.forEach((goal, j) => {
                slide.addText('• ' + goal, {
                    x: x + 0.1, y: 1.75 + j * 0.5, w: colW - 0.2, h: 0.45,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.text
                });
            });
        });

        this.slideCount++;
        return slide;
    }

    homeCooperation(title, tips) {
        const slide = this.contentSlide(title);
        const t = this.style;

        tips.forEach((tip, i) => {
            const x = 0.55 + i * 2.25;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: 2.1, h: 2.2,
                fill: { color: 'FFF5F8' },
                line: { color: 'FFB6C1', width: 0.5 }
            });

            slide.addText(tip.icon, {
                x: x, y: 1.45, w: 2.1, h: 0.5,
                fontSize: 28, align: 'center'
            });

            slide.addText(tip.title, {
                x: x + 0.1, y: 2.0, w: 1.9, h: 0.35,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(tip.desc, {
                x: x + 0.1, y: 2.4, w: 1.9, h: 0.6,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    menu(title, days) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const colW = 1.7, gap = 0.12;

        days.forEach((day, i) => {
            const x = 0.5 + i * (colW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'FFB6C1', width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 0.4,
                fill: { color: t.accent }
            });

            slide.addText(day.day, {
                x: x, y: 1.22, w: colW, h: 0.35,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            slide.addText('🍱 ' + day.lunch, {
                x: x + 0.05, y: 1.7, w: colW - 0.1, h: 0.8,
                fontSize: 9, fontFace: 'Arial',
                color: t.text
            });

            slide.addText('🍎 ' + day.snack, {
                x: x + 0.05, y: 2.6, w: colW - 0.1, h: 0.4,
                fontSize: 9, fontFace: 'Arial',
                color: t.textMuted
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 商务风格专用
    // ==========================================

    annualOverview(title, highlights) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const cardW = 2.1, gap = 0.15;

        highlights.forEach((item, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.4, w: cardW, h: 1.6,
                fill: { color: 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(item.value, {
                x: x, y: 1.6, w: cardW, h: 0.6,
                fontSize: 32, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(item.label, {
                x: x, y: 2.3, w: cardW, h: 0.4,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    projectList(title, projects) {
        const slide = this.contentSlide(title);
        const t = this.style;

        projects.forEach((proj, i) => {
            const y = 1.2 + i * 0.7;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.6,
                fill: { color: i % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(proj.name, {
                x: 0.7, y: y + 0.08, w: 3, h: 0.25,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(proj.result, {
                x: 0.7, y: y + 0.32, w: 3, h: 0.22,
                fontSize: 10, fontFace: 'Arial',
                color: '22C55E'
            });

            slide.addText(proj.status === 'done' ? '✓ 已完成' : '○ 进行中', {
                x: 7.5, y: y + 0.15, w: 1.8, h: 0.3,
                fontSize: 11, fontFace: 'Arial',
                color: proj.status === 'done' ? '22C55E' : t.textMuted,
                align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    teamBuilding(title, achievements) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const cardW = 2.1, gap = 0.15;

        achievements.forEach((item, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: cardW, h: 1.8,
                fill: { color: 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addText(item.icon, {
                x: x, y: 1.45, w: cardW, h: 0.45,
                fontSize: 26, align: 'center'
            });

            slide.addText(item.title, {
                x: x + 0.1, y: 1.95, w: cardW - 0.2, h: 0.3,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(item.desc, {
                x: x + 0.1, y: 2.3, w: cardW - 0.2, h: 0.5,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    challenges(title, issues) {
        const slide = this.contentSlide(title);
        const t = this.style;

        issues.forEach((issue, i) => {
            const y = 1.2 + i * 0.85;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 4.2, h: 0.75,
                fill: { color: 'FEF2F2' },
                line: { color: 'FECACA', width: 0.5 }
            });

            slide.addText('问题: ' + issue.problem, {
                x: 0.6, y: y + 0.1, w: 4, h: 0.55,
                fontSize: 11, fontFace: 'Arial',
                color: 'DC2626'
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 4.9, y: y, w: 4.6, h: 0.75,
                fill: { color: 'F0FDF4' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addText('方案: ' + issue.solution, {
                x: 5.0, y: y + 0.1, w: 4.4, h: 0.55,
                fontSize: 11, fontFace: 'Arial',
                color: '16A34A'
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 科技风格专用
    // ==========================================

    problem(title, problems) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const cardW = 2.1, gap = 0.15;

        problems.forEach((item, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: cardW, h: 2.0,
                fill: { color: isDark ? '1F2937' : 'FFFFFF' },
                line: { color: isDark ? '374151' : t.cardBorder, width: 0.5 }
            });

            slide.addText(item.icon, {
                x: x, y: 1.45, w: cardW, h: 0.45,
                fontSize: 28, align: 'center'
            });

            slide.addText(item.title, {
                x: x + 0.1, y: 1.95, w: cardW - 0.2, h: 0.3,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.accent, align: 'center'
            });

            slide.addText(item.desc, {
                x: x + 0.1, y: 2.3, w: cardW - 0.2, h: 0.6,
                fontSize: 10, fontFace: 'Arial',
                color: isDark ? '9CA3AF' : t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    solution(title, features) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const cardW = 2.1, gap = 0.15;

        features.forEach((item, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: cardW, h: 2.0,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.primary, width: 1 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: cardW, h: 0.06,
                fill: { color: t.primary }
            });

            slide.addText(item.icon, {
                x: x, y: 1.45, w: cardW, h: 0.45,
                fontSize: 28, align: 'center'
            });

            slide.addText(item.title, {
                x: x + 0.1, y: 1.95, w: cardW - 0.2, h: 0.3,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(item.desc, {
                x: x + 0.1, y: 2.3, w: cardW - 0.2, h: 0.6,
                fontSize: 10, fontFace: 'Arial',
                color: isDark ? 'D1D5DB' : t.text, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    architecture(title, layers) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colors = [t.primary, t.secondary, t.accent];
        const layerH = 1.0;

        layers.forEach((layer, i) => {
            const y = 1.4 + i * (layerH + 0.1);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: layerH,
                fill: { color: isDark ? '1F2937' : 'FFFFFF' },
                line: { color: colors[i % 3], width: 2 }
            });

            slide.addText(layer.name, {
                x: 0.7, y: y + 0.1, w: 1.8, h: 0.8,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: colors[i % 3], valign: 'middle'
            });

            const compW = 2.0;
            layer.components.forEach((comp, j) => {
                const cx = 2.8 + j * (compW + 0.1);

                slide.addShape(this.pptx.ShapeType.rect, {
                    x: cx, y: y + 0.25, w: compW, h: 0.5,
                    fill: { color: colors[i % 3], transparency: 85 },
                    line: { color: colors[i % 3], width: 0.5 }
                });

                slide.addText(comp, {
                    x: cx, y: y + 0.25, w: compW, h: 0.5,
                    fontSize: 10, fontFace: 'Arial',
                    color: isDark ? 'FFFFFF' : t.text, align: 'center', valign: 'middle'
                });
            });
        });

        this.slideCount++;
        return slide;
    }

    useCases(title, cases) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colW = 2.9, gap = 0.15;

        cases.forEach((c, i) => {
            const x = 0.55 + i * (colW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 3.0,
                fill: { color: isDark ? t.cardBg : 'FFFFFF' },
                line: { color: t.cardBorder, width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 0.5,
                fill: { color: t.primary }
            });

            slide.addText(c.industry, {
                x: x, y: 1.25, w: colW, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            c.scenarios.forEach((scenario, j) => {
                slide.addText('• ' + scenario, {
                    x: x + 0.15, y: 1.85 + j * 0.45, w: colW - 0.3, h: 0.4,
                    fontSize: 11, fontFace: 'Arial',
                    color: t.text
                });
            });
        });

        this.slideCount++;
        return slide;
    }

    pricing(title, plans) {
        const slide = this.contentSlide(title);
        const t = this.style;
        const isDark = t.isDark;

        const colW = 2.9, gap = 0.15;

        plans.forEach((plan, i) => {
            const x = 0.55 + i * (colW + gap);
            const isHighlight = i === 1;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 3.2,
                fill: { color: isHighlight ? t.primary : (isDark ? t.cardBg : 'FFFFFF'), transparency: isHighlight ? 95 : 0 },
                line: { color: isHighlight ? t.primary : t.cardBorder, width: isHighlight ? 2 : 0.5 }
            });

            slide.addText(plan.name, {
                x: x, y: 1.35, w: colW, h: 0.4,
                fontSize: 16, fontFace: 'Arial', bold: true,
                color: isHighlight ? t.primary : t.text, align: 'center'
            });

            slide.addText(plan.price, {
                x: x, y: 1.85, w: colW, h: 0.5,
                fontSize: 24, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            plan.features.forEach((feature, j) => {
                slide.addText('✓ ' + feature, {
                    x: x + 0.2, y: 2.5 + j * 0.4, w: colW - 0.4, h: 0.35,
                    fontSize: 10, fontFace: 'Arial',
                    color: t.text
                });
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 极简风格专用
    // ==========================================

    philosophy(title, principles) {
        const slide = this.contentSlide(title, false);
        const t = this.style;

        principles.forEach((p, i) => {
            const y = 1.5 + i * 0.8;

            slide.addText(String(i + 1).padStart(2, '0'), {
                x: 0.5, y: y, w: 0.8, h: 0.6,
                fontSize: 32, fontFace: 'Arial', bold: true,
                color: t.primary, transparency: 70
            });

            slide.addText(p, {
                x: 1.5, y: y + 0.1, w: 8, h: 0.5,
                fontSize: 22, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    portfolio(title, works) {
        const slide = this.contentSlide(title);
        const t = this.style;

        works.forEach((work, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const x = 0.5 + col * 4.6;
            const y = 1.2 + row * 1.4;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 4.4, h: 1.2,
                fill: { color: 'FAFAFA' },
                line: { color: 'E0E0E0', width: 0.5 }
            });

            slide.addText(work.name, {
                x: x + 0.15, y: y + 0.15, w: 4.1, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(work.client + ' | ' + work.year, {
                x: x + 0.15, y: y + 0.55, w: 4.1, h: 0.3,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted
            });
        });

        this.slideCount++;
        return slide;
    }

    process(title, steps) {
        const slide = this.contentSlide(title);
        const t = this.style;

        steps.forEach((step, i) => {
            const x = 0.5 + i * 2.35;

            slide.addText(step.num, {
                x: x, y: 1.4, w: 0.8, h: 0.6,
                fontSize: 28, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(step.title, {
                x: x, y: 2.1, w: 2.1, h: 0.4,
                fontSize: 16, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(step.desc, {
                x: x, y: 2.55, w: 2.1, h: 0.6,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });

            if (i < steps.length - 1) {
                slide.addShape(this.pptx.ShapeType.rect, {
                    x: x + 2.05, y: 2.2, w: 0.3, h: 0.02,
                    fill: { color: t.textMuted }
                });
            }
        });

        this.slideCount++;
        return slide;
    }

    services(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 0.5 + col * 3.1;
            const y = 1.3 + row * 1.2;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 2.9, h: 1.0,
                fill: { color: i % 2 === 0 ? 'FFFFFF' : 'F5F5F5' },
                line: { color: 'E0E0E0', width: 0.5 }
            });

            slide.addText(item, {
                x: x + 0.15, y: y + 0.3, w: 2.6, h: 0.4,
                fontSize: 13, fontFace: 'Arial',
                color: t.text, valign: 'middle'
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 引用页
    // ==========================================
    quote(title, quoteText, author = '') {
        const slide = this.contentSlide(title, false);
        const t = this.style;
        const isDark = t.isDark;

        slide.addText('"', {
            x: 0.8, y: 1.3, w: 1, h: 1,
            fontSize: 72, fontFace: 'Georgia',
            color: t.primary, transparency: 70
        });

        slide.addText(quoteText, {
            x: 1.5, y: 1.8, w: 7, h: 1.5,
            fontSize: 22, fontFace: 'Arial', italic: true,
            color: isDark ? 'FFFFFF' : t.text, align: 'center'
        });

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
    // 自然风格专用
    // ==========================================

    mission(title, mission, values) {
        const slide = this.contentSlide(title);
        const t = this.style;

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.2, w: 9, h: 0.8,
            fill: { color: 'F0FDF4' },
            line: { color: 'BBF7D0', width: 0.5 }
        });

        slide.addText(mission, {
            x: 0.7, y: 1.3, w: 8.6, h: 0.6,
            fontSize: 14, fontFace: 'Arial', italic: true,
            color: t.text, align: 'center'
        });

        const cardW = 2.8, gap = 0.2;
        values.forEach((v, i) => {
            const x = 0.6 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 2.2, w: cardW, h: 1.6,
                fill: { color: 'FFFFFF' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addText(v.icon, {
                x: x, y: 2.35, w: cardW, h: 0.4,
                fontSize: 24, align: 'center'
            });

            slide.addText(v.title, {
                x: x + 0.1, y: 2.8, w: cardW - 0.2, h: 0.3,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(v.desc, {
                x: x + 0.1, y: 3.15, w: cardW - 0.2, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // ==========================================
    // 更多页面类型...
    // ==========================================

    timeline(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const cols = Math.min(items.length, 6);
        const colW = 9 / cols;

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.65, w: 9, h: 0.03,
            fill: { color: t.cardBorder }
        });

        items.forEach((item, i) => {
            const x = 0.5 + i * colW;
            const centerX = x + colW / 2;

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

            slide.addText(item.title, {
                x: x, y: 2.0, w: colW, h: 0.35,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

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
    // 补充缺失的方法
    // ==========================================

    // 高亮页（产品亮点）
    highlight(title, items) {
        return this.infoCards(title, null, items);
    }

    // 项目列表
    projects(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const y = 1.2 + i * 0.7;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.6,
                fill: { color: i % 2 === 0 ? 'F0FDF4' : 'FFFFFF' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addText(item.name, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.25,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(item.desc, {
                x: 0.7, y: y + 0.35, w: 5, h: 0.2,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted
            });

            slide.addText(item.status, {
                x: 7.5, y: y + 0.15, w: 1.8, h: 0.3,
                fontSize: 10, fontFace: 'Arial',
                color: item.status === '已完成' ? '22C55E' : t.secondary,
                align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 影响对比
    impact(title, impacts) {
        const slide = this.contentSlide(title);
        const t = this.style;

        impacts.forEach((item, i) => {
            const y = 1.2 + i * 0.75;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 4.2, h: 0.65,
                fill: { color: 'FEF2F2' },
                line: { color: 'FECACA', width: 0.5 }
            });

            slide.addText(item.area + ': ' + item.before, {
                x: 0.6, y: y + 0.15, w: 4, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: 'DC2626'
            });

            slide.addText('→', {
                x: 4.3, y: y + 0.15, w: 0.5, h: 0.35,
                fontSize: 16, color: t.primary
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 4.9, y: y, w: 4.6, h: 0.65,
                fill: { color: 'F0FDF4' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addText(item.after, {
                x: 5.0, y: y + 0.15, w: 4.4, h: 0.35,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: '16A34A'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 合作伙伴
    partners(title, categories) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const colW = 2.9, gap = 0.15;

        categories.forEach((cat, i) => {
            const x = 0.55 + i * (colW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 2.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.2, w: colW, h: 0.45,
                fill: { color: t.primary }
            });

            slide.addText(cat.type, {
                x: x, y: 1.22, w: colW, h: 0.4,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: 'FFFFFF', align: 'center'
            });

            cat.partners.forEach((partner, j) => {
                slide.addText('• ' + partner, {
                    x: x + 0.15, y: 1.8 + j * 0.4, w: colW - 0.3, h: 0.35,
                    fontSize: 11, fontFace: 'Arial',
                    color: t.text
                });
            });
        });

        this.slideCount++;
        return slide;
    }

    // 里程碑
    milestones(title, events) {
        const slide = this.contentSlide(title);
        const t = this.style;

        events.forEach((event, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 0.5 + col * 4.6;
            const y = 1.2 + row * 1.5;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 4.4, h: 1.3,
                fill: { color: 'FFF8E1' },
                line: { color: 'D7CCC8', width: 0.5 }
            });

            slide.addText(event.year, {
                x: x + 0.15, y: y + 0.1, w: 0.8, h: 0.4,
                fontSize: 18, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(event.title, {
                x: x + 1.0, y: y + 0.15, w: 3.2, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(event.desc, {
                x: x + 0.15, y: y + 0.6, w: 4.1, h: 0.5,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });
        });

        this.slideCount++;
        return slide;
    }

    // 回忆
    memories(title, memories) {
        const slide = this.contentSlide(title);
        const t = this.style;

        memories.forEach((mem, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 0.5 + col * 4.6;
            const y = 1.2 + row * 1.4;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 4.4, h: 1.2,
                fill: { color: 'FFF8E1' },
                line: { color: 'D7CCC8', width: 0.5 }
            });

            slide.addText(mem.title, {
                x: x + 0.15, y: y + 0.15, w: 4.1, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(mem.desc, {
                x: x + 0.15, y: y + 0.55, w: 4.1, h: 0.5,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });
        });

        this.slideCount++;
        return slide;
    }

    // 人物
    people(title, groups) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const colW = 2.1, gap = 0.15;

        groups.forEach((group, i) => {
            const x = 0.55 + i * (colW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: colW, h: 2.2,
                fill: { color: 'FFF8E1' },
                line: { color: 'D7CCC8', width: 0.5 }
            });

            slide.addText(group.title, {
                x: x, y: 1.4, w: colW, h: 0.35,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(group.count, {
                x: x, y: 1.8, w: colW, h: 0.5,
                fontSize: 24, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });

            slide.addText(group.desc, {
                x: x + 0.1, y: 2.4, w: colW - 0.2, h: 0.8,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 未来展望
    future(title, vision, goals) {
        const slide = this.contentSlide(title);
        const t = this.style;

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.2, w: 9, h: 0.8,
            fill: { color: 'FFF8E1' },
            line: { color: 'D7CCC8', width: 0.5 }
        });

        slide.addText(vision, {
            x: 0.7, y: 1.35, w: 8.6, h: 0.5,
            fontSize: 18, fontFace: 'Arial', bold: true,
            color: t.primary, align: 'center'
        });

        goals.forEach((goal, i) => {
            const y = 2.2 + i * 0.5;

            slide.addText('→ ' + goal, {
                x: 1.5, y: y, w: 7, h: 0.4,
                fontSize: 14, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    // 课程计划
    program(title, description, features) {
        const slide = this.contentSlide(title);
        const t = this.style;

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.2, w: 9, h: 0.6,
            fill: { color: 'FFF7ED' },
            line: { color: 'FED7AA', width: 0.5 }
        });

        slide.addText(description, {
            x: 0.7, y: 1.3, w: 8.6, h: 0.4,
            fontSize: 14, fontFace: 'Arial', bold: true,
            color: t.text, align: 'center'
        });

        const cardW = 2.1, gap = 0.15;

        features.forEach((f, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 2.0, w: cardW, h: 1.8,
                fill: { color: 'FFFFFF' },
                line: { color: 'FED7AA', width: 0.5 }
            });

            slide.addText(f.icon, {
                x: x, y: 2.15, w: cardW, h: 0.45,
                fontSize: 28, align: 'center'
            });

            slide.addText(f.title, {
                x: x + 0.1, y: 2.65, w: cardW - 0.2, h: 0.3,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(f.desc, {
                x: x + 0.1, y: 3.0, w: cardW - 0.2, h: 0.5,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 训练动作
    exercises(title, exercises) {
        const slide = this.contentSlide(title);
        const t = this.style;

        exercises.forEach((ex, i) => {
            const y = 1.2 + i * 0.7;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.6,
                fill: { color: i % 2 === 0 ? 'FFF7ED' : 'FFFFFF' },
                line: { color: 'FED7AA', width: 0.5 }
            });

            slide.addText(ex.name, {
                x: 0.7, y: y + 0.1, w: 2.5, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(ex.target, {
                x: 3.3, y: y + 0.15, w: 3, h: 0.3,
                fontSize: 11, fontFace: 'Arial',
                color: t.text
            });

            slide.addText(ex.reps, {
                x: 7.5, y: y + 0.15, w: 1.8, h: 0.3,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: t.secondary, align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 营养建议
    nutrition(title, tips) {
        return this.infoCards(title, null, tips);
    }

    // 进度
    progress(title, milestones) {
        const slide = this.contentSlide(title);
        const t = this.style;

        milestones.forEach((m, i) => {
            const y = 1.2 + i * 1.0;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.85,
                fill: { color: i % 2 === 0 ? 'FFF7ED' : 'FFFFFF' },
                line: { color: 'FED7AA', width: 0.5 }
            });

            slide.addText(m.week, {
                x: 0.7, y: y + 0.1, w: 1.5, h: 0.35,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(m.result, {
                x: 2.3, y: y + 0.15, w: 7, h: 0.55,
                fontSize: 12, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    // 概览
    overview(title, info) {
        const slide = this.contentSlide(title);
        const t = this.style;

        const cardW = 2.1, gap = 0.15;

        info.forEach((item, i) => {
            const x = 0.55 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.4, w: cardW, h: 1.4,
                fill: { color: 'F0F9FF' },
                line: { color: 'BAE6FD', width: 0.5 }
            });

            slide.addText(item.label, {
                x: x, y: 1.5, w: cardW, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });

            slide.addText(item.value, {
                x: x, y: 1.9, w: cardW, h: 0.6,
                fontSize: 28, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 质量指标
    quality(title, indicators) {
        const slide = this.contentSlide(title);
        const t = this.style;

        indicators.forEach((ind, i) => {
            const y = 1.2 + i * 0.65;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.55,
                fill: { color: i % 2 === 0 ? 'F0F9FF' : 'FFFFFF' },
                line: { color: 'BAE6FD', width: 0.5 }
            });

            slide.addText(ind.name, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: t.text
            });

            slide.addText('目标: ' + ind.target, {
                x: 4.0, y: y + 0.1, w: 2.5, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });

            slide.addText('实际: ' + ind.actual, {
                x: 7.0, y: y + 0.1, w: 2.3, h: 0.35,
                fontSize: 11, fontFace: 'Arial', bold: true,
                color: '22C55E', align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 学术成果
    academic(title, achievements) {
        const slide = this.contentSlide(title);
        const t = this.style;

        achievements.forEach((item, i) => {
            const x = 0.55 + i * 2.35;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 1.3, w: 2.2, h: 1.5,
                fill: { color: 'F0F9FF' },
                line: { color: 'BAE6FD', width: 0.5 }
            });

            slide.addText(item.type, {
                x: x, y: 1.4, w: 2.2, h: 0.35,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(item.count, {
                x: x, y: 1.85, w: 2.2, h: 0.5,
                fontSize: 18, fontFace: 'Arial', bold: true,
                color: t.text, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 技术创新
    innovation(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const y = 1.2 + i * 0.7;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.6,
                fill: { color: i % 2 === 0 ? 'F0F9FF' : 'FFFFFF' },
                line: { color: 'BAE6FD', width: 0.5 }
            });

            slide.addText(item.name, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.4,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(item.desc, {
                x: 4.0, y: y + 0.15, w: 5.3, h: 0.3,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });
        });

        this.slideCount++;
        return slide;
    }

    // 执行摘要
    executive(title, highlights) {
        const slide = this.contentSlide(title);
        const t = this.style;

        highlights.forEach((h, i) => {
            const y = 1.2 + i * 0.7;

            slide.addText('• ' + h, {
                x: 0.7, y: y, w: 8.6, h: 0.6,
                fontSize: 14, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }

    // 收入分析
    revenue(title, breakdown) {
        const slide = this.contentSlide(title);
        const t = this.style;

        breakdown.forEach((item, i) => {
            const y = 1.2 + i * 0.85;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.75,
                fill: { color: i % 2 === 0 ? 'EBF8FF' : 'FFFFFF' },
                line: { color: 'BEE3F8', width: 0.5 }
            });

            slide.addText(item.category, {
                x: 0.7, y: y + 0.1, w: 2.5, h: 0.55,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(item.amount, {
                x: 3.5, y: y + 0.15, w: 2, h: 0.45,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(item.percent, {
                x: 5.8, y: y + 0.15, w: 1.5, h: 0.45,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted
            });

            slide.addText(item.trend, {
                x: 7.5, y: y + 0.15, w: 1.8, h: 0.45,
                fontSize: 12, fontFace: 'Arial', bold: true,
                color: item.trend.startsWith('+') ? '22C55E' : 'EF4444', align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 成本分析
    expense(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const y = 1.2 + i * 0.75;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.65,
                fill: { color: i % 2 === 0 ? 'FEF2F2' : 'FFFFFF' },
                line: { color: 'FECACA', width: 0.5 }
            });

            slide.addText(item.name, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.45,
                fontSize: 13, fontFace: 'Arial',
                color: t.text
            });

            slide.addText(item.amount, {
                x: 4.0, y: y + 0.1, w: 2, h: 0.45,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(item.percent, {
                x: 6.5, y: y + 0.15, w: 2.8, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted, align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 资产负债
    balance(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 0.5 + col * 4.6;
            const y = 1.2 + row * 1.3;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 4.4, h: 1.1,
                fill: { color: col === 0 ? 'EBF8FF' : 'F0FDF4' },
                line: { color: col === 0 ? 'BEE3F8' : 'BBF7D0', width: 0.5 }
            });

            slide.addText(item.name, {
                x: x + 0.15, y: y + 0.15, w: 4.1, h: 0.35,
                fontSize: 12, fontFace: 'Arial',
                color: t.textMuted
            });

            slide.addText(item.amount, {
                x: x + 0.15, y: y + 0.55, w: 4.1, h: 0.45,
                fontSize: 20, fontFace: 'Arial', bold: true,
                color: t.primary
            });
        });

        this.slideCount++;
        return slide;
    }

    // 预测
    forecast(title, predictions) {
        const slide = this.contentSlide(title);
        const t = this.style;

        predictions.forEach((pred, i) => {
            const y = 1.2 + i * 0.9;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.75,
                fill: { color: i % 2 === 0 ? 'EBF8FF' : 'FFFFFF' },
                line: { color: 'BEE3F8', width: 0.5 }
            });

            slide.addText(pred.item, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.55,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.text
            });

            slide.addText(pred.forecast, {
                x: 4.0, y: y + 0.15, w: 2.5, h: 0.45,
                fontSize: 16, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText('置信度: ' + pred.confidence, {
                x: 7.0, y: y + 0.2, w: 2.3, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted, align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 风险提示
    risks(title, risks) {
        const slide = this.contentSlide(title);
        const t = this.style;

        risks.forEach((r, i) => {
            const y = 1.2 + i * 0.9;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 3.5, h: 0.75,
                fill: { color: 'FEF2F2' },
                line: { color: 'FECACA', width: 0.5 }
            });

            slide.addText(r.risk, {
                x: 0.6, y: y + 0.15, w: 3.3, h: 0.45,
                fontSize: 12, fontFace: 'Arial',
                color: 'DC2626'
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 4.2, y: y, w: 1.2, h: 0.75,
                fill: { color: r.impact === '高' ? 'FEE2E2' : (r.impact === '中等' ? 'FEF3C7' : 'D1FAE5') },
                line: { color: 'E5E7EB', width: 0.5 }
            });

            slide.addText(r.impact, {
                x: 4.2, y: y + 0.2, w: 1.2, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.text, align: 'center'
            });

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 5.6, y: y, w: 3.9, h: 0.75,
                fill: { color: 'F0FDF4' },
                line: { color: 'BBF7D0', width: 0.5 }
            });

            slide.addText(r.measure, {
                x: 5.7, y: y + 0.15, w: 3.7, h: 0.45,
                fontSize: 11, fontFace: 'Arial',
                color: '16A34A'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 简介
    intro(title, content, values) {
        const slide = this.contentSlide(title);
        const t = this.style;

        slide.addShape(this.pptx.ShapeType.rect, {
            x: 0.5, y: 1.2, w: 9, h: 1.0,
            fill: { color: 'FFFBF5' },
            line: { color: 'DEB887', width: 0.5 }
        });

        slide.addText(content, {
            x: 0.7, y: 1.35, w: 8.6, h: 0.7,
            fontSize: 12, fontFace: 'Arial',
            color: t.text
        });

        const cardW = 2.8, gap = 0.2;
        values.forEach((v, i) => {
            const x = 0.6 + i * (cardW + gap);

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: 2.4, w: cardW, h: 1.5,
                fill: { color: 'FFFFFF' },
                line: { color: 'DEB887', width: 0.5 }
            });

            slide.addText(v.icon, {
                x: x, y: 2.5, w: cardW, h: 0.4,
                fontSize: 22, align: 'center'
            });

            slide.addText(v.title, {
                x: x + 0.1, y: 2.95, w: cardW - 0.2, h: 0.3,
                fontSize: 13, fontFace: 'Arial', bold: true,
                color: t.primary, align: 'center'
            });

            slide.addText(v.desc, {
                x: x + 0.1, y: 3.3, w: cardW - 0.2, h: 0.4,
                fontSize: 10, fontFace: 'Arial',
                color: t.textMuted, align: 'center'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 非遗项目
    heritage(title, items) {
        const slide = this.contentSlide(title);
        const t = this.style;

        items.forEach((item, i) => {
            const y = 1.2 + i * 0.75;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.65,
                fill: { color: i % 2 === 0 ? 'FFFBF5' : 'FFFFFF' },
                line: { color: 'DEB887', width: 0.5 }
            });

            slide.addText(item.name, {
                x: 0.7, y: y + 0.1, w: 3, h: 0.45,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(item.region, {
                x: 4.0, y: y + 0.15, w: 2.5, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.textMuted
            });

            slide.addText(item.level, {
                x: 7.0, y: y + 0.15, w: 2.3, h: 0.35,
                fontSize: 11, fontFace: 'Arial',
                color: t.secondary, align: 'right'
            });
        });

        this.slideCount++;
        return slide;
    }

    // 匠人
    craftsman(title, masters) {
        const slide = this.contentSlide(title);
        const t = this.style;

        masters.forEach((m, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 0.5 + col * 4.6;
            const y = 1.2 + row * 1.5;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: x, y: y, w: 4.4, h: 1.3,
                fill: { color: 'FFFBF5' },
                line: { color: 'DEB887', width: 0.5 }
            });

            slide.addText(m.name, {
                x: x + 0.15, y: y + 0.1, w: 2, h: 0.4,
                fontSize: 14, fontFace: 'Arial', bold: true,
                color: t.primary
            });

            slide.addText(m.craft + ' · ' + m.years, {
                x: x + 0.15, y: y + 0.5, w: 4.1, h: 0.3,
                fontSize: 11, fontFace: 'Arial',
                color: t.text
            });

            slide.addText(m.honor, {
                x: x + 0.15, y: y + 0.85, w: 4.1, h: 0.3,
                fontSize: 10, fontFace: 'Arial',
                color: t.secondary
            });
        });

        this.slideCount++;
        return slide;
    }

    // 现代创新
    modern(title, innovations) {
        return this.infoCards(title, null, innovations);
    }

    // 愿景
    vision(title, goals) {
        const slide = this.contentSlide(title);
        const t = this.style;

        goals.forEach((goal, i) => {
            const y = 1.2 + i * 0.8;

            slide.addShape(this.pptx.ShapeType.rect, {
                x: 0.5, y: y, w: 9, h: 0.7,
                fill: { color: i % 2 === 0 ? 'FFFBF5' : 'FFFFFF' },
                line: { color: 'DEB887', width: 0.5 }
            });

            slide.addText('🏮 ' + goal, {
                x: 0.7, y: y + 0.15, w: 8.6, h: 0.4,
                fontSize: 14, fontFace: 'Arial',
                color: t.text
            });
        });

        this.slideCount++;
        return slide;
    }
}

// ==========================================
// 生成所有风格模板
// ==========================================
async function generateAllTemplates(outputDir) {
    const styles = Object.keys(STYLE_LIBRARY);
    const results = [];

    // 定义方法参数顺序
    const methodSignatures = {
        infoCards: ['title', 'description', 'cards'],
        dataStats: ['title', 'stats'],
        roadmap: ['title', 'sections'],
        outline: ['title', 'items'],
        literature: ['title', 'papers'],
        methodology: ['title', 'steps'],
        comparison: ['title', 'rows'],
        conclusion: ['title', 'contributions', 'future'],
        schedule: ['title', 'schedule'],
        weeklyTheme: ['title', 'activities'],
        goals: ['title', 'areas'],
        homeCooperation: ['title', 'tips'],
        menu: ['title', 'days'],
        annualOverview: ['title', 'highlights'],
        projectList: ['title', 'projects'],
        teamBuilding: ['title', 'achievements'],
        challenges: ['title', 'issues'],
        problem: ['title', 'problems'],
        solution: ['title', 'features'],
        architecture: ['title', 'layers'],
        useCases: ['title', 'cases'],
        pricing: ['title', 'plans'],
        philosophy: ['title', 'principles'],
        portfolio: ['title', 'works'],
        process: ['title', 'steps'],
        services: ['title', 'items'],
        quote: ['title', 'quoteText', 'author'],
        mission: ['title', 'mission', 'values'],
        timeline: ['title', 'items'],
        highlight: ['title', 'items'],
        projects: ['title', 'items'],
        impact: ['title', 'impacts'],
        partners: ['title', 'categories'],
        milestones: ['title', 'events'],
        memories: ['title', 'memories'],
        people: ['title', 'groups'],
        future: ['title', 'vision', 'goals'],
        program: ['title', 'description', 'features'],
        exercises: ['title', 'exercises'],
        nutrition: ['title', 'tips'],
        progress: ['title', 'milestones'],
        overview: ['title', 'info'],
        quality: ['title', 'indicators'],
        academic: ['title', 'achievements'],
        innovation: ['title', 'items'],
        executive: ['title', 'highlights'],
        revenue: ['title', 'breakdown'],
        expense: ['title', 'items'],
        balance: ['title', 'items'],
        forecast: ['title', 'predictions'],
        risks: ['title', 'risks'],
        intro: ['title', 'content', 'values'],
        heritage: ['title', 'items'],
        craftsman: ['title', 'masters'],
        modern: ['title', 'innovations'],
        vision: ['title', 'goals']
    };

    for (const styleName of styles) {
        const template = TEMPLATE_CONTENT[styleName];
        if (!template) {
            console.log(`跳过风格 ${styleName}: 没有对应模板内容`);
            continue;
        }

        const outputPath = path.join(outputDir, `PPT_${template.name}.pptx`);
        console.log(`\n生成: ${template.name} - ${template.scenario}`);

        try {
            const gen = new ModernPPTUltimate(styleName);

            // 封面
            const cover = template.content.cover;
            await gen.cover(cover.title, cover.subtitle, cover.tagline);

            // 内容页
            for (const slideConfig of template.content.slides) {
                const method = slideConfig.type;
                if (typeof gen[method] === 'function') {
                    // 按照方法签名顺序获取参数
                    const signature = methodSignatures[method] || [];
                    const args = signature.map(param => slideConfig[param]);
                    gen[method](...args);
                } else {
                    console.log(`  警告: 方法 ${method} 不存在`);
                }
            }

            // 结束页
            const end = template.content.end;
            await gen.end(end.title, end.tagline, end.contact);

            gen.save(outputPath);
            results.push({ style: styleName, name: template.name, status: 'success', path: outputPath });

        } catch (e) {
            console.log(`  错误: ${e.message}`);
            results.push({ style: styleName, name: template.name, status: 'error', error: e.message });
        }
    }

    return results;
}

module.exports = {
    ModernPPTUltimate,
    STYLE_LIBRARY,
    TEMPLATE_CONTENT,
    generateAllTemplates
};