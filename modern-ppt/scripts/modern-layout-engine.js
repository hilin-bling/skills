/**
 * 现代布局引擎
 *
 * 应用现代设计原则：
 * - 非对称平衡 - 打破传统居中布局
 * - 大胆留白 - 增强视觉焦点
 * - 超大字体标题 - 72pt+
 * - 卡片式内容 - 带微妙阴影
 * - 渐变和玻璃态效果
 */

// ==========================================
// 设计原则配置
// ==========================================

const LAYOUT_PRINCIPLES = {
    // 字体大小层级（基于现代设计趋势）
    typography: {
        heroTitle: { size: 72, weight: 'bold', name: '封面主标题' },
        pageTitle: { size: 48, weight: 'bold', name: '页面标题' },
        sectionTitle: { size: 36, weight: 'semibold', name: '章节标题' },
        subtitle: { size: 24, weight: 'normal', name: '副标题' },
        body: { size: 18, weight: 'normal', name: '正文' },
        bodyLarge: { size: 22, weight: 'normal', name: '大正文' },
        caption: { size: 14, weight: 'normal', name: '说明文字' },
        small: { size: 12, weight: 'normal', name: '小字' }
    },

    // 间距系统（基于8px网格）
    spacing: {
        xs: 8,      // 极小间距
        sm: 16,     // 小间距
        md: 24,     // 中间距
        lg: 32,     // 大间距
        xl: 48,     // 超大间距
        xxl: 64,    // 巨大间距
        xxxl: 96    // 超巨大间距（用于封面留白）
    },

    // 卡片样式（现代设计）
    card: {
        borderRadius: 12,       // 圆角
        shadow: '0 4px 20px rgba(0,0,0,0.08)',  // 微妙阴影
        padding: 24,            // 内边距
        hoverShadow: '0 8px 30px rgba(0,0,0,0.12)', // 悬停阴影
        borderWidth: 0          // 无边框或细边框
    },

    // 非对称布局偏移（打破传统居中）
    asymmetry: {
        titleOffsetX: -5,       // 标题左侧偏移（百分比）
        contentOffsetX: 5,      // 内容右侧偏移（百分比）
        accentShift: 0.618,     // 黄金比例偏移
        leftMargin: 0.08,       // 左边距比例
        rightMargin: 0.92       // 右边距比例
    },

    // 现代设计元素
    modern: {
        useGlassEffect: true,           // 玻璃态效果
        useGradient: true,              // 渐变背景
        useMicroAnimations: true,       // 微动画
        useAccentLines: true,           // 强调线条
        accentLineWidth: 0.03,          // 强调线宽度（英寸）
        useGeometricDecorations: true   // 几何装饰
    }
};

// ==========================================
// 封面布局生成器
// ==========================================

/**
 * 生成非对称封面布局
 * 应用现代设计原则：左偏移标题、大胆留白
 * @param {Object} style - 风格配置
 * @returns {Object} 布局参数
 */
function generateAsymmetricCoverLayout(style) {
    // 基础布局参数（16:9比例，单位英寸）
    const baseLayout = {
        // 主标题 - 左偏移，超大字体
        title: {
            x: 0.08,            // 左侧偏移（非对称）
            y: 0.35,            // 垂直居中偏上
            w: 0.6,             // 宽度比例
            h: 0.2,             // 高度比例
            fontSize: 72,       // 英雄标题大小
            align: 'left',      // 左对齐
            bold: true,
            fontWeight: 'bold'
        },

        // 副标题 - 跟随主标题左侧
        subtitle: {
            x: 0.08,
            y: 0.55,
            w: 0.5,
            fontSize: 24,
            align: 'left',
            fontWeight: 'normal'
        },

        // 标语/描述 - 左下
        tagline: {
            x: 0.08,
            y: 0.65,
            w: 0.45,
            fontSize: 16,
            align: 'left',
            italic: true
        },

        // 强调线 - 标题下方
        accentLine: {
            x: 0.08,
            y: 0.52,
            w: 0.15,            // 短强调线
            h: 0.01,
            color: style?.accent || '7C3AED'
        },

        // 几何装饰 - 右侧
        decoration: {
            type: 'geometric',
            position: 'right-bottom',
            opacity: 0.1,
            shapes: [
                { type: 'circle', x: 0.85, y: 0.5, size: 0.2 },
                { type: 'circle', x: 0.90, y: 0.6, size: 0.15 }
            ]
        }
    };

    // 根据风格调整
    if (style?.category === 'minimal') {
        // 极简风格：居中，更大胆留白
        baseLayout.title.x = 0.25;
        baseLayout.title.y = 0.4;
        baseLayout.title.align = 'center';
        baseLayout.subtitle.x = 0.25;
        baseLayout.subtitle.align = 'center';
        baseLayout.decoration = null;  // 无装饰
    }

    if (style?.category === 'tech') {
        // 科技风格：更极端的非对称
        baseLayout.title.x = 0.05;
        baseLayout.title.fontSize = 80;
        baseLayout.decoration.shapes.push(
            { type: 'line', x: 0.95, y: 0.3, angle: 45 }
        );
    }

    return baseLayout;
}

/**
 * 生成居中封面布局（传统风格）
 * @param {Object} style - 风格配置
 * @returns {Object} 布局参数
 */
function generateCenteredCoverLayout(style) {
    return {
        title: {
            x: 0.5,             // 居中
            y: 0.35,
            w: 9,
            h: 1.3,
            fontSize: 52,
            align: 'center',
            bold: true
        },
        subtitle: {
            x: 0.5,
            y: 0.55,
            w: 9,
            fontSize: 22,
            align: 'center'
        },
        accentLine: {
            x: 3.5,
            y: 0.62,
            w: 3,
            h: 0.03,
            color: style?.accent || '7C3AED'
        },
        tagline: {
            x: 0.5,
            y: 0.75,
            w: 9,
            fontSize: 15,
            align: 'center',
            italic: true
        }
    };
}

// ==========================================
// 内容页布局生成器
// ==========================================

/**
 * 生成现代内容页布局
 * @param {Object} options - 配置选项
 * @returns {Object} 布局参数
 */
function generateContentLayout(options = {}) {
    const { showSidebar = true, sidebarWidth = 0.22 } = options;

    // 基础边距
    const leftMargin = showSidebar ? sidebarWidth + 0.23 : 0.5;
    const rightMargin = 0.5;

    return {
        // 页面标题 - 左上
        title: {
            x: leftMargin,
            y: 0.32,
            w: 9.5 - leftMargin - rightMargin,
            fontSize: LAYOUT_PRINCIPLES.typography.pageTitle.size,
            bold: true,
            align: 'left'
        },

        // 强调线 - 标题下方
        accentLine: {
            x: leftMargin,
            y: 0.85,
            w: 1.3,
            h: 0.04,
            color: options.style?.secondary || '7C3AED'
        },

        // 内容区域
        contentArea: {
            x: leftMargin,
            y: 1.0,
            w: 9.5 - leftMargin - rightMargin,
            h: 4.5,
            padding: LAYOUT_PRINCIPLES.spacing.md
        },

        // 侧边栏（如果启用）
        sidebar: showSidebar ? {
            x: 0,
            y: 0,
            w: sidebarWidth,
            h: 5.63,
            color: options.style?.sidebar || '7C3AED'
        } : null,

        // 页码位置
        pageNumber: showSidebar ? {
            x: 0,
            y: 0.3,
            w: sidebarWidth,
            fontSize: 12,
            align: 'center'
        } : {
            x: 9.5,
            y: 5.3,
            w: 0.5,
            fontSize: 12,
            align: 'right'
        }
    };
}

// ==========================================
// 卡片网格布局
// ==========================================

/**
 * 生成卡片网格布局（智能换行）
 * @param {Array} cards - 卡片数据数组
 * @param {number} containerWidth - 容器宽度（英寸）
 * @param {Object} options - 配置选项
 * @returns {Array} 卡片位置数组
 */
function generateCardGridLayout(cards, containerWidth, options = {}) {
    // 默认卡片尺寸
    const cardWidth = options.cardWidth || 280 / 96;   // 转换为英寸
    const cardHeight = options.cardHeight || 200 / 96;
    const gap = options.gap || LAYOUT_PRINCIPLES.spacing.md / 96;

    // 计算列数
    const cols = Math.floor(containerWidth / (cardWidth + gap));
    const rows = Math.ceil(cards.length / cols);

    // 生成布局
    return cards.map((card, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        // 现代布局：微妙的非对称
        const offsetX = row % 2 === 1 ? gap * 0.3 : 0;  // 奇数行微偏移

        return {
            x: col * (cardWidth + gap) + offsetX,
            y: row * (cardHeight + gap),
            w: cardWidth,
            h: cardHeight,
            animation: {
                delay: row * 200 + col * 100,  // 行优先级联动画
                row,
                col
            },
            // 卡片样式
            style: {
                borderRadius: LAYOUT_PRINCIPLES.card.borderRadius,
                shadow: LAYOUT_PRINCIPLES.card.shadow,
                padding: LAYOUT_PRINCIPLES.card.padding
            }
        };
    });
}

/**
 * 生成水平卡片布局（单行）
 * @param {number} count - 卡片数量
 * @param {Object} options - 配置选项
 * @returns {Array} 卡片位置数组
 */
function generateHorizontalCardLayout(count, options = {}) {
    const containerWidth = options.containerWidth || 9;
    const cardHeight = options.cardHeight || 1.55;
    const gap = options.gap || 0.12;
    const startY = options.startY || 2.1;

    // 均分宽度
    const cardWidth = (containerWidth - gap * (count - 1)) / count;

    return Array.from({ length: count }, (_, i) => ({
        x: 0.5 + i * (cardWidth + gap),
        y: startY,
        w: cardWidth,
        h: cardHeight,
        animation: {
            delay: i * 120,  // 从左到右级联
            index: i
        }
    }));
}

// ==========================================
// 时间线布局
// ==========================================

/**
 * 生成水平时间线布局
 * @param {Array} items - 时间线项目
 * @param {Object} options - 配置选项
 * @returns {Object} 时间线布局
 */
function generateTimelineLayout(items, options = {}) {
    const containerWidth = options.containerWidth || 9;
    const itemWidth = options.itemWidth || 2.9;
    const gap = options.gap || 0.1;
    const startY = options.startY || 1.25;

    // 计算位置
    const positions = items.map((item, i) => ({
        x: 0.5 + i * (itemWidth + gap),
        y: startY,
        w: itemWidth,
        h: 3.5,
        animation: {
            delay: i * 300  // 时间线顺序动画
        }
    }));

    // 连接线
    const connectorLine = {
        x: 0.5 + itemWidth / 2,
        y: startY + 0.4,
        w: (items.length - 1) * (itemWidth + gap),
        h: 0.02,
        color: options.style?.primary || '7C3AED'
    };

    return {
        items: positions,
        connectorLine,
        totalWidth: items.length * (itemWidth + gap)
    };
}

/**
 * 生成垂直时间线布局
 * @param {Array} items - 时间线项目
 * @param {Object} options - 配置选项
 * @returns {Object} 时间线布局
 */
function generateVerticalTimelineLayout(items, options = {}) {
    const itemHeight = options.itemHeight || 1.2;
    const gap = options.gap || 0.15;
    const startX = options.startX || 0.5;

    // 计算位置
    const positions = items.map((item, i) => ({
        x: startX,
        y: 1.0 + i * (itemHeight + gap),
        w: 9,
        h: itemHeight,
        animation: {
            delay: i * 250
        }
    }));

    // 垂直连接线
    const connectorLine = {
        x: 0.3,
        y: 1.0,
        w: 0.02,
        h: (items.length - 1) * (itemHeight + gap) + itemHeight,
        color: options.style?.primary || '7C3AED'
    };

    return {
        items: positions,
        connectorLine,
        totalHeight: items.length * (itemHeight + gap)
    };
}

// ==========================================
// 数据统计布局
// ==========================================

/**
 * 生成数据统计卡片布局
 * @param {Array} stats - 统计数据数组
 * @param {Object} options - 配置选项
 * @returns {Array} 统计卡片位置
 */
function generateStatsLayout(stats, options = {}) {
    const containerWidth = options.containerWidth || 9;
    const cardWidth = options.cardWidth || 2.1;
    const cardHeight = options.cardHeight || 1.8;
    const gap = options.gap || 0.15;
    const startY = options.startY || 1.25;

    // 均分布局
    const totalWidth = stats.length * cardWidth + (stats.length - 1) * gap;
    const startX = (containerWidth - totalWidth) / 2;

    return stats.map((stat, i) => ({
        x: startX + i * (cardWidth + gap),
        y: startY,
        w: cardWidth,
        h: cardHeight,
        animation: {
            delay: i * 100,
            countUp: true  // 数字增长动画
        },
        // 突出显示
        highlight: stat.highlight
    }));
}

// ==========================================
// 特殊页面布局
// ==========================================

/**
 * 生成引用/名言布局
 * @param {Object} quote - 引用内容
 * @param {Object} options - 配置选项
 * @returns {Object} 引用布局
 */
function generateQuoteLayout(quote, options = {}) {
    return {
        // 引用文本 - 大字体居中
        quoteText: {
            x: 0.5,
            y: 1.8,
            w: 9,
            h: 1.5,
            fontSize: 28,
            italic: true,
            align: 'center'
        },

        // 引用来源
        source: {
            x: 0.5,
            y: 3.5,
            w: 9,
            fontSize: 16,
            align: 'center',
            color: options.style?.textMuted || '6B7280'
        },

        // 引用装饰
        decoration: {
            leftQuote: { x: 0.3, y: 1.5, fontSize: 48, opacity: 0.3 },
            rightQuote: { x: 9.2, y: 3.0, fontSize: 48, opacity: 0.3 }
        }
    };
}

/**
 * 生成结束页布局
 * @param {Object} options - 配置选项
 * @returns {Object} 结束页布局
 */
function generateEndLayout(options = {}) {
    const style = options.style;

    return {
        // 主文字 - 大字体居中
        mainText: {
            x: 0,
            y: 2.0,
            w: 10,
            h: 0.7,
            fontSize: 42,
            bold: true,
            align: 'center'
        },

        // 标语
        tagline: {
            x: 0,
            y: 2.8,
            w: 10,
            fontSize: 15,
            italic: true,
            align: 'center'
        },

        // 联系信息
        contact: {
            x: 0,
            y: 3.4,
            w: 10,
            fontSize: 12,
            align: 'center'
        },

        // 装饰
        decorations: [
            { type: 'circle', x: -0.8, y: -0.8, size: 2, opacity: 0.15 },
            { type: 'circle', x: 8.5, y: 4, size: 2.5, opacity: 0.2 }
        ]
    };
}

// ==========================================
// 布局适配器
// ==========================================

/**
 * 根据风格选择封面布局
 * @param {Object} style - 风格配置
 * @returns {Object} 布局参数
 */
function selectCoverLayout(style) {
    // 极简风格使用居中布局
    if (style?.category === 'minimal') {
        return generateCenteredCoverLayout(style);
    }

    // 其他风格使用非对称布局
    return generateAsymmetricCoverLayout(style);
}

/**
 * 计算自适应字体大小
 * @param {string} text - 文本内容
 * @param {number} containerWidth - 容器宽度
 * @param {number} baseSize - 基础字号
 * @returns {number} 调整后的字号
 */
function calculateAdaptiveFontSize(text, containerWidth, baseSize) {
    // 估算文本宽度（简化计算）
    const estimatedWidth = text.length * baseSize * 0.5;

    // 如果文本超出容器，缩小字号
    if (estimatedWidth > containerWidth * 96) {  // 转换为像素
        const scale = (containerWidth * 96) / estimatedWidth;
        return Math.max(baseSize * scale, 24);  // 最小24pt
    }

    return baseSize;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    // 设计原则
    LAYOUT_PRINCIPLES,

    // 封面布局
    generateAsymmetricCoverLayout,
    generateCenteredCoverLayout,
    selectCoverLayout,

    // 内容页布局
    generateContentLayout,

    // 卡片布局
    generateCardGridLayout,
    generateHorizontalCardLayout,

    // 时间线布局
    generateTimelineLayout,
    generateVerticalTimelineLayout,

    // 数据统计布局
    generateStatsLayout,

    // 特殊布局
    generateQuoteLayout,
    generateEndLayout,

    // 工具函数
    calculateAdaptiveFontSize
};