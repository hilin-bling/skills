/**
 * Glassmorphism Effects - 玻璃态效果
 *
 * 半透明叠加
 * 模糊背景模拟
 * 边框发光效果
 */

// ==========================================
// 玻璃态效果参数
// ==========================================
const GLASS_DEFAULTS = {
    opacity: 0.7,
    blur: 20,          // PDF 用透明度模拟模糊效果
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowBlur: 30,
    borderRadius: 12
};

// ==========================================
// 玻璃态卡片
// ==========================================
function createGlassCard(doc, options) {
    const {
        x, y, width, height,
        opacity = GLASS_DEFAULTS.opacity,
        borderWidth = GLASS_DEFAULTS.borderWidth,
        borderRadius = GLASS_DEFAULTS.borderRadius,
        backgroundColor = '#FFFFFF',
        borderColor = '#FFFFFF',
        shadowEnabled = true,
        shadowColor = 'rgba(0,0,0,0.15)',
        shadowOffset = 4
    } = options;

    doc.save();

    // 阴影层（模拟模糊效果）
    if (shadowEnabled) {
        doc.fillColor(shadowColor);
        doc.roundedRect(x + shadowOffset, y + shadowOffset, width, height, borderRadius).fill();
    }

    // 半透明背景层
    doc.fillColor(backgroundColor)
        .opacity(opacity);
    doc.roundedRect(x, y, width, height, borderRadius).fill();

    // 边框层
    doc.strokeColor(borderColor)
        .lineWidth(borderWidth)
        .opacity(0.5);
    doc.roundedRect(x, y, width, height, borderRadius).stroke();

    // 重置透明度
    doc.opacity(1);

    doc.restore();
}

// ==========================================
// 玻璃态面板
// ==========================================
function createGlassPanel(doc, options) {
    const {
        x, y, width, height,
        opacity = 0.6,
        backgroundColor = '#FFFFFF',
        borderColor = '#E5E7EB',
        borderRadius = 8,
        headerHeight = 40,
        headerColor = 'rgba(255,255,255,0.8)',
        title = '',
        titleColor = '#374151'
    } = options;

    doc.save();

    // 阴影
    doc.fillColor('rgba(0,0,0,0.1)');
    doc.roundedRect(x + 3, y + 3, width, height, borderRadius).fill();

    // 主面板背景
    doc.fillColor(backgroundColor).opacity(opacity);
    doc.roundedRect(x, y, width, height, borderRadius).fill();

    // 头部区域
    if (headerHeight > 0) {
        doc.fillColor(headerColor).opacity(0.8);
        doc.roundedRect(x, y, width, headerHeight, borderRadius).fill();
        doc.rect(x, y + borderRadius, width, headerHeight - borderRadius).fill();

        // 头部标题
        if (title) {
            doc.fontSize(14)
                .fillColor(titleColor)
                .opacity(1)
                .font('Helvetica-Bold')
                .text(title, x + 15, y + headerHeight / 2 - 7);
        }
    }

    // 边框
    doc.strokeColor(borderColor)
        .lineWidth(1)
        .opacity(0.6);
    doc.roundedRect(x, y, width, height, borderRadius).stroke();

    doc.opacity(1);
    doc.restore();

    return {
        contentY: y + headerHeight + 10,
        contentX: x + 15,
        contentWidth: width - 30
    };
}

// ==========================================
// 玻璃态按钮
// ==========================================
function createGlassButton(doc, options) {
    const {
        x, y, width = 100, height = 36,
        text = 'Button',
        opacity = 0.7,
        backgroundColor = '#FFFFFF',
        borderColor = '#E5E7EB',
        textColor = '#374151',
        borderRadius = 8,
        isHighlighted = false,
        highlightColor = '#3182CE'
    } = options;

    doc.save();

    // 背景颜色（高亮状态）
    const bgColor = isHighlighted ? highlightColor : backgroundColor;
    const txtColor = isHighlighted ? '#FFFFFF' : textColor;

    // 阴影
    doc.fillColor('rgba(0,0,0,0.08)');
    doc.roundedRect(x + 2, y + 2, width, height, borderRadius).fill();

    // 按钮背景
    doc.fillColor(bgColor).opacity(isHighlighted ? 1 : opacity);
    doc.roundedRect(x, y, width, height, borderRadius).fill();

    // 边框
    doc.strokeColor(isHighlighted ? highlightColor : borderColor)
        .lineWidth(1)
        .opacity(0.8);
    doc.roundedRect(x, y, width, height, borderRadius).stroke();

    // 文字
    doc.fontSize(12)
        .fillColor(txtColor)
        .opacity(1)
        .font('Helvetica-Bold')
        .text(text, x + 10, y + height / 2 - 6, {
            width: width - 20,
            align: 'center'
        });

    doc.opacity(1);
    doc.restore();
}

// ==========================================
// 玻璃态输入框
// ==========================================
function createGlassInput(doc, options) {
    const {
        x, y, width = 200, height = 32,
        placeholder = 'Enter text...',
        opacity = 0.6,
        backgroundColor = '#FFFFFF',
        borderColor = '#E5E7EB',
        textColor = '#374151',
        borderRadius = 6
    } = options;

    doc.save();

    // 输入框背景
    doc.fillColor(backgroundColor).opacity(opacity);
    doc.roundedRect(x, y, width, height, borderRadius).fill();

    // 边框
    doc.strokeColor(borderColor)
        .lineWidth(1)
        .opacity(0.8);
    doc.roundedRect(x, y, width, height, borderRadius).stroke();

    // 占位符文字
    doc.fontSize(11)
        .fillColor('#9CA3AF')
        .opacity(1)
        .font('Helvetica')
        .text(placeholder, x + 10, y + height / 2 - 5);

    doc.opacity(1);
    doc.restore();
}

// ==========================================
// 玻璃态对话框
// ==========================================
function createGlassDialog(doc, options) {
    const {
        centerX, centerY,
        width = 300, height = 200,
        title = 'Dialog',
        content = '',
        opacity = 0.85,
        backgroundColor = '#FFFFFF',
        borderRadius = 12
    } = options;

    const x = centerX - width / 2;
    const y = centerY - height / 2;

    doc.save();

    // 外部阴影
    doc.fillColor('rgba(0,0,0,0.2)');
    doc.roundedRect(x + 8, y + 8, width, height, borderRadius).fill();

    // 对话框主体
    doc.fillColor(backgroundColor).opacity(opacity);
    doc.roundedRect(x, y, width, height, borderRadius).fill();

    // 边框
    doc.strokeColor('#E5E7EB')
        .lineWidth(1)
        .opacity(0.5);
    doc.roundedRect(x, y, width, height, borderRadius).stroke();

    // 标题区域
    doc.fillColor('#F3F4F6').opacity(1);
    doc.roundedRect(x, y, width, 50, borderRadius).fill();
    doc.rect(x, y + borderRadius, width, 50 - borderRadius).fill();

    doc.fontSize(16)
        .fillColor('#1F2937')
        .font('Helvetica-Bold')
        .text(title, x + 20, y + 18);

    // 内容区域
    if (content) {
        doc.fontSize(12)
            .fillColor('#4B5563')
            .font('Helvetica')
            .text(content, x + 20, y + 70, {
                width: width - 40,
                height: height - 120
            });
    }

    doc.opacity(1);
    doc.restore();
}

// ==========================================
// 玻璃态悬浮效果
// ==========================================
function createGlassOverlay(doc, options) {
    const {
        x, y, width, height,
        opacity = 0.3,
        backgroundColor = '#FFFFFF',
        borderRadius = 0,
        blendMode = 'normal'  // PDF 不支持复杂混合模式
    } = options;

    doc.save();

    doc.fillColor(backgroundColor)
        .opacity(opacity);

    if (borderRadius > 0) {
        doc.roundedRect(x, y, width, height, borderRadius).fill();
    } else {
        doc.rect(x, y, width, height).fill();
    }

    doc.opacity(1);
    doc.restore();
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    GLASS_DEFAULTS,
    createGlassCard,
    createGlassPanel,
    createGlassButton,
    createGlassInput,
    createGlassDialog,
    createGlassOverlay
};