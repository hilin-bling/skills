/**
 * PDF 风格库 - 18种精选风格 (v8.0)
 *
 * 每种风格都经过精心设计，达到 Dribbble 顶级设计水准
 * 包含完整的配色方案、渐变参数、装饰元素配置
 * 适用于不同场景：学术报告、产品汇报、商务简约等
 *
 * v8.0 - Dribbble 顶级设计版：
 * - 18种完整风格，每种都有独特的视觉特征
 * - 完善的渐变参数系统（角度、类型、叠加层）
 * - 装饰元素配置（线条、圆点、几何图形）
 * - 中文字体优化（微软雅黑粗体+常规）
 * - 卡片组件参数（圆角、阴影、内边距）
 * - 数据可视化配色
 */

// ==========================================
// 现代设计基础参数 v8.0 (Dribbble 水准)
// ==========================================
const MODERN_LAYOUT_BASE = {
    // 页面尺寸（A4）
    page: {
        width: 595.28,   // A4 宽度 (pt)
        height: 841.89,  // A4 高度 (pt)
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        },
        contentWidth: 495.28,  // 内容区域宽度
        contentHeight: 741.89  // 内容区域高度
    },

    // 字体大小层级（现代设计趋势 - 8级体系，参考 Dribbble）
    typography: {
        display: 56,        // 展示级 - 超大标题（封面）
        heroTitle: 42,      // 封面主标题 - 突出显示
        pageTitle: 32,      // 页面标题 - 章节头
        sectionTitle: 24,   // 章节标题 - 中标题
        heading: 18,        // 小标题 - 卡片标题
        body: 11,           // 正文 - 段落文本
        bodyLarge: 13,      // 大正文 - 重点内容
        caption: 9,         // 说明文字 - 辅助信息
        small: 7            // 小字 - 页码等
    },

    // 间距系统（基于 6pt 网格，适合 PDF 输出）
    spacing: {
        xs: 3,
        sm: 6,
        md: 12,
        lg: 18,
        xl: 24,
        xxl: 36,
        xxxl: 48,
        huge: 72
    },

    // 线条系统
    lines: {
        thin: 0.5,
        normal: 1,
        medium: 2,
        thick: 3,
        heavy: 4
    },

    // 圆角系统
    borderRadius: {
        none: 0,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        round: 999
    },

    // 装饰元素参数
    decorations: {
        dotRadius: {
            sm: 3,
            md: 5,
            lg: 8,
            xl: 12
        },
        lineWidth: {
            thin: 1,
            normal: 2,
            thick: 3
        },
        spacing: 20,  // 装饰元素间距
        offset: 40    // 边缘偏移
    },

    // 卡片样式（参考 Dribbble 卡片设计）
    card: {
        borderRadius: 10,
        shadowOffset: 2,
        shadowBlur: 4,
        shadowColor: 'rgba(0,0,0,0.1)',
        padding: 16,
        minHeight: 90,
        gap: 16
    },

    // 视觉效果参数
    effects: {
        glassBlur: 12,
        glassOpacity: 0.75,
        shadowIntensity: 'medium',
        gradientSteps: 40,      // 渐变分段数量
        gradientAngle: 135,     // 渐变角度
        neonGlowRadius: 3       // 霓虹发光半径
    },

    // 网格系统
    grid: {
        columns: 12,
        gutter: 12,
        sidebarWidth: 0.3,      // 侧边栏宽度比例
        mainWidth: 0.7          // 主内容宽度比例
    },

    // 中文字体配置
    fonts: {
        chinese: {
            regular: 'MicrosoftYaHei',
            bold: 'MicrosoftYaHei-Bold',
            fallback: 'SimHei'
        },
        english: {
            regular: 'Helvetica',
            bold: 'Helvetica-Bold'
        }
    }
};

// ==========================================
// 18 种专业风格定义 (Dribbble 顶级设计)
// ==========================================
const STYLE_LIBRARY = {

    // ==========================================
    // 1. Aurora 极光 - 北欧极光灵感
    // 特点：梦幻渐变、极光叠加、深色背景
    // ==========================================
    aurora: {
        name: '极光 Aurora',
        category: 'creative',
        description: '北欧极光灵感，梦幻渐变色彩，适合创意展示',
        cover: {
            type: 'gradient',
            colors: ['0f0c29', '302b63', '24243e'],
            direction: 'diagonal',
            overlay: {
                type: 'aurora',
                colors: ['00ff87', '60efff', '00ff87'],
                opacity: 0.25,
                waveHeight: 80
            }
        },
        content: '0D1117',
        primary: '00FF87',
        secondary: '60EFFF',
        accent: 'FF6B6B',
        text: 'FFFFFF',
        textMuted: '8B949E',
        cardBg: '161B22',
        cardBorder: '30363D',
        isDark: true,
        decorations: {
            type: 'aurora',
            elements: ['line', 'dot', 'wave'],
            primaryColor: '00FF87',
            secondaryColor: '60EFFF',
            opacity: 0.3
        },
        effects: {
            glassmorphism: true,
            gradientType: 'mesh',
            neonGlow: true,
            glowColor: '00FF87'
        }
    },

    // ==========================================
    // 2. Cyberpunk 赛博朋克 - 霓虹科技
    // 特点：霓虹边框、强烈对比、发光效果
    // ==========================================
    cyberpunk: {
        name: '赛博朋克 Cyberpunk',
        category: 'tech',
        description: '霓虹灯效果，赛博朋克风格，适合游戏和科技活动',
        cover: {
            type: 'gradient',
            colors: ['0a0a0a', '1a1a2e', '16213e'],
            direction: 'diagonal',
            neonAccent: true,
            borderColor: 'FF00FF'
        },
        content: '0D0D0D',
        primary: 'FF00FF',
        secondary: '00FFFF',
        accent: 'FFFF00',
        text: 'FFFFFF',
        textMuted: '888888',
        cardBg: '111111',
        cardBorder: 'FF00FF',
        isDark: true,
        decorations: {
            type: 'neon',
            elements: ['line', 'corner', 'glitch'],
            primaryColor: 'FF00FF',
            secondaryColor: '00FFFF',
            borderColor: 'FF00FF',
            borderWidth: 2
        },
        effects: {
            neonGlow: true,
            neonColor: 'FF00FF',
            scanlines: false,
            glitchEffect: false
        }
    },

    // ==========================================
    // 3. Glassmorphism 玻璃态 - 现代玻璃拟态
    // 特点：半透明卡片、柔和阴影、通透质感
    // ==========================================
    glass: {
        name: '玻璃态 Glassmorphism',
        category: 'modern',
        description: '现代玻璃拟态设计，通透质感，适合科技品牌',
        cover: {
            type: 'gradient',
            colors: ['e0e5ec', 'd1d9e6', 'c8d1db'],
            direction: 'diagonal',
            glassmorphism: true,
            blur: 12
        },
        content: 'E8ECEF',
        primary: '4A5568',
        secondary: '718096',
        accent: '3182CE',
        text: '2D3748',
        textMuted: '718096',
        cardBg: 'FFFFFF',
        cardBorder: 'FFFFFF',
        decorations: {
            type: 'glass',
            elements: ['blur', 'line', 'circle'],
            opacity: 0.7,
            blur: 12
        },
        effects: {
            glassmorphism: true,
            backdropBlur: true,
            borderWidth: 1,
            borderColor: 'FFFFFF',
            shadowStyle: 'soft',
            shadowColor: 'rgba(0,0,0,0.08)'
        }
    },

    // ==========================================
    // 4. Monochrome 单色大师 - 纯粹单色
    // 特点：黑白对比、极简线条、高对比度
    // ==========================================
    monochrome: {
        name: '单色大师 Monochrome',
        category: 'artistic',
        description: '纯粹单色设计，极简高雅，适合艺术和高端品牌',
        cover: {
            type: 'solid',
            color: '0A0A0A',
            accentColor: 'FFFFFF',
            accentWidth: 3
        },
        content: 'FAFAFA',
        primary: '0A0A0A',
        secondary: '4A4A4A',
        accent: '0A0A0A',
        text: '0A0A0A',
        textMuted: '6A6A6A',
        cardBg: 'FFFFFF',
        cardBorder: 'E5E5E5',
        decorations: {
            type: 'minimal',
            elements: ['line', 'dot'],
            primaryColor: '0A0A0A',
            lineWidth: 3,
            dotRadius: 6
        },
        effects: {
            highContrast: true,
            subtleTexture: false,
            typography: 'bold'
        }
    },

    // ==========================================
    // 5. Gradient Flow 渐变流 - 动态渐变
    // 特点：多彩渐变、流动感、现代活力
    // ==========================================
    gradient: {
        name: '渐变流 Gradient Flow',
        category: 'creative',
        description: '动态渐变背景，现代流动感，适合品牌展示',
        cover: {
            type: 'mesh',
            colors: ['667eea', '764ba2', 'f093fb', 'f5576c'],
            direction: 'flow',
            blendMode: 'normal'
        },
        content: 'FFFFFF',
        primary: '667EEA',
        secondary: '764BA2',
        accent: 'F5576C',
        text: '2D3748',
        textMuted: '718096',
        cardBg: 'F7FAFC',
        cardBorder: 'E2E8F0',
        decorations: {
            type: 'gradient',
            elements: ['wave', 'circle', 'line'],
            primaryColor: '667EEA',
            secondaryColor: 'F5576C',
            opacity: 0.8
        },
        effects: {
            meshGradient: true,
            blurEffect: false,
            animationStyle: 'fluid'
        }
    },

    // ==========================================
    // 6. Pastel 柔和梦境 - 柔和马卡龙色
    // 特点：温暖柔和、圆角设计、温馨浪漫
    // ==========================================
    pastel: {
        name: '柔和梦境 Pastel',
        category: 'lifestyle',
        description: '柔和马卡龙色调，温馨浪漫，适合女性品牌和生活方式',
        cover: {
            type: 'gradient',
            colors: ['ffeef8', 'ffe4f3', 'ffd6e7'],
            direction: 'diagonal',
            soft: true
        },
        content: 'FFFBFE',
        primary: 'FF8FAB',
        secondary: 'FFB8D0',
        accent: 'B8E6FF',
        text: '5D4157',
        textMuted: '8B7B8B',
        cardBg: 'FFFFFF',
        cardBorder: 'FFD6E7',
        decorations: {
            type: 'soft',
            elements: ['circle', 'line', 'dot'],
            primaryColor: 'FF8FAB',
            secondaryColor: 'B8E6FF',
            roundedCorners: 12
        },
        effects: {
            softShadow: true,
            shadowColor: 'rgba(255,143,171,0.2)',
            roundedCorners: 14,
            animationStyle: 'gentle'
        }
    },

    // ==========================================
    // 7. Academic 学术蓝 - 专业严谨
    // 特点：稳重蓝色、清晰层次、学术感
    // ==========================================
    academic: {
        name: '学术蓝 Academic',
        category: 'academic',
        description: '专业严谨，适合学术报告和论文答辩',
        cover: {
            type: 'gradient',
            colors: ['1e3a5f', '2c5282', '3182ce'],
            direction: 'diagonal',
            accentLine: {
                color: 'FFFFFF',
                width: 2,
                position: 'left'
            }
        },
        content: 'FFFFFF',
        primary: '2B6CB0',
        secondary: '3182CE',
        accent: 'DD6B20',
        text: '1A365D',
        textMuted: '4A5568',
        cardBg: 'F7FAFC',
        cardBorder: 'CBD5E0',
        decorations: {
            type: 'academic',
            elements: ['line', 'dot', 'number'],
            primaryColor: '2B6CB0',
            accentColor: 'DD6B20',
            lineWidth: 2
        },
        effects: {
            formal: true,
            highContrast: false
        }
    },

    // ==========================================
    // 8. Business Elite 商务精英 - 专业干练
    // 特点：深色背景、金色点缀、稳重专业
    // ==========================================
    corporate: {
        name: '商务精英 Business Elite',
        category: 'business',
        description: '专业干练，适合商务汇报和年终总结',
        cover: {
            type: 'gradient',
            colors: ['1a202c', '2d3748', '4a5568'],
            direction: 'diagonal',
            accentColor: 'C53030'
        },
        content: 'FFFFFF',
        primary: '2D3748',
        secondary: '4A5568',
        accent: 'C53030',
        text: '1A202C',
        textMuted: '718096',
        cardBg: 'F7FAFC',
        cardBorder: 'E2E8F0',
        decorations: {
            type: 'corporate',
            elements: ['line', 'dot', 'bar'],
            primaryColor: '2D3748',
            accentColor: 'C53030',
            lineWidth: 2
        },
        effects: {
            formal: true,
            minimalist: true
        }
    },

    // ==========================================
    // 9. Tech Future 科技未来 - 前沿创新
    // 特点：暗色主题、蓝色渐变、科技感
    // ==========================================
    tech: {
        name: '科技未来 Tech Future',
        category: 'tech',
        description: '前沿创新，适合科技产品和AI展示',
        cover: {
            type: 'gradient',
            colors: ['0f0f0f', '1a1a2e', '16213e'],
            direction: 'diagonal',
            codeStyle: true,
            accentColor: '58A6FF'
        },
        content: '0D1117',
        primary: '58A6FF',
        secondary: '238636',
        accent: 'F78166',
        text: 'C9D1D9',
        textMuted: '8B949E',
        cardBg: '161B22',
        cardBorder: '30363D',
        isDark: true,
        decorations: {
            type: 'tech',
            elements: ['line', 'dot', 'code'],
            primaryColor: '58A6FF',
            secondaryColor: '238636',
            accentColor: 'F78166'
        },
        effects: {
            darkMode: true,
            codeHighlight: true
        }
    },

    // ==========================================
    // 10. Minimalist 极简主义 - 简洁纯粹
    // 特点：白色背景、黑色文字、极简线条
    // ==========================================
    minimal: {
        name: '极简主义 Minimalist',
        category: 'minimal',
        description: '简洁纯粹，适合设计展示和艺术汇报',
        cover: {
            type: 'solid',
            color: 'FFFFFF',
            accentColor: '000000',
            accentWidth: 4
        },
        content: 'FFFFFF',
        primary: '000000',
        secondary: '666666',
        accent: 'E53935',
        text: '000000',
        textMuted: '757575',
        cardBg: 'FAFAFA',
        cardBorder: 'E0E0E0',
        decorations: {
            type: 'minimal',
            elements: ['line', 'dot'],
            primaryColor: '000000',
            accentColor: 'E53935',
            lineWidth: 2
        },
        effects: {
            minimal: true,
            highContrast: false
        }
    },

    // ==========================================
    // 11. Natural Green 自然绿意 - 清新自然
    // 特点：绿色系、自然感、清新活力
    // ==========================================
    nature: {
        name: '自然绿意 Natural Green',
        category: 'nature',
        description: '清新自然，适合环保项目和健康主题',
        cover: {
            type: 'gradient',
            colors: ['1a472a', '2d5a3d', '3d6b4f'],
            direction: 'diagonal',
            leafAccent: true
        },
        content: 'F0FDF4',
        primary: '166534',
        secondary: '22C55E',
        accent: '84CC16',
        text: '14532D',
        textMuted: '4ADE80',
        cardBg: 'FFFFFF',
        cardBorder: 'BBF7D0',
        decorations: {
            type: 'nature',
            elements: ['line', 'leaf', 'dot'],
            primaryColor: '166534',
            secondaryColor: '22C55E'
        },
        effects: {
            fresh: true,
            softShadow: true
        }
    },

    // ==========================================
    // 12. Retro 复古怀旧 - 温暖怀旧
    // 特点：棕色系、复古感、温暖色调
    // ==========================================
    vintage: {
        name: '复古怀旧 Retro',
        category: 'vintage',
        description: '温暖怀旧，适合历史回顾和传统文化',
        cover: {
            type: 'gradient',
            colors: ['5d4037', '6d4c41', '795548'],
            direction: 'diagonal',
            vintageBorder: true
        },
        content: 'FFF8E1',
        primary: '5D4037',
        secondary: '8D6E63',
        accent: 'FF8F00',
        text: '3E2723',
        textMuted: '6D4C41',
        cardBg: 'FFFBF0',
        cardBorder: 'D7CCC8',
        decorations: {
            type: 'vintage',
            elements: ['line', 'ornament', 'dot'],
            primaryColor: '5D4037',
            accentColor: 'FF8F00'
        },
        effects: {
            vintage: true,
            warmTone: true
        }
    },

    // ==========================================
    // 13. Vibrant 活力橙黄 - 充满能量
    // 特点：橙色系、活力感、年轻动感
    // ==========================================
    energetic: {
        name: '活力橙黄 Vibrant',
        category: 'energetic',
        description: '充满能量，适合运动健身和年轻群体',
        cover: {
            type: 'gradient',
            colors: ['ff6b35', 'ff8c42', 'ffa62b'],
            direction: 'diagonal',
            energyPulse: true
        },
        content: 'FFFAF0',
        primary: 'EA580C',
        secondary: 'F97316',
        accent: 'FBBF24',
        text: '7C2D12',
        textMuted: 'C2410C',
        cardBg: 'FFFFFF',
        cardBorder: 'FED7AA',
        decorations: {
            type: 'energetic',
            elements: ['line', 'burst', 'dot'],
            primaryColor: 'EA580C',
            secondaryColor: 'FBBF24'
        },
        effects: {
            energetic: true,
            gradientIntensity: 'high'
        }
    },

    // ==========================================
    // 14. Healthcare 医疗健康 - 专业可信
    // 特点：蓝色系、清洁感、专业可信
    // ==========================================
    medical: {
        name: '医疗健康 Healthcare',
        category: 'medical',
        description: '专业可信，适合医疗报告和健康科普',
        cover: {
            type: 'gradient',
            colors: ['0ea5e9', '38bdf8', '7dd3fc'],
            direction: 'diagonal',
            cleanStyle: true
        },
        content: 'F0F9FF',
        primary: '0369A1',
        secondary: '0284C7',
        accent: '10B981',
        text: '0C4A6E',
        textMuted: '0369A1',
        cardBg: 'FFFFFF',
        cardBorder: 'BAE6FD',
        decorations: {
            type: 'medical',
            elements: ['line', 'cross', 'dot'],
            primaryColor: '0369A1',
            accentColor: '10B981'
        },
        effects: {
            clean: true,
            professional: true
        }
    },

    // ==========================================
    // 15. Finance 金融财经 - 稳重专业
    // 特点：深蓝色、金色点缀、稳重感
    // ==========================================
    finance: {
        name: '金融财经 Finance',
        category: 'finance',
        description: '稳重专业，适合财务报告和投资分析',
        cover: {
            type: 'gradient',
            colors: ['1e3a5f', '2c5282', '2b6cb0'],
            direction: 'diagonal',
            goldAccent: true,
            accentColor: 'D69E2E'
        },
        content: 'FFFFFF',
        primary: '1A365D',
        secondary: '2B6CB0',
        accent: 'D69E2E',
        text: '1A202C',
        textMuted: '4A5568',
        cardBg: 'EBF8FF',
        cardBorder: 'BEE3F8',
        decorations: {
            type: 'finance',
            elements: ['line', 'chart', 'dot'],
            primaryColor: '1A365D',
            accentColor: 'D69E2E'
        },
        effects: {
            formal: true,
            goldHighlight: true
        }
    },

    // ==========================================
    // 16. Chinese Style 中国风 - 传统典雅
    // 特点：红色系、金色点缀、传统元素
    // ==========================================
    chinese: {
        name: '中国风 Chinese Style',
        category: 'cultural',
        description: '传统典雅，适合传统文化和国风主题',
        cover: {
            type: 'gradient',
            colors: ['8B0000', 'A52A2A', 'B22222'],
            direction: 'diagonal',
            goldAccent: true,
            accentColor: 'D4AF37'
        },
        content: 'FFF8F0',
        primary: '8B0000',
        secondary: 'D4AF37',
        accent: '2F4F4F',
        text: '3C1E1E',
        textMuted: '6B4423',
        cardBg: 'FFFAF5',
        cardBorder: 'DEB887',
        decorations: {
            type: 'chinese',
            elements: ['line', 'ornament', 'circle'],
            primaryColor: '8B0000',
            accentColor: 'D4AF37',
            borderWidth: 2
        },
        effects: {
            traditional: true,
            goldAccent: true
        }
    },

    // ==========================================
    // 17. Creative 创意艺术 - 大胆创新
    // 特点：多彩渐变、大胆配色、艺术感
    // ==========================================
    creative: {
        name: '创意艺术 Creative',
        category: 'creative',
        description: '大胆创新，艺术感强烈，适合艺术作品和创意提案',
        cover: {
            type: 'mesh',
            colors: ['7C3AED', 'EC4899', 'F59E0B', '22D3EE'],
            direction: 'radial',
            blendMode: 'overlay'
        },
        content: 'FFFFFF',
        primary: '7C3AED',
        secondary: 'EC4899',
        accent: '22D3EE',
        text: '1F2937',
        textMuted: '6B7280',
        cardBg: 'F7FAFC',
        cardBorder: 'E5E7EB',
        decorations: {
            type: 'creative',
            elements: ['wave', 'circle', 'line', 'burst'],
            colors: ['7C3AED', 'EC4899', 'F59E0B', '22D3EE'],
            opacity: 0.7
        },
        effects: {
            meshGradient: true,
            boldTypography: true,
            creative: true
        }
    },

    // ==========================================
    // 18. Corporate 企业标准 - 标准商务
    // 特点：标准蓝色、简洁大方、通用性强
    // ==========================================
    business: {
        name: '企业标准 Corporate',
        category: 'business',
        description: '标准商务风格，通用性强，适合企业文档',
        cover: {
            type: 'solid',
            color: '1B4F72',
            accentLine: {
                color: 'FFFFFF',
                width: 3,
                position: 'bottom'
            }
        },
        content: 'FFFFFF',
        primary: '1B4F72',
        secondary: '2E86AB',
        accent: 'E74C3C',
        text: '2C3E50',
        textMuted: '7F8C8D',
        cardBg: 'F8F9FA',
        cardBorder: 'DEE2E6',
        decorations: {
            type: 'corporate',
            elements: ['line', 'dot', 'bar'],
            primaryColor: '1B4F72',
            accentColor: 'E74C3C'
        },
        effects: {
            formal: true,
            standard: true
        }
    }
};

// ==========================================
// 风格分类
// ==========================================
const STYLE_CATEGORIES = {
    creative: { name: '创意设计', styles: ['aurora', 'gradient', 'creative', 'cyberpunk'] },
    academic: { name: '学术报告', styles: ['academic'] },
    business: { name: '商务汇报', styles: ['corporate', 'finance', 'business'] },
    tech: { name: '科技前沿', styles: ['tech', 'cyberpunk', 'aurora'] },
    minimal: { name: '极简设计', styles: ['minimal', 'monochrome'] },
    nature: { name: '自然清新', styles: ['nature'] },
    vintage: { name: '复古怀旧', styles: ['vintage'] },
    energetic: { name: '活力能量', styles: ['energetic'] },
    medical: { name: '医疗健康', styles: ['medical'] },
    cultural: { name: '文化艺术', styles: ['chinese'] },
    lifestyle: { name: '生活方式', styles: ['pastel', 'nature'] },
    artistic: { name: '艺术展示', styles: ['monochrome', 'creative'] },
    modern: { name: '现代简约', styles: ['glass', 'minimal'] }
};

// ==========================================
// 字体配对系统（针对 PDF 优化）
// ==========================================
const FONT_PAIRINGS = {
    classic: {
        name: 'Classic Professional',
        heading: 'MicrosoftYaHei-Bold',
        body: 'MicrosoftYaHei',
        description: '经典专业，中文字体'
    },
    modern: {
        name: 'Modern Editorial',
        heading: 'MicrosoftYaHei-Bold',
        body: 'MicrosoftYaHei',
        description: '现代编辑风格'
    },
    minimal: {
        name: 'Minimal Clean',
        heading: 'MicrosoftYaHei-Bold',
        body: 'MicrosoftYaHei',
        description: '极简纯净'
    },
    english: {
        name: 'English Only',
        heading: 'Helvetica-Bold',
        body: 'Helvetica',
        description: '英文文档'
    },
    technical: {
        name: 'Technical Mono',
        heading: 'Courier-Bold',
        body: 'Courier',
        description: '技术文档等宽字体'
    },
    artistic: {
        name: 'Artistic Serif',
        heading: 'Times-Bold',
        body: 'Times-Roman',
        description: '艺术衬线风格'
    }
};

// ==========================================
// 根据内容类型推荐风格
// ==========================================
function recommendStyle(contentType) {
    const recommendations = {
        // 创意类
        'aurora': 'aurora',
        '极光': 'aurora',
        '创意': 'creative',
        'artistic': 'creative',
        'cyberpunk': 'cyberpunk',
        '赛博朋克': 'cyberpunk',
        '游戏': 'cyberpunk',
        '霓虹': 'cyberpunk',
        'gradient': 'gradient',
        '渐变': 'gradient',
        '品牌': 'gradient',
        'glass': 'glass',
        '玻璃': 'glass',
        '玻璃态': 'glass',
        '现代': 'glass',

        // 学术类
        'academic': 'academic',
        '学术': 'academic',
        '论文': 'academic',
        '研究': 'academic',

        // 商务类
        'corporate': 'corporate',
        '商务': 'corporate',
        '企业': 'business',
        '工作': 'corporate',
        '汇报': 'corporate',
        'finance': 'finance',
        '金融': 'finance',
        '财务': 'finance',
        '投资': 'finance',

        // 科技类
        'tech': 'tech',
        '科技': 'tech',
        'AI': 'tech',
        '互联网': 'tech',
        '技术': 'tech',

        // 设计类
        'minimal': 'minimal',
        '极简': 'minimal',
        '设计': 'minimal',
        'monochrome': 'monochrome',
        '单色': 'monochrome',
        '黑白': 'monochrome',
        '艺术': 'monochrome',
        '摄影': 'monochrome',

        // 自然类
        'nature': 'nature',
        '自然': 'nature',
        '环保': 'nature',
        '健康': 'nature',

        // 其他类
        'vintage': 'vintage',
        '复古': 'vintage',
        '历史': 'vintage',
        'energetic': 'energetic',
        '活力': 'energetic',
        '运动': 'energetic',
        'medical': 'medical',
        '医疗': 'medical',
        '医院': 'medical',
        'chinese': 'chinese',
        '中国风': 'chinese',
        '传统': 'chinese',
        '国风': 'chinese',
        'pastel': 'pastel',
        '柔和': 'pastel',
        '女性': 'pastel',
        '婚礼': 'pastel'
    };

    return recommendations[contentType] || 'academic';
}

// ==========================================
// 辅助函数
// ==========================================

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
    return FONT_PAIRINGS[pairingName] || FONT_PAIRINGS.classic;
}

// 解析颜色字符串为 RGB
function parseColor(colorStr) {
    // 处理 hex 格式
    let hex = colorStr.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

// 颜色插值
function interpolateColor(color1, color2, factor) {
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// RGB 转 Hex
function rgbToHex(r, g, b) {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// 获取颜色亮度
function getColorBrightness(colorStr) {
    const { r, g, b } = parseColor(colorStr);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// 判断是否为深色
function isDarkColor(colorStr) {
    return getColorBrightness(colorStr) < 128;
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
    parseColor,
    interpolateColor,
    rgbToHex,
    getColorBrightness,
    isDarkColor
};