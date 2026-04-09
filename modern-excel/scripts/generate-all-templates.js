/**
 * Generate All Templates - v7.0
 *
 * Batch generation script for all 18 styles and table types
 * Creates sample Excel files demonstrating each style
 */

const path = require('path');
const fs = require('fs');
const { ModernExcelUltimate, generateAllTemplates, getStyle, getAllStyleNames } = require('./modern-excel-ultimate');
const { STYLE_LIBRARY, STYLE_CATEGORIES, recommendStyle } = require('./style-library');

// ==========================================
// Sample Data for Each Table Type
// ==========================================

const SAMPLE_DATA = {
    // Basic data table
    dataTable: {
        title: 'Product Sales Analysis',
        headers: ['Product', 'Q1 Sales', 'Q2 Sales', 'Q3 Sales', 'Q4 Sales', 'Total', 'Growth'],
        data: [
            ['Product A', 12500, 14200, 15600, 18500],
            ['Product B', 8900, 9200, 10500, 11200],
            ['Product C', 15600, 16500, 17800, 19500],
            ['Product D', 6200, 7100, 8500, 9800],
            ['Product E', 21000, 22500, 24000, 26500],
        ],
        formulas: {
            'Total': 'SUM(B:E)',
            'Growth': '(E-B)/B'
        },
        numberFormats: {
            'Q1 Sales': 'currency',
            'Q2 Sales': 'currency',
            'Q3 Sales': 'currency',
            'Q4 Sales': 'currency',
            'Total': 'currency',
            'Growth': 'percentage'
        }
    },

    // Financial report
    financialReport: {
        title: 'Quarterly Financial Summary',
        headers: ['Quarter', 'Revenue', 'Expenses', 'Profit', 'Margin'],
        data: [
            ['Q1 2024', 120000, 80000],
            ['Q2 2024', 145000, 95000],
            ['Q3 2024', 168000, 110000],
            ['Q4 2024', 190000, 125000],
        ]
    },

    // Comparison table
    comparisonTable: {
        title: 'Budget vs Actual Analysis',
        headers: ['Department', 'Budget', 'Actual', 'Variance', 'Variance %', 'Status'],
        data: [
            ['Marketing', 50000, 45000],
            ['Engineering', 120000, 125000],
            ['Operations', 80000, 78000],
            ['Sales', 280000, 275000],
            ['HR', 45000, 42000],
        ]
    },

    // Dashboard
    dashboard: {
        title: 'Key Performance Indicators',
        metrics: [
            { name: 'Total Revenue', value: '$6.23M', change: '+15.2%', status: 'up' },
            { name: 'Net Profit', value: '$1.82M', change: '+22.5%', status: 'up' },
            { name: 'Customer Count', value: '12,450', change: '+8.3%', status: 'up' },
            { name: 'Avg Order Value', value: '$142', change: '-3.2%', status: 'down' },
            { name: 'Conversion Rate', value: '4.8%', change: '+0.5%', status: 'up' },
        ]
    },

    // Timeline
    timeline: {
        title: 'Project Timeline',
        headers: ['Phase', 'Start Date', 'End Date', 'Duration', 'Progress', 'Status'],
        items: [
            { phase: 'Planning', startDate: '2024-01-01', endDate: '2024-02-28', progress: 1.0 },
            { phase: 'Development', startDate: '2024-03-01', endDate: '2024-06-30', progress: 0.85 },
            { phase: 'Testing', startDate: '2024-07-01', endDate: '2024-08-31', progress: 0.45 },
            { phase: 'Deployment', startDate: '2024-09-01', endDate: '2024-10-15', progress: 0.0 },
            { phase: 'Launch', startDate: '2024-10-16', endDate: '2024-12-31', progress: 0.0 },
        ]
    },

    // Project progress
    projectProgress: {
        title: 'Project Progress Tracking',
        projects: [
            { name: 'Website Redesign', start: '2024-01-15', deadline: '2024-04-30', progress: 0.78, budget: 45000, spent: 38000 },
            { name: 'Mobile App', start: '2024-02-01', deadline: '2024-07-15', progress: 0.45, budget: 120000, spent: 55000 },
            { name: 'CRM Integration', start: '2024-03-01', deadline: '2024-05-31', progress: 0.92, budget: 35000, spent: 32500 },
            { name: 'Data Analytics', start: '2024-04-01', deadline: '2024-09-30', progress: 0.25, budget: 80000, spent: 22000 },
        ]
    },

    // Analysis report
    analysisReport: {
        title: 'Market Analysis Report',
        sections: [
            {
                name: 'Market Overview',
                headers: ['Region', 'Market Size', 'Growth Rate', 'Share'],
                data: [
                    ['North America', '$2.5B', '12%', '35%'],
                    ['Europe', '$1.8B', '8%', '25%'],
                    ['Asia Pacific', '$2.1B', '18%', '30%'],
                    ['Other', '$0.6B', '5%', '10%'],
                ]
            },
            {
                name: 'Competitor Analysis',
                headers: ['Competitor', 'Revenue', 'Market Share', 'Strength'],
                data: [
                    ['Competitor A', '$850M', '28%', 'Brand'],
                    ['Competitor B', '$620M', '20%', 'Price'],
                    ['Competitor C', '$480M', '15%', 'Quality'],
                ]
            }
        ]
    }
};

// ==========================================
// Template Generator Functions
// ==========================================

async function generateStyleTemplate(styleName, outputDir) {
    const style = getStyle(styleName);
    const gen = new ModernExcelUltimate(styleName);

    // Create multiple sheets demonstrating different table types
    gen.createSheet('Data Table');
    gen.dataTable({
        ...SAMPLE_DATA.dataTable,
        title: `${style.nameCN} - ${SAMPLE_DATA.dataTable.title}`,
        conditionalFormat: {
            'Total': 'color_scale_positive',
            'Growth': 'data_bar_positive'
        }
    });

    gen.createSheet('Financial Report');
    gen.financialReport({
        ...SAMPLE_DATA.financialReport,
        title: `${style.nameCN} - ${SAMPLE_DATA.financialReport.title}`
    });

    gen.createSheet('Comparison');
    gen.comparisonTable({
        ...SAMPLE_DATA.comparisonTable,
        title: `${style.nameCN} - ${SAMPLE_DATA.comparisonTable.title}`
    });

    gen.createSheet('Dashboard');
    gen.dashboard({
        ...SAMPLE_DATA.dashboard,
        title: `${style.nameCN} - ${SAMPLE_DATA.dashboard.title}`
    });

    gen.createSheet('Timeline');
    gen.timeline({
        ...SAMPLE_DATA.timeline,
        title: `${style.nameCN} - ${SAMPLE_DATA.timeline.title}`
    });

    gen.createSheet('Projects');
    gen.projectProgress({
        ...SAMPLE_DATA.projectProgress,
        title: `${style.nameCN} - ${SAMPLE_DATA.projectProgress.title}`
    });

    const fileName = `modern-excel-${styleName}.xlsx`;
    const filePath = path.join(outputDir, fileName);

    await gen.save(filePath);

    console.log(`Generated: ${fileName} (${style.nameCN})`);

    return {
        style: styleName,
        styleName: style.name,
        styleNameCN: style.nameCN,
        file: fileName,
        path: filePath
    };
}

async function generateAllStyleTemplates(outputDir, options = {}) {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const styles = options.styles || getAllStyleNames();
    const results = [];

    console.log('\n========================================');
    console.log('Modern Excel v7.0 - Template Generator');
    console.log('========================================\n');

    for (const styleName of styles) {
        try {
            const result = await generateStyleTemplate(styleName, outputDir);
            results.push(result);
        } catch (error) {
            console.error(`Error generating ${styleName}:`, error.message);
        }
    }

    console.log('\n========================================');
    console.log(`Generated ${results.length} templates`);
    console.log(`Output directory: ${outputDir}`);
    console.log('========================================\n');

    // Generate summary file
    const summaryPath = path.join(outputDir, 'template-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

    return results;
}

async function generateCategoryTemplates(outputDir) {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const results = {};

    console.log('\nGenerating category-based templates...\n');

    for (const [categoryKey, category] of Object.entries(STYLE_CATEGORIES)) {
        const categoryDir = path.join(outputDir, categoryKey);

        console.log(`\nCategory: ${category.nameCN} (${category.name})`);

        const categoryResults = [];
        for (const styleName of category.styles) {
            try {
                const result = await generateStyleTemplate(styleName, categoryDir);
                categoryResults.push(result);
            } catch (error) {
                console.error(`Error generating ${styleName}:`, error.message);
            }
        }

        results[categoryKey] = {
            name: category.name,
            nameCN: category.nameCN,
            styles: categoryResults
        };
    }

    // Generate category summary
    const summaryPath = path.join(outputDir, 'category-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

    return results;
}

async function generateQuickStartTemplate(outputDir) {
    // Generate a quick-start template demonstrating basic usage
    const gen = new ModernExcelUltimate('corporateStandard');

    // Cover/Title sheet
    gen.createSheet('Overview');
    const overviewSheet = gen.currentSheet;
    overviewSheet.getCell(1, 1).value = 'Modern Excel Ultimate v7.0';
    overviewSheet.getCell(1, 1).style = gen._styleCache.title;
    overviewSheet.getCell(3, 1).value = 'Quick Start Template';
    overviewSheet.getCell(4, 1).value = 'This file demonstrates the basic features of Modern Excel Ultimate.';

    // Style info
    overviewSheet.getCell(6, 1).value = 'Available Styles (18):';
    getAllStyleNames().forEach((name, i) => {
        const style = getStyle(name);
        overviewSheet.getCell(7 + i, 1).value = `${style.name} (${style.nameCN})`;
    });

    // Sample data sheet
    gen.createSheet('Sample Data');
    gen.dataTable({
        title: 'Sample Data Table',
        headers: ['ID', 'Name', 'Value', 'Status'],
        data: [
            [1, 'Item A', 100, 'Active'],
            [2, 'Item B', 200, 'Pending'],
            [3, 'Item C', 150, 'Complete'],
        ]
    });

    const filePath = path.join(outputDir, 'quick-start.xlsx');
    await gen.save(filePath);

    console.log(`Generated quick-start template: ${filePath}`);
    return filePath;
}

// ==========================================
// CLI Interface
// ==========================================

async function main() {
    const args = process.argv.slice(2);
    const outputDir = args[0] || path.join(__dirname, '../output/templates');

    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
Modern Excel Template Generator v7.0

Usage:
  node generate-all-templates.js [outputDir] [options]

Options:
  --all           Generate all 18 style templates
  --category      Generate templates organized by category
  --quick         Generate quick-start template only
  --styles=list   Generate specific styles (comma-separated)
  --help          Show this help message

Examples:
  node generate-all-templates.js ./output --all
  node generate-all-templates.js ./output --styles=academic,finance,tech
  node generate-all-templates.js ./output --category
`);
        return;
    }

    if (args.includes('--quick')) {
        await generateQuickStartTemplate(outputDir);
        return;
    }

    if (args.includes('--category')) {
        await generateCategoryTemplates(outputDir);
        return;
    }

    // Parse styles argument
    let styles = null;
    const stylesArg = args.find(a => a.startsWith('--styles='));
    if (stylesArg) {
        styles = stylesArg.replace('--styles=', '').split(',');
    }

    await generateAllStyleTemplates(outputDir, { styles });
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    generateStyleTemplate,
    generateAllStyleTemplates,
    generateCategoryTemplates,
    generateQuickStartTemplate,
    SAMPLE_DATA
};