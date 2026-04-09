# Installation Guide - 安装指南

## 依赖安装

Modern PDF Ultimate 需要安装 `pdfkit` 模块才能运行。

### 方法 1: 在 skill 目录安装

```bash
cd .claude/skills/modern-pdf
npm install pdfkit
```

### 方法 2: 使用全局安装

```bash
npm install -g pdfkit
```

### 方法 3: 在项目根目录安装

如果 skill 目录安装失败，可以在项目根目录安装：

```bash
cd D:\Software\Devlop\AI
npm install pdfkit
```

## 验证安装

运行测试脚本验证安装是否成功：

```bash
node .claude/skills/modern-pdf/scripts/test-generator.js
```

如果成功，会在 `output/test` 目录生成测试 PDF 文件。

## 常见问题

### 1. MODULE_NOT_FOUND 错误

错误信息：
```
Error: Cannot find module 'pdfkit'
```

解决方案：
确保在正确的目录下执行 `npm install pdfkit`

### 2. npm install 失败

可能原因：
- 网络问题
- npm 配置问题
- 权限问题

解决方案：
- 使用 `npm install --legacy-peer-deps pdfkit`
- 检查 npm 配置：`npm config list`
- 使用代理或镜像：`npm config set registry https://registry.npmmirror.com`

### 3. 字体问题

pdfkit 默认使用 Helvetica 字体，支持中英文混排。

如果需要自定义字体，可以在 `assets/fonts` 目录放置字体文件并在代码中注册：

```javascript
doc.registerFont('CustomFont', path.join(__dirname, '../assets/fonts/custom.ttf'));
```

## 系统要求

- Node.js >= 14.0.0
- npm >= 6.0.0
- pdfkit >= 0.13.0