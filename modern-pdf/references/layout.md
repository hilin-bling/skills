# Layout Guide - 布局指南

## 页面尺寸

Modern PDF Ultimate 默认使用 A4 尺寸。

### 可用页面尺寸

| 尺寸 | 宽度 (pt) | 高度 (pt) | 用途 |
|------|----------|----------|------|
| A4 | 595.28 | 841.89 | 默认文档 |
| Letter | 612 | 792 | 美国标准 |
| Legal | 612 | 1008 | 法律文档 |
| A3 | 841.89 | 1190.55 | 大型图表 |
| A5 | 420 | 595.28 | 小册子 |

## 边距配置

### 标准边距配置

| 配置名称 | 上边距 | 下边距 | 左边距 | 右边距 |
|----------|--------|--------|--------|--------|
| Standard | 60 | 60 | 60 | 60 |
| Narrow | 36 | 36 | 36 | 36 |
| Wide | 72 | 72 | 90 | 90 |
| Document | 72 | 72 | 72 | 72 |
| Presentation | 40 | 40 | 60 | 60 |

### 内容区域计算

A4 标准边距下：
- 内容宽度: 475.28 pt
- 内容高度: 721.89 pt

## 网格系统

### 12 列网格

Modern PDF Ultimate 采用 12 列网格系统，提供灵活的布局选项。

```
|  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11 | 12 |
```

### 列宽计算

每列宽度 ≈ 36 pt（含间距）
列间距 = 8 pt

### 常用列组合

| 组合 | 占用列数 | 宽度比例 | 用途 |
|------|----------|----------|------|
| 全宽 | 12 | 100% | 标题、表格 |
| 半宽 | 6 | 50% | 两栏布局 |
| 三分之一 | 4 | 33% | 三栏布局 |
| 四分之一 | 3 | 25% | 四栏布局 |
| 主栏 | 8 | 67% | 杂志式布局主栏 |
| 侧栏 | 4 | 33% | 杂志式布局侧栏 |

## 多栏布局

### 两栏布局

```javascript
const layout = createTwoColumnLayout(contentY, {
    leftWidthRatio: 0.4,  // 左栏占 40%
    gutterWidth: 24       // 间距 24pt
});
```

适用场景：
- 图文混排
- 内容+注释
- 正文+侧边栏

### 三栏布局

```javascript
const layout = createThreeColumnLayout(contentY, {
    gutterWidth: 16
});
```

适用场景：
- 数据对比
- 产品展示
- 功能列表

### 杂志式布局

```javascript
const layout = createMagazineLayout(contentY, {
    mainWidthRatio: 0.65,  // 主栏占 65%
    gutterWidth: 20
});
```

适用场景：
- 长文章排版
- 报告正文
- 详细说明文档

## 卡片布局

### 网格卡片

```javascript
const cardGrid = createCardGrid(contentY, 4, {
    columns: 2,
    cardHeight: 120,
    gutterX: 16,
    gutterY: 16
});
```

### 自适应卡片

根据可用空间自动调整卡片大小：

```javascript
const adaptiveLayout = createAdaptiveCardLayout(
    contentY,
    cardCount,
    availableHeight,
    {
        minCardHeight: 80,
        maxCardHeight: 150,
        columns: 2
    }
);
```

## 黄金比例布局

### 黄金比例分割

- 黄金比例: 0.618
- 主区域: 61.8%
- 次区域: 38.2%

应用场景：
- 页面整体分割
- 图文比例
- 主次内容分布

## 布局原则

### 1. 视觉层级

- 标题区域最大
- 内容区域适中
- 边角区域最小

### 2. 平衡对称

- 左右平衡
- 上下协调
- 适当使用非对称增加趣味性

### 3. 空白空间

- 保持足够的空白
- 避免内容拥挤
- 空白也是一种设计元素

### 4. 阅读流向

- 从上到下
- 从左到右
- 遵循自然阅读顺序

## 分页处理

### 自动分页检查

```javascript
if (needsPageBreak(currentY, contentHeight)) {
    doc.addPage();
    currentY = margin.top;
}
```

### 分页时机

- 内容超出页面底部
- 章节开始
- 大型表格前
- 图片页面

### 分页优化

- 避免孤行（orphan）
- 避免寡行（widow）
- 保持段落完整