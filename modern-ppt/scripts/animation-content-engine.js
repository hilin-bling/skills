/**
 * 内容感知动画引擎
 *
 * 根据元素类型、内容复杂度、视觉层级自动选择最佳动画
 * 实现现代演示设计的动画原则：
 * - 内容驱动 - 根据元素类型选择动画
 * - 时间节奏 - 恰当的延迟和持续时间
 * - 层次递进 - 标题 → 副标题 → 内容 → 细节
 * - 微妙优雅 - 避免过度动画
 */

// ==========================================
// 内容类型动画规则映射
// ==========================================
const CONTENT_ANIMATION_RULES = {
    // 标题类 - 简洁有力
    title: {
        entrance: 'fade',
        duration: 600,
        delay: 0,
        emphasis: null,
        scaleEffect: true,  // 添加轻微缩放效果
        description: '标题使用 fade + scale，简洁有力'
    },

    // 副标题类
    subtitle: {
        entrance: 'fade',
        duration: 400,
        delay: 150,
        emphasis: null,
        description: '副标题延迟150ms跟随标题'
    },

    // 数据统计类 - 动态增长
    stats: {
        entrance: 'grow',
        duration: 800,
        delay: 200,
        emphasis: 'pulse',
        countUp: true,       // 数字增长效果（通过COM后端实现）
        highlightOnStart: true,
        description: '数据使用 grow + countUp，动态增长'
    },

    // 卡片列表类 - 依次展开
    cards: {
        entrance: 'zoomIn',
        duration: 500,
        cascade: true,
        cascadeDelay: 120,
        staggerDirection: 'left-to-right',
        shadow: true,
        description: '卡片级联 zoomIn，依次展开'
    },

    // 时间线类 - 时间流动感
    timeline: {
        entrance: 'wipeRight',
        duration: 600,
        reveal: true,
        sequential: true,
        lineDrawEffect: true,
        description: '时间线使用 wipe + reveal，时间流动感'
    },

    // 引用/名言类 - 文字出现
    quote: {
        entrance: 'fade',
        duration: 400,
        typewriter: true,
        charDelay: 30,
        italicEffect: true,
        description: '引用使用 typewriter 效果，文字依次出现'
    },

    // 图标类 - 悬浮进入
    icon: {
        entrance: 'floatIn',
        duration: 600,
        shadow: true,
        bounce: true,
        subtleRotation: true,
        description: '图标使用 floatIn + shadow，悬浮进入'
    },

    // 图片类
    image: {
        entrance: 'zoomIn',
        duration: 500,
        shadow: true,
        shadowIntensity: 'medium',
        description: '图片使用 zoomIn + shadow'
    },

    // 正文内容
    content: {
        entrance: 'fade',
        duration: 500,
        delay: 300,
        description: '正文内容延迟300ms淡入'
    },

    // 列表项
    listItem: {
        entrance: 'flyInFromLeft',
        duration: 400,
        cascade: true,
        cascadeDelay: 80,
        description: '列表项级联飞入'
    },

    // 强调重点
    highlight: {
        entrance: 'bounce',
        duration: 600,
        emphasis: 'pulse',
        colorFlash: true,
        description: '重点元素使用 bounce + pulse'
    },

    // 图表类
    chart: {
        entrance: 'draw',
        duration: 1000,
        sequential: true,
        highlight: true,
        description: '图表使用绘制效果，逐步展示'
    },

    // 装饰元素
    decoration: {
        entrance: 'fade',
        duration: 300,
        delay: 500,
        subtle: true,
        description: '装饰元素延迟淡入，不抢主视觉'
    }
};

// ==========================================
// 内容复杂度评估
// ==========================================

/**
 * 评估内容复杂度
 * @param {Object} element - 元素对象
 * @returns {Object} { score: 0-100, level: 'simple'|'medium'|'complex' }
 */
function assessContentComplexity(element) {
    const factors = {
        textLength: element.text?.length || 0,
        hasIcon: !!element.icon,
        hasImage: !!element.image,
        childCount: element.children?.length || 0,
        hasChart: !!element.chart,
        hasList: !!element.items || !!element.listItems,
        nestingLevel: element.nestingLevel || 0
    };

    // 复杂度分数计算 0-100
    let score = 0;

    // 文本长度影响 (最大30分)
    score += Math.min(factors.textLength / 50, 30);

    // 图标影响 (15分)
    score += factors.hasIcon ? 15 : 0;

    // 图片影响 (20分)
    score += factors.hasImage ? 20 : 0;

    // 子元素数量影响 (最大35分)
    score += Math.min(factors.childCount * 10, 35);

    // 图表影响 (25分)
    score += factors.hasChart ? 25 : 0;

    // 列表影响 (15分)
    score += factors.hasList ? 15 : 0;

    // 嵌套层级影响 (每层5分，最大15分)
    score += Math.min(factors.nestingLevel * 5, 15);

    // 确定复杂度级别
    let level;
    if (score < 30) {
        level = 'simple';
    } else if (score < 60) {
        level = 'medium';
    } else {
        level = 'complex';
    }

    return { score, level, factors };
}

/**
 * 根据复杂度调整动画时长
 * @param {number} baseDuration - 基础时长（毫秒）
 * @param {Object} complexity - 复杂度评估结果
 * @returns {number} 调整后的时长
 */
function adjustDurationForComplexity(baseDuration, complexity) {
    const multipliers = {
        simple: 0.8,   // 简单内容更快
        medium: 1.0,   // 中等内容保持原速度
        complex: 1.3   // 复杂内容更慢，给观众更多时间理解
    };

    return Math.round(baseDuration * (multipliers[complexity.level] || 1.0));
}

// ==========================================
// 视觉层级延迟计算
// ==========================================

/**
 * 视觉层级延迟配置
 * 基于现代设计的层次递进原则
 */
const LEVEL_DELAYS = {
    1: 0,       // 标题级 - 最先出现
    2: 150,     // 副标题级 - 跟随标题
    3: 300,     // 内容级 - 标题稳定后出现
    4: 450,     // 细节级 - 最后出现
    5: 600      // 装饰级 - 背景装饰
};

/**
 * 计算智能动画时长
 * @param {Object} element - 元素配置
 * @param {Object} context - 上下文信息（层级、索引等）
 * @returns {Object} { duration, delay }
 */
function calculateSmartTiming(element, context = {}) {
    const baseTiming = {
        duration: 500,
        delay: 0
    };

    // 获取内容类型的动画规则
    const contentType = element.contentType || detectContentType(element);
    const rules = CONTENT_ANIMATION_RULES[contentType] || CONTENT_ANIMATION_RULES.content;

    // 设置基础时长
    baseTiming.duration = rules.duration;

    // 文本长度影响时长
    if (element.text) {
        const charCount = element.text.length;
        // 长文本需要更多时间阅读
        baseTiming.duration += Math.min(charCount * 2, 500);
    }

    // 层级影响延迟
    const level = element.level || context.level || 3;
    baseTiming.delay = LEVEL_DELAYS[level] || 300;

    // 兄弟元素索引影响（级联效果）
    if (context.siblingIndex !== undefined) {
        const cascadeDelay = rules.cascadeDelay || 100;
        baseTiming.delay += context.siblingIndex * cascadeDelay;
    }

    // 复杂度调整
    const complexity = assessContentComplexity(element);
    baseTiming.duration = adjustDurationForComplexity(baseTiming.duration, complexity);

    // 确保时长在合理范围内
    baseTiming.duration = Math.max(200, Math.min(baseTiming.duration, 2000));
    baseTiming.delay = Math.max(0, Math.min(baseTiming.delay, 5000));

    return baseTiming;
}

// ==========================================
// 内容类型检测
// ==========================================

/**
 * 自动检测内容类型
 * @param {Object} element - 元素对象
 * @returns {string} 内容类型
 */
function detectContentType(element) {
    // 基于特征自动检测

    // 检测标题
    if (element.isTitle || element.fontSize >= 40 || element.bold) {
        return 'title';
    }

    // 检测统计数据
    if (element.isStats || element.value !== undefined ||
        (element.text && /^\d+[%km]?$/.test(element.text.trim()))) {
        return 'stats';
    }

    // 检测卡片
    if (element.isCard || element.cardTitle || element.children?.length >= 3) {
        return 'cards';
    }

    // 检测时间线
    if (element.isTimeline || element.timelineItems || element.dateItems) {
        return 'timeline';
    }

    // 检测引用
    if (element.isQuote || element.quotation || element.italic && element.text?.startsWith('"')) {
        return 'quote';
    }

    // 检测图标
    if (element.isIcon || element.icon && !element.text) {
        return 'icon';
    }

    // 检测图片
    if (element.isImage || element.image && !element.text) {
        return 'image';
    }

    // 检测列表
    if (element.isList || element.items || element.listItems) {
        return 'listItem';
    }

    // 检测图表
    if (element.isChart || element.chart || element.chartData) {
        return 'chart';
    }

    // 检测强调元素
    if (element.highlight || element.emphasis) {
        return 'highlight';
    }

    // 检测装饰
    if (element.isDecoration || element.decorationType) {
        return 'decoration';
    }

    // 默认返回内容类型
    return 'content';
}

// ==========================================
// 动画选择器
// ==========================================

/**
 * 根据内容类型获取最佳动画配置
 * @param {Object} element - 元素配置
 * @param {Object} context - 上下文
 * @returns {Object} 动画配置
 */
function selectBestAnimation(element, context = {}) {
    // 检测或获取内容类型
    const contentType = element.contentType || detectContentType(element);

    // 获取规则
    const rules = CONTENT_ANIMATION_RULES[contentType];

    // 计算时长
    const timing = calculateSmartTiming(element, context);

    // 构建动画配置
    const animationConfig = {
        type: rules.entrance,
        duration: timing.duration,
        delay: timing.delay,
        contentType,
        rules: { ...rules }
    };

    // 添加强调动画
    if (rules.emphasis) {
        animationConfig.emphasis = {
            type: rules.emphasis,
            delay: timing.duration + timing.delay
        };
    }

    // 添加级联配置
    if (rules.cascade && context.siblingIndex !== undefined) {
        animationConfig.cascade = {
            enabled: true,
            index: context.siblingIndex,
            direction: rules.staggerDirection || 'left-to-right'
        };
    }

    // 添加特殊效果标记
    if (rules.scaleEffect) animationConfig.scaleEffect = true;
    if (rules.countUp) animationConfig.countUp = true;
    if (rules.shadow) animationConfig.shadow = true;
    if (rules.shadowIntensity) animationConfig.shadowIntensity = rules.shadowIntensity;

    return animationConfig;
}

// ==========================================
// 批量元素动画生成
// ==========================================

/**
 * 为一组元素生成级联动画配置
 * @param {Array} elements - 元素数组
 * @param {string} contentType - 内容类型
 * @returns {Array} 动画配置数组
 */
function generateCascadeAnimations(elements, contentType = 'cards') {
    const rules = CONTENT_ANIMATION_RULES[contentType];

    if (!rules.cascade) {
        // 不支持级联的内容类型，使用普通动画
        return elements.map(el => selectBestAnimation(el));
    }

    return elements.map((element, index) => {
        return selectBestAnimation(element, {
            siblingIndex: index,
            level: element.level || 3
        });
    });
}

// ==========================================
// 动画效果映射（用于后端）
// ==========================================

/**
 * 动画名称到PowerPoint效果枚举的映射
 */
const ANIMATION_EFFECT_MAP = {
    // 进入动画
    fade: { comEffect: 'msoAnimEffectFade', xmlPresetID: 10 },
    zoomIn: { comEffect: 'msoAnimEffectZoom', xmlPresetID: 13 },
    zoom: { comEffect: 'msoAnimEffectZoom', xmlPresetID: 13 },
    grow: { comEffect: 'msoAnimEffectGrowShrink', xmlPresetID: 5 },
    flyInFromLeft: { comEffect: 'msoAnimEffectFly', xmlPresetID: 2, direction: 'msoAnimDirectionLeft' },
    flyInFromRight: { comEffect: 'msoAnimEffectFly', xmlPresetID: 2, direction: 'msoAnimDirectionRight' },
    flyInFromTop: { comEffect: 'msoAnimEffectFly', xmlPresetID: 2, direction: 'msoAnimDirectionTop' },
    flyInFromBottom: { comEffect: 'msoAnimEffectFly', xmlPresetID: 2, direction: 'msoAnimDirectionBottom' },
    floatIn: { comEffect: 'msoAnimEffectFloat', xmlPresetID: 6 },
    floatInFromUp: { comEffect: 'msoAnimEffectFloat', xmlPresetID: 6, direction: 'msoAnimDirectionTop' },
    floatInFromDown: { comEffect: 'msoAnimEffectFloat', xmlPresetID: 6, direction: 'msoAnimDirectionBottom' },
    bounce: { comEffect: 'msoAnimEffectBounce', xmlPresetID: 15 },
    wipeRight: { comEffect: 'msoAnimEffectWipe', xmlPresetID: 4, direction: 'msoAnimDirectionRight' },
    wipeLeft: { comEffect: 'msoAnimEffectWipe', xmlPresetID: 4, direction: 'msoAnimDirectionLeft' },
    appear: { comEffect: 'msoAnimEffectAppear', xmlPresetID: 1 },

    // 强调动画
    pulse: { comEffect: 'msoAnimEffectGrowShrink', xmlPresetID: 5, isEmphasis: true },
    spin: { comEffect: 'msoAnimEffectSpin', xmlPresetID: 4, isEmphasis: true },
    teeter: { comEffect: 'msoAnimEffectTeeter', xmlPresetID: 3, isEmphasis: true },
    colorPulse: { comEffect: 'msoAnimEffectColorBlend', xmlPresetID: 2, isEmphasis: true }
};

/**
 * 获取动画效果的COM/XML参数
 * @param {string} animationName - 动画名称
 * @returns {Object} 效果参数
 */
function getEffectParameters(animationName) {
    return ANIMATION_EFFECT_MAP[animationName] || ANIMATION_EFFECT_MAP.fade;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    // 核心规则
    CONTENT_ANIMATION_RULES,
    LEVEL_DELAYS,
    ANIMATION_EFFECT_MAP,

    // 评估函数
    assessContentComplexity,
    adjustDurationForComplexity,

    // 计算函数
    calculateSmartTiming,
    detectContentType,
    selectBestAnimation,

    // 批量生成
    generateCascadeAnimations,

    // 后端映射
    getEffectParameters
};