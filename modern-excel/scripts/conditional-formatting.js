/**
 * Conditional Formatting Engine - v7.0
 *
 * Conditional formatting rules for Excel
 * Supports: Color scales, Data bars, Icon sets, Custom formulas
 *
 * Note: Full implementation requires openpyxl (Python)
 * This module provides configuration for conditional formatting
 */

// ==========================================
// Color Scale Rules
// ==========================================

const COLOR_SCALE_RULES = {
    // Two-color scale (white to primary)
    twoColor: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: 'FFFFFF' },
            max: { type: 'max', color: 'PRIMARY' }
        }
    },

    // Three-color scale (red-yellow-green) - Performance
    performance: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: 'F8696B' },      // Red (bad)
            mid: { type: 'percentile', value: 50, color: 'FFEB84' }, // Yellow (average)
            max: { type: 'max', color: '63BE7B' }       // Green (good)
        }
    },

    // Three-color scale (green-yellow-red) - Reverse performance
    performanceReverse: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: '63BE7B' },      // Green (good)
            mid: { type: 'percentile', value: 50, color: 'FFEB84' }, // Yellow (average)
            max: { type: 'max', color: 'F8696B' }       // Red (bad)
        }
    },

    // Positive trend (white to green)
    positive: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: 'FFFFFF' },
            max: { type: 'max', color: '10B981' }
        }
    },

    // Negative trend (white to red)
    negative: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: 'FFFFFF' },
            max: { type: 'max', color: 'EF4444' }
        }
    },

    // Heat map (blue to red)
    heatMap: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: '3B82F6' },      // Blue (low)
            mid: { type: 'percentile', value: 50, color: 'FBBF24' }, // Yellow (mid)
            max: { type: 'max', color: 'EF4444' }       // Red (high)
        }
    },

    // Gradient (primary to accent)
    gradient: {
        type: 'colorScale',
        config: {
            min: { type: 'min', color: 'PRIMARY' },
            max: { type: 'max', color: 'ACCENT' }
        }
    },

    // Custom style-specific scale
    styleScale: {
        type: 'colorScale',
        config: null,  // Will be filled from style
        description: 'Uses style-specific color scale'
    }
};

// ==========================================
// Data Bar Rules
// ==========================================

const DATA_BAR_RULES = {
    // Standard data bar (gradient)
    standard: {
        type: 'dataBar',
        config: {
            min: { type: 'num', value: 0 },
            max: { type: 'max' },
            color: 'PRIMARY',
            gradient: true,
            showValue: true,
            border: true
        }
    },

    // Solid data bar
    solid: {
        type: 'dataBar',
        config: {
            min: { type: 'num', value: 0 },
            max: { type: 'max' },
            color: 'PRIMARY',
            gradient: false,
            showValue: true,
            border: false
        }
    },

    // Positive data bar (green)
    positive: {
        type: 'dataBar',
        config: {
            min: { type: 'min' },
            max: { type: 'max' },
            color: '10B981',
            gradient: true,
            showValue: true
        }
    },

    // Negative data bar (red)
    negative: {
        type: 'dataBar',
        config: {
            min: { type: 'min' },
            max: { type: 'max' },
            color: 'EF4444',
            gradient: true,
            showValue: true
        }
    },

    // Progress bar (blue)
    progress: {
        type: 'dataBar',
        config: {
            min: { type: 'num', value: 0 },
            max: { type: 'num', value: 100 },
            color: '3B82F6',
            gradient: true,
            showValue: false,
            border: true
        }
    },

    // Style-specific data bar
    styleDataBar: {
        type: 'dataBar',
        config: null,
        description: 'Uses style-specific data bar color'
    }
};

// ==========================================
// Icon Set Rules
// ==========================================

const ICON_SET_RULES = {
    // 3 Arrows (up, side, down)
    arrows3: {
        type: 'iconSet',
        config: {
            iconSet: '3Arrows',
            showIconOnly: false,
            reverse: false,
            icons: [
                { type: 'percent', value: 0 },    // Down arrow
                { type: 'percent', value: 33 },   // Side arrow
                { type: 'percent', value: 67 }    // Up arrow
            ]
        }
    },

    // 3 Arrows Colored
    arrows3Colored: {
        type: 'iconSet',
        config: {
            iconSet: '3ArrowsGray',
            showIconOnly: false,
            reverse: false
        }
    },

    // 3 Flags (red, yellow, green)
    flags3: {
        type: 'iconSet',
        config: {
            iconSet: '3Flags',
            showIconOnly: false,
            reverse: false
        }
    },

    // 3 Traffic Lights
    trafficLights: {
        type: 'iconSet',
        config: {
            iconSet: '3TrafficLights1',
            showIconOnly: false,
            reverse: false
        }
    },

    // 3 Signs (circle, triangle, diamond)
    signs3: {
        type: 'iconSet',
        config: {
            iconSet: '3Signs',
            showIconOnly: false,
            reverse: false
        }
    },

    // 3 Symbols (check, exclamation, cross)
    symbols3: {
        type: 'iconSet',
        config: {
            iconSet: '3Symbols',
            showIconOnly: false,
            reverse: false
        }
    },

    // 3 Stars
    stars3: {
        type: 'iconSet',
        config: {
            iconSet: '3Stars',
            showIconOnly: false,
            reverse: false
        }
    },

    // 4 Arrows
    arrows4: {
        type: 'iconSet',
        config: {
            iconSet: '4Arrows',
            showIconOnly: false,
            reverse: false
        }
    },

    // 4 Arrows Gray
    arrows4Gray: {
        type: 'iconSet',
        config: {
            iconSet: '4ArrowsGray',
            showIconOnly: false,
            reverse: false
        }
    },

    // 4 Traffic Lights
    trafficLights4: {
        type: 'iconSet',
        config: {
            iconSet: '4TrafficLights',
            showIconOnly: false,
            reverse: false
        }
    },

    // 5 Arrows
    arrows5: {
        type: 'iconSet',
        config: {
            iconSet: '5Arrows',
            showIconOnly: false,
            reverse: false
        }
    },

    // 5 Ratings (bars)
    ratings5: {
        type: 'iconSet',
        config: {
            iconSet: '5Rating',
            showIconOnly: false,
            reverse: false
        }
    },

    // 5 Quarters (pie slices)
    quarters5: {
        type: 'iconSet',
        config: {
            iconSet: '5Quarters',
            showIconOnly: false,
            reverse: false
        }
    },

    // 5 Boxes
    boxes5: {
        type: 'iconSet',
        config: {
            iconSet: '5Boxes',
            showIconOnly: false,
            reverse: false
        }
    }
};

// ==========================================
// Formula Rules (Custom)
// ==========================================

const FORMULA_RULES = {
    // Highlight duplicates
    duplicates: {
        type: 'formula',
        formula: 'COUNTIF($A$1:$A$100, A1) > 1',
        fill: 'FFC7CE',  // Light red
        font: { color: '9C0006' }
    },

    // Highlight unique values
    unique: {
        type: 'formula',
        formula: 'COUNTIF($A$1:$A$100, A1) = 1',
        fill: 'C6EFCE',  // Light green
        font: { color: '006100' }
    },

    // Highlight blanks
    blanks: {
        type: 'formula',
        formula: 'ISBLANK(A1)',
        fill: 'FFEB9C',  // Light yellow
        font: { color: '9C6500' }
    },

    // Highlight errors
    errors: {
        type: 'formula',
        formula: 'ISERROR(A1)',
        fill: 'FFC7CE',
        font: { color: '9C0006' }
    },

    // Highlight above average
    aboveAverage: {
        type: 'formula',
        formula: 'A1 > AVERAGE($A$1:$A$100)',
        fill: 'C6EFCE',
        font: { color: '006100' }
    },

    // Highlight below average
    belowAverage: {
        type: 'formula',
        formula: 'A1 < AVERAGE($A$1:$A$100)',
        fill: 'FFC7CE',
        font: { color: '9C0006' }
    },

    // Highlight top 10
    top10: {
        type: 'formula',
        formula: 'A1 >= LARGE($A$1:$A$100, 10)',
        fill: 'C6EFCE',
        font: { color: '006100', bold: true }
    },

    // Highlight bottom 10
    bottom10: {
        type: 'formula',
        formula: 'A1 <= SMALL($A$1:$A$100, 10)',
        fill: 'FFC7CE',
        font: { color: '9C0006' }
    },

    // Highlight every other row
    alternateRow: {
        type: 'formula',
        formula: 'MOD(ROW(), 2) = 0',
        fill: 'ALTROWBG',
        description: 'Alternating row shading'
    },

    // Status-based highlighting
    statusComplete: {
        type: 'formula',
        formula: 'A1 = "Complete"',
        fill: '10B981',
        font: { color: 'FFFFFF', bold: true }
    },

    statusInProgress: {
        type: 'formula',
        formula: 'A1 = "In Progress"',
        fill: 'FBBF24',
        font: { color: '000000' }
    },

    statusNotStarted: {
        type: 'formula',
        formula: 'A1 = "Not Started"',
        fill: 'E5E7EB',
        font: { color: '6B7280' }
    },

    // Budget status
    overBudget: {
        type: 'formula',
        formula: 'B1 > A1',  // Actual > Budget
        fill: 'EF4444',
        font: { color: 'FFFFFF', bold: true }
    },

    underBudget: {
        type: 'formula',
        formula: 'B1 < A1 * 0.9',  // Actual < 90% of Budget
        fill: '10B981',
        font: { color: 'FFFFFF' }
    },

    onTarget: {
        type: 'formula',
        formula: 'AND(B1 >= A1 * 0.9, B1 <= A1)',
        fill: 'FBBF24',
        font: { color: '000000' }
    },

    // Progress thresholds
    progressComplete: {
        type: 'formula',
        formula: 'A1 >= 100',
        fill: '10B981',
        font: { color: 'FFFFFF', bold: true }
    },

    progressHigh: {
        type: 'formula',
        formula: 'AND(A1 >= 75, A1 < 100)',
        fill: '34D399',
        font: { color: 'FFFFFF' }
    },

    progressMedium: {
        type: 'formula',
        formula: 'AND(A1 >= 50, A1 < 75)',
        fill: 'FBBF24',
        font: { color: '000000' }
    },

    progressLow: {
        type: 'formula',
        formula: 'A1 < 50',
        fill: 'EF4444',
        font: { color: 'FFFFFF' }
    },

    // Date-based
    overdue: {
        type: 'formula',
        formula: 'A1 < TODAY()',
        fill: 'EF4444',
        font: { color: 'FFFFFF', bold: true }
    },

    dueToday: {
        type: 'formula',
        formula: 'A1 = TODAY()',
        fill: 'FBBF24',
        font: { color: '000000', bold: true }
    },

    dueThisWeek: {
        type: 'formula',
        formula: 'AND(A1 >= TODAY(), A1 <= TODAY() + 7)',
        fill: 'FDE68A',
        font: { color: '000000' }
    },

    upcoming: {
        type: 'formula',
        formula: 'A1 > TODAY() + 7',
        fill: 'D1FAE5',
        font: { color: '10B981' }
    }
};

// ==========================================
// Conditional Formatting Configuration Builder
// ==========================================

function createConditionalFormatConfig(type, range, options = {}) {
    const rules = {
        colorScale: COLOR_SCALE_RULES,
        dataBar: DATA_BAR_RULES,
        iconSet: ICON_SET_RULES,
        formula: FORMULA_RULES
    };

    const ruleDef = rules[type]?.[options.ruleName || 'standard'];
    if (!ruleDef) {
        throw new Error(`Unknown conditional format rule: ${type}/${options.ruleName}`);
    }

    const config = {
        type: ruleDef.type,
        range: range,
        ...applyStyleColors(ruleDef.config, options.styleColors)
    };

    return config;
}

function applyStyleColors(config, styleColors) {
    if (!config) return config;

    const result = { ...config };

    // Replace color placeholders with style colors
    if (result.color === 'PRIMARY') {
        result.color = styleColors?.primary || '3B82F6';
    }
    if (result.color === 'SECONDARY') {
        result.color = styleColors?.secondary || '6B7280';
    }
    if (result.color === 'ACCENT') {
        result.color = styleColors?.accent || '10B981';
    }
    if (result.color === 'POSITIVE') {
        result.color = styleColors?.positive || '10B981';
    }
    if (result.color === 'NEGATIVE') {
        result.color = styleColors?.negative || 'EF4444';
    }
    if (result.color === 'NEUTRAL') {
        result.color = styleColors?.neutral || 'FBBF24';
    }
    if (result.color === 'ALTROWBG') {
        result.color = styleColors?.altRowBg || 'F3F4F6';
    }

    // Handle color scale colors
    if (result.min?.color === 'PRIMARY') {
        result.min.color = styleColors?.primary || '3B82F6';
    }
    if (result.max?.color === 'PRIMARY') {
        result.max.color = styleColors?.primary || '3B82F6';
    }
    if (result.max?.color === 'ACCENT') {
        result.max.color = styleColors?.accent || '10B981';
    }

    // Handle fill colors
    if (result.fill === 'POSITIVE') {
        result.fill = styleColors?.positive || '10B981';
    }
    if (result.fill === 'NEGATIVE') {
        result.fill = styleColors?.negative || 'EF4444';
    }
    if (result.fill === 'NEUTRAL') {
        result.fill = styleColors?.neutral || 'FBBF24';
    }
    if (result.fill === 'ALTROWBG') {
        result.fill = styleColors?.altRowBg || 'F3F4F6';
    }

    return result;
}

// ==========================================
// Python Conditional Format Generator
// ==========================================

function generatePythonConditionalFormatScript(config) {
    const { type, range, ...options } = config;

    let script = '';

    switch (type) {
        case 'colorScale':
            script = generateColorScaleScript(range, options);
            break;

        case 'dataBar':
            script = generateDataBarScript(range, options);
            break;

        case 'iconSet':
            script = generateIconSetScript(range, options);
            break;

        case 'formula':
            script = generateFormulaRuleScript(range, options);
            break;
    }

    return script;
}

function generateColorScaleScript(range, config) {
    const { min, mid, max } = config;

    if (mid) {
        return `
# Color Scale (3-color)
color_scale_rule = ColorScaleRule(
    start_type='${min.type}',
    start_value=${min.value || 'null'},
    start_color='${min.color}',
    mid_type='${mid.type}',
    mid_value=${mid.value || 50},
    mid_color='${mid.color}',
    end_type='${max.type}',
    end_value=${max.value || 'null'},
    end_color='${max.color}'
)
ws.conditional_formatting.add('${range}', color_scale_rule)
`;
    } else {
        return `
# Color Scale (2-color)
color_scale_rule = ColorScaleRule(
    start_type='${min.type}',
    start_color='${min.color}',
    end_type='${max.type}',
    end_color='${max.color}'
)
ws.conditional_formatting.add('${range}', color_scale_rule)
`;
    }
}

function generateDataBarScript(range, config) {
    const { min, max, color, gradient, showValue, border } = config;

    return `
# Data Bar
data_bar_rule = DataBarRule(
    start_type='${min.type}',
    start_value=${min.value || 'null'},
    end_type='${max.type}',
    end_value=${max.value || 'null'},
    color='${color}',
    showValue=${showValue ? 'True' : 'False'},
    gradient=${gradient ? 'True' : 'False'},
    border=${border ? 'True' : 'False'}
)
ws.conditional_formatting.add('${range}', data_bar_rule)
`;
}

function generateIconSetScript(range, config) {
    const { iconSet, showIconOnly, reverse, icons } = config;

    return `
# Icon Set
icon_set_rule = IconSetRule(
    icon_style='${iconSet}',
    type='percent',
    values=[${icons?.map(i => i.value).join(', ') || '0, 33, 67'}],
    showValue=${showIconOnly ? 'False' : 'True'},
    reverse=${reverse ? 'True' : 'False'}
)
ws.conditional_formatting.add('${range}', icon_set_rule)
`;
}

function generateFormulaRuleScript(range, config) {
    const { formula, fill, font } = config;

    return `
# Formula Rule
formula_rule = FormulaRule(
    formula=['${formula}'],
    fill=PatternFill(start_color='${fill}', end_color='${fill}', fill_type='solid'),
    font=Font(color='${font?.color || '000000'}', bold=${font?.bold ? 'True' : 'False'})
)
ws.conditional_formatting.add('${range}', formula_rule)
`;
}

// ==========================================
// Pre-built Conditional Formatting Sets for Table Types
// ==========================================

const TABLE_CONDITIONAL_FORMATS = {
    financialReport: {
        columns: {
            'Revenue': { type: 'colorScale', ruleName: 'positive' },
            'Profit': { type: 'colorScale', ruleName: 'performance' },
            'Margin': { type: 'dataBar', ruleName: 'progress' }
        }
    },

    comparisonTable: {
        columns: {
            'Variance': { type: 'colorScale', ruleName: 'performanceReverse' },
            'Variance%': { type: 'dataBar', ruleName: 'negative' },
            'Status': {
                type: 'formula',
                ruleName: 'overBudget',
                condition: 'value = "Over"'
            }
        }
    },

    projectProgress: {
        columns: {
            'Progress': { type: 'dataBar', ruleName: 'progress' },
            'Remaining': { type: 'colorScale', ruleName: 'negative' },
            'Status': {
                type: 'formula',
                multiple: [
                    { ruleName: 'statusComplete' },
                    { ruleName: 'statusInProgress' }
                ]
            }
        }
    },

    timeline: {
        columns: {
            'Progress': { type: 'dataBar', ruleName: 'progress' },
            'Duration': { type: 'colorScale', ruleName: 'gradient' }
        }
    },

    dashboard: {
        metrics: {
            'change': { type: 'iconSet', ruleName: 'arrows3' }
        }
    }
};

// ==========================================
// All Rules Combined
// ==========================================

const CONDITIONAL_FORMATTING_RULES = {
    colorScale: COLOR_SCALE_RULES,
    dataBar: DATA_BAR_RULES,
    iconSet: ICON_SET_RULES,
    formula: FORMULA_RULES,
    tableFormats: TABLE_CONDITIONAL_FORMATS
};

// ==========================================
// Export
// ==========================================

module.exports = {
    CONDITIONAL_FORMATTING_RULES,
    COLOR_SCALE_RULES,
    DATA_BAR_RULES,
    ICON_SET_RULES,
    FORMULA_RULES,
    TABLE_CONDITIONAL_FORMATS,
    createConditionalFormatConfig,
    generatePythonConditionalFormatScript,
    applyStyleColors
};