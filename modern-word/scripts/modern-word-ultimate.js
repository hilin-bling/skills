/**
 * Modern Word Generator Ultimate - 终极版 v8.0
 *
 * 生成高质量、现代化的 Word 文档
 * 达到 Dribbble 顶级设计水准
 * 支持 18 种精心设计的风格
 * 支持 40+ 种内容类型模板
 *
 * 基于 docx 库（v8.5.0）
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, BorderStyle, PageOrientation,
        Header, Footer, NumberFormat, LevelFormat,
        WidthType, VerticalAlign, ShadingType,
        convertInchesToTwip, ImageRun, TextWrappingType,
        PageNumber, PageNumberType } = require('docx');
const fs = require('fs');
const path = require('path');

const {
    STYLE_LIBRARY,
    getStyle,
    getFontPairing,
    validateColor,
    getPageMargins,
    getPageSize,
    MODERN_LAYOUT_BASE,
    recommendStyle,
    getDecorationConfig,
    getTableConfig,
    getCardConfig,
    getStatsConfig,
    getCoverConfig
} = require('./style-library');

// ==========================================
// 现代Word文档生成器类 - Dribbble 设计水准
// ==========================================
class ModernWordUltimate {
    constructor(styleName = 'academic', options = {}) {
        this.style = getStyle(styleName);
        this.styleName = styleName;
        this.options = options;

        // 字体配对
        this.fonts = getFontPairing(this.style.typography.fontPairing);

        // 页面设置
        this.pageMargins = getPageMargins(this.style.page.margins);
        this.pageSize = getPageSize(this.style.page.size);

        // 文档内容收集
        this.sections = [];
        this.children = [];
        this.tocEntries = [];
        this.pageNumber = 0;

        // 标题层级计数
        this.headingCounters = { 1: 0, 2: 0, 3: 0 };

        // 创建文档
        this._initDocument();
    }

    // ==========================================
    // 初始化文档
    // ==========================================
    _initDocument() {
        const styles = this._createStyles();

        this.doc = new Document({
            styles: styles,
            sections: [{
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(this.pageMargins.top),
                            bottom: convertInchesToTwip(this.pageMargins.bottom),
                            left: convertInchesToTwip(this.pageMargins.left),
                            right: convertInchesToTwip(this.pageMargins.right)
                        },
                        size: {
                            width: convertInchesToTwip(this.pageSize.width),
                            height: convertInchesToTwip(this.pageSize.height)
                        }
                    }
                },
                headers: this._createHeader(),
                footers: this._createFooter(),
                children: this.children
            }]
        });
    }

    // ==========================================
    // 创建文档样式 - Dribbble 设计标准
    // ==========================================
    _createStyles() {
        const heroTitleStyle = this.style.typography.heroTitleStyle || {};
        const titleStyle = this.style.typography.titleStyle || {};
        const headingStyle = this.style.typography.headingStyle || {};
        const bodyStyle = this.style.typography.bodyStyle || {};
        const captionStyle = this.style.typography.captionStyle || {};

        return {
            default: {
                document: {
                    run: {
                        font: this.fonts.chinese,
                        size: bodyStyle.size * 2 || 24,
                        color: validateColor(bodyStyle.color || this.style.colors.text)
                    },
                    paragraph: {
                        spacing: {
                            line: 360, // 1.5倍行距（中文优化）
                            after: 120
                        }
                    }
                }
            },
            paragraphStyles: [
                // Hero Title - 封面主标题
                {
                    id: 'HeroTitle',
                    name: 'Hero Title',
                    basedOn: 'Normal',
                    next: 'Normal',
                    run: {
                        font: this.fonts.primary,
                        size: (heroTitleStyle.size || 48) * 2,
                        bold: heroTitleStyle.bold !== false,
                        color: validateColor(heroTitleStyle.color || this.style.colors.primary)
                    },
                    paragraph: {
                        spacing: { before: 0, after: 200 },
                        alignment: AlignmentType.CENTER
                    }
                },
                // Title - 标题
                {
                    id: 'Title',
                    name: 'Title',
                    basedOn: 'Normal',
                    next: 'Normal',
                    run: {
                        font: this.fonts.primary,
                        size: (titleStyle.size || 36) * 2,
                        bold: titleStyle.bold !== false,
                        color: validateColor(titleStyle.color || this.style.colors.primary)
                    },
                    paragraph: {
                        spacing: { before: 240, after: 240 },
                        alignment: AlignmentType.CENTER
                    }
                },
                // Heading 1 - 一级标题
                {
                    id: 'Heading1',
                    name: 'Heading 1',
                    basedOn: 'Normal',
                    next: 'Normal',
                    run: {
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 28 * 2,
                        bold: true,
                        color: validateColor(headingStyle.color || this.style.colors.primary)
                    },
                    paragraph: {
                        spacing: { before: 360, after: 200 },
                        outlineLevel: 0
                    }
                },
                // Heading 2 - 二级标题
                {
                    id: 'Heading2',
                    name: 'Heading 2',
                    basedOn: 'Normal',
                    next: 'Normal',
                    run: {
                        font: this.fonts.chineseTitle || this.fonts.secondary,
                        size: 22 * 2,
                        bold: true,
                        color: validateColor(this.style.colors.secondary)
                    },
                    paragraph: {
                        spacing: { before: 280, after: 160 },
                        outlineLevel: 1
                    }
                },
                // Heading 3 - 三级标题
                {
                    id: 'Heading3',
                    name: 'Heading 3',
                    basedOn: 'Normal',
                    next: 'Normal',
                    run: {
                        font: this.fonts.chineseTitle || this.fonts.secondary,
                        size: 18 * 2,
                        bold: true,
                        color: validateColor(this.style.colors.text)
                    },
                    paragraph: {
                        spacing: { before: 200, after: 120 },
                        outlineLevel: 2
                    }
                },
                // Quote - 引用
                {
                    id: 'Quote',
                    name: 'Quote',
                    basedOn: 'Normal',
                    run: {
                        font: this.fonts.primary,
                        size: 14 * 2,
                        italics: true,
                        color: validateColor(this.style.colors.textMuted)
                    },
                    paragraph: {
                        spacing: { line: 360, before: 200, after: 200 },
                        indent: { left: convertInchesToTwip(0.5) }
                    }
                },
                // Caption - 说明文字
                {
                    id: 'Caption',
                    name: 'Caption',
                    basedOn: 'Normal',
                    run: {
                        font: this.fonts.secondary,
                        size: (captionStyle.size || 10) * 2,
                        color: validateColor(captionStyle.color || this.style.colors.textMuted)
                    },
                    paragraph: {
                        spacing: { before: 100, after: 100 },
                        alignment: AlignmentType.CENTER
                    }
                },
                // Stats Value - 数据统计大数字
                {
                    id: 'StatsValue',
                    name: 'Stats Value',
                    basedOn: 'Normal',
                    run: {
                        font: this.fonts.primary,
                        size: 28 * 2,
                        bold: true,
                        color: validateColor(this.style.colors.primary)
                    },
                    paragraph: {
                        alignment: AlignmentType.CENTER
                    }
                },
                // Stats Label - 数据标签
                {
                    id: 'StatsLabel',
                    name: 'Stats Label',
                    basedOn: 'Normal',
                    run: {
                        font: this.fonts.secondary,
                        size: 10 * 2,
                        color: validateColor(this.style.colors.textMuted)
                    },
                    paragraph: {
                        alignment: AlignmentType.CENTER
                    }
                }
            ]
        };
    }

    // ==========================================
    // 创建页眉 - Dribbble 设计标准
    // ==========================================
    _createHeader() {
        if (this.options.noHeader) return {};

        const decorConfig = getDecorationConfig(this.style);
        const headerText = this.options.headerText || '';

        return {
            default: new Header({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                            new TextRun({
                                text: headerText,
                                font: this.fonts.secondary,
                                size: 20,
                                color: validateColor(this.style.colors.textMuted)
                            })
                        ],
                        border: {
                            bottom: {
                                color: validateColor(this.style.colors.decorLine || this.style.colors.primary),
                                space: 1,
                                style: BorderStyle.SINGLE,
                                size: 8 // 2pt 装饰线
                            }
                        }
                    })
                ]
            })
        };
    }

    // ==========================================
    // 创建页脚 - Dribbble 设计标准
    // ==========================================
    _createFooter() {
        if (this.options.noFooter) return {};

        return {
            default: new Footer({
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: this.options.footerText || '',
                                font: this.fonts.secondary,
                                size: 20,
                                color: validateColor(this.style.colors.textMuted)
                            }),
                            new TextRun({
                                text: this.options.footerText ? ' · ' : '',
                                font: this.fonts.secondary,
                                size: 20,
                                color: validateColor(this.style.colors.textMuted)
                            }),
                            new TextRun({
                                children: [PageNumber.CURRENT],
                                font: this.fonts.secondary,
                                size: 20,
                                color: validateColor(this.style.colors.textMuted)
                            })
                        ],
                        border: {
                            top: {
                                color: validateColor(this.style.colors.cardBorder),
                                space: 1,
                                style: BorderStyle.SINGLE,
                                size: 4 // 0.5pt 细线
                            }
                        }
                    })
                ]
            })
        };
    }

    // ==========================================
    // 封面页 - Dribbble 设计标准
    // ==========================================
    cover(title, subtitle = '', author = '', institution = '', date = '') {
        const coverConfig = getCoverConfig(this.style);
        const decorConfig = getDecorationConfig(this.style);

        // 顶部空白区域
        this.children.push(
            new Paragraph({
                spacing: { before: convertInchesToTwip(coverConfig.titleOffsetY || 1.5), after: 0 },
                children: []
            })
        );

        // 装饰线条（标题上方）
        const decorLineLength = convertInchesToTwip(coverConfig.decorLineLength || 2.0);
        this.children.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 200 },
                border: {
                    bottom: {
                        color: validateColor(this.style.colors.decorLine || this.style.colors.primary),
                        space: 1,
                        style: BorderStyle.SINGLE,
                        size: Math.round((coverConfig.decorLineWidth || 2) * 4)
                    }
                },
                children: []
            })
        );

        // 大标题
        const heroStyle = this.style.typography.heroTitleStyle || {};
        this.children.push(
            new Paragraph({
                spacing: { before: 400, after: 200 },
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: title,
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: (heroStyle.size || 48) * 2,
                        bold: heroStyle.bold !== false,
                        color: validateColor(heroStyle.color || this.style.colors.primary)
                    })
                ]
            })
        );

        // 装饰线条（标题下方）
        this.children.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 200 },
                border: {
                    bottom: {
                        color: validateColor(this.style.colors.secondary),
                        space: 1,
                        style: BorderStyle.SINGLE,
                        size: 4
                    }
                },
                children: []
            })
        );

        // 副标题
        if (subtitle) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 300, after: convertInchesToTwip(coverConfig.authorOffsetY || 1.0) },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: subtitle,
                            font: this.fonts.secondary,
                            size: 24 * 2,
                            color: validateColor(this.style.colors.secondary)
                        })
                    ]
                })
            );
        }

        // 作者信息
        if (author) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 100 },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: author,
                            font: this.fonts.chinese,
                            size: 14 * 2,
                            color: validateColor(this.style.colors.text)
                        })
                    ]
                })
            );
        }

        // 机构
        if (institution) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 100, after: 100 },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: institution,
                            font: this.fonts.chinese,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.textMuted)
                        })
                    ]
                })
            );
        }

        // 日期
        if (date) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: convertInchesToTwip(2) },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: date,
                            font: this.fonts.chinese,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.textMuted)
                        })
                    ]
                })
            );
        }

        // 分页符
        this.children.push(
            new Paragraph({
                children: [],
                pageBreakBefore: true
            })
        );

        return this;
    }

    // ==========================================
    // 目录页
    // ==========================================
    toc() {
        this.children.push(
            new Paragraph({
                heading: HeadingLevel.HEADING_1,
                children: [
                    new TextRun({
                        text: '目录',
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 28 * 2,
                        bold: true,
                        color: validateColor(this.style.typography.headingStyle.color || this.style.colors.primary)
                    })
                ],
                spacing: { before: 200, after: 400 }
            })
        );

        // 目录说明
        this.children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: '请在Word中更新目录：右键点击此处 → 更新域 → 更新整个目录',
                        font: this.fonts.secondary,
                        size: 10 * 2,
                        color: validateColor(this.style.colors.textMuted),
                        italics: true
                    })
                ]
            })
        );

        // 分页符
        this.children.push(
            new Paragraph({
                children: [],
                pageBreakBefore: true
            })
        );

        return this;
    }

    // ==========================================
    // 章节标题（一级）- 带装饰线
    // ==========================================
    section(title, level = 1) {
        this.headingCounters[level]++;
        if (level === 1) {
            this.headingCounters[2] = 0;
            this.headingCounters[3] = 0;
        }

        const headingLevel = level === 1 ? HeadingLevel.HEADING_1 :
                              level === 2 ? HeadingLevel.HEADING_2 :
                              HeadingLevel.HEADING_3;

        const decorConfig = getDecorationConfig(this.style);

        if (level === 1) {
            // H1: 带底部装饰线
            const underlineConfig = decorConfig.h1Underline || {};
            const underlineColor = validateColor(underlineConfig.color || this.style.colors.primary);
            const underlineWidth = Math.round((underlineConfig.width || 1.5) * 4);

            this.children.push(
                new Paragraph({
                    heading: headingLevel,
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 28 * 2,
                            bold: true,
                            color: validateColor(this.style.typography.headingStyle.color || this.style.colors.primary)
                        })
                    ],
                    spacing: { before: 360, after: 100 },
                    border: {
                        bottom: {
                            color: underlineColor,
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: underlineWidth
                        }
                    }
                })
            );
        } else if (level === 2) {
            // H2: 带左侧色块装饰
            this.children.push(
                new Paragraph({
                    heading: headingLevel,
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.secondary,
                            size: 22 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.secondary)
                        })
                    ],
                    spacing: { before: 280, after: 160 }
                })
            );

            // 添加左侧色块装饰线
            const leftBlockConfig = decorConfig.h2LeftBlock || {};
            const blockColor = validateColor(leftBlockConfig.color || this.style.colors.primary);
            const blockWidth = Math.round((leftBlockConfig.width || 4) * 4);

            this.children.push(
                new Paragraph({
                    spacing: { before: 0, after: 100 },
                    border: {
                        left: {
                            color: blockColor,
                            space: 10,
                            style: BorderStyle.SINGLE,
                            size: blockWidth
                        }
                    },
                    indent: { left: convertInchesToTwip(0.15) },
                    children: []
                })
            );
        } else {
            // H3: 简洁下划线
            this.children.push(
                new Paragraph({
                    heading: headingLevel,
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.secondary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.text)
                        })
                    ],
                    spacing: { before: 200, after: 120 },
                    border: {
                        bottom: {
                            color: validateColor(this.style.colors.cardBorder),
                            space: 1,
                            style: BorderStyle.SINGLE,
                            size: 2
                        }
                    }
                })
            );
        }

        // 记录目录条目
        this.tocEntries.push({ title, level, page: this.pageNumber + 1 });

        return this;
    }

    // ==========================================
    // 小节标题
    // ==========================================
    subsection(title) {
        return this.section(title, 2);
    }

    // ==========================================
    // 正文段落 - 中文优化
    // ==========================================
    paragraph(text, options = {}) {
        const paraOptions = {
            spacing: {
                line: options.lineSpacing ? options.lineSpacing * 240 : 360, // 默认1.5倍行距
                after: options.spacingAfter || 120,
                before: options.spacingBefore || 60
            },
            alignment: options.alignment || AlignmentType.JUSTIFIED
        };

        // 首行缩进2字符（中文标准）
        if (options.indent !== false) {
            paraOptions.indent = { firstLine: convertInchesToTwip(0.35) };
        }

        this.children.push(
            new Paragraph({
                ...paraOptions,
                children: [
                    new TextRun({
                        text: text,
                        font: this.fonts.chinese,
                        size: this.style.typography.bodyStyle.size * 2 || 24,
                        color: validateColor(this.style.typography.bodyStyle.color || this.style.colors.text)
                    })
                ]
            })
        );

        return this;
    }

    // ==========================================
    // 信息卡片组 - Dribbble 设计标准
    // ==========================================
    infoCards(title, cards, options = {}) {
        // 卡片组标题
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        const cardsPerRow = options.cardsPerRow || 3;
        const rows = Math.ceil(cards.length / cardsPerRow);

        for (let r = 0; r < rows; r++) {
            const rowCells = [];
            for (let c = 0; c < cardsPerRow; c++) {
                const index = r * cardsPerRow + c;
                if (index < cards.length) {
                    const card = cards[index];
                    rowCells.push(
                        new TableCell({
                            width: { size: 100 / cardsPerRow, type: WidthType.PERCENTAGE },
                            shading: {
                                fill: validateColor(this.style.colors.cardBg),
                                type: ShadingType.CLEAR
                            },
                            borders: this._createCardBorders(),
                            margins: {
                                top: 100,
                                bottom: 100,
                                left: 120,
                                right: 120
                            },
                            children: [
                                // 卡片标题带装饰
                                new Paragraph({
                                    spacing: { before: 0, after: 80 },
                                    children: [
                                        new TextRun({
                                            text: card.icon ? `${card.icon} ` : '',
                                            font: this.fonts.primary,
                                            size: 14 * 2,
                                            color: validateColor(this.style.colors.primary)
                                        }),
                                        new TextRun({
                                            text: card.title || '',
                                            font: this.fonts.chineseTitle || this.fonts.primary,
                                            size: 14 * 2,
                                            bold: true,
                                            color: validateColor(this.style.colors.primary)
                                        })
                                    ]
                                }),
                                // 卡片描述
                                new Paragraph({
                                    spacing: { before: 0, after: 0 },
                                    children: [
                                        new TextRun({
                                            text: card.desc || '',
                                            font: this.fonts.chinese,
                                            size: 11 * 2,
                                            color: validateColor(this.style.colors.textMuted)
                                        })
                                    ]
                                })
                            ],
                            verticalAlign: VerticalAlign.CENTER
                        })
                    );
                } else {
                    rowCells.push(
                        new TableCell({
                            width: { size: 100 / cardsPerRow, type: WidthType.PERCENTAGE },
                            borders: this._createCardBorders(),
                            children: [new Paragraph({ children: [] })]
                        })
                    );
                }
            }

            this.children.push(
                new Table({
                    rows: [new TableRow({ children: rowCells })],
                    width: { size: 100, type: WidthType.PERCENTAGE }
                })
            );

            // 卡片间距
            if (r < rows - 1) {
                this.children.push(
                    new Paragraph({ spacing: { before: 100, after: 100 }, children: [] })
                );
            }
        }

        return this;
    }

    // ==========================================
    // 数据统计展示 - 大数字突出
    // ==========================================
    dataStats(title, stats, options = {}) {
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        // 创建表格
        const headerRow = new TableRow({
            children: stats.map(stat =>
                new TableCell({
                    width: { size: 100 / stats.length, type: WidthType.PERCENTAGE },
                    shading: {
                        fill: validateColor(this.style.table.headerBg),
                        type: ShadingType.CLEAR
                    },
                    borders: this._createTableBorders(),
                    margins: { top: 120, bottom: 120, left: 80, right: 80 },
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 0, after: 0 },
                            children: [
                                new TextRun({
                                    text: stat.label || '',
                                    font: this.fonts.chinese,
                                    size: 11 * 2,
                                    bold: true,
                                    color: validateColor(this.style.table.headerTextColor)
                                })
                            ]
                        })
                    ]
                })
            )
        });

        // 数据行 - 大数字突出显示
        const dataRow = new TableRow({
            children: stats.map(stat => {
                const isHighlight = stat.highlight;
                const bgColor = isHighlight ?
                    validateColor(this.style.colors.accent) :
                    validateColor(this.style.table.cellBg);

                return new TableCell({
                    width: { size: 100 / stats.length, type: WidthType.PERCENTAGE },
                    shading: {
                        fill: bgColor,
                        type: ShadingType.CLEAR
                    },
                    borders: this._createTableBorders(),
                    margins: { top: 200, bottom: 200, left: 80, right: 80 },
                    children: [
                        // 大数字
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 0, after: 60 },
                            children: [
                                new TextRun({
                                    text: stat.value || '',
                                    font: this.fonts.primary,
                                    size: 28 * 2,
                                    bold: true,
                                    color: isHighlight ? 'FFFFFF' : validateColor(this.style.colors.primary)
                                })
                            ]
                        }),
                        // 说明文字
                        stat.sublabel ? new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 0, after: 0 },
                            children: [
                                new TextRun({
                                    text: stat.sublabel,
                                    font: this.fonts.secondary,
                                    size: 10 * 2,
                                    color: isHighlight ? 'FFFFFF' : validateColor(this.style.colors.textMuted)
                                })
                            ]
                        }) : new Paragraph({ children: [] })
                    ]
                });
            })
        });

        this.children.push(
            new Table({
                rows: [headerRow, dataRow],
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        return this;
    }

    // ==========================================
    // 格式化表格 - Dribbble 设计标准
    // ==========================================
    table(title, data, options = {}) {
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 160 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 14 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        const headers = options.headers || Object.keys(data[0] || {});
        const styled = options.styled !== false;

        const tableRows = [];

        // 表头行
        const headerCells = headers.map(header =>
            new TableCell({
                width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
                shading: styled ? {
                    fill: validateColor(this.style.table.headerBg),
                    type: ShadingType.CLEAR
                } : undefined,
                borders: this._createTableBorders(),
                margins: { top: 100, bottom: 100, left: 80, right: 80 },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 0, after: 0 },
                        children: [
                            new TextRun({
                                text: header,
                                font: this.fonts.chineseTitle || this.fonts.primary,
                                size: 11 * 2,
                                bold: true,
                                color: styled ?
                                    validateColor(this.style.table.headerTextColor) :
                                    validateColor(this.style.colors.text)
                            })
                        ]
                    })
                ]
            })
        );
        tableRows.push(new TableRow({ children: headerCells }));

        // 数据行 - 隔行变色
        data.forEach((row, rowIndex) => {
            const rowCells = headers.map((header, colIndex) => {
                const value = row[header] || row[Object.keys(row)[colIndex]] || '';
                const isAlternate = styled && rowIndex % 2 === 1;
                const bgColor = isAlternate ?
                    validateColor(this.style.table.alternateRowColor || this.style.colors.cardBg) :
                    validateColor(this.style.table.cellBg);

                return new TableCell({
                    width: { size: 100 / headers.length, type: WidthType.PERCENTAGE },
                    shading: styled ? {
                        fill: bgColor,
                        type: ShadingType.CLEAR
                    } : undefined,
                    borders: this._createTableBorders(),
                    margins: { top: 80, bottom: 80, left: 80, right: 80 },
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: { before: 0, after: 0 },
                            children: [
                                new TextRun({
                                    text: String(value),
                                    font: this.fonts.chinese,
                                    size: 11 * 2,
                                    color: validateColor(this.style.colors.text)
                                })
                            ]
                        })
                    ]
                });
            });
            tableRows.push(new TableRow({ children: rowCells }));
        });

        this.children.push(
            new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        return this;
    }

    // ==========================================
    // 列表
    // ==========================================
    list(items, options = {}) {
        const ordered = options.ordered || false;

        items.forEach((item, index) => {
            this.children.push(
                new Paragraph({
                    spacing: { before: 60, after: 60 },
                    indent: { left: convertInchesToTwip(0.25) },
                    children: [
                        new TextRun({
                            text: ordered ? `${index + 1}. ` : '• ',
                            font: this.fonts.primary,
                            size: 12 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        }),
                        new TextRun({
                            text: item,
                            font: this.fonts.chinese,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.text)
                        })
                    ]
                })
            );
        });

        return this;
    }

    // ==========================================
    // 引用
    // ==========================================
    quote(text, author = '') {
        this.children.push(
            new Paragraph({
                spacing: { before: 300, after: 100 },
                indent: { left: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5) },
                alignment: AlignmentType.CENTER,
                border: {
                    left: {
                        color: validateColor(this.style.colors.primary),
                        space: 10,
                        style: BorderStyle.SINGLE,
                        size: 12
                    }
                },
                children: [
                    new TextRun({
                        text: `"${text}"`,
                        font: this.fonts.primary,
                        size: 16 * 2,
                        italics: true,
                        color: validateColor(this.style.colors.primary)
                    })
                ]
            })
        );

        if (author) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 100, after: 300 },
                    indent: { left: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5) },
                    alignment: AlignmentType.RIGHT,
                    children: [
                        new TextRun({
                            text: `— ${author}`,
                            font: this.fonts.secondary,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.textMuted)
                        })
                    ]
                })
            );
        }

        return this;
    }

    // ==========================================
    // 研究方法展示
    // ==========================================
    methodology(steps) {
        this.children.push(
            new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [
                    new TextRun({
                        text: '研究方法',
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 18 * 2,
                        bold: true,
                        color: validateColor(this.style.colors.primary)
                    })
                ]
            })
        );

        const tableRows = [];

        // 表头
        tableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 15, type: WidthType.PERCENTAGE },
                        shading: {
                            fill: validateColor(this.style.table.headerBg),
                            type: ShadingType.CLEAR
                        },
                        borders: this._createTableBorders(),
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: '步骤',
                                        font: this.fonts.chineseTitle || this.fonts.primary,
                                        size: 11 * 2,
                                        bold: true,
                                        color: 'FFFFFF'
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 30, type: WidthType.PERCENTAGE },
                        shading: {
                            fill: validateColor(this.style.table.headerBg),
                            type: ShadingType.CLEAR
                        },
                        borders: this._createTableBorders(),
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: '方法',
                                        font: this.fonts.chineseTitle || this.fonts.primary,
                                        size: 11 * 2,
                                        bold: true,
                                        color: 'FFFFFF'
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 55, type: WidthType.PERCENTAGE },
                        shading: {
                            fill: validateColor(this.style.table.headerBg),
                            type: ShadingType.CLEAR
                        },
                        borders: this._createTableBorders(),
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: '描述',
                                        font: this.fonts.chineseTitle || this.fonts.primary,
                                        size: 11 * 2,
                                        bold: true,
                                        color: 'FFFFFF'
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        );

        // 数据行
        steps.forEach((step, index) => {
            const isAlternate = index % 2 === 1;
            tableRows.push(
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 15, type: WidthType.PERCENTAGE },
                            shading: {
                                fill: validateColor(this.style.colors.highlight || this.style.colors.primary),
                                type: ShadingType.CLEAR
                            },
                            borders: this._createTableBorders(),
                            verticalAlign: VerticalAlign.CENTER,
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({
                                            text: String(index + 1),
                                            font: this.fonts.primary,
                                            size: 14 * 2,
                                            bold: true,
                                            color: 'FFFFFF'
                                        })
                                    ]
                                })
                            ]
                        }),
                        new TableCell({
                            width: { size: 30, type: WidthType.PERCENTAGE },
                            shading: {
                                fill: isAlternate ? validateColor(this.style.table.alternateRowColor || this.style.colors.cardBg) : undefined,
                                type: ShadingType.CLEAR
                            },
                            borders: this._createTableBorders(),
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: step.title || '',
                                            font: this.fonts.chineseTitle || this.fonts.primary,
                                            size: 11 * 2,
                                            bold: true,
                                            color: validateColor(this.style.colors.primary)
                                        })
                                    ]
                                })
                            ]
                        }),
                        new TableCell({
                            width: { size: 55, type: WidthType.PERCENTAGE },
                            shading: {
                                fill: isAlternate ? validateColor(this.style.table.alternateRowColor || this.style.colors.cardBg) : undefined,
                                type: ShadingType.CLEAR
                            },
                            borders: this._createTableBorders(),
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: step.desc || '',
                                            font: this.fonts.chinese,
                                            size: 11 * 2,
                                            color: validateColor(this.style.colors.text)
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            );
        });

        this.children.push(
            new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        return this;
    }

    // ==========================================
    // 结论与展望
    // ==========================================
    conclusion(conclusions, futureWorks = []) {
        this.children.push(
            new Paragraph({
                spacing: { before: 300, after: 150 },
                children: [
                    new TextRun({
                        text: '主要结论',
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 16 * 2,
                        bold: true,
                        color: validateColor(this.style.colors.primary)
                    })
                ]
            })
        );

        conclusions.forEach((item, index) => {
            this.children.push(
                new Paragraph({
                    spacing: { before: 60, after: 60 },
                    indent: { left: convertInchesToTwip(0.25) },
                    children: [
                        new TextRun({
                            text: `${index + 1}. `,
                            font: this.fonts.primary,
                            size: 12 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        }),
                        new TextRun({
                            text: item,
                            font: this.fonts.chinese,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.text)
                        })
                    ]
                })
            );
        });

        if (futureWorks.length > 0) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 300, after: 150 },
                    children: [
                        new TextRun({
                            text: '未来展望',
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 16 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.secondary)
                        })
                    ]
                })
            );

            futureWorks.forEach((item, index) => {
                this.children.push(
                    new Paragraph({
                        spacing: { before: 60, after: 60 },
                        indent: { left: convertInchesToTwip(0.25) },
                        children: [
                            new TextRun({
                                text: '• ',
                                font: this.fonts.primary,
                                size: 12 * 2,
                                bold: true,
                                color: validateColor(this.style.colors.secondary)
                            }),
                            new TextRun({
                                text: item,
                                font: this.fonts.chinese,
                                size: 12 * 2,
                                color: validateColor(this.style.colors.text)
                            })
                        ]
                    })
                );
            });
        }

        return this;
    }

    // ==========================================
    // 两栏布局
    // ==========================================
    twoColumn(title, leftContent, rightContent, options = {}) {
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        const leftTitle = options.leftTitle || '';
        const rightTitle = options.rightTitle || '';

        if (leftTitle || rightTitle) {
            this.children.push(
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    shading: {
                                        fill: validateColor(this.style.colors.primary),
                                        type: ShadingType.CLEAR
                                    },
                                    borders: this._createTableBorders(),
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: leftTitle,
                                                    font: this.fonts.chineseTitle || this.fonts.primary,
                                                    size: 14 * 2,
                                                    bold: true,
                                                    color: 'FFFFFF'
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: { size: 50, type: WidthType.PERCENTAGE },
                                    shading: {
                                        fill: validateColor(this.style.colors.secondary),
                                        type: ShadingType.CLEAR
                                    },
                                    borders: this._createTableBorders(),
                                    children: [
                                        new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: rightTitle,
                                                    font: this.fonts.chineseTitle || this.fonts.primary,
                                                    size: 14 * 2,
                                                    bold: true,
                                                    color: 'FFFFFF'
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ],
                    width: { size: 100, type: WidthType.PERCENTAGE }
                })
            );
        }

        this.children.push(
            new Table({
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: this._createTableBorders(),
                                children: leftContent.map(content =>
                                    new Paragraph({
                                        spacing: { before: 80, after: 80 },
                                        children: [
                                            new TextRun({
                                                text: content,
                                                font: this.fonts.chinese,
                                                size: 11 * 2,
                                                color: validateColor(this.style.colors.text)
                                            })
                                        ]
                                    })
                                )
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.PERCENTAGE },
                                borders: this._createTableBorders(),
                                children: rightContent.map(content =>
                                    new Paragraph({
                                        spacing: { before: 80, after: 80 },
                                        children: [
                                            new TextRun({
                                                text: content,
                                                font: this.fonts.chinese,
                                                size: 11 * 2,
                                                color: validateColor(this.style.colors.text)
                                            })
                                        ]
                                    })
                                )
                            })
                        ]
                    })
                ],
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        return this;
    }

    // ==========================================
    // 三栏布局
    // ==========================================
    threeColumn(title, columns, options = {}) {
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        const tableRows = [];

        if (options.headers) {
            tableRows.push(
                new TableRow({
                    children: options.headers.map(header =>
                        new TableCell({
                            width: { size: 33, type: WidthType.PERCENTAGE },
                            shading: {
                                fill: validateColor(this.style.table.headerBg),
                                type: ShadingType.CLEAR
                            },
                            borders: this._createTableBorders(),
                            children: [
                                new Paragraph({
                                    alignment: AlignmentType.CENTER,
                                    children: [
                                        new TextRun({
                                            text: header,
                                            font: this.fonts.chineseTitle || this.fonts.primary,
                                            size: 11 * 2,
                                            bold: true,
                                            color: 'FFFFFF'
                                        })
                                    ]
                                })
                            ]
                        })
                    )
                })
            );
        }

        tableRows.push(
            new TableRow({
                children: columns.map(column =>
                    new TableCell({
                        width: { size: 33, type: WidthType.PERCENTAGE },
                        borders: this._createTableBorders(),
                        children: column.map(content =>
                            new Paragraph({
                                spacing: { before: 80, after: 80 },
                                children: [
                                    new TextRun({
                                        text: content,
                                        font: this.fonts.chinese,
                                        size: 11 * 2,
                                        color: validateColor(this.style.colors.text)
                                    })
                                ]
                            })
                        )
                    })
                )
            })
        );

        this.children.push(
            new Table({
                rows: tableRows,
                width: { size: 100, type: WidthType.PERCENTAGE }
            })
        );

        return this;
    }

    // ==========================================
    // 时间线
    // ==========================================
    timeline(title, events) {
        if (title) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [
                        new TextRun({
                            text: title,
                            font: this.fonts.chineseTitle || this.fonts.primary,
                            size: 18 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );
        }

        events.forEach((event, index) => {
            this.children.push(
                new Paragraph({
                    spacing: { before: 150, after: 50 },
                    indent: { left: convertInchesToTwip(0.25) },
                    border: {
                        left: {
                            color: validateColor(this.style.colors.primary),
                            space: 10,
                            style: BorderStyle.SINGLE,
                            size: 8
                        }
                    },
                    children: [
                        new TextRun({
                            text: event.date || event.time || `${index + 1}`,
                            font: this.fonts.primary,
                            size: 14 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        })
                    ]
                })
            );

            if (event.title) {
                this.children.push(
                    new Paragraph({
                        spacing: { before: 50, after: 50 },
                        indent: { left: convertInchesToTwip(0.5) },
                        children: [
                            new TextRun({
                                text: event.title,
                                font: this.fonts.chineseTitle || this.fonts.primary,
                                size: 12 * 2,
                                bold: true,
                                color: validateColor(this.style.colors.text)
                            })
                        ]
                    })
                );
            }

            if (event.desc || event.description) {
                this.children.push(
                    new Paragraph({
                        spacing: { before: 50, after: 150 },
                        indent: { left: convertInchesToTwip(0.5) },
                        children: [
                            new TextRun({
                                text: event.desc || event.description,
                                font: this.fonts.chinese,
                                size: 11 * 2,
                                color: validateColor(this.style.colors.textMuted)
                            })
                        ]
                    })
                );
            }
        });

        return this;
    }

    // ==========================================
    // 参考文献
    // ==========================================
    references(items) {
        this.children.push(
            new Paragraph({
                spacing: { before: 400, after: 200 },
                heading: HeadingLevel.HEADING_1,
                children: [
                    new TextRun({
                        text: '参考文献',
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 28 * 2,
                        bold: true,
                        color: validateColor(this.style.typography.headingStyle.color || this.style.colors.primary)
                    })
                ]
            })
        );

        items.forEach((item, index) => {
            this.children.push(
                new Paragraph({
                    spacing: { before: 60, after: 60 },
                    indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.25) },
                    children: [
                        new TextRun({
                            text: `[${index + 1}] `,
                            font: this.fonts.primary,
                            size: 11 * 2,
                            bold: true,
                            color: validateColor(this.style.colors.primary)
                        }),
                        new TextRun({
                            text: item,
                            font: this.fonts.chinese,
                            size: 11 * 2,
                            color: validateColor(this.style.colors.text)
                        })
                    ]
                })
            );
        });

        return this;
    }

    // ==========================================
    // 结尾页
    // ==========================================
    end(title = '谢谢阅读', subtitle = '', contact = '') {
        this.children.push(
            new Paragraph({
                children: [],
                pageBreakBefore: true
            })
        );

        this.children.push(
            new Paragraph({
                spacing: { before: convertInchesToTwip(3), after: convertInchesToTwip(0.5) },
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: title,
                        font: this.fonts.chineseTitle || this.fonts.primary,
                        size: 36 * 2,
                        bold: true,
                        color: validateColor(this.style.typography.titleStyle.color || this.style.colors.primary)
                    })
                ]
            })
        );

        if (subtitle) {
            this.children.push(
                new Paragraph({
                    spacing: { before: 200, after: 400 },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: subtitle,
                            font: this.fonts.secondary,
                            size: 16 * 2,
                            color: validateColor(this.style.colors.textMuted)
                        })
                    ]
                })
            );
        }

        if (contact) {
            this.children.push(
                new Paragraph({
                    spacing: { before: convertInchesToTwip(1), after: 200 },
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: contact,
                            font: this.fonts.chinese,
                            size: 12 * 2,
                            color: validateColor(this.style.colors.textMuted)
                        })
                    ]
                })
            );
        }

        return this;
    }

    // ==========================================
    // 创建表格边框
    // ==========================================
    _createTableBorders() {
        const borderColor = validateColor(this.style.table.cellBorderColor);
        return {
            top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            left: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            right: { style: BorderStyle.SINGLE, size: 1, color: borderColor }
        };
    }

    // ==========================================
    // 创建卡片边框
    // ==========================================
    _createCardBorders() {
        const borderColor = validateColor(this.style.colors.cardBorder);
        return {
            top: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            left: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
            right: { style: BorderStyle.SINGLE, size: 1, color: borderColor }
        };
    }

    // ==========================================
    // 保存文档
    // ==========================================
    async save(filePath) {
        this._initDocument();
        const buffer = await Packer.toBuffer(this.doc);
        fs.writeFileSync(filePath, buffer);
        console.log(`文档已保存: ${filePath}`);
        return filePath;
    }

    // ==========================================
    // 获取文档buffer
    // ==========================================
    async getBuffer() {
        this._initDocument();
        return await Packer.toBuffer(this.doc);
    }
}

// ==========================================
// 批量生成所有风格模板
// ==========================================
async function generateAllTemplates(outputDir) {
    const styles = Object.keys(STYLE_LIBRARY);
    const results = [];

    for (const styleName of styles) {
        const style = STYLE_LIBRARY[styleName];
        const doc = new ModernWordUltimate(styleName);

        doc.cover(
            `${style.name}风格示例文档`,
            `Modern Word v8.0 - ${style.nameEn}`,
            `作者：Claude`,
            `Modern Word Creator`,
            new Date().toLocaleDateString('zh-CN')
        );

        doc.toc();

        doc.section('第一章 风格概述', 1);
        doc.paragraph(`${style.description}。本风格适用于${style.useCases.join('、')}等场景。`, { indent: true });
        doc.infoCards('风格特点', [
            { title: '配色方案', desc: `主色调：#${style.colors.primary}` },
            { title: '字体风格', desc: `${style.typography.fontPairing} 字体配对` },
            { title: '适用场景', desc: `${style.useCases.slice(0, 3).join('、')}` }
        ]);

        doc.section('第二章 内容展示', 1);
        doc.subsection('2.1 数据统计');
        doc.dataStats('示例数据', [
            { value: '96.5%', label: '准确率', highlight: true },
            { value: '0.89', label: 'F1分数' },
            { value: '100ms', label: '响应时间' }
        ]);

        doc.subsection('2.2 方法对比');
        doc.table('方法对比表格', [
            { method: 'Method A', accuracy: '92.1%', time: '150ms' },
            { method: 'Method B', accuracy: '94.3%', time: '120ms' },
            { method: 'Our Method', accuracy: '96.5%', time: '100ms' }
        ], { headers: ['方法', '准确率', '时间'] });

        doc.section('第三章 结论', 1);
        doc.quote('创新是引领发展的第一动力', '习近平');
        doc.conclusion(
            ['展示了完整的文档生成流程', '验证了风格系统的有效性'],
            ['继续优化排版效果', '扩展更多内容类型']
        );

        doc.end('谢谢阅读', '如有疑问请联系', 'support@example.com');

        const fileName = `${styleName}-sample.docx`;
        const filePath = path.join(outputDir, fileName);
        await doc.save(filePath);
        results.push({ styleName, filePath });
    }

    console.log(`\n已生成 ${results.length} 个风格模板文档`);
    return results;
}

// ==========================================
// 导出
// ==========================================
module.exports = {
    ModernWordUltimate,
    generateAllTemplates,
    STYLE_LIBRARY,
    recommendStyle,
    getStyle
};