/**
 * 动画库 - 切换动画和元素动画
 *
 * v2.0 - 新增三套动画模板系统
 */

// ==========================================
// 切换动画类型
// ==========================================
const TRANSITIONS = {
    // 基础切换
    fade: { type: 'fade' },
    push: { type: 'push' },
    wipe: { type: 'wipe' },
    split: { type: 'split' },
    reveal: { type: 'reveal' },
    wheel: { type: 'wheel' },
    random: { type: 'random' },
    blinds: { type: 'blinds' },
    checkerboard: { type: 'checker' },
    dissolve: { type: 'dissolve' },

    // 高级切换
    fadeThroughBlack: { type: 'fade', advanceOnTime: true },
    pushLeft: { type: 'push', direction: 'l' },
    pushRight: { type: 'push', direction: 'r' },
    pushUp: { type: 'push', direction: 'u' },
    pushDown: { type: 'push', direction: 'd' },
    wipeLeft: { type: 'wipe', direction: 'l' },
    wipeRight: { type: 'wipe', direction: 'r' },
    wipeUp: { type: 'wipe', direction: 'u' },
    wipeDown: { type: 'wipe', direction: 'd' },
    splitVertical: { type: 'split', direction: 'vert' },
    splitHorizontal: { type: 'split', direction: 'horz' },

    // 炫酷切换
    zoom: { type: 'zoom' },
    circle: { type: 'circle' },
    diamond: { type: 'diamond' },
    wedge: { type: 'wedge' },
    comb: { type: 'comb' },
    cover: { type: 'cover' },
    pull: { type: 'pull' },
    strips: { type: 'strips' },
    newsflash: { type: 'newsflash' }
};

// ==========================================
// 元素动画类型
// ==========================================
const ANIMATIONS = {
    // 进入动画
    appear: { type: 'appear' },
    fade: { type: 'fade' },
    flyIn: { type: 'fly' },
    floatIn: { type: 'float' },
    split: { type: 'split' },
    wipe: { type: 'wipe' },
    shape: { type: 'shape' },
    wheel: { type: 'wheel' },
    randomBars: { type: 'randomBar' },
    growAndTurn: { type: 'growTurn' },
    zoom: { type: 'zoom' },
    swivel: { type: 'swivel' },
    bounce: { type: 'bounce' },
    spinner: { type: 'spinner' },
    wedge: { type: 'wedge' },
    dissolveIn: { type: 'dissolveIn' },

    // 方向变体
    flyInFromLeft: { type: 'fly', direction: 'l' },
    flyInFromRight: { type: 'fly', direction: 'r' },
    flyInFromTop: { type: 'fly', direction: 't' },
    flyInFromBottom: { type: 'fly', direction: 'b' },
    floatInFromLeft: { type: 'float', direction: 'l' },
    floatInFromRight: { type: 'float', direction: 'r' },
    floatInFromTop: { type: 'float', direction: 't' },
    floatInFromBottom: { type: 'float', direction: 'b' },
    zoomIn: { type: 'zoom', direction: 'in' },
    zoomOut: { type: 'zoom', direction: 'out' },
    growShrink: { type: 'growShrink' },
    bounceFromLeft: { type: 'bounce', direction: 'l' },
    bounceFromRight: { type: 'bounce', direction: 'r' },
    bounceFromTop: { type: 'bounce', direction: 't' },
    bounceFromBottom: { type: 'bounce', direction: 'b' },

    // 强调动画
    pulse: { type: 'pulse' },
    colorPulse: { type: 'colorpulse' },
    teeter: { type: 'teeter' },
    spin: { type: 'spin' },
    grow: { type: 'grow' },
    shrink: { type: 'shrink' },
    darken: { type: 'darken' },
    lighten: { type: 'lighten' },
    transparency: { type: 'transparency' },
    objectColor: { type: 'objectcolor' },
    complementColor: { type: 'complementcolor' },
    lineColor: { type: 'linecolor' },
    flashBulb: { type: 'flashBulb' },
    wave: { type: 'wave' },

    // 退出动画
    disappear: { type: 'disappear' },
    fadeOut: { type: 'fadeout' },
    flyOut: { type: 'flyout' },
    floatOut: { type: 'floatout' },
    zoomOutExit: { type: 'zoomout' },
    shrinkOut: { type: 'shrinkout' }
};

// ==========================================
// 风格动画配置（兼容旧版）
// ==========================================
const STYLE_ANIMATIONS = {
    deepSpace: {
        slideTransition: 'fade',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromBottom',
        cardAnimation: 'zoomIn',
        statsAnimation: 'grow'
    },
    academic: {
        slideTransition: 'wipeLeft',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromLeft',
        cardAnimation: 'fade',
        statsAnimation: 'grow'
    },
    playful: {
        slideTransition: 'push',
        titleAnimation: 'bounce',
        contentAnimation: 'floatInFromBottom',
        cardAnimation: 'zoomIn',
        statsAnimation: 'pulse'
    },
    corporate: {
        slideTransition: 'fade',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromLeft',
        cardAnimation: 'fade',
        statsAnimation: 'grow'
    },
    tech: {
        slideTransition: 'fadeThroughBlack',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromRight',
        cardAnimation: 'zoomIn',
        statsAnimation: 'grow'
    },
    minimal: {
        slideTransition: 'fade',
        titleAnimation: 'fade',
        contentAnimation: 'fade',
        cardAnimation: 'fade',
        statsAnimation: 'fade'
    },
    nature: {
        slideTransition: 'wipeRight',
        titleAnimation: 'fade',
        contentAnimation: 'floatInFromLeft',
        cardAnimation: 'grow',
        statsAnimation: 'grow'
    },
    vintage: {
        slideTransition: 'dissolve',
        titleAnimation: 'fade',
        contentAnimation: 'fade',
        cardAnimation: 'fade',
        statsAnimation: 'grow'
    },
    energetic: {
        slideTransition: 'pushLeft',
        titleAnimation: 'bounce',
        contentAnimation: 'flyInFromBottom',
        cardAnimation: 'zoomIn',
        statsAnimation: 'pulse'
    },
    medical: {
        slideTransition: 'fade',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromLeft',
        cardAnimation: 'fade',
        statsAnimation: 'grow'
    },
    finance: {
        slideTransition: 'fade',
        titleAnimation: 'fade',
        contentAnimation: 'flyInFromLeft',
        cardAnimation: 'fade',
        statsAnimation: 'grow'
    },
    chinese: {
        slideTransition: 'dissolve',
        titleAnimation: 'fade',
        contentAnimation: 'floatInFromBottom',
        cardAnimation: 'zoomIn',
        statsAnimation: 'grow'
    }
};

// ==========================================
// 三套预设动画模板
// ==========================================
const ANIMATION_TEMPLATES = {
    // 模板 A：专业简洁（商务汇报）
    professional: {
        name: 'professional',
        displayName: '专业简洁',
        description: '适合商务汇报、年终总结、工作汇报',
        transitions: {
            default: { type: 'fade', speed: 'fast' },
            cover: { type: 'fade', speed: 'med' },
            content: { type: 'fade', speed: 'fast' },
            end: { type: 'fade', speed: 'fast' }
        },
        elements: {
            title: { type: 'fade', delay: 0 },
            subtitle: { type: 'fade', delay: 150 },
            content: { type: 'fade', delay: 200 },
            cards: { type: 'fade', cascade: true, delay: 100, increment: 100 },
            stats: { type: 'grow', cascade: true, delay: 100, increment: 80 }
        },
        emphasis: false
    },

    // 模板 B：适度炫酷（产品展示）
    moderate: {
        name: 'moderate',
        displayName: '适度炫酷',
        description: '适合产品发布、项目介绍、科技展示',
        transitions: {
            default: { type: 'zoom', speed: 'med' },
            cover: { type: 'fade', speed: 'slow' },
            content: { type: 'wipeRight', speed: 'med' },
            timeline: { type: 'pushLeft', speed: 'med' },
            end: { type: 'zoom', speed: 'slow' }
        },
        elements: {
            title: { type: 'flyInFromBottom', delay: 0 },
            subtitle: { type: 'fade', delay: 200 },
            content: { type: 'fade', delay: 300 },
            cards: { type: 'zoomIn', cascade: true, delay: 150, increment: 120 },
            stats: { type: 'grow', cascade: true, delay: 200, increment: 100 }
        },
        emphasis: {
            highlight: { type: 'pulse' }
        }
    },

    // 模板 C：极致炫酷（发布会）
    extreme: {
        name: 'extreme',
        displayName: '极致炫酷',
        description: '适合新品发布、品牌活动、大型演讲',
        transitions: {
            default: { type: 'zoom', speed: 'slow' },
            cover: { type: 'fadeThroughBlack', speed: 'slow' },
            content: { type: 'circle', speed: 'med' },
            timeline: { type: 'wedge', speed: 'med' },
            stats: { type: 'newsflash', speed: 'med' },
            end: { type: 'zoom', speed: 'slow' }
        },
        elements: {
            title: {
                type: 'compound',
                animations: [
                    { type: 'flyInFromBottom' },
                    { type: 'bounce' }
                ],
                delay: 0
            },
            subtitle: { type: 'zoomIn', delay: 300 },
            content: { type: 'zoomIn', delay: 400 },
            cards: {
                type: 'compound',
                animations: [
                    { type: 'zoomIn' },
                    { type: 'pulse' }
                ],
                cascade: true,
                delay: 200,
                increment: 150
            },
            stats: {
                type: 'compound',
                animations: [
                    { type: 'grow' },
                    { type: 'spin' }
                ],
                cascade: true,
                delay: 250,
                increment: 120
            }
        },
        emphasis: {
            highlight: { type: 'flashBulb' },
            data: { type: 'teeter' }
        }
    }
};

// ==========================================
// 风格-模板映射
// ==========================================
const STYLE_TEMPLATE_MAPPING = {
    deepSpace: 'moderate',
    academic: 'professional',
    playful: 'extreme',
    corporate: 'professional',
    tech: 'extreme',
    minimal: 'professional',
    nature: 'moderate',
    vintage: 'professional',
    energetic: 'extreme',
    medical: 'professional',
    finance: 'professional',
    chinese: 'moderate'
};

// ==========================================
// 动画时长配置
// ==========================================
const ANIMATION_TIMING = {
    veryFast: 300,
    fast: 500,
    normal: 800,
    slow: 1200,
    verySlow: 1500
};

// ==========================================
// 工具函数
// ==========================================

// 获取切换动画
function getTransition(styleName, slideType = 'content') {
    const styleConfig = STYLE_ANIMATIONS[styleName] || STYLE_ANIMATIONS.deepSpace;
    const transitionName = styleConfig.slideTransition || 'fade';
    return TRANSITIONS[transitionName] || TRANSITIONS.fade;
}

// 获取元素动画
function getAnimation(styleName, elementType = 'content') {
    const styleConfig = STYLE_ANIMATIONS[styleName] || STYLE_ANIMATIONS.deepSpace;

    switch (elementType) {
        case 'title':
            return ANIMATIONS[styleConfig.titleAnimation] || ANIMATIONS.fade;
        case 'card':
            return ANIMATIONS[styleConfig.cardAnimation] || ANIMATIONS.fade;
        case 'stats':
            return ANIMATIONS[styleConfig.statsAnimation] || ANIMATIONS.grow;
        default:
            return ANIMATIONS[styleConfig.contentAnimation] || ANIMATIONS.fade;
    }
}

// 应用切换动画到幻灯片
function applyTransition(slide, styleName, transitionType = null) {
    const transition = transitionType
        ? (TRANSITIONS[transitionType] || TRANSITIONS.fade)
        : getTransition(styleName);

    // PptxGenJS 支持的切换类型（虽然不会写入文件，但保持兼容）
    const transitionMap = {
        'fade': { type: 'fade' },
        'push': { type: 'push' },
        'wipe': { type: 'wipe' },
        'split': { type: 'split' },
        'reveal': { type: 'reveal' },
        'wheel': { type: 'wheel' },
        'random': { type: 'random' },
        'blinds': { type: 'blinds' },
        'checker': { type: 'checker' },
        'dissolve': { type: 'dissolve' }
    };

    const pptxTransition = transitionMap[transition.type] || { type: 'fade' };
    slide.transition = pptxTransition;
}

// 创建动画延迟（用于级联动画）
function createAnimationDelay(baseDelay, index, increment = 200) {
    return baseDelay + (index * increment);
}

// 根据风格获取默认模板
function getTemplateForStyle(styleName) {
    const templateName = STYLE_TEMPLATE_MAPPING[styleName] || 'professional';
    return ANIMATION_TEMPLATES[templateName];
}

// 获取模板
function getTemplate(templateName) {
    return ANIMATION_TEMPLATES[templateName] || ANIMATION_TEMPLATES.professional;
}

// 获取所有模板名称
function getTemplateNames() {
    return Object.keys(ANIMATION_TEMPLATES);
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    // 动画定义
    TRANSITIONS,
    ANIMATIONS,
    STYLE_ANIMATIONS,
    ANIMATION_TEMPLATES,
    STYLE_TEMPLATE_MAPPING,

    // 配置
    ANIMATION_TIMING,

    // 工具函数
    getTransition,
    getAnimation,
    applyTransition,
    createAnimationDelay,
    getTemplateForStyle,
    getTemplate,
    getTemplateNames
};