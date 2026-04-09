# Chart Types Reference

## Overview

Modern Excel Ultimate v7.0 supports a variety of chart types for data visualization. Charts are embedded directly into worksheets and styled according to the selected style theme.

## Available Chart Types

### Column Chart

**Description**: Vertical bars comparing values across categories

**Best Use**: Comparing discrete values, showing rankings

**Configuration**:
```javascript
{
    type: 'column',
    title: 'Quarterly Performance',
    dataRange: 'A2:E6',
    position: { x: 8, y: 1 },
    size: { width: 15, height: 10 },
    styleOptions: {
        showLegend: true,
        showDataLabels: true,
        yAxisTitle: 'Value ($)'
    }
}
```

### Bar Chart

**Description**: Horizontal bars for comparison

**Best Use**: Rankings, long category names, timeline display

**Configuration**:
```javascript
{
    type: 'bar',
    title: 'Project Progress',
    dataRange: 'A2:D10',
    position: { x: 8, y: 1 },
    styleOptions: {
        showLegend: false,
        showDataLabels: true
    }
}
```

### Line Chart

**Description**: Connected points showing trends over time

**Best Use**: Time series data, trend analysis

**Configuration**:
```javascript
{
    type: 'line',
    title: 'Revenue Trend',
    dataRange: 'A2:B13',
    position: { x: 8, y: 1 },
    styleOptions: {
        smoothLine: true,
        showLegend: true,
        showGridLines: true
    }
}
```

### Pie Chart

**Description**: Circular segments showing proportions

**Best Use**: Percentage breakdown, single category composition

**Configuration**:
```javascript
{
    type: 'pie',
    title: 'Category Distribution',
    dataRange: 'A2:B6',
    position: { x: 8, y: 1 },
    styleOptions: {
        showPercentages: true,
        showValues: false,
        legendPosition: 'r'
    }
}
```

### Doughnut Chart

**Description**: Pie chart with center hole

**Best Use**: Multiple series proportions, showing totals

**Configuration**:
```javascript
{
    type: 'doughnut',
    title: 'Revenue by Region',
    dataRange: 'A2:B6',
    position: { x: 8, y: 1 },
    styleOptions: {
        holeSize: 50,
        showPercentages: true
    }
}
```

### Area Chart

**Description**: Filled areas showing volume trends

**Best Use**: Cumulative values, volume over time

**Configuration**:
```javascript
{
    type: 'area',
    title: 'Cumulative Revenue',
    dataRange: 'A2:C13',
    position: { x: 8, y: 1 },
    styleOptions: {
        opacity: 0.5,
        showGridLines: true
    }
}
```

### Scatter Chart

**Description**: XY points for correlation analysis

**Best Use**: Correlation, distribution, relationship analysis

**Configuration**:
```javascript
{
    type: 'scatter',
    title: 'Correlation Analysis',
    dataRange: 'A2:B20',
    position: { x: 8, y: 1 },
    styleOptions: {
        markerStyle: 'circle',
        markerSize: 8,
        xAxisTitle: 'Variable X',
        yAxisTitle: 'Variable Y'
    }
}
```

### Radar Chart

**Description**: Multi-axis circular chart

**Best Use**: Multi-dimensional comparison, KPI overview

**Configuration**:
```javascript
{
    type: 'radar',
    title: 'KPI Overview',
    dataRange: 'A2:F6',
    position: { x: 8, y: 1 },
    styleOptions: {
        filled: true,
        showLegend: true
    }
}
```

### Combo Chart

**Description**: Mixed chart types (e.g., column + line)

**Best Use**: Multiple metrics with different scales

**Configuration**:
```javascript
{
    type: 'combo',
    title: 'Revenue vs Target',
    columnRange: 'B2:B13',  // Column chart data
    lineRange: 'C2:C13',    // Line chart data
    position: { x: 8, y: 1 },
    styleOptions: {
        columnColor: 'primary',
        lineColor: 'accent'
    }
}
```

## Chart Presets

### Default Preset

```javascript
{
    layout: { width: 15, height: 10 },
    style: {
        titleFont: { name: 'Arial', size: 14, bold: true },
        legendFont: { name: 'Arial', size: 10 },
        showGridLines: true,
        showLegend: true
    }
}
```

### Minimal Preset

```javascript
{
    layout: { width: 12, height: 8 },
    style: {
        titleFont: { name: 'Arial', size: 12, bold: true },
        showGridLines: false,
        showLegend: false
    }
}
```

### Detailed Preset

```javascript
{
    layout: { width: 18, height: 12 },
    style: {
        titleFont: { name: 'Arial', size: 16, bold: true },
        showGridLines: true,
        showDataLabels: true
    }
}
```

### Presentation Preset

```javascript
{
    layout: { width: 20, height: 14 },
    style: {
        titleFont: { name: 'Arial', size: 18, bold: true },
        smoothLine: true,
        showDataLabels: true
    }
}
```

## Style-Specific Chart Colors

Each style defines its own chart color palette:

```javascript
// Aurora style
chartColors: ['00FF87', '60EFFF', 'FF6B6B', 'A78BFA', 'F472B6']

// Finance style
chartColors: ['1A365D', '2B6CB0', 'D69E2E', '38A169', '805AD5']

// Tech style
chartColors: ['58A6FF', '238636', 'F78166', 'A78BFA', 'F472B6']
```

## Pre-built Chart Templates

| Template | Type | Use Case |
|----------|------|----------|
| revenueTrend | Line | Revenue over time |
| quarterlyComparison | Column | Quarter comparison |
| budgetVsActual | Combo | Budget analysis |
| distribution | Pie | Category breakdown |
| progressTracking | Bar | Project progress |
| correlation | Scatter | Correlation analysis |
| kpiRadar | Radar | Multi-dimensional KPIs |

## Implementation

### Python (openpyxl)

```python
from openpyxl.chart import BarChart, LineChart, PieChart, Reference

# Column Chart
chart = BarChart()
chart.type = "col"
chart.style = 10
chart.title = "Quarterly Performance"

data = Reference(ws, min_col=2, min_row=1, max_row=6, max_col=5)
cats = Reference(ws, min_col=1, min_row=2, max_row=6)
chart.add_data(data, titles_from_data=True)
chart.set_categories(cats)

ws.add_chart(chart, "G2")
```

### Chart Styling

```python
# Apply style colors
for i, series in enumerate(chart.series):
    if i < len(chart_colors):
        series.graphicalProperties.line.solidFill = chart_colors[i]
        series.graphicalProperties.solidFill = chart_colors[i]

# Add data labels
chart.dataLabels = DataLabelList()
chart.dataLabels.showVal = True
```

## Best Practices

1. **Choose appropriate chart type**
   - Column/bar for comparison
   - Line for trends
   - Pie for proportions
   - Scatter for correlation

2. **Use consistent colors**
   - Apply style color palette
   - Maintain visual hierarchy
   - Avoid too many colors

3. **Position charts effectively**
   - Place near related data
   - Allow adequate space
   - Consider print layout

4. **Include meaningful titles**
   - Clear chart titles
   - Axis labels when needed
   - Legend for multiple series