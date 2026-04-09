/**
 * Formula Templates Library - v7.0
 *
 * Pre-built formula templates for Excel spreadsheets
 * Categories: Financial, Statistical, Logical, Lookup, Date
 */

const FORMULA_TEMPLATES = {
    // ==========================================
    // Financial Formulas
    // ==========================================
    financial: {
        // Sum totals
        sum: {
            template: 'SUM({range})',
            description: 'Calculate total sum of a range',
            example: 'SUM(B2:B10)',
            useCase: 'Revenue totals, expense totals'
        },

        // Revenue calculation
        revenue: {
            template: '{PriceCol} * {QuantityCol}',
            description: 'Revenue = Price * Quantity',
            example: 'B2 * C2',
            useCase: 'Sales revenue calculation'
        },

        // Profit calculation
        profit: {
            template: '{RevenueCol} - {CostCol}',
            description: 'Profit = Revenue - Cost',
            example: 'B2 - C2',
            useCase: 'Profit margin analysis'
        },

        // Gross margin
        grossMargin: {
            template: '({RevenueCol} - {CostCol}) / {RevenueCol}',
            description: 'Gross Margin = (Revenue - Cost) / Revenue',
            example: '(B2 - C2) / B2',
            useCase: 'Profitability analysis',
            format: 'percentage'
        },

        // ROI calculation
        roi: {
            template: '({GainCol} - {InvestmentCol}) / {InvestmentCol}',
            description: 'ROI = (Gain - Investment) / Investment',
            example: '(B2 - A2) / A2',
            useCase: 'Investment analysis',
            format: 'percentage'
        },

        // Compound growth rate
        cagr: {
            template: '({EndValue} / {StartValue}) ^ (1 / {Years}) - 1',
            description: 'Compound Annual Growth Rate',
            example: '(B10 / B2) ^ (1 / 9) - 1',
            useCase: 'Long-term growth analysis',
            format: 'percentage'
        },

        // NPV calculation
        npv: {
            template: 'NPV({rate}, {values}) + {initialInvestment}',
            description: 'Net Present Value',
            example: 'NPV(0.1, B3:B10) + B2',
            useCase: 'Investment evaluation'
        },

        // IRR calculation
        irr: {
            template: 'IRR({values})',
            description: 'Internal Rate of Return',
            example: 'IRR(B2:B10)',
            useCase: 'Investment return analysis',
            format: 'percentage'
        },

        // Depreciation (straight line)
        depreciationSL: {
            template: 'SLN({cost}, {salvage}, {life})',
            description: 'Straight-line depreciation',
            example: 'SLN(A2, B2, C2)',
            useCase: 'Asset depreciation'
        },

        // Loan payment (PMT)
        loanPayment: {
            template: 'PMT({rate}, {periods}, {principal})',
            description: 'Monthly loan payment',
            example: 'PMT(0.05/12, 360, 200000)',
            useCase: 'Loan calculations',
            format: 'currency'
        }
    },

    // ==========================================
    // Statistical Formulas
    // ==========================================
    statistical: {
        // Average
        average: {
            template: 'AVERAGE({range})',
            description: 'Calculate average of values',
            example: 'AVERAGE(B2:B10)',
            useCase: 'Performance averages'
        },

        // Median
        median: {
            template: 'MEDIAN({range})',
            description: 'Calculate median value',
            example: 'MEDIAN(B2:B10)',
            useCase: 'Central tendency analysis'
        },

        // Standard deviation
        stdev: {
            template: 'STDEV({range})',
            description: 'Calculate standard deviation',
            example: 'STDEV(B2:B10)',
            useCase: 'Variance analysis'
        },

        // Count
        count: {
            template: 'COUNT({range})',
            description: 'Count numeric values',
            example: 'COUNT(B2:B10)',
            useCase: 'Data counting'
        },

        // Count non-empty
        countA: {
            template: 'COUNTA({range})',
            description: 'Count non-empty cells',
            example: 'COUNTA(A2:A10)',
            useCase: 'Record counting'
        },

        // Count if
        countIf: {
            template: 'COUNTIF({range}, {criteria})',
            description: 'Count cells matching criteria',
            example: 'COUNTIF(D2:D10, "Complete")',
            useCase: 'Status counts'
        },

        // Sum if
        sumIf: {
            template: 'SUMIF({criteriaRange}, {criteria}, {sumRange})',
            description: 'Sum cells matching criteria',
            example: 'SUMIF(A2:A10, "Marketing", B2:B10)',
            useCase: 'Category totals'
        },

        // Average if
        averageIf: {
            template: 'AVERAGEIF({range}, {criteria}, {averageRange})',
            description: 'Average cells matching criteria',
            example: 'AVERAGEIF(A2:A10, "Sales", B2:B10)',
            useCase: 'Category averages'
        },

        // Max
        max: {
            template: 'MAX({range})',
            description: 'Maximum value in range',
            example: 'MAX(B2:B10)',
            useCase: 'Peak performance'
        },

        // Min
        min: {
            template: 'MIN({range})',
            description: 'Minimum value in range',
            example: 'MIN(B2:B10)',
            useCase: 'Lowest performance'
        },

        // Rank
        rank: {
            template: 'RANK({value}, {range}, {order})',
            description: 'Rank of value in range',
            example: 'RANK(B2, B2:B10, 0)',
            useCase: 'Performance ranking'
        },

        // Percentile
        percentile: {
            template: 'PERCENTILE({range}, {k})',
            description: 'Value at percentile k',
            example: 'PERCENTILE(B2:B10, 0.9)',
            useCase: 'Distribution analysis'
        },

        // Correlation
        correlation: {
            template: 'CORREL({range1}, {range2})',
            description: 'Correlation coefficient',
            example: 'CORREL(A2:A10, B2:B10)',
            useCase: 'Relationship analysis'
        }
    },

    // ==========================================
    // Logical Formulas
    // ==========================================
    logical: {
        // Simple IF
        if: {
            template: 'IF({condition}, {trueValue}, {falseValue})',
            description: 'Basic conditional logic',
            example: 'IF(B2 > 100, "High", "Low")',
            useCase: 'Status classification'
        },

        // Nested IF
        nestedIf: {
            template: 'IF({condition1}, {value1}, IF({condition2}, {value2}, {value3}))',
            description: 'Multi-level conditional',
            example: 'IF(B2 >= 90, "A", IF(B2 >= 80, "B", "C"))',
            useCase: 'Grade assignment, multi-tier classification'
        },

        // AND condition
        and: {
            template: 'AND({condition1}, {condition2})',
            description: 'Multiple conditions AND',
            example: 'AND(B2 > 50, C2 > 50)',
            useCase: 'Multi-criteria validation'
        },

        // OR condition
        or: {
            template: 'OR({condition1}, {condition2})',
            description: 'Multiple conditions OR',
            example: 'OR(B2 = "Yes", C2 = "Yes")',
            useCase: 'Alternative criteria'
        },

        // IF with AND
        ifAnd: {
            template: 'IF(AND({condition1}, {condition2}), {trueValue}, {falseValue})',
            description: 'IF with AND condition',
            example: 'IF(AND(B2 > 100, C2 < 50), "Target", "Other")',
            useCase: 'Compound condition logic'
        },

        // IF with OR
        ifOr: {
            template: 'IF(OR({condition1}, {condition2}), {trueValue}, {falseValue})',
            description: 'IF with OR condition',
            example: 'IF(OR(B2 = "Critical", C2 = "Critical"), "Alert", "Normal")',
            useCase: 'Alert conditions'
        },

        // Status formula
        status: {
            template: 'IF({value} >= {thresholdHigh}, "{statusHigh}", IF({value} >= {thresholdMid}, "{statusMid}", "{statusLow}"))',
            description: 'Three-tier status classification',
            example: 'IF(B2 >= 100, "Excellent", IF(B2 >= 50, "Good", "Poor"))',
            useCase: 'Performance ratings'
        },

        // Budget status
        budgetStatus: {
            template: 'IF({actual} > {budget}, "Over Budget", IF({actual} < {budget} * 0.9, "Under Budget", "On Track"))',
            description: 'Budget tracking status',
            example: 'IF(C2 > B2, "Over", IF(C2 < B2 * 0.9, "Under", "On Track"))',
            useCase: 'Budget management'
        },

        // Progress status
        progressStatus: {
            template: 'IF({progress} >= 100, "Complete", IF({progress} > 0, "In Progress", "Not Started"))',
            description: 'Project progress status',
            example: 'IF(D2 >= 1, "Complete", IF(D2 > 0, "In Progress", "Not Started"))',
            useCase: 'Project tracking'
        },

        // Error handling
        ifError: {
            template: 'IFERROR({formula}, {fallback})',
            description: 'Handle formula errors',
            example: 'IFERROR(B2/C2, 0)',
            useCase: 'Safe division, error prevention'
        },

        // Blank check
        ifBlank: {
            template: 'IF(ISBLANK({cell}), {emptyValue}, {value})',
            description: 'Check for blank cells',
            example: 'IF(ISBLANK(A2), "N/A", A2)',
            useCase: 'Missing data handling'
        }
    },

    // ==========================================
    // Lookup Formulas
    // ==========================================
    lookup: {
        // VLOOKUP
        vlookup: {
            template: 'VLOOKUP({lookupValue}, {tableRange}, {colIndex}, {exactMatch})',
            description: 'Vertical lookup',
            example: 'VLOOKUP(A2, B2:D10, 2, FALSE)',
            useCase: 'Data reference lookup'
        },

        // HLOOKUP
        hlookup: {
            template: 'HLOOKUP({lookupValue}, {tableRange}, {rowIndex}, {exactMatch})',
            description: 'Horizontal lookup',
            example: 'HLOOKUP("Revenue", A1:D10, 2, FALSE)',
            useCase: 'Row-based lookup'
        },

        // INDEX-MATCH
        indexMatch: {
            template: 'INDEX({returnRange}, MATCH({lookupValue}, {lookupRange}, 0))',
            description: 'Flexible lookup with INDEX-MATCH',
            example: 'INDEX(C2:C10, MATCH(A2, B2:B10, 0))',
            useCase: 'Advanced data lookup'
        },

        // XLOOKUP (Excel 365)
        xlookup: {
            template: 'XLOOKUP({lookupValue}, {lookupRange}, {returnRange}, {ifNotFound})',
            description: 'Modern lookup (Excel 365)',
            example: 'XLOOKUP(A2, B2:B10, C2:C10, "Not Found")',
            useCase: 'Modern Excel lookup'
        },

        // INDIRECT
        indirect: {
            template: 'INDIRECT({reference})',
            description: 'Dynamic reference',
            example: 'INDIRECT("Sheet1!A" & B2)',
            useCase: 'Dynamic cell references'
        },

        // OFFSET
        offset: {
            template: 'OFFSET({reference}, {rows}, {cols}, {height}, {width})',
            description: 'Dynamic range offset',
            example: 'OFFSET(A1, 1, 0, 10, 1)',
            useCase: 'Dynamic ranges'
        }
    },

    // ==========================================
    // Date Formulas
    // ==========================================
    date: {
        // Today
        today: {
            template: 'TODAY()',
            description: 'Current date',
            example: 'TODAY()',
            useCase: 'Current date reference'
        },

        // Now
        now: {
            template: 'NOW()',
            description: 'Current date and time',
            example: 'NOW()',
            useCase: 'Timestamp'
        },

        // Date difference
        dateDiff: {
            template: '{endDate} - {startDate}',
            description: 'Days between dates',
            example: 'B2 - A2',
            useCase: 'Duration calculation'
        },

        // DATEDIF
        datedif: {
            template: 'DATEDIF({startDate}, {endDate}, "{unit}")',
            description: 'Date difference in specified unit',
            example: 'DATEDIF(A2, B2, "D")',
            useCase: 'Age, tenure calculation',
            units: ['Y - years', 'M - months', 'D - days']
        },

        // EDATE
        edate: {
            template: 'EDATE({startDate}, {months})',
            description: 'Date shifted by months',
            example: 'EDATE(A2, 12)',
            useCase: 'Future/past date calculation'
        },

        // End of month
        eomonth: {
            template: 'EOMONTH({date}, {months})',
            description: 'End of month date',
            example: 'EOMONTH(A2, 0)',
            useCase: 'Month-end calculations'
        },

        // Year
        year: {
            template: 'YEAR({date})',
            description: 'Extract year',
            example: 'YEAR(A2)',
            useCase: 'Year grouping'
        },

        // Month
        month: {
            template: 'MONTH({date})',
            description: 'Extract month',
            example: 'MONTH(A2)',
            useCase: 'Month grouping'
        },

        // Weekday
        weekday: {
            template: 'WEEKDAY({date}, {returnType})',
            description: 'Day of week number',
            example: 'WEEKDAY(A2, 2)',
            useCase: 'Week-based analysis'
        },

        // Workdays
        networkdays: {
            template: 'NETWORKDAYS({startDate}, {endDate}, {holidays})',
            description: 'Working days between dates',
            example: 'NETWORKDAYS(A2, B2)',
            useCase: 'Project duration'
        },

        // Due date status
        dueDateStatus: {
            template: 'IF({dueDate} < TODAY(), "Overdue", IF({dueDate} = TODAY(), "Due Today", "Upcoming"))',
            description: 'Due date status',
            example: 'IF(B2 < TODAY(), "Overdue", IF(B2 = TODAY(), "Due", "Upcoming"))',
            useCase: 'Deadline tracking'
        }
    },

    // ==========================================
    // Text Formulas
    // ==========================================
    text: {
        // Concatenate
        concatenate: {
            template: 'CONCATENATE({text1}, {text2})',
            description: 'Join text strings',
            example: 'CONCATENATE(A2, " - ", B2)',
            useCase: 'Text combination'
        },

        // Text join (Excel 365)
        textJoin: {
            template: 'TEXTJOIN({delimiter}, {ignoreEmpty}, {range})',
            description: 'Join text with delimiter',
            example: 'TEXTJOIN(", ", TRUE, A2:A10)',
            useCase: 'List creation'
        },

        // Left
        left: {
            template: 'LEFT({text}, {numChars})',
            description: 'Extract left characters',
            example: 'LEFT(A2, 3)',
            useCase: 'Code extraction'
        },

        // Right
        right: {
            template: 'RIGHT({text}, {numChars})',
            description: 'Extract right characters',
            example: 'RIGHT(A2, 4)',
            useCase: 'Suffix extraction'
        },

        // Mid
        mid: {
            template: 'MID({text}, {start}, {numChars})',
            description: 'Extract middle characters',
            example: 'MID(A2, 2, 3)',
            useCase: 'Substring extraction'
        },

        // Upper
        upper: {
            template: 'UPPER({text})',
            description: 'Convert to uppercase',
            example: 'UPPER(A2)',
            useCase: 'Text normalization'
        },

        // Lower
        lower: {
            template: 'LOWER({text})',
            description: 'Convert to lowercase',
            example: 'LOWER(A2)',
            useCase: 'Text normalization'
        },

        // Trim
        trim: {
            template: 'TRIM({text})',
            description: 'Remove extra spaces',
            example: 'TRIM(A2)',
            useCase: 'Text cleanup'
        },

        // Len
        len: {
            template: 'LEN({text})',
            description: 'Text length',
            example: 'LEN(A2)',
            useCase: 'Length validation'
        },

        // Find
        find: {
            template: 'FIND({findText}, {withinText}, {startNum})',
            description: 'Find text position',
            example: 'FIND("-", A2)',
            useCase: 'Text parsing'
        },

        // Substitute
        substitute: {
            template: 'SUBSTITUTE({text}, {oldText}, {newText}, {instanceNum})',
            description: 'Replace text',
            example: 'SUBSTITUTE(A2, " ", "_")',
            useCase: 'Text replacement'
        }
    },

    // ==========================================
    // Array/Formulas (Excel 365)
    // ==========================================
    array: {
        // Unique
        unique: {
            template: 'UNIQUE({range})',
            description: 'Extract unique values',
            example: 'UNIQUE(A2:A100)',
            useCase: 'Distinct value list'
        },

        // Filter
        filter: {
            template: 'FILTER({range}, {condition}, {ifEmpty})',
            description: 'Filter array by condition',
            example: 'FILTER(A2:C100, B2:B100 > 50)',
            useCase: 'Dynamic filtering'
        },

        // Sort
        sort: {
            template: 'SORT({range}, {sortIndex}, {sortOrder})',
            description: 'Sort array',
            example: 'SORT(A2:C10, 2, -1)',
            useCase: 'Dynamic sorting'
        },

        // Sequence
        sequence: {
            template: 'SEQUENCE({rows}, {cols}, {start}, {step})',
            description: 'Generate sequence',
            example: 'SEQUENCE(10, 1, 1, 1)',
            useCase: 'Number series'
        },

        // Transpose
        transpose: {
            template: 'TRANSPOSE({range})',
            description: 'Transpose array',
            example: 'TRANSPOSE(A1:D5)',
            useCase: 'Array transformation'
        }
    }
};

// ==========================================
// Formula Template Application
// ==========================================

/**
 * Apply a formula template to cells
 */
function applyFormulaTemplate(templateName, params) {
    const category = templateName.split('.')[0];
    const formula = templateName.split('.')[1];

    const template = FORMULA_TEMPLATES[category]?.[formula];
    if (!template) {
        throw new Error(`Formula template not found: ${templateName}`);
    }

    let result = template.template;

    // Replace placeholders
    Object.entries(params).forEach(([key, value]) => {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    });

    return result;
}

/**
 * Get all formula templates for a category
 */
function getFormulasByCategory(category) {
    return FORMULA_TEMPLATES[category] || {};
}

/**
 * Get formula template info
 */
function getFormulaInfo(templateName) {
    const category = templateName.split('.')[0];
    const formula = templateName.split('.')[1];

    return FORMULA_TEMPLATES[category]?.[formula] || null;
}

/**
 * Search formula templates
 */
function searchFormulaTemplates(query) {
    const results = [];

    Object.entries(FORMULA_TEMPLATES).forEach(([category, formulas]) => {
        Object.entries(formulas).forEach(([name, template]) => {
            if (
                name.toLowerCase().includes(query.toLowerCase()) ||
                template.description.toLowerCase().includes(query.toLowerCase()) ||
                template.useCase.toLowerCase().includes(query.toLowerCase())
            ) {
                results.push({
                    name: `${category}.${name}`,
                    ...template
                });
            }
        });
    });

    return results;
}

// ==========================================
// Pre-built Formula Sets for Table Types
// ==========================================

const TABLE_FORMULA_SETS = {
    financialReport: {
        columns: ['Quarter', 'Revenue', 'Expenses', 'Profit', 'Margin'],
        formulas: {
            Profit: 'financial.profit',
            Margin: 'financial.grossMargin'
        },
        formats: {
            Revenue: 'currency',
            Expenses: 'currency',
            Profit: 'currency',
            Margin: 'percentage'
        }
    },

    comparisonTable: {
        columns: ['Category', 'Budget', 'Actual', 'Variance', 'Variance%', 'Status'],
        formulas: {
            Variance: '{Actual} - {Budget}',
            'Variance%': '({Actual} - {Budget}) / {Budget}',
            Status: 'logical.budgetStatus'
        },
        formats: {
            Budget: 'currency',
            Actual: 'currency',
            Variance: 'currency',
            'Variance%': 'percentage'
        }
    },

    projectProgress: {
        columns: ['Project', 'Start', 'End', 'Progress', 'Budget', 'Spent', 'Remaining', 'Status'],
        formulas: {
            Remaining: '{Budget} - {Spent}',
            Status: 'logical.progressStatus'
        },
        formats: {
            Progress: 'percentage',
            Budget: 'currency',
            Spent: 'currency',
            Remaining: 'currency'
        }
    },

    timeline: {
        columns: ['Phase', 'StartDate', 'EndDate', 'Duration', 'Progress', 'Status'],
        formulas: {
            Duration: 'date.dateDiff',
            Status: 'logical.progressStatus'
        },
        formats: {
            Progress: 'percentage'
        }
    },

    dashboard: {
        metrics: ['Revenue', 'Profit', 'Cost', 'Growth'],
        formulas: {
            Growth: '({Current} - {Previous}) / {Previous}'
        },
        formats: {
            Growth: 'percentage'
        }
    }
};

module.exports = {
    FORMULA_TEMPLATES,
    TABLE_FORMULA_SETS,
    applyFormulaTemplate,
    getFormulasByCategory,
    getFormulaInfo,
    searchFormulaTemplates
};