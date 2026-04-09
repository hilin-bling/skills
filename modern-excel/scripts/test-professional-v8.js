/**
 * Modern Excel v8.0 - Test Script
 *
 * Generate sample Excel files to verify professional styling
 */

const path = require('path');
const fs = require('fs');
const { ModernExcelUltimate, getStyle, getAllStyleNames } = require('./modern-excel-ultimate');
const { STYLE_LIBRARY } = require('./style-library');

// Output directory
const OUTPUT_DIR = path.join(__dirname, '../output/test-v8');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Sample data for testing
const SAMPLE_DATA = {
    products: [
        ['Product A', 12500, 45, 0.35],
        ['Product B', 8900, 32, 0.25],
        ['Product C', 15600, 58, 0.40],
        ['Product D', 6200, 22, 0.15],
        ['Product E', 21000, 75, 0.55],
    ],
    financial: [
        ['Q1 2024', 120000, 80000],
        ['Q2 2024', 145000, 95000],
        ['Q3 2024', 168000, 110000],
        ['Q4 2024', 190000, 125000],
    ],
    budget: [
        ['Marketing', 50000, 45000],
        ['Engineering', 120000, 125000],
        ['Operations', 80000, 78000],
        ['Sales', 280000, 275000],
        ['HR', 45000, 42000],
    ],
    kpis: [
        { name: 'Total Revenue', value: '$6.23M', change: '+15.2%', status: 'up' },
        { name: 'Net Profit', value: '$1.82M', change: '+22.5%', status: 'up' },
        { name: 'Customer Count', value: '12,450', change: '+8.3%', status: 'up' },
        { name: 'Avg Order Value', value: '$142', change: '-3.2%', status: 'down' },
    ],
    timeline: [
        { phase: 'Planning', startDate: '2024-01-01', endDate: '2024-02-28', progress: 1.0 },
        { phase: 'Development', startDate: '2024-03-01', endDate: '2024-06-30', progress: 0.85 },
        { phase: 'Testing', startDate: '2024-07-01', endDate: '2024-08-31', progress: 0.45 },
        { phase: 'Deployment', startDate: '2024-09-01', endDate: '2024-10-15', progress: 0.0 },
    ],
    projects: [
        { name: 'Website Redesign', start: '2024-01-15', deadline: '2024-04-30', progress: 0.78, budget: 45000, spent: 38000 },
        { name: 'Mobile App', start: '2024-02-01', deadline: '2024-07-15', progress: 0.45, budget: 120000, spent: 55000 },
        { name: 'CRM Integration', start: '2024-03-01', deadline: '2024-05-31', progress: 0.92, budget: 35000, spent: 32500 },
    ]
};

// Test styles to generate (subset for quick verification)
const TEST_STYLES = [
    'corporateStandard',
    'academic',
    'finance',
    'tech',
    'minimal',
    'nature',
    'aurora',
    'glassmorphism'
];

async function generateComprehensiveTest(styleName) {
    const style = getStyle(styleName);
    console.log(`\nGenerating comprehensive test for: ${style.name} (${style.nameCN})`);

    const gen = new ModernExcelUltimate(styleName, {
        autoFit: true,
        freezeHeader: true,
        enableFilter: true,
        alternatingRows: true
    });

    // Sheet 1: Data Table
    gen.createSheet('Data Table');
    gen.dataTable({
        title: `${style.nameCN} - Product Sales Analysis`,
        headers: ['Product', 'Q1 Sales', 'Q2 Sales', 'Q3 Sales', 'Q4 Sales', 'Total', 'Growth'],
        data: SAMPLE_DATA.products.map(p => [p[0], p[1], p[1] * 1.1, p[1] * 1.2, p[1] * 1.3]),
        numberFormats: {
            'Q1 Sales': 'currency',
            'Q2 Sales': 'currency',
            'Q3 Sales': 'currency',
            'Q4 Sales': 'currency',
            'Total': 'currency',
            'Growth': 'percentage'
        },
        conditionalFormat: {
            'Total': 'color_scale_positive',
            'Growth': 'data_bar_positive'
        }
    });

    // Sheet 2: Financial Report
    gen.createSheet('Financial Report');
    gen.financialReport({
        title: `${style.nameCN} - Quarterly Financial Summary`,
        data: SAMPLE_DATA.financial
    });

    // Sheet 3: Budget Comparison
    gen.createSheet('Budget Comparison');
    gen.comparisonTable({
        title: `${style.nameCN} - Budget vs Actual Analysis`,
        data: SAMPLE_DATA.budget
    });

    // Sheet 4: Dashboard
    gen.createSheet('Dashboard');
    gen.dashboard({
        title: `${style.nameCN} - Key Performance Indicators`,
        metrics: SAMPLE_DATA.kpis
    });

    // Sheet 5: Timeline
    gen.createSheet('Timeline');
    gen.timeline({
        title: `${style.nameCN} - Project Timeline`,
        items: SAMPLE_DATA.timeline
    });

    // Sheet 6: Project Progress
    gen.createSheet('Projects');
    gen.projectProgress({
        title: `${style.nameCN} - Project Progress Tracking`,
        projects: SAMPLE_DATA.projects
    });

    // Sheet 7: Analysis Report
    gen.createSheet('Analysis Report');
    gen.analysisReport({
        title: `${style.nameCN} - Market Analysis Report`,
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
    });

    // Save the file
    const fileName = `test-${styleName}-comprehensive.xlsx`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    await gen.save(filePath);

    console.log(`  Saved: ${fileName}`);
    return { style: styleName, file: filePath };
}

async function generateStyleShowcase() {
    console.log('\n========================================');
    console.log('Modern Excel v8.0 Professional - Style Showcase');
    console.log('========================================');

    const results = [];

    for (const styleName of TEST_STYLES) {
        try {
            const result = await generateComprehensiveTest(styleName);
            results.push(result);
        } catch (error) {
            console.error(`Error generating ${styleName}:`, error.message);
        }
    }

    console.log('\n========================================');
    console.log(`Generated ${results.length} test files`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
    console.log('========================================');

    // Generate summary
    const summaryPath = path.join(OUTPUT_DIR, 'test-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

    return results;
}

// Generate a single quick demo
async function generateQuickDemo() {
    console.log('\nGenerating quick demo file...');

    const gen = new ModernExcelUltimate('corporateStandard');

    gen.dataTable({
        title: 'Professional Excel Demo v8.0',
        headers: ['Category', 'Q1', 'Q2', 'Q3', 'Q4', 'Total', 'Avg'],
        data: [
            ['Sales', 12500, 14200, 15600, 18500],
            ['Marketing', 8900, 9200, 10500, 11200],
            ['Operations', 15600, 16500, 17800, 19500],
        ],
        numberFormats: {
            'Q1': 'currency',
            'Q2': 'currency',
            'Q3': 'currency',
            'Q4': 'currency',
            'Total': 'currency',
            'Avg': 'currency'
        }
    });

    const filePath = path.join(OUTPUT_DIR, 'quick-demo.xlsx');
    await gen.save(filePath);

    console.log(`Saved: ${filePath}`);
    return filePath;
}

// Main execution
async function main() {
    console.log('Modern Excel Ultimate v8.0 - Professional Edition');
    console.log('=================================================\n');

    // Generate comprehensive tests for selected styles
    await generateStyleShowcase();

    // Generate quick demo
    await generateQuickDemo();

    console.log('\nAll tests completed successfully!');
    console.log(`Check output at: ${OUTPUT_DIR}`);
}

// Run tests
main().catch(console.error);