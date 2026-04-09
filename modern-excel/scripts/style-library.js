/**
 * Excel Style Library - 18 Professional Styles (v8.0)
 *
 * Each style is carefully designed with complete color schemes
 * Suitable for different scenarios: Academic reports, Financial statements,
 * Tech analysis, Healthcare dashboards, etc.
 *
 * v8.0 - Professional Edition:
 * - 18 styles matching modern-ppt aesthetic
 * - Enhanced typography hierarchy (7 levels)
 * - Professional table styling parameters
 * - Conditional formatting color maps
 * - Chart style presets
 * - Row height and spacing system
 */

// ==========================================
// Professional Design Base Parameters v8.0
// ==========================================
const MODERN_LAYOUT_BASE = {
    // Font size hierarchy (Professional design - 7 levels)
    typography: {
        heroTitle: 28,        // Sheet hero title - Largest
        title: 20,            // Section title
        header: 14,           // Column headers - Bold
        subheader: 12,        // Sub headers
        body: 11,             // Data cells - Regular
        caption: 10,          // Notes, comments
        small: 9              // Meta information
    },

    // Font family system
    fonts: {
        title: 'Arial',
        header: 'Arial',
        body: 'Arial',
        caption: 'Arial',
        // Chinese support
        chinese: 'Microsoft YaHei',
        chineseFallback: 'SimHei'
    },

    // Professional spacing system (based on Excel points)
    spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
        xxl: 32
    },

    // Professional row height system
    rowHeight: {
        heroTitle: 45,        // Hero title row
        title: 35,            // Title row
        header: 28,           // Header row - emphasized
        subheader: 24,        // Subheader row
        body: 22,             // Data row - comfortable reading
        compact: 18,          // Compact mode
        spacious: 26,         // Spacious mode
        summary: 26           // Summary/Total row
    },

    // Professional border styles
    borders: {
        thin: { style: 'thin', color: 'E5E7EB' },
        medium: { style: 'medium', color: 'D1D5DB' },
        header: { style: 'medium', color: null },  // Uses style color
        summary: { style: 'double', color: null },  // Double line for totals
        none: { style: 'none', color: null }
    },

    // Column width presets (in characters)
    columnWidth: {
        narrow: 10,
        standard: 15,
        wide: 20,
        extraWide: 30,
        auto: 'auto'
    },

    // Conditional formatting presets
    conditionalFormatting: {
        colorScale: {
            positive: ['FFFFFF', '10B981', '059669'],      // White to Green
            negative: ['FFFFFF', 'EF4444', 'DC2626'],      // White to Red
            neutral: ['FFFFFF', 'FBBF24', 'F59E0B'],       // White to Yellow
            performance: ['EF4444', 'FBBF24', '10B981']    // Red-Yellow-Green
        },
        dataBar: {
            positive: '10B981',
            negative: 'EF4444',
            neutral: '3B82F6'
        }
    },

    // Chart presets
    chartPresets: {
        default: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true
        },
        minimal: {
            showLegend: false,
            showTitle: true,
            showAxis: true,
            showGridLines: false
        },
        detailed: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            showDataLabels: true
        }
    },

    // Professional table parameters
    table: {
        // Header row styling
        header: {
            fontSize: 14,
            fontWeight: 'bold',
            horizontalAlignment: 'center',
            verticalAlignment: 'middle',
            rowHeight: 28,
            wrapText: true
        },
        // Data row styling
        data: {
            fontSize: 11,
            fontWeight: 'normal',
            horizontalAlignment: 'left',
            verticalAlignment: 'middle',
            rowHeight: 22,
            wrapText: false
        },
        // Number/currency cells
        number: {
            horizontalAlignment: 'right',
            numberFormat: '#,##0.00'
        },
        // Summary row styling
        summary: {
            fontSize: 12,
            fontWeight: 'bold',
            horizontalAlignment: 'right',
            verticalAlignment: 'middle',
            rowHeight: 26
        }
    }
};

// ==========================================
// 18 Professional Styles
// ==========================================
const STYLE_LIBRARY = {

    // ==========================================
    // 1. Aurora - Northern Lights Inspired
    // Dreamy gradient, creative showcase
    // ==========================================
    aurora: {
        name: 'Aurora',
        nameCN: '极光',
        category: 'creative',
        description: 'Northern lights inspired, dreamy gradient colors',
        descriptionCN: '北欧极光灵感，梦幻渐变色彩',
        colors: {
            primary: '00FF87',        // Aurora Green
            secondary: '60EFFF',      // Cyan
            accent: 'FF6B6B',         // Coral accent
            background: '0D1117',     // Dark background
            content: '161B22',        // Content background
            text: 'FFFFFF',           // White text
            textMuted: '8B949E',      // Muted text
            headerBg: '302B63',       // Header background (purple)
            headerText: 'FFFFFF',     // Header text
            dataBg: '21262D',         // Data cell background
            altRowBg: '161B22',       // Alternating row
            summaryBg: '302B63',      // Summary row background
            summaryText: 'FFFFFF',    // Summary row text
            border: '30363D',         // Border color
            positive: '00FF87',       // Positive indicator
            negative: 'FF6B6B',       // Negative indicator
            neutral: '60EFFF'         // Neutral indicator
        },
        isDark: true,
        effects: {
            glassmorphism: true,
            gradientHeader: true,
            neonGlow: false
        },
        chartColors: ['00FF87', '60EFFF', 'FF6B6B', 'A78BFA', 'F472B6'],
        conditionalFormat: {
            colorScalePositive: ['161B22', '00FF87', '059669'],
            colorScaleNegative: ['161B22', 'FF6B6B', 'DC2626'],
            dataBarPositive: '00FF87',
            dataBarNegative: 'FF6B6B'
        }
    },

    // ==========================================
    // 2. Cyberpunk - Neon Tech
    // Gaming reports, tech analytics
    // ==========================================
    cyberpunk: {
        name: 'Cyberpunk',
        nameCN: '赛博朋克',
        category: 'tech',
        description: 'Neon effects, dark tech aesthetic',
        descriptionCN: '霓虹灯效果，暗色科技感',
        colors: {
            primary: 'FF00FF',        // Magenta
            secondary: '00FFFF',      // Cyan
            accent: 'FFFF00',         // Yellow
            background: '0D0D0D',     // Black
            content: '111111',        // Dark gray
            text: 'FFFFFF',           // White
            textMuted: '888888',      // Gray
            headerBg: '1A1A2E',       // Header purple
            headerText: 'FF00FF',     // Neon header
            dataBg: '0A0A0A',         // Data cell
            altRowBg: '111111',       // Alternating
            summaryBg: '1A1A2E',      // Summary background
            summaryText: 'FFFF00',    // Summary text
            border: 'FF00FF',         // Neon border
            positive: '00FFFF',       // Cyan positive
            negative: 'FF00FF',       // Magenta negative
            neutral: 'FFFF00'         // Yellow neutral
        },
        isDark: true,
        effects: {
            neonGlow: true,
            scanlines: false,
            glitchEffect: false
        },
        chartColors: ['FF00FF', '00FFFF', 'FFFF00', 'FF6B6B', 'A78BFA'],
        conditionalFormat: {
            colorScalePositive: ['111111', '00FFFF', '00CED1'],
            colorScaleNegative: ['111111', 'FF00FF', 'DC2626'],
            dataBarPositive: '00FFFF',
            dataBarNegative: 'FF00FF'
        }
    },

    // ==========================================
    // 3. Glassmorphism - Modern Glass Design
    // Tech companies, modern brands
    // ==========================================
    glassmorphism: {
        name: 'Glassmorphism',
        nameCN: '玻璃态',
        category: 'modern',
        description: 'Modern glass-morphism design, translucent feel',
        descriptionCN: '现代玻璃拟态设计，通透质感',
        colors: {
            primary: '4A5568',        // Gray primary
            secondary: '718096',      // Light gray
            accent: '3182CE',         // Blue accent
            background: 'E8ECEF',     // Light background
            content: 'FFFFFF',        // White content
            text: '2D3748',           // Dark text
            textMuted: '718096',      // Muted
            headerBg: '4A5568',       // Header gray
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F7FAFC',       // Alternating
            summaryBg: '4A5568',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'CBD5E0',         // Border
            positive: '10B981',       // Green
            negative: 'EF4444',       // Red
            neutral: '3182CE'         // Blue
        },
        isDark: false,
        effects: {
            glassmorphism: true,
            gradientHeader: false,
            softShadow: true
        },
        chartColors: ['4A5568', '3182CE', '10B981', 'A78BFA', 'F472B6'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '10B981', '059669'],
            colorScaleNegative: ['FFFFFF', 'EF4444', 'DC2626'],
            dataBarPositive: '10B981',
            dataBarNegative: 'EF4444'
        }
    },

    // ==========================================
    // 4. Monochrome - Pure Monochrome
    // Art portfolios, high-end brands
    // ==========================================
    monochrome: {
        name: 'Monochrome',
        nameCN: '单色大师',
        category: 'artistic',
        description: 'Pure monochrome design, minimal elegance',
        descriptionCN: '纯粹单色设计，极简高雅',
        colors: {
            primary: '0A0A0A',        // Black
            secondary: '4A4A4A',      // Dark gray
            accent: '0A0A0A',         // Black accent
            background: 'FAFAFA',     // Light gray
            content: 'FFFFFF',        // White
            text: '0A0A0A',           // Black text
            textMuted: '6A6A6A',      // Gray
            headerBg: '0A0A0A',       // Black header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F5F5F5',       // Alternating
            summaryBg: '333333',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E5E5E5',         // Border
            positive: '0A0A0A',       // Black positive
            negative: '333333',       // Dark gray negative
            neutral: '666666'         // Gray neutral
        },
        isDark: false,
        effects: {
            highContrast: true,
            gradientHeader: false,
            softShadow: false
        },
        chartColors: ['0A0A0A', '333333', '666666', '999999', 'CCCCCC'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '666666', '0A0A0A'],
            colorScaleNegative: ['FFFFFF', '333333', '0A0A0A'],
            dataBarPositive: '0A0A0A',
            dataBarNegative: '333333'
        }
    },

    // ==========================================
    // 5. Gradient Flow - Dynamic Gradient
    // Brand showcases, product releases
    // ==========================================
    gradient: {
        name: 'Gradient Flow',
        nameCN: '渐变流',
        category: 'creative',
        description: 'Dynamic gradient backgrounds, fluid motion',
        descriptionCN: '动态渐变背景，流动感',
        colors: {
            primary: '667EEA',        // Blue-purple
            secondary: '764BA2',      // Purple
            accent: 'F5576C',         // Pink accent
            background: 'FFFFFF',     // White
            content: 'F7FAFC',        // Light gray
            text: '2D3748',           // Dark text
            textMuted: '718096',      // Muted
            headerBg: '667EEA',       // Gradient header start
            headerBgEnd: '764BA2',    // Gradient header end
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F7FAFC',       // Alternating
            summaryBg: '764BA2',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E2E8F0',         // Border
            positive: '667EEA',       // Blue positive
            negative: 'F5576C',       // Pink negative
            neutral: '764BA2'         // Purple neutral
        },
        isDark: false,
        effects: {
            gradientHeader: true,
            meshGradient: true,
            softShadow: true
        },
        chartColors: ['667EEA', '764BA2', 'F5576C', 'F093FB', '4FACFE'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '667EEA', '764BA2'],
            colorScaleNegative: ['FFFFFF', 'F5576C', 'DC2626'],
            dataBarPositive: '667EEA',
            dataBarNegative: 'F5576C'
        }
    },

    // ==========================================
    // 6. Pastel - Soft Macaron Tones
    // Lifestyle brands, wedding planning
    // ==========================================
    pastel: {
        name: 'Pastel',
        nameCN: '柔和梦境',
        category: 'lifestyle',
        description: 'Soft macaron tones, warm romantic',
        descriptionCN: '柔和马卡龙色调，温馨浪漫',
        colors: {
            primary: 'FF8FAB',        // Pink
            secondary: 'FFB8D0',      // Light pink
            accent: 'B8E6FF',         // Blue accent
            background: 'FFFBFE',     // White pink
            content: 'FFFFFF',        // White
            text: '5D4157',           // Dark pink text
            textMuted: '8B7B8B',      // Muted
            headerBg: 'FF8FAB',       // Pink header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'FFD6E7',       // Alternating pink
            summaryBg: 'FF8FAB',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'FFD6E7',         // Border
            positive: 'B8E6FF',       // Blue positive
            negative: 'FF8FAB',       // Pink negative
            neutral: 'FFB8D0'         // Light pink neutral
        },
        isDark: false,
        effects: {
            softShadow: true,
            roundedCorners: true,
            gradientHeader: false
        },
        chartColors: ['FF8FAB', 'FFB8D0', 'B8E6FF', 'FFD6E7', 'E8F4FF'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', 'B8E6FF', '87CEEB'],
            colorScaleNegative: ['FFFFFF', 'FF8FAB', 'FF69B4'],
            dataBarPositive: 'B8E6FF',
            dataBarNegative: 'FF8FAB'
        }
    },

    // ==========================================
    // 7. Academic - Professional Blue
    // Thesis data, research reports
    // ==========================================
    academic: {
        name: 'Academic',
        nameCN: '学术蓝',
        category: 'academic',
        description: 'Professional blue, rigorous academic',
        descriptionCN: '专业严谨，适合学术报告和论文答辩',
        colors: {
            primary: '2B6CB0',        // Blue
            secondary: '3182CE',      // Light blue
            accent: 'DD6B20',         // Orange accent
            background: 'FFFFFF',     // White
            content: 'F7FAFC',        // Light gray
            text: '1A365D',           // Dark blue text
            textMuted: '4A5568',      // Muted
            headerBg: '2B6CB0',       // Blue header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'EBF8FF',       // Alternating blue
            summaryBg: '2B6CB0',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'CBD5E0',         // Border
            positive: '2B6CB0',       // Blue positive
            negative: 'C53030',       // Red negative
            neutral: 'DD6B20'         // Orange neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['2B6CB0', '3182CE', 'DD6B20', '38A169', '805AD5'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '38A169', '2B6CB0'],
            colorScaleNegative: ['FFFFFF', 'C53030', '9B2C2C'],
            dataBarPositive: '2B6CB0',
            dataBarNegative: 'C53030'
        }
    },

    // ==========================================
    // 8. Business Elite - Professional Corporate
    // Annual reports, quarterly summaries
    // ==========================================
    corporate: {
        name: 'Business Elite',
        nameCN: '商务精英',
        category: 'business',
        description: 'Professional corporate, efficient clean',
        descriptionCN: '专业干练，适合商务汇报和年终总结',
        colors: {
            primary: '2D3748',        // Dark gray
            secondary: '4A5568',      // Gray
            accent: 'C53030',         // Red accent
            background: 'FFFFFF',     // White
            content: 'F7FAFC',        // Light gray
            text: '1A202C',           // Dark text
            textMuted: '718096',      // Muted
            headerBg: '2D3748',       // Gray header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F7FAFC',       // Alternating
            summaryBg: '2D3748',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E2E8F0',         // Border
            positive: '2D3748',       // Gray positive
            negative: 'C53030',       // Red negative
            neutral: '4A5568'         // Gray neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['2D3748', '4A5568', 'C53030', '38A169', '3182CE'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '38A169', '2D3748'],
            colorScaleNegative: ['FFFFFF', 'C53030', '9B2C2C'],
            dataBarPositive: '2D3748',
            dataBarNegative: 'C53030'
        }
    },

    // ==========================================
    // 9. Tech Future - Cutting-edge Innovation
    // AI data, tech product analysis
    // ==========================================
    tech: {
        name: 'Tech Future',
        nameCN: '科技未来',
        category: 'tech',
        description: 'Cutting-edge innovation, futuristic',
        descriptionCN: '前沿创新，适合科技产品和AI展示',
        colors: {
            primary: '58A6FF',        // GitHub blue
            secondary: '238636',      // GitHub green
            accent: 'F78166',         // GitHub orange
            background: '0D1117',     // GitHub dark
            content: '161B22',        // Content dark
            text: 'C9D1D9',           // Light text
            textMuted: '8B949E',      // Muted
            headerBg: '58A6FF',       // Blue header
            headerText: '0D1117',     // Dark header text
            dataBg: '161B22',         // Dark data
            altRowBg: '21262D',       // Alternating
            summaryBg: '58A6FF',      // Summary background
            summaryText: '0D1117',    // Summary text
            border: '30363D',         // Border
            positive: '238636',       // Green positive
            negative: 'F78166',       // Orange negative
            neutral: '58A6FF'         // Blue neutral
        },
        isDark: true,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['58A6FF', '238636', 'F78166', 'A78BFA', 'F472B6'],
        conditionalFormat: {
            colorScalePositive: ['161B22', '238636', '2EA043'],
            colorScaleNegative: ['161B22', 'F78166', 'DA3633'],
            dataBarPositive: '238636',
            dataBarNegative: 'F78166'
        }
    },

    // ==========================================
    // 10. Minimalist - Simple Pure
    // Design portfolios, minimal reports
    // ==========================================
    minimal: {
        name: 'Minimalist',
        nameCN: '极简主义',
        category: 'minimal',
        description: 'Simple pure, whitespace-focused',
        descriptionCN: '简洁纯粹，适合设计展示和艺术汇报',
        colors: {
            primary: '000000',        // Black
            secondary: '666666',      // Gray
            accent: 'E53935',         // Red accent
            background: 'FFFFFF',     // White
            content: 'FFFFFF',        // White
            text: '000000',           // Black text
            textMuted: '757575',      // Muted
            headerBg: '000000',       // Black header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'FAFAFA',       // Alternating
            summaryBg: '000000',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E0E0E0',         // Border
            positive: '000000',       // Black positive
            negative: 'E53935',       // Red negative
            neutral: '666666'         // Gray neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['000000', '666666', 'E53935', '999999', 'CCCCCC'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '666666', '000000'],
            colorScaleNegative: ['FFFFFF', 'E53935', 'C62828'],
            dataBarPositive: '000000',
            dataBarNegative: 'E53935'
        }
    },

    // ==========================================
    // 11. Natural Green - Fresh Nature
    // Environmental data, health reports
    // ==========================================
    nature: {
        name: 'Natural Green',
        nameCN: '自然绿意',
        category: 'nature',
        description: 'Fresh nature, eco-friendly',
        descriptionCN: '清新自然，适合环保项目和健康主题',
        colors: {
            primary: '166534',        // Dark green
            secondary: '22C55E',      // Bright green
            accent: '84CC16',         // Lime accent
            background: 'F0FDF4',     // Light green
            content: 'FFFFFF',        // White
            text: '14532D',           // Dark green text
            textMuted: '4ADE80',      // Bright green muted
            headerBg: '166534',       // Green header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F0FDF4',       // Alternating green
            summaryBg: '166534',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'BBF7D0',         // Border
            positive: '22C55E',       // Green positive
            negative: 'EF4444',       // Red negative
            neutral: '84CC16'         // Lime neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['166534', '22C55E', '84CC16', '4ADE80', 'BBF7D0'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '22C55E', '166534'],
            colorScaleNegative: ['FFFFFF', 'EF4444', 'DC2626'],
            dataBarPositive: '22C55E',
            dataBarNegative: 'EF4444'
        }
    },

    // ==========================================
    // 12. Retro - Warm Nostalgic
    // Historical data, anniversary reports
    // ==========================================
    vintage: {
        name: 'Retro',
        nameCN: '复古怀旧',
        category: 'vintage',
        description: 'Warm nostalgic, vintage classic',
        descriptionCN: '温暖怀旧，适合历史回顾和传统文化',
        colors: {
            primary: '5D4037',        // Brown
            secondary: '8D6E63',      // Light brown
            accent: 'FF8F00',         // Orange accent
            background: 'FFF8E1',     // Warm white
            content: 'FFFBF0',        // Warm
            text: '3E2723',           // Dark brown text
            textMuted: '6D4C41',      // Muted
            headerBg: '5D4037',       // Brown header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFBF0',         // Warm data
            altRowBg: 'FFF8E1',       // Alternating
            summaryBg: '5D4037',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'D7CCC8',         // Border
            positive: '5D4037',       // Brown positive
            negative: 'C53030',       // Red negative
            neutral: 'FF8F00'         // Orange neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['5D4037', '8D6E63', 'FF8F00', 'D7CCC8', 'EFEBE9'],
        conditionalFormat: {
            colorScalePositive: ['FFFBF0', '8D6E63', '5D4037'],
            colorScaleNegative: ['FFFBF0', 'C53030', '9B2C2C'],
            dataBarPositive: '5D4037',
            dataBarNegative: 'C53030'
        }
    },

    // ==========================================
    // 13. Vibrant - Energetic Orange-yellow
    // Fitness tracking, youth analytics
    // ==========================================
    energetic: {
        name: 'Vibrant',
        nameCN: '活力橙黄',
        category: 'energetic',
        description: 'Energetic orange-yellow, dynamic',
        descriptionCN: '充满能量，适合运动健身和年轻群体',
        colors: {
            primary: 'EA580C',        // Orange
            secondary: 'F97316',      // Light orange
            accent: 'FBBF24',         // Yellow accent
            background: 'FFFAF0',     // Warm white
            content: 'FFFFFF',        // White
            text: '7C2D12',           // Dark orange text
            textMuted: 'C2410C',      // Muted
            headerBg: 'EA580C',       // Orange header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'FED7AA',       // Alternating orange
            summaryBg: 'EA580C',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'FED7AA',         // Border
            positive: 'EA580C',       // Orange positive
            negative: 'EF4444',       // Red negative
            neutral: 'FBBF24'         // Yellow neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['EA580C', 'F97316', 'FBBF24', 'FED7AA', 'FFF7ED'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', 'F97316', 'EA580C'],
            colorScaleNegative: ['FFFFFF', 'EF4444', 'DC2626'],
            dataBarPositive: 'EA580C',
            dataBarNegative: 'EF4444'
        }
    },

    // ==========================================
    // 14. Healthcare - Professional Medical
    // Medical reports, health dashboards
    // ==========================================
    medical: {
        name: 'Healthcare',
        nameCN: '医疗健康',
        category: 'medical',
        description: 'Professional medical, trustworthy',
        descriptionCN: '专业可信，适合医疗报告和健康科普',
        colors: {
            primary: '0369A1',        // Blue
            secondary: '0284C7',      // Light blue
            accent: '10B981',         // Green accent
            background: 'F0F9FF',     // Light blue
            content: 'FFFFFF',        // White
            text: '0C4A6E',           // Dark blue text
            textMuted: '0369A1',      // Muted
            headerBg: '0369A1',       // Blue header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'BAE6FD',       // Alternating blue
            summaryBg: '0369A1',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'BAE6FD',         // Border
            positive: '10B981',       // Green positive
            negative: 'EF4444',       // Red negative
            neutral: '0284C7'         // Blue neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['0369A1', '0284C7', '10B981', 'BAE6FD', '7DD3FC'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '10B981', '059669'],
            colorScaleNegative: ['FFFFFF', 'EF4444', 'DC2626'],
            dataBarPositive: '10B981',
            dataBarNegative: 'EF4444'
        }
    },

    // ==========================================
    // 15. Finance - Steady Professional
    // Financial statements, investment analysis
    // ==========================================
    finance: {
        name: 'Finance',
        nameCN: '金融财经',
        category: 'finance',
        description: 'Steady professional, financial',
        descriptionCN: '稳重专业，适合财务报告和投资分析',
        colors: {
            primary: '1A365D',        // Dark blue
            secondary: '2B6CB0',      // Blue
            accent: 'D69E2E',         // Gold accent
            background: 'FFFFFF',     // White
            content: 'EBF8FF',        // Light blue
            text: '1A202C',           // Dark text
            textMuted: '4A5568',      // Muted
            headerBg: '1A365D',       // Blue header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'EBF8FF',       // Alternating blue
            summaryBg: '1A365D',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'BEE3F8',         // Border
            positive: 'D69E2E',       // Gold positive
            negative: 'C53030',       // Red negative
            neutral: '2B6CB0'         // Blue neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['1A365D', '2B6CB0', 'D69E2E', '38A169', '805AD5'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', 'D69E2E', 'B7791F'],
            colorScaleNegative: ['FFFFFF', 'C53030', '9B2C2C'],
            dataBarPositive: 'D69E2E',
            dataBarNegative: 'C53030'
        }
    },

    // ==========================================
    // 16. Chinese Style - Traditional Elegant
    // Traditional culture, Chinese brand data
    // ==========================================
    chinese: {
        name: 'Chinese Style',
        nameCN: '中国风',
        category: 'cultural',
        description: 'Traditional elegant, Chinese aesthetics',
        descriptionCN: '传统典雅，适合传统文化和国风主题',
        colors: {
            primary: '8B0000',        // Dark red
            secondary: 'D4AF37',      // Gold
            accent: '2F4F4F',         // Dark slate
            background: 'FFF8F0',     // Warm white
            content: 'FFFAF5',        // Warm
            text: '3C1E1E',           // Dark text
            textMuted: '6B4423',      // Muted
            headerBg: '8B0000',       // Red header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFAF5',         // Warm data
            altRowBg: 'FFF8F0',       // Alternating
            summaryBg: '8B0000',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'DEB887',         // Border (burlywood)
            positive: 'D4AF37',       // Gold positive
            negative: 'C53030',       // Red negative
            neutral: '8B0000'         // Red neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['8B0000', 'D4AF37', '2F4F4F', 'DEB887', 'FFE4C4'],
        conditionalFormat: {
            colorScalePositive: ['FFFAF5', 'D4AF37', 'B8860B'],
            colorScaleNegative: ['FFFAF5', 'C53030', '9B2C2C'],
            dataBarPositive: 'D4AF37',
            dataBarNegative: 'C53030'
        }
    },

    // ==========================================
    // 17. Creative - Artistic Creative
    // Creative industry, art analytics
    // ==========================================
    creative: {
        name: 'Creative',
        nameCN: '创意艺术',
        category: 'creative',
        description: 'Artistic creative, expressive',
        descriptionCN: '创意艺术风格，适合创意行业',
        colors: {
            primary: 'F472B6',        // Pink
            secondary: 'A78BFA',      // Purple
            accent: '34D399',         // Green accent
            background: 'FFFFFF',     // White
            content: 'FDF4FF',        // Light purple
            text: '18181B',           // Dark text
            textMuted: '71717A',      // Muted
            headerBg: 'F472B6',       // Pink header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'FDF4FF',       // Alternating purple
            summaryBg: 'A78BFA',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'F5D0FE',         // Border
            positive: '34D399',       // Green positive
            negative: 'F472B6',       // Pink negative
            neutral: 'A78BFA'         // Purple neutral
        },
        isDark: false,
        effects: {
            gradientHeader: true,
            softShadow: true,
            cleanLines: false
        },
        chartColors: ['F472B6', 'A78BFA', '34D399', 'FBBF24', '60A5FA'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '34D399', '059669'],
            colorScaleNegative: ['FFFFFF', 'F472B6', 'DB2777'],
            dataBarPositive: '34D399',
            dataBarNegative: 'F472B6'
        }
    },

    // ==========================================
    // 18. Corporate Standard - Standard Corporate
    // Standard reports, enterprise data
    // ==========================================
    corporateStandard: {
        name: 'Corporate Standard',
        nameCN: '企业标准',
        category: 'business',
        description: 'Standard corporate, reliable',
        descriptionCN: '企业标准风格，适合标准报告',
        colors: {
            primary: '1E40AF',        // Blue
            secondary: '3B82F6',      // Light blue
            accent: '059669',         // Green accent
            background: 'FFFFFF',     // White
            content: 'F3F4F6',        // Light gray
            text: '111827',           // Dark text
            textMuted: '6B7280',      // Muted
            headerBg: '1E40AF',       // Blue header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'F3F4F6',       // Alternating
            summaryBg: '1E40AF',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E5E7EB',         // Border
            positive: '059669',       // Green positive
            negative: 'DC2626',       // Red negative
            neutral: '3B82F6'         // Blue neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['1E40AF', '3B82F6', '059669', 'F59E0B', 'EF4444'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', '059669', '047857'],
            colorScaleNegative: ['FFFFFF', 'DC2626', 'B91C1C'],
            dataBarPositive: '059669',
            dataBarNegative: 'DC2626'
        }
    },

    // ==========================================
    // Aliases for backward compatibility
    // ==========================================

    // Deep Space alias
    deepSpace: {
        name: 'Deep Space',
        nameCN: '深空紫',
        category: 'fashion',
        description: 'Mysterious elegant, product launch',
        descriptionCN: '神秘优雅，适合产品发布和科技展示',
        colors: {
            primary: '7C3AED',        // Purple
            secondary: 'EC4899',      // Pink
            accent: '06B6D4',         // Cyan
            background: '1A1A2E',     // Dark
            content: '16213E',        // Content dark
            text: 'FAFAFA',           // Light text
            textMuted: '6B7280',      // Muted
            headerBg: '7C3AED',       // Purple header
            headerText: 'FFFFFF',     // White header
            dataBg: '16213E',         // Dark data
            altRowBg: '0F3460',       // Alternating
            summaryBg: '7C3AED',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'E5E7EB',         // Border
            positive: '06B6D4',       // Cyan positive
            negative: 'EC4899',       // Pink negative
            neutral: '7C3AED'         // Purple neutral
        },
        isDark: true,
        effects: {
            gradientHeader: true,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['7C3AED', 'EC4899', '06B6D4', 'F472B6', 'A78BFA'],
        conditionalFormat: {
            colorScalePositive: ['16213E', '06B6D4', '0891B2'],
            colorScaleNegative: ['16213E', 'EC4899', 'DB2777'],
            dataBarPositive: '06B6D4',
            dataBarNegative: 'EC4899'
        }
    },

    // Playful alias
    playful: {
        name: 'Playful',
        nameCN: '可爱童趣',
        category: 'cute',
        description: 'Playful warm, children education',
        descriptionCN: '活泼温暖，适合儿童教育和亲子活动',
        colors: {
            primary: 'EC4899',        // Pink
            secondary: 'F472B6',      // Light pink
            accent: 'FBBF24',         // Yellow accent
            background: 'FFFBEB',     // Warm white
            content: 'FFFFFF',        // White
            text: '831843',           // Dark pink text
            textMuted: '9D174D',      // Muted
            headerBg: 'EC4899',       // Pink header
            headerText: 'FFFFFF',     // White header
            dataBg: 'FFFFFF',         // White data
            altRowBg: 'FBCFE8',       // Alternating pink
            summaryBg: 'EC4899',      // Summary background
            summaryText: 'FFFFFF',    // Summary text
            border: 'FBCFE8',         // Border
            positive: 'FBBF24',       // Yellow positive
            negative: 'EC4899',       // Pink negative
            neutral: 'F472B6'         // Light pink neutral
        },
        isDark: false,
        effects: {
            gradientHeader: false,
            softShadow: false,
            cleanLines: true
        },
        chartColors: ['EC4899', 'F472B6', 'FBBF24', 'FBCFE8', 'FCE7F3'],
        conditionalFormat: {
            colorScalePositive: ['FFFFFF', 'FBBF24', 'F59E0B'],
            colorScaleNegative: ['FFFFFF', 'EC4899', 'DB2777'],
            dataBarPositive: 'FBBF24',
            dataBarNegative: 'EC4899'
        }
    }
};

// ==========================================
// Style Categories
// ==========================================
const STYLE_CATEGORIES = {
    creative: { name: 'Creative Design', nameCN: '创意设计', styles: ['aurora', 'gradient', 'creative', 'deepSpace'] },
    academic: { name: 'Academic Reports', nameCN: '学术报告', styles: ['academic'] },
    cute: { name: 'Playful & Pastel', nameCN: '可爱童趣', styles: ['playful', 'pastel'] },
    business: { name: 'Business Reports', nameCN: '商务汇报', styles: ['corporate', 'finance', 'corporateStandard'] },
    tech: { name: 'Technology', nameCN: '科技前沿', styles: ['tech', 'cyberpunk', 'aurora'] },
    minimal: { name: 'Minimal Design', nameCN: '极简设计', styles: ['minimal', 'monochrome'] },
    nature: { name: 'Natural & Eco', nameCN: '自然清新', styles: ['nature'] },
    vintage: { name: 'Vintage & Retro', nameCN: '复古怀旧', styles: ['vintage'] },
    energetic: { name: 'Energetic', nameCN: '活力能量', styles: ['energetic'] },
    medical: { name: 'Healthcare', nameCN: '医疗健康', styles: ['medical'] },
    cultural: { name: 'Cultural', nameCN: '文化艺术', styles: ['chinese'] },
    modern: { name: 'Modern Design', nameCN: '现代简约', styles: ['glassmorphism', 'minimal'] },
    lifestyle: { name: 'Lifestyle', nameCN: '生活方式', styles: ['pastel', 'nature'] },
    artistic: { name: 'Artistic', nameCN: '艺术展示', styles: ['monochrome', 'gradient'] },
    finance: { name: 'Financial', nameCN: '金融财经', styles: ['finance', 'corporate'] }
};

// ==========================================
// Content Type to Style Recommendations
// ==========================================
function recommendStyle(contentType) {
    const recommendations = {
        // Standard mappings
        'product': 'deepSpace',
        '产品汇报': 'deepSpace',
        'academic': 'academic',
        '学术报告': 'academic',
        '论文答辩': 'academic',
        '研究数据': 'academic',
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
        '国风': 'chinese',

        // v8.0 new mappings
        'aurora': 'aurora',
        '极光': 'aurora',
        '创意': 'aurora',
        'cyberpunk': 'cyberpunk',
        '赛博朋克': 'cyberpunk',
        '游戏': 'cyberpunk',
        '霓虹': 'cyberpunk',
        'pastel': 'pastel',
        '柔和': 'pastel',
        '女性': 'pastel',
        '婚礼': 'pastel',
        'gradient': 'gradient',
        '渐变': 'gradient',
        '品牌': 'gradient',
        'glass': 'glassmorphism',
        '玻璃': 'glassmorphism',
        '玻璃态': 'glassmorphism',
        '现代': 'glassmorphism',
        'monochrome': 'monochrome',
        '单色': 'monochrome',
        '黑白': 'monochrome',
        '艺术': 'monochrome',
        '摄影': 'monochrome',

        // Table type recommendations
        '财务报表': 'finance',
        '项目进度': 'corporate',
        '分析报告': 'academic',
        '对比表': 'minimal',
        '仪表盘': 'tech',
        '时间线': 'vintage',

        // Industry recommendations
        '数据分析': 'tech',
        '销售报表': 'corporateStandard',
        '人力资源': 'corporate',
        '市场分析': 'creative'
    };

    return recommendations[contentType] || 'corporateStandard';
}

// ==========================================
// Helper Functions
// ==========================================

function getAllStyleNames() {
    return Object.keys(STYLE_LIBRARY);
}

function getStyle(styleName) {
    return STYLE_LIBRARY[styleName] || STYLE_LIBRARY.corporateStandard;
}

function getStylesByCategory(category) {
    const cat = STYLE_CATEGORIES[category];
    if (!cat) return [];
    return cat.styles.map(s => ({ key: s, ...STYLE_LIBRARY[s] }));
}

// Convert hex color to Excel RGB format
function hexToRGB(hex) {
    if (!hex) return { r: 0, g: 0, b: 0 };
    hex = hex.replace('#', '');
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

// Get Excel color ARGB format (for openpyxl/xlsxwriter)
function hexToARGB(hex, alpha = 'FF') {
    if (!hex) return 'FF000000';
    hex = hex.replace('#', '');
    return `${alpha}${hex}`;
}

// Lighten a hex color by percentage
function lightenColor(hex, percent) {
    if (!hex) return hex;
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Darken a hex color by percentage
function darkenColor(hex, percent) {
    if (!hex) return hex;
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

// Calculate contrast ratio for accessibility
function getContrastRatio(color1, color2) {
    const hexToRgb = (hex) => {
        hex = hex.replace('#', '');
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    };

    const getLuminance = (rgb) => {
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const L1 = getLuminance(hexToRgb(color1));
    const L2 = getLuminance(hexToRgb(color2));
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// Get optimal text color for background
function getOptimalTextColor(bgColor, darkColor = '000000', lightColor = 'FFFFFF') {
    const contrastWithDark = getContrastRatio(bgColor, darkColor);
    const contrastWithLight = getContrastRatio(bgColor, lightColor);
    return contrastWithDark > contrastWithLight ? darkColor : lightColor;
}

module.exports = {
    STYLE_LIBRARY,
    STYLE_CATEGORIES,
    MODERN_LAYOUT_BASE,
    recommendStyle,
    getAllStyleNames,
    getStyle,
    getStylesByCategory,
    hexToRGB,
    hexToARGB,
    lightenColor,
    darkenColor,
    getContrastRatio,
    getOptimalTextColor
};