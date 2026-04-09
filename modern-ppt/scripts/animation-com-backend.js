/**
 * PowerPoint COM Backend - Windows专用
 *
 * 使用PowerShell调用PowerPoint COM接口添加动画
 * 支持所有PowerPoint原生动画效果
 * v2.0 - 新增内容感知动画引擎集成
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 尝试导入内容感知动画引擎
let ContentEngine = null;
try {
    ContentEngine = require('./animation-content-engine');
} catch (e) {
    // 如果导入失败，使用默认行为
}

// 动画效果枚举映射
const EFFECT_ENUMS = {
    // 进入动画
    entrance: {
        appear: 'msoAnimEffectAppear',
        fade: 'msoAnimEffectFade',
        flyIn: 'msoAnimEffectFly',
        float: 'msoAnimEffectFloat',
        zoom: 'msoAnimEffectZoom',
        bounce: 'msoAnimEffectBounce',
        growTurn: 'msoAnimEffectGrowTurn',
        dissolve: 'msoAnimEffectDissolve',
        split: 'msoAnimEffectSplit',
        wipe: 'msoAnimEffectWipe',
        wheel: 'msoAnimEffectWheel',
        randomBars: 'msoAnimEffectRandomBars',
        checkerboard: 'msoAnimEffectCheckerboard',
        blinds: 'msoAnimEffectBlinds',
        stretch: 'msoAnimEffectStretch',
        strips: 'msoAnimEffectStrips',
        wedge: 'msoAnimEffectWedge',
        spinner: 'msoAnimEffectSpinner',
        swivel: 'msoAnimEffectSwivel',
        boomerang: 'msoAnimEffectBoomerang',
        bounceLeft: 'msoAnimEffectBounceLeft'
    },
    // 强调动画
    emphasis: {
        pulse: 'msoAnimEffectGrowShrink',
        colorPulse: 'msoAnimEffectColorBlend',
        teeter: 'msoAnimEffectTeeter',
        spin: 'msoAnimEffectSpin',
        grow: 'msoAnimEffectGrowShrink',
        shrink: 'msoAnimEffectGrowShrink',
        transparency: 'msoAnimEffectTransparency',
        flashBulb: 'msoAnimEffectFlashBulb',
        wave: 'msoAnimEffectWave',
        boldFlash: 'msoAnimEffectBoldFlash'
    },
    // 退出动画
    exit: {
        disappear: 'msoAnimEffectDisappear',
        fade: 'msoAnimEffectFade',
        flyOut: 'msoAnimEffectFly',
        zoom: 'msoAnimEffectZoom',
        shrink: 'msoAnimEffectGrowShrink'
    }
};

// 方向枚举
const DIRECTION_ENUMS = {
    left: 'msoAnimDirectionLeft',
    right: 'msoAnimDirectionRight',
    top: 'msoAnimDirectionTop',
    bottom: 'msoAnimDirectionBottom',
    topLeft: 'msoAnimDirectionTopLeft',
    topRight: 'msoAnimDirectionTopRight',
    bottomLeft: 'msoAnimDirectionBottomLeft',
    bottomRight: 'msoAnimDirectionBottomRight',
    center: 'msoAnimDirectionCenter',
    horizontal: 'msoAnimDirectionHorizontal',
    vertical: 'msoAnimDirectionVertical',
    in: 'msoAnimDirectionIn',
    out: 'msoAnimDirectionOut'
};

// 切换动画枚举
const TRANSITION_ENUMS = {
    fade: 'ppEffectFade',
    fadeThroughBlack: 'ppEffectFadeSmoothly',
    push: 'ppEffectPush',
    pushLeft: 'ppEffectPush',
    pushRight: 'ppEffectPush',
    wipe: 'ppEffectWipe',
    wipeLeft: 'ppEffectWipe',
    wipeRight: 'ppEffectWipe',
    dissolve: 'ppEffectDissolve',
    split: 'ppEffectSplit',
    reveal: 'ppEffectReveal',
    cut: 'ppEffectCut',
    random: 'ppEffectRandom',
    blinds: 'ppEffectBlinds',
    checker: 'ppEffectCheckerboard',
    circle: 'ppEffectCircle',
    diamond: 'ppEffectDiamond',
    wedge: 'ppEffectWedge',
    wheel: 'ppEffectWheel',
    zoom: 'ppEffectZoom',
    newsflash: 'ppEffectNewsflash',
    comb: 'ppEffectComb',
    cover: 'ppEffectCover',
    pull: 'ppEffectPull',
    strips: 'ppEffectStrips'
};

// ==========================================
// 元素动画常量（PowerPoint COM API 数值）
// ==========================================
const ELEMENT_ANIMATION_CONSTANTS = {
    // 进入动画效果
    entrance: {
        appear: 1,
        fade: 10,
        fly: 2,
        float: 6,
        zoom: 13,
        bounce: 15,
        growTurn: 12,
        dissolve: 27,
        split: 3,
        wipe: 4,
        wheel: 7,
        randomBars: 8,
        checkerboard: 9,
        blinds: 11,
        stretch: 17,
        strips: 18,
        wedge: 25,
        spinner: 22,
        swivel: 14,
        boomerang: 16,
        bounceLeft: 19
    },

    // 强调动画效果
    emphasis: {
        pulse: 5,           // msoAnimEffectGrowShrink
        colorPulse: 2,      // msoAnimEffectColorBlend
        teeter: 3,          // msoAnimEffectTeeter
        spin: 4,            // msoAnimEffectSpin
        grow: 5,
        shrink: 5,
        transparency: 11,
        flashBulb: 23,
        wave: 18,
        boldFlash: 20
    },

    // 退出动画效果
    exit: {
        disappear: 1,
        fade: 10,
        fly: 2,
        zoom: 13,
        shrink: 5
    },

    // 触发方式
    trigger: {
        onClick: 0,             // msoAnimTriggerOnPageClick
        afterPrevious: 3,       // msoAnimTriggerAfterPrevious
        withPrevious: 2         // msoAnimTriggerWithPrevious
    },

    // 方向
    direction: {
        left: 4,            // msoAnimDirectionLeft
        right: 5,           // msoAnimDirectionRight
        top: 1,             // msoAnimDirectionTop
        bottom: 3,          // msoAnimDirectionBottom
        topLeft: 7,         // msoAnimDirectionTopLeft
        topRight: 8,        // msoAnimDirectionTopRight
        bottomLeft: 9,      // msoAnimDirectionBottomLeft
        bottomRight: 10,    // msoAnimDirectionBottomRight
        center: 0,          // msoAnimDirectionCenter
        horizontal: 11,     // msoAnimDirectionHorizontal
        vertical: 12,       // msoAnimDirectionVertical
        in: 13,             // msoAnimDirectionIn
        out: 14             // msoAnimDirectionOut
    },

    // 动画级别
    animateLevel: {
        none: 0,            // msoAnimateLevelNone
        byFirstLevel: 1,    // msoAnimateByFirstLevel
        bySecondLevel: 2    // msoAnimateBySecondLevel
    }
};

/**
 * 根据内容类型获取动画参数
 * 集成内容感知动画引擎
 * @param {string} contentType - 内容类型
 * @param {number} index - 元素索引（用于级联动画）
 * @param {Object} template - 动画模板配置
 * @returns {Object} 动画参数
 */
function getAnimationParamsForContentType(contentType, index = 0, template = null) {
    // 如果有内容感知引擎，使用它
    if (ContentEngine && ContentEngine.CONTENT_ANIMATION_RULES) {
        const rules = ContentEngine.CONTENT_ANIMATION_RULES[contentType];
        if (rules) {
            const baseDelay = rules.delay || 0;
            const cascadeDelay = rules.cascadeDelay || 100;
            const cascadeEnabled = rules.cascade && index > 0;

            // 确定效果类型
            let effectType = rules.entrance;
            if (effectType === 'zoomIn') effectType = 'zoom';
            if (effectType === 'flyInFromLeft') effectType = 'fly';
            if (effectType === 'flyInFromRight') effectType = 'fly';
            if (effectType === 'floatIn') effectType = 'float';
            if (effectType === 'wipeRight') effectType = 'wipe';

            // 获取效果数值
            const effectNum = ELEMENT_ANIMATION_CONSTANTS.entrance[effectType] ||
                             ELEMENT_ANIMATION_CONSTANTS.entrance.fade;

            // 获取方向
            let direction = ELEMENT_ANIMATION_CONSTANTS.direction.bottom;
            if (rules.entrance.includes('FromLeft')) {
                direction = ELEMENT_ANIMATION_CONSTANTS.direction.left;
            } else if (rules.entrance.includes('FromRight')) {
                direction = ELEMENT_ANIMATION_CONSTANTS.direction.right;
            } else if (rules.entrance.includes('FromTop')) {
                direction = ELEMENT_ANIMATION_CONSTANTS.direction.top;
            } else if (rules.staggerDirection === 'left-to-right') {
                direction = ELEMENT_ANIMATION_CONSTANTS.direction.left;
            }

            return {
                effectType,
                effectNum,
                duration: rules.duration / 1000,   // 转换为秒
                delay: (baseDelay + (cascadeEnabled ? index * cascadeDelay : 0)) / 1000,
                direction,
                trigger: index === 0 ?
                    ELEMENT_ANIMATION_CONSTANTS.trigger.afterPrevious :
                    ELEMENT_ANIMATION_CONSTANTS.trigger.withPrevious,
                hasEmphasis: !!rules.emphasis,
                emphasisType: rules.emphasis
            };
        }
    }

    // 回退：根据内容类型使用预设动画
    const defaultAnimations = {
        title: { effectNum: 10, duration: 0.6, delay: 0, direction: 0 },       // fade
        subtitle: { effectNum: 10, duration: 0.4, delay: 0.15, direction: 0 }, // fade
        stats: { effectNum: 5, duration: 0.8, delay: 0.2, direction: 0 },      // grow
        cards: { effectNum: 13, duration: 0.5, delay: index * 0.12, direction: 0 }, // zoom
        timeline: { effectNum: 4, duration: 0.6, delay: index * 0.3, direction: 5 }, // wipe right
        quote: { effectNum: 10, duration: 0.4, delay: 0, direction: 0 },       // fade
        icon: { effectNum: 6, duration: 0.6, delay: 0, direction: 13 },        // float in
        image: { effectNum: 13, duration: 0.5, delay: 0, direction: 0 },       // zoom
        content: { effectNum: 10, duration: 0.5, delay: 0.3, direction: 3 }    // fade from bottom
    };

    const anim = defaultAnimations[contentType] || defaultAnimations.content;

    return {
        effectNum: anim.effectNum,
        duration: anim.duration,
        delay: anim.delay,
        direction: anim.direction,
        trigger: index === 0 ?
            ELEMENT_ANIMATION_CONSTANTS.trigger.afterPrevious :
            ELEMENT_ANIMATION_CONSTANTS.trigger.withPrevious
    };
}

/**
 * 检测形状的内容类型（基于形状名称和特征）
 * @param {string} shapeName - 形状名称
 * @param {Object} shapeInfo - 形状信息
 * @returns {string} 内容类型
 */
function detectShapeContentType(shapeName, shapeInfo = {}) {
    // 基于名称的模式匹配
    const nameLower = (shapeName || '').toLowerCase();

    if (nameLower.includes('title')) return 'title';
    if (nameLower.includes('subtitle')) return 'subtitle';
    if (nameLower.includes('stats') || nameLower.includes('stat')) return 'stats';
    if (nameLower.includes('card')) return 'cards';
    if (nameLower.includes('timeline')) return 'timeline';
    if (nameLower.includes('quote')) return 'quote';
    if (nameLower.includes('icon')) return 'icon';
    if (nameLower.includes('image') || nameLower.includes('picture')) return 'image';

    // 基于形状信息的检测
    if (shapeInfo.hasLargeFont) return 'title';
    if (shapeInfo.isCard) return 'cards';
    if (shapeInfo.hasNumber) return 'stats';

    // 默认
    return 'content';
}

class COMAnimationBackend {
    constructor() {
        this.name = 'com';
        this.description = 'PowerPoint COM Backend (Windows only, best quality)';
        this.platform = process.platform;
        this.pptAvailable = null;
    }

    /**
     * 检测PowerPoint是否可用
     */
    _detectPowerPoint() {
        if (this.platform !== 'win32') return false;

        try {
            // 使用更可靠的检测方法
            const result = execSync(
                'powershell -Command "Test-Path \'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\POWERPNT.EXE\'"',
                { encoding: 'utf8', timeout: 10000 }
            );
            return result.trim().toLowerCase() === 'true';
        } catch {
            return false;
        }
    }

    /**
     * 检查后端是否可用
     */
    isAvailable() {
        if (this.pptAvailable === null) {
            this.pptAvailable = this._detectPowerPoint();
        }
        return this.platform === 'win32' && this.pptAvailable;
    }

    /**
     * 获取动画效果枚举值
     */
    _getEffectEnum(effectName, category = 'entrance') {
        // 处理方向变体
        if (effectName.startsWith('flyIn')) {
            return EFFECT_ENUMS.entrance.flyIn;
        }
        if (effectName.startsWith('floatIn')) {
            return EFFECT_ENUMS.entrance.float;
        }
        if (effectName.startsWith('zoom')) {
            return EFFECT_ENUMS.entrance.zoom;
        }
        if (effectName.startsWith('bounce')) {
            return EFFECT_ENUMS.entrance.bounce;
        }

        // 标准查找
        const categoryEffects = EFFECT_ENUMS[category] || EFFECT_ENUMS.entrance;
        return categoryEffects[effectName] || EFFECT_ENUMS.entrance.fade;
    }

    /**
     * 获取方向枚举值
     */
    _getDirectionEnum(direction) {
        return DIRECTION_ENUMS[direction] || DIRECTION_ENUMS.left;
    }

    /**
     * 解析动画配置中的方向
     */
    _parseDirection(effectName) {
        if (effectName.includes('FromLeft') || effectName.endsWith('Left')) {
            return 'left';
        }
        if (effectName.includes('FromRight') || effectName.endsWith('Right')) {
            return 'right';
        }
        if (effectName.includes('FromTop') || effectName.endsWith('Top')) {
            return 'top';
        }
        if (effectName.includes('FromBottom') || effectName.endsWith('Bottom')) {
            return 'bottom';
        }
        if (effectName.includes('In') && !effectName.includes('From')) {
            return 'in';
        }
        if (effectName.includes('Out')) {
            return 'out';
        }
        return null;
    }

    /**
     * 生成PowerShell动画脚本
     */
    _buildPowerShellScript(inputPath, outputPath, template, slideTypes) {
        // 转义Windows路径
        const inputPathEsc = inputPath.replace(/\\/g, '/');
        const outputPathEsc = outputPath.replace(/\\/g, '/');

        // 获取模板配置
        const transitions = template.transitions || {};
        const coverTrans = transitions.cover?.type || 'fade';
        const endTrans = transitions.end?.type || 'fade';
        const contentTrans = transitions.content?.type || transitions.default?.type || 'fade';
        const timelineTrans = transitions.timeline?.type || 'wipe';
        const statsTrans = transitions.stats?.type || 'fade';
        const transSpeed = transitions.default?.speed || 'med';

        // 构建幻灯片类型数组字符串
        const slideTypesStr = slideTypes.map(t => `"${t}"`).join(',');

        // PowerShell脚本（使用测试验证的有效数值常量）
        // 有效的过渡效果值: 1025, 1026, 2049-2056, 3073-3074
        // 根据实际测试验证的结果映射
        const script = `
$ErrorActionPreference = "Stop"
$slideTypes = @(${slideTypesStr})

try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $pres = $ppt.Presentations.Open("${inputPathEsc}", $true)
    $slideCount = $pres.Slides.Count

    # 切换动画常量（经测试验证的有效值）
    $ppEffectFadeSmoothly = 1025
    $ppEffectFadeThroughBlack = 1026
    $ppEffectPush = 2049
    $ppEffectWipe = 2050
    $ppEffectDissolve = 2051
    $ppEffectSplit = 2052
    $ppEffectBlinds = 2053
    $ppEffectCheckerboard = 2054
    $ppEffectRandom = 2055
    $ppEffectCircle = 2056
    $ppEffectWedge = 3073
    $ppEffectWheel = 3074

    # 速度常量
    $ppTransitionSpeedSlow = 1
    $ppTransitionSpeedMedium = 2
    $ppTransitionSpeedFast = 3

    # 动画效果常量
    $msoAnimEffectFly = 2
    $msoAnimDirectionBottom = 3
    $msoAnimTriggerWithPrevious = 2
    $msoAnimateLevelNone = 0

    # 添加切换动画
    for ($i = 0; $i -lt $slideCount; $i++) {
        $slide = $pres.Slides[$i + 1]
        $slideType = if ($i -lt $slideTypes.Count) { $slideTypes[$i] } else { "content" }

        $transType = "${contentTrans}"
        if ($slideType -eq "cover") { $transType = "${coverTrans}" }
        elseif ($slideType -eq "end") { $transType = "${endTrans}" }
        elseif ($slideType -eq "timeline") { $transType = "${timelineTrans}" }
        elseif ($slideType -eq "stats") { $transType = "${statsTrans}" }

        switch ($transType) {
            "fade" { $slide.SlideShowTransition.EntryEffect = $ppEffectFadeSmoothly }
            "fadeThroughBlack" { $slide.SlideShowTransition.EntryEffect = $ppEffectFadeThroughBlack }
            "push" { $slide.SlideShowTransition.EntryEffect = $ppEffectPush }
            "pushLeft" { $slide.SlideShowTransition.EntryEffect = $ppEffectPush }
            "pushRight" { $slide.SlideShowTransition.EntryEffect = $ppEffectPush }
            "wipe" { $slide.SlideShowTransition.EntryEffect = $ppEffectWipe }
            "wipeLeft" { $slide.SlideShowTransition.EntryEffect = $ppEffectWipe }
            "wipeRight" { $slide.SlideShowTransition.EntryEffect = $ppEffectWipe }
            "dissolve" { $slide.SlideShowTransition.EntryEffect = $ppEffectDissolve }
            "zoom" { $slide.SlideShowTransition.EntryEffect = $ppEffectCircle }
            "circle" { $slide.SlideShowTransition.EntryEffect = $ppEffectCircle }
            "wedge" { $slide.SlideShowTransition.EntryEffect = $ppEffectWedge }
            "newsflash" { $slide.SlideShowTransition.EntryEffect = $ppEffectRandom }
            "wheel" { $slide.SlideShowTransition.EntryEffect = $ppEffectWheel }
            "split" { $slide.SlideShowTransition.EntryEffect = $ppEffectSplit }
            "blinds" { $slide.SlideShowTransition.EntryEffect = $ppEffectBlinds }
            "checker" { $slide.SlideShowTransition.EntryEffect = $ppEffectCheckerboard }
            default { $slide.SlideShowTransition.EntryEffect = $ppEffectFadeSmoothly }
        }

        switch ("${transSpeed}") {
            "slow" { $slide.SlideShowTransition.Speed = $ppTransitionSpeedSlow }
            "fast" { $slide.SlideShowTransition.Speed = $ppTransitionSpeedFast }
            default { $slide.SlideShowTransition.Speed = $ppTransitionSpeedMedium }
        }
    }

    # 添加元素动画
    for ($i = 0; $i -lt $slideCount; $i++) {
        $slideType = if ($i -lt $slideTypes.Count) { $slideTypes[$i] } else { "content" }
        if ($slideType -eq "cover" -or $slideType -eq "end") { continue }

        $slide = $pres.Slides[$i + 1]
        $shapes = $slide.Shapes
        $delay = 0.3

        for ($j = 1; $j -le $shapes.Count; $j++) {
            $shape = $shapes[$j]
            if ($shape.Name -match "Shape 0" -or $shape.Name -match "Decoration") { continue }

            $effect = $slide.TimeLine.MainSequence.AddEffect($shape, $msoAnimEffectFly, $msoAnimateLevelNone, $msoAnimTriggerWithPrevious)
            $effect.EffectParameters.Direction = $msoAnimDirectionBottom
            $effect.Timing.Duration = 0.5
            $effect.Timing.TriggerDelayTime = $delay
            $delay += 0.15

            if ($delay -gt 1.5) { break }
        }
    }

    $pres.SaveAs("${outputPathEsc}")
    $pres.Close()
    $ppt.Quit()

    Write-Output "Success"
}
catch {
    Write-Output "Error: $($_.Exception.Message)"
}
finally {
    try { if ($pres -ne $null) { $pres.Close() } } catch {}
    try { $ppt.Quit() } catch {}
    try { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null } catch {}
}
`;

        return script;
    }

    /**
     * 应用动画到PPT
     */
    applyAnimations(inputPath, outputPath, options = {}) {
        if (!this.isAvailable()) {
            return { success: false, reason: 'PowerPoint not available or not Windows platform' };
        }

        const { template = {}, slideTypes = [] } = options;

        // 处理路径相同的情况：PowerPoint 不能保存到同一个文件
        let actualInputPath = inputPath;
        let tempCopyPath = null;

        if (inputPath === outputPath) {
            // 复制到临时文件
            tempCopyPath = path.join(path.dirname(inputPath), `temp_input_${Date.now()}.pptx`);
            fs.copyFileSync(inputPath, tempCopyPath);
            actualInputPath = tempCopyPath;
        }

        const script = this._buildPowerShellScript(actualInputPath, outputPath, template, slideTypes);

        try {
            console.log('[COM Backend] 正在调用PowerPoint添加动画...');

            // 写入临时脚本文件
            const tempScriptPath = path.join(path.dirname(inputPath), `anim_${Date.now()}.ps1`);
            fs.writeFileSync(tempScriptPath, script, 'utf8');

            // 执行脚本
            const result = execSync(`powershell -ExecutionPolicy Bypass -File "${tempScriptPath}"`, {
                encoding: 'utf8',
                timeout: 120000,
                maxBuffer: 10 * 1024 * 1024
            });

            // 删除临时文件和脚本
            try { fs.unlinkSync(tempScriptPath); } catch (e) {}
            if (tempCopyPath) {
                try { fs.unlinkSync(tempCopyPath); } catch (e) {}
            }

            if (result.includes('Success')) {
                return { success: true };
            } else {
                return { success: false, reason: result.trim() };
            }
        } catch (error) {
            // 清理临时文件
            if (tempCopyPath) {
                try { fs.unlinkSync(tempCopyPath); } catch (e) {}
            }
            return { success: false, reason: error.message };
        }
    }
}

module.exports = COMAnimationBackend;
module.exports.EFFECT_ENUMS = EFFECT_ENUMS;
module.exports.DIRECTION_ENUMS = DIRECTION_ENUMS;
module.exports.TRANSITION_ENUMS = TRANSITION_ENUMS;
module.exports.ELEMENT_ANIMATION_CONSTANTS = ELEMENT_ANIMATION_CONSTANTS;
module.exports.getAnimationParamsForContentType = getAnimationParamsForContentType;
module.exports.detectShapeContentType = detectShapeContentType;