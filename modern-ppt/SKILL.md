---
name: modern-ppt
description: "Create stunning PowerPoint presentations with 18 professional styles (including Aurora, Cyberpunk, Glassmorphism), each with unique content, layouts, and animations. Features include: content-aware animation engine, modern asymmetric layouts, typography system with 7-level hierarchy, 100+ design templates, advanced gradient generator, glassmorphism effects, and 50+ page types. v8.0 Ultimate Edition - 对标 Dribbble/Behance 顶级设计作品。"
---

# Modern PPT Creator Ultimate v8.0

生成高质量、现代化的PowerPoint演示文稿，支持18种精心设计的风格，每种风格都有独特的内容、布局和动画效果。**全网最强 PPTX 生成技能 - 对标 Dribbble/Behance 顶级设计作品。**

## v8.0 终极升级 - 统一设计系统

### 新增特性

| 特性 | 描述 |
|------|------|
| **统一设计系统** | 与 modern-pdf、modern-word、modern-excel 共享设计规范 |
| **18 种风格统一** | 所有 modern-* 技能使用相同的 18 种专业风格 |
| **智能风格推荐** | 根据内容自动推荐最适合的风格 |
| **API 统一** | 与其他 modern-* 技能保持一致的 API 设计 |

## v7.0 终极升级 - 美学巅峰

### 新增 6 种潮流风格

| 风格 | 特点 | 适用场景 |
|------|------|---------|
| **极光 Aurora** | 北欧极光灵感，梦幻渐变色彩 | 创意展示、设计提案 |
| **赛博朋克 Cyberpunk** | 霓虹灯效果，暗色科技感 | 游戏发布、科技活动 |
| **柔和梦境 Pastel** | 柔和马卡龙色调，温馨浪漫 | 女性品牌、婚礼策划 |
| **渐变流 Gradient** | 动态渐变背景，流动感 | 品牌展示、产品发布 |
| **玻璃态 Glass** | 现代玻璃拟态设计，通透质感 | 科技公司、现代品牌 |
| **单色大师 Monochrome** | 纯粹单色设计，极简高雅 | 艺术展示、高端品牌 |

### 全新模块系统

```
scripts/
├── engines/
│   ├── color-intelligence.js    # 智能配色系统
│   └── layout-engine-v2.js      # 高级布局引擎
├── components/
│   ├── typography-system.js     # 字体排版系统
│   ├── micro-animations.js      # 微交互动画库
│   └── data-viz.js              # 数据可视化组件
├── utils/
│   ├── gradient-generator.js    # 渐变生成器
│   └── glassmorphism.js         # 玻璃态效果
├── templates/
│   └── design-templates.js      # 100+ 设计模板
```

### 字体排版系统

**7级字号体系**:
- Display (96pt) - 展示级
- Hero (72pt) - 封面主标题
- Title (48pt) - 页面标题
- Heading (36pt) - 章节标题
- Body (18pt) - 正文
- Caption (14pt) - 说明文字
- Small (12pt) - 小字

**7种字体配对**:
- Classic Professional - 衬线 + 无衬线
- Modern Editorial - 展示 + 正文
- Minimal Clean - 纯无衬线
- Chinese English Mixed - 中英混排优化
- 等等...

### 设计模板库

- **极简风格**: 产品发布、投资路演、作品集
- **创意风格**: 品牌发布会、年度总结
- **商务风格**: 季度报告、项目提案
- **科技风格**: 产品发布、AI产品介绍
- **行业模板**: 金融、医疗、教育
- **场景模板**: 培训、工作坊

## v6.0 现代美学升级

### 内容感知动画引擎

根据元素类型自动选择最佳动画效果：

| 内容类型 | 进入动画 | 特点 |
|---------|---------|------|
| 标题/大字 | fade + scale | 简洁有力 |
| 数据/统计 | grow + countUp | 动态增长 |
| 卡片列表 | staggered zoomIn | 依次展开 |
| 时间线 | wipe + reveal | 时间流动感 |
| 图表 | draw + highlight | 绘制过程 |
| 引用/名言 | typewriter + fade | 文字出现 |
| 图标/图片 | floatIn + shadow | 悬浮进入 |

### 现代布局系统

应用现代设计原则：
- **非对称平衡** - 打破传统居中布局
- **超大字体标题** - 72pt 英雄标题
- **大胆留白** - 增强视觉焦点
- **卡片式内容** - 带微妙阴影

### 智能动画时长

根据内容复杂度动态调整动画时长：
- 简单内容：更快节奏
- 复杂内容：更长展示时间
- 视觉层级：标题 → 副标题 → 内容 → 细节

## 动画系统

### 切换动画
每张幻灯片自动应用切换动画：
- `fade` - 淡入淡出
- `push` - 推入效果
- `wipe` - 擦除效果
- `dissolve` - 溶解效果
- `split` - 分裂效果
- `reveal` - 显示效果

### 元素动画
元素自动应用进入动画：
- `fade` - 淡入
- `fly` - 飞入
- `zoom` - 缩放
- `grow` - 生长
- `bounce` - 弹跳
- `pulse` - 脉冲

### 风格动画配置

| 风格 | 切换动画 | 标题动画 | 卡片动画 | 数据动画 |
|------|----------|----------|----------|----------|
| 深空紫 | fade | fade | zoomIn | grow |
| 学术蓝 | wipeLeft | fade | fade | grow |
| 可爱童趣 | push | bounce | zoomIn | pulse |
| 商务精英 | fade | fade | fade | grow |
| 科技未来 | fadeThroughBlack | fade | zoomIn | grow |
| 极简主义 | fade | fade | fade | fade |
| 自然绿意 | wipeRight | fade | grow | grow |
| 复古怀旧 | dissolve | fade | fade | grow |
| 活力橙黄 | pushLeft | bounce | zoomIn | pulse |
| 医疗健康 | fade | fade | fade | grow |
| 金融财经 | fade | fade | fade | grow |
| 中国风 | dissolve | fade | zoomIn | grow |

## 风格概览

| 风格 | 应用场景 | 独特页面类型 |
|------|----------|--------------|
| **深空紫** | 产品发布会 | 产品定位、核心亮点、市场数据、产品路线图 |
| **学术蓝** | 论文答辩 | 汇报提纲、文献综述、研究方法、实验结果、方法对比、结论展望 |
| **可爱童趣** | 幼儿园课程 | 课程特色、一日活动、周主题活动、发展目标、家园共育、每周食谱 |
| **商务精英** | 年终总结 | 年度概览、关键业绩、项目回顾、团队建设、问题挑战、年度规划 |
| **科技未来** | AI产品发布 | 痛点分析、解决方案、技术架构、性能指标、应用场景、定价方案 |
| **极简主义** | 设计作品集 | 设计理念、精选作品、工作流程、服务范围、设计哲学 |
| **自然绿意** | 环保项目 | 项目使命、年度成果、重点项目、环境效益、合作伙伴、未来规划 |
| **复古怀旧** | 周年纪念 | 发展历程、里程碑事件、珍贵回忆、感恩有你、辉煌成就、未来展望 |
| **活力橙黄** | 健身课程 | 课程介绍、训练计划、经典动作、营养建议、预期效果、课程套餐 |
| **医疗健康** | 医院汇报 | 科室概况、业务数据、质量指标、科研教学、技术创新、明年计划 |
| **金融财经** | 财务报告 | 执行摘要、核心指标、收入分析、成本分析、资产负债、年度预测、风险提示 |
| **中国风** | 传统文化 | 项目背景、非遗项目、匠心大师、传统工艺、创新传承、保护成果、未来愿景 |

## 快速开始

```javascript
const { ModernPPTUltimate, generateAllTemplates } = require('./scripts/modern-ppt-ultimate');

// 创建指定风格的生成器
const gen = new ModernPPTUltimate('academic');

// 封面页
await gen.cover('论文标题', '答辩人：张三', '指导教师：李教授');

// 学术风格专属页面
gen.outline('汇报提纲', [...]);
gen.literature('文献综述', [...]);
gen.methodology('研究方法', [...]);
gen.comparison('方法对比', [...]);
gen.conclusion('结论与展望', [...], [...]);

// 结束页
await gen.end('谢谢聆听', '敬请批评指正', 'email@university.edu');

gen.save('thesis-defense.pptx');
```

## 页面类型总览

### 通用页面类型
- `infoCards` - 信息卡片页
- `dataStats` - 数据统计页
- `roadmap` - 规划路线图
- `timeline` - 时间线

### 学术报告专用
- `outline` - 汇报提纲
- `literature` - 文献综述
- `methodology` - 研究方法
- `comparison` - 方法对比表格
- `conclusion` - 结论与展望

### 可爱童趣专用
- `schedule` - 日程安排
- `weeklyTheme` - 周主题活动
- `goals` - 发展目标
- `homeCooperation` - 家园共育
- `menu` - 每周食谱

### 商务汇报专用
- `annualOverview` - 年度概览
- `projectList` - 项目列表
- `teamBuilding` - 团队建设
- `challenges` - 问题与挑战

### 科技产品专用
- `problem` - 痛点分析
- `solution` - 解决方案
- `architecture` - 技术架构
- `useCases` - 应用场景
- `pricing` - 定价方案

### 极简设计专用
- `philosophy` - 设计理念
- `portfolio` - 作品集
- `process` - 工作流程
- `services` - 服务范围
- `quote` - 引用页

### 其他专用类型
- `mission` - 项目使命（自然）
- `projects` - 项目列表（自然）
- `impact` - 影响对比（自然）
- `partners` - 合作伙伴（自然）
- `milestones` - 里程碑（复古）
- `memories` - 珍贵回忆（复古）
- `people` - 人物介绍（复古）
- `future` - 未来展望（复古）
- `program` - 课程计划（活力）
- `exercises` - 训练动作（活力）
- `nutrition` - 营养建议（活力）
- `progress` - 进度展示（活力）
- `overview` - 概况介绍（医疗）
- `quality` - 质量指标（医疗）
- `academic` - 学术成果（医疗）
- `innovation` - 技术创新（医疗）
- `executive` - 执行摘要（金融）
- `revenue` - 收入分析（金融）
- `expense` - 成本分析（金融）
- `balance` - 资产负债（金融）
- `forecast` - 预测分析（金融）
- `risks` - 风险提示（金融）
- `intro` - 项目简介（中国风）
- `heritage` - 非遗项目（中国风）
- `craftsman` - 匠人介绍（中国风）
- `modern` - 现代创新（中国风）
- `vision` - 愿景展望（中国风）

## 完整示例：学术报告

```javascript
const { ModernPPTUltimate } = require('./scripts/modern-ppt-ultimate');

const gen = new ModernPPTUltimate('academic');

await gen.cover('基于深度学习的图像识别研究', '答辩人：张三 | 导师：李教授', '计算机科学与技术学院');

gen.outline('汇报提纲', [
    { num: '01', title: '研究背景与意义' },
    { num: '02', title: '文献综述' },
    { num: '03', title: '研究方法' },
    { num: '04', title: '实验设计与结果' },
    { num: '05', title: '结论与展望' }
]);

gen.infoCards('研究背景', '研究意义与价值', [
    { icon: '📚', title: '理论意义', desc: '填补研究空白' },
    { icon: '💡', title: '应用价值', desc: '解决实际问题' },
    { icon: '🔬', title: '创新点', desc: '方法创新' }
]);

gen.literature('文献综述', [
    { author: 'He et al. (2016)', content: 'ResNet残差网络' },
    { author: 'Vaswani et al. (2017)', content: 'Transformer架构' }
]);

gen.methodology('研究方法', [
    { title: '数据准备', desc: '数据集构建与预处理' },
    { title: '模型设计', desc: '网络架构设计' },
    { title: '训练策略', desc: '优化方法与超参' }
]);

gen.dataStats('实验结果', [
    { value: '96.5%', label: '准确率', change: '+3.2%', highlight: true },
    { value: '0.89', label: 'F1分数' }
]);

gen.comparison('方法对比', [
    { method: 'ResNet-50', accuracy: '92.1%', params: '25.6M' },
    { method: 'Ours', accuracy: '96.5%', params: '32M' }
]);

gen.conclusion('结论与展望',
    ['提出新的图像识别方法', '取得SOTA结果'],
    ['优化模型结构', '扩展应用场景']
);

await gen.end('谢谢聆听', '敬请各位老师批评指正');

gen.save('thesis-defense.pptx');
```

## 批量生成

```javascript
const { generateAllTemplates } = require('./scripts/modern-ppt-ultimate');

// 生成所有12种风格的模板
await generateAllTemplates('/path/to/output');
```

或运行脚本：
```bash
node scripts/generate-all-templates.js
```

## 文件结构

```
modern-ppt/
├── SKILL.md                      # 技能文档
├── scripts/
│   ├── style-library.js          # 12种风格配色定义 + 现代布局参数
│   ├── template-content.js       # 每种风格的模板内容
│   ├── modern-ppt-ultimate.js    # 终极版生成器（40+页面类型）
│   ├── animation-content-engine.js  # 内容感知动画引擎 (v6.0新增)
│   ├── modern-layout-engine.js   # 现代布局引擎 (v6.0新增)
│   ├── animation-com-backend.js  # COM动画后端
│   ├── animation-engine.js       # 核心动画引擎
│   ├── animation-facade.js       # 动画门面
│   ├── animation-library.js      # 动画库
│   └── generate-all-templates.js # 批量生成脚本
└── assets/
    └── dribbble-*.png            # 设计灵感参考图
```

## 中文支持

所有风格都使用 Arial 字体，完美支持中英文混排，不会出现乱码。

## 版本历史

### v8.0 (最新) - 统一设计系统
- 统一设计系统 - 与 modern-pdf、modern-word、modern-excel 共享设计规范
- 18 种风格统一 - 所有 modern-* 技能使用相同的专业风格
- 智能风格推荐 - 根据内容自动推荐最适合的风格
- API 统一 - 与其他 modern-* 技能保持一致的 API 设计

### v7.0 - 美学巅峰
- 新增 6 种潮流风格（极光、赛博朋克、柔和梦境、渐变流、玻璃态、单色大师）
- 全新模块系统（engines、components、utils、templates）
- 字体排版系统（7级字号、7种字体配对）
- 设计模板库（100+ 模板）

### v6.0 - 现代美学升级
- 内容感知动画引擎 - 根据内容类型自动选择动画
- 现代布局系统 - 非对称布局、超大字体、卡片化设计
- 智能动画时长 - 根据内容复杂度动态调整
- 新增动画规则映射表（标题、数据、卡片、时间线等）

### v5.0
- 分层动画系统（COM/XML/Null后端）
- PowerPoint COM 后端动画支持

### v4.0
- 12种风格，每种有独特的模板内容
- 40+种页面类型，覆盖各种场景
- 学术报告：提纲、文献综述、方法论、对比表格
- 商务汇报：年度概览、项目回顾、团队建设
- 科技产品：痛点分析、技术架构、定价方案
- 更多专业页面类型...

### v3.0
- 新增12种专业风格配色
- 支持自动风格推荐

### v2.0
- 新增6种优雅渐变主题
- 改进内容页设计