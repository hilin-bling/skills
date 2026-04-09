/**
 * Gradient Generator - 渐变生成器
 *
 * 线性渐变
 * 径向渐变
 * 对角线渐变
 * Mesh 渐变（多色复杂渐变）
 */

// ==========================================
// 渐变配色方案库
// ==========================================
const GRADIENT_PRESETS = {
    // 极光渐变
    aurora: {
        colors: ['0f0c29', '302b63', '24243e', '00ff87', '60efff'],
        direction: 'diagonal',
        overlayColors: ['00ff87', '60efff', '00ff87'],
        overlayOpacity: 0.3
    },

    // 赛博朋克渐变
    cyberpunk: {
        colors: ['0a0a0a', '1a1a2e', '16213e'],
        direction: 'diagonal',
        neonColors: ['FF00FF', '00FFFF', 'FFFF00']
    },

    // 玻璃态渐变
    glassmorphism: {
        colors: ['e0e5ec', 'd1d9e6', 'c8d1db'],
        direction: 'diagonal',
        glassOpacity: 0.7
    },

    // 渐变流
    gradientFlow: {
        colors: ['667eea', '764ba2', 'f093fb', 'f5576c'],
        direction: 'flow',
        isMesh: true
    },

    // 柔和梦境
    pastel: {
        colors: ['ffeef8', 'ffe4f3', 'ffd6e7'],
        direction: 'diagonal'
    },

    // 学术蓝
    academic: {
        colors: ['1e3a5f', '2c5282', '3182ce'],
        direction: 'diagonal'
    },

    // 商务精英
    corporate: {
        colors: ['1a202c', '2d3748', '4a5568'],
        direction: 'diagonal'
    },

    // 科技未来
    tech: {
        colors: ['0f0f0f', '1a1a2e', '16213e'],
        direction: 'diagonal'
    },

    // 自然绿意
    nature: {
        colors: ['1a472a', '2d5a3d', '3d6b4f'],
        direction: 'diagonal'
    },

    // 复古怀旧
    vintage: {
        colors: ['5d4037', '6d4c41', '795548'],
        direction: 'diagonal'
    },

    // 活力橙黄
    energetic: {
        colors: ['ff6b35', 'ff8c42', 'ffa62b'],
        direction: 'diagonal'
    },

    // 医疗健康
    medical: {
        colors: ['0ea5e9', '38bdf8', '7dd3fc'],
        direction: 'diagonal'
    },

    // 金融财经
    finance: {
        colors: ['1e3a5f', '2c5282', '2b6cb0'],
        direction: 'diagonal'
    },

    // 中国风
    chinese: {
        colors: ['8B0000', 'A52A2A', 'B22222'],
        direction: 'diagonal'
    },

    // 创意艺术
    creative: {
        colors: ['7C3AED', 'EC4899', 'F59E0B', '22D3EE'],
        direction: 'radial',
        isMesh: true
    },

    // 企业标准
    business: {
        colors: ['1B4F72', '2E86AB'],
        direction: 'diagonal'
    },

    // 日落渐变
    sunset: {
        colors: ['F59E0B', 'EF4444', '7C3AED'],
        direction: 'horizontal'
    },

    // 海洋渐变
    ocean: {
        colors: ['0EA5E9', '0284C7', '0369A1'],
        direction: 'diagonal'
    },

    // 森林渐变
    forest: {
        colors: ['059669', '10B981', '34D399'],
        direction: 'diagonal'
    }
};

// ==========================================
// 颜色解析和转换
// ==========================================
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

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// 颜色插值
function interpolateColor(color1, color2, factor) {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);

    return rgbToHex(r, g, b);
}

// 多色渐变插值
function interpolateMultiColors(colors, factor) {
    if (colors.length === 1) return colors[0];

    const segment = factor * (colors.length - 1);
    const index = Math.floor(segment);
    const localFactor = segment - index;

    if (index >= colors.length - 1) {
        return colors[colors.length - 1];
    }

    return interpolateColor(colors[index], colors[index + 1], localFactor);
}

// ==========================================
// 渐变生成器类
// ==========================================
class GradientGenerator {
    constructor(doc) {
        this.doc = doc;
    }

    // 绘制线性渐变（水平）
    linearGradientHorizontal(x, y, width, height, colors) {
        const steps = 50;
        const stepWidth = width / steps;

        for (let i = 0; i < steps; i++) {
            const factor = i / steps;
            const color = interpolateMultiColors(colors, factor);
            const rgb = hexToRgb(color);

            this.doc.save();
            this.doc.fillColor([rgb.r, rgb.g, rgb.b]);
            this.doc.rect(x + i * stepWidth, y, stepWidth + 1, height).fill();
            this.doc.restore();
        }
    }

    // 绘制线性渐变（垂直）
    linearGradientVertical(x, y, width, height, colors) {
        const steps = 50;
        const stepHeight = height / steps;

        for (let i = 0; i < steps; i++) {
            const factor = i / steps;
            const color = interpolateMultiColors(colors, factor);
            const rgb = hexToRgb(color);

            this.doc.save();
            this.doc.fillColor([rgb.r, rgb.g, rgb.b]);
            this.doc.rect(x, y + i * stepHeight, width, stepHeight + 1).fill();
            this.doc.restore();
        }
    }

    // 绘制对角线渐变
    diagonalGradient(x, y, width, height, colors) {
        const steps = 50;

        for (let i = 0; i < steps; i++) {
            const factor = i / steps;
            const nextFactor = (i + 1) / steps;
            const color = interpolateMultiColors(colors, factor);
            const rgb = hexToRgb(color);

            this.doc.save();
            this.doc.fillColor([rgb.r, rgb.g, rgb.b]);

            // 对角线区域的四个顶点
            const x1 = x + factor * width;
            const y1 = y;
            const x2 = x + width;
            const y2 = y + factor * height;
            const x3 = x + width;
            const y3 = y + nextFactor * height;
            const x4 = x + nextFactor * width;
            const y4 = y;

            this.doc.moveTo(x1, y1)
                .lineTo(x2, y2)
                .lineTo(x3, y3)
                .lineTo(x4, y4)
                .fill();

            this.doc.restore();
        }
    }

    // 绘制径向渐变（从中心向外）
    radialGradient(centerX, centerY, radius, colors) {
        const steps = 30;

        for (let i = steps; i >= 0; i--) {
            const factor = i / steps;
            const color = interpolateMultiColors(colors.reverse(), factor);
            const rgb = hexToRgb(color);
            const currentRadius = radius * factor;

            this.doc.save();
            this.doc.fillColor([rgb.r, rgb.g, rgb.b]);
            this.doc.circle(centerX, centerY, currentRadius).fill();
            this.doc.restore();
        }
    }

    // 绘制全页渐变背景
    drawFullPageGradient(colors, direction = 'diagonal', pageWidth, pageHeight) {
        switch (direction) {
            case 'horizontal':
                this.linearGradientHorizontal(0, 0, pageWidth, pageHeight, colors);
                break;
            case 'vertical':
                this.linearGradientVertical(0, 0, pageWidth, pageHeight, colors);
                break;
            case 'diagonal':
                this.diagonalGradient(0, 0, pageWidth, pageHeight, colors);
                break;
            case 'radial':
                this.radialGradient(pageWidth / 2, pageHeight / 2, Math.max(pageWidth, pageHeight) / 2, colors);
                break;
            default:
                this.diagonalGradient(0, 0, pageWidth, pageHeight, colors);
        }
    }

    // 绘制带预设的渐变
    drawPresetGradient(presetName, x, y, width, height) {
        const preset = GRADIENT_PRESETS[presetName];
        if (!preset) {
            console.warn(`Gradient preset '${presetName}' not found`);
            return;
        }

        const colors = preset.colors.map(c => c.startsWith('#') ? c : '#' + c);

        switch (preset.direction) {
            case 'horizontal':
                this.linearGradientHorizontal(x, y, width, height, colors);
                break;
            case 'vertical':
                this.linearGradientVertical(x, y, width, height, colors);
                break;
            case 'diagonal':
            case 'flow':
                this.diagonalGradient(x, y, width, height, colors);
                break;
            case 'radial':
                this.radialGradient(x + width / 2, y + height / 2, Math.max(width, height) / 2, colors);
                break;
            default:
                this.diagonalGradient(x, y, width, height, colors);
        }
    }
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    GRADIENT_PRESETS,
    GradientGenerator,
    hexToRgb,
    rgbToHex,
    interpolateColor,
    interpolateMultiColors
};