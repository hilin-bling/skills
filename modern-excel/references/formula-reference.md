# Excel Formula Reference

## Overview

Modern Excel Ultimate v7.0 provides a comprehensive library of formula templates organized by category: Financial, Statistical, Logical, Lookup, Date, Text, and Array formulas.

## Financial Formulas

### Basic Financial

| Formula | Template | Description |
|---------|----------|-------------|
| SUM | `SUM({range})` | Total sum of range |
| Revenue | `{PriceCol} * {QuantityCol}` | Price times quantity |
| Profit | `{RevenueCol} - {CostCol}` | Revenue minus cost |
| Gross Margin | `({RevenueCol} - {CostCol}) / {RevenueCol}` | Profit margin ratio |
| ROI | `({GainCol} - {InvestmentCol}) / {InvestmentCol}` | Return on investment |

### Advanced Financial

| Formula | Template | Description |
|---------|----------|-------------|
| CAGR | `({EndValue} / {StartValue}) ^ (1 / {Years}) - 1` | Compound growth rate |
| NPV | `NPV({rate}, {values}) + {initialInvestment}` | Net present value |
| IRR | `IRR({values})` | Internal rate of return |
| PMT | `PMT({rate}, {periods}, {principal})` | Loan payment |
| SLN | `SLN({cost}, {salvage}, {life})` | Straight-line depreciation |

### Financial Report Template

```javascript
{
    columns: ['Quarter', 'Revenue', 'Expenses', 'Profit', 'Margin'],
    formulas: {
        'Profit': 'B-C',  // Revenue - Expenses
        'Margin': '(B-C)/B'  // (Revenue - Expenses) / Revenue
    },
    formats: {
        'Revenue': 'currency',
        'Profit': 'currency',
        'Margin': 'percentage'
    }
}
```

## Statistical Formulas

### Basic Statistical

| Formula | Template | Description |
|---------|----------|-------------|
| AVERAGE | `AVERAGE({range})` | Mean of values |
| MEDIAN | `MEDIAN({range})` | Median value |
| STDEV | `STDEV({range})` | Standard deviation |
| COUNT | `COUNT({range})` | Count numbers |
| COUNTA | `COUNTA({range})` | Count non-empty |

### Conditional Statistical

| Formula | Template | Description |
|---------|----------|-------------|
| COUNTIF | `COUNTIF({range}, {criteria})` | Count matching criteria |
| SUMIF | `SUMIF({criteriaRange}, {criteria}, {sumRange})` | Sum matching criteria |
| AVERAGEIF | `AVERAGEIF({range}, {criteria}, {averageRange})` | Average matching criteria |

### Ranking Statistical

| Formula | Template | Description |
|---------|----------|-------------|
| MAX | `MAX({range})` | Maximum value |
| MIN | `MIN({range})` | Minimum value |
| RANK | `RANK({value}, {range}, {order})` | Rank in range |
| PERCENTILE | `PERCENTILE({range}, {k})` | Value at percentile |
| CORREL | `CORREL({range1}, {range2})` | Correlation coefficient |

## Logical Formulas

### Basic Logical

| Formula | Template | Description |
|---------|----------|-------------|
| IF | `IF({condition}, {trueValue}, {falseValue})` | Basic conditional |
| AND | `AND({condition1}, {condition2})` | Multiple AND |
| OR | `OR({condition1}, {condition2})` | Multiple OR |
| IFERROR | `IFERROR({formula}, {fallback})` | Error handling |
| ISBLANK | `ISBLANK({cell})` | Check for blank |

### Status Formulas

| Formula | Template | Description |
|---------|----------|-------------|
| Three-tier | `IF({value} >= {high}, "High", IF({value} >= {mid}, "Medium", "Low"))` | Three-level status |
| Budget Status | `IF({actual} > {budget}, "Over", IF({actual} < {budget}*0.9, "Under", "On Track"))` | Budget tracking |
| Progress Status | `IF({progress} >= 100, "Complete", IF({progress} > 0, "In Progress", "Not Started"))` | Project status |

### Comparison Formulas

| Formula | Template | Description |
|---------|----------|-------------|
| Variance | `{actual} - {budget}` | Budget variance |
| Variance % | `({actual} - {budget}) / {budget}` | Percentage variance |
| Change | `{current} - {previous}` | Period change |
| Change % | `({current} - {previous}) / {previous}` | Percentage change |

## Lookup Formulas

### Basic Lookup

| Formula | Template | Description |
|---------|----------|-------------|
| VLOOKUP | `VLOOKUP({lookupValue}, {tableRange}, {colIndex}, FALSE)` | Vertical lookup |
| HLOOKUP | `HLOOKUP({lookupValue}, {tableRange}, {rowIndex}, FALSE)` | Horizontal lookup |
| INDEX | `INDEX({returnRange}, MATCH({lookupValue}, {lookupRange}, 0))` | INDEX-MATCH lookup |

### Modern Lookup (Excel 365)

| Formula | Template | Description |
|---------|----------|-------------|
| XLOOKUP | `XLOOKUP({lookupValue}, {lookupRange}, {returnRange}, "Not Found")` | Modern lookup |
| FILTER | `FILTER({range}, {condition})` | Filter array |
| UNIQUE | `UNIQUE({range})` | Unique values |

### Dynamic References

| Formula | Template | Description |
|---------|----------|-------------|
| INDIRECT | `INDIRECT({reference})` | Dynamic reference |
| OFFSET | `OFFSET({reference}, {rows}, {cols})` | Offset reference |

## Date Formulas

### Basic Date

| Formula | Template | Description |
|---------|----------|-------------|
| TODAY | `TODAY()` | Current date |
| NOW | `NOW()` | Current datetime |
| YEAR | `YEAR({date})` | Extract year |
| MONTH | `MONTH({date})` | Extract month |
| DAY | `DAY({date})` | Extract day |

### Date Calculations

| Formula | Template | Description |
|---------|----------|-------------|
| Date Diff | `{endDate} - {startDate}` | Days between |
| DATEDIF | `DATEDIF({startDate}, {endDate}, "{unit}")` | Date difference |
| EDATE | `EDATE({startDate}, {months})` | Add months |
| EOMONTH | `EOMONTH({date}, {months})` | End of month |
| NETWORKDAYS | `NETWORKDAYS({startDate}, {endDate})` | Working days |

### Date Status

| Formula | Template | Description |
|---------|----------|-------------|
| Due Status | `IF({dueDate} < TODAY(), "Overdue", IF({dueDate} = TODAY(), "Due Today", "Upcoming"))` | Due date status |

## Text Formulas

### Basic Text

| Formula | Template | Description |
|---------|----------|-------------|
| CONCATENATE | `CONCATENATE({text1}, {text2})` | Join text |
| LEFT | `LEFT({text}, {numChars})` | Left characters |
| RIGHT | `RIGHT({text}, {numChars})` | Right characters |
| MID | `MID({text}, {start}, {numChars})` | Middle characters |

### Text Transformation

| Formula | Template | Description |
|---------|----------|-------------|
| UPPER | `UPPER({text})` | Uppercase |
| LOWER | `LOWER({text})` | Lowercase |
| TRIM | `TRIM({text})` | Remove spaces |
| LEN | `LEN({text})` | Text length |

### Modern Text (Excel 365)

| Formula | Template | Description |
|---------|----------|-------------|
| TEXTJOIN | `TEXTJOIN({delimiter}, TRUE, {range})` | Join with delimiter |

## Array Formulas (Excel 365)

| Formula | Template | Description |
|---------|----------|-------------|
| UNIQUE | `UNIQUE({range})` | Unique values |
| FILTER | `FILTER({range}, {condition})` | Filter array |
| SORT | `SORT({range}, {sortIndex}, {sortOrder})` | Sort array |
| SEQUENCE | `SEQUENCE({rows}, {cols}, {start}, {step})` | Number sequence |
| TRANSPOSE | `TRANSPOSE({range})` | Transpose array |

## Table Formula Sets

### Pre-built Formula Sets

```javascript
// Financial Report
TABLE_FORMULA_SETS.financialReport = {
    columns: ['Quarter', 'Revenue', 'Expenses', 'Profit', 'Margin'],
    formulas: {
        'Profit': '{Revenue} - {Expenses}',
        'Margin': '({Revenue} - {Expenses}) / {Revenue}'
    }
}

// Comparison Table
TABLE_FORMULA_SETS.comparisonTable = {
    columns: ['Category', 'Budget', 'Actual', 'Variance', 'Variance%', 'Status'],
    formulas: {
        'Variance': '{Actual} - {Budget}',
        'Variance%': '({Actual} - {Budget}) / {Budget}',
        'Status': 'IF({Variance} > 0, "Over", IF({Variance} < 0, "Under", "On Target"))'
    }
}

// Project Progress
TABLE_FORMULA_SETS.projectProgress = {
    columns: ['Project', 'Start', 'End', 'Progress', 'Budget', 'Spent', 'Remaining'],
    formulas: {
        'Remaining': '{Budget} - {Spent}',
        'Status': 'IF({Progress} >= 1, "Complete", IF({Progress} > 0, "In Progress", "Not Started"))'
    }
}
```

## Best Practices

1. **Use named ranges** for clarity and maintainability
2. **Apply consistent formatting** (currency, percentage, date)
3. **Handle errors** with IFERROR for robust formulas
4. **Document complex formulas** with comments
5. **Use formula templates** for standardized calculations