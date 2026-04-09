/**
 * Data Visualization Components - 数据可视化组件
 *
 * 统计卡片
 * 进度条
 * 图表组件
 */

// ==========================================
// 统计卡片组件
// ==========================================
function createStatCard(doc, options) {
    const {
        x, y,
        width = 120,
        height = 80,
        value,
        label,
        change,
        changeColor,
        primaryColor,
        accentColor,
        textMutedColor,
        isHighlighted = false
    } = options;

    doc.save();

    // 卡片背景
    if (isHighlighted) {
        // 高亮卡片有特殊边框
        doc.roundedRect(x, y, width, height, 8)
            .fill('#FFFFFF')
            .stroke(accentColor)
            .lineWidth(2);
    } else {
        doc.roundedRect(x, y, width, height, 8)
            .fill('#FFFFFF')
            .stroke('#E5E7EB')
            .lineWidth(1);
    }

    // 数值
    doc.fontSize(24)
        .fillColor(primaryColor)
        .font('Helvetica-Bold')
        .text(value, x + 10, y + 15, {
            width: width - 20,
            align: 'center'
        });

    // 标签
    doc.fontSize(10)
        .fillColor(textMutedColor)
        .font('Helvetica')
        .text(label, x + 10, y + 45, {
            width: width - 20,
            align: 'center'
        });

    // 变化值
    if (change) {
        doc.fontSize(8)
            .fillColor(changeColor || (change.startsWith('+') ? '#22C55E' : '#EF4444'))
            .text(change, x + 10, y + 60, {
                width: width - 20,
                align: 'center'
            });
    }

    doc.restore();
    return { width, height };
}

// ==========================================
// 进度条组件
// ==========================================
function createProgressBar(doc, options) {
    const {
        x, y,
        width = 200,
        height = 20,
        progress = 0.75,  // 0-1
        label = '',
        primaryColor,
        backgroundColor = '#E5E7EB',
        showPercentage = true
    } = options;

    doc.save();

    // 背景条
    doc.roundedRect(x, y, width, height, 4)
        .fill(backgroundColor);

    // 进度条
    const progressWidth = width * Math.min(1, Math.max(0, progress));
    if (progressWidth > 0) {
        doc.roundedRect(x, y, progressWidth, height, 4)
            .fill(primaryColor);
    }

    // 百分比标签
    if (showPercentage) {
        doc.fontSize(10)
            .fillColor('#FFFFFF')
            .font('Helvetica-Bold')
            .text(`${Math.round(progress * 100)}%`, x + progressWidth - 30, y + 4, {
                width: 25,
                align: 'right'
            });
    }

    // 左侧标签
    if (label) {
        doc.fontSize(10)
            .fillColor('#374151')
            .font('Helvetica')
            .text(label, x, y - 15);
    }

    doc.restore();
    return { width, height };
}

// ==========================================
// 简单条形图
// ==========================================
function createBarChart(doc, options) {
    const {
        x, y,
        width = 300,
        height = 150,
        data = [],
        primaryColor,
        accentColor,
        textMutedColor,
        maxValue = null
    } = options;

    doc.save();

    const barWidth = 30;
    const barSpacing = 20;
    const chartHeight = height - 40;
    const maxVal = maxValue || Math.max(...data.map(d => d.value));
    const startX = x + 20;

    // 绘制背景线
    doc.strokeColor('#E5E7EB')
        .lineWidth(0.5)
        .moveTo(x, y + chartHeight)
        .lineTo(x + width, y + chartHeight)
        .stroke();

    // 绘制条形
    data.forEach((item, index) => {
        const barX = startX + index * (barWidth + barSpacing);
        const barHeight = (item.value / maxVal) * chartHeight;
        const barY = y + chartHeight - barHeight;

        // 条形
        doc.roundedRect(barX, barY, barWidth, barHeight, 4)
            .fill(index === data.length - 1 ? accentColor : primaryColor);

        // 标签
        doc.fontSize(8)
            .fillColor(textMutedColor)
            .font('Helvetica')
            .text(item.label, barX - 5, y + chartHeight + 5, {
                width: barWidth + 10,
                align: 'center'
            });

        // 数值
        doc.fontSize(8)
            .fillColor('#374151')
            .font('Helvetica-Bold')
            .text(item.value.toString(), barX, barY - 12, {
                width: barWidth,
                align: 'center'
            });
    });

    doc.restore();
    return { width, height };
}

// ==========================================
// 圆形进度指示器
// ==========================================
function createCircularProgress(doc, options) {
    const {
        x, y,
        radius = 40,
        progress = 0.75,
        primaryColor,
        backgroundColor = '#E5E7EB',
        label = '',
        valueText = ''
    } = options;

    doc.save();

    // 背景圆
    doc.circle(x + radius, y + radius, radius)
        .strokeColor(backgroundColor)
        .lineWidth(8);

    // 进度圆弧（简化实现）
    const endAngle = progress * 2 * Math.PI - Math.PI / 2;
    doc.circle(x + radius, y + radius, radius)
        .strokeColor(primaryColor)
        .lineWidth(8);

    // 中心数值
    if (valueText) {
        doc.fontSize(16)
            .fillColor(primaryColor)
            .font('Helvetica-Bold')
            .text(valueText, x, y + radius - 8, {
                width: radius * 2,
                align: 'center'
            });
    }

    // 标签
    if (label) {
        doc.fontSize(10)
            .fillColor('#6B7280')
            .font('Helvetica')
            .text(label, x, y + radius * 2 + 10, {
                width: radius * 2,
                align: 'center'
            });
    }

    doc.restore();
    return { width: radius * 2, height: radius * 2 + 30 };
}

// ==========================================
// 数据表格样式
// ==========================================
const TABLE_STYLES = {
    classic: {
        headerBg: 'primary',
        headerText: '#FFFFFF',
        rowBgEven: 'cardBg',
        rowBgOdd: 'content',
        borderColor: 'primary',
        headerBold: true
    },
    minimal: {
        headerBg: '#F3F4F6',
        headerText: '#374151',
        rowBgEven: '#FFFFFF',
        rowBgOdd: '#F9FAFB',
        borderColor: '#E5E7EB',
        headerBold: true
    },
    striped: {
        headerBg: 'primary',
        headerText: '#FFFFFF',
        rowBgEven: '#F3F4F6',
        rowBgOdd: '#FFFFFF',
        borderColor: '#E5E7EB',
        headerBold: true
    },
    modern: {
        headerBg: 'accent',
        headerText: '#FFFFFF',
        rowBgEven: 'cardBg',
        rowBgOdd: 'content',
        borderColor: 'accent',
        headerBold: true
    }
};

module.exports = {
    createStatCard,
    createProgressBar,
    createBarChart,
    createCircularProgress,
    TABLE_STYLES
};