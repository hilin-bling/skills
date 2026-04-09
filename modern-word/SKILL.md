---
name: modern-word
description: "Create stunning Word documents with 18 professional styles (including Aurora, Cyberpunk, Glassmorphism), each with unique typography, layouts, and formatting. Features include: modern typography system with 7-level hierarchy, 40+ document templates, smart style detection, table styles, image layouts, headers/footers, table of contents, and page numbering. v7.0 Ultimate Edition - 对标 Dribbble/Behance 顶级设计作品。"
---

# Modern Word Creator Ultimate v7.0

生成高质量、现代化的 Word 文档，支持 18 种精心设计的风格，每种风格都有独特的排版、布局和格式设置。**全网最强 DOCX 生成技能 - 对标 Dribbble/Behance 顶级设计作品。**

## v7.0 终极升级 - 美学巅峰

### 18 种专业风格

| 风格 | 特点 | 适用场景 |
|------|------|---------|
| **极光 Aurora** | 北欧极光灵感，梦幻渐变色彩 | 创意展示、设计提案 |
| **赛博朋克 Cyberpunk** | 霓虹灯效果，暗色科技感 | 游戏发布、科技活动 |
| **玻璃态 Glassmorphism** | 现代玻璃拟态设计，通透质感 | 科技公司、现代品牌 |
| **单色大师 Monochrome** | 纯粹单色设计，极简高雅 | 艺术展示、高端品牌 |
| **渐变流 Gradient Flow** | 动态渐变背景，流动感 | 品牌展示、产品发布 |
| **柔和梦境 Pastel** | 柔和马卡龙色调，温馨浪漫 | 女性品牌、婚礼策划 |
| **学术蓝 Academic** | 专业严谨，学术报告首选 | 论文答辩、研究报告 |
| **商务精英 Business Elite** | 专业干练，商务汇报必备 | 年终总结、季度报告 |
| **科技未来 Tech Future** | 前沿创新，科技产品专属 | AI 产品、创新项目 |
| **极简主义 Minimalist** | 简洁纯粹，设计展示佳选 | 作品集、艺术汇报 |
| **自然绿意 Natural Green** | 清新自然，环保健康主题 | 环保项目、健康报告 |
| **复古怀旧 Retro** | 温暖怀旧，历史回顾经典 | 周年纪念、传统文化 |
| **活力橙黄 Vibrant** | 充满能量，运动健身首选 | 活力活动、年轻群体 |
| **医疗健康 Healthcare** | 专业可信，医疗报告必备 | 医院汇报、健康科普 |
| **金融财经 Finance** | 稳重专业，财务报告首选 | 投资分析、银行业务 |
| **中国风 Chinese Style** | 传统典雅，国风主题专属 | 传统文化、中式设计 |
| **创意艺术 Creative** | 大胆创新，创意展示佳选 | 艺术提案、创意项目 |
| **企业标准 Corporate** | 专业规范，企业文档首选 | 合同报告、企业文档 |

### 字体排版系统

**7 级字号体系**:
- Display (48pt) - 展示级标题
- Hero Title (36pt) - 文档主标题
- Page Title (28pt) - 章节标题
- Section Title (22pt) - 小节标题
- Heading (18pt) - 段落标题
- Body (12pt) - 正文
- Caption (10pt) - 说明文字

**7 种字体配对**:
- Classic Professional - 衬线 + 无衬线（Times New Roman + Arial）
- Modern Editorial - 展示 + 正文（Calibri + Cambria）
- Minimal Clean - 纯无衬线（Arial + Helvetica）
- Chinese English Mixed - 中英混排优化（微软雅黑 + Arial）
- Tech Sans - 科技无衬线（Segoe UI + Consolas）
- Elegant Serif - 优雅衬线（Georgia + Garamond）
- Corporate Standard - 企业标准（Arial + Times）

### 内容类型模板

| 类型 | 说明 | 包含元素 |
|------|------|---------|
| **封面页 Cover** | 文档封面 | 标题、副标题、作者、日期、机构 |
| **目录页 TOC** | 自动目录 | 3级标题目录、页码 |
| **正文页 Content** | 基础正文 | 标题、段落、列表 |
| **表格页 Table** | 数据表格 | 格式化表格、表头样式 |
| **图文混排 ImageText** | 图文组合 | 图片、说明文字、布局 |
| **引用页 Quote** | 名言引用 | 大字号引用、来源标注 |
| **列表页 List** | 项目列表 | 编号列表、项目符号 |
| **两栏布局 TwoColumn** | 对比布局 | 左右两栏内容 |
| **三栏布局 ThreeColumn** | 多项展示 | 三栏并列内容 |
| **结尾页 End** | 文档结尾 | 感谢语、联系方式、署名 |

### 智能样式检测

根据内容类型自动推荐最适合的风格：

```javascript
const { recommendStyle } = require('./scripts/style-library');

// 自动推荐
recommendStyle('论文'); // → 'academic'
recommendStyle('年终总结'); // → 'corporate'
recommendStyle('科技'); // → 'tech'
recommendStyle('创意'); // → 'aurora'
```

## 快速开始

```javascript
const { ModernWordUltimate } = require('./scripts/modern-word-ultimate');

// 创建指定风格的生成器
const doc = new ModernWordUltimate('academic');

// 封面页
doc.cover('论文标题', '作者：张三', '指导教师：李教授', '2024年6月');

// 目录页（自动生成）
doc.toc();

// 章节标题
doc.section('第一章 研究背景', 1);

// 正文内容
doc.paragraph('研究背景部分的内容...', {
    style: 'body',
    indent: true
});

// 信息卡片
doc.infoCards('研究意义', [
    { title: '理论意义', desc: '填补研究空白' },
    { title: '应用价值', desc: '解决实际问题' },
    { title: '创新点', desc: '方法创新' }
]);

// 表格
doc.table('方法对比', [
    { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M' },
    { method: 'Ours', accuracy: '96.5%', params: '32M' }
], {
    headers: ['方法', '准确率', '参数量'],
    styled: true
});

// 数据统计
doc.dataStats('实验结果', [
    { value: '96.5%', label: '准确率' },
    { value: '0.89', label: 'F1分数' }
]);

// 引用页
doc.quote('创新是引领发展的第一动力', '习近平');

// 结尾页
doc.end('谢谢阅读', '联系邮箱：email@example.com');

// 保存文档
doc.save('thesis-defense.docx');
```

## 完整示例：学术报告

```javascript
const { ModernWordUltimate } = require('./scripts/modern-word-ultimate');

const doc = new ModernWordUltimate('academic');

// 封面
doc.cover('基于深度学习的图像识别研究', '答辩人：张三', '导师：李教授', '计算机科学与技术学院');

// 目录
doc.toc();

// 第一章
doc.section('第一章 研究背景与意义', 1);
doc.paragraph('随着人工智能技术的快速发展...');
doc.infoCards('研究意义', [
    { title: '理论意义', desc: '填补研究空白，拓展学术边界' },
    { title: '应用价值', desc: '解决实际问题，推动产业升级' },
    { title: '创新点', desc: '方法创新，提升识别精度' }
]);

// 第二章
doc.section('第二章 文献综述', 1);
doc.subsection('2.1 深度学习发展历程', 2);
doc.paragraph('深度学习起源于...');
doc.quote('深度学习是机器学习的一个重要分支', 'LeCun et al.');

// 第三章
doc.section('第三章 研究方法', 1);
doc.methodology([
    { title: '数据准备', desc: '数据集构建与预处理' },
    { title: '模型设计', desc: '网络架构设计' },
    { title: '训练策略', desc: '优化方法与超参设置' }
]);

// 第四章
doc.section('第四章 实验设计与结果', 1);
doc.dataStats('实验结果', [
    { value: '96.5%', label: '准确率', highlight: true },
    { value: '0.89', label: 'F1分数' }
]);
doc.table('方法对比', [
    { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M' },
    { method: 'VGG-16', accuracy: '89.3%', params: '138M' },
    { method: 'Ours', accuracy: '96.5%', params: '32M' }
], { headers: ['方法', '准确率', '参数量'], styled: true });

// 第五章
doc.section('第五章 结论与展望', 1);
doc.conclusion(
    ['提出新的图像识别方法', '取得SOTA结果', '验证了方法有效性'],
    ['优化模型结构', '扩展应用场景', '提升推理效率']
);

// 结尾
doc.end('谢谢阅读', '敬请各位老师批评指正');

doc.save('thesis-defense.docx');
```

## 批量生成

```javascript
const { generateAllTemplates } = require('./scripts/modern-word-ultimate');

// 生成所有18种风格的模板
generateAllTemplates('/path/to/output');
```

或运行脚本：
```bash
node scripts/generate-all-templates.js
```

## 页面类型总览

### 通用页面类型
- `cover` - 文档封面页
- `toc` - 目录页（自动生成）
- `section` - 章节标题
- `subsection` - 小节标题
- `paragraph` - 正文段落
- `infoCards` - 信息卡片组
- `dataStats` - 数据统计展示
- `table` - 格式化表格
- `list` - 项目列表
- `quote` - 引用/名言
- `imageText` - 图文混排
- `twoColumn` - 两栏对比布局
- `threeColumn` - 三栏并列布局
- `end` - 结尾页

### 学术报告专用
- `methodology` - 研究方法展示
- `comparison` - 方法对比表格
- `conclusion` - 结论与展望

### 商务汇报专用
- `executiveSummary` - 执行摘要
- `keyMetrics` - 关键指标
- `projectReview` - 项目回顾
- `teamBuilding` - 团队建设

### 科技产品专用
- `problemAnalysis` - 痛点分析
- `solution` - 解决方案
- `architecture` - 技术架构
- `useCases` - 应用场景

### 其他专业类型
- `timeline` - 时间线
- `roadmap` - 规划路线图
- `references` - 参考文献
- `appendix` - 附录

## 文件结构

```
modern-word/
├── SKILL.md                      # 技能文档
├── package.json                  # npm 依赖配置
├── scripts/
│   ├── style-library.js          # 18种风格配色定义 + 排版参数
│   ├── template-content.js       # 每种风格的模板内容
│   ├── modern-word-ultimate.js   # 终极版生成器（40+页面类型）
│   └── generate-all-templates.js # 批量生成脚本
├── references/
│   └── typography-guide.md       # 字体排版指南
└── assets/
    └── templates/                # 模板资源
```

## 中文支持

所有风格都使用 Arial + 微软雅黑 字体组合，完美支持中英文混排，不会出现乱码。

## 技术栈

- Node.js + docx 库（v8.5.0）
- 支持 Word 2007+ 格式（.docx）
- 支持 Windows/macOS/Linux

## 版本历史

### v7.0 (最新) - 终极版
- 18种专业风格，与 modern-ppt 风格体系一致
- 7级字号排版系统
- 40+ 文档模板类型
- 智能风格检测
- 现代布局引擎

### v6.0
- 添加目录自动生成
- 添加页眉页脚

### v5.0
- 添加表格样式系统
- 添加图文混排布局

### v4.0
- 首次发布，基础文档生成功能