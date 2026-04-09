# Modern Skills Collection | 现代文档生成工具集

A professional document generation toolkit with 18 modern design styles, including PDF, PPT, Word, and Excel creation capabilities.

一套专业的文档生成工具集，包含 18 种现代化设计风格，支持 PDF、PPT、Word 和 Excel 文档生成。

---

## Overview | 概述

This collection includes four powerful document generation tools, all sharing a unified design system with 18 professional styles inspired by Dribbble and Behance top-tier design works.

本工具集包含四个强大的文档生成工具，共享统一的设计系统，提供 18 种专业风格，设计灵感源自 Dribbble 和 Behance 顶级设计作品。

| Skill | Description | 输出格式 |
|-------|-------------|----------|
| **modern-pdf** | Generate stunning PDF documents with gradients, glassmorphism, and modern layouts | PDF |
| **modern-ppt** | Create PowerPoint presentations with content-aware animations and modern asymmetric layouts | PPTX |
| **modern-word** | Build professional Word documents with 7-level typography hierarchy | DOCX |
| **modern-excel** | Design modern Excel spreadsheets with conditional formatting and embedded charts | XLSX |

---

## 18 Professional Styles | 18 种专业风格

All skills share the same design system with 18 carefully crafted styles:

所有技能共享同一设计系统，包含 18 种精心设计的风格：

| Style | Characteristics | Use Cases |
|-------|-----------------|-----------|
| **Aurora 极光** | Northern lights inspired, dreamy gradient colors | Creative showcases, design proposals |
| **Cyberpunk 赛博朋克** | Neon effects, dark tech aesthetic | Gaming releases, tech events |
| **Glassmorphism 玻璃态** | Modern glass-morphism design, translucent feel | Tech companies, modern brands |
| **Monochrome 单色大师** | Pure monochrome design, minimal elegance | Art portfolios, high-end brands |
| **Gradient Flow 渐变流** | Dynamic gradient backgrounds, fluid motion | Brand showcases, product releases |
| **Pastel 柔和梦境** | Soft macaron tones, warm romantic | Lifestyle brands, wedding planning |
| **Academic 学术蓝** | Professional blue, rigorous academic | Thesis defenses, research reports |
| **Business Elite 商务精英** | Professional corporate, efficient clean | Annual reports, quarterly summaries |
| **Tech Future 科技未来** | Cutting-edge innovation, futuristic | AI products, technical docs |
| **Minimalist 极简主义** | Simple pure, whitespace-focused | Design portfolios, minimal reports |
| **Natural Green 自然绿意** | Fresh nature, eco-friendly | Environmental data, health reports |
| **Retro 复古怀旧** | Warm nostalgic, vintage classic | Historical data, anniversary reports |
| **Vibrant 活力橙黄** | Energetic orange-yellow, dynamic | Fitness tracking, youth analytics |
| **Healthcare 医疗健康** | Professional medical, trustworthy | Medical reports, health dashboards |
| **Finance 金融财经** | Steady professional, financial | Financial statements, investment analysis |
| **Chinese Style 中国风** | Traditional elegant, Chinese aesthetics | Traditional culture, Chinese brands |
| **Creative 创意艺术** | Artistic creative, expressive | Creative industry, art analytics |
| **Corporate 企业标准** | Standard corporate, reliable | Standard reports, enterprise data |

---

## Features | 特性

### Shared Design System | 共享设计系统

- **Typography System**: 7-level hierarchy (Display 96pt → Small 12pt)
- **字体排版系统**: 7 级字号体系 (展示级 96pt → 小字 12pt)
- **Font Pairing**: 7 professional font combinations
- **字体配对**: 7 种专业字体组合
- **Color Intelligence**: Smart color matching for each style
- **智能配色**: 每种风格的智能配色系统
- **Layout Engine**: Modern asymmetric layouts with proper whitespace
- **布局引擎**: 现代化非对称布局，合理留白

### Modern PDF Features | PDF 功能

- Vector gradient backgrounds (linear, radial, mesh)
- 矢量渐变背景 (线性、径向、Mesh 渐变)
- Glassmorphism effects with blur
- 玻璃态模糊效果
- Multi-column layouts
- 多栏布局
- Data visualization components
- 数据可视化组件
- 40+ page types for various scenarios
- 40+ 种页面类型适配各种场景

### Modern PPT Features | PPT 功能

- Content-aware animation engine
- 内容感知动画引擎
- 50+ page types with unique layouts
- 50+ 种页面类型独特布局
- Automatic transition effects
- 自动切换动画效果
- Element-level enter animations
- 元素级进入动画
- 100+ design templates
- 100+ 设计模板

### Modern Word Features | Word 功能

- Automatic table of contents generation
- 自动生成目录
- Smart style detection
- 智能风格检测
- Table styles with modern formatting
- 现代化表格样式
- Image and text layouts
- 图文混排布局
- Header/footer support
- 页眉页脚支持

### Modern Excel Features | Excel 功能

- Conditional formatting (color scales, data bars, icon sets)
- 条件格式 (颜色刻度、数据条、图标集)
- Embedded charts (column, line, pie, bar, area)
- 嵌入式图表 (柱状图、折线图、饼图、条形图、面积图)
- Formula templates library
- 公式模板库
- Data validation rules
- 数据验证规则
- Auto-fit columns
- 自动列宽调整

---

## Quick Start | 快速开始

### Install Dependencies | 安装依赖

```bash
# For modern-pdf
cd modern-pdf
npm install pdfkit

# For modern-ppt
cd modern-ppt
npm install officegen

# For modern-word
cd modern-word
npm install docx

# For modern-excel
cd modern-excel
pip install openpyxl xlsxwriter
# or / 或
npm install exceljs
```

### Basic Usage | 基本用法

```javascript
// PDF Example
const { ModernPDFUltimate } = require('./modern-pdf/scripts/modern-pdf-ultimate');
const gen = new ModernPDFUltimate('academic');
gen.cover('Report Title', 'Author Name', 'Organization');
gen.save('report.pdf');

// PPT Example
const { ModernPPTUltimate } = require('./modern-ppt/scripts/modern-ppt-ultimate');
const gen = new ModernPPTUltimate('tech');
await gen.cover('Product Launch', 'Presenter', 'Date');
await gen.save('presentation.pptx');

// Word Example
const { ModernWordUltimate } = require('./modern-word/scripts/modern-word-ultimate');
const doc = new ModernWordUltimate('business');
doc.cover('Document Title', 'Author', 'Date');
doc.save('document.docx');

// Excel Example (Python)
from modern_excel_ultimate import ModernExcelUltimate
gen = ModernExcelUltimate('finance')
gen.data_table('Financial Data', ['Q1', 'Q2', 'Q3', 'Q4'], [...])
gen.save('report.xlsx')
```

---

## File Structure | 文件结构

```
skills/
├── README.md                 # This file / 本文件
├── modern-pdf/
│   ├── SKILL.md              # Skill documentation / 技能文档
│   ├── INSTALL.md            # Installation guide / 安装指南
│   └── scripts/              # Generation scripts / 生成脚本
├── modern-ppt/
│   ├── SKILL.md
│   └── scripts/
├── modern-word/
│   ├── SKILL.md
│   └── scripts/
└── modern-excel/
    ├── SKILL.md
    └── scripts/
```

---

## License | 许可证

MIT License

---

## Credits | 致谢

These skills are part of the Claude Studio project, designed to provide professional document generation capabilities with modern design aesthetics.

这些技能是 Claude Studio 项目的一部分，旨在提供具有现代设计美学的专业文档生成能力。

---

**Version | 版本**: 1.0.0
**Last Updated | 最后更新**: 2026-04-09
**Source | 来源**: Claude Studio
