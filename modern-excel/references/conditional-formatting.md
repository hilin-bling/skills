# Conditional Formatting Reference

## Overview

Conditional formatting in Excel allows you to automatically apply formatting (colors, icons, data bars) based on cell values. Modern Excel Ultimate v7.0 provides comprehensive conditional formatting support.

## Color Scales

### Three-Color Scale (Performance)

| Low | Mid | High | Use Case |
|-----|-----|------|----------|
| Red | Yellow | Green | Performance indicators (bad to good) |
| Green | Yellow | Red | Reverse performance (good to bad) |
| Blue | Yellow | Red | Heat map (cold to hot) |

### Two-Color Scale

| Min | Max | Use Case |
|-----|-----|----------|
| White | Green | Positive trend highlighting |
| White | Red | Negative trend highlighting |
| White | Blue | Standard data visualization |

### Style-Specific Color Scales

Each of the 18 styles has predefined color scales:

```javascript
// From style configuration
conditionalFormat: {
    colorScalePositive: ['FFFFFF', '10B981', '059669'],
    colorScaleNegative: ['FFFFFF', 'EF4444', 'DC2626']
}
```

## Data Bars

### Standard Data Bar

- Gradient fill from left
- Shows actual value
- Min: 0, Max: cell value

### Progress Bar

- Fixed scale: 0 to 100
- Solid fill
- Hide value (show only bar)

### Style-Specific Data Bars

```javascript
conditionalFormat: {
    dataBarPositive: '10B981',  // Green for positive
    dataBarNegative: 'EF4444'   // Red for negative
}
```

## Icon Sets

### Available Icon Sets

| Icon Set | Icons | Use Case |
|----------|-------|----------|
| 3Arrows | Down, Side, Up | Trend indicators |
| 3Flags | Red, Yellow, Green | Status flags |
| 3TrafficLights | Red, Yellow, Green | Status lights |
| 3Signs | Circle, Triangle, Diamond | Warning levels |
| 3Symbols | Check, Exclamation, X | Completion status |
| 3Stars | 1, 2, 3 Stars | Ratings |
| 4Arrows | Down, Side-down, Side-up, Up | Detailed trends |
| 4TrafficLights | Black, Red, Yellow, Green | Extended status |
| 5Arrows | 5-level trend | Granular trends |
| 5Rating | 1-5 bars | Star ratings |
| 5Quarters | 0-4 filled quarters | Percentage display |
| 5Boxes | 0-5 filled boxes | Count display |

### Threshold Configuration

```javascript
icons: [
    { type: 'percent', value: 0 },    // First icon threshold
    { type: 'percent', value: 33 },   // Second icon threshold
    { type: 'percent', value: 67 }    // Third icon threshold
]
```

## Formula-Based Rules

### Status Highlighting

```excel
=IF(A1="Complete", TRUE, FALSE)    // Highlight complete items
=IF(A1="Over Budget", TRUE, FALSE) // Highlight over-budget
=IF(A1="Overdue", TRUE, FALSE)     // Highlight overdue items
```

### Value-Based Rules

```excel
=A1 > AVERAGE($A$1:$A$100)         // Above average
=A1 < AVERAGE($A$1:$A$100)         // Below average
=A1 >= LARGE($A$1:$A$100, 10)      // Top 10 values
=COUNTIF($A$1:$A$100, A1) > 1      // Duplicate values
```

### Date-Based Rules

```excel
=A1 < TODAY()                      // Overdue
=A1 = TODAY()                      // Due today
=A1 > TODAY() + 7                  // Upcoming (more than a week)
=AND(A1 >= TODAY(), A1 <= TODAY() + 7)  // Due this week
```

### Alternating Rows

```excel
=MOD(ROW(), 2) = 0                 // Even rows
=MOD(ROW(), 2) = 1                 // Odd rows
```

## Table Type Conditional Formats

### Financial Report

| Column | Format Type | Rule |
|--------|-------------|------|
| Revenue | Color Scale | Positive (white to green) |
| Profit | Color Scale | Performance (red-yellow-green) |
| Margin | Data Bar | Progress bar |

### Comparison Table

| Column | Format Type | Rule |
|--------|-------------|------|
| Variance | Color Scale | Performance Reverse (green-red) |
| Variance % | Data Bar | Negative |
| Status | Formula | Over Budget (red) |

### Project Progress

| Column | Format Type | Rule |
|--------|-------------|------|
| Progress | Data Bar | Progress (0-100%) |
| Remaining | Color Scale | Negative |
| Status | Formula | Complete (green), In Progress (yellow) |

### Timeline

| Column | Format Type | Rule |
|--------|-------------|------|
| Progress | Data Bar | Progress |
| Duration | Color Scale | Gradient |
| Status | Formula | Overdue (red) |

## Implementation

### Python (openpyxl)

```python
from openpyxl.formatting.rule import ColorScaleRule, DataBarRule, IconSetRule, FormulaRule

# Color Scale
ws.conditional_formatting.add('B2:B10',
    ColorScaleRule(start_type='min', start_color='FFFFFF',
                   end_type='max', end_color='10B981'))

# Data Bar
ws.conditional_formatting.add('C2:C10',
    DataBarRule(start_type='num', start_value=0,
                end_type='max', color='3B82F6'))

# Icon Set
ws.conditional_formatting.add('D2:D10',
    IconSetRule(icon_style='3Arrows', type='percent',
                values=[0, 33, 67]))

# Formula Rule
ws.conditional_formatting.add('E2:E10',
    FormulaRule(formula=['E2="Complete"'],
                fill=PatternFill(bgColor='10B981')))
```

### Node.js (ExcelJS)

Note: ExcelJS has limited conditional formatting support. Use the Python backend for full functionality.

## Best Practices

1. **Use appropriate format types**
   - Color scales for continuous data
   - Data bars for proportional values
   - Icon sets for discrete categories

2. **Maintain readability**
   - Don't overuse conditional formatting
   - Ensure text remains visible
   - Use subtle colors for large datasets

3. **Match style colors**
   - Use style-specific color scales
   - Maintain visual consistency
   - Align with overall design theme

4. **Document thresholds**
   - Clearly define threshold values
   - Make logic transparent
   - Use meaningful cutoffs