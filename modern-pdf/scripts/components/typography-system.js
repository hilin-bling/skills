/**
 * Typography System - 字体排版系统
 *
 * 7 级字号体系
 * 字体配对系统
 * 中英文混排优化
 */

const TYPOGRAPHY_LEVELS = {
    display: {
        size: 48,
        weight: 'bold',
        usage: '展示级标题、封面主标题',
        lineHeight: 1.1
    },
    heroTitle: {
        size: 36,
        weight: 'bold',
        usage: '封面主标题、重要章节标题',
        lineHeight: 1.2
    },
    pageTitle: {
        size: 28,
        weight: 'bold',
        usage: '页面标题',
        lineHeight: 1.3
    },
    sectionTitle: {
        size: 22,
        weight: 'bold',
        usage: '章节标题、小节标题',
        lineHeight: 1.4
    },
    heading: {
        size: 18,
        weight: 'bold',
        usage: '小标题、卡片标题',
        lineHeight: 1.5
    },
    body: {
        size: 12,
        weight: 'normal',
        usage: '正文内容',
        lineHeight: 1.6
    },
    bodyLarge: {
        size: 14,
        weight: 'normal',
        usage: '强调正文、摘要文字',
        lineHeight: 1.6
    },
    caption: {
        size: 10,
        weight: 'normal',
        usage: '说明文字、注释、图表标注',
        lineHeight: 1.5
    },
    small: {
        size: 8,
        weight: 'normal',
        usage: '小字、版权信息、来源标注',
        lineHeight: 1.4
    }
};

// 字体配对
const FONT_PAIRINGS = {
    // 经典专业风格
    classic: {
        name: 'Classic Professional',
        fonts: {
            display: 'Helvetica-Bold',
            heading: 'Helvetica-Bold',
            body: 'Helvetica',
            caption: 'Helvetica'
        },
        description: '经典无衬线，适合商务文档'
    },

    // 现代编辑风格
    editorial: {
        name: 'Modern Editorial',
        fonts: {
            display: 'Helvetica-Bold',
            heading: 'Helvetica-Bold',
            body: 'Helvetica',
            caption: 'Helvetica-Oblique'
        },
        description: '现代编辑风格，适合杂志报告'
    },

    // 极简纯净风格
    minimal: {
        name: 'Minimal Clean',
        fonts: {
            display: 'Helvetica-Bold',
            heading: 'Helvetica-Bold',
            body: 'Helvetica-Light',
            caption: 'Helvetica-Light'
        },
        description: '极简风格，适合设计作品集'
    },

    // 艺术衬线风格
    artistic: {
        name: 'Artistic Serif',
        fonts: {
            display: 'Times-Bold',
            heading: 'Times-Bold',
            body: 'Times-Roman',
            caption: 'Times-Italic'
        },
        description: '艺术衬线，适合文化主题'
    },

    // 技术等宽风格
    technical: {
        name: 'Technical Mono',
        fonts: {
            display: 'Courier-Bold',
            heading: 'Courier-Bold',
            body: 'Courier',
            caption: 'Courier'
        },
        description: '等宽字体，适合技术文档'
    },

    // 混合风格（中英文）
    mixed: {
        name: 'Chinese English Mixed',
        fonts: {
            display: 'Helvetica-Bold',
            heading: 'Helvetica-Bold',
            body: 'Helvetica',
            caption: 'Helvetica'
        },
        chineseFont: 'SimSun',
        description: '中英混排优化'
    }
};

// 根据风格推荐字体配对
function getFontPairingForStyle(styleName) {
    const styleFontMap = {
        'academic': 'classic',
        'corporate': 'classic',
        'finance': 'classic',
        'business': 'classic',
        'minimal': 'minimal',
        'monochrome': 'minimal',
        'creative': 'editorial',
        'aurora': 'editorial',
        'gradient': 'editorial',
        'vintage': 'artistic',
        'chinese': 'artistic',
        'tech': 'technical',
        'cyberpunk': 'technical',
        'nature': 'classic',
        'medical': 'classic',
        'energetic': 'editorial',
        'pastel': 'editorial',
        'glass': 'minimal'
    };

    return styleFontMap[styleName] || 'classic';
}

// 计算文本宽度（估算）
function estimateTextWidth(text, fontSize, fontName = 'Helvetica') {
    // 简化估算：平均字符宽度
    const charWidthRatio = {
        'Helvetica': 0.5,
        'Helvetica-Bold': 0.55,
        'Times-Roman': 0.45,
        'Times-Bold': 0.5,
        'Courier': 0.6,
        'Courier-Bold': 0.65
    };

    const ratio = charWidthRatio[fontName] || 0.5;
    return text.length * fontSize * ratio;
}

// 计算文本高度
function estimateTextHeight(text, fontSize, maxWidth, lineHeight = 1.6) {
    const charWidth = fontSize * 0.5;
    const charsPerLine = Math.floor(maxWidth / charWidth);
    const lines = Math.ceil(text.length / charsPerLine);
    return lines * fontSize * lineHeight;
}

module.exports = {
    TYPOGRAPHY_LEVELS,
    FONT_PAIRINGS,
    getFontPairingForStyle,
    estimateTextWidth,
    estimateTextHeight
};