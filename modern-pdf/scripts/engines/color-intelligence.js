/**
 * Color Intelligence System - 智能配色系统
 *
 * 自动配色生成
 * 颜色和谐性检查
 * 色彩对比度计算
 * 主题色彩提取
 */

// ==========================================
// 色彩理论基础
// ==========================================

// 色相环角度（用于和谐配色）
const HUE_ANGLE = {
    complementary: 180,      // 互补色
    analogous: 30,           // 类似色
    triadic: 120,            // 三角配色
    splitComplementary: 150, // 分裂互补
    tetradic: 90,            // 四角配色
    square: 90               // 方形配色
};

// ==========================================
// 颜色转换
// ==========================================

// Hex 到 RGB
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

// RGB 到 Hex
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// RGB 到 HSL
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
}

// HSL 到 RGB
function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// ==========================================
// 和谐配色生成
// ==========================================

// 生成互补色
function getComplementaryColor(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // 调整色相 180 度
    const newH = (hsl.h + 180) % 360;
    const newRgb = hslToRgb(newH, hsl.s, hsl.l);

    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// 生成类似色
function getAnalogousColors(hex, count = 2) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const colors = [];
    for (let i = 1; i <= count; i++) {
        const offset = i * HUE_ANGLE.analogous;
        const h1 = (hsl.h + offset) % 360;
        const h2 = (hsl.h - offset + 360) % 360;

        const rgb1 = hslToRgb(h1, hsl.s, hsl.l);
        const rgb2 = hslToRgb(h2, hsl.s, hsl.l);

        colors.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b));
        colors.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b));
    }

    return colors.slice(0, count);
}

// 生成三角配色
function getTriadicColors(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const colors = [];
    for (let i = 1; i <= 2; i++) {
        const h = (hsl.h + i * HUE_ANGLE.triadic) % 360;
        const newRgb = hslToRgb(h, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }

    return colors;
}

// 生成分裂互补色
function getSplitComplementaryColors(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const colors = [];
    const h1 = (hsl.h + HUE_ANGLE.splitComplementary) % 360;
    const h2 = (hsl.h - HUE_ANGLE.splitComplementary + 360) % 360;

    const rgb1 = hslToRgb(h1, hsl.s, hsl.l);
    const rgb2 = hslToRgb(h2, hsl.s, hsl.l);

    colors.push(rgbToHex(rgb1.r, rgb1.g, rgb1.b));
    colors.push(rgbToHex(rgb2.r, rgb2.g, rgb2.b));

    return colors;
}

// ==========================================
// 亮度调整
// ==========================================

// 调整亮度
function adjustLightness(hex, amount) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const newL = Math.min(100, Math.max(0, hsl.l + amount));
    const newRgb = hslToRgb(hsl.h, hsl.s, newL);

    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// 生成亮色变体
function getLighterVariant(hex, amount = 20) {
    return adjustLightness(hex, amount);
}

// 生成暗色变体
function getDarkerVariant(hex, amount = 20) {
    return adjustLightness(hex, -amount);
}

// ==========================================
// 饱和度调整
// ==========================================

// 调整饱和度
function adjustSaturation(hex, amount) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const newS = Math.min(100, Math.max(0, hsl.s + amount));
    const newRgb = hslToRgb(hsl.h, newS, hsl.l);

    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

// ==========================================
// 对比度计算（WCAG 标准）
// ==========================================

// 计算相对亮度
function getRelativeLuminance(rgb) {
    const { r, g, b } = rgb;
    const RsRGB = r / 255;
    const GsRGB = g / 255;
    const BsRGB = b / 255;

    const R = RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    const G = GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    const B = BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// 计算对比度比率
function getContrastRatio(color1, color2) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const L1 = getRelativeLuminance(rgb1);
    const L2 = getRelativeLuminance(rgb2);

    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);

    return (lighter + 0.05) / (darker + 0.05);
}

// 检查是否满足 WCAG AA 标准（对比度 >= 4.5）
function meetsWCAGAA(color1, color2) {
    return getContrastRatio(color1, color2) >= 4.5;
}

// 检查是否满足 WCAG AAA 标准（对比度 >= 7）
function meetsWCAGAAA(color1, color2) {
    return getContrastRatio(color1, color2) >= 7;
}

// ==========================================
// 自动配色方案生成
// ==========================================

// 从主色生成完整配色方案
function generateColorScheme(primaryColor) {
    const scheme = {
        primary: primaryColor,
        secondary: getComplementaryColor(primaryColor),
        accent: getTriadicColors(primaryColor)[0],
        background: getLighterVariant(primaryColor, 40),
        surface: '#FFFFFF',
        text: getDarkerVariant(primaryColor, 60),
        textMuted: getDarkerVariant(primaryColor, 40),
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
    };

    // 确保文本颜色有足够对比度
    if (!meetsWCAGAA(scheme.background, scheme.text)) {
        scheme.text = '#000000';
    }

    return scheme;
}

// 从图片/主题提取配色（简化版）
function extractColorsFromTheme(themeName) {
    // 预定义主题颜色
    const themeColors = {
        aurora: { primary: '#00FF87', background: '#0D1117' },
        cyberpunk: { primary: '#FF00FF', background: '#0D0D0D' },
        glass: { primary: '#4A5568', background: '#E8ECEF' },
        monochrome: { primary: '#0A0A0A', background: '#FAFAFA' },
        gradient: { primary: '#667EEA', background: '#FFFFFF' },
        pastel: { primary: '#FF8FAB', background: '#FFFBFE' },
        academic: { primary: '#2B6CB0', background: '#FFFFFF' },
        corporate: { primary: '#2D3748', background: '#FFFFFF' },
        tech: { primary: '#58A6FF', background: '#0D1117' },
        minimal: { primary: '#000000', background: '#FFFFFF' },
        nature: { primary: '#166534', background: '#F0FDF4' },
        vintage: { primary: '#5D4037', background: '#FFF8E1' },
        energetic: { primary: '#EA580C', background: '#FFFAF0' },
        medical: { primary: '#0369A1', background: '#F0F9FF' },
        finance: { primary: '#1A365D', background: '#FFFFFF' },
        chinese: { primary: '#8B0000', background: '#FFF8F0' },
        creative: { primary: '#7C3AED', background: '#FFFFFF' },
        business: { primary: '#1B4F72', background: '#FFFFFF' }
    };

    const theme = themeColors[themeName] || themeColors.academic;
    return generateColorScheme(theme.primary);
}

// ==========================================
// 颜色推荐
// ==========================================

// 根据场景推荐配色
function recommendColorsForScenario(scenario) {
    const recommendations = {
        'presentation': {
            primary: '#3B82F6',
            secondary: '#10B981',
            accent: '#F59E0B',
            description: '专业演讲配色'
        },
        'report': {
            primary: '#1E3A5F',
            secondary: '#2B6CB0',
            accent: '#D69E2E',
            description: '正式报告配色'
        },
        'creative': {
            primary: '#7C3AED',
            secondary: '#EC4899',
            accent: '#22D3EE',
            description: '创意设计配色'
        },
        'tech': {
            primary: '#58A6FF',
            secondary: '#238636',
            accent: '#F78166',
            description: '科技产品配色'
        },
        'education': {
            primary: '#059669',
            secondary: '#10B981',
            accent: '#F59E0B',
            description: '教育培训配色'
        },
        'marketing': {
            primary: '#EC4899',
            secondary: '#F472B6',
            accent: '#FBBF24',
            description: '营销推广配色'
        }
    };

    return recommendations[scenario] || recommendations.presentation;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    hexToRgb,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    getComplementaryColor,
    getAnalogousColors,
    getTriadicColors,
    getSplitComplementaryColors,
    adjustLightness,
    getLighterVariant,
    getDarkerVariant,
    adjustSaturation,
    getContrastRatio,
    meetsWCAGAA,
    meetsWCAGAAA,
    generateColorScheme,
    extractColorsFromTheme,
    recommendColorsForScenario
};