/**
 * Modern PPT 动画引擎 - 核心模块
 *
 * 提供三套预设动画模板，支持切换动画和元素动画的 XML 生成
 */

// ==========================================
// 进入动画 presetID 映射（来自 PowerPoint OOXML 规范）
// ==========================================
const ENTRANCE_ANIMATIONS = {
    appear: { presetID: 1, presetSubtype: 0, duration: 0 },
    flyIn: { presetID: 2, presetSubtype: 0, duration: 500 },      // 0=left, 1=top, 2=right, 3=bottom
    flyInFromLeft: { presetID: 2, presetSubtype: 0, duration: 500 },
    flyInFromTop: { presetID: 2, presetSubtype: 1, duration: 500 },
    flyInFromRight: { presetID: 2, presetSubtype: 2, duration: 500 },
    flyInFromBottom: { presetID: 2, presetSubtype: 3, duration: 500 },
    split: { presetID: 3, presetSubtype: 0, duration: 600 },
    wipe: { presetID: 4, presetSubtype: 0, duration: 500 },
    shape: { presetID: 5, presetSubtype: 0, duration: 600 },
    floatIn: { presetID: 6, presetSubtype: 0, duration: 500 },    // 0=up, 1=down
    floatInFromUp: { presetID: 6, presetSubtype: 0, duration: 500 },
    floatInFromDown: { presetID: 6, presetSubtype: 1, duration: 500 },
    wheel: { presetID: 7, presetSubtype: 4, duration: 800 },
    randomBars: { presetID: 8, presetSubtype: 0, duration: 600 },
    growAndTurn: { presetID: 12, presetSubtype: 0, duration: 600 },
    zoom: { presetID: 13, presetSubtype: 0, duration: 500 },
    zoomIn: { presetID: 13, presetSubtype: 0, duration: 500 },
    swivel: { presetID: 14, presetSubtype: 0, duration: 600 },
    bounce: { presetID: 15, presetSubtype: 0, duration: 600 },    // 0=left, 1=top, 2=right, 3=bottom
    bounceFromLeft: { presetID: 15, presetSubtype: 0, duration: 600 },
    bounceFromTop: { presetID: 15, presetSubtype: 1, duration: 600 },
    bounceFromRight: { presetID: 15, presetSubtype: 2, duration: 600 },
    bounceFromBottom: { presetID: 15, presetSubtype: 3, duration: 600 },
    spinner: { presetID: 22, presetSubtype: 0, duration: 800 },
    wedge: { presetID: 25, presetSubtype: 0, duration: 800 },
    dissolveIn: { presetID: 27, presetSubtype: 0, duration: 600 }
};

// ==========================================
// 强调动画 presetID 映射
// ==========================================
const EMPHASIS_ANIMATIONS = {
    pulse: { presetID: 1, presetSubtype: 0, duration: 500 },
    colorPulse: { presetID: 2, presetSubtype: 0, duration: 500 },
    teeter: { presetID: 3, presetSubtype: 0, duration: 500 },
    spin: { presetID: 4, presetSubtype: 0, duration: 800 },
    grow: { presetID: 5, presetSubtype: 0, duration: 500 },
    shrink: { presetID: 5, presetSubtype: 1, duration: 500 },
    growShrink: { presetID: 5, presetSubtype: 2, duration: 600 },
    darken: { presetID: 9, presetSubtype: 0, duration: 400 },
    lighten: { presetID: 10, presetSubtype: 0, duration: 400 },
    transparency: { presetID: 11, presetSubtype: 0, duration: 400 },
    flashBulb: { presetID: 23, presetSubtype: 0, duration: 600 },
    wave: { presetID: 18, presetSubtype: 0, duration: 600 }
};

// ==========================================
// 退出动画 presetID 映射
// ==========================================
const EXIT_ANIMATIONS = {
    disappear: { presetID: 1, presetSubtype: 0, duration: 0 },
    flyOut: { presetID: 2, presetSubtype: 0, duration: 500 },
    floatOut: { presetID: 6, presetSubtype: 0, duration: 500 },
    zoomOut: { presetID: 13, presetSubtype: 0, duration: 500 },
    shrinkOut: { presetID: 5, presetSubtype: 1, duration: 500 }
};

// ==========================================
// 切换动画 XML 模板
// ==========================================
const TRANSITION_TEMPLATES = {
    fade: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:fade/></p:transition>`,
    fadeThroughBlack: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:fade thruBlk="true"/></p:transition>`,
    push: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="${dir}"/></p:transition>`,
    pushLeft: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="l"/></p:transition>`,
    pushRight: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:push dir="r"/></p:transition>`,
    wipe: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="${dir}"/></p:transition>`,
    wipeLeft: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="l"/></p:transition>`,
    wipeRight: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wipe dir="r"/></p:transition>`,
    dissolve: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:dissolve/></p:transition>`,
    split: (speed = 'med', orient = 'horz', dir = 'out') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:split orient="${orient}" dir="${dir}"/></p:transition>`,
    zoom: (speed = 'med', dir = 'in') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:zoom dir="${dir}"/></p:transition>`,
    circle: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:circle/></p:transition>`,
    diamond: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:diamond/></p:transition>`,
    wheel: (speed = 'med', spokes = 4) => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wheel spokes="${spokes}"/></p:transition>`,
    wedge: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:wedge/></p:transition>`,
    blinds: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:blinds orient="${orient}"/></p:transition>`,
    checker: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:checker orient="${orient}"/></p:transition>`,
    comb: (speed = 'med', orient = 'horz') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:comb orient="${orient}"/></p:transition>`,
    cover: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:cover dir="${dir}"/></p:transition>`,
    pull: (speed = 'med', dir = 'r') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:pull dir="${dir}"/></p:transition>`,
    strips: (speed = 'med', dir = 'rd') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:strips dir="${dir}"/></p:transition>`,
    newsflash: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:newsflash/></p:transition>`,
    random: (speed = 'med') => `<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="${speed}"><p:random/></p:transition>`
};

// ==========================================
// 三套预设动画模板
// ==========================================
const ANIMATION_TEMPLATES = {
    // 模板 A：专业简洁（商务汇报）
    professional: {
        name: 'professional',
        description: '专业简洁，适合商务汇报',
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
        description: '适度炫酷，适合产品展示',
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
        description: '极致炫酷，适合发布会',
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
// 速度映射
// ==========================================
const SPEED_VALUES = {
    veryFast: 200,
    fast: 500,
    med: 800,
    slow: 1200,
    verySlow: 1500
};

// ==========================================
// XML 生成函数
// ==========================================

/**
 * 生成切换动画 XML
 */
function generateTransitionXML(transition, speed = 'med') {
    const template = TRANSITION_TEMPLATES[transition.type];
    if (!template) {
        return TRANSITION_TEMPLATES.fade(speed);
    }
    return template(speed, transition.direction);
}

/**
 * 生成单个元素动画 XML
 */
function generateElementAnimationXML(shapeId, animationType, delay = 0, presetClass = 'entr') {
    const animDef = ENTRANCE_ANIMATIONS[animationType] ||
                     EMPHASIS_ANIMATIONS[animationType] ||
                     EXIT_ANIMATIONS[animationType];

    if (!animDef) {
        return '';
    }

    const { presetID, presetSubtype, duration } = animDef;
    const actualClass = ENTRANCE_ANIMATIONS[animationType] ? 'entr' :
                        EMPHASIS_ANIMATIONS[animationType] ? 'emph' : 'exit';

    return `<p:par>
        <p:cTn id="3" fill="hold">
            <p:stCondLst>
                <p:cond delay="${delay}"/>
            </p:stCondLst>
            <p:childTnLst>
                <p:par>
                    <p:cTn id="4" presetID="${presetID}" presetClass="${actualClass}"
                           presetSubtype="${presetSubtype}" fill="hold" grpId="0"
                           nodeType="withEffect">
                        <p:stCondLst>
                            <p:cond delay="0"/>
                        </p:stCondLst>
                        <p:childTnLst>
                            <p:set>
                                <p:cBhvr>
                                    <p:cTn id="5" dur="1" fill="hold">
                                        <p:stCondLst><p:cond delay="0"/></p:stCondLst>
                                    </p:cTn>
                                    <p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl>
                                    <p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>
                                </p:cBhvr>
                                <p:to><p:strVal val="visible"/></p:to>
                            </p:set>
                            <p:anim calcmode="lin" valueType="num">
                                <p:cBhvr additive="base">
                                    <p:cTn id="6" dur="${duration}" fill="hold"/>
                                    <p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl>
                                    <p:attrNameLst><p:attrName>ppt_x</p:attrName></p:attrNameLst>
                                </p:cBhvr>
                                <p:tavLst>
                                    <p:tav tm="0"><p:val><p:strVal val="#ppt_x"/></p:val></p:tav>
                                    <p:tav tm="100000"><p:val><p:strVal val="#ppt_x"/></p:val></p:tav>
                                </p:tavLst>
                            </p:anim>
                        </p:childTnLst>
                    </p:cTn>
                </p:par>
            </p:childTnLst>
        </p:cTn>
    </p:par>`;
}

/**
 * 生成复合动画 XML
 */
function generateCompoundAnimationXML(shapeId, animations, delay = 0) {
    let currentDelay = delay;
    let xmlParts = [];

    animations.forEach((anim, index) => {
        const animType = anim.type;
        const animDef = ENTRANCE_ANIMATIONS[animType] ||
                        EMPHASIS_ANIMATIONS[animType];

        if (!animDef) return;

        const { presetID, presetSubtype, duration } = animDef;
        const presetClass = ENTRANCE_ANIMATIONS[animType] ? 'entr' : 'emph';

        xmlParts.push(`<p:par>
            <p:cTn id="${3 + index * 10}" fill="hold">
                <p:stCondLst>
                    <p:cond delay="${currentDelay}"/>
                </p:stCondLst>
                <p:childTnLst>
                    <p:par>
                        <p:cTn id="${4 + index * 10}" presetID="${presetID}" presetClass="${presetClass}"
                               presetSubtype="${presetSubtype}" fill="hold" grpId="0"
                               nodeType="withEffect">
                            <p:stCondLst>
                                <p:cond delay="0"/>
                            </p:stCondLst>
                            <p:childTnLst>
                                <p:set>
                                    <p:cBhvr>
                                        <p:cTn id="${5 + index * 10}" dur="1" fill="hold">
                                            <p:stCondLst><p:cond delay="0"/></p:stCondLst>
                                        </p:cTn>
                                        <p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl>
                                        <p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>
                                    </p:cBhvr>
                                    <p:to><p:strVal val="visible"/></p:to>
                                </p:set>
                                <p:anim calcmode="lin" valueType="num">
                                    <p:cBhvr additive="base">
                                        <p:cTn id="${6 + index * 10}" dur="${duration}" fill="hold"/>
                                        <p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl>
                                        <p:attrNameLst><p:attrName>ppt_x</p:attrName></p:attrNameLst>
                                    </p:cBhvr>
                                    <p:tavLst>
                                        <p:tav tm="0"><p:val><p:strVal val="#ppt_x"/></p:val></p:tav>
                                        <p:tav tm="100000"><p:val><p:strVal val="#ppt_x"/></p:val></p:tav>
                                    </p:tavLst>
                                </p:anim>
                            </p:childTnLst>
                        </p:cTn>
                    </p:par>
                </p:childTnLst>
            </p:cTn>
        </p:par>`);

        currentDelay += duration;
    });

    return xmlParts.join('\n');
}

/**
 * 生成完整的 p:timing XML 结构（简化版 - 仅支持appear动画）
 */
function generateTimingXML(animationElements) {
    const animationsXML = animationElements.join('\n');

    return `<p:timing xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
    <p:tnLst>
        <p:par>
            <p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">
                <p:childTnLst>
                    <p:seq concurrent="1" nextAc="seek">
                        <p:cTn id="2" dur="indefinite" nodeType="mainSeq">
                            <p:childTnLst>
                                ${animationsXML}
                            </p:childTnLst>
                        </p:cTn>
                        <p:prevCondLst>
                            <p:cond evt="onPrev" delay="0">
                                <p:tgtEl><p:sldTgt/></p:tgtEl>
                            </p:cond>
                        </p:prevCondLst>
                        <p:nextCondLst>
                            <p:cond evt="onNext" delay="0">
                                <p:tgtEl><p:sldTgt/></p:tgtEl>
                            </p:cond>
                        </p:nextCondLst>
                    </p:seq>
                </p:childTnLst>
            </p:cTn>
        </p:par>
    </p:tnLst>
</p:timing>`;
}

/**
 * 生成简单的出现动画 XML（兼容性最好）
 */
function generateAppearAnimationXML(shapeId, delay = 0, startId = 3) {
    return `<p:par>
        <p:cTn id="${startId}" presetID="1" presetClass="entr" presetSubtype="0" fill="hold" nodeType="withEffect">
            <p:stCondLst><p:cond delay="${delay}"/></p:stCondLst>
            <p:childTnLst>
                <p:set>
                    <p:cBhvr>
                        <p:cTn id="${startId + 1}" dur="1" fill="hold">
                            <p:stCondLst><p:cond delay="0"/></p:stCondLst>
                        </p:cTn>
                        <p:tgtEl><p:spTgt spid="${shapeId}"/></p:tgtEl>
                        <p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>
                    </p:cBhvr>
                    <p:to><p:strVal val="visible"/></p:to>
                </p:set>
            </p:childTnLst>
        </p:cTn>
    </p:par>`;
}

/**
 * 根据风格获取默认模板
 */
function getTemplateForStyle(styleName) {
    const templateName = STYLE_TEMPLATE_MAPPING[styleName] || 'professional';
    return ANIMATION_TEMPLATES[templateName];
}

/**
 * 获取动画定义
 */
function getAnimationDefinition(animationType) {
    return ENTRANCE_ANIMATIONS[animationType] ||
           EMPHASIS_ANIMATIONS[animationType] ||
           EXIT_ANIMATIONS[animationType] ||
           null;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    // 动画定义
    ENTRANCE_ANIMATIONS,
    EMPHASIS_ANIMATIONS,
    EXIT_ANIMATIONS,
    TRANSITION_TEMPLATES,

    // 模板
    ANIMATION_TEMPLATES,
    STYLE_TEMPLATE_MAPPING,

    // 配置
    SPEED_VALUES,

    // 生成函数
    generateTransitionXML,
    generateElementAnimationXML,
    generateCompoundAnimationXML,
    generateTimingXML,
    generateAppearAnimationXML,

    // 工具函数
    getTemplateForStyle,
    getAnimationDefinition
};