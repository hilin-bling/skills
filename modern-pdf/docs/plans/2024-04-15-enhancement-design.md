# Modern PDF 技能强化设计方案

日期：2024-04-15

## 概述

为 modern-pdf 技能添加 PDF 专用模板内容库、科技类专业页面类型、信息图组件和场景生成脚本。

## 设计决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 模板内容库 | PDF 专用 | PDF 是文档而非演示，需要适合阅读的内容结构 |
| 页面数量 | 标准版 8-12 页 | 内容完整但不冗长，能展示多种页面类型 |
| 专业页面优先级 | 科技技术类 | 技术架构、API文档、代码展示等 |
| 数据可视化 | 信息图类 | 流程图、组织架构图、对比卡片适合文档场景 |
| 生成脚本 | 场景生成脚本 | 学术、商务、技术三个真实场景 |

## 文件结构

```
modern-pdf/
├── scripts/
│   ├── template-content.js          # PDF 专用模板内容库（新增）
│   ├── modern-pdf-ultimate.js       # 核心生成器（增强）
│   ├── style-library.js             # 风格库（保持）
│   ├── generate-all-templates.js    # 批量生成（保持）
│   ├── generate-academic-report.js  # 学术报告场景（新增）
│   ├── generate-business-report.js  # 商务报告场景（新增）
│   └── generate-tech-doc.js         # 技术文档场景（新增）
│   └── components/
│       ├── data-viz.js              # 数据可视化（保持）
│       ├── flow-chart.js            # 流程图组件（新增）
│       ├── org-chart.js             # 组织架构图（新增）
│       └── comparison.js            # 对比卡片（新增）
```

## 模板内容库设计

### 结构定义

```javascript
const TEMPLATE_CONTENT = {
    academic: {
        name: '学术蓝',
        scenario: '论文答辩',
        pages: [
            { type: 'cover', title: '基于深度学习的图像识别研究', subtitle: '答辩人：张三' },
            { type: 'toc', items: ['研究背景', '文献综述', '研究方法', '实验结果', '结论'] },
            { type: 'outline', title: '汇报提纲', items: [...] },
            { type: 'literature', title: '文献综述', refs: [...] },
            { type: 'methodology', title: '研究方法', steps: [...] },
            { type: 'dataStats', title: '实验结果', stats: [...] },
            { type: 'comparison', title: '方法对比', rows: [...] },
            { type: 'conclusion', title: '结论与展望', conclusions: [...] },
            { type: 'end', title: '谢谢聆听' }
        ]
    },
    // 其他风格类似结构...
};
```

### 18 种风格场景映射

| 风格 | 场景 | 页数 |
|------|------|------|
| academic | 论文答辩 | 10页 |
| tech | 技术白皮书 | 9页 |
| corporate | 年度工作总结 | 10页 |
| finance | 季度财务报告 | 9页 |
| medical | 医院工作报告 | 10页 |
| minimal | 设计作品集 | 8页 |
| aurora | 产品介绍手册 | 9页 |
| cyberpunk | 游戏技术文档 | 9页 |
| glass | 科技公司简介 | 9页 |
| monochrome | 高端品牌手册 | 8页 |
| gradient | 品牌展示文档 | 9页 |
| pastel | 生活方式手册 | 8页 |
| nature | 环保项目报告 | 9页 |
| vintage | 公司周年纪念 | 10页 |
| energetic | 课程介绍手册 | 8页 |
| chinese | 传统文化推广 | 10页 |
| creative | 创意提案文档 | 9页 |
| business | 企业标准文档 | 9页 |

## 科技类专业页面类型

### 1. architecture - 技术架构页

- 多层级架构展示（应用层、服务层、基础层）
- 左侧彩色标识条区分层级
- 每层包含组件列表描述

### 2. apiOverview - API 概览页

- 端点列表表格（方法、路径、描述）
- 支持 REST API 格式展示
- 可添加认证说明区域

### 3. codeBlock - 代码块展示页

- 语法高亮风格（基于风格配色）
- 代码行号可选显示
- 支持多语言标识（Python、JS、Go）

样式示例：
```
┌─────────────────────────────────────┐
│ Python                              │  ← 语言标签
├─────────────────────────────────────┤
│ 1  def process_data(data):          │
│ 2      result = model.predict(data) │  ← 代码行
│ 3      return result                │
├─────────────────────────────────────┤
│ # Returns prediction result         │  ← 注释行（灰色）
└─────────────────────────────────────┘
```

### 4. useCases - 应用场景页

- 行业分类展示（金融、医疗、教育）
- 每个场景包含具体应用列表
- 卡片式布局

### 5. pricing - 定价方案页

- 三列定价卡片（Starter、Pro、Enterprise）
- 功能列表对比
- 价格突出显示

## 信息图组件设计

### 1. flow-chart.js - 流程图组件

```
  [Step 1]──────▶[Step 2]──────▶[Step 3]
     │                              │
     ▼                              ▼
  [分支A]                       [分支B]
```

特性：
- 支持水平/垂直流向
- 步骤编号圆圈
- 箭头连接线
- 分支节点支持

### 2. org-chart.js - 组织架构图

```
        [CEO]
          │
    ┌─────┼─────┐
    │     │     │
 [VP1] [VP2] [VP3]
```

特性：
- 层级树状结构
- 节点卡片样式（姓名、职位）
- 连接线自动绘制
- 支持 3-5 层深度

### 3. comparison.js - 对比卡片

```
┌────────────────────┬────────────────────┐
│     方案 A         │      方案 B        │
├────────────────────┼────────────────────┤
│ ✓ 优点 1           │ ✓ 优点 1           │
│ ✓ 优点 2           │ ✗ 缺点 1           │
│ ✗ 缺点 1           │ ✓ 优点 2           │
│ 价格: ¥99          │ 价格: ¥199         │
└────────────────────┴────────────────────┘
```

特性：
- 左右两列对比布局
- 优缺点图标区分（✓/✗）
- 关键指标对比行
- 推荐标签可选

## 场景生成脚本设计

### 1. generate-academic-report.js

- 风格：academic
- 输出：academic-thesis-defense.pdf
- 页数：10-12 页
- 内容：完整的研究生论文答辩文档

### 2. generate-business-report.js

- 风格：corporate
- 输出：corporate-annual-report.pdf
- 页数：10-12 页
- 内容：完整的企业年度工作汇报

### 3. generate-tech-doc.js

- 风格：tech
- 输出：tech-api-documentation.pdf
- 页数：9-10 页
- 内容：完整的 SaaS 产品技术文档

## 实现顺序

1. 创建 template-content.js（模板内容库）
2. 增强 modern-pdf-ultimate.js（添加新页面类型）
3. 创建信息图组件（flow-chart、org-chart、comparison）
4. 创建场景生成脚本
5. 测试并生成样例 PDF

## 使用示例

```javascript
const { ModernPDFUltimate } = require('./modern-pdf-ultimate');

// 使用模板内容库
const gen = new ModernPDFUltimate('tech');
const template = TEMPLATE_CONTENT.tech;

// 自动生成完整文档
template.pages.forEach(page => {
    gen[page.type](page.title, page.data);
});

gen.save('tech-demo.pdf');
```