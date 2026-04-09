/**
 * Layout Engine V2 - 高级布局引擎
 *
 * 多栏布局
 * 网格系统
 * 精确定位
 * 响应式布局参数
 */

// ==========================================
// 页面尺寸和边距
// ==========================================
const PAGE_SIZES = {
    A4: { width: 595.28, height: 841.89 },
    Letter: { width: 612, height: 792 },
    Legal: { width: 612, height: 1008 },
    A3: { width: 841.89, height: 1190.55 },
    A5: { width: 420, height: 595.28 }
};

// 默认边距配置
const MARGIN_CONFIGS = {
    standard: { top: 60, bottom: 60, left: 60, right: 60 },
    narrow: { top: 36, bottom: 36, left: 36, right: 36 },
    wide: { top: 72, bottom: 72, left: 90, right: 90 },
    document: { top: 72, bottom: 72, left: 72, right: 72 },
    presentation: { top: 40, bottom: 40, left: 60, right: 60 }
};

// ==========================================
// 网格系统
// ==========================================
const GRID_SYSTEM = {
    columns: 12,
    gutterWidth: 8,
    breakpoints: {
        contentWidth: 475  // A4 内容宽度（标准边距）
    }
};

// 计算列宽
function calculateColumnWidth(totalColumns, usedColumns, gutterWidth = GRID_SYSTEM.gutterWidth) {
    const contentWidth = GRID_SYSTEM.breakpoints.contentWidth;
    const totalGutters = totalColumns - 1;
    const singleColumnWidth = (contentWidth - totalGutters * gutterWidth) / totalColumns;

    const usedGutters = usedColumns - 1;
    return usedColumns * singleColumnWidth + usedGutters * gutterWidth;
}

// 获取列位置
function getColumnPosition(startColumn, columnSpan, gutterWidth = GRID_SYSTEM.gutterWidth) {
    const contentWidth = GRID_SYSTEM.breakpoints.contentWidth;
    const totalColumns = GRID_SYSTEM.columns;
    const singleColumnWidth = (contentWidth - (totalColumns - 1) * gutterWidth) / totalColumns;

    const startX = 60 + startColumn * (singleColumnWidth + gutterWidth);
    const width = columnSpan * singleColumnWidth + (columnSpan - 1) * gutterWidth;

    return { x: startX, width };
}

// ==========================================
// 多栏布局
// ==========================================

// 创建两栏布局
function createTwoColumnLayout(contentY, options = {}) {
    const {
        leftWidthRatio = 0.4,
        gutterWidth = 24,
        margin = MARGIN_CONFIGS.standard
    } = options;

    const contentWidth = PAGE_SIZES.A4.width - margin.left - margin.right;
    const leftWidth = contentWidth * leftWidthRatio;
    const rightWidth = contentWidth - leftWidth - gutterWidth;

    return {
        left: {
            x: margin.left,
            y: contentY,
            width: leftWidth
        },
        right: {
            x: margin.left + leftWidth + gutterWidth,
            y: contentY,
            width: rightWidth
        },
        gutter: gutterWidth,
        rightStartX: margin.left + leftWidth + gutterWidth
    };
}

// 创建三栏布局
function createThreeColumnLayout(contentY, options = {}) {
    const {
        gutterWidth = 16,
        margin = MARGIN_CONFIGS.standard
    } = options;

    const contentWidth = PAGE_SIZES.A4.width - margin.left - margin.right;
    const columnWidth = (contentWidth - 2 * gutterWidth) / 3;

    return {
        left: {
            x: margin.left,
            y: contentY,
            width: columnWidth
        },
        center: {
            x: margin.left + columnWidth + gutterWidth,
            y: contentY,
            width: columnWidth
        },
        right: {
            x: margin.left + 2 * columnWidth + 2 * gutterWidth,
            y: contentY,
            width: columnWidth
        },
        gutter: gutterWidth
    };
}

// 创建杂志式布局
function createMagazineLayout(contentY, options = {}) {
    const {
        mainWidthRatio = 0.65,
        gutterWidth = 20,
        margin = MARGIN_CONFIGS.standard
    } = options;

    const contentWidth = PAGE_SIZES.A4.width - margin.left - margin.right;
    const mainWidth = contentWidth * mainWidthRatio;
    const sidebarWidth = contentWidth - mainWidth - gutterWidth;

    return {
        main: {
            x: margin.left,
            y: contentY,
            width: mainWidth
        },
        sidebar: {
            x: margin.left + mainWidth + gutterWidth,
            y: contentY,
            width: sidebarWidth
        },
        gutter: gutterWidth
    };
}

// ==========================================
// 卡片布局系统
// ==========================================

// 网格卡片布局
function createCardGrid(contentY, cardCount, options = {}) {
    const {
        columns = 2,
        cardHeight = 120,
        cardWidth = null,
        gutterX = 16,
        gutterY = 16,
        margin = MARGIN_CONFIGS.standard
    } = options;

    const contentWidth = PAGE_SIZES.A4.width - margin.left - margin.right;
    const actualCardWidth = cardWidth || (contentWidth - (columns - 1) * gutterX) / columns;

    const positions = [];
    const rows = Math.ceil(cardCount / columns);

    for (let i = 0; i < cardCount; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);

        positions.push({
            x: margin.left + col * (actualCardWidth + gutterX),
            y: contentY + row * (cardHeight + gutterY),
            width: actualCardWidth,
            height: cardHeight
        });
    }

    return {
        positions,
        totalHeight: rows * (cardHeight + gutterY) - gutterY,
        cardWidth: actualCardWidth,
        cardHeight
    };
}

// 自适应卡片布局
function createAdaptiveCardLayout(contentY, cardCount, availableHeight, options = {}) {
    const {
        minCardHeight = 80,
        maxCardHeight = 150,
        minCardWidth = 150,
        columns = 2,
        gutterX = 16,
        gutterY = 16,
        margin = MARGIN_CONFIGS.standard
    } = options;

    const contentWidth = PAGE_SIZES.A4.width - margin.left - margin.right;
    const cardWidth = Math.max(minCardWidth, (contentWidth - (columns - 1) * gutterX) / columns);

    // 计算合适的卡片高度
    const rows = Math.ceil(cardCount / columns);
    const maxPossibleHeight = (availableHeight - (rows - 1) * gutterY) / rows;
    const cardHeight = Math.min(maxCardHeight, Math.max(minCardHeight, maxPossibleHeight));

    const positions = [];
    for (let i = 0; i < cardCount; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);

        positions.push({
            x: margin.left + col * (cardWidth + gutterX),
            y: contentY + row * (cardHeight + gutterY),
            width: cardWidth,
            height: cardHeight
        });
    }

    return {
        positions,
        cardWidth,
        cardHeight,
        fitsInPage: rows * (cardHeight + gutterY) <= availableHeight
    };
}

// ==========================================
// 内容区域计算
// ==========================================

// 计算可用内容高度
function calculateAvailableContentY(currentY, margin = MARGIN_CONFIGS.standard) {
    return PAGE_SIZES.A4.height - margin.bottom - currentY;
}

// 检查内容是否需要分页
function needsPageBreak(currentY, contentHeight, margin = MARGIN_CONFIGS.standard) {
    return currentY + contentHeight > PAGE_SIZES.A4.height - margin.bottom;
}

// 计算文本区域
function calculateTextArea(text, fontSize, maxWidth, lineHeight = 1.6) {
    // 估算文本高度
    const charWidth = fontSize * 0.5;
    const charsPerLine = Math.floor(maxWidth / charWidth);
    const lines = Math.ceil(text.length / charsPerLine);
    const height = lines * fontSize * lineHeight;

    return {
        lines,
        height,
        estimatedWidth: Math.min(text.length * charWidth, maxWidth)
    };
}

// ==========================================
// 布局辅助函数
// ==========================================

// 居中定位
function centerPosition(elementWidth, containerWidth, startX) {
    return startX + (containerWidth - elementWidth) / 2;
}

// 垂直居中定位
function centerVertical(elementHeight, containerHeight, startY) {
    return startY + (containerHeight - elementHeight) / 2;
}

// 黄金比例分割
function goldenRatioSplit(totalWidth, leftRatio = 0.618) {
    return {
        left: totalWidth * leftRatio,
        right: totalWidth * (1 - leftRatio)
    };
}

// 等间距分布
function distributeEvenly(count, totalWidth, elementWidth, startX = 0) {
    if (count <= 1) return [startX];

    const totalElementWidth = count * elementWidth;
    const spacing = (totalWidth - totalElementWidth) / (count - 1);

    const positions = [];
    for (let i = 0; i < count; i++) {
        positions.push(startX + i * (elementWidth + spacing));
    }

    return positions;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    PAGE_SIZES,
    MARGIN_CONFIGS,
    GRID_SYSTEM,
    calculateColumnWidth,
    getColumnPosition,
    createTwoColumnLayout,
    createThreeColumnLayout,
    createMagazineLayout,
    createCardGrid,
    createAdaptiveCardLayout,
    calculateAvailableContentY,
    needsPageBreak,
    calculateTextArea,
    centerPosition,
    centerVertical,
    goldenRatioSplit,
    distributeEvenly
};