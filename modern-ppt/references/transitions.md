# PowerPoint Slide Transitions Reference

## Table of Contents

1. [Transition Types](#transition-types)
2. [Direction Options](#direction-options)
3. [Timing Options](#timing-options)
4. [XML Structure](#xml-structure)

---

## Transition Types

### Subtle Transitions

| Transition | XML Element | Best For |
|------------|-------------|----------|
| Fade | `<p:fade/>` | Professional presentations, smooth flow |
| Push | `<p:push dir="l"/>` | Directional storytelling |
| Wipe | `<p:wipe dir="r"/>` | Clean reveals, data presentations |
| Cut | `<p:cut/>` | Quick changes, energetic |
| Cover | `<p:cover dir="r"/>` | Layered reveals |

### Exciting Transitions

| Transition | XML Element | Best For |
|------------|-------------|----------|
| Zoom | `<p:zoom dir="in"/>` | Dynamic impact, product reveals |
| Split | `<p:split orient="horz" dir="out"/>` | Dramatic reveals |
| Circle | `<p:circle/>` | Creative, modern presentations |
| Diamond | `<p:diamond/>` | Unique, memorable moments |
| Plus | `<p:plus/>` | Technical presentations |
| Wedge | `<p:wedge/>` | Circular motion themes |

### Dynamic Transitions

| Transition | XML Element | Best For |
|------------|-------------|----------|
| Wheel | `<p:wheel spokes="4"/>` | Multi-part reveals |
| Dissolve | `<p:dissolve/>` | Artistic, gentle transitions |
| Random Bar | `<p:randomBar orient="horz"/>` | Data-driven presentations |
| Blinds | `<p:blinds orient="horz"/>` | Professional, subtle |
| Checker | `<p:checker orient="horz"/>` | Grid-based content |
| Comb | `<p:comb orient="horz"/>` | Modern, tech presentations |
| Strips | `<p:strips dir="lu"/>` | Diagonal motion themes |

### Special Transitions

| Transition | XML Element | Best For |
|------------|-------------|----------|
| Newsflash | `<p:newsflash/>` | Breaking news, announcements |
| Random | `<p:random/>` | Variety, unpredictability |

## Direction Options

### Side Direction (l/r/u/d)

| Code | Direction |
|------|-----------|
| `l` | Left |
| `r` | Right |
| `u` | Up |
| `d` | Down |

### Corner Direction (lu/ru/ld/rd)

| Code | Direction |
|------|-----------|
| `lu` | Top-left |
| `ru` | Top-right |
| `ld` | Bottom-left |
| `rd` | Bottom-right |

### In/Out Direction

| Code | Direction |
|------|-----------|
| `in` | Move inward |
| `out` | Move outward |

### Orientation

| Code | Direction |
|------|-----------|
| `horz` | Horizontal |
| `vert` | Vertical |

## Timing Options

### Speed Values

| Speed | XML Value | Duration |
|-------|-----------|----------|
| Slow | `slow` | ~1500ms |
| Medium | `med` | ~800ms |
| Fast | `fast` | ~500ms |

### Auto-Advance

| Attribute | Value | Effect |
|-----------|-------|--------|
| `advClick` | `true` | Wait for click |
| `advClick` | `false` | Auto-advance possible |
| `advTm` | `5000` | Auto-advance after 5 seconds |

### Sound Options

```xml
<!-- Play sound on transition -->
<p:sndAc>
  <p:stSnd loop="false">
    <a:snd r:embed="rId1" name="transition.wav"/>
  </p:stSnd>
</p:sndAc>

<!-- Stop any playing sound -->
<p:sndAc>
  <p:endSnd/>
</p:sndAc>
```

## XML Structure

### Basic Transition

```xml
<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <!-- Slide content -->
  </p:cSld>
  <p:transition spd="fast" advClick="true">
    <p:fade/>
  </p:transition>
</p:sld>
```

### Push Transition with Direction

```xml
<p:transition spd="med">
  <p:push dir="l"/>
</p:transition>
```

### Zoom Transition

```xml
<p:transition spd="fast">
  <p:zoom dir="in"/>
</p:transition>
```

### Split Transition

```xml
<p:transition spd="med">
  <p:split orient="horz" dir="out"/>
</p:transition>
```

### Wheel Transition

```xml
<p:transition spd="slow">
  <p:wheel spokes="4"/>
</p:transition>
```

### Fade Through Black

```xml
<p:transition spd="med">
  <p:fade thruBlk="true"/>
</p:transition>
```

### Cut Through Black

```xml
<p:transition spd="fast">
  <p:cut thruBlk="true"/>
</p:transition>
```

## PptxGenJS Usage

```javascript
const pptx = new pptxgen();
const slide = pptx.addSlide();

// Fade transition
slide.transition = { type: 'fade' };

// Push from left
slide.transition = { type: 'push', direction: 'l' };

// Wipe from right
slide.transition = { type: 'wipe', direction: 'r' };

// Zoom in
slide.transition = { type: 'zoom', direction: 'in' };

// Split horizontally outward
slide.transition = { type: 'split', orientation: 'horz', direction: 'out' };

// Circle transition
slide.transition = { type: 'circle' };

// Wheel with 4 spokes
slide.transition = { type: 'wheel', spokes: 4 };

// Dissolve
slide.transition = { type: 'dissolve' };
```

## Recommended Pairings

| Presentation Type | Primary Transition | Accent Transition |
|-------------------|-------------------|-------------------|
| Corporate | Fade | Push |
| Tech/Startup | Zoom | Split |
| Creative | Circle | Dissolve |
| Data-Driven | Wipe | Wheel |
| Product Launch | Fade | Zoom |
| Educational | Push | Cover |
| Minimal | Fade | Cut |