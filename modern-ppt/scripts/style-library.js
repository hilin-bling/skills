/**
 * PPT 风格库 - 18种精选风格 (v3.0)
 *
 * 每种风格都经过精心设计，包含完整的配色方案
 * 适用于不同场景：学术报告、产品汇报、可爱童趣、商务简约等
 *
 * v3.0 - 新增 6 种潮流风格：
 * - Aurora 极光、Cyberpunk 赛博朋克、Pastel 柔和
 * - Gradient 渐变流、Glass 玻璃态、Monochrome 单色
 *
 * v2.0 - 现代布局参数：
 * - typography 字体层级 (7级)
 * - spacing 间距系统 (8px网格)
 * - layout 布局参数
 * - effects 视觉效果
 */

// ==========================================
// 现代设计基础参数 v3.0
// ==========================================
const MODERN_LAYOUT_BASE = {
    // 字体大小层级（现代设计趋势 - 7级体系）
    typography: {
        display: 96,       // 展示级 - 超大标题
        heroTitle: 72,     // 封面主标题 - 超大字体
        pageTitle: 48,     // 页面标题
        sectionTitle: 36,  // 章节标题
        subtitle: 24,      // 副标题
        body: 18,          // 正文
        bodyLarge: 22,     // 大正文
        caption: 14,       // 说明文字
        small: 12          // 小字
    },

    // 间距系统（基于8px网格）
    spacing: {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
        xl: 48,
        xxl: 64,
        xxxl: 96
    },

    // 非对称布局偏移
    asymmetry: {
        titleOffsetX: -5,       // 标题左侧偏移（百分比）
        contentOffsetX: 5,      // 内容右侧偏移（百分比）
        leftMargin: 0.08,       // 左边距比例
        accentShift: 0.618      // 黄金比例偏移
    },

    // 卡片样式
    card: {
        borderRadius: 12,
        shadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: 24,
        hoverShadow: '0 8px 30px rgba(0,0,0,0.12)'
    },

    // 视觉效果参数 (v3.0 新增)
    effects: {
        glassBlur: 20,          // 玻璃态模糊半径
        glassOpacity: 0.7,      // 玻璃态透明度
        shadowIntensity: 'medium', // 阴影强度
        gradientAngle: 135,     // 渐变角度
        animationDuration: 'normal' // 动画时长
    }
};

const STYLE_LIBRARY = {

    // ==========================================
    // 1. 深空紫 - 神秘优雅
    // 适合：产品发布、科技展示、创意提案
    // ==========================================
    deepSpace: {
        name: '深空紫',
        category: 'fashion',
        description: '神秘优雅，适合产品发布和科技展示',
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
        sidebar: '7C3AED',
        cardBg: 'FFFFFF',
        cardBorder: 'E5E7EB'
    },

    // ==========================================
    // 2. 学术蓝 - 专业严谨
    // 适合：学术报告、论文答辩、研究报告
    // ==========================================
    academic: {
        name: '学术蓝',
        category: 'academic',
        description: '专业严谨，适合学术报告和论文答辩',
        cover: {
            type: 'gradient',
            colors: ['1e3a5f', '2c5282', '3182ce'],
            direction: 'diagonal'
        },
        content: 'FFFFFF',
        primary: '2B6CB0',
        secondary: '3182CE',
        accent: 'DD6B20',
        text: '1A365D',
        textMuted: '4A5568',
        sidebar: '2B6CB0',
        cardBg: 'F7FAFC',
        cardBorder: 'CBD5E0'
    },

    // ==========================================
    // 3. 可爱童趣 - 活泼温暖
    // 适合：儿童教育、亲子活动、幼教课件
    // ==========================================
    playful: {
        name: '可爱童趣',
        category: 'cute',
        description: '活泼温暖，适合儿童教育和亲子活动',
        cover: {
            type: 'gradient',
            colors: ['fce7f3', 'fbcfe8', 'f9a8d4'],
            direction: 'diagonal'
        },
        content: 'FFFBEB',
        primary: 'EC4899',
        secondary: 'F472B6',
        accent: 'FBBF24',
        text: '831843',
        textMuted: '9D174D',
        sidebar: 'EC4899',
        cardBg: 'FFFFFF',
        cardBorder: 'FBCFE8',
        // 可爱风格特殊装饰
        decorations: ['⭐', '🌈', '🎀', '🎈', '🦋', '🌸']
    },

    // ==========================================
    // 4. 商务精英 - 专业干练
    // 适合：商务汇报、年终总结、季度报告
    // ==========================================
    corporate: {
        name: '商务精英',
        category: 'business',
        description: '专业干练，适合商务汇报和年终总结',
        cover: {
            type: 'gradient',
            colors: ['1a202c', '2d3748', '4a5568'],
            direction: 'diagonal'
        },
        content: 'FFFFFF',
        primary: '2D3748',
        secondary: '4A5568',
        accent: 'C53030',
        text: '1A202C',
        textMuted: '718096',
        sidebar: '2D3748',
        cardBg: 'F7FAFC',
        cardBorder: 'E2E8F0'
    },

    // ==========================================
    // 5. 科技未来 - 前沿创新
    // 适合：科技产品、AI展示、创新项目
    // ==========================================
    tech: {
        name: '科技未来',
        category: 'tech',
        description: '前沿创新，适合科技产品和AI展示',
        cover: {
            type: 'gradient',
            colors: ['0f0f0f', '1a1a2e', '16213e'],
            direction: 'diagonal'
        },
        content: '0D1117',
        primary: '58A6FF',
        secondary: '238636',
        accent: 'F78166',
        text: 'C9D1D9',
        textMuted: '8B949E',
        sidebar: '58A6FF',
        cardBg: '161B22',
        cardBorder: '30363D',
        isDark: true
    },

    // ==========================================
    // 6. 极简主义 - 简洁纯粹
    // 适合：设计展示、艺术汇报、品牌提案
    // ==========================================
    minimal: {
        name: '极简主义',
        category: 'minimal',
        description: '简洁纯粹，适合设计展示和艺术汇报',
        cover: {
            type: 'solid',
            color: 'FFFFFF'
        },
        content: 'FFFFFF',
        primary: '000000',
        secondary: '666666',
        accent: 'E53935',
        text: '000000',
        textMuted: '757575',
        sidebar: '000000',
        cardBg: 'FAFAFA',
        cardBorder: 'E0E0E0'
    },

    // ==========================================
    // 7. 自然绿意 - 清新自然
    // 适合：环保项目、农业报告、健康主题
    // ==========================================
    nature: {
        name: '自然绿意',
        category: 'nature',
        description: '清新自然，适合环保项目和健康主题',
        cover: {
            type: 'gradient',
            colors: ['1a472a', '2d5a3d', '3d6b4f'],
            direction: 'diagonal'
        },
        content: 'F0FDF4',
        primary: '166534',
        secondary: '22C55E',
        accent: '84CC16',
        text: '14532D',
        textMuted: '4ADE80',
        sidebar: '166534',
        cardBg: 'FFFFFF',
        cardBorder: 'BBF7D0'
    },

    // ==========================================
    // 8. 复古怀旧 - 温暖怀旧
    // 适合：历史回顾、周年纪念、传统文化
    // ==========================================
    vintage: {
        name: '复古怀旧',
        category: 'vintage',
        description: '温暖怀旧，适合历史回顾和传统文化',
        cover: {
            type: 'gradient',
            colors: ['5d4037', '6d4c41', '795548'],
            direction: 'diagonal'
        },
        content: 'FFF8E1',
        primary: '5D4037',
        secondary: '8D6E63',
        accent: 'FF8F00',
        text: '3E2723',
        textMuted: '6D4C41',
        sidebar: '5D4037',
        cardBg: 'FFFBF0',
        cardBorder: 'D7CCC8'
    },

    // ==========================================
    // 9. 活力橙黄 - 充满能量
    // 适合：运动健身、活力活动、年轻群体
    // ==========================================
    energetic: {
        name: '活力橙黄',
        category: 'energetic',
        description: '充满能量，适合运动健身和年轻群体',
        cover: {
            type: 'gradient',
            colors: ['ff6b35', 'ff8c42', 'ffa62b'],
            direction: 'diagonal'
        },
        content: 'FFFAF0',
        primary: 'EA580C',
        secondary: 'F97316',
        accent: 'FBBF24',
        text: '7C2D12',
        textMuted: 'C2410C',
        sidebar: 'EA580C',
        cardBg: 'FFFFFF',
        cardBorder: 'FED7AA'
    },

    // ==========================================
    // 10. 医疗健康 - 专业可信
    // 适合：医疗报告、健康科普、医院汇报
    // ==========================================
    medical: {
        name: '医疗健康',
        category: 'medical',
        description: '专业可信，适合医疗报告和健康科普',
        cover: {
            type: 'gradient',
            colors: ['0ea5e9', '38bdf8', '7dd3fc'],
            direction: 'diagonal'
        },
        content: 'F0F9FF',
        primary: '0369A1',
        secondary: '0284C7',
        accent: '10B981',
        text: '0C4A6E',
        textMuted: '0369A1',
        sidebar: '0369A1',
        cardBg: 'FFFFFF',
        cardBorder: 'BAE6FD'
    },

    // ==========================================
    // 11. 金融财经 - 稳重专业
    // 适合：财务报告、投资分析、银行业务
    // ==========================================
    finance: {
        name: '金融财经',
        category: 'finance',
        description: '稳重专业，适合财务报告和投资分析',
        cover: {
            type: 'gradient',
            colors: ['1e3a5f', '2c5282', '2b6cb0'],
            direction: 'diagonal'
        },
        content: 'FFFFFF',
        primary: '1A365D',
        secondary: '2B6CB0',
        accent: 'D69E2E',
        text: '1A202C',
        textMuted: '4A5568',
        sidebar: '1A365D',
        cardBg: 'EBF8FF',
        cardBorder: 'BEE3F8'
    },

    // ==========================================
    // 12. 中国风 - 传统典雅
    // 适合：传统文化、中式设计、国风主题
    // ==========================================
    chinese: {
        name: '中国风',
        category: 'cultural',
        description: '传统典雅，适合传统文化和国风主题',
        cover: {
            type: 'gradient',
            colors: ['8B0000', 'A52A2A', 'B22222'],
            direction: 'diagonal'
        },
        content: 'FFF8F0',
        primary: '8B0000',
        secondary: 'D4AF37',
        accent: '2F4F4F',
        text: '3C1E1E',
        textMuted: '6B4423',
        sidebar: '8B0000',
        cardBg: 'FFFAF5',
        cardBorder: 'DEB887',
        // 中国风特殊装饰
        decorations: ['🏮', '🎊', '🧧', '🎋', '🏯']
    }
};

// 风格分类
const STYLE_CATEGORIES = {
    fashion: { name: '时尚潮流', styles: ['deepSpace'] },
    academic: { name: '学术报告', styles: ['academic'] },
    cute: { name: '可爱童趣', styles: ['playful'] },
    business: { name: '商务汇报', styles: ['corporate', 'finance'] },
    tech: { name: '科技前沿', styles: ['tech'] },
    minimal: { name: '极简设计', styles: ['minimal'] },
    nature: { name: '自然清新', styles: ['nature'] },
    vintage: { name: '复古怀旧', styles: ['vintage'] },
    energetic: { name: '活力能量', styles: ['energetic'] },
    medical: { name: '医疗健康', styles: ['medical'] },
    cultural: { name: '文化艺术', styles: ['chinese'] }
};

// 根据内容类型推荐风格
function recommendStyle(contentType) {
    const recommendations = {
        'product': 'deepSpace',
        '产品汇报': 'deepSpace',
        'academic': 'academic',
        '学术报告': 'academic',
        '论文答辩': 'academic',
        'cute': 'playful',
        '可爱': 'playful',
        '童趣': 'playful',
        '儿童': 'playful',
        'business': 'corporate',
        '商务': 'corporate',
        '工作汇报': 'corporate',
        '年终总结': 'corporate',
        'tech': 'tech',
        '科技': 'tech',
        'AI': 'tech',
        '互联网': 'tech',
        'minimal': 'minimal',
        '极简': 'minimal',
        '设计': 'minimal',
        'nature': 'nature',
        '自然': 'nature',
        '环保': 'nature',
        '健康': 'nature',
        'vintage': 'vintage',
        '复古': 'vintage',
        '历史': 'vintage',
        'energetic': 'energetic',
        '活力': 'energetic',
        '运动': 'energetic',
        'medical': 'medical',
        '医疗': 'medical',
        '医院': 'medical',
        'finance': 'finance',
        '金融': 'finance',
        '财务': 'finance',
        '投资': 'finance',
        'chinese': 'chinese',
        '中国风': 'chinese',
        '传统': 'chinese',
        '国风': 'chinese'
    };

    return recommendations[contentType] || 'deepSpace';
}

// 获取所有风格名称
function getAllStyleNames() {
    return Object.keys(STYLE_LIBRARY);
}

// 获取风格信息
function getStyle(styleName) {
    return STYLE_LIBRARY[styleName] || STYLE_LIBRARY.deepSpace;
}

// 获取分类下的所有风格
function getStylesByCategory(category) {
    const cat = STYLE_CATEGORIES[category];
    if (!cat) return [];
    return cat.styles.map(s => ({ key: s, ...STYLE_LIBRARY[s] }));
}

module.exports = {
    STYLE_LIBRARY,
    STYLE_CATEGORIES,
    MODERN_LAYOUT_BASE,
    recommendStyle,
    getAllStyleNames,
    getStyle,
    getStylesByCategory
};