/**
 * Modern PDF Generator Ultimate - 终极版 v8.0
 *
 * 达到 Dribbble 顶级设计水准的 PDF 生成器
 * 支持 18 种专业风格
 * 支持 40+ 种页面类型
 * 支持渐变背景、装饰元素、专业排版
 *
 * 基于 pdfkit 矢量 PDF 生成引擎
 *
 * v8.0 特性：
 * - 封面页：渐变背景、超大标题、装饰元素
 * - 目录页：编号圆圈、虚线连接、页码右对齐
 * - 正文页：章节标题装饰线、段落缩进
 * - 信息卡片：圆角矩形、阴影效果、图标区域
 * - 数据统计：大数字、标签、装饰元素
 * - 表格：表头主色调、隔行变色、边框柔和
 * - 时间线：垂直线条、圆点标记、左右交替
 * - 结尾页：感谢语、联系信息、装饰元素
 */

// 尝试加载 pdfkit，如果失败则提供说明
let PDFDocument;
try {
    PDFDocument = require('pdfkit');
} catch (e) {
    console.error('========================================');
    console.error('Error: pdfkit module not found');
    console.error('Please install pdfkit first:');
    console.error('  cd .claude/skills/modern-pdf && npm install pdfkit');
    console.error('========================================');
    throw new Error('pdfkit module required. Run: npm install pdfkit');
}

const path = require('path');
const fs = require('fs');
const {
    STYLE_LIBRARY,
    getStyle,
    MODERN_LAYOUT_BASE,
    parseColor,
    interpolateColor,
    rgbToHex,
    isDarkColor
} = require('./style-library');

// ==========================================
// 主类定义
// ==========================================
class ModernPDFUltimate {
    constructor(styleName = 'academic', options = {}) {
        this.style = getStyle(styleName);
        this.styleName = styleName;
        this.pageCount = 0;
        this.options = {
            ...MODERN_LAYOUT_BASE,
            ...options
        };

        // 创建 PDF 文档
        this.doc = new PDFDocument({
            size: 'A4',
            margins: {
                top: this.options.page.margin.top,
                bottom: this.options.page.margin.bottom,
                left: this.options.page.margin.left,
                right: this.options.page.margin.right
            },
            info: {
                Title: options.title || 'Modern PDF Document',
                Author: options.author || 'Modern PDF Creator',
                Creator: 'Modern PDF Ultimate v8.0'
            }
        });

        // 注册中文字体
        this._registerChineseFonts();

        // 当前页面状态
        this.currentY = this.options.page.margin.top;
        this.currentPage = 0;
    }

    // ==========================================
    // 字体注册
    // ==========================================
    _registerChineseFonts() {
        // Windows 系统字体路径
        const fontsDir = 'C:/Windows/Fonts';

        // 字体配置
        const fontConfigs = [
            { name: 'msyh', path: `${fontsDir}/msyh.ttc`, family: 'MicrosoftYaHei' },
            { name: 'msyhbd', path: `${fontsDir}/msyhbd.ttc`, family: 'MicrosoftYaHei-Bold' },
            { name: 'simhei', path: `${fontsDir}/simhei.ttf`, family: 'SimHei' },
            { name: 'simsun', path: `${fontsDir}/simsun.ttc`, family: 'SimSun' }
        ];

        this.fonts = {
            regular: 'MicrosoftYaHei',
            bold: 'MicrosoftYaHei-Bold'
        };

        // 尝试注册字体
        for (const font of fontConfigs) {
            try {
                if (fs.existsSync(font.path)) {
                    this.doc.registerFont(font.family, font.path);
                }
            } catch (e) {
                // 字体注册失败，静默处理
            }
        }

        // 设置默认字体
        try {
            this.doc.font('MicrosoftYaHei');
        } catch (e) {
            try {
                this.doc.font('SimHei');
                this.fonts.regular = 'SimHei';
                this.fonts.bold = 'SimHei';
            } catch (e2) {
                this.fonts.regular = 'Helvetica';
                this.fonts.bold = 'Helvetica-Bold';
            }
        }
    }

    // ==========================================
    // 颜色辅助方法
    // ==========================================
    _hexToRgb(hex) {
        return parseColor(hex);
    }

    _getStyleColor(colorKey) {
        const color = this.style[colorKey];
        if (!color) return '#000000';
        if (color.startsWith('#')) return color;
        return '#' + color;
    }

    // ==========================================
    // 渐变绘制方法 (优化版)
    // ==========================================
    _drawGradientBackground(colors, direction = 'diagonal', width = null, height = null) {
        const pageWidth = width || this.doc.page.width;
        const pageHeight = height || this.doc.page.height;

        // 使用分段矩形模拟渐变
        const steps = this.options.effects.gradientSteps || 40;
        const parsedColors = colors.map(c => this._hexToRgb(c.startsWith('#') ? c.slice(1) : c));

        for (let i = 0; i < steps; i++) {
            const factor = i / steps;
            const nextFactor = (i + 1) / steps;

            // 计算当前颜色
            const colorIndex = Math.floor(factor * (parsedColors.length - 1));
            const localFactor = (factor * (parsedColors.length - 1)) - colorIndex;

            let c1 = parsedColors[colorIndex];
            let c2 = parsedColors[Math.min(colorIndex + 1, parsedColors.length - 1)];

            const r = Math.round(c1.r + (c2.r - c1.r) * localFactor);
            const g = Math.round(c1.g + (c2.g - c1.g) * localFactor);
            const b = Math.round(c1.b + (c2.b - c1.b) * localFactor);

            this.doc.save();
            this.doc.fillColor([r, g, b]);

            if (direction === 'diagonal') {
                // 对角线渐变 - 更精确的算法
                const x1 = 0;
                const y1 = factor * pageHeight;
                const x2 = pageWidth;
                const y2 = nextFactor * pageHeight;

                this.doc.moveTo(x1, y1)
                    .lineTo(x2, y1)
                    .lineTo(x2, y2)
                    .lineTo(x1, y2)
                    .fill();
            } else if (direction === 'vertical') {
                const y = factor * pageHeight;
                const h = pageHeight / steps;
                this.doc.rect(0, y, pageWidth, h).fill();
            } else if (direction === 'horizontal') {
                const x = factor * pageWidth;
                const w = pageWidth / steps;
                this.doc.rect(x, 0, w, pageHeight).fill();
            }

            this.doc.restore();
        }
    }

    // 简化渐变（用于卡片等小区域）
    _drawSimpleGradient(colors, x, y, width, height, direction = 'horizontal') {
        const steps = 20;
        const parsedColors = colors.map(c => this._hexToRgb(c.startsWith('#') ? c.slice(1) : c));

        for (let i = 0; i < steps; i++) {
            const factor = i / steps;
            const colorIndex = Math.floor(factor * (parsedColors.length - 1));
            const localFactor = (factor * (parsedColors.length - 1)) - colorIndex;

            let c1 = parsedColors[colorIndex];
            let c2 = parsedColors[Math.min(colorIndex + 1, parsedColors.length - 1)];

            const r = Math.round(c1.r + (c2.r - c1.r) * localFactor);
            const g = Math.round(c1.g + (c2.g - c1.g) * localFactor);
            const b = Math.round(c1.b + (c2.b - c1.b) * localFactor);

            this.doc.save();
            this.doc.fillColor([r, g, b]);

            if (direction === 'horizontal') {
                const segmentWidth = width / steps;
                this.doc.rect(x + (i * segmentWidth), y, segmentWidth, height).fill();
            } else if (direction === 'vertical') {
                const segmentHeight = height / steps;
                this.doc.rect(x, y + (i * segmentHeight), width, segmentHeight).fill();
            }

            this.doc.restore();
        }
    }

    // ==========================================
    // 装饰元素绘制方法
    // ==========================================

    // 绘制圆角矩形
    _drawRoundedRect(x, y, width, height, radius, fillColor, strokeColor = null, lineWidth = 1) {
        this.doc.save();

        // 先绘制阴影效果
        this.doc.fillColor('rgba(0,0,0,0.1)');
        this.doc.roundedRect(x + 2, y + 2, width, height, radius).fill();

        // 绘制主矩形
        this.doc.fillColor(fillColor);
        this.doc.roundedRect(x, y, width, height, radius).fill();

        // 绘制边框
        if (strokeColor) {
            this.doc.strokeColor(strokeColor);
            this.doc.lineWidth(lineWidth);
            this.doc.roundedRect(x, y, width, height, radius).stroke();
        }

        this.doc.restore();
    }

    // 绘制装饰线条
    _drawDecoLine(x, y, length, color, width = 2, direction = 'horizontal') {
        this.doc.save();
        this.doc.strokeColor(color);
        this.doc.lineWidth(width);

        if (direction === 'horizontal') {
            this.doc.moveTo(x, y).lineTo(x + length, y).stroke();
        } else {
            this.doc.moveTo(x, y).lineTo(x, y + length).stroke();
        }

        this.doc.restore();
    }

    // 绘制装饰圆点
    _drawDecoDot(x, y, radius, color) {
        this.doc.save();
        this.doc.fillColor(color);
        this.doc.circle(x, y, radius).fill();
        this.doc.restore();
    }

    // 绘制装饰圆圈（空心）
    _drawDecoCircle(x, y, radius, color, lineWidth = 2) {
        this.doc.save();
        this.doc.strokeColor(color);
        this.doc.lineWidth(lineWidth);
        this.doc.circle(x, y, radius).stroke();
        this.doc.restore();
    }

    // 绘制装饰三角形
    _drawDecoTriangle(x, y, size, color, direction = 'up') {
        this.doc.save();
        this.doc.fillColor(color);

        if (direction === 'up') {
            this.doc.moveTo(x, y - size)
                .lineTo(x - size, y + size)
                .lineTo(x + size, y + size)
                .fill();
        } else {
            this.doc.moveTo(x, y + size)
                .lineTo(x - size, y - size)
                .lineTo(x + size, y - size)
                .fill();
        }

        this.doc.restore();
    }

    // ==========================================
    // 页面方法
    // ==========================================
    addPage() {
        this.doc.addPage();
        this.currentPage++;
        this.currentY = this.options.page.margin.top;
        return this;
    }

    // ==========================================
    // 封面页 (Dribbble 水准)
    // ==========================================
    cover(title, subtitle = '', info = '') {
        const coverConfig = this.style.cover;
        const isDark = this.style.isDark;

        // 绘制背景
        if (coverConfig.type === 'gradient' || coverConfig.type === 'mesh') {
            this._drawGradientBackground(coverConfig.colors, coverConfig.direction || 'diagonal');
        } else if (coverConfig.type === 'solid') {
            this.doc.rect(0, 0, this.doc.page.width, this.doc.page.height)
                .fill('#' + coverConfig.color);
        }

        // 页面中心
        const centerX = this.doc.page.width / 2;
        const centerY = this.doc.page.height / 2;
        const pageWidth = this.doc.page.width;
        const pageHeight = this.doc.page.height;

        const textColor = isDark ? '#FFFFFF' : this._getStyleColor('text');
        const accentColor = this._getStyleColor('accent');

        // 先绘制装饰元素（在边缘，不会遮挡文字）
        this._drawCoverDecorationsSafe();

        // 标题位置 - 增加安全间距
        const titleY = centerY - 100;
        const titleFontSize = 36;  // 使用适中的字体大小
        const maxTitleWidth = pageWidth - 120;  // 两侧留白

        // 计算标题实际高度
        this.doc.fontSize(titleFontSize).font(this.fonts.bold);
        const titleHeight = this.doc.heightOfString(title, { width: maxTitleWidth, align: 'center' });

        // 绘制标题装饰线（上方）- 位置调整避免遮挡
        this._drawDecoLine(centerX - 50, titleY - 15, 100, accentColor, 2);

        // 主标题
        this.doc.save();
        this.doc.fontSize(titleFontSize)
            .fillColor(textColor)
            .font(this.fonts.bold);

        this.doc.text(title, 60, titleY, {
            width: maxTitleWidth,
            align: 'center'
        });

        // 标题装饰线（下方）- 根据标题高度调整位置
        const titleEndY = titleY + titleHeight + 10;
        this._drawDecoLine(centerX - 50, titleEndY, 100, accentColor, 1.5);

        // 副标题 - 确保在标题下方有足够间距
        if (subtitle) {
            const subtitleY = titleEndY + 25;
            const subtitleFontSize = 18;
            this.doc.fontSize(subtitleFontSize)
                .fillColor(isDark ? '#CCCCCC' : this._getStyleColor('textMuted'))
                .font(this.fonts.regular);

            const subtitleHeight = this.doc.heightOfString(subtitle, { width: maxTitleWidth, align: 'center' });
            this.doc.text(subtitle, 60, subtitleY, {
                width: maxTitleWidth,
                align: 'center'
            });
        }

        // 底部信息 - 确保不会被遮挡
        if (info) {
            const infoY = pageHeight - 80;
            this.doc.fontSize(12)
                .fillColor(isDark ? '#888888' : this._getStyleColor('textMuted'))
                .font(this.fonts.regular);

            this.doc.text(info, 60, infoY, {
                width: maxTitleWidth,
                align: 'center'
            });
        }

        // 底部装饰
        this._drawCoverBottomDecorations();

        this.doc.restore();
        this.pageCount++;
        return this;
    }

    // 安全的封面装饰元素 - 放在边缘，不遮挡文字
    _drawCoverDecorationsSafe() {
        const isDark = this.style.isDark;
        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const secondaryColor = this._getStyleColor('secondary');
        const pageWidth = this.doc.page.width;
        const pageHeight = this.doc.page.height;

        // 左下角装饰 - 完全在边缘
        this._drawDecoCircle(40, pageHeight - 60, 25, secondaryColor, 2);

        // 右上角装饰 - 完全在边缘
        this._drawDecoCircle(pageWidth - 40, 50, 20, accentColor, 2);
    }

    // 原有的装饰方法保留用于其他用途
    _drawCoverDecorations() {
        // 已被 _drawCoverDecorationsSafe 替代
    }
    _drawCoverDecorations() {
        const isDark = this.style.isDark;
        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const secondaryColor = this._getStyleColor('secondary');

        // 左侧装饰线条组
        const leftX = 35;
        const startY = this.doc.page.height * 0.25;

        // 主装饰线
        this._drawDecoLine(leftX, startY, 80, accentColor, 3, 'vertical');

        // 小装饰线组
        for (let i = 0; i < 3; i++) {
            this._drawDecoLine(leftX + 15, startY + 30 + i * 25, 40, primaryColor, 1, 'vertical');
        }

        // 右侧装饰圆点组
        const rightX = this.doc.page.width - 35;
        const dotY = this.doc.page.height * 0.3;

        // 主圆点
        this._drawDecoDot(rightX, dotY, 10, accentColor);

        // 小圆点组
        for (let i = 0; i < 4; i++) {
            this._drawDecoDot(rightX - 15, dotY + 25 + i * 20, 4, isDark ? '#444444' : '#CCCCCC');
        }

        // 底部装饰三角形
        const triangleY = this.doc.page.height * 0.75;
        this._drawDecoTriangle(leftX + 40, triangleY, 15, accentColor, 'up');

        // 右下角装饰圆圈
        this._drawDecoCircle(rightX, triangleY + 50, 20, secondaryColor, 2);
    }

    // 封面底部装饰
    _drawCoverBottomDecorations() {
        const isDark = this.style.isDark;
        const accentColor = this._getStyleColor('accent');
        const centerX = this.doc.page.width / 2;
        const bottomY = this.doc.page.height - 50;

        // 底部装饰线
        this._drawDecoLine(centerX - 40, bottomY, 80, isDark ? '#555555' : '#DDDDDD', 1);

        // 底部小圆点
        this._drawDecoDot(centerX, bottomY + 8, 3, accentColor);
    }

    // ==========================================
    // 目录页 (Dribbble 水准)
    // ==========================================
    toc(items) {
        this.addPage();

        // 绘制内容背景
        const bgColor = this._getStyleColor('content');
        this.doc.rect(0, 0, this.doc.page.width, this.doc.page.height)
            .fill(bgColor);

        // 目录标题区域
        const titleY = 60;
        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        // 目录标题
        this.doc.fontSize(this.options.typography.pageTitle)
            .fillColor(primaryColor)
            .font(this.fonts.bold)
            .text('目录', this.options.page.margin.left, titleY);

        // 标题装饰线
        this._drawDecoLine(
            this.options.page.margin.left,
            titleY + this.options.typography.pageTitle + 8,
            150,
            primaryColor,
            3
        );

        // 目录项
        let itemY = titleY + 60;
        const itemSpacing = 40;
        const leftMargin = this.options.page.margin.left;
        const rightMargin = this.options.page.margin.right;
        const pageWidth = this.doc.page.width;

        items.forEach((item, index) => {
            const num = item.num || (index + 1).toString().padStart(2, '0');
            const title = item.title;
            const pageNum = item.page || (index + 2);

            // 编号圆圈背景
            const circleRadius = 16;
            const circleX = leftMargin + circleRadius;

            this._drawDecoCircle(circleX, itemY + 8, circleRadius, primaryColor, 2);

            // 编号文字（居中于圆圈）
            this.doc.fontSize(this.options.typography.body)
                .fillColor(primaryColor)
                .font(this.fonts.bold);

            const numWidth = this.doc.widthOfString(num);
            this.doc.text(num, circleX - numWidth / 2, itemY + 2);

            // 标题
            this.doc.fontSize(this.options.typography.bodyLarge)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(title, leftMargin + 50, itemY + 3);

            // 虚线连接
            const titleEndX = leftMargin + 50 + this.doc.widthOfString(title) + 15;
            const pageNumX = pageWidth - rightMargin - 30;

            this.doc.save();
            this.doc.strokeColor(textMutedColor)
                .lineWidth(0.5)
                .dash(3, { space: 3 })
                .moveTo(titleEndX, itemY + 10)
                .lineTo(pageNumX - 15, itemY + 10)
                .stroke()
                .undash();
            this.doc.restore();

            // 页码
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(pageNum.toString(), pageNumX, itemY + 3);

            itemY += itemSpacing;
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 正文页标题
    // ==========================================
    heading(text, level = 1) {
        const sizes = {
            1: this.options.typography.pageTitle,
            2: this.options.typography.sectionTitle,
            3: this.options.typography.heading
        };

        const fontSize = sizes[level] || this.options.typography.heading;
        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');

        // 添加顶部间距
        this.currentY += this.options.spacing.lg;

        // 一级标题特殊样式
        if (level === 1) {
            // 左侧装饰线
            this._drawDecoLine(
                this.options.page.margin.left - 15,
                this.currentY,
                fontSize * 1.2,
                primaryColor,
                3,
                'vertical'
            );

            // 标题文字
            this.doc.fontSize(fontSize)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(text, this.options.page.margin.left, this.currentY);

            // 底部装饰线
            this.currentY += fontSize + 8;
            this._drawDecoLine(
                this.options.page.margin.left,
                this.currentY,
                this.doc.widthOfString(text) + 40,
                accentColor,
                2
            );

            this.currentY += this.options.spacing.md;
        } else {
            // 其他级别标题
            this.doc.fontSize(fontSize)
                .fillColor(level === 2 ? primaryColor : textColor)
                .font(this.fonts.bold)
                .text(text, this.options.page.margin.left, this.currentY);

            this.currentY += fontSize + this.options.spacing.sm;
        }

        return this;
    }

    // ==========================================
    // 正文段落
    // ==========================================
    body(text) {
        const textColor = this._getStyleColor('text');
        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;

        this.doc.fontSize(this.options.typography.body)
            .fillColor(textColor)
            .font(this.fonts.regular);

        const textOptions = {
            width: contentWidth,
            align: 'left',
            lineGap: 4,
            indent: 20  // 首行缩进
        };

        // 计算文本高度
        const height = this.doc.heightOfString(text, textOptions);

        // 检查是否需要新页
        if (this.currentY + height > this.doc.page.height - this.options.page.margin.bottom) {
            this.addPage();
        }

        this.doc.text(text, this.options.page.margin.left, this.currentY, textOptions);
        this.currentY += height + this.options.spacing.md;

        return this;
    }

    // ==========================================
    // 信息卡片页 (Dribbble 水准)
    // ==========================================
    infoCards(title, cards) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const cardWidth = (contentWidth - this.options.card.gap) / 2;
        const cardHeight = 100;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.md;

        cards.forEach((card, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = startX + col * (cardWidth + this.options.card.gap);
            const y = startY + row * (cardHeight + this.options.spacing.md);

            // 绘制圆角卡片背景
            this._drawRoundedRect(x, y, cardWidth, cardHeight, this.options.card.borderRadius, cardBgColor, cardBorderColor, 1);

            // 卡片顶部装饰条
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.rect(x, y, cardWidth, 4).fill();
            this.doc.restore();

            // 图标/标签区域
            if (card.icon) {
                // 图标背景圆
                this._drawDecoCircle(x + 15, y + 25, 12, accentColor, 2);

                // 图标文字
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(accentColor)
                    .font(this.fonts.bold)
                    .text(card.icon, x + 8, y + 20);
            }

            // 标题
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(card.title, x + this.options.card.padding, y + 45);

            // 描述
            if (card.desc) {
                this.doc.fontSize(this.options.typography.caption)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(card.desc, x + this.options.card.padding, y + 65, {
                        width: cardWidth - this.options.card.padding * 2,
                        height: 30,
                        ellipsis: true
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 数据统计页 (Dribbble 水准)
    // ==========================================
    dataStats(title, stats) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const secondaryColor = this._getStyleColor('secondary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const statWidth = contentWidth / stats.length;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;

        stats.forEach((stat, index) => {
            const x = startX + index * statWidth;

            // 装饰圆圈（上方）
            this._drawDecoDot(x + statWidth / 2, startY - 20, 8, accentColor);

            // 数值（超大字体）
            this.doc.fontSize(this.options.typography.display)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(stat.value, x, startY, {
                    width: statWidth,
                    align: 'center'
                });

            // 标签
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(stat.label, x, startY + 55, {
                    width: statWidth,
                    align: 'center'
                });

            // 变化值
            if (stat.change) {
                const changeColor = stat.change.startsWith('+') ? '#22C55E' : '#EF4444';
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(changeColor)
                    .font(this.fonts.bold)
                    .text(stat.change, x, startY + 75, {
                        width: statWidth,
                        align: 'center'
                    });
            }

            // 分隔线（最后一个不需要）
            if (index < stats.length - 1) {
                this._drawDecoLine(
                    x + statWidth - 10,
                    startY + 20,
                    60,
                    textMutedColor,
                    1,
                    'vertical'
                );
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 表格页 (Dribbble 水准)
    // ==========================================
    table(title, rows, columns = null) {
        this.addPage();
        this.heading(title, 1);

        if (!columns && rows.length > 0) {
            columns = Object.keys(rows[0]);
        }

        if (!columns) return this;

        const primaryColor = this._getStyleColor('primary');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');
        const contentColor = this._getStyleColor('content');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        const tableWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const colWidth = tableWidth / columns.length;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const rowHeight = 28;
        const headerHeight = 35;

        // 表头背景
        this.doc.save();
        this.doc.rect(startX, startY, tableWidth, headerHeight)
            .fill(primaryColor);
        this.doc.restore();

        // 表头文字
        columns.forEach((col, index) => {
            this.doc.fontSize(this.options.typography.caption)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(col, startX + index * colWidth + 12, startY + 12, {
                    width: colWidth - 24,
                    align: 'left'
                });
        });

        // 数据行
        rows.forEach((row, rowIndex) => {
            const rowY = startY + headerHeight + rowIndex * rowHeight;
            const isEven = rowIndex % 2 === 0;

            // 行背景（隔行变色）
            this.doc.save();
            this.doc.rect(startX, rowY, tableWidth, rowHeight)
                .fill(isEven ? cardBgColor : contentColor);
            this.doc.restore();

            // 行数据
            columns.forEach((col, colIndex) => {
                this.doc.fontSize(this.options.typography.caption)
                    .fillColor(textColor)
                    .font(this.fonts.regular)
                    .text(row[col] || '', startX + colIndex * colWidth + 12, rowY + 8, {
                        width: colWidth - 24,
                        align: 'left'
                    });
            });

            // 行底边框
            this._drawDecoLine(startX, rowY + rowHeight, tableWidth, cardBorderColor, 0.5);
        });

        // 表格边框
        this.doc.save();
        this.doc.strokeColor(primaryColor)
            .lineWidth(1.5)
            .rect(startX, startY, tableWidth, headerHeight + rows.length * rowHeight)
            .stroke();
        this.doc.restore();

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 时间线页 (Dribbble 水准)
    // ==========================================
    timeline(title, events) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');

        const startX = this.options.page.margin.left + 25;
        const startY = this.currentY + this.options.spacing.xl;
        const lineWidth = 3;
        const dotRadius = 10;
        const eventSpacing = 55;
        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right - 60;

        // 主时间线
        const lineLength = events.length * eventSpacing;
        this._drawDecoLine(startX, startY, lineLength, primaryColor, lineWidth, 'vertical');

        events.forEach((event, index) => {
            const y = startY + index * eventSpacing;
            const isLeft = index % 2 === 0;

            // 时间节点圆（外圈）
            this._drawDecoCircle(startX, y, dotRadius + 3, primaryColor, 2);

            // 时间节点圆（内圈填充）
            this._drawDecoDot(startX, y, dotRadius, accentColor);

            // 时间标签
            if (event.date || event.time) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(event.date || event.time || '', startX + dotRadius + 15, y - 5);
            }

            // 事件卡片
            const cardX = startX + dotRadius + 20;
            const cardWidth = contentWidth - dotRadius - 20;
            const cardHeight = 40;

            // 卡片背景
            this._drawRoundedRect(cardX, y - 5, cardWidth, cardHeight, 6, cardBgColor);

            // 事件标题
            if (event.title) {
                this.doc.fontSize(this.options.typography.body)
                    .fillColor(textColor)
                    .font(this.fonts.bold)
                    .text(event.title, cardX + 12, y);
            }

            // 事件描述
            if (event.desc) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(event.desc, cardX + 12, y + 15, {
                        width: cardWidth - 24
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 引用页
    // ==========================================
    quote(text, author = '') {
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');

        this.currentY += this.options.spacing.xl;

        const quoteWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right - 50;
        const quoteX = this.options.page.margin.left + 25;
        const quoteHeight = 70;

        // 引用卡片背景
        this._drawRoundedRect(quoteX - 10, this.currentY - 10, quoteWidth + 20, quoteHeight + 20, 8, cardBgColor);

        // 左侧装饰线
        this.doc.save();
        this.doc.fillColor(accentColor);
        this.doc.rect(quoteX - 5, this.currentY, 4, quoteHeight).fill();
        this.doc.restore();

        // 引用文本
        this.doc.fontSize(this.options.typography.bodyLarge)
            .fillColor(textColor)
            .font(this.fonts.regular)
            .text(`"${text}"`, quoteX + 10, this.currentY + 5, {
                width: quoteWidth
            });

        // 作者
        if (author) {
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(`- ${author}`, quoteX + 10, this.currentY + quoteHeight - 15);
        }

        this.currentY += quoteHeight + this.options.spacing.lg;
        return this;
    }

    // ==========================================
    // 结尾页 (Dribbble 水准)
    // ==========================================
    end(title = '谢谢', subtitle = '', contact = '') {
        this.addPage();

        const coverConfig = this.style.cover;
        const isDark = this.style.isDark;
        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = isDark ? '#FFFFFF' : primaryColor;
        const textMutedColor = isDark ? '#CCCCCC' : this._getStyleColor('textMuted');

        // 绘制背景
        if (coverConfig.type === 'gradient' || coverConfig.type === 'mesh') {
            this._drawGradientBackground(coverConfig.colors, coverConfig.direction || 'diagonal');
        } else {
            this.doc.rect(0, 0, this.doc.page.width, this.doc.page.height)
                .fill('#' + coverConfig.color);
        }

        const centerX = this.doc.page.width / 2;
        const centerY = this.doc.page.height / 2;

        // 上方装饰线
        this._drawDecoLine(centerX - 50, centerY - 80, 100, accentColor, 2);

        // 主标题
        this.doc.fontSize(this.options.typography.display)
            .fillColor(textColor)
            .font(this.fonts.bold)
            .text(title, centerX - 150, centerY - 50, {
                width: 300,
                align: 'center'
            });

        // 下方装饰线
        this._drawDecoLine(centerX - 50, centerY + 20, 100, accentColor, 1);

        // 副标题
        if (subtitle) {
            this.doc.fontSize(this.options.typography.sectionTitle)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(subtitle, centerX - 150, centerY + 35, {
                    width: 300,
                    align: 'center'
                });
        }

        // 联系信息
        if (contact) {
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(isDark ? '#888888' : textMutedColor)
                .font(this.fonts.regular)
                .text(contact, centerX - 150, centerY + 70, {
                    width: 300,
                    align: 'center'
                });
        }

        // 底部装饰
        this._drawEndDecorations();

        this.pageCount++;
        return this;
    }

    // 结尾页装饰
    _drawEndDecorations() {
        const accentColor = this._getStyleColor('accent');
        const secondaryColor = this._getStyleColor('secondary');
        const centerX = this.doc.page.width / 2;
        const bottomY = this.doc.page.height - 60;

        // 底部装饰圆点组
        for (let i = 0; i < 5; i++) {
            const dotX = centerX - 40 + i * 20;
            this._drawDecoDot(dotX, bottomY, i === 2 ? 5 : 3, i === 2 ? accentColor : secondaryColor);
        }

        // 左下角装饰线
        this._drawDecoLine(30, bottomY + 30, 50, accentColor, 2, 'horizontal');

        // 右下角装饰圆圈
        this._drawDecoCircle(this.doc.page.width - 55, bottomY + 40, 15, accentColor, 2);
    }

    // ==========================================
    // 学术风格专用方法
    // ==========================================
    outline(title, items) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');

        items.forEach((item, index) => {
            const num = item.num || `0${index + 1}`;

            // 编号圆圈
            this._drawDecoCircle(
                this.options.page.margin.left + 15,
                this.currentY + 10,
                15,
                primaryColor,
                2
            );

            // 编号文字
            this.doc.fontSize(this.options.typography.body)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(num, this.options.page.margin.left + 8, this.currentY + 5);

            // 标题
            this.doc.fontSize(this.options.typography.bodyLarge)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(item.title, this.options.page.margin.left + 40, this.currentY + 7);

            this.currentY += this.options.spacing.xl;
        });

        this.pageCount++;
        return this;
    }

    literature(title, refs) {
        this.addPage();
        this.heading(title, 1);

        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        refs.forEach((ref, index) => {
            // 编号
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(accentColor)
                .font(this.fonts.bold)
                .text(`[${index + 1}]`, this.options.page.margin.left, this.currentY);

            // 作者
            if (ref.author) {
                this.doc.fontSize(this.options.typography.caption)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(ref.author, this.options.page.margin.left + 30, this.currentY);
            }

            // 内容
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(ref.content || ref.title || '', this.options.page.margin.left + 30, this.currentY + 15, {
                    width: this.doc.page.width - this.options.page.margin.left - 60
                });

            this.currentY += 50;
        });

        this.pageCount++;
        return this;
    }

    methodology(title, steps) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const stepWidth = contentWidth / steps.length;
        const startY = this.currentY + this.options.spacing.xl;

        steps.forEach((step, index) => {
            const x = this.options.page.margin.left + index * stepWidth;
            const centerX = x + stepWidth / 2;

            // 步骤编号圆
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.circle(centerX, startY, 22).fill();
            this.doc.restore();

            // 编号文字
            this.doc.fontSize(this.options.typography.body)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(`${index + 1}`, centerX - 5, startY - 5);

            // 步骤标题
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.bold)
                .text(step.title, x + 10, startY + 35, {
                    width: stepWidth - 20,
                    align: 'center'
                });

            // 步骤描述
            if (step.desc) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(step.desc, x + 10, startY + 50, {
                        width: stepWidth - 20,
                        align: 'center'
                    });
            }
        });

        // 连接箭头线
        this.doc.save();
        this.doc.strokeColor(primaryColor)
            .lineWidth(2)
            .moveTo(this.options.page.margin.left + stepWidth / 2 + 25, startY)
            .lineTo(this.doc.page.width - this.options.page.margin.right - stepWidth / 2 - 25, startY)
            .stroke();

        // 箭头装饰
        for (let i = 1; i < steps.length; i++) {
            const arrowX = this.options.page.margin.left + i * stepWidth - stepWidth / 2;
            this._drawDecoTriangle(arrowX, startY, 6, primaryColor, 'right');
        }
        this.doc.restore();

        this.pageCount++;
        return this;
    }

    comparison(title, data) {
        return this.table(title, data);
    }

    conclusion(title, conclusions, futureWork = []) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');

        // 结论部分
        this.doc.fontSize(this.options.typography.heading)
            .fillColor(primaryColor)
            .font(this.fonts.bold)
            .text('主要结论', this.options.page.margin.left, this.currentY);

        this.currentY += this.options.spacing.lg;

        conclusions.forEach((c, index) => {
            // 装饰圆点
            this._drawDecoDot(this.options.page.margin.left + 8, this.currentY + 6, 4, accentColor);

            this.doc.fontSize(this.options.typography.body)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(`${index + 1}. ${c}`, this.options.page.margin.left + 20, this.currentY);

            this.currentY += this.options.spacing.md;
        });

        // 未来展望
        if (futureWork.length > 0) {
            this.currentY += this.options.spacing.xl;

            this.doc.fontSize(this.options.typography.heading)
                .fillColor(accentColor)
                .font(this.fonts.bold)
                .text('未来展望', this.options.page.margin.left, this.currentY);

            this.currentY += this.options.spacing.lg;

            futureWork.forEach((f, index) => {
                this._drawDecoDot(this.options.page.margin.left + 8, this.currentY + 6, 4, primaryColor);

                this.doc.fontSize(this.options.typography.body)
                    .fillColor(textColor)
                    .font(this.fonts.regular)
                    .text(`${index + 1}. ${f}`, this.options.page.margin.left + 20, this.currentY);

                this.currentY += this.options.spacing.md;
            });
        }

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 商务风格专用方法
    // ==========================================
    executiveSummary(title, summary) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const cardBgColor = this._getStyleColor('cardBg');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const summaryHeight = 130;

        // 高亮框背景
        this._drawRoundedRect(
            this.options.page.margin.left,
            this.currentY,
            contentWidth,
            summaryHeight,
            8,
            cardBgColor,
            accentColor,
            2
        );

        // 顶部装饰条
        this.doc.save();
        this.doc.fillColor(primaryColor);
        this.doc.rect(this.options.page.margin.left, this.currentY, contentWidth, 5).fill();
        this.doc.restore();

        // 摘要内容
        this.doc.fontSize(this.options.typography.body)
            .fillColor(textColor)
            .font(this.fonts.regular)
            .text(summary, this.options.page.margin.left + 15, this.currentY + 20, {
                width: contentWidth - 30,
                height: summaryHeight - 40
            });

        this.currentY += summaryHeight + this.options.spacing.lg;
        this.pageCount++;
        return this;
    }

    // ==========================================
    // 科技风格专用方法
    // ==========================================
    architecture(title, layers) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const layerHeight = 55;
        const layerWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;

        layers.forEach((layer, index) => {
            const y = startY + index * (layerHeight + 12);

            // 层背景
            this._drawRoundedRect(startX, y, layerWidth, layerHeight, 8, cardBgColor, cardBorderColor, 1);

            // 层左侧颜色条
            const barWidth = 8;
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.roundedRect(startX, y, barWidth, layerHeight, 4).fill();
            this.doc.restore();

            // 层名称
            this.doc.fontSize(this.options.typography.body)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(layer.name, startX + barWidth + 15, y + 15);

            // 层描述
            if (layer.desc) {
                this.doc.fontSize(this.options.typography.caption)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(layer.desc, startX + 180, y + 15, {
                        width: layerWidth - 190
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // API 概览页
    // ==========================================
    apiOverview(title, endpoints) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const rowHeight = 32;

        // 表头
        this.doc.save();
        this.doc.rect(startX, startY, contentWidth, 30)
            .fill(primaryColor);
        this.doc.restore();

        // 表头文字
        const headers = ['Method', 'Path', 'Description'];
        const colWidths = [60, 150, contentWidth - 210];
        headers.forEach((header, index) => {
            this.doc.fontSize(this.options.typography.caption)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(header, startX + 12 + index * colWidths[index], startY + 10);
        });

        // 端点列表
        endpoints.forEach((endpoint, rowIndex) => {
            const rowY = startY + 30 + rowIndex * rowHeight;
            const isEven = rowIndex % 2 === 0;

            // 行背景
            this.doc.save();
            this.doc.rect(startX, rowY, contentWidth, rowHeight)
                .fill(isEven ? cardBgColor : '#FFFFFF');
            this.doc.restore();

            // Method 标签颜色
            const methodColors = {
                'GET': '#22C55E',
                'POST': '#3B82F6',
                'PUT': '#F59E0B',
                'DELETE': '#EF4444',
                'PATCH': '#8B5CF6'
            };
            const methodColor = methodColors[endpoint.method] || primaryColor;

            // Method 标签
            this.doc.save();
            this.doc.fillColor(methodColor);
            this.doc.roundedRect(startX + 8, rowY + 6, 45, 18, 4).fill();
            this.doc.restore();

            this.doc.fontSize(this.options.typography.small)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(endpoint.method, startX + 18, rowY + 9);

            // Path
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(endpoint.path, startX + 65, rowY + 10);

            // Description
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(endpoint.desc || '', startX + 220, rowY + 10, {
                    width: contentWidth - 240
                });

            // 行底边框
            this._drawDecoLine(startX, rowY + rowHeight, contentWidth, cardBorderColor, 0.5);
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 代码块展示页
    // ==========================================
    codeBlock(title, code, language = 'JavaScript') {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const lineHeight = 16;
        const headerHeight = 25;
        const padding = 15;

        // 代码块背景
        const codeLines = code.split('\n');
        const codeHeight = codeLines.length * lineHeight + headerHeight + padding * 2;

        this._drawRoundedRect(startX, startY, contentWidth, codeHeight, 8, cardBgColor, cardBorderColor, 1);

        // 语言标签头部
        this.doc.save();
        this.doc.fillColor(primaryColor);
        this.doc.rect(startX, startY, contentWidth, headerHeight, 8).fill();
        this.doc.restore();

        // 语言标签文字
        this.doc.fontSize(this.options.typography.small)
            .fillColor('#FFFFFF')
            .font(this.fonts.bold)
            .text(language, startX + padding, startY + 7);

        // 代码内容
        const codeStartY = startY + headerHeight + padding;
        codeLines.forEach((line, index) => {
            const lineY = codeStartY + index * lineHeight;

            // 行号
            this.doc.fontSize(this.options.typography.small)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(`${index + 1}`, startX + padding, lineY);

            // 代码行（判断是否是注释）
            const isComment = line.trim().startsWith('//') || line.trim().startsWith('#');
            this.doc.fontSize(this.options.typography.small)
                .fillColor(isComment ? textMutedColor : textColor)
                .font(this.fonts.regular)
                .text(line, startX + padding + 25, lineY, {
                    width: contentWidth - padding * 2 - 25
                });
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 应用场景页
    // ==========================================
    useCases(title, cases) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const caseWidth = contentWidth;
        const caseHeight = 70;
        const caseSpacing = 15;

        cases.forEach((caseItem, index) => {
            const y = startY + index * (caseHeight + caseSpacing);

            // 场景卡片背景
            this._drawRoundedRect(startX, y, caseWidth, caseHeight, 8, cardBgColor, cardBorderColor, 1);

            // 行业标签
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(caseItem.industry, startX + 15, y + 15);

            // 应用场景列表
            if (caseItem.scenarios && caseItem.scenarios.length > 0) {
                const scenarioX = startX + 120;
                caseItem.scenarios.forEach((scenario, sIndex) => {
                    // 场景圆点
                    this._drawDecoDot(scenarioX + sIndex * 90, y + 45, 4, accentColor);

                    this.doc.fontSize(this.options.typography.caption)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(scenario, scenarioX + 10 + sIndex * 90, y + 40);
                });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 定价方案页
    // ==========================================
    pricing(title, plans) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const planWidth = (contentWidth - 20) / plans.length;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;
        const planHeight = 180;

        plans.forEach((plan, index) => {
            const x = startX + index * (planWidth + 10);
            const isFeatured = index === 1; // 中间方案突出显示

            // 方案卡片背景
            if (isFeatured) {
                // 突出方案的边框
                this.doc.save();
                this.doc.strokeColor(accentColor)
                    .lineWidth(3)
                    .roundedRect(x, startY, planWidth, planHeight, 10)
                    .stroke();
                this.doc.restore();
            }
            this._drawRoundedRect(x, startY, planWidth, planHeight, 10, cardBgColor, cardBorderColor, 1);

            // 方案名称
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(isFeatured ? accentColor : primaryColor)
                .font(this.fonts.bold)
                .text(plan.name, x + 15, startY + 20, {
                    width: planWidth - 30,
                    align: 'center'
                });

            // 价格（大字体）
            this.doc.fontSize(this.options.typography.display)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(plan.price, x + 15, startY + 45, {
                    width: planWidth - 30,
                    align: 'center'
                });

            // 功能列表
            if (plan.features && plan.features.length > 0) {
                const featureY = startY + 90;
                plan.features.forEach((feature, fIndex) => {
                    this.doc.fontSize(this.options.typography.caption)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(`• ${feature}`, x + 15, featureY + fIndex * 20, {
                            width: planWidth - 30
                        });
                });
            }

            // 推荐标签
            if (isFeatured) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor('#FFFFFF')
                    .font(this.fonts.bold);
                this.doc.save();
                this.doc.fillColor(accentColor);
                this.doc.roundedRect(x + planWidth/2 - 25, startY - 10, 50, 20, 4).fill();
                this.doc.restore();
                this.doc.text('推荐', x + planWidth/2 - 20, startY - 5);
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 流程图页
    // ==========================================
    flowChart(title, steps) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xxl;
        const stepWidth = contentWidth / steps.length;
        const stepRadius = 25;

        steps.forEach((step, index) => {
            const centerX = startX + index * stepWidth + stepWidth / 2;

            // 步骤圆圈
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.circle(centerX, startY, stepRadius).fill();
            this.doc.restore();

            // 步骤编号
            this.doc.fontSize(this.options.typography.bodyLarge)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(`${step.id || index + 1}`, centerX - 8, startY - 8);

            // 连接箭头（除最后一个）
            if (index < steps.length - 1) {
                const nextCenterX = startX + (index + 1) * stepWidth + stepWidth / 2;
                this.doc.save();
                this.doc.strokeColor(primaryColor)
                    .lineWidth(2)
                    .moveTo(centerX + stepRadius + 5, startY)
                    .lineTo(nextCenterX - stepRadius - 5, startY)
                    .stroke();
                // 箭头
                this.doc.fillColor(primaryColor);
                this.doc.moveTo(nextCenterX - stepRadius - 5, startY - 5)
                    .lineTo(nextCenterX - stepRadius - 5, startY + 5)
                    .lineTo(nextCenterX - stepRadius, startY)
                    .fill();
                this.doc.restore();
            }

            // 步骤标题
            this.doc.fontSize(this.options.typography.body)
                .fillColor(textColor)
                .font(this.fonts.bold)
                .text(step.title, startX + index * stepWidth, startY + 40, {
                    width: stepWidth,
                    align: 'center'
                });

            // 步骤描述
            if (step.desc) {
                this.doc.fontSize(this.options.typography.caption)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(step.desc, startX + index * stepWidth, startY + 60, {
                        width: stepWidth,
                        align: 'center'
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 组织架构图页
    // ==========================================
    orgChart(title, data) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');

        const centerX = this.doc.page.width / 2;
        const startY = this.currentY + this.options.spacing.xxl;
        const nodeWidth = 80;
        const nodeHeight = 40;
        const levelGap = 60;

        // 绘制节点
        const drawNode = (node, x, y, isRoot = false) => {
            // 节点背景
            this._drawRoundedRect(x - nodeWidth/2, y, nodeWidth, nodeHeight, 8,
                isRoot ? primaryColor : cardBgColor, primaryColor, 1);

            // 节点名称
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(isRoot ? '#FFFFFF' : textColor)
                .font(this.fonts.bold)
                .text(node.name, x - nodeWidth/2 + 5, y + 8, {
                    width: nodeWidth - 10,
                    align: 'center'
                });

            // 节点职位
            if (node.title) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(isRoot ? '#CCCCCC' : textMutedColor)
                    .font(this.fonts.regular)
                    .text(node.title, x - nodeWidth/2 + 5, y + 22, {
                        width: nodeWidth - 10,
                        align: 'center'
                    });
            }
        };

        // 绘制连接线
        const drawLine = (parentX, parentY, childX, childY) => {
            this.doc.save();
            this.doc.strokeColor(primaryColor)
                .lineWidth(1.5)
                .moveTo(parentX, parentY + nodeHeight)
                .lineTo(parentX, parentY + nodeHeight + levelGap/2)
                .lineTo(childX, parentY + nodeHeight + levelGap/2)
                .lineTo(childX, childY)
                .stroke();
            this.doc.restore();
        };

        // 绘制根节点
        drawNode(data.root, centerX, startY, true);

        // 绘制子节点
        if (data.children && data.children.length > 0) {
            const childWidth = (this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right) / data.children.length;
            const childStartX = this.options.page.margin.left + childWidth / 2;

            data.children.forEach((child, index) => {
                const childX = childStartX + index * childWidth;
                const childY = startY + levelGap;

                drawLine(centerX, startY, childX, childY);
                drawNode(child, childX, childY);

                // 绘制孙节点
                if (child.children && child.children.length > 0) {
                    const grandWidth = childWidth / child.children.length;
                    const grandStartX = childX - childWidth/2 + grandWidth/2;

                    child.children.forEach((grand, gIndex) => {
                        const grandX = grandStartX + gIndex * grandWidth;
                        const grandY = childY + levelGap;

                        drawLine(childX, childY, grandX, grandY);
                        drawNode(grand, grandX, grandY);
                    });
                }
            });
        }

        this.pageCount++;
        return this;
    }

    
    // ==========================================
    // API 概览页
    // ==========================================
    apiOverview(title, endpoints) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const rowHeight = 32;

        endpoints.forEach((endpoint, index) => {
            const y = startY + index * rowHeight;

            // 行背景
            const isEven = index % 2 === 0;
            this.doc.save();
            this.doc.rect(startX, y, contentWidth, rowHeight)
                .fill(isEven ? cardBgColor : this._getStyleColor('content'));
            this.doc.restore();

            // 方法标签（GET/POST等）
            const methodColor = endpoint.method === 'GET' ? '#22C55E' :
                               endpoint.method === 'POST' ? '#3B82F6' :
                               endpoint.method === 'PUT' ? '#F59E0B' :
                               endpoint.method === 'DELETE' ? '#EF4444' : accentColor;

            this.doc.save();
            this.doc.fillColor(methodColor);
            this.doc.roundedRect(startX + 10, y + 8, 45, 16, 4).fill();
            this.doc.restore();

            this.doc.fontSize(this.options.typography.small)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(endpoint.method, startX + 15, y + 11);

            // 路径
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(endpoint.path, startX + 65, y + 10);

            // 描述
            this.doc.fontSize(this.options.typography.small)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(endpoint.desc, startX + 250, y + 10, {
                    width: contentWidth - 260
                });
        });

        // 表格边框
        this.doc.save();
        this.doc.strokeColor(cardBorderColor)
            .lineWidth(1)
            .rect(startX, startY, contentWidth, endpoints.length * rowHeight)
            .stroke();
        this.doc.restore();

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 代码块展示页
    // ==========================================
    codeBlock(title, code, language = 'Python') {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const lineHeight = 18;
        const padding = 15;

        // 计算代码行数
        const lines = code.split('\n');
        const blockHeight = Math.min(lines.length * lineHeight + 50, 200);

        // 代码块背景
        this.doc.save();
        this.doc.rect(startX, startY, contentWidth, blockHeight)
            .fill(cardBgColor);
        this.doc.strokeColor(cardBorderColor)
            .lineWidth(1)
            .rect(startX, startY, contentWidth, blockHeight)
            .stroke();
        this.doc.restore();

        // 语言标签
        this.doc.save();
        this.doc.fillColor(primaryColor);
        this.doc.roundedRect(startX + 10, startY + 8, 60, 18, 4).fill();
        this.doc.restore();

        this.doc.fontSize(this.options.typography.small)
            .fillColor('#FFFFFF')
            .font(this.fonts.bold)
            .text(language, startX + 20, startY + 11);

        // 代码内容
        let lineY = startY + 35;
        lines.slice(0, 10).forEach((line, index) => {
            // 行号
            this.doc.fontSize(this.options.typography.small)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(`${index + 1}`, startX + padding, lineY);

            // 代码行（检查是否为注释）
            const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
            this.doc.fontSize(this.options.typography.small)
                .fillColor(isComment ? textMutedColor : textColor)
                .font(this.fonts.regular)
                .text(line, startX + padding + 25, lineY, {
                    width: contentWidth - padding * 2 - 25
                });

            lineY += lineHeight;
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 应用场景页
    // ==========================================
    useCases(title, cases) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const cardWidth = contentWidth;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const cardHeight = 80;
        const gap = 15;

        cases.forEach((caseItem, index) => {
            const y = startY + index * (cardHeight + gap);

            // 场景卡片背景
            this._drawRoundedRect(startX, y, cardWidth, cardHeight, 8, cardBgColor, cardBorderColor, 1);

            // 行业标题（左侧彩色标签）
            this.doc.save();
            this.doc.fillColor(accentColor);
            this.doc.roundedRect(startX + 10, y + 10, 80, 20, 4).fill();
            this.doc.restore();

            this.doc.fontSize(this.options.typography.caption)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(caseItem.industry, startX + 15, y + 13);

            // 应用场景列表
            if (caseItem.scenarios && caseItem.scenarios.length > 0) {
                const scenariosText = caseItem.scenarios.map(s => `• ${s}`).join('   ');
                this.doc.fontSize(this.options.typography.body)
                    .fillColor(textColor)
                    .font(this.fonts.regular)
                    .text(scenariosText, startX + 100, y + 35, {
                        width: cardWidth - 120,
                        height: 40
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 定价方案页
    // ==========================================
    pricing(title, plans) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const planCount = plans.length || 3;
        const cardWidth = (contentWidth - (planCount - 1) * 15) / planCount;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;
        const cardHeight = 160;
        const gap = 15;

        plans.forEach((plan, index) => {
            const x = startX + index * (cardWidth + gap);

            // 定价卡片背景
            const isRecommended = plan.recommend || index === 1;
            const borderColor = isRecommended ? accentColor : cardBorderColor;
            const borderWidth = isRecommended ? 2 : 1;

            this._drawRoundedRect(x, startY, cardWidth, cardHeight, 10, cardBgColor, borderColor, borderWidth);

            // 推荐标签
            if (isRecommended) {
                this.doc.save();
                this.doc.fillColor(accentColor);
                this.doc.roundedRect(x + cardWidth - 60, startY - 5, 50, 18, 4).fill();
                this.doc.restore();

                this.doc.fontSize(this.options.typography.small)
                    .fillColor('#FFFFFF')
                    .font(this.fonts.bold)
                    .text('推荐', x + cardWidth - 50, startY - 2);
            }

            // 方案名称
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(plan.name, x + 15, startY + 15);

            // 价格（突出显示）
            this.doc.fontSize(28)
                .fillColor(accentColor)
                .font(this.fonts.bold)
                .text(plan.price, x + 15, startY + 45);

            // 功能列表
            if (plan.features && plan.features.length > 0) {
                let featureY = startY + 80;
                plan.features.forEach(feature => {
                    this.doc.fontSize(this.options.typography.caption)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(`✓ ${feature}`, x + 15, featureY, {
                            width: cardWidth - 30
                        });
                    featureY += 20;
                });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 流程图页
    // ==========================================
    flowChart(title, steps) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const stepCount = steps.length;
        const stepWidth = Math.min(100, contentWidth / stepCount);
        const startX = this.options.page.margin.left + (contentWidth - stepCount * stepWidth - (stepCount - 1) * 30) / 2;
        const startY = this.currentY + this.options.spacing.xxl;
        const stepHeight = 60;
        const gap = 30;

        // 绘制连接线
        this.doc.save();
        this.doc.strokeColor(primaryColor)
            .lineWidth(2);
        for (let i = 0; i < stepCount - 1; i++) {
            const x1 = startX + i * (stepWidth + gap) + stepWidth;
            const x2 = startX + (i + 1) * (stepWidth + gap);
            this.doc.moveTo(x1, startY + stepHeight / 2)
                .lineTo(x2, startY + stepHeight / 2)
                .stroke();
            // 箭头
            this._drawDecoTriangle(x2 - 5, startY + stepHeight / 2, 6, primaryColor, 'right');
        }
        this.doc.restore();

        // 绘制步骤节点
        steps.forEach((step, index) => {
            const x = startX + index * (stepWidth + gap);

            // 步骤圆圈
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.circle(x + stepWidth / 2, startY + 20, 22).fill();
            this.doc.restore();

            // 步骤编号
            this.doc.fontSize(this.options.typography.body)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(step.id || index + 1, x + stepWidth / 2 - 8, startY + 15);

            // 步骤标题
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.bold)
                .text(step.title, x, startY + 50, {
                    width: stepWidth,
                    align: 'center'
                });

            // 步骤描述
            if (step.desc) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(step.desc, x, startY + 65, {
                        width: stepWidth,
                        align: 'center'
                    });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 组织架构图页
    // ==========================================
    orgChart(title, config) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const centerX = this.doc.page.width / 2;
        const startY = this.currentY + this.options.spacing.xxl;
        const nodeWidth = 70;
        const nodeHeight = 35;
        const levelGap = 50;

        // 绘制根节点
        this._drawOrgNode(centerX - nodeWidth / 2, startY, nodeWidth, nodeHeight,
            config.root.name, config.root.title, primaryColor, accentColor, textColor, cardBgColor);

        // 绘制子节点
        if (config.children && config.children.length > 0) {
            const childCount = config.children.length;
            const childWidth = contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
            const spacing = childWidth / (childCount + 1);

            // 连接线
            this.doc.save();
            this.doc.strokeColor(primaryColor)
                .lineWidth(2)
                .moveTo(centerX, startY + nodeHeight)
                .lineTo(centerX, startY + nodeHeight + levelGap / 2)
                .stroke();
            this.doc.restore();

            config.children.forEach((child, index) => {
                const childX = this.options.page.margin.left + spacing * (index + 1) - nodeWidth / 2;
                const childY = startY + levelGap;

                // 绘制连接线到子节点
                this.doc.save();
                this.doc.strokeColor(primaryColor)
                    .lineWidth(1.5)
                    .moveTo(centerX, startY + nodeHeight + levelGap / 2)
                    .lineTo(childX + nodeWidth / 2, startY + nodeHeight + levelGap / 2)
                    .lineTo(childX + nodeWidth / 2, childY)
                    .stroke();
                this.doc.restore();

                // 绘制子节点
                this._drawOrgNode(childX, childY, nodeWidth, nodeHeight,
                    child.name, child.title, accentColor, primaryColor, textColor, cardBgColor);

                // 绘制子节点的子节点
                if (child.children && child.children.length > 0) {
                    const grandChildY = childY + levelGap;
                    const grandSpacing = 80;
                    const startX = childX + nodeWidth / 2 - (child.children.length - 1) * grandSpacing / 2;

                    child.children.forEach((grandChild, gcIndex) => {
                        const gcX = startX + gcIndex * grandSpacing - nodeWidth / 2;

                        // 连接线
                        this.doc.save();
                        this.doc.strokeColor(textMutedColor)
                            .lineWidth(1)
                            .moveTo(childX + nodeWidth / 2, childY + nodeHeight)
                            .lineTo(gcX + nodeWidth / 2, grandChildY)
                            .stroke();
                        this.doc.restore();

                        this._drawOrgNode(gcX, grandChildY, nodeWidth - 10, nodeHeight - 5,
                            grandChild.name, grandChild.title, textMutedColor, primaryColor, textColor, cardBgColor);
                    });
                }
            });
        }

        this.pageCount++;
        return this;
    }

    // 组织架构节点绘制辅助方法
    _drawOrgNode(x, y, width, height, name, title, borderColor, accentColor, textColor, bgColor) {
        // 节点背景
        this.doc.save();
        this.doc.fillColor(bgColor);
        this.doc.roundedRect(x, y, width, height, 6).fill();
        this.doc.strokeColor(borderColor);
        this.doc.lineWidth(1.5);
        this.doc.roundedRect(x, y, width, height, 6).stroke();
        this.doc.restore();

        // 名称
        this.doc.fontSize(this.options.typography.caption)
            .fillColor(textColor)
            .font(this.fonts.bold)
            .text(name, x + 5, y + 8, {
                width: width - 10,
                align: 'center'
            });

        // 职位
        if (title) {
            this.doc.fontSize(this.options.typography.small)
                .fillColor(accentColor)
                .font(this.fonts.regular)
                .text(title, x + 5, y + height - 12, {
                    width: width - 10,
                    align: 'center'
                });
        }
    }

    // ==========================================
    // 对比卡片页（左右对比）
    // ==========================================
    comparison(title, config) {
        // 如果是表格形式，使用已有的 table 方法
        if (config.columns && config.rows) {
            return this.table(title, config.rows, config.columns);
        }

        // 左右对比卡片形式
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const cardWidth = (contentWidth - 20) / 2;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;
        const cardHeight = 150;

        // 左侧卡片
        if (config.left) {
            const leftX = startX;
            const leftBorderColor = config.right && config.right.recommend ? cardBorderColor : accentColor;
            this._drawRoundedRect(leftX, startY, cardWidth, cardHeight, 10, cardBgColor, leftBorderColor, 1);

            // 标题
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(config.left.title, leftX + 15, startY + 15);

            // 内容列表
            if (config.left.items) {
                let itemY = startY + 45;
                config.left.items.forEach(item => {
                    const isPositive = !item.includes('缺点') && !item.includes('问题');
                    this.doc.fontSize(this.options.typography.body)
                        .fillColor(isPositive ? '#22C55E' : '#EF4444')
                        .font(this.fonts.bold)
                        .text(isPositive ? '✓' : '✗', leftX + 15, itemY);
                    this.doc.fontSize(this.options.typography.body)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(item, leftX + 30, itemY);
                    itemY += 22;
                });
            }
        }

        // 右侧卡片
        if (config.right) {
            const rightX = startX + cardWidth + 20;
            const rightBorderColor = config.right.recommend ? accentColor : cardBorderColor;
            const rightBorderWidth = config.right.recommend ? 2 : 1;
            this._drawRoundedRect(rightX, startY, cardWidth, cardHeight, 10, cardBgColor, rightBorderColor, rightBorderWidth);

            // 推荐标签
            if (config.right.recommend) {
                this.doc.save();
                this.doc.fillColor(accentColor);
                this.doc.roundedRect(rightX + cardWidth - 50, startY - 5, 40, 16, 4).fill();
                this.doc.restore();
                this.doc.fontSize(this.options.typography.small)
                    .fillColor('#FFFFFF')
                    .font(this.fonts.bold)
                    .text('推荐', rightX + cardWidth - 45, startY - 2);
            }

            // 标题
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(config.right.title, rightX + 15, startY + 15);

            // 内容列表
            if (config.right.items) {
                let itemY = startY + 45;
                config.right.items.forEach(item => {
                    const isPositive = !item.includes('缺点') && !item.includes('问题');
                    this.doc.fontSize(this.options.typography.body)
                        .fillColor(isPositive ? '#22C55E' : '#EF4444')
                        .font(this.fonts.bold)
                        .text(isPositive ? '✓' : '✗', rightX + 15, itemY);
                    this.doc.fontSize(this.options.typography.body)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(item, rightX + 30, itemY);
                    itemY += 22;
                });
            }
        }

        this.pageCount++;
        return this;
    }

    // ==========================================
    // API 概览页
    // ==========================================
    apiOverview(title, endpoints) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const rowHeight = 35;

        // 表头
        this.doc.save();
        this.doc.fillColor(primaryColor);
        this.doc.rect(startX, startY, contentWidth, rowHeight).fill();
        this.doc.restore();

        // 表头文字
        this.doc.fontSize(this.options.typography.caption)
            .fillColor('#FFFFFF')
            .font(this.fonts.bold)
            .text('Method', startX + 12, startY + 12)
            .text('Endpoint', startX + 100, startY + 12)
            .text('Description', startX + 250, startY + 12);

        // 数据行
        endpoints.forEach((endpoint, index) => {
            const rowY = startY + rowHeight + index * rowHeight;
            const isEven = index % 2 === 0;

            // 行背景
            this.doc.save();
            this.doc.rect(startX, rowY, contentWidth, rowHeight)
                .fill(isEven ? cardBgColor : '#FFFFFF');
            this.doc.restore();

            // Method 标签
            const methodColor = endpoint.method === 'GET' ? '#22C55E' :
                           endpoint.method === 'POST' ? '#F59E0B' :
                           endpoint.method === 'PUT' ? '#3B82F6' :
                           endpoint.method === 'DELETE' ? '#EF4444' : primaryColor;

            this.doc.save();
            this.doc.fillColor(methodColor);
            this.doc.rect(startX + 8, rowY + 8, 60, rowHeight - 16, 4).fill();
            this.doc.restore();

            this.doc.fontSize(this.options.typography.small)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(endpoint.method, startX + 18, rowY + 12);

            // Endpoint
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.regular)
                .text(endpoint.path, startX + 100, rowY + 12);

            // Description
            this.doc.fontSize(this.options.typography.small)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(endpoint.desc || '', startX + 250, rowY + 12, {
                    width: contentWidth - 270
                });

            // 行边框
            this.doc.save();
            this.doc.strokeColor(cardBorderColor);
            this.doc.lineWidth(0.5);
            this.doc.rect(startX, rowY, contentWidth, rowHeight).stroke();
            this.doc.restore();
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 代码块展示页
    // ==========================================
    codeBlock(title, config) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const language = config.language || 'Python';
        const code = config.code || '';
        const lines = code.split('\n');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const lineHeight = 18;
        const headerHeight = 30;
        const codeBlockHeight = Math.min(lines.length * lineHeight + 20, 400);

        const totalHeight = headerHeight + codeBlockHeight;

        // 代码块容器背景
        this._drawRoundedRect(startX, startY, contentWidth, totalHeight, 8, cardBgColor, cardBorderColor, 1);

        // 语言标签背景
        this.doc.save();
        this.doc.fillColor(primaryColor);
        this.doc.rect(startX, startY, 80, headerHeight - 5, 4).fill();
        this.doc.restore();

        // 语言标签文字
        this.doc.fontSize(this.options.typography.small)
            .fillColor('#FFFFFF')
            .font(this.fonts.bold)
            .text(language, startX + 15, startY + 8);

        // 行号背景
        this.doc.save();
        this.doc.fillColor(textMutedColor);
        this.doc.rect(startX, startY + headerHeight - 5, 40, codeBlockHeight + 5, 4).fill();
        this.doc.restore();

        // 代码内容
        let codeY = startY + headerHeight;
        lines.forEach((line, index) => {
            // 行号
            this.doc.fontSize(this.options.typography.small)
                .fillColor(textMutedColor)
                .font(this.fonts.regular)
                .text(`${index + 1}`, startX + 8, codeY + 5);

            // 代码行
            const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(isComment ? textMutedColor : textColor)
                .font(this.fonts.regular)
                .text(line, startX + 50, codeY + 5, {
                    width: contentWidth - 60
                });

            codeY += lineHeight;
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 应用场景页
    // ==========================================
    useCases(title, cases) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const caseWidth = contentWidth / cases.length;
        const caseHeight = 120;

        cases.forEach((caseItem, index) => {
            const x = startX + index * caseWidth;
            const caseX = x + 10;
            const caseW = caseWidth - 20;

            // 场景卡片背景
            this._drawRoundedRect(caseX, startY, caseW, caseHeight, 8, cardBgColor, cardBorderColor, 1);

            // 行业标签背景
            this.doc.save();
            this.doc.fillColor(accentColor);
            this.doc.roundedRect(caseX, startY, caseW, 25, 4).fill();
            this.doc.restore();

            // 行业名称
            this.doc.fontSize(this.options.typography.caption)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(caseItem.industry, caseX + 12, startY + 8);

            // 场景列表
            let scenarioY = startY + 35;
            if (caseItem.scenarios) {
                caseItem.scenarios.forEach((scenario, sIndex) => {
                    // 场景圆点
                    this._drawDecoDot(caseX + 15, scenarioY + 5, 3, primaryColor);

                    // 场景文字
                    this.doc.fontSize(this.options.typography.small)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(scenario, caseX + 25, scenarioY + 3, {
                            width: caseW - 35
                        });

                    scenarioY += 20;
                });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 定价方案页
    // ==========================================
    pricing(title, plans) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const planWidth = (contentWidth - 30) / plans.length;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.lg;
        const planHeight = 200;

        plans.forEach((plan, index) => {
            const x = startX + index * (planWidth + 10);
            const planX = x + 5;
            const planW = planWidth - 10;
            const isRecommended = index === 1 || plan.recommended;

            // 方案卡片背景
            if (isRecommended) {
                // 推荐方案有特殊边框
                this.doc.save();
                this.doc.fillColor(accentColor);
                this.doc.roundedRect(planX - 3, startY - 3, planW + 6, planHeight + 6, 10).fill();
                this.doc.restore();
            }
            this._drawRoundedRect(planX, startY, planW, planHeight, 8, cardBgColor, isRecommended ? accentColor : cardBorderColor, isRecommended ? 2 : 1);

            // 方案名称
            this.doc.fontSize(this.options.typography.heading)
                .fillColor(primaryColor)
                .font(this.fonts.bold)
                .text(plan.name, planX + 12, startY + 12);

            // 推荐标签
            if (isRecommended) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(accentColor)
                    .font(this.fonts.bold)
                    .text('推荐', planX + planW - 40, startY + 12);
            }

            // 价格
            this.doc.fontSize(this.options.typography.sectionTitle)
                .fillColor(accentColor)
                .font(this.fonts.bold)
                .text(plan.price, planX + 12, startY + 50, {
                    width: planW - 24,
                    align: 'center'
                });

            // 功能列表
            let featureY = startY + 85;
            if (plan.features) {
                plan.features.forEach((feature, fIndex) => {
                    // 功能圆点
                    this._drawDecoDot(planX + 15, featureY + 5, 3, primaryColor);

                    // 功能文字
                    this.doc.fontSize(this.options.typography.small)
                        .fillColor(textColor)
                        .font(this.fonts.regular)
                        .text(feature, planX + 25, featureY + 3, {
                            width: planW - 35
                        });

                    featureY += 18;
                });
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 流程图页
    // ==========================================
    flowChart(title, steps) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');
        const cardBorderColor = this._getStyleColor('cardBorder');

        const contentWidth = this.doc.page.width - this.options.page.margin.left - this.options.page.margin.right;
        const stepWidth = contentWidth / steps.length;
        const startX = this.options.page.margin.left;
        const startY = this.currentY + this.options.spacing.xl;
        const stepHeight = 80;

        steps.forEach((step, index) => {
            const x = startX + index * stepWidth;
            const centerX = x + stepWidth / 2;

            // 步骤圆圈
            this.doc.save();
            this.doc.fillColor(primaryColor);
            this.doc.circle(centerX, startY + 25, 25).fill();
            this.doc.restore();

            // 步骤编号
            this.doc.fontSize(this.options.typography.body)
                .fillColor('#FFFFFF')
                .font(this.fonts.bold)
                .text(`${index + 1}`, centerX - 8, startY + 20);

            // 步骤标题
            this.doc.fontSize(this.options.typography.caption)
                .fillColor(textColor)
                .font(this.fonts.bold)
                .text(step.title, centerX - stepWidth / 2 + 15, startY + 60, {
                    width: stepWidth - 20,
                    align: 'center'
                });

            // 步骤描述
            if (step.desc) {
                this.doc.fontSize(this.options.typography.small)
                    .fillColor(textMutedColor)
                    .font(this.fonts.regular)
                    .text(step.desc, centerX - stepWidth / 2 + 15, startY + 80, {
                        width: stepWidth - 20,
                        align: 'center'
                    });
            }

            // 连接箭头（除了最后一个）
            if (index < steps.length - 1) {
                this.doc.save();
                this.doc.strokeColor(primaryColor);
                this.doc.lineWidth(2);
                this.doc.moveTo(centerX + 25, startY + 25);
                this.doc.lineTo(centerX + stepWidth - 25, startY + 25);
                this.doc.stroke();
                this.doc.restore();
            }
        });

        this.pageCount++;
        return this;
    }

    // ==========================================
    // 组织架构图页
    // ==========================================
    orgChart(title, config) {
        this.addPage();
        this.heading(title, 1);

        const primaryColor = this._getStyleColor('primary');
        const accentColor = this._getStyleColor('accent');
        const textColor = this._getStyleColor('text');
        const textMutedColor = this._getStyleColor('textMuted');
        const cardBgColor = this._getStyleColor('cardBg');

        const root = config.root;
        const children = config.children || [];

        const centerX = this.doc.page.width / 2;
        const startY = this.currentY + this.options.spacing.xl;
        const nodeWidth = 100;
        const nodeHeight = 40;
        const levelGap = 60;

        // 绘制根节点
        this._drawOrgNode(centerX, startY, nodeWidth, nodeHeight, root, primaryColor, cardBgColor, textColor);

        // 绘制子节点
        const childCount = children.length;
        const childSpacing = (this.doc.page.width - 100) / (childCount + 1);

        children.forEach((child, index) => {
            const childX = childSpacing * (index + 1);
            const childY = startY + levelGap;

            // 连接线
            this.doc.save();
            this.doc.strokeColor(primaryColor);
            this.doc.lineWidth(2);
            this.doc.moveTo(centerX, startY + nodeHeight);
            this.doc.lineTo(childX, childY);
            this.doc.stroke();
            this.doc.restore();

            // 子节点
            this._drawOrgNode(childX, childY, nodeWidth, nodeHeight, child, accentColor, cardBgColor, textColor);

            // 孙节点
            if (child.children && child.children.length > 0) {
                const grandCount = child.children.length;
                const grandSpacing = nodeWidth * 1.5;
                child.children.forEach((grand, gIndex) => {
                    const grandX = childX - nodeWidth / 2 + grandSpacing * (gIndex + 0.5);
                    const grandY = childY + levelGap;

                    // 连接线
                    this.doc.save();
                    this.doc.strokeColor(accentColor);
                    this.doc.lineWidth(1);
                    this.doc.moveTo(childX, childY + nodeHeight);
                    this.doc.lineTo(grandX, grandY);
                    this.doc.stroke();
                    this.doc.restore();

                    // 孙节点
                    this._drawOrgNode(grandX, grandY, nodeWidth - 20, nodeHeight - 10, grand, primaryColor, cardBgColor, textColor);
                });
            }
        });

        this.pageCount++;
        return this;
    }

    // 组织架构节点绘制辅助方法
    _drawOrgNode(x, y, width, height, node, bgColor, cardBgColor, textColor) {
        // 节点背景
        this._drawRoundedRect(x - width / 2, y, width, height, 6, cardBgColor, bgColor, 1);

        // 节点名称
        this.doc.fontSize(this.options.typography.caption)
            .fillColor(textColor)
            .font(this.fonts.bold)
            .text(node.name, x - width / 2 + 8, y + 8);

        // 节点职位
        if (node.title) {
            this.doc.fontSize(this.options.typography.small)
                .fillColor(bgColor)
                .font(this.fonts.regular)
                .text(node.title, x - width / 2 + 8, y + 25);
        }
    }

    // ==========================================
    // 保存方法
    // ==========================================
    save(outputPath) {
        if (typeof outputPath === 'string') {
            this.doc.pipe(fs.createWriteStream(outputPath));
        }
        this.doc.end();
        return this;
    }

    // 返回 PDF 流
    getStream() {
        return this.doc;
    }
}

// ==========================================
// 批量生成函数
// ==========================================
async function generateAllTemplates(outputDir) {
    const styles = Object.keys(STYLE_LIBRARY);
    const results = [];

    for (const styleName of styles) {
        try {
            const gen = new ModernPDFUltimate(styleName);
            const style = STYLE_LIBRARY[styleName];

            // 封面
            gen.cover(
                `${style.name} Style Demo`,
                'Modern PDF Ultimate v8.0',
                'Professional PDF Document Generator'
            );

            // 目录
            gen.toc([
                { num: '01', title: 'Introduction', page: 3 },
                { num: '02', title: 'Features', page: 4 },
                { num: '03', title: 'Data Analysis', page: 5 },
                { num: '04', title: 'Timeline', page: 6 },
                { num: '05', title: 'Conclusion', page: 7 }
            ]);

            // 信息卡片
            gen.infoCards('Core Features', [
                { icon: 'A', title: 'Gradient Backgrounds', desc: 'Beautiful gradient effects for covers' },
                { icon: 'B', title: 'Typography System', desc: '8-level font hierarchy system' },
                { icon: 'C', title: 'Decorative Elements', desc: 'Lines, dots, circles, triangles' },
                { icon: 'D', title: 'Data Visualization', desc: 'Charts, tables, timelines' }
            ]);

            // 数据统计
            gen.dataStats('Performance Metrics', [
                { value: '99.9%', label: 'Accuracy', change: '+5.2%' },
                { value: '120ms', label: 'Response Time', change: '-12%' },
                { value: '50+', label: 'Page Types' }
            ]);

            // 时间线
            gen.timeline('Project Timeline', [
                { date: '2024-01', title: 'Design Phase', desc: 'Initial planning and design' },
                { date: '2024-03', title: 'Development', desc: 'Core implementation' },
                { date: '2024-06', title: 'Testing', desc: 'Quality assurance' },
                { date: '2024-09', title: 'Launch', desc: 'Public release' }
            ]);

            // 表格
            gen.table('Feature Comparison', [
                { feature: 'Gradient', basic: 'Yes', pro: 'Advanced', ultimate: 'Mesh' },
                { feature: 'Typography', basic: '3 levels', pro: '5 levels', ultimate: '8 levels' },
                { feature: 'Decorations', basic: 'Basic', pro: 'Enhanced', ultimate: 'Full' },
                { feature: 'Pages', basic: '10', pro: '30', ultimate: '50+' }
            ]);

            // 结尾
            gen.end('Thank You', 'Created with Modern PDF Ultimate v8.0', 'modern-pdf@example.com');

            const outputPath = path.join(outputDir, `${styleName}-demo.pdf`);
            gen.save(outputPath);

            results.push({ style: styleName, success: true, path: outputPath });
        } catch (err) {
            results.push({ style: styleName, success: false, error: err.message });
        }
    }

    return results;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    ModernPDFUltimate,
    generateAllTemplates,
    STYLE_LIBRARY,
    getStyle,
    MODERN_LAYOUT_BASE
};