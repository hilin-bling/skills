/**
 * Chart Engine - v7.0
 *
 * Chart generation configuration for Excel
 * Supports: Column, Bar, Line, Pie, Area, Scatter, Combo charts
 *
 * Note: Full chart implementation requires openpyxl (Python)
 * This module provides configuration for chart generation
 */

// ==========================================
// Chart Type Definitions
// ==========================================

const CHART_TYPES = {
    column: {
        name: 'Column Chart',
        description: 'Vertical bars for comparison',
        bestUse: 'Comparing values across categories',
        excelType: 'BarChart',  // openpyxl uses BarChart for column charts
        orientation: 'col',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            showDataLabels: false
        }
    },

    bar: {
        name: 'Bar Chart',
        description: 'Horizontal bars for comparison',
        bestUse: 'Rankings, long category names',
        excelType: 'BarChart',
        orientation: 'bar',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            showDataLabels: false
        }
    },

    line: {
        name: 'Line Chart',
        description: 'Connected points showing trends',
        bestUse: 'Time series, trend analysis',
        excelType: 'LineChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            showDataLabels: false,
            smoothLine: false
        }
    },

    pie: {
        name: 'Pie Chart',
        description: 'Circular segments showing proportions',
        bestUse: 'Percentage breakdown, single category',
        excelType: 'PieChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showDataLabels: true,
            showPercentages: true,
            showValues: false
        }
    },

    doughnut: {
        name: 'Doughnut Chart',
        description: 'Pie chart with center hole',
        bestUse: 'Multiple series proportions',
        excelType: 'DoughnutChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showDataLabels: true,
            holeSize: 50
        }
    },

    area: {
        name: 'Area Chart',
        description: 'Filled areas showing volume',
        bestUse: 'Cumulative values, volume trends',
        excelType: 'AreaChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            opacity: 0.5
        }
    },

    scatter: {
        name: 'Scatter Chart',
        description: 'XY points for correlation',
        bestUse: 'Correlation analysis, distribution',
        excelType: 'ScatterChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true,
            markerStyle: 'circle',
            markerSize: 5
        }
    },

    radar: {
        name: 'Radar Chart',
        description: 'Multi-axis circular chart',
        bestUse: 'Multi-dimensional comparison',
        excelType: 'RadarChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            filled: true
        }
    },

    combo: {
        name: 'Combo Chart',
        description: 'Mixed chart types (e.g., column + line)',
        bestUse: 'Multiple metrics with different scales',
        excelType: 'ComboChart',
        defaultStyle: {
            showLegend: true,
            showTitle: true,
            showAxis: true,
            showGridLines: true
        }
    },

    stock: {
        name: 'Stock Chart',
        description: 'High-low-close or candlestick',
        bestUse: 'Financial data, stock prices',
        excelType: 'StockChart',
        defaultStyle: {
            showLegend: false,
            showTitle: true,
            showAxis: true
        }
    }
};

// ==========================================
// Chart Presets by Style
// ==========================================

const CHART_PRESETS = {
    // Default chart configuration
    default: {
        layout: {
            width: 15,      // cm
            height: 10      // cm
        },
        style: {
            titleFont: { name: 'Arial', size: 14, bold: true },
            legendFont: { name: 'Arial', size: 10 },
            axisFont: { name: 'Arial', size: 10 },
            dataLabelFont: { name: 'Arial', size: 9 }
        },
        colors: {
            series: ['primary', 'secondary', 'accent', 'neutral', 'textMuted']
        }
    },

    // Minimal chart style
    minimal: {
        layout: { width: 12, height: 8 },
        style: {
            titleFont: { name: 'Arial', size: 12, bold: true },
            legendFont: { name: 'Arial', size: 9 },
            axisFont: { name: 'Arial', size: 9 },
            showGridLines: false,
            showLegend: false
        }
    },

    // Detailed chart style
    detailed: {
        layout: { width: 18, height: 12 },
        style: {
            titleFont: { name: 'Arial', size: 16, bold: true },
            legendFont: { name: 'Arial', size: 11 },
            axisFont: { name: 'Arial', size: 11 },
            dataLabelFont: { name: 'Arial', size: 10 },
            showGridLines: true,
            showDataLabels: true
        }
    },

    // Presentation chart style
    presentation: {
        layout: { width: 20, height: 14 },
        style: {
            titleFont: { name: 'Arial', size: 18, bold: true },
            legendFont: { name: 'Arial', size: 12 },
            axisFont: { name: 'Arial', size: 12 },
            dataLabelFont: { name: 'Arial', size: 11 },
            showGridLines: false,
            showDataLabels: true,
            smoothLine: true
        }
    }
};

// ==========================================
// Chart Style by Excel Style
// ==========================================

function getChartColors(style) {
    return style.chartColors || [
        style.colors.primary,
        style.colors.secondary,
        style.colors.accent,
        style.colors.positive,
        style.colors.negative
    ];
}

// ==========================================
// Chart Configuration Builder
// ==========================================

function createChartConfig(options) {
    const {
        chartType,
        title,
        dataRange,
        categoryRange,
        seriesRanges,
        position,
        size,
        styleOptions,
        styleColors
    } = options;

    const chartDef = CHART_TYPES[chartType] || CHART_TYPES.column;
    const preset = styleOptions?.preset || 'default';
    const presetConfig = CHART_PRESETS[preset] || CHART_PRESETS.default;

    // Build chart configuration
    const config = {
        type: chartDef.excelType,
        orientation: chartDef.orientation,

        // Title
        title: title,
        titleFont: presetConfig.style.titleFont,

        // Position and size
        position: position || { x: 0, y: 0 },
        size: size || presetConfig.layout,

        // Legend
        legend: styleOptions?.showLegend !== false,
        legendPosition: styleOptions?.legendPosition || 'r',  // right
        legendFont: presetConfig.style.legendFont,

        // Axes
        xAxis: {
            title: styleOptions?.xAxisTitle || '',
            font: presetConfig.style.axisFont,
            showGridLines: styleOptions?.showGridLines !== false
        },
        yAxis: {
            title: styleOptions?.yAxisTitle || '',
            font: presetConfig.style.axisFont,
            showGridLines: styleOptions?.showGridLines !== false
        },

        // Data
        data: {
            categories: categoryRange,
            series: seriesRanges || [dataRange]
        },

        // Colors
        colors: styleColors || getChartColors({ colors: {} }),

        // Additional options
        showDataLabels: styleOptions?.showDataLabels || presetConfig.style?.showDataLabels || false,
        smoothLine: styleOptions?.smoothLine || chartDef.defaultStyle?.smoothLine || false,

        // Special options per chart type
        ...getSpecialOptions(chartType, styleOptions)
    };

    return config;
}

function getSpecialOptions(chartType, styleOptions) {
    const special = {};

    switch (chartType) {
        case 'pie':
        case 'doughnut':
            special.showPercentages = styleOptions?.showPercentages !== false;
            special.showValues = styleOptions?.showValues || false;
            if (chartType === 'doughnut') {
                special.holeSize = styleOptions?.holeSize || 50;
            }
            break;

        case 'scatter':
            special.markerStyle = styleOptions?.markerStyle || 'circle';
            special.markerSize = styleOptions?.markerSize || 5;
            break;

        case 'radar':
            special.filled = styleOptions?.filled !== false;
            break;

        case 'area':
            special.opacity = styleOptions?.opacity || 0.5;
            break;
    }

    return special;
}

// ==========================================
// Python Chart Generator Script
// ==========================================

function generatePythonChartScript(config) {
    const { type, title, position, size, data, colors, showDataLabels } = config;

    return `
# Chart: ${title}
chart = ${type}()
chart.title = "${title}"
chart.style = 10
chart.width = ${size.width}
chart.height = ${size.height}

# Position
chart_anchor = AnchorMarker(col=${position.x}, row=${position.y})

# Data
categories = Reference(ws, min_col=${data.categories.minCol}, min_row=${data.categories.minRow}, max_row=${data.categories.maxRow})
${data.series.map((s, i) => `
data${i} = Reference(ws, min_col=${s.minCol}, min_row=${s.minRow}, max_row=${s.maxRow})
chart.add_data(data${i}, titles_from_data=True)`).join('\n')}
chart.set_categories(categories)

# Colors
chart_colors = [${colors.map(c => `'${c}'`).join(', ')}]
for i, series in enumerate(chart.series):
    if i < len(chart_colors):
        series.graphicalProperties.line.solidFill = chart_colors[i]
        series.graphicalProperties.solidFill = chart_colors[i]

# Data labels
if ${showDataLabels}:
    chart.dataLabels = DataLabelList()
    chart.dataLabels.showVal = True

# Add chart to worksheet
ws.add_chart(chart, "${getAnchorCell(position)}")
`;
}

function getAnchorCell(position) {
    const colLetter = String.fromCharCode(65 + position.x);
    return `${colLetter}${position.y + 1}`;
}

// ==========================================
// Pre-built Chart Templates
// ==========================================

const CHART_TEMPLATES = {
    // Revenue trend chart
    revenueTrend: {
        type: 'line',
        title: 'Revenue Trend',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showLegend: true,
            showGridLines: true,
            smoothLine: true,
            yAxisTitle: 'Revenue ($)'
        }
    },

    // Quarterly comparison
    quarterlyComparison: {
        type: 'column',
        title: 'Quarterly Performance',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showLegend: true,
            showGridLines: true,
            showDataLabels: true
        }
    },

    // Budget vs Actual
    budgetVsActual: {
        type: 'combo',
        title: 'Budget vs Actual',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            columnSeries: 0,  // Budget
            lineSeries: 1,    // Actual
            showLegend: true
        }
    },

    // Distribution pie
    distribution: {
        type: 'pie',
        title: 'Category Distribution',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showPercentages: true,
            showLegend: true,
            legendPosition: 'r'
        }
    },

    // Progress tracking
    progressTracking: {
        type: 'bar',
        title: 'Project Progress',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showLegend: false,
            showDataLabels: true
        }
    },

    // Correlation analysis
    correlation: {
        type: 'scatter',
        title: 'Correlation Analysis',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showLegend: true,
            markerSize: 8,
            xAxisTitle: 'Variable X',
            yAxisTitle: 'Variable Y'
        }
    },

    // KPI radar
    kpiRadar: {
        type: 'radar',
        title: 'KPI Overview',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            filled: true,
            showLegend: true
        }
    },

    // Financial stock
    financialStock: {
        type: 'stock',
        title: 'Price Movement',
        suggestedPosition: { x: 8, y: 1 },
        styleOptions: {
            showLegend: false,
            yAxisTitle: 'Price ($)'
        }
    }
};

// ==========================================
// Export
// ==========================================

module.exports = {
    CHART_TYPES,
    CHART_PRESETS,
    CHART_TEMPLATES,
    createChartConfig,
    getChartColors,
    generatePythonChartScript
};