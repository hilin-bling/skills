/**
 * Word 风格库 - 18种精选风格 (v8.0)
 *
 * 达到 Dribbble 顶级设计水准的 Word 文档风格库
 * 包含完整的配色方案、装饰元素、排版参数
 *
 * v8.0 新增：
 * - 装饰线条系统（底部装饰线、左侧色块、分隔线样式）
 * - 渐变背景模拟配置（用于封面页）
 * - 卡片组件增强参数
 * - 数据统计大数字突出配置
 */

// ==========================================
// 现代设计基础参数 v8.0 - Dribbble 设计水准
// ==========================================
const MODERN_LAYOUT_BASE = {
    // 字体大小层级（现代设计趋势 - 9级体系）
    typography: {
        heroTitle: 48,        // 封面主标题（超大）
        display: 42,          // 展示级标题
        pageTitle: 36,        // 页面标题
        sectionTitle: 28,     // 章节标题
        heading: 22,          // 段落标题
        subheading: 18,       // 子标题
        body: 12,             // 正文（标准12pt）
        bodyLarge: 14,        // 大正文
        caption: 10,          // 说明文字
        small: 9              // 小字
    },

    // 行距系统（中文优化）
    lineSpacing: {
        tight: 1.0,           // 紧密（适用于标题）
        normal: 1.15,         // 标准（默认）
        relaxed: 1.5,         // 舒适（中文正文推荐）
        spacious: 2.0         // 宽松（适用于引用）
    },

    // 段落间距系统（基于12pt网格，Dribbble 标准）
    paragraphSpacing: {
        before: {
            tight: 6,         // 紧密间距
            normal: 12,       // 标准间距
            relaxed: 24,      // 舒适间距
            spacious: 36      // 宽松间距
        },
        after: {
            tight: 6,
            normal: 12,
            relaxed: 24,
            spacious: 36
        }
    },

    // 页面布局参数
    page: {
        margins: {
            narrow: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5 },
            normal: { top: 1, bottom: 1, left: 1.25, right: 1.25 },  // 中文优化
            wide: { top: 1.5, bottom: 1.5, left: 1.5, right: 1.5 },
            mirrored: { top: 1, bottom: 1, left: 1.5, right: 1 }     // 书籍排版
        },
        size: {
            a4: { width: 8.27, height: 11.69 },
            letter: { width: 8.5, height: 11 },
            a5: { width: 5.83, height: 8.27 }
        }
    },

    // 装饰线条系统（Dribbble 设计标准）
    decoration: {
        // 底部装饰线
        underline: {
            width: 1.5,            // 线宽（pt）
            color: 'primary',      // 默认使用主色调
            lengthRatio: 0.3,      // 相对于标题长度的比例
            offset: 6              // 与标题的间距（pt）
        },
        // 左侧色块
        leftBlock: {
            width: 4,              // 色块宽度（pt）
            height: 18,            // 色块高度（pt）
            color: 'primary',
            offset: 8              // 与文字的间距（pt）
        },
        // 分隔线
        divider: {
            width: 0.5,
            color: 'cardBorder',
            marginAbove: 12,
            marginBelow: 12
        },
        // 粗分隔线
        thickDivider: {
            width: 2,
            color: 'primary',
            marginAbove: 18,
            marginBelow: 18
        },
        // 渐变分隔线（使用多段线条模拟）
        gradientDivider: {
            segments: 5,
            colors: ['primary', 'secondary'],
            width: 1.5
        }
    },

    // 表格样式参数（Dribbble 设计标准）
    table: {
        headerBg: 'primary',
        headerTextColor: 'FFFFFF',
        headerFontSize: 12,
        headerFontBold: true,
        cellBg: 'content',
        cellBorderColor: 'cardBorder',
        cellBorderWidth: 0.5,
        alternateRowBg: true,
        alternateRowColor: 'cardBg',
        rowSpacing: 8,
        cellPadding: 6
    },

    // 卡片组件参数
    card: {
        borderRadius: 0,           // Word 不支持圆角
        shadow: false,             // Word 不支持阴影
        padding: 12,               // 内边距（pt）
        borderColor: 'cardBorder',
        borderWidth: 1,
        bgColor: 'cardBg',
        titleSize: 14,
        titleColor: 'primary',
        titleBold: true,
        descSize: 11,
        descColor: 'textMuted'
    },

    // 数据统计组件参数
    stats: {
        valueSize: 24,             // 大数字字号（突出显示）
        valueColor: 'primary',
        valueBold: true,
        labelSize: 10,             // 标签字号（较小）
        labelColor: 'textMuted',
        highlightBg: 'accent',     // 高亮背景色
        highlightTextColor: 'FFFFFF'
    },

    // 封面页装饰参数
    cover: {
        titleOffsetY: 1.5,         // 标题距顶部偏移（英寸）
        subtitleOffsetY: 0.3,      // 副标题偏移
        authorOffsetY: 1.0,        // 作者信息偏移
        decorLineLength: 2.0,      // 装饰线长度（英寸）
        decorLineWidth: 2,         // 装饰线宽度（pt）
        decorLineOffset: 0.2,      // 装饰线偏移（英寸）
        geometricElements: true    // 是否添加几何装饰元素
    },

    // 视觉效果参数
    effects: {
        shadowIntensity: 'medium',
        borderRadius: 0,
        accentLineWidth: 1.5
    }
};

// ==========================================
// 字体配对系统（中文优化）
// ==========================================
const FONT_PAIRINGS = {
    classic: {
        name: 'Classic Professional',
        primary: 'Times New Roman',
        secondary: 'Arial',
        fallback: 'SimSun',
        chinese: 'SimSun',
        chineseTitle: 'SimHei'      // 中文标题使用黑体
    },
    modern: {
        name: 'Modern Editorial',
        primary: 'Calibri',
        secondary: 'Cambria',
        fallback: 'Microsoft YaHei',
        chinese: 'Microsoft YaHei',
        chineseTitle: 'Microsoft YaHei'
    },
    minimal: {
        name: 'Minimal Clean',
        primary: 'Arial',
        secondary: 'Helvetica',
        fallback: 'Microsoft YaHei',
        chinese: 'Microsoft YaHei',
        chineseTitle: 'Microsoft YaHei'
    },
    chinese: {
        name: 'Chinese English Mixed',
        primary: 'Microsoft YaHei',
        secondary: 'Arial',
        fallback: 'SimHei',
        chinese: 'Microsoft YaHei',
        chineseTitle: 'Microsoft YaHei'
    },
    tech: {
        name: 'Tech Sans',
        primary: 'Segoe UI',
        secondary: 'Consolas',
        fallback: 'Microsoft YaHei',
        chinese: 'Microsoft YaHei',
        chineseTitle: 'Microsoft YaHei'
    },
    elegant: {
        name: 'Elegant Serif',
        primary: 'Georgia',
        secondary: 'Garamond',
        fallback: 'SimSun',
        chinese: 'SimSun',
        chineseTitle: 'SimHei'
    },
    corporate: {
        name: 'Corporate Standard',
        primary: 'Arial',
        secondary: 'Times New Roman',
        fallback: 'SimHei',
        chinese: 'SimHei',
        chineseTitle: 'SimHei'
    }
};

// ==========================================
// 18种风格定义 - Dribbble 顶级设计水准
// ==========================================
const STYLE_LIBRARY = {

    // ==========================================
    // 1. Aurora 极光 - 北欧极光灵感
    // ==========================================
    aurora: {
        name: '极光 Aurora',
        nameEn: 'Aurora',
        category: 'creative',
        description: '北欧极光灵感，梦幻渐变色彩，适合创意展示',
        colors: {
            primary: '00FF87',
            secondary: '60EFFF',
            accent: 'FF6B6B',
            text: 'FFFFFF',
            textMuted: '8B949E',
            background: '0D1117',
            content: '161B22',
            cardBg: '21262D',
            cardBorder: '30363D',
            highlight: '00FF87',
            decorLine: '00FF87',
            headerBg: '21262D'
        },
        gradient: {
            type: 'aurora',
            colors: ['0f0c29', '302b63', '24243e'],
            overlay: ['00ff87', '60efff', '00ff87'],
            opacity: 0.3
        },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: true, size: 48, color: '00FF87' },
            titleStyle: { bold: true, size: 36, color: '00FF87' },
            headingStyle: { bold: true, size: 22, color: 'FFFFFF' },
            bodyStyle: { size: 12, color: 'FFFFFF' },
            captionStyle: { size: 10, color: '8B949E' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '00FF87', lengthRatio: 0.4 },
            h2LeftBlock: { width: 5, color: '00FF87' },
            divider: { type: 'gradient', colors: ['00FF87', '60EFFF'] }
        },
        effects: { isDark: true, glassmorphism: false, gradientType: 'aurora' },
        table: {
            headerBg: '00FF87', headerTextColor: 'FFFFFF',
            cellBg: '21262D', cellBorderColor: '30363D',
            alternateRowBg: true, alternateRowColor: '1C2128'
        },
        useCases: ['创意展示', '设计提案', '艺术汇报', '品牌展示']
    },

    // ==========================================
    // 2. Cyberpunk 赛博朋克 - 霓虹科技
    // ==========================================
    cyberpunk: {
        name: '赛博朋克 Cyberpunk',
        nameEn: 'Cyberpunk',
        category: 'tech',
        description: '霓虹灯效果，赛博朋克风格，适合游戏和科技活动',
        colors: {
            primary: 'FF00FF',
            secondary: '00FFFF',
            accent: 'FFFF00',
            text: 'FFFFFF',
            textMuted: '888888',
            background: '0D0D0D',
            content: '111111',
            cardBg: '1A1A1A',
            cardBorder: 'FF00FF',
            highlight: 'FF00FF',
            decorLine: 'FF00FF',
            headerBg: '1A1A1A'
        },
        gradient: { type: 'neon', colors: ['0a0a0a', '1a1a2e', '16213e'], neonAccent: true },
        typography: {
            fontPairing: 'tech',
            heroTitleStyle: { bold: true, size: 48, color: 'FF00FF' },
            titleStyle: { bold: true, size: 36, color: 'FF00FF' },
            headingStyle: { bold: true, size: 22, color: '00FFFF' },
            bodyStyle: { size: 12, color: 'FFFFFF' },
            captionStyle: { size: 10, color: '888888' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 3, color: 'FF00FF', lengthRatio: 0.5 },
            h2LeftBlock: { width: 6, color: '00FFFF' },
            divider: { type: 'neon', colors: ['FF00FF', '00FFFF', 'FFFF00'] }
        },
        effects: { isDark: true, neonGlow: true, glitchEffect: true },
        table: {
            headerBg: 'FF00FF', headerTextColor: 'FFFFFF',
            cellBg: '1A1A1A', cellBorderColor: 'FF00FF',
            alternateRowBg: true, alternateRowColor: '151515'
        },
        useCases: ['游戏发布', '科技活动', '未来主题', '电竞活动'],
        decorations: ['⚡', '🎮', '🌐', '💾', '🔮']
    },

    // ==========================================
    // 3. Glassmorphism 玻璃态 - 现代玻璃拟态
    // ==========================================
    glassmorphism: {
        name: '玻璃态 Glassmorphism',
        nameEn: 'Glassmorphism',
        category: 'modern',
        description: '现代玻璃拟态设计，通透质感，适合科技品牌',
        colors: {
            primary: '4A5568',
            secondary: '718096',
            accent: '3182CE',
            text: '2D3748',
            textMuted: '718096',
            background: 'E8ECEF',
            content: 'FFFFFF',
            cardBg: 'F7FAFC',
            cardBorder: 'E2E8F0',
            highlight: '3182CE',
            decorLine: '4A5568',
            headerBg: 'F7FAFC'
        },
        gradient: { type: 'soft', colors: ['e0e5ec', 'd1d9e6', 'c8d1db'], glassmorphism: true },
        typography: {
            fontPairing: 'minimal',
            heroTitleStyle: { bold: true, size: 48, color: '2D3748' },
            titleStyle: { bold: true, size: 36, color: '2D3748' },
            headingStyle: { bold: true, size: 22, color: '4A5568' },
            bodyStyle: { size: 12, color: '2D3748' },
            captionStyle: { size: 10, color: '718096' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: '4A5568', lengthRatio: 0.25 },
            h2LeftBlock: { width: 4, color: '718096' },
            divider: { type: 'soft', colors: ['E2E8F0'] }
        },
        effects: { isDark: false, backdropBlur: true, softShadow: true },
        table: {
            headerBg: '4A5568', headerTextColor: 'FFFFFF',
            cellBg: 'F7FAFC', cellBorderColor: 'E2E8F0',
            alternateRowBg: true, alternateRowColor: 'EDF2F7'
        },
        useCases: ['科技公司', '应用介绍', '现代品牌', 'SaaS产品']
    },

    // ==========================================
    // 4. Monochrome 单色大师 - 纯粹单色
    // ==========================================
    monochrome: {
        name: '单色大师 Monochrome',
        nameEn: 'Monochrome',
        category: 'artistic',
        description: '纯粹单色设计，极简高雅，适合艺术和高端品牌',
        colors: {
            primary: '0A0A0A',
            secondary: '4A4A4A',
            accent: '0A0A0A',
            text: '0A0A0A',
            textMuted: '6A6A6A',
            background: 'FAFAFA',
            content: 'FFFFFF',
            cardBg: 'F5F5F5',
            cardBorder: 'E5E5E5',
            highlight: '0A0A0A',
            decorLine: '0A0A0A',
            headerBg: 'FFFFFF'
        },
        gradient: { type: 'solid', color: '0A0A0A' },
        typography: {
            fontPairing: 'elegant',
            heroTitleStyle: { bold: true, size: 48, color: '0A0A0A' },
            titleStyle: { bold: true, size: 36, color: '0A0A0A' },
            headingStyle: { bold: true, size: 22, color: '0A0A0A' },
            bodyStyle: { size: 12, color: '0A0A0A' },
            captionStyle: { size: 10, color: '6A6A6A' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1, color: '0A0A0A', lengthRatio: 0.2 },
            h2LeftBlock: { width: 3, color: '0A0A0A' },
            divider: { type: 'thin', colors: ['E5E5E5'] }
        },
        effects: { isDark: false, highContrast: true, subtleTexture: 'noise' },
        table: {
            headerBg: '0A0A0A', headerTextColor: 'FFFFFF',
            cellBg: 'F5F5F5', cellBorderColor: 'E5E5E5',
            alternateRowBg: true, alternateRowColor: 'EEEEEE'
        },
        useCases: ['艺术展示', '摄影作品', '高端品牌', '时尚杂志']
    },

    // ==========================================
    // 5. Gradient Flow 渐变流 - 动态渐变
    // ==========================================
    gradient: {
        name: '渐变流 Gradient Flow',
        nameEn: 'Gradient Flow',
        category: 'creative',
        description: '动态渐变背景，现代流动感，适合品牌展示',
        colors: {
            primary: '667EEA',
            secondary: '764BA2',
            accent: 'F5576C',
            text: '2D3748',
            textMuted: '718096',
            background: 'FFFFFF',
            content: 'F7FAFC',
            cardBg: 'FFFFFF',
            cardBorder: 'E2E8F0',
            highlight: '667EEA',
            decorLine: '667EEA',
            headerBg: '667EEA'
        },
        gradient: { type: 'mesh', colors: ['667eea', '764ba2', 'f093fb', 'f5576c'], direction: 'flow' },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: true, size: 48, color: '667EEA' },
            titleStyle: { bold: true, size: 36, color: '667EEA' },
            headingStyle: { bold: true, size: 22, color: '764BA2' },
            bodyStyle: { size: 12, color: '2D3748' },
            captionStyle: { size: 10, color: '718096' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '667EEA', lengthRatio: 0.35 },
            h2LeftBlock: { width: 5, color: '764BA2' },
            divider: { type: 'gradient', colors: ['667EEA', '764BA2', 'F5576C'] }
        },
        effects: { isDark: false, meshGradient: true, blurEffect: 20 },
        table: {
            headerBg: '667EEA', headerTextColor: 'FFFFFF',
            cellBg: 'F7FAFC', cellBorderColor: 'E2E8F0',
            alternateRowBg: true, alternateRowColor: 'EDF2F7'
        },
        useCases: ['品牌展示', '产品发布', '创意提案', '营销材料']
    },

    // ==========================================
    // 6. Pastel 柔和梦境 - 柔和马卡龙色
    // ==========================================
    pastel: {
        name: '柔和梦境 Pastel',
        nameEn: 'Pastel',
        category: 'lifestyle',
        description: '柔和马卡龙色调，温馨浪漫，适合女性品牌和生活方式',
        colors: {
            primary: 'FF8FAB',
            secondary: 'FFB8D0',
            accent: 'B8E6FF',
            text: '5D4157',
            textMuted: '8B7B8B',
            background: 'FFFBFE',
            content: 'FFFFFF',
            cardBg: 'FFF5F8',
            cardBorder: 'FFD6E7',
            highlight: 'FF8FAB',
            decorLine: 'FF8FAB',
            headerBg: 'FF8FAB'
        },
        gradient: { type: 'soft', colors: ['ffeef8', 'ffe4f3', 'ffd6e7'] },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: false, size: 48, color: '5D4157' },
            titleStyle: { bold: true, size: 36, color: '5D4157' },
            headingStyle: { bold: false, size: 22, color: 'FF8FAB' },
            bodyStyle: { size: 12, color: '5D4157' },
            captionStyle: { size: 10, color: '8B7B8B' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: 'FFB8D0', lengthRatio: 0.3 },
            h2LeftBlock: { width: 4, color: 'FF8FAB' },
            divider: { type: 'soft', colors: ['FFD6E7'] }
        },
        effects: { isDark: false, softShadow: true, roundedCorners: true },
        table: {
            headerBg: 'FF8FAB', headerTextColor: 'FFFFFF',
            cellBg: 'FFF5F8', cellBorderColor: 'FFD6E7',
            alternateRowBg: true, alternateRowColor: 'FFEEF5'
        },
        useCases: ['女性品牌', '婚礼策划', '生活方式', '美容护肤'],
        decorations: ['🌸', '✨', '💫', '🦢', '🌷']
    },

    // ==========================================
    // 7. Academic 学术蓝 - 专业严谨
    // ==========================================
    academic: {
        name: '学术蓝 Academic',
        nameEn: 'Academic',
        category: 'academic',
        description: '专业严谨，适合学术报告和论文答辩',
        colors: {
            primary: '2B6CB0',
            secondary: '3182CE',
            accent: 'DD6B20',
            text: '1A365D',
            textMuted: '4A5568',
            background: 'FFFFFF',
            content: 'F7FAFC',
            cardBg: 'FFFFFF',
            cardBorder: 'CBD5E0',
            highlight: '2B6CB0',
            decorLine: '2B6CB0',
            headerBg: '2B6CB0'
        },
        gradient: { type: 'gradient', colors: ['1e3a5f', '2c5282', '3182ce'], direction: 'diagonal' },
        typography: {
            fontPairing: 'classic',
            heroTitleStyle: { bold: true, size: 48, color: '1A365D' },
            titleStyle: { bold: true, size: 36, color: '1A365D' },
            headingStyle: { bold: true, size: 22, color: '2B6CB0' },
            bodyStyle: { size: 12, color: '1A365D' },
            captionStyle: { size: 10, color: '4A5568' }
        },
        page: { margins: 'mirrored', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: '2B6CB0', lengthRatio: 0.25 },
            h2LeftBlock: { width: 4, color: '2B6CB0' },
            divider: { type: 'solid', colors: ['CBD5E0'] }
        },
        effects: { isDark: false, formalStyle: true },
        table: {
            headerBg: '2B6CB0', headerTextColor: 'FFFFFF',
            cellBg: 'F7FAFC', cellBorderColor: 'CBD5E0',
            alternateRowBg: true, alternateRowColor: 'EDF2F7'
        },
        useCases: ['学术报告', '论文答辩', '研究报告', '学术期刊']
    },

    // ==========================================
    // 8. Corporate 商务精英 - 专业干练
    // ==========================================
    corporate: {
        name: '商务精英 Business Elite',
        nameEn: 'Business Elite',
        category: 'business',
        description: '专业干练，适合商务汇报和年终总结',
        colors: {
            primary: '2D3748',
            secondary: '4A5568',
            accent: 'C53030',
            text: '1A202C',
            textMuted: '718096',
            background: 'FFFFFF',
            content: 'F7FAFC',
            cardBg: 'FFFFFF',
            cardBorder: 'E2E8F0',
            highlight: 'C53030',
            decorLine: '2D3748',
            headerBg: '2D3748'
        },
        gradient: { type: 'gradient', colors: ['1a202c', '2d3748', '4a5568'] },
        typography: {
            fontPairing: 'corporate',
            heroTitleStyle: { bold: true, size: 48, color: '1A202C' },
            titleStyle: { bold: true, size: 36, color: '1A202C' },
            headingStyle: { bold: true, size: 22, color: '2D3748' },
            bodyStyle: { size: 12, color: '1A202C' },
            captionStyle: { size: 10, color: '718096' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '2D3748', lengthRatio: 0.3 },
            h2LeftBlock: { width: 5, color: '2D3748' },
            divider: { type: 'solid', colors: ['E2E8F0'] }
        },
        effects: { isDark: false, formalStyle: true },
        table: {
            headerBg: '2D3748', headerTextColor: 'FFFFFF',
            cellBg: 'F7FAFC', cellBorderColor: 'E2E8F0',
            alternateRowBg: true, alternateRowColor: 'EDF2F7'
        },
        useCases: ['商务汇报', '年终总结', '季度报告', '项目提案']
    },

    // ==========================================
    // 9. Tech Future 科技未来 - 前沿创新
    // ==========================================
    tech: {
        name: '科技未来 Tech Future',
        nameEn: 'Tech Future',
        category: 'tech',
        description: '前沿创新，适合科技产品和AI展示',
        colors: {
            primary: '58A6FF',
            secondary: '238636',
            accent: 'F78166',
            text: 'C9D1D9',
            textMuted: '8B949E',
            background: '0D1117',
            content: '161B22',
            cardBg: '21262D',
            cardBorder: '30363D',
            highlight: '58A6FF',
            decorLine: '58A6FF',
            headerBg: '21262D'
        },
        gradient: { type: 'gradient', colors: ['0f0f0f', '1a1a2e', '16213e'] },
        typography: {
            fontPairing: 'tech',
            heroTitleStyle: { bold: true, size: 48, color: '58A6FF' },
            titleStyle: { bold: true, size: 36, color: '58A6FF' },
            headingStyle: { bold: true, size: 22, color: 'C9D1D9' },
            bodyStyle: { size: 12, color: 'C9D1D9' },
            captionStyle: { size: 10, color: '8B949E' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '58A6FF', lengthRatio: 0.35 },
            h2LeftBlock: { width: 5, color: '238636' },
            divider: { type: 'dashed', colors: ['30363D'] }
        },
        effects: { isDark: true, techStyle: true },
        table: {
            headerBg: '58A6FF', headerTextColor: 'FFFFFF',
            cellBg: '21262D', cellBorderColor: '30363D',
            alternateRowBg: true, alternateRowColor: '1C2128'
        },
        useCases: ['科技产品', 'AI展示', '创新项目', '技术文档']
    },

    // ==========================================
    // 10. Minimalist 极简主义 - 简洁纯粹
    // ==========================================
    minimal: {
        name: '极简主义 Minimalist',
        nameEn: 'Minimalist',
        category: 'minimal',
        description: '简洁纯粹，适合设计展示和艺术汇报',
        colors: {
            primary: '000000',
            secondary: '666666',
            accent: 'E53935',
            text: '000000',
            textMuted: '757575',
            background: 'FFFFFF',
            content: 'FFFFFF',
            cardBg: 'FAFAFA',
            cardBorder: 'E0E0E0',
            highlight: 'E53935',
            decorLine: '000000',
            headerBg: 'FFFFFF'
        },
        gradient: { type: 'solid', color: 'FFFFFF' },
        typography: {
            fontPairing: 'minimal',
            heroTitleStyle: { bold: true, size: 48, color: '000000' },
            titleStyle: { bold: true, size: 36, color: '000000' },
            headingStyle: { bold: true, size: 22, color: '000000' },
            bodyStyle: { size: 12, color: '000000' },
            captionStyle: { size: 10, color: '757575' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1, color: '000000', lengthRatio: 0.15 },
            h2LeftBlock: { width: 3, color: '000000' },
            divider: { type: 'thin', colors: ['E0E0E0'] }
        },
        effects: { isDark: false, minimalStyle: true },
        table: {
            headerBg: '000000', headerTextColor: 'FFFFFF',
            cellBg: 'FAFAFA', cellBorderColor: 'E0E0E0',
            alternateRowBg: true, alternateRowColor: 'F5F5F5'
        },
        useCases: ['设计展示', '艺术汇报', '品牌提案', '作品集']
    },

    // ==========================================
    // 11. Natural Green 自然绿意 - 清新自然
    // ==========================================
    nature: {
        name: '自然绿意 Natural Green',
        nameEn: 'Natural Green',
        category: 'nature',
        description: '清新自然，适合环保项目和健康主题',
        colors: {
            primary: '166534',
            secondary: '22C55E',
            accent: '84CC16',
            text: '14532D',
            textMuted: '4ADE80',
            background: 'F0FDF4',
            content: 'FFFFFF',
            cardBg: 'FFFFFF',
            cardBorder: 'BBF7D0',
            highlight: '22C55E',
            decorLine: '166534',
            headerBg: '166534'
        },
        gradient: { type: 'gradient', colors: ['1a472a', '2d5a3d', '3d6b4f'] },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: true, size: 48, color: '14532D' },
            titleStyle: { bold: true, size: 36, color: '14532D' },
            headingStyle: { bold: true, size: 22, color: '166534' },
            bodyStyle: { size: 12, color: '14532D' },
            captionStyle: { size: 10, color: '4ADE80' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: '22C55E', lengthRatio: 0.3 },
            h2LeftBlock: { width: 4, color: '166534' },
            divider: { type: 'leaf', colors: ['BBF7D0'] }
        },
        effects: { isDark: false, naturalStyle: true },
        table: {
            headerBg: '166534', headerTextColor: 'FFFFFF',
            cellBg: 'FFFFFF', cellBorderColor: 'BBF7D0',
            alternateRowBg: true, alternateRowColor: 'F0FDF4'
        },
        useCases: ['环保项目', '农业报告', '健康主题', '可持续发展']
    },

    // ==========================================
    // 12. Retro 复古怀旧 - 温暖怀旧
    // ==========================================
    vintage: {
        name: '复古怀旧 Retro',
        nameEn: 'Retro',
        category: 'vintage',
        description: '温暖怀旧，适合历史回顾和传统文化',
        colors: {
            primary: '5D4037',
            secondary: '8D6E63',
            accent: 'FF8F00',
            text: '3E2723',
            textMuted: '6D4C41',
            background: 'FFF8E1',
            content: 'FFFBF0',
            cardBg: 'FFFBF0',
            cardBorder: 'D7CCC8',
            highlight: 'FF8F00',
            decorLine: '5D4037',
            headerBg: '5D4037'
        },
        gradient: { type: 'gradient', colors: ['5d4037', '6d4c41', '795548'] },
        typography: {
            fontPairing: 'elegant',
            heroTitleStyle: { bold: true, size: 48, color: '3E2723' },
            titleStyle: { bold: true, size: 36, color: '3E2723' },
            headingStyle: { bold: true, size: 22, color: '5D4037' },
            bodyStyle: { size: 12, color: '3E2723' },
            captionStyle: { size: 10, color: '6D4C41' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '8D6E63', lengthRatio: 0.35 },
            h2LeftBlock: { width: 4, color: '5D4037' },
            divider: { type: 'decorative', colors: ['D7CCC8'] }
        },
        effects: { isDark: false, vintageStyle: true },
        table: {
            headerBg: '5D4037', headerTextColor: 'FFFFFF',
            cellBg: 'FFFBF0', cellBorderColor: 'D7CCC8',
            alternateRowBg: true, alternateRowColor: 'FFF8E1'
        },
        useCases: ['历史回顾', '周年纪念', '传统文化', '复古品牌']
    },

    // ==========================================
    // 13. Vibrant 活力橙黄 - 充满能量
    // ==========================================
    energetic: {
        name: '活力橙黄 Vibrant',
        nameEn: 'Vibrant',
        category: 'energetic',
        description: '充满能量，适合运动健身和年轻群体',
        colors: {
            primary: 'EA580C',
            secondary: 'F97316',
            accent: 'FBBF24',
            text: '7C2D12',
            textMuted: 'C2410C',
            background: 'FFFAF0',
            content: 'FFFFFF',
            cardBg: 'FFFFFF',
            cardBorder: 'FED7AA',
            highlight: 'F97316',
            decorLine: 'EA580C',
            headerBg: 'EA580C'
        },
        gradient: { type: 'gradient', colors: ['ff6b35', 'ff8c42', 'ffa62b'] },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: true, size: 48, color: '7C2D12' },
            titleStyle: { bold: true, size: 36, color: '7C2D12' },
            headingStyle: { bold: true, size: 22, color: 'EA580C' },
            bodyStyle: { size: 12, color: '7C2D12' },
            captionStyle: { size: 10, color: 'C2410C' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 3, color: 'EA580C', lengthRatio: 0.4 },
            h2LeftBlock: { width: 5, color: 'F97316' },
            divider: { type: 'bold', colors: ['FED7AA'] }
        },
        effects: { isDark: false, energeticStyle: true },
        table: {
            headerBg: 'EA580C', headerTextColor: 'FFFFFF',
            cellBg: 'FFFFFF', cellBorderColor: 'FED7AA',
            alternateRowBg: true, alternateRowColor: 'FFFAF0'
        },
        useCases: ['运动健身', '活力活动', '年轻群体', '促销活动']
    },

    // ==========================================
    // 14. Healthcare 医疗健康 - 专业可信
    // ==========================================
    medical: {
        name: '医疗健康 Healthcare',
        nameEn: 'Healthcare',
        category: 'medical',
        description: '专业可信，适合医疗报告和健康科普',
        colors: {
            primary: '0369A1',
            secondary: '0284C7',
            accent: '10B981',
            text: '0C4A6E',
            textMuted: '0369A1',
            background: 'F0F9FF',
            content: 'FFFFFF',
            cardBg: 'FFFFFF',
            cardBorder: 'BAE6FD',
            highlight: '10B981',
            decorLine: '0369A1',
            headerBg: '0369A1'
        },
        gradient: { type: 'gradient', colors: ['0ea5e9', '38bdf8', '7dd3fc'] },
        typography: {
            fontPairing: 'classic',
            heroTitleStyle: { bold: true, size: 48, color: '0C4A6E' },
            titleStyle: { bold: true, size: 36, color: '0C4A6E' },
            headingStyle: { bold: true, size: 22, color: '0369A1' },
            bodyStyle: { size: 12, color: '0C4A6E' },
            captionStyle: { size: 10, color: '0369A1' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: '0369A1', lengthRatio: 0.25 },
            h2LeftBlock: { width: 4, color: '0369A1' },
            divider: { type: 'solid', colors: ['BAE6FD'] }
        },
        effects: { isDark: false, medicalStyle: true },
        table: {
            headerBg: '0369A1', headerTextColor: 'FFFFFF',
            cellBg: 'FFFFFF', cellBorderColor: 'BAE6FD',
            alternateRowBg: true, alternateRowColor: 'F0F9FF'
        },
        useCases: ['医疗报告', '健康科普', '医院汇报', '药品说明']
    },

    // ==========================================
    // 15. Finance 金融财经 - 稳重专业
    // ==========================================
    finance: {
        name: '金融财经 Finance',
        nameEn: 'Finance',
        category: 'finance',
        description: '稳重专业，适合财务报告和投资分析',
        colors: {
            primary: '1A365D',
            secondary: '2B6CB0',
            accent: 'D69E2E',
            text: '1A202C',
            textMuted: '4A5568',
            background: 'FFFFFF',
            content: 'EBF8FF',
            cardBg: 'FFFFFF',
            cardBorder: 'BEE3F8',
            highlight: 'D69E2E',
            decorLine: '1A365D',
            headerBg: '1A365D'
        },
        gradient: { type: 'gradient', colors: ['1e3a5f', '2c5282', '2b6cb0'] },
        typography: {
            fontPairing: 'corporate',
            heroTitleStyle: { bold: true, size: 48, color: '1A365D' },
            titleStyle: { bold: true, size: 36, color: '1A365D' },
            headingStyle: { bold: true, size: 22, color: '2B6CB0' },
            bodyStyle: { size: 12, color: '1A202C' },
            captionStyle: { size: 10, color: '4A5568' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: '1A365D', lengthRatio: 0.3 },
            h2LeftBlock: { width: 5, color: '2B6CB0' },
            divider: { type: 'solid', colors: ['BEE3F8'] }
        },
        effects: { isDark: false, formalStyle: true },
        table: {
            headerBg: '1A365D', headerTextColor: 'FFFFFF',
            cellBg: 'EBF8FF', cellBorderColor: 'BEE3F8',
            alternateRowBg: true, alternateRowColor: 'F7FAFC'
        },
        useCases: ['财务报告', '投资分析', '银行业务', '经济研究']
    },

    // ==========================================
    // 16. Chinese Style 中国风 - 传统典雅
    // ==========================================
    chinese: {
        name: '中国风 Chinese Style',
        nameEn: 'Chinese Style',
        category: 'cultural',
        description: '传统典雅，适合传统文化和国风主题',
        colors: {
            primary: '8B0000',
            secondary: 'D4AF37',
            accent: '2F4F4F',
            text: '3C1E1E',
            textMuted: '6B4423',
            background: 'FFF8F0',
            content: 'FFFAF5',
            cardBg: 'FFFAF5',
            cardBorder: 'DEB887',
            highlight: 'D4AF37',
            decorLine: '8B0000',
            headerBg: '8B0000'
        },
        gradient: { type: 'gradient', colors: ['8B0000', 'A52A2A', 'B22222'] },
        typography: {
            fontPairing: 'chinese',
            heroTitleStyle: { bold: true, size: 48, color: '8B0000' },
            titleStyle: { bold: true, size: 36, color: '8B0000' },
            headingStyle: { bold: true, size: 22, color: 'D4AF37' },
            bodyStyle: { size: 12, color: '3C1E1E' },
            captionStyle: { size: 10, color: '6B4423' }
        },
        page: { margins: 'wide', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2.5, color: 'D4AF37', lengthRatio: 0.4 },
            h2LeftBlock: { width: 5, color: '8B0000' },
            divider: { type: 'decorative', colors: ['DEB887', 'D4AF37'] }
        },
        effects: { isDark: false, chineseStyle: true },
        table: {
            headerBg: '8B0000', headerTextColor: 'FFFFFF',
            cellBg: 'FFFAF5', cellBorderColor: 'DEB887',
            alternateRowBg: true, alternateRowColor: 'FFF8F0'
        },
        useCases: ['传统文化', '中式设计', '国风主题', '非遗展示'],
        decorations: ['🏮', '🎊', '🧧', '🎋', '🏯']
    },

    // ==========================================
    // 17. Creative 创意艺术 - 大胆创新
    // ==========================================
    creative: {
        name: '创意艺术 Creative',
        nameEn: 'Creative',
        category: 'creative',
        description: '大胆创新，适合创意提案和艺术项目',
        colors: {
            primary: 'E91E63',
            secondary: '9C27B0',
            accent: '00BCD4',
            text: '212121',
            textMuted: '757575',
            background: 'FFFFFF',
            content: 'FAFAFA',
            cardBg: 'FFFFFF',
            cardBorder: 'E0E0E0',
            highlight: 'E91E63',
            decorLine: 'E91E63',
            headerBg: 'E91E63'
        },
        gradient: { type: 'gradient', colors: ['E91E63', '9C27B0', '00BCD4'] },
        typography: {
            fontPairing: 'modern',
            heroTitleStyle: { bold: true, size: 48, color: 'E91E63' },
            titleStyle: { bold: true, size: 36, color: 'E91E63' },
            headingStyle: { bold: true, size: 22, color: '9C27B0' },
            bodyStyle: { size: 12, color: '212121' },
            captionStyle: { size: 10, color: '757575' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 2, color: 'E91E63', lengthRatio: 0.35 },
            h2LeftBlock: { width: 5, color: '9C27B0' },
            divider: { type: 'colorful', colors: ['E91E63', '9C27B0', '00BCD4'] }
        },
        effects: { isDark: false, creativeStyle: true },
        table: {
            headerBg: 'E91E63', headerTextColor: 'FFFFFF',
            cellBg: 'FAFAFA', cellBorderColor: 'E0E0E0',
            alternateRowBg: true, alternateRowColor: 'F5F5F5'
        },
        useCases: ['创意提案', '艺术项目', '设计工作室', '广告策划']
    },

    // ==========================================
    // 18. Corporate Standard 企业标准 - 专业规范
    // ==========================================
    corporateStandard: {
        name: '企业标准 Corporate',
        nameEn: 'Corporate',
        category: 'business',
        description: '专业规范，适合企业文档和正式文件',
        colors: {
            primary: '1F2937',
            secondary: '374151',
            accent: '2563EB',
            text: '111827',
            textMuted: '6B7280',
            background: 'FFFFFF',
            content: 'F9FAFB',
            cardBg: 'FFFFFF',
            cardBorder: 'E5E7EB',
            highlight: '2563EB',
            decorLine: '1F2937',
            headerBg: '1F2937'
        },
        gradient: { type: 'solid', color: '1F2937' },
        typography: {
            fontPairing: 'corporate',
            heroTitleStyle: { bold: true, size: 48, color: '111827' },
            titleStyle: { bold: true, size: 36, color: '111827' },
            headingStyle: { bold: true, size: 22, color: '1F2937' },
            bodyStyle: { size: 12, color: '111827' },
            captionStyle: { size: 10, color: '6B7280' }
        },
        page: { margins: 'normal', size: 'a4', orientation: 'portrait' },
        decoration: {
            h1Underline: { width: 1.5, color: '1F2937', lengthRatio: 0.2 },
            h2LeftBlock: { width: 4, color: '1F2937' },
            divider: { type: 'solid', colors: ['E5E7EB'] }
        },
        effects: { isDark: false, formalStyle: true },
        table: {
            headerBg: '1F2937', headerTextColor: 'FFFFFF',
            cellBg: 'F9FAFB', cellBorderColor: 'E5E7EB',
            alternateRowBg: true, alternateRowColor: 'F3F4F6'
        },
        useCases: ['合同报告', '企业文档', '正式文件', '政策文件']
    }
};

// ==========================================
// 风格分类
// ==========================================
const STYLE_CATEGORIES = {
    creative: { name: '创意设计', styles: ['aurora', 'gradient', 'creative'] },
    tech: { name: '科技前沿', styles: ['tech', 'cyberpunk', 'aurora'] },
    modern: { name: '现代简约', styles: ['glassmorphism', 'minimal', 'gradient'] },
    artistic: { name: '艺术展示', styles: ['monochrome', 'creative', 'vintage'] },
    lifestyle: { name: '生活方式', styles: ['pastel', 'nature'] },
    academic: { name: '学术报告', styles: ['academic'] },
    business: { name: '商务汇报', styles: ['corporate', 'finance', 'corporateStandard'] },
    minimal: { name: '极简设计', styles: ['minimal', 'monochrome'] },
    nature: { name: '自然清新', styles: ['nature'] },
    vintage: { name: '复古怀旧', styles: ['vintage'] },
    energetic: { name: '活力能量', styles: ['energetic'] },
    medical: { name: '医疗健康', styles: ['medical'] },
    cultural: { name: '文化艺术', styles: ['chinese', 'vintage'] }
};

// ==========================================
// 辅助函数
// ==========================================

// 根据内容类型推荐风格
function recommendStyle(contentType) {
    const recommendations = {
        'aurora': 'aurora', '极光': 'aurora', '创意': 'aurora',
        'glassmorphism': 'glassmorphism', '玻璃': 'glassmorphism', '玻璃态': 'glassmorphism',
        'monochrome': 'monochrome', '单色': 'monochrome', '黑白': 'monochrome', '艺术': 'monochrome', '摄影': 'monochrome',
        'pastel': 'pastel', '柔和': 'pastel', '女性': 'pastel', '婚礼': 'pastel',
        'gradient': 'gradient', '渐变': 'gradient', '品牌': 'gradient',
        'cyberpunk': 'cyberpunk', '赛博朋克': 'cyberpunk', '游戏': 'cyberpunk', '霓虹': 'cyberpunk',
        'creative': 'creative', '创意艺术': 'creative', '广告': 'creative',
        'corporateStandard': 'corporateStandard', '企业': 'corporateStandard', '合同': 'corporateStandard', '正式': 'corporateStandard',
        'academic': 'academic', '学术': 'academic', '论文': 'academic', '答辩': 'academic', '报告': 'academic',
        'corporate': 'corporate', '商务': 'corporate', '年终总结': 'corporate', '季度报告': 'corporate',
        'tech': 'tech', '科技': 'tech', 'AI': 'tech', '互联网': 'tech',
        'minimal': 'minimal', '极简': 'minimal', '设计': 'minimal',
        'nature': 'nature', '自然': 'nature', '环保': 'nature', '健康': 'nature', '农业': 'nature',
        'vintage': 'vintage', '复古': 'vintage', '历史': 'vintage', '纪念': 'vintage',
        'energetic': 'energetic', '活力': 'energetic', '运动': 'energetic', '健身': 'energetic',
        'medical': 'medical', '医疗': 'medical', '医院': 'medical',
        'finance': 'finance', '金融': 'finance', '财务': 'finance', '投资': 'finance',
        'chinese': 'chinese', '中国风': 'chinese', '传统': 'chinese', '国风': 'chinese', '非遗': 'chinese'
    };
    return recommendations[contentType] || 'academic';
}

// 获取所有风格名称
function getAllStyleNames() {
    return Object.keys(STYLE_LIBRARY);
}

// 获取风格信息
function getStyle(styleName) {
    return STYLE_LIBRARY[styleName] || STYLE_LIBRARY.academic;
}

// 获取分类下的所有风格
function getStylesByCategory(category) {
    const cat = STYLE_CATEGORIES[category];
    if (!cat) return [];
    return cat.styles.map(s => ({ key: s, ...STYLE_LIBRARY[s] }));
}

// 获取字体配对
function getFontPairing(pairingName) {
    return FONT_PAIRINGS[pairingName] || FONT_PAIRINGS.chinese;
}

// 验证颜色格式（转换为标准6位十六进制）
function validateColor(color) {
    if (!color) return '000000';
    const hex = color.replace('#', '');
    if (hex.length === 3) {
        return hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return hex.length === 6 ? hex : '000000';
}

// 获取页面边距配置
function getPageMargins(marginType) {
    return MODERN_LAYOUT_BASE.page.margins[marginType] || MODERN_LAYOUT_BASE.page.margins.normal;
}

// 获取页面尺寸配置
function getPageSize(sizeType) {
    return MODERN_LAYOUT_BASE.page.size[sizeType] || MODERN_LAYOUT_BASE.page.size.a4;
}

// 获取装饰线条配置
function getDecorationConfig(style) {
    return style.decoration || MODERN_LAYOUT_BASE.decoration;
}

// 获取表格样式配置
function getTableConfig(style) {
    return style.table || MODERN_LAYOUT_BASE.table;
}

// 获取卡片配置
function getCardConfig(style) {
    return style.card || MODERN_LAYOUT_BASE.card;
}

// 获取数据统计配置
function getStatsConfig(style) {
    return style.stats || MODERN_LAYOUT_BASE.stats;
}

// 获取封面配置
function getCoverConfig(style) {
    return style.cover || MODERN_LAYOUT_BASE.cover;
}

module.exports = {
    STYLE_LIBRARY,
    STYLE_CATEGORIES,
    FONT_PAIRINGS,
    MODERN_LAYOUT_BASE,
    recommendStyle,
    getAllStyleNames,
    getStyle,
    getStylesByCategory,
    getFontPairing,
    validateColor,
    getPageMargins,
    getPageSize,
    getDecorationConfig,
    getTableConfig,
    getCardConfig,
    getStatsConfig,
    getCoverConfig
};