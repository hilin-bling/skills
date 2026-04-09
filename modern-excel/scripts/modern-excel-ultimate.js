/**
 * Modern Excel Generator Ultimate - v8.0 Professional Edition
 *
 * Professional Excel spreadsheet generation with 18 styles
 * Supports: styling, conditional formatting, charts, formulas, data validation
 *
 * Features:
 * - 18 professional styles matching modern-ppt aesthetic
 * - Professional header design with themed backgrounds
 * - Alternating row colors for data readability
 * - Summary/Total row with emphasized styling
 * - Conditional formatting (color scales, data bars)
 * - Data validation and filtering
 * - Auto-fit columns with proper padding
 * - Freeze panes for headers
 * - Dashboard components with KPI cards
 * - Complete border styling system
 *
 * Supports both Python (openpyxl/xlsxwriter) and Node.js (ExcelJS)
 */

const ExcelJS = require('exceljs');
const { STYLE_LIBRARY, getStyle, MODERN_LAYOUT_BASE, hexToARGB, recommendStyle, lightenColor, darkenColor } = require('./style-library');
const { CHART_PRESETS, createChartConfig } = require('./chart-engine');
const { CONDITIONAL_FORMATTING_RULES } = require('./conditional-formatting');

// ==========================================
// Professional Design Constants
// ==========================================

const PROFESSIONAL_DESIGN = {
    // Typography hierarchy for Excel (points)
    typography: {
        title: 16,         // Sheet title
        header: 12,        // Column headers - bold
        subheader: 11,     // Sub headers
        body: 11,          // Data cells
        caption: 10,       // Notes
        kpi: 24,           // KPI large numbers
        small: 9           // Meta info
    },

    // Row heights in points (1 point ≈ 1/72 inch, but Excel uses this differently)
    rowHeight: {
        title: 30,         // Title row
        header: 26,        // Header row
        body: 22,          // Data rows
        compact: 18,       // Compact mode
        summary: 26,       // Summary row
        kpi: 40            // KPI row
    },

    // Column width guidelines
    columnWidth: {
        min: 10,
        default: 15,
        max: 50,
        padding: 2         // Extra padding for auto-fit
    },

    // Border styles
    borders: {
        header: {
            top: { style: 'medium' },
            left: { style: 'thin' },
            bottom: { style: 'medium' },
            right: { style: 'thin' }
        },
        data: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        },
        summary: {
            top: { style: 'double' },
            left: { style: 'thin' },
            bottom: { style: 'medium' },
            right: { style: 'thin' }
        }
    },

    // Number formats
    numberFormats: {
        number: '#,##0',
        decimal: '#,##0.00',
        currency: '$#,##0.00',
        currencySimple: '$#,##0',
        percentage: '0.00%',
        percentageInt: '0%',
        date: 'yyyy-mm-dd',
        dateTime: 'yyyy-mm-dd hh:mm:ss'
    }
};

class ModernExcelUltimate {
    constructor(styleName = 'corporateStandard', options = {}) {
        this.workbook = new ExcelJS.Workbook();
        this.workbook.creator = 'Modern Excel Ultimate v8.0 Professional';
        this.workbook.created = new Date();

        this.style = getStyle(styleName);
        this.styleName = styleName;
        this.currentSheet = null;
        this._currentRow = 1;  // 追踪当前行位置
        this.options = {
            autoFit: options.autoFit !== false,
            freezeHeader: options.freezeHeader !== false,
            enableFilter: options.enableFilter !== false,
            alternatingRows: options.alternatingRows !== false,
            compactMode: options.compactMode || false,
            ...options
        };

        // Create default sheet
        this.createSheet('Sheet1');

        // Initialize style caches
        this._styleCache = {};
        this._initStyles();
    }

    // ==========================================
    // Initialization
    // ==========================================

    createSheet(name) {
        this.currentSheet = this.workbook.addWorksheet(name);
        this._currentRow = 1;  // 重置行计数器
        this._applySheetSettings();
        return this.currentSheet;
    }

    getSheet(name) {
        this.currentSheet = this.workbook.getWorksheet(name);
        return this.currentSheet;
    }

    _applySheetSettings() {
        if (!this.currentSheet) return;

        // Set default row height
        const defaultHeight = this.options.compactMode
            ? PROFESSIONAL_DESIGN.rowHeight.compact
            : PROFESSIONAL_DESIGN.rowHeight.body;
        this.currentSheet.properties.defaultRowHeight = defaultHeight;

        // Set default font
        this.currentSheet.properties.defaultFont = {
            name: 'Arial',
            size: PROFESSIONAL_DESIGN.typography.body
        };
    }

    _initStyles() {
        const colors = this.style.colors;
        const fonts = MODERN_LAYOUT_BASE.fonts;
        const typo = PROFESSIONAL_DESIGN.typography;

        // ==========================================
        // Title Style (Sheet Title)
        // ==========================================
        this._styleCache.title = {
            font: {
                name: fonts.title,
                size: typo.title,
                bold: true,
                color: { argb: hexToARGB(colors.text) }
            },
            fill: {
                type: 'pattern',
                pattern: 'none'
            },
            alignment: {
                horizontal: 'left',
                vertical: 'middle'
            }
        };

        // ==========================================
        // Header Style (Column Headers) - Professional Design
        // Uses primary color background with white text
        // ==========================================
        this._styleCache.header = {
            font: {
                name: fonts.header,
                size: typo.header,
                bold: true,
                color: { argb: hexToARGB(colors.headerText) }
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: hexToARGB(colors.headerBg) }
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle',
                wrapText: true
            },
            border: {
                top: { style: 'medium', color: { argb: hexToARGB(colors.headerBg) } },
                left: { style: 'thin', color: { argb: hexToARGB(colors.border) } },
                bottom: { style: 'medium', color: { argb: hexToARGB(colors.headerBg) } },
                right: { style: 'thin', color: { argb: hexToARGB(colors.border) } }
            }
        };

        // ==========================================
        // Data Cell Styles
        // ==========================================

        // Standard data cell
        this._styleCache.data = {
            font: {
                name: fonts.body,
                size: typo.body,
                color: { argb: hexToARGB(colors.text) }
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: hexToARGB(colors.dataBg) }
            },
            alignment: {
                horizontal: 'left',
                vertical: 'middle',
                wrapText: false
            },
            border: {
                top: { style: 'thin', color: { argb: hexToARGB(colors.border) } },
                left: { style: 'thin', color: { argb: hexToARGB(colors.border) } },
                bottom: { style: 'thin', color: { argb: hexToARGB(colors.border) } },
                right: { style: 'thin', color: { argb: hexToARGB(colors.border) } }
            }
        };

        // Alternating row style
        this._styleCache.altRow = {
            ...this._styleCache.data,
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: hexToARGB(colors.altRowBg) }
            }
        };

        // ==========================================
        // Number/Decimal Style (Right-aligned)
        // ==========================================
        this._styleCache.number = {
            ...this._styleCache.data,
            alignment: {
                horizontal: 'right',
                vertical: 'middle'
            },
            numFmt: PROFESSIONAL_DESIGN.numberFormats.decimal
        };

        this._styleCache.altNumber = {
            ...this._styleCache.altRow,
            alignment: {
                horizontal: 'right',
                vertical: 'middle'
            },
            numFmt: PROFESSIONAL_DESIGN.numberFormats.decimal
        };

        // ==========================================
        // Currency Style
        // ==========================================
        this._styleCache.currency = {
            ...this._styleCache.number,
            numFmt: PROFESSIONAL_DESIGN.numberFormats.currency
        };

        this._styleCache.altCurrency = {
            ...this._styleCache.altNumber,
            numFmt: PROFESSIONAL_DESIGN.numberFormats.currency
        };

        // ==========================================
        // Percentage Style
        // ==========================================
        this._styleCache.percentage = {
            ...this._styleCache.number,
            numFmt: PROFESSIONAL_DESIGN.numberFormats.percentage
        };

        this._styleCache.altPercentage = {
            ...this._styleCache.altNumber,
            numFmt: PROFESSIONAL_DESIGN.numberFormats.percentage
        };

        // ==========================================
        // Date Style
        // ==========================================
        this._styleCache.date = {
            ...this._styleCache.data,
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            },
            numFmt: PROFESSIONAL_DESIGN.numberFormats.date
        };

        this._styleCache.altDate = {
            ...this._styleCache.altRow,
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            },
            numFmt: PROFESSIONAL_DESIGN.numberFormats.date
        };

        // ==========================================
        // Summary/Total Row Style - Professional Emphasis
        // ==========================================
        const summaryBg = colors.summaryBg || darkenColor(colors.headerBg, 10);
        const summaryText = colors.summaryText || colors.headerText;

        this._styleCache.summary = {
            font: {
                name: fonts.header,
                size: typo.header,
                bold: true,
                color: { argb: hexToARGB(summaryText) }
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: hexToARGB(summaryBg) }
            },
            alignment: {
                horizontal: 'right',
                vertical: 'middle'
            },
            border: {
                top: { style: 'double', color: { argb: hexToARGB(summaryBg) } },
                left: { style: 'thin', color: { argb: hexToARGB(colors.border) } },
                bottom: { style: 'medium', color: { argb: hexToARGB(summaryBg) } },
                right: { style: 'thin', color: { argb: hexToARGB(colors.border) } }
            }
        };

        this._styleCache.summaryLabel = {
            ...this._styleCache.summary,
            alignment: {
                horizontal: 'left',
                vertical: 'middle'
            }
        };

        // ==========================================
        // KPI Styles for Dashboard
        // ==========================================
        this._styleCache.kpiLabel = {
            font: {
                name: fonts.body,
                size: typo.caption,
                color: { argb: hexToARGB(colors.textMuted) }
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            }
        };

        this._styleCache.kpiValue = {
            font: {
                name: fonts.title,
                size: typo.kpi,
                bold: true,
                color: { argb: hexToARGB(colors.primary) }
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            }
        };

        this._styleCache.kpiPositive = {
            font: {
                name: fonts.body,
                size: typo.body,
                bold: true,
                color: { argb: hexToARGB(colors.positive) }
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            }
        };

        this._styleCache.kpiNegative = {
            font: {
                name: fonts.body,
                size: typo.body,
                bold: true,
                color: { argb: hexToARGB(colors.negative) }
            },
            alignment: {
                horizontal: 'center',
                vertical: 'middle'
            }
        };

        // ==========================================
        // Section Header Style
        // ==========================================
        this._styleCache.sectionHeader = {
            font: {
                name: fonts.header,
                size: typo.subheader,
                bold: true,
                color: { argb: hexToARGB(colors.headerText) }
            },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: hexToARGB(colors.secondary) }
            },
            alignment: {
                horizontal: 'left',
                vertical: 'middle'
            }
        };
    }

    // ==========================================
    // Core Table Creation Methods
    // ==========================================

    /**
     * Create a professional data table with full styling
     */
    dataTable(config) {
        const {
            title,
            headers,
            data,
            startRow = this._currentRow,  // 使用当前行位置作为默认值
            startCol = 1,
            formulas = {},
            conditionalFormat = {},
            numberFormats = {},
            columnWidths = {},
            showTotals = false,  // 默认不显示汇总行
            totalLabels = {}
        } = config;

        let currentRow = startRow;

        // Add title if provided
        if (title) {
            const titleCell = this.currentSheet.getCell(currentRow, startCol);
            titleCell.value = title;
            titleCell.style = this._styleCache.title;
            this.currentSheet.getRow(currentRow).height = PROFESSIONAL_DESIGN.rowHeight.title;

            // Merge title across all columns
            if (headers.length > 1) {
                this.currentSheet.mergeCells(currentRow, startCol, currentRow, startCol + headers.length - 1);
            }
            currentRow += 1;

            // Add spacing row
            currentRow += 1;
        }

        const headerRow = currentRow;
        const dataStartRow = currentRow + 1;

        // ==========================================
        // Add Headers with Professional Styling
        // ==========================================
        const rowHeight = this.options.compactMode
            ? PROFESSIONAL_DESIGN.rowHeight.compact
            : PROFESSIONAL_DESIGN.rowHeight.body;

        this.currentSheet.getRow(headerRow).height = PROFESSIONAL_DESIGN.rowHeight.header;

        headers.forEach((header, index) => {
            const col = startCol + index;
            const cell = this.currentSheet.getCell(headerRow, col);
            cell.value = header;
            cell.style = this._styleCache.header;
        });

        // ==========================================
        // Add Data Rows with Alternating Colors
        // ==========================================
        data.forEach((rowData, rowIndex) => {
            const row = dataStartRow + rowIndex;
            const isAltRow = this.options.alternatingRows && rowIndex % 2 === 1;

            this.currentSheet.getRow(row).height = rowHeight;

            rowData.forEach((cellData, colIndex) => {
                const col = startCol + colIndex;
                const cell = this.currentSheet.getCell(row, col);
                const headerName = headers[colIndex];
                const format = numberFormats[headerName];

                // Determine cell value and appropriate style
                if (typeof cellData === 'number') {
                    cell.value = cellData;
                    cell.style = this._getNumberCellStyle(format, isAltRow);
                } else if (cellData instanceof Date) {
                    cell.value = cellData;
                    cell.style = isAltRow ? this._styleCache.altDate : this._styleCache.date;
                } else if (typeof cellData === 'object' && cellData !== null && cellData.formula) {
                    cell.value = { formula: cellData.formula };
                    cell.style = isAltRow ? this._styleCache.altRow : this._styleCache.data;
                } else {
                    cell.value = cellData;
                    cell.style = isAltRow ? this._styleCache.altRow : this._styleCache.data;
                }
            });
        });

        // ==========================================
        // Apply Column Formulas
        // ==========================================
        const dataEndRow = dataStartRow + data.length - 1;
        Object.entries(formulas).forEach(([colName, formulaTemplate]) => {
            const colIndex = headers.indexOf(colName);
            if (colIndex === -1) return;

            const col = startCol + colIndex;
            const colLetter = this._getColLetter(col);

            for (let row = dataStartRow; row <= dataEndRow; row++) {
                const cell = this.currentSheet.getCell(row, col);
                const processedFormula = this._processFormula(formulaTemplate, row, colLetter, startCol, headers);
                cell.value = { formula: processedFormula };
            }
        });

        // ==========================================
        // Add Summary/Total Row
        // ==========================================
        let totalRow = null;
        if (showTotals && data.length > 0) {
            totalRow = dataEndRow + 1;
            this.currentSheet.getRow(totalRow).height = PROFESSIONAL_DESIGN.rowHeight.summary;

            // Find numeric columns
            const numericCols = headers.map((h, i) => {
                const hasNumbers = data.some(row => typeof row[i] === 'number');
                return hasNumbers ? i : -1;
            }).filter(i => i >= 0);

            headers.forEach((header, colIndex) => {
                const col = startCol + colIndex;
                const cell = this.currentSheet.getCell(totalRow, col);

                if (numericCols.includes(colIndex)) {
                    const colLetter = this._getColLetter(col);
                    cell.value = { formula: `SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})` };

                    // Use appropriate number format
                    const format = numberFormats[header];
                    if (format === 'currency') {
                        cell.numFmt = PROFESSIONAL_DESIGN.numberFormats.currency;
                    } else if (format === 'percentage') {
                        cell.numFmt = PROFESSIONAL_DESIGN.numberFormats.percentage;
                    }
                    cell.style = this._styleCache.summary;
                } else {
                    // Label column (typically first column)
                    const label = totalLabels[header] || (colIndex === 0 ? 'Total' : '');
                    cell.value = label;
                    cell.style = this._styleCache.summaryLabel;
                }
            });
        }

        // ==========================================
        // Freeze Header Row
        // ==========================================
        if (this.options.freezeHeader) {
            this.currentSheet.views = [{
                state: 'frozen',
                ySplit: headerRow
            }];
        }

        // ==========================================
        // Enable Auto Filter
        // ==========================================
        if (this.options.enableFilter) {
            const lastCol = startCol + headers.length - 1;
            const filterEndRow = totalRow ? totalRow - 1 : dataEndRow;
            this.currentSheet.autoFilter = {
                from: { row: headerRow, column: startCol },
                to: { row: filterEndRow, column: lastCol }
            };
        }

        // ==========================================
        // Auto-fit Columns
        // ==========================================
        if (this.options.autoFit) {
            this._autoFitColumns(startCol, startCol + headers.length - 1, columnWidths);
        }

        // ==========================================
        // Apply Conditional Formatting
        // ==========================================
        Object.entries(conditionalFormat).forEach(([colName, rule]) => {
            const colIndex = headers.indexOf(colName);
            if (colIndex === -1) return;

            const col = startCol + colIndex;
            const colLetter = this._getColLetter(col);
            this._applyConditionalFormat(`${colLetter}${dataStartRow}:${colLetter}${dataEndRow}`, rule);
        });

        // 更新当前行位置（表格结束位置 + 2行间距）
        const endRow = totalRow ? totalRow : dataEndRow;
        this._currentRow = endRow + 3;

        return {
            headerRow,
            dataStartRow,
            dataEndRow,
            totalRow
        };
    }

    /**
     * Get appropriate number cell style based on format and alternating
     */
    _getNumberCellStyle(format, isAltRow) {
        switch (format) {
            case 'currency':
                return isAltRow ? this._styleCache.altCurrency : this._styleCache.currency;
            case 'percentage':
                return isAltRow ? this._styleCache.altPercentage : this._styleCache.percentage;
            case 'date':
                return isAltRow ? this._styleCache.altDate : this._styleCache.date;
            case 'integer':
                return isAltRow ? this._styleCache.altNumber : this._styleCache.number;
            default:
                return isAltRow ? this._styleCache.altNumber : this._styleCache.number;
        }
    }

    /**
     * Create a financial report table
     */
    financialReport(config) {
        const {
            title,
            headers = ['Quarter', 'Revenue', 'Expenses', 'Profit', 'Margin'],
            data,
            startRow = 1,
            startCol = 1
        } = config;

        // Calculate derived columns
        const processedData = data.map(row => {
            const revenue = row[1] || row.revenue || 0;
            const expenses = row[2] || row.expenses || 0;
            const profit = revenue - expenses;
            const margin = revenue > 0 ? profit / revenue : 0;

            return [
                row[0] || row.quarter || row.category,
                revenue,
                expenses,
                profit,
                margin
            ];
        });

        return this.dataTable({
            title,
            headers,
            data: processedData,
            startRow,
            startCol,
            numberFormats: {
                'Revenue': 'currency',
                'Expenses': 'currency',
                'Profit': 'currency',
                'Margin': 'percentage'
            },
            conditionalFormat: {
                'Profit': 'color_scale_positive',
                'Margin': 'data_bar_positive'
            }
        });
    }

    /**
     * Create a comparison table (Budget vs Actual)
     */
    comparisonTable(config) {
        const {
            title,
            headers = ['Item', 'Budget', 'Actual', 'Variance', 'Variance %', 'Status'],
            data,
            startRow = 1,
            startCol = 1
        } = config;

        // Calculate variance and status
        const processedData = data.map(row => {
            const budget = row[1] || row.budget || 0;
            const actual = row[2] || row.actual || 0;
            const variance = actual - budget;
            const variancePercent = budget > 0 ? variance / budget : 0;
            const status = variance > 0 ? 'Over' : variance < 0 ? 'Under' : 'On Target';

            return [
                row[0] || row.item || row.category,
                budget,
                actual,
                variance,
                variancePercent,
                status
            ];
        });

        const result = this.dataTable({
            title,
            headers,
            data: processedData,
            startRow,
            startCol,
            numberFormats: {
                'Budget': 'currency',
                'Actual': 'currency',
                'Variance': 'currency',
                'Variance %': 'percentage'
            },
            conditionalFormat: {
                'Variance': 'color_scale_negative',
                'Variance %': 'data_bar_negative'
            }
        });

        // Apply conditional styling for Status column
        const statusCol = headers.indexOf('Status') + startCol;
        processedData.forEach((row, index) => {
            const cell = this.currentSheet.getCell(result.dataStartRow + index, statusCol);
            const status = row[5];
            if (status === 'Over') {
                cell.style = this._styleCache.kpiNegative;
            } else if (status === 'Under') {
                cell.style = this._styleCache.kpiPositive;
            }
        });

        return result;
    }

    /**
     * Create a dashboard with KPI cards
     */
    dashboard(config) {
        const {
            title,
            metrics,
            startRow = this._currentRow,  // 使用当前行位置
            startCol = 1,
            layout = 'horizontal'
        } = config;

        let currentRow = startRow;

        // Add title
        if (title) {
            const titleCell = this.currentSheet.getCell(currentRow, startCol);
            titleCell.value = title;
            titleCell.style = this._styleCache.title;
            this.currentSheet.getRow(currentRow).height = PROFESSIONAL_DESIGN.rowHeight.title;
            currentRow += 2;
        }

        if (layout === 'horizontal') {
            // Horizontal layout - metrics as rows
            const headers = ['Metric', 'Value', 'Change', 'Trend'];
            const data = metrics.map(m => [
                m.name || m.metric,
                m.value,
                m.change || '',
                m.status || (m.change && m.change.toString().startsWith('+') ? 'Up' : 'Down')
            ]);

            const result = this.dataTable({
                headers,
                data,
                startRow: currentRow,
                startCol,
                showTotals: false
            });

            // Style the trend column
            const trendCol = startCol + 3;
            metrics.forEach((m, index) => {
                const cell = this.currentSheet.getCell(result.dataStartRow + index, trendCol);
                const trend = data[index][3];
                if (trend === 'Up' || trend === 'up') {
                    cell.style = this._styleCache.kpiPositive;
                } else if (trend === 'Down' || trend === 'down') {
                    cell.style = this._styleCache.kpiNegative;
                }
            });

            return result;
        } else {
            // Vertical layout - KPI cards
            const colWidth = 5;
            const rowHeight = PROFESSIONAL_DESIGN.rowHeight.kpi;

            metrics.forEach((metric, index) => {
                const col = startCol + (index * colWidth);

                // Metric label
                const labelCell = this.currentSheet.getCell(currentRow, col);
                labelCell.value = metric.name;
                labelCell.style = this._styleCache.kpiLabel;
                this.currentSheet.mergeCells(currentRow, col, currentRow, col + colWidth - 2);

                // Metric value (large)
                const valueCell = this.currentSheet.getCell(currentRow + 1, col);
                valueCell.value = metric.value;
                valueCell.style = this._styleCache.kpiValue;
                this.currentSheet.mergeCells(currentRow + 1, col, currentRow + 1, col + colWidth - 2);
                this.currentSheet.getRow(currentRow + 1).height = rowHeight;

                // Change indicator
                if (metric.change) {
                    const changeCell = this.currentSheet.getCell(currentRow + 2, col);
                    changeCell.value = metric.change;
                    const isPositive = metric.change.toString().startsWith('+') || metric.status === 'up';
                    changeCell.style = isPositive ? this._styleCache.kpiPositive : this._styleCache.kpiNegative;
                    this.currentSheet.mergeCells(currentRow + 2, col, currentRow + 2, col + colWidth - 2);
                }
            });

            return {
                headerRow: currentRow,
                dataStartRow: currentRow + 1,
                dataEndRow: currentRow + 2
            };
        }
    }

    /**
     * Create a timeline table
     */
    timeline(config) {
        const {
            title,
            headers = ['Phase', 'Start Date', 'End Date', 'Duration (Days)', 'Progress', 'Status'],
            items,
            startRow = 1,
            startCol = 1
        } = config;

        // Calculate durations and status
        const processedData = items.map(item => {
            const start = item.startDate || item.start || item[1];
            const end = item.endDate || item.end || item[2];
            const progress = item.progress || item[4] || 0;

            // Calculate duration in days
            let duration = '';
            if (start && end) {
                const startDate = new Date(start);
                const endDate = new Date(end);
                duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
            }

            let status = 'Not Started';
            if (progress >= 1) status = 'Complete';
            else if (progress > 0) status = 'In Progress';

            return [
                item.phase || item.name || item[0],
                start,
                end,
                duration,
                progress,
                status
            ];
        });

        return this.dataTable({
            title,
            headers,
            data: processedData,
            startRow,
            startCol,
            numberFormats: {
                'Progress': 'percentage'
            },
            conditionalFormat: {
                'Progress': 'data_bar_positive'
            }
        });
    }

    /**
     * Create a project progress table
     */
    projectProgress(config) {
        const {
            title,
            projects,
            startRow = 1,
            startCol = 1
        } = config;

        const headers = ['Project', 'Start', 'Deadline', 'Progress', 'Budget', 'Spent', 'Remaining', 'Status'];

        const data = projects.map(p => {
            const budget = p.budget || 0;
            const spent = p.spent || 0;
            const remaining = budget - spent;
            const progress = p.progress || 0;

            let status = 'Active';
            if (progress >= 1) status = 'Completed';
            else if (remaining < 0) status = 'Over Budget';
            else if (progress < 0.5) status = 'Early Stage';

            return [
                p.name || p.project,
                p.start || p.startDate,
                p.deadline || p.endDate,
                progress,
                budget,
                spent,
                remaining,
                status
            ];
        });

        return this.dataTable({
            title,
            headers,
            data,
            startRow,
            startCol,
            numberFormats: {
                'Progress': 'percentage',
                'Budget': 'currency',
                'Spent': 'currency',
                'Remaining': 'currency'
            },
            conditionalFormat: {
                'Progress': 'data_bar_positive',
                'Remaining': 'color_scale_negative'
            }
        });
    }

    /**
     * Create an analysis report with multiple sections
     */
    analysisReport(config) {
        const {
            title,
            sections,
            startRow = 1,
            startCol = 1
        } = config;

        let currentRow = startRow;

        // Add main title
        if (title) {
            const titleCell = this.currentSheet.getCell(currentRow, startCol);
            titleCell.value = title;
            titleCell.style = this._styleCache.title;
            this.currentSheet.getRow(currentRow).height = PROFESSIONAL_DESIGN.rowHeight.title;
            currentRow += 2;
        }

        sections.forEach((section, sectionIndex) => {
            // Section header
            const sectionCell = this.currentSheet.getCell(currentRow, startCol);
            sectionCell.value = section.name || section.title;
            sectionCell.style = this._styleCache.sectionHeader;

            // Merge section header across columns
            const colSpan = section.headers ? section.headers.length : 4;
            this.currentSheet.mergeCells(currentRow, startCol, currentRow, startCol + colSpan - 1);
            this.currentSheet.getRow(currentRow).height = PROFESSIONAL_DESIGN.rowHeight.header;
            currentRow += 1;

            // Section data
            if (section.data && section.data.length > 0) {
                const headers = section.headers || Object.keys(section.data[0] || {});
                const data = section.data.map(row =>
                    headers.map(h => row[h] !== undefined ? row[h] : '')
                );

                const result = this.dataTable({
                    headers,
                    data,
                    startRow: currentRow,
                    startCol,
                    showTotals: false
                });

                currentRow = result.dataEndRow + 2;
            }

            // Spacing between sections
            currentRow += 1;
        });

        return { startRow, endRow: currentRow };
    }

    // ==========================================
    // Helper Methods
    // ==========================================

    _getColLetter(colNumber) {
        let letter = '';
        while (colNumber > 0) {
            const mod = (colNumber - 1) % 26;
            letter = String.fromCharCode(65 + mod) + letter;
            colNumber = Math.floor((colNumber - mod) / 26);
        }
        return letter;
    }

    _colLetterToNumber(letter) {
        let number = 0;
        for (let i = 0; i < letter.length; i++) {
            number = number * 26 + (letter.charCodeAt(i) - 64);
        }
        return number;
    }

    _processFormula(template, row, colLetter, startCol, headers) {
        let formula = template;

        // Replace column references like {ColName}
        headers.forEach((header, index) => {
            const col = this._getColLetter(startCol + index);
            formula = formula.replace(new RegExp(`\\{${header}\\}`, 'g'), `${col}${row}`);
        });

        // Replace row/column placeholders
        formula = formula.replace(/{row}/g, row);
        formula = formula.replace(/{col}/g, colLetter);

        return formula;
    }

    /**
     * 计算文本宽度（考虑中英文字符差异）
     * 中文字符宽度约为英文字符的 2 倍
     */
    _calculateTextWidth(text) {
        if (!text) return 0;
        let width = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            const code = text.charCodeAt(i);
            // CJK 字符范围（中日韩文字）
            if (code >= 0x4E00 && code <= 0x9FFF ||
                code >= 0x3400 && code <= 0x4DBF ||
                code >= 0x20000 && code <= 0x2A6DF ||
                code >= 0x3000 && code <= 0x303F) {
                width += 2.0;  // 中文字符宽度
            } else if (code >= 0xFF00 && code <= 0xFFEF) {
                // 全角字符
                width += 2.0;
            } else {
                width += 1.0;  // 英文字符宽度
            }
        }
        return width;
    }

    _autoFitColumns(startCol, endCol, customWidths = {}) {
        const colNames = this.currentSheet.getRow(1).values;

        for (let col = startCol; col <= endCol; col++) {
            const column = this.currentSheet.getColumn(col);
            let maxWidth = PROFESSIONAL_DESIGN.columnWidth.min;

            column.eachCell((cell, rowNumber) => {
                if (cell.value !== null && cell.value !== undefined) {
                    const cellValue = cell.value.toString();
                    // 使用中英文混合宽度计算
                    const textWidth = this._calculateTextWidth(cellValue);
                    const cellWidth = textWidth * 0.85 + PROFESSIONAL_DESIGN.columnWidth.padding;
                    maxWidth = Math.max(maxWidth, Math.min(cellWidth, PROFESSIONAL_DESIGN.columnWidth.max));
                }
            });

            // Apply custom width if specified
            const headerName = colNames[col];
            if (customWidths[headerName]) {
                maxWidth = customWidths[headerName];
            }

            column.width = maxWidth;
        }
    }

    // ==========================================
    // Conditional Formatting
    // ==========================================

    _applyConditionalFormat(range, rule) {
        const colors = this.style.colors;

        // Track conditional formatting for later processing
        if (!this.currentSheet._conditionalFormats) {
            this.currentSheet._conditionalFormats = [];
        }

        let formatConfig = null;

        switch (rule) {
            case 'color_scale_positive':
                formatConfig = {
                    type: 'colorScale',
                    range,
                    colors: this.style.conditionalFormat?.colorScalePositive ||
                        ['FFFFFF', colors.positive, '059669']
                };
                break;

            case 'color_scale_negative':
                formatConfig = {
                    type: 'colorScale',
                    range,
                    colors: this.style.conditionalFormat?.colorScaleNegative ||
                        ['FFFFFF', colors.negative, 'DC2626']
                };
                break;

            case 'data_bar_positive':
                formatConfig = {
                    type: 'dataBar',
                    range,
                    color: this.style.conditionalFormat?.dataBarPositive || colors.positive
                };
                break;

            case 'data_bar_negative':
                formatConfig = {
                    type: 'dataBar',
                    range,
                    color: this.style.conditionalFormat?.dataBarNegative || colors.negative
                };
                break;

            default:
                if (typeof rule === 'object') {
                    formatConfig = { type: 'custom', range, ...rule };
                }
        }

        if (formatConfig) {
            this.currentSheet._conditionalFormats.push(formatConfig);
        }
    }

    // ==========================================
    // Data Validation
    // ==========================================

    addDataValidation(config) {
        const { range, type, values, formula, min, max, errorMessage } = config;

        let validation = {
            type: type || 'list',
            allowBlank: config.allowBlank !== false,
            showErrorMessage: !!errorMessage,
            errorTitle: 'Invalid Input',
            error: errorMessage || 'Please enter a valid value'
        };

        if (type === 'list') {
            if (values) {
                validation.formulae = [`"${values.join(',')}"`];
            } else if (formula) {
                validation.formulae = [formula];
            }
        } else if (type === 'whole' || type === 'decimal') {
            validation.formulae = [
                min !== undefined ? min.toString() : '',
                max !== undefined ? max.toString() : ''
            ];
            validation.operator = 'between';
        }

        // Apply to range
        const rangeMatch = range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
        if (rangeMatch) {
            const [, , startRow, , endRow] = rangeMatch;
            const startCol = this._colLetterToNumber(rangeMatch[1]);
            const endCol = this._colLetterToNumber(rangeMatch[3]);

            for (let row = parseInt(startRow); row <= parseInt(endRow); row++) {
                for (let col = startCol; col <= endCol; col++) {
                    const cell = this.currentSheet.getCell(row, col);
                    cell.dataValidation = validation;
                }
            }
        }

        return validation;
    }

    // ==========================================
    // Save and Export
    // ==========================================

    async save(filePath) {
        if (!filePath.endsWith('.xlsx')) {
            filePath += '.xlsx';
        }

        await this.workbook.xlsx.writeFile(filePath);
        return filePath;
    }

    async toBuffer() {
        return await this.workbook.xlsx.writeBuffer();
    }

    // ==========================================
    // Python Export (for advanced features)
    // ==========================================

    exportToPython(filePath) {
        return this._generatePythonScript();
    }

    _generatePythonScript() {
        const style = this.style;
        const colors = style.colors;

        return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Modern Excel Ultimate - Python Backend v8.0
Generated from Node.js configuration

Style: ${style.name} (${style.nameCN})
"""

import openpyxl
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment, NamedStyle
from openpyxl.formatting.rule import ColorScaleRule, DataBarRule, FormulaRule
from openpyxl.utils import get_column_letter

# Style Colors
COLORS = {
    'primary': '${colors.primary}',
    'secondary': '${colors.secondary}',
    'accent': '${colors.accent}',
    'headerBg': '${colors.headerBg}',
    'headerText': '${colors.headerText}',
    'dataBg': '${colors.dataBg}',
    'altRowBg': '${colors.altRowBg}',
    'summaryBg': '${colors.summaryBg || colors.headerBg}',
    'summaryText': '${colors.summaryText || colors.headerText}',
    'border': '${colors.border}',
    'text': '${colors.text}',
    'textMuted': '${colors.textMuted}',
    'positive': '${colors.positive}',
    'negative': '${colors.negative}'
}

# Create workbook
wb = Workbook()
ws = wb.active

# Define styles
header_style = NamedStyle(name='header')
header_style.font = Font(name='Arial', size=12, bold=True, color=COLORS['headerText'])
header_style.fill = PatternFill(start_color=COLORS['headerBg'], end_color=COLORS['headerBg'], fill_type='solid')
header_style.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
header_style.border = Border(
    top=Side(style='medium', color=COLORS['headerBg']),
    left=Side(style='thin', color=COLORS['border']),
    bottom=Side(style='medium', color=COLORS['headerBg']),
    right=Side(style='thin', color=COLORS['border'])
)

data_style = NamedStyle(name='data')
data_style.font = Font(name='Arial', size=11, color=COLORS['text'])
data_style.fill = PatternFill(start_color=COLORS['dataBg'], end_color=COLORS['dataBg'], fill_type='solid')
data_style.alignment = Alignment(horizontal='left', vertical='center')
data_style.border = Border(
    top=Side(style='thin', color=COLORS['border']),
    left=Side(style='thin', color=COLORS['border']),
    bottom=Side(style='thin', color=COLORS['border']),
    right=Side(style='thin', color=COLORS['border'])
)

# ... continue with Python implementation
`;
    }
}

// ==========================================
// Batch Generation
// ==========================================

async function generateAllTemplates(outputPath, options = {}) {
    const fs = require('fs');
    const path = require('path');

    const styles = options.styles || Object.keys(STYLE_LIBRARY);
    const types = options.types || ['dataTable', 'financialReport', 'comparisonTable', 'dashboard', 'timeline'];

    const results = [];

    for (const styleName of styles) {
        for (const typeName of types) {
            const gen = new ModernExcelUltimate(styleName);
            const style = getStyle(styleName);

            switch (typeName) {
                case 'dataTable':
                    gen.dataTable({
                        title: `${style.nameCN} Data Table`,
                        headers: ['Category', 'Value', 'Count', 'Percentage'],
                        data: [
                            ['Product A', 12500, 45, 0.35],
                            ['Product B', 8900, 32, 0.25],
                            ['Product C', 15600, 58, 0.40],
                        ],
                        numberFormats: { 'Value': 'currency', 'Percentage': 'percentage' }
                    });
                    break;

                case 'financialReport':
                    gen.financialReport({
                        title: `${style.nameCN} Financial Report`,
                        data: [
                            ['Q1', 120000, 80000],
                            ['Q2', 145000, 95000],
                            ['Q3', 168000, 110000],
                            ['Q4', 190000, 125000],
                        ]
                    });
                    break;

                case 'comparisonTable':
                    gen.comparisonTable({
                        title: `${style.nameCN} Budget Comparison`,
                        data: [
                            ['Marketing', 50000, 45000],
                            ['Engineering', 120000, 125000],
                            ['Operations', 80000, 78000],
                        ]
                    });
                    break;

                case 'dashboard':
                    gen.dashboard({
                        title: `${style.nameCN} KPI Dashboard`,
                        metrics: [
                            { name: 'Revenue', value: '$5.2M', change: '+15%', status: 'up' },
                            { name: 'Profit', value: '$1.8M', change: '+22%', status: 'up' },
                            { name: 'Costs', value: '$3.4M', change: '+5%', status: 'down' },
                        ]
                    });
                    break;

                case 'timeline':
                    gen.timeline({
                        title: `${style.nameCN} Project Timeline`,
                        items: [
                            { phase: 'Phase 1', startDate: '2024-01-01', endDate: '2024-03-31', progress: 0.95 },
                            { phase: 'Phase 2', startDate: '2024-04-01', endDate: '2024-06-30', progress: 0.60 },
                            { phase: 'Phase 3', startDate: '2024-07-01', endDate: '2024-12-31', progress: 0.25 },
                        ]
                    });
                    break;
            }

            const fileName = `${styleName}_${typeName}.xlsx`;
            const filePath = path.join(outputPath, fileName);
            await gen.save(filePath);

            results.push({
                style: styleName,
                type: typeName,
                file: filePath
            });
        }
    }

    return results;
}

module.exports = {
    ModernExcelUltimate,
    generateAllTemplates,
    getStyle,
    recommendStyle,
    STYLE_LIBRARY,
    MODERN_LAYOUT_BASE,
    PROFESSIONAL_DESIGN
};