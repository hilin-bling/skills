/**
 * Modern PPT Generator - 高级时尚PPT生成器
 *
 * 解决中文乱码：使用Windows系统字体（微软雅黑、宋体）
 * 融入2025设计趋势：Bento Grid、玻璃态、大胆排版、渐变Mesh
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

// ============================================
// 字体配置 - 解决中文乱码的关键
// ============================================
const FONT_CONFIG = {
    // Windows系统中文字体（必须使用正确的系统名称）
    chinese: {
        title: 'Microsoft YaHei',      // 微软雅黑 - 现代风格
        body: 'Microsoft YaHei',       // 微软雅黑
        traditional: 'SimSun',         // 宋体 - 传统风格
        bold: 'Microsoft YaHei Bold',  // 微软雅黑粗体
        light: 'Microsoft YaHei Light' // 微软雅黑细体
    },
    // 英文字体
    english: {
        title: 'Arial',
        body: 'Arial',
        modern: 'Helvetica',
        mono: 'Consolas'
    },
    // 跨平台字体fallback
    fallback: {
        mac: {
            chinese: 'PingFang SC',
            english: 'Helvetica Neue'
        },
        linux: {
            chinese: 'Noto Sans CJK SC',
            english: 'DejaVu Sans'
        }
    }
};

// ============================================
// 2025时尚设计系统
// ============================================
const DESIGN_2025 = {
    // 风格定义
    styles: {
        fashion: {
            name: '时尚先锋',
            description: '大胆排版、渐变Mesh、玻璃态效果',
            colors: {
                primary: '7C3AED',      // Cyber Purple
                secondary: 'EC4899',    // Hot Pink
                accent1: '22D3EE',      // Electric Blue
                accent2: 'F59E0B',      // Amber
                background: '0F172A',   // Deep Dark
                surface: '1E293B',      // Slate Surface
                text: 'F8FAFC',         // Light Text
                textMuted: '94A3B8'     // Muted Text
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 72, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 44, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 18, weight: 'normal' },
                caption: { name: 'Microsoft YaHei', size: 14, weight: 'normal' }
            },
            gradients: [
                ['#7C3AED', '#EC4899', '#F59E0B'],  // Aurora
                ['#0F172A', '#7C3AED', '#EC4899'],  // Dark Aurora
                ['#22D3EE', '#7C3AED', '#0F172A']   // Cyber Fade
            ]
        },

        bento: {
            name: 'Bento Grid',
            description: '模块化卡片布局、现代极简',
            colors: {
                primary: '18181B',      // Black
                secondary: '27272A',    // Zinc
                accent: '2563EB',       // Blue
                surface: 'FFFFFF',      // White
                surfaceAlt: 'F4F4F5',   // Zinc 100
                text: '18181B',         // Black
                textMuted: '71717A'     // Zinc 500
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 64, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 32, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 16, weight: 'normal' },
                caption: { name: 'Microsoft YaHei', size: 12, weight: 'normal' }
            }
        },

        glassmorphism: {
            name: '玻璃态',
            description: '磨砂玻璃效果、透明层次',
            colors: {
                primary: '3B82F6',      // Blue
                secondary: '8B5CF6',    // Violet
                accent: '06B6D4',       // Cyan
                background: '1E3A8A',   // Blue 900
                glass: 'FFFFFF',        // Glass base
                glassBorder: 'E2E8F0',  // Glass border
                text: 'FFFFFF',
                textDark: '1E293B'
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 56, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 36, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 18, weight: 'normal' },
                caption: { name: 'Microsoft YaHei', size: 14, weight: 'normal' }
            }
        },

        neon: {
            name: '霓虹赛博',
            description: '霓虹发光效果、赛博朋克风格',
            colors: {
                background: '0F0F0F',   // Pure Black
                neon1: '00FF88',        // Neon Green
                neon2: 'FF00FF',        // Neon Magenta
                neon3: '00FFFF',        // Neon Cyan
                text: 'FFFFFF',
                textGlow: '00FF88'
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 80, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 48, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 20, weight: 'normal' },
                caption: { name: 'Microsoft YaHei', size: 16, weight: 'normal' }
            }
        },

        minimalDark: {
            name: '极简暗黑',
            description: '高对比暗黑、极简主义',
            colors: {
                background: '000000',
                surface: '0A0A0A',
                accent: 'FFFFFF',
                accentAlt: '6366F1',    // Indigo
                text: 'FFFFFF',
                textMuted: '52525B'     // Zinc 600
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 72, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 36, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 18, weight: 'light' },
                caption: { name: 'Microsoft YaHei', size: 14, weight: 'normal' }
            }
        },

        corporateModern: {
            name: '现代商务',
            description: '专业但不沉闷、清新商务风格',
            colors: {
                primary: '1E40AF',      // Blue 700
                secondary: '0369A1',    // Sky 700
                accent: 'F59E0B',       // Amber
                background: 'F8FAFC',   // Slate 50
                surface: 'FFFFFF',
                text: '1E293B',         // Slate 800
                textMuted: '64748B'     // Slate 500
            },
            fonts: {
                hero: { name: 'Microsoft YaHei', size: 48, weight: 'bold' },
                title: { name: 'Microsoft YaHei', size: 32, weight: 'bold' },
                body: { name: 'Microsoft YaHei', size: 16, weight: 'normal' },
                caption: { name: 'Microsoft YaHei', size: 12, weight: 'normal' }
            }
        }
    },

    // Bento Grid布局配置
    bentoLayouts: {
        // 2x2 大卡片布局
        hero2x2: [
            { x: 0, y: 0, w: 5, h: 3.5, size: 'large' },   // 主卡片
            { x: 5.2, y: 0, w: 4.8, h: 1.7, size: 'medium' },
            { x: 5.2, y: 1.9, w: 2.3, h: 1.6, size: 'small' },
            { x: 7.6, y: 1.9, w: 2.4, h: 1.6, size: 'small' }
        ],
        // 3列布局
        threeColumn: [
            { x: 0, y: 0, w: 3.2, h: 2.8, size: 'medium' },
            { x: 3.4, y: 0, w: 3.2, h: 2.8, size: 'medium' },
            { x: 6.6, y: 0, w: 3.4, h: 2.8, size: 'medium' }
        ],
        // 不对称布局
        asymmetric: [
            { x: 0, y: 0, w: 6, h: 2.5, size: 'large' },
            { x: 6.2, y: 0, w: 3.8, h: 2.5, size: 'medium' },
            { x: 0, y: 2.7, w: 2.5, h: 1.8, size: 'small' },
            { x: 2.7, y: 2.7, w: 2.5, h: 1.8, size: 'small' },
            { x: 5.4, y: 2.7, w: 4.6, h: 1.8, size: 'medium' }
        ]
    }
};

// ============================================
// 核心生成器类
// ============================================
class ModernPPTGenerator {
    constructor(style = 'fashion') {
        this.pptx = new PptxGenJS();
        this.style = DESIGN_2025.styles[style] || DESIGN_2025.styles.fashion;
        this.styleName = style;

        // 配置PPT
        this.pptx.layout = 'LAYOUT_16x9';
        this.pptx.title = 'Modern Presentation';
        this.pptx.author = 'Modern PPT Generator';
        this.pptx.company = 'Generated with Modern PPT Skill';

        // 设置默认字体（关键：解决中文乱码）
        this.pptx.defineLayout({ name: 'CUSTOM_16x9', width: 10, height: 5.625 });
    }

    // 获取正确的字体名称
    getFont(type = 'body') {
        const fontConfig = this.style.fonts[type];
        if (!fontConfig) return FONT_CONFIG.chinese.body;

        // 使用Windows系统字体名称
        return fontConfig.name || FONT_CONFIG.chinese.body;
    }

    // 创建封面页
    createCoverSlide(title, subtitle = '', options = {}) {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        // 背景
        if (options.gradient) {
            // 使用渐变背景图片
            slide.background = { path: options.gradient };
        } else if (options.darkGradient) {
            slide.background = { color: colors.background || '0F172A' };
        } else {
            slide.background = { color: colors.background || colors.surface || 'FFFFFF' };
        }

        // 大标题 - 超大排版
        slide.addText(title, {
            x: 0.5, y: 1.8, w: 9, h: 1.5,
            fontSize: this.style.fonts.hero.size,
            fontFace: this.getFont('hero'),
            bold: true,
            color: colors.text || 'FFFFFF',
            align: options.center ? 'center' : 'left',
            valign: 'middle',
            shadow: options.textShadow ? {
                type: 'outer',
                blur: 10,
                offset: 3,
                angle: 45,
                color: '000000',
                opacity: 0.4
            } : undefined
        });

        // 副标题
        if (subtitle) {
            slide.addText(subtitle, {
                x: 0.5, y: 3.3, w: 9, h: 0.6,
                fontSize: this.style.fonts.body.size,
                fontFace: this.getFont('body'),
                color: colors.textMuted || colors.accent || '94A3B8',
                align: options.center ? 'center' : 'left'
            });
        }

        // 装饰元素
        if (this.styleName === 'fashion' || this.styleName === 'neon') {
            this.addDecorativeElements(slide, colors);
        }

        return slide;
    }

    // 添加装饰元素
    addDecorativeElements(slide, colors) {
        // 渐变圆形装饰
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: 8.5, y: -1, w: 2.5, h: 2.5,
            fill: { color: colors.primary, transparency: 60 }
        });
        slide.addShape(this.pptx.ShapeType.ellipse, {
            x: -0.5, y: 3.5, w: 2, h: 2,
            fill: { color: colors.secondary, transparency: 70 }
        });
    }

    // 创建Bento Grid卡片布局
    createBentoSlide(cards, layoutType = 'hero2x2') {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;
        const layout = DESIGN_2025.bentoLayouts[layoutType] || DESIGN_2025.bentoLayouts.hero2x2;

        // 背景
        slide.background = { color: colors.background || 'F4F4F5' };

        // 渲染每个卡片
        layout.forEach((pos, i) => {
            const card = cards[i] || { title: '', content: '' };
            this.addBentoCard(slide, pos, card, colors);
        });

        return slide;
    }

    // 添加单个Bento卡片
    addBentoCard(slide, pos, card, colors) {
        // 卡片背景 - 玻璃态或纯色
        const isGlassStyle = this.styleName === 'glassmorphism';
        const cardBgColor = card.highlight ? colors.primary : colors.surface;

        slide.addShape(this.pptx.ShapeType.roundRect, {
            x: pos.x, y: pos.y, w: pos.w, h: pos.h,
            fill: {
                color: cardBgColor,
                transparency: isGlassStyle ? 20 : 0
            },
            line: isGlassStyle ? {
                color: colors.glassBorder,
                width: 1,
                transparency: 50
            } : undefined,
            shadow: {
                type: 'outer',
                blur: 8,
                offset: 3,
                angle: 45,
                color: '000000',
                opacity: 0.15
            }
        });

        // 卡片标题
        if (card.title) {
            slide.addText(card.title, {
                x: pos.x + 0.15, y: pos.y + 0.15, w: pos.w - 0.3, h: 0.5,
                fontSize: pos.size === 'large' ? 28 : (pos.size === 'medium' ? 20 : 16),
                fontFace: this.getFont('title'),
                bold: true,
                color: card.highlight ? 'FFFFFF' : colors.text
            });
        }

        // 卡片内容
        if (card.content) {
            slide.addText(card.content, {
                x: pos.x + 0.15, y: pos.y + 0.7, w: pos.w - 0.3, h: pos.h - 0.9,
                fontSize: pos.size === 'large' ? 18 : (pos.size === 'medium' ? 14 : 12),
                fontFace: this.getFont('body'),
                color: card.highlight ? 'FFFFFF' : colors.textMuted,
                valign: 'top'
            });
        }

        // 卡片数值（如果有）
        if (card.value) {
            slide.addText(card.value, {
                x: pos.x + 0.15, y: pos.y + pos.h - 0.8, w: pos.w - 0.3, h: 0.6,
                fontSize: pos.size === 'large' ? 36 : 24,
                fontFace: this.getFont('title'),
                bold: true,
                color: card.highlight ? colors.accent : colors.primary
            });
        }
    }

    // 创建玻璃态面板
    createGlassPanelSlide(title, panels) {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        // 渐变背景
        slide.background = { color: colors.background };

        // 标题
        slide.addText(title, {
            x: 0.5, y: 0.3, w: 9, h: 0.8,
            fontSize: this.style.fonts.title.size,
            fontFace: this.getFont('title'),
            bold: true,
            color: colors.text
        });

        // 玻璃态面板
        panels.forEach((panel, i) => {
            const xPos = 0.5 + i * 3.2;

            // 玻璃背景
            slide.addShape(this.pptx.ShapeType.roundRect, {
                x: xPos, y: 1.5, w: 3, h: 3.5,
                fill: { color: colors.glass, transparency: 15 },
                line: { color: colors.glassBorder, width: 1, transparency: 40 },
                shadow: {
                    type: 'outer',
                    blur: 20,
                    offset: 8,
                    angle: 45,
                    color: '000000',
                    opacity: 0.25
                }
            });

            // 面板内容
            slide.addText(panel.title, {
                x: xPos + 0.2, y: 1.7, w: 2.6, h: 0.5,
                fontSize: 18, fontFace: this.getFont('title'),
                bold: true, color: colors.textDark
            });

            slide.addText(panel.content, {
                x: xPos + 0.2, y: 2.3, w: 2.6, h: 2.5,
                fontSize: 14, fontFace: this.getFont('body'),
                color: colors.textMuted, valign: 'top'
            });
        });

        return slide;
    }

    // 创建霓虹效果标题页
    createNeonTitleSlide(text, glowColor = '00FF88') {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        slide.background = { color: colors.background };

        // 霓虹发光文字（模拟）
        slide.addText(text, {
            x: 0, y: 2, w: 10, h: 1.5,
            fontSize: 72,
            fontFace: this.getFont('hero'),
            bold: true,
            color: glowColor,
            align: 'center',
            shadow: {
                type: 'outer',
                blur: 15,
                offset: 0,
                angle: 0,
                color: glowColor,
                opacity: 0.6
            }
        });

        return slide;
    }

    // 创建大字排版页
    createTypographySlide(text, options = {}) {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        slide.background = { color: options.dark ? colors.background : colors.surface };

        // 超大文字
        slide.addText(text, {
            x: 0.5, y: options.centerY || 1.5, w: 9, h: 2.5,
            fontSize: options.fontSize || 56,
            fontFace: this.getFont('hero'),
            bold: options.bold !== false,
            color: options.dark ? colors.text : colors.text,
            align: options.align || 'left',
            valign: 'middle'
        });

        return slide;
    }

    // 创建数据展示页
    createDataSlide(title, metrics) {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        slide.background = { color: colors.background || colors.surface };

        // 标题
        slide.addText(title, {
            x: 0.5, y: 0.3, w: 9, h: 0.6,
            fontSize: this.style.fonts.title.size,
            fontFace: this.getFont('title'),
            bold: true,
            color: colors.text
        });

        // 指标展示
        metrics.forEach((metric, i) => {
            const xPos = 0.5 + i * 3;

            // 大数字
            slide.addText(metric.value, {
                x: xPos, y: 1.5, w: 3, h: 1,
                fontSize: 48,
                fontFace: this.getFont('hero'),
                bold: true,
                color: metric.highlight ? colors.accent : colors.primary
            });

            // 标签
            slide.addText(metric.label, {
                x: xPos, y: 2.5, w: 3, h: 0.5,
                fontSize: 16,
                fontFace: this.getFont('body'),
                color: colors.textMuted
            });

            // 变化（如果有）
            if (metric.change) {
                const changeColor = metric.change.startsWith('+') ? '22C55E' : 'EF4444';
                slide.addText(metric.change, {
                    x: xPos, y: 3, w: 1.5, h: 0.4,
                    fontSize: 14,
                    fontFace: this.getFont('caption'),
                    bold: true,
                    color: changeColor
                });
            }
        });

        return slide;
    }

    // 创建结束页
    createEndSlide(text = '谢谢', subtitle = '') {
        const slide = this.pptx.addSlide();
        const colors = this.style.colors;

        slide.background = { color: colors.primary || colors.background };

        // 大字
        slide.addText(text, {
            x: 0, y: 2, w: 10, h: 1,
            fontSize: 56,
            fontFace: this.getFont('hero'),
            bold: true,
            color: 'FFFFFF',
            align: 'center'
        });

        if (subtitle) {
            slide.addText(subtitle, {
                x: 0, y: 3.2, w: 10, h: 0.5,
                fontSize: 20,
                fontFace: this.getFont('body'),
                color: colors.accent,
                align: 'center'
            });
        }

        return slide;
    }

    // 保存文件
    save(filename) {
        const outputPath = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
        this.pptx.writeFile({ fileName: outputPath });
        console.log(`PPT已保存: ${outputPath}`);
        return outputPath;
    }
}

// ============================================
// 预设模板生成函数
// ============================================

function generateFashionTemplate(outputPath) {
    const gen = new ModernPPTGenerator('fashion');

    // 封面 - 大标题
    gen.createCoverSlide('创意无界', 'Unleash Your Creativity', {
        darkGradient: true,
        center: true,
        textShadow: true
    });

    // Bento Grid布局
    gen.createBentoSlide([
        { title: '核心优势', content: '独特设计理念\n突破传统边界', highlight: true },
        { title: '用户增长', content: '持续上升趋势', value: '+156%' },
        { title: '满意度', value: '99.2%' },
        { title: '覆盖率', value: '全球50+' }
    ], 'hero2x2');

    // 大字排版
    gen.createTypographySlide('设计改变一切', {
        dark: true,
        centerY: 2,
        fontSize: 64,
        align: 'center'
    });

    // 数据展示
    gen.createDataSlide('业绩数据', [
        { value: '¥12M', label: '总收入', change: '+23%', highlight: true },
        { value: '156K', label: '用户数', change: '+45%' },
        { value: '4.2%', label: '转化率', change: '+0.8%' }
    ]);

    // 结束页
    gen.createEndSlide('开始创造', 'Let\'s Create Something Amazing');

    return gen.save(outputPath);
}

function generateBentoTemplate(outputPath) {
    const gen = new ModernPPTGenerator('bento');

    gen.createCoverSlide('模块化思维', 'Modular Design Philosophy', {
        center: true
    });

    gen.createBentoSlide([
        { title: '产品定位', content: '面向未来的解决方案' },
        { title: '市场分析', content: '深度洞察与趋势预测' },
        { title: '技术架构', content: '模块化、可扩展' }
    ], 'threeColumn');

    gen.createBentoSlide([
        { title: '核心竞争力', content: '独特价值主张\n差异化优势', highlight: true },
        { title: 'Q3数据', value: '增长23%' },
        { title: '团队', value: '50人' },
        { title: '项目', value: '12个' },
        { title: '下一步计划', content: '扩展市场覆盖\n优化用户体验' }
    ], 'asymmetric');

    gen.createEndSlide('感谢');

    return gen.save(outputPath);
}

function generateGlassmorphismTemplate(outputPath) {
    const gen = new ModernPPTGenerator('glassmorphism');

    gen.createCoverSlide('透明之美', 'The Beauty of Transparency', {
        darkGradient: true,
        center: true
    });

    gen.createGlassPanelSlide('核心特性', [
        { title: '简洁设计', content: '去除冗余\n回归本质' },
        { title: '层次分明', content: '透明叠加\n视觉层次' },
        { title: '现代美学', content: '玻璃质感\n柔和边界' }
    ]);

    gen.createTypographySlide('清晰\n透明\n现代', {
        dark: true,
        centerY: 1,
        fontSize: 72,
        align: 'center'
    });

    gen.createEndSlide('THANKS', '感谢您的关注');

    return gen.save(outputPath);
}

function generateNeonTemplate(outputPath) {
    const gen = new ModernPPTGenerator('neon');

    gen.createNeonTitleSlide('赛博未来', '00FF88');
    gen.createNeonTitleSlide('CYBER FUTURE', 'FF00FF');

    gen.createDataSlide('关键指标', [
        { value: '∞', label: '可能性', highlight: true },
        { value: '100%', label: '专注' },
        { value: '24/7', label: '持续创新' }
    ]);

    gen.createNeonTitleSlide('THE END', '00FFFF');

    return gen.save(outputPath);
}

function generateMinimalDarkTemplate(outputPath) {
    const gen = new ModernPPTGenerator('minimalDark');

    gen.createCoverSlide('极简主义', 'Less is More', {
        darkGradient: true,
        center: true
    });

    gen.createTypographySlide('专注\n清晰\n本质', {
        dark: true,
        centerY: 0.8,
        fontSize: 80,
        align: 'center'
    });

    gen.createDataSlide('核心数据', [
        { value: '3', label: '核心原则' },
        { value: '0', label: '冗余元素' },
        { value: '100%', label: '纯粹设计' }
    ]);

    gen.createEndSlide('END');

    return gen.save(outputPath);
}

function generateCorporateModernTemplate(outputPath) {
    const gen = new ModernPPTGenerator('corporateModern');

    gen.createCoverSlide('季度业务报告', 'Q3 2024 Business Report', {
        center: false
    });

    gen.createBentoSlide([
        { title: '总收入', value: '¥12.8M', change: '+23%', highlight: true },
        { title: '用户增长', value: '156K', change: '+15%' },
        { title: '转化率', value: '4.2%', change: '+0.8%' },
        { title: '满意度', value: '92%', change: '-2%' }
    ], 'hero2x2');

    gen.createGlassPanelSlide('战略重点', [
        { title: '市场拓展', content: '开拓新区域\n建立合作伙伴网络' },
        { title: '产品优化', content: '用户体验提升\n功能迭代更新' },
        { title: '团队建设', content: '人才引进\n团队文化建设' }
    ]);

    gen.createEndSlide('谢谢', '如有疑问请联系我们');

    return gen.save(outputPath);
}

// ============================================
// 导出
// ============================================
module.exports = {
    ModernPPTGenerator,
    FONT_CONFIG,
    DESIGN_2025,
    generateFashionTemplate,
    generateBentoTemplate,
    generateGlassmorphismTemplate,
    generateNeonTemplate,
    generateMinimalDarkTemplate,
    generateCorporateModernTemplate
};

// 如果直接运行，生成所有模板
if (require.main === module) {
    const desktopPath = process.env.USERPROFILE
        ? path.join(process.env.USERPROFILE, 'Desktop')
        : path.join(process.env.HOME || '/tmp', 'Desktop');

    console.log('生成2025时尚PPT模板...');
    console.log('目标路径:', desktopPath);
    console.log('---');

    generateFashionTemplate(path.join(desktopPath, '01_Fashion_时尚先锋.pptx'));
    generateBentoTemplate(path.join(desktopPath, '02_Bento_模块化布局.pptx'));
    generateGlassmorphismTemplate(path.join(desktopPath, '03_Glassmorphism_玻璃态.pptx'));
    generateNeonTemplate(path.join(desktopPath, '04_Neon_霓虹赛博.pptx'));
    generateMinimalDarkTemplate(path.join(desktopPath, '05_MinimalDark_极简暗黑.pptx'));
    generateCorporateModernTemplate(path.join(desktopPath, '06_Corporate_现代商务.pptx'));

    console.log('---');
    console.log('全部模板生成完成！');
}