# Modern Design Principles for Presentations

## Table of Contents

1. [2025 Design Trends](#2025-design-trends)
2. [Chinese Font Configuration](#chinese-font-configuration)
3. [Visual Hierarchy](#visual-hierarchy)
4. [Typography](#typography)
5. [Color Theory](#color-theory)
6. [Layout Grids](#layout-grids)
7. [Animation Timing](#animation-timing)

---

## 2025 Design Trends

### 1. Bento Grid Layouts

Card-based modular design with asymmetric arrangements. Inspired by iOS and modern dashboards.

**Key Principles:**
- Cards have clear boundaries with subtle shadows
- Asymmetric layouts create visual interest
- White space is intentional, not empty
- Each card has a single focus

**Implementation:**
```
┌─────────────────┬──────────┐
│                 │  Card 2  │
│    Card 1       ├────┬─────┤
│    (Large)      │ C3 │ C4  │
│                 │    │     │
└─────────────────┴────┴─────┘
```

### 2. Glassmorphism

Frosted glass effect with transparency and blur.

**CSS Equivalent:**
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**PPT Implementation:**
- Use transparency: 15-25%
- Add subtle borders
- Layer multiple glass elements
- Dark backgrounds work best

### 3. Bold Typography

Oversized headlines with minimal body text.

**Rules:**
- Hero text: 72-96pt (fill 60%+ of slide)
- Body text: 16-18pt (supporting only)
- One message per slide
- Generous whitespace

### 4. Aurora Gradients

Multi-color, ethereal gradients inspired by northern lights.

**Popular Combinations:**
```
Purple → Pink → Amber: #7C3AED → #EC4899 → #F59E0B
Cyan → Purple → Dark:  #22D3EE → #7C3AED → #0F172A
Blue → Violet → Pink:  #3B82F6 → #8B5CF6 → #EC4899
```

### 5. Dark Mode First

High contrast dark backgrounds with bright accents.

**Benefits:**
- Reduces eye strain
- Makes colors pop
- Modern, premium feel
- Better for projectors

### 6. Neon Effects

Cyberpunk-inspired glowing text and elements.

**Colors:**
- Neon Green: #00FF88
- Neon Magenta: #FF00FF
- Neon Cyan: #00FFFF

---

## Chinese Font Configuration

### Windows System Fonts

**CRITICAL:** Use English system names only. Chinese font names cause garbled text.

```javascript
// ✅ CORRECT - Works properly
fontFace: 'Microsoft YaHei'
fontFace: 'SimSun'
fontFace: 'Microsoft YaHei Bold'

// ❌ WRONG - Causes garbled text
fontFace: '微软雅黑'
fontFace: 'YaHei'
fontFace: '宋体'
```

### Available Chinese Fonts on Windows

| English Name | Chinese Name | Style |
|-------------|--------------|-------|
| Microsoft YaHei | 微软雅黑 | Modern, clean (recommended) |
| SimSun | 宋体 | Traditional, serif |
| SimHei | 黑体 | Bold, modern |
| KaiTi | 楷体 | Calligraphic |
| FangSong | 仿宋 | Traditional |

### Font Weights

```javascript
// Regular
fontFace: 'Microsoft YaHei'

// Bold
fontFace: 'Microsoft YaHei Bold'
bold: true

// Light (Windows 10+)
fontFace: 'Microsoft YaHei Light'
```

### Cross-Platform Fallback

```javascript
const getChineseFont = () => {
    switch (process.platform) {
        case 'win32': return 'Microsoft YaHei';
        case 'darwin': return 'PingFang SC';
        case 'linux': return 'Noto Sans CJK SC';
        default: return 'Arial';
    }
};
```

---

## Visual Hierarchy

### The 10:1 Rule

Main headlines should be 10x larger than body text:
- Headlines: 48-72pt
- Body: 14-18pt
- Captions: 10-12pt

### Size Hierarchy

```
Level 1 (Hero):     72-96pt  - Cover slides, key messages (2025 trend: bigger!)
Level 2 (Section):  44-48pt  - Section headers
Level 3 (Title):    28-36pt  - Slide titles
Level 4 (Body):     16-18pt  - Main content
Level 5 (Caption):  12-14pt  - Labels, notes
```

### Contrast Hierarchy

1. **High contrast**: Title vs background (WCAG AAA)
2. **Medium contrast**: Body vs background (WCAG AA)
3. **Low contrast**: Secondary elements (muted colors)

---

## Typography

### Font Pairing Guidelines

| Style | Primary Font | Secondary Font | Use Case |
|-------|-------------|----------------|----------|
| Modern | Microsoft YaHei | Arial | All-purpose |
| Traditional | SimSun | Georgia | Academic, formal |
| Technical | Microsoft YaHei | Consolas | Code, API docs |
| Creative | Microsoft YaHei Bold | - | Marketing, brands |

### Line Height

- Headlines: 1.1-1.2 (tight)
- Body text: 1.5-1.8 (generous)
- Captions: 1.4-1.5 (balanced)

### Character Width

Optimal reading width: 45-75 characters per line.
```
Slide width: 720pt
Content width: 640pt (40pt margins)
Characters per line: ~60 at 16pt
```

---

## Color Theory

### 2025 Color Trends

**Digital Colors:**
- Cyber Purple: #7C3AED
- Electric Blue: #22D3EE
- Neon Green: #22C55E
- Hot Pink: #EC4899
- Deep Dark: #0F172A

**Pantone Colors:**
- Viva Magenta: #BE264C
- Peach Fuzz: #FFBE98
- Classic Blue: #0F4C81

### Palette Construction

**3-Color Rule:**
1. **Dominant** (60%): Background, large areas
2. **Secondary** (30%): Shapes, containers
3. **Accent** (10%): Highlights, CTAs

### Gradient Trends 2025

1. **Aurora Gradients**: Multi-color, ethereal
   ```
   #7C3AED → #EC4899 → #F59E0B
   ```

2. **Glassmorphism**: Subtle, transparent
   ```
   rgba(255,255,255,0.1) with blur
   ```

3. **Mesh Gradients**: Complex, organic
   ```
   Multiple gradient points, non-linear
   ```

4. **Dark Mode Gradients**: Deep, sophisticated
   ```
   #0F172A → #1E293B → #334155
   ```

---

## Layout Grids

### 12-Column Grid

Standard slide grid for flexible layouts:

```
Slide: 10" × 5.625" (16:9)
Columns: 12
Column width: 0.65"
Gutter: 0.2"
Margin: 0.5"
```

### Bento Layout Patterns

**Hero + 3 Cards:**
```
┌─────────────────┬──────────┐
│                 │  Card 2  │
│    Card 1       ├────┬─────┤
│    (Large)      │ C3 │ C4  │
└─────────────────┴────┴─────┘
```

**3-Column:**
```
┌────────┬────────┬────────┐
│  Col 1 │  Col 2 │  Col 3 │
└────────┴────────┴────────┘
```

**Asymmetric 5-Card:**
```
┌─────────────────┬──────────┐
│                 │  Card 2  │
│    Card 1       ├────┬─────┤
│                 │ C3 │ C4  │
├────┬─────┬──────┴────┴─────┤
│ C5 │     Card 6           │
└────┴──────────────────────┘
```

### Whitespace Rules

- **Minimum margin**: 5% of slide dimension
- **Content breathing room**: 20-30pt between elements
- **Section spacing**: 40-60pt between major sections
- **Ideal whitespace**: 30-40% of slide area

---

## Animation Timing

### Entrance Timing

| Animation Type | Duration | Use Case |
|---------------|----------|----------|
| Appear | 0ms | Instant reveal |
| Fade | 400-600ms | Professional, subtle |
| Fly In | 300-500ms | Directional emphasis |
| Zoom | 500-700ms | Impactful entrance |
| Bounce | 800-1200ms | Playful, attention |

### Stagger Formula

```javascript
delay = baseDelay + (index * staggerInterval)

// Recommended values:
baseDelay: 200-300ms
staggerInterval: 100-200ms
```

### What to Avoid

1. **Heavy Drop Shadows** - Use subtle shadows instead
2. **Gradients on Text** - Reduces readability
3. **Too Many Fonts** - Stick to 2-3 maximum
4. **Cluttered Layouts** - Embrace whitespace
5. **Spinning Logos** - Dated, distracting
6. **Comic Sans/Papyrus** - Never appropriate