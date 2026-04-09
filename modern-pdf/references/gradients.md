# Gradients Reference - 渐变参考

## 渐变类型

Modern PDF Ultimate 支持多种渐变效果。

### 线性渐变

#### 水平渐变
- 方向: 从左到右
- 适用: 页眉、进度条、标题背景

#### 垂直渐变
- 方向: 从上到下
- 适用: 页面背景、卡片背景

#### 对角线渐变
- 方向: 45度角
- 适用: 封面背景、装饰元素

### 径向渐变

- 方向: 从中心向外扩散
- 适用: 聚焦效果、圆形元素

### Mesh 渐变

- 多色复杂渐变
- 适用: 创意设计、现代风格

## 预设渐变配色

### 极光渐变 (Aurora)

```
颜色: #0f0c29 → #302b63 → #24243e → #00ff87 → #60efff
方向: diagonal
特点: 梦幻北欧风格
```

### 赛博朋克渐变 (Cyberpunk)

```
颜色: #0a0a0a → #1a1a2e → #16213e
霓虹色: #FF00FF, #00FFFF, #FFFF00
方向: diagonal
特点: 霓虹科技风格
```

### 玻璃态渐变 (Glassmorphism)

```
颜色: #e0e5ec → #d1d9e6 → #c8d1db
方向: diagonal
特点: 柔和通透质感
```

### 渐变流 (Gradient Flow)

```
颜色: #667eea → #764ba2 → #f093fb → #f5576c
方向: flow
特点: 动态流动感
```

### 学术蓝渐变 (Academic)

```
颜色: #1e3a5f → #2c5282 → #3182ce
方向: diagonal
特点: 专业严谨
```

### 商务精英渐变 (Corporate)

```
颜色: #1a202c → #2d3748 → #4a5568
方向: diagonal
特点: 专业干练
```

### 科技未来渐变 (Tech)

```
颜色: #0f0f0f → #1a1a2e → #16213e
方向: diagonal
特点: 前沿科技感
```

### 自然绿意渐变 (Nature)

```
颜色: #1a472a → #2d5a3d → #3d6b4f
方向: diagonal
特点: 清新自然
```

### 复古怀旧渐变 (Vintage)

```
颜色: #5d4037 → #6d4c41 → #795548
方向: diagonal
特点: 温暖怀旧
```

### 活力橙黄渐变 (Energetic)

```
颜色: #ff6b35 → #ff8c42 → #ffa62b
方向: diagonal
特点: 充满能量
```

### 医疗健康渐变 (Medical)

```
颜色: #0ea5e9 → #38bdf8 → #7dd3fc
方向: diagonal
特点: 专业可信
```

### 金融财经渐变 (Finance)

```
颜色: #1e3a5f → #2c5282 → #2b6cb0
方向: diagonal
特点: 稳重专业
```

### 中国风渐变 (Chinese)

```
颜色: #8B0000 → #A52A2A → #B22222
方向: diagonal
特点: 传统典雅
```

### 创意艺术渐变 (Creative)

```
颜色: #7C3AED → #EC4899 → #F59E0B → #22D3EE
方向: radial
特点: 大胆创新
```

### 柔和梦境渐变 (Pastel)

```
颜色: #ffeef8 → #ffe4f3 → #ffd6e7
方向: diagonal
特点: 温馨浪漫
```

## 渐变使用指南

### 颜色选择原则

1. **相邻颜色和谐**: 避免使用对比过于强烈的相邻色
2. **颜色数量适中**: 一般 3-5 个颜色为宜
3. **考虑背景用途**: 深色渐变用于封面，浅色渐变用于内容背景

### 渐变方向选择

| 用途 | 推荐方向 | 原因 |
|------|----------|------|
| 封面背景 | diagonal | 增加动感 |
| 页面背景 | vertical | 自然过渡 |
| 卡片背景 | horizontal | 稳定感 |
| 进度条 | horizontal | 方向感 |
| 装饰元素 | radial | 聚焦效果 |

### 渐变透明度

```javascript
// 半透明渐变
opacity: 0.7  // 常用于叠加效果

// 玻璃态效果
opacity: 0.15  // 配合模糊背景
```

## 自定义渐变

### 创建自定义渐变

```javascript
const customGradient = {
    colors: ['#yourcolor1', '#yourcolor2', '#yourcolor3'],
    direction: 'diagonal',  // horizontal, vertical, diagonal, radial
    opacity: 1.0
};
```

### 颜色插值

渐变生成器会自动在颜色之间进行平滑插值，确保过渡自然。

## PDF 渐变实现说明

由于 PDFKit 不直接支持渐变填充，Modern PDF Ultimate 使用分段矩形模拟渐变效果：

1. 将渐变区域分割为 50 个小段
2. 每段使用插值后的颜色填充
3. 通过精细分割实现平滑过渡

这种方法的优点：
- 兼容性好
- 效果平滑
- 支持所有 PDF 阅读器

## 渐变搭配文字

### 深色渐变背景

- 文字颜色: #FFFFFF
- 半透明文字: rgba(255,255,255,0.8)

### 浅色渐变背景

- 文字颜色: #1F2937
- 强调文字: 使用主色调

### 对比度检查

确保文字与背景有足够的对比度（WCAG AA 标准 >= 4.5）。