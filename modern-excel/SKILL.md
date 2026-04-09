---
name: modern-excel
description: "Create stunning Excel spreadsheets with 18 professional styles (including Aurora, Cyberpunk, Glassmorphism), each with unique formatting, conditional formatting, charts, and data validation. Features include: smart style system, data visualization with embedded charts, conditional formatting (color scales, data bars), formula templates, auto-fit columns, professional table types. v7.0 Ultimate Edition - Professional-grade Excel generation with modern design aesthetics."
---

# Modern Excel Creator Ultimate v7.0

Create professional, modern Excel spreadsheets with 18 carefully designed styles, each featuring unique formatting, conditional formatting, charts, and intelligent data validation. **The ultimate Excel generation skill with Dribbble-level design aesthetics.**

## v7.0 Ultimate Features

### 18 Professional Styles

| Style | Features | Use Cases |
|-------|----------|-----------|
| **Aurora** | Northern lights inspired, dreamy gradient colors | Creative showcase, design proposals |
| **Cyberpunk** | Neon effects, dark tech aesthetic | Gaming reports, tech analytics |
| **Glassmorphism** | Modern glass-morphism design, translucent feel | Tech companies, modern brands |
| **Monochrome** | Pure monochrome design, minimal elegance | Art portfolios, high-end brands |
| **Gradient Flow** | Dynamic gradient backgrounds, fluid motion | Brand showcases, product releases |
| **Pastel** | Soft macaron tones, warm romantic | Lifestyle brands, wedding planning |
| **Academic** | Professional blue, rigorous academic | Thesis data, research reports |
| **Business Elite** | Professional corporate, efficient clean | Annual reports, quarterly summaries |
| **Tech Future** | Cutting-edge innovation, futuristic | AI data, tech product analysis |
| **Minimalist** | Simple pure, whitespace-focused | Design portfolios, minimal reports |
| **Natural Green** | Fresh nature, eco-friendly | Environmental data, health reports |
| **Retro** | Warm nostalgic, vintage classic | Historical data, anniversary reports |
| **Vibrant** | Energetic orange-yellow, dynamic | Fitness tracking, youth analytics |
| **Healthcare** | Professional medical, trustworthy | Medical reports, health dashboards |
| **Finance** | Steady professional, financial | Financial statements, investment analysis |
| **Chinese Style** | Traditional elegant, Chinese aesthetics | Traditional culture, Chinese brand data |
| **Creative** | Artistic creative, expressive | Creative industry, art analytics |
| **Corporate** | Standard corporate, reliable | Standard reports, enterprise data |

### Table Types

| Type | Description | Use Case |
|------|-------------|----------|
| **Data Table** | Basic data table with header styling | General data display |
| **Financial Report** | Financial statement with formula templates | Financial analysis, balance sheets |
| **Project Progress** | Timeline table with progress tracking | Project management, Gantt-style |
| **Analysis Report** | Data analysis with embedded charts | Market analysis, performance review |
| **Comparison Table** | Side-by-side comparison formatting | Product comparison, A/B testing |
| **Dashboard** | Summary dashboard with KPIs | Executive summary, metrics overview |
| **Timeline** | Date-based timeline visualization | Schedule planning, milestone tracking |

### Excel Special Capabilities

#### Modern Style System
- **Conditional Formatting** - Color scales, data bars, icon sets
- **Cell Styles** - Font, border, fill with style consistency
- **Row/Column Styling** - Alternating colors, header highlighting

#### Data Visualization
- **Embedded Charts** - Column, line, pie, bar, area charts
- **Conditional Data Bars** - In-cell data visualization
- **Sparklines** - Mini trend charts (ExcelJS)

#### Smart Features
- **Formula Templates** - SUM, AVERAGE, VLOOKUP, IF, etc.
- **Data Validation** - Dropdown lists, number ranges, date validation
- **Auto Filter & Sort** - Enabled filters with smart sorting

#### Layout System
- **Header Row Style** - Bold, colored background, centered
- **Data Row Style** - Clean fonts, appropriate spacing
- **Summary Row Style** - Highlighted totals, formula cells
- **Auto-fit Columns** - Intelligent column width adjustment

## Quick Start

### Python (openpyxl)

```python
from modern_excel_ultimate import ModernExcelUltimate

# Create generator with specified style
gen = ModernExcelUltimate('academic')

# Create a data table
gen.data_table(
    title='Research Data Analysis',
    headers=['Subject', 'Score', 'Rank', 'Status'],
    data=[
        ['Mathematics', 95, 1, 'Excellent'],
        ['Physics', 88, 3, 'Good'],
        ['Chemistry', 92, 2, 'Excellent'],
    ],
    options={'auto_fit': True, 'conditional_format': True}
)

# Create a financial report
gen.financial_report(
    title='Quarterly Financial Summary',
    revenue_data=[120000, 145000, 168000, 190000],
    expense_data=[80000, 95000, 110000, 125000],
    categories=['Q1', 'Q2', 'Q3', 'Q4']
)

# Add embedded chart
gen.add_chart(
    chart_type='column',
    title='Revenue vs Expense',
    data_range='B2:E5',
    position='G2'
)

# Save the workbook
gen.save('research-analysis.xlsx')
```

### Node.js (ExcelJS)

```javascript
const { ModernExcelUltimate } = require('./scripts/modern-excel-ultimate');

// Create generator with specified style
const gen = new ModernExcelUltimate('finance');

// Create a financial report
await gen.financialReport({
    title: 'Annual Financial Statement',
    revenue: [1200000, 1450000, 1680000, 1900000],
    expenses: [800000, 950000, 1100000, 1250000],
    quarters: ['Q1', 'Q2', 'Q3', 'Q4']
});

// Add comparison table
await gen.comparisonTable({
    title: 'Budget vs Actual',
    headers: ['Category', 'Budget', 'Actual', 'Variance', 'Status'],
    data: [
        ['Marketing', 50000, 45000, -5000, 'Under'],
        ['Operations', 80000, 85000, 5000, 'Over'],
        ['R&D', 120000, 115000, -5000, 'Under'],
    ]
});

// Add dashboard
await gen.dashboard({
    title: 'Key Performance Indicators',
    metrics: [
        { name: 'Total Revenue', value: '$6.23M', change: '+15%', status: 'up' },
        { name: 'Net Profit', value: '$1.82M', change: '+22%', status: 'up' },
        { name: 'Customer Growth', value: '12,450', change: '+8%', status: 'up' },
    ]
});

// Save the workbook
await gen.save('annual-report.xlsx');
```

## Complete Example: Financial Report

```python
from modern_excel_ultimate import ModernExcelUltimate

gen = ModernExcelUltimate('finance')

# Executive Summary Sheet
gen.create_sheet('Executive Summary')
gen.dashboard(
    title='Financial Dashboard 2024',
    metrics=[
        {'name': 'Gross Revenue', 'value': '$5,240,000', 'change': '+12%', 'status': 'positive'},
        {'name': 'Operating Costs', 'value': '$3,150,000', 'change': '+5%', 'status': 'negative'},
        {'name': 'Net Profit', 'value': '$2,090,000', 'change': '+18%', 'status': 'positive'},
        {'name': 'ROI', 'value': '24.5%', 'change': '+3%', 'status': 'positive'},
    ],
    style_options={'highlight_positive': True, 'color_scale': True}
)

# Revenue Analysis Sheet
gen.create_sheet('Revenue Analysis')
gen.financial_report(
    title='Quarterly Revenue Breakdown',
    headers=['Quarter', 'Product Sales', 'Services', 'Subscriptions', 'Total'],
    data=[
        ['Q1', 850000, 320000, 180000],
        ['Q2', 920000, 380000, 210000],
        ['Q3', 1050000, 420000, 250000],
        ['Q4', 1180000, 480000, 290000],
    ],
    formulas={'Total': 'SUM(B:D)'},
    conditional_format={'Product Sales': 'color_scale_green'}
)

# Add trend chart
gen.add_chart(
    chart_type='line',
    title='Revenue Trend',
    data_range='A2:E6',
    position='A10'
)

# Comparison Sheet
gen.create_sheet('Budget Comparison')
gen.comparison_table(
    title='Department Budget Analysis',
    headers=['Department', 'Budget', 'Actual', 'Variance', 'Status'],
    data=[
        ['Marketing', 150000, 142000],
        ['Engineering', 450000, 465000],
        ['Sales', 280000, 275000],
        ['Operations', 120000, 118000],
    ],
    formulas={
        'Variance': 'C-B',
        'Status': 'IF(D>0,"Over",IF(D<0,"Under","On Target"))'
    },
    conditional_format={'Status': {'Over': 'red', 'Under': 'green', 'On Target': 'yellow'}}
)

# Save
gen.save('financial-report-2024.xlsx')
```

## Conditional Formatting Options

### Color Scales

```python
# Three-color scale (red-yellow-green)
gen.apply_color_scale(
    range='B2:B10',
    colors=['red', 'yellow', 'green'],
    min_type='min', mid_type='percentile', max_type='max'
)

# Two-color scale (white to primary color)
gen.apply_color_scale(
    range='C2:C10',
    colors=['white', 'primary'],
    min_type='min', max_type='max'
)
```

### Data Bars

```python
# Gradient data bars
gen.apply_data_bars(
    range='D2:D20',
    color='primary',
    gradient=True,
    show_value=True
)

# Solid data bars with negative values
gen.apply_data_bars(
    range='E2:E20',
    color='accent',
    negative_color='red',
    gradient=False
)
```

### Icon Sets

```python
# 3-arrow icon set
gen.apply_icon_set(
    range='F2:F10',
    icons='3_arrows',
    reverse=False
)

# 5-rating icon set
gen.apply_icon_set(
    range='G2:G10',
    icons='5_ratings',
    reverse=True
)
```

## Formula Templates

### Financial Formulas

| Formula | Description | Usage |
|---------|-------------|-------|
| `SUM(range)` | Total sum | Revenue totals, expense totals |
| `AVERAGE(range)` | Average value | Average performance metrics |
| `VLOOKUP(key, range, col)` | Vertical lookup | Data matching, reference lookup |
| `IF(condition, true, false)` | Conditional logic | Status determination, alerts |
| `SUMIF(range, criteria, sum_range)` | Conditional sum | Category totals |
| `COUNTIF(range, criteria)` | Conditional count | Status counts, category counts |
| `PERCENTILE(range, k)` | Percentile value | Performance rankings |
| `IRR(values)` | Internal rate of return | Investment analysis |
| `NPV(rate, values)` | Net present value | Financial projections |

### Pre-built Formula Templates

```python
# Financial analysis formulas
gen.apply_formula_template(
    template='financial_analysis',
    cells={
        'total_revenue': 'SUM(B2:B10)',
        'gross_margin': '(B11-C11)/B11',
        'net_profit': 'B11-C11-D11',
        'roi': 'E11/B11*100'
    }
)

# Status formulas
gen.apply_formula_template(
    template='status_tracking',
    cells={
        'variance': 'C2-B2',
        'status': 'IF(D2>0.05,"Critical",IF(D2>0,"Warning","Normal"))',
        'completion': 'C2/B2*100'
    }
)
```

## Data Validation

### Dropdown Lists

```python
# Single column dropdown
gen.add_data_validation(
    range='D2:D100',
    type='list',
    values=['Pending', 'In Progress', 'Completed', 'Cancelled'],
    allow_blank=True
)

# Dependent dropdown (using named ranges)
gen.add_data_validation(
    range='E2:E100',
    type='list',
    formula='=INDIRECT(D2)',
    allow_blank=False
)
```

### Number Validation

```python
# Integer range validation
gen.add_data_validation(
    range='B2:B100',
    type='whole',
    min=0, max=100,
    error_message='Value must be between 0 and 100'
)

# Decimal validation
gen.add_data_validation(
    range='C2:C100',
    type='decimal',
    min=0, max=1000,
    error_style='warning'
)
```

### Date Validation

```python
# Date range validation
gen.add_data_validation(
    range='A2:A100',
    type='date',
    min_date='2024-01-01',
    max_date='2024-12-31',
    error_message='Date must be in 2024'
)
```

## Chart Types

### Available Charts

| Type | Description | Best Use |
|------|-------------|----------|
| **Column** | Vertical bars | Comparison, trends |
| **Bar** | Horizontal bars | Rankings, comparisons |
| **Line** | Connected points | Trends over time |
| **Pie** | Circular segments | Proportions, percentages |
| **Area** | Filled areas | Volume trends |
| **Scatter** | XY points | Correlation analysis |
| **Combo** | Mixed types | Multiple metrics |

### Chart Configuration

```python
# Column chart with custom styling
gen.add_chart(
    chart_type='column',
    title='Monthly Performance',
    data_range='A2:D13',
    position='F2',
    size=(400, 300),
    style_options={
        'show_legend': True,
        'show_values': True,
        'primary_color': 'style.primary',
        'grid_lines': 'major',
        'axis_labels': True
    }
)

# Combo chart (column + line)
gen.add_combo_chart(
    title='Revenue vs Target',
    column_range='B2:B13',
    line_range='C2:C13',
    position='A15',
    style_options={
        'column_color': 'style.primary',
        'line_color': 'style.accent'
    }
)
```

## Style Configuration

### Typography System

| Level | Font Size | Font Weight | Use |
|-------|-----------|-------------|-----|
| **Title** | 24pt | Bold | Sheet title |
| **Header** | 12pt | Bold | Column headers |
| **Body** | 11pt | Regular | Data cells |
| **Caption** | 10pt | Regular | Notes, comments |
| **Small** | 9pt | Regular | Meta information |

### Border Styles

| Style | Description | Use |
|-------|-------------|-----|
| **Thin** | Single thin line | Standard cells |
| **Medium** | Single medium line | Headers, totals |
| **Double** | Double line | Major sections |
| **Dashed** | Dashed line | Dividers |

### Fill Patterns

| Pattern | Description | Use |
|---------|-------------|-----|
| **Solid** | Solid color fill | Headers, highlights |
| **Gradient** | Gradient fill | Modern headers |
| **Pattern** | Pattern fill | Special sections |

## File Structure

```
modern-excel/
├── SKILL.md                        # Skill documentation
├── scripts/
│   ├── style-library.js            # 18 style definitions + layout parameters
│   ├── template-content.js         # Table template content
│   ├── modern-excel-ultimate.js    # Ultimate generator (Python + JS)
│   ├── conditional-formatting.js   # Conditional formatting engine
│   ├── chart-engine.js             # Chart generation engine
│   ├── formula-templates.js        # Pre-built formula templates
│   ├── data-validation.js          # Data validation rules
│   └── generate-all-templates.js   # Batch template generation
├── references/
│   ├── conditional-formatting.md   # Conditional formatting guide
│   ├── chart-types.md              # Chart types reference
│   └── formula-reference.md        # Excel formula reference
└── assets/
    └── templates/                  # Pre-built Excel templates
```

## Batch Generation

```javascript
const { generateAllTemplates } = require('./scripts/generate-all-templates');

// Generate all 18 style templates
await generateAllTemplates('/path/to/output');

// Generate specific styles
await generateAllTemplates('/path/to/output', {
    styles: ['finance', 'academic', 'tech'],
    types: ['financial_report', 'dashboard', 'comparison_table']
});
```

## Technical Stack

### Python (Recommended for complex formatting)
- **openpyxl** - Full Excel 2010+ support, conditional formatting, charts
- **xlsxwriter** - Fast creation, extensive chart support

### Node.js (Recommended for automation)
- **ExcelJS** - Full workbook manipulation, formulas, streaming

### Dependencies Installation

```bash
# Python
pip install openpyxl xlsxwriter

# Node.js
npm install exceljs
```

## Version History

### v7.0 (Current) - Ultimate Edition
- 18 professional styles matching modern-ppt aesthetic
- Complete conditional formatting system
- Embedded chart generation
- Formula templates library
- Data validation rules
- Smart column auto-fit

### v6.0
- Financial report templates
- Dashboard tables
- Comparison tables
- Timeline tables

### v5.0
- 12 initial styles
- Basic conditional formatting
- Simple chart support

### v4.0
- Multi-sheet support
- Formula integration
- Auto-fit columns

### v3.0
- Initial style library
- Basic table generation
- Header styling