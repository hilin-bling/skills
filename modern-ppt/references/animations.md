# PowerPoint Animation Reference

## Table of Contents

1. [Entrance Animations](#entrance-animations)
2. [Emphasis Animations](#emphasis-animations)
3. [Exit Animations](#exit-animations)
4. [Motion Path Animations](#motion-path-animations)
5. [Animation Timing](#animation-timing)

---

## Entrance Animations

Entrance animations make objects appear on the slide.

| Animation | presetID | Subtype Options |
|-----------|----------|-----------------|
| Appear | 1 | 0 |
| Fly In | 2 | 0=left, 1=top, 2=right, 3=bottom, 4=top-left, 5=top-right, 6=bottom-left, 7=bottom-right |
| Float In | 6 | 0=up, 1=down |
| Split | 3 | 0=horizontal out, 1=horizontal in, 2=vertical out, 3=vertical in |
| Wipe | 4 | 0=right, 1=left, 2=up, 3=down |
| Shape | 5 | 0=circle, 1=plus, 2=diamond, 3=star |
| Wheel | 7 | 1-8 spokes |
| Random Bars | 8 | 0=horizontal, 1=vertical |
| Grow & Turn | 12 | 0 |
| Zoom | 13 | 0=center, 1=from bottom, 2=from top-left |
| Swivel | 14 | 0=horizontal |
| Bounce | 15 | 0=from left, 1=from top, 2=from right, 3=from bottom |
| Flip | 16 | 0=horizontal |
| Drop | 17 | 0 |
| Rise Up | 18 | 0 |
| Float Up | 19 | 0 |
| Crawl | 20 | 0=from left, 1=from right |
| Peek | 21 | 0=from left, 1=from right, 2=from top, 3=from bottom |
| Spinner | 22 | 0 |
| Stretch | 23 | 0=from left, 1=from right, 2=from top, 3=from bottom |
| Strips | 24 | 0=diagonal down, 1=diagonal up |
| Wedge | 25 | 0 |
| Wheel (alt) | 26 | 1-8 spokes |
| Dissolve In | 27 | 0 |
| Checkerboard | 28 | 0=across, 1=down |
| Blinds | 29 | 0=horizontal, 1=vertical |
| Random | 30 | 0 |

## Emphasis Animations

Emphasis animations draw attention to objects already on the slide.

| Animation | presetID | Subtype Options |
|-----------|----------|-----------------|
| Pulse | 1 | 0 |
| Color Pulse | 2 | 0 |
| Teeter | 3 | 0 |
| Spin | 4 | 0=clockwise, 1=counter-clockwise |
| Grow/Shrink | 5 | 0=grow, 1=shrink, 2=grow then shrink |
| Grow with Color | 6 | 0 |
| Shrink with Color | 7 | 0 |
| Desaturate | 8 | 0 |
| Darken | 9 | 0 |
| Lighten | 10 | 0 |
| Transparency | 11 | 0 |
| Object Color | 12 | 0 |
| Complementary Color | 13 | 0 |
| Line Color | 14 | 0 |
| Brush Color | 15 | 0 |
| Underline | 16 | 0 |
| Bold Flash | 17 | 0 |
| Wave | 18 | 0 |
| Font Color | 19 | 0 |
| Bold Flash (alt) | 20 | 0 |
| Zoom | 21 | 0=grow, 1=shrink |
| Bounce | 22 | 0 |
| Flash Bulb | 23 | 0 |
| Flicker | 24 | 0 |

## Exit Animations

Exit animations make objects disappear from the slide.

| Animation | presetID | Subtype Options |
|-----------|----------|-----------------|
| Disappear | 1 | 0 |
| Fly Out | 2 | 0=left, 1=top, 2=right, 3=bottom, 4=top-left, 5=top-right, 6=bottom-left, 7=bottom-right |
| Float Out | 6 | 0=up, 1=down |
| Split | 3 | 0=horizontal out, 1=horizontal in, 2=vertical out, 3=vertical in |
| Wipe | 4 | 0=right, 1=left, 2=up, 3=down |
| Shape | 5 | 0=circle, 1=plus, 2=diamond, 3=star |
| Random Bars | 8 | 0=horizontal, 1=vertical |
| Shrink & Turn | 12 | 0 |
| Zoom | 13 | 0=center, 1=to bottom, 2=to top-left |
| Swivel | 14 | 0=horizontal |
| Bounce | 15 | 0=to left, 1=to top, 2=to right, 3=to bottom |
| Flip | 16 | 0=horizontal |
| Drop | 17 | 0 |
| Sink | 18 | 0 |
| Float Down | 19 | 0 |
| Crawl Out | 20 | 0=to left, 1=to right |
| Peek Out | 21 | 0=to left, 1=to right, 2=to top, 3=to bottom |
| Stretch | 23 | 0=to left, 1=to right, 2=to top, 3=to bottom |
| Strips | 24 | 0=diagonal up, 1=diagonal down |
| Dissolve Out | 27 | 0 |
| Checkerboard | 28 | 0=across, 1=down |
| Blinds | 29 | 0=horizontal, 1=vertical |
| Random | 30 | 0 |

## Motion Path Animations

Motion path animations move objects along a predefined path.

| Animation | presetID | Description |
|-----------|----------|-------------|
| Line | 1 | Straight line movement |
| Arc | 2 | Curved arc movement |
| Turn | 3 | 90-degree turn |
| Shape | 4 | Follow shape path |
| Loop | 5 | Circular loop |
| Decay | 6 | Decaying spiral |
| Bounce (path) | 7 | Bouncing path |
| Curved | 8 | Custom curved path |
| Zigzag | 9 | Zigzag movement |
| Figure 8 | 10 | Figure-eight pattern |
| Bean | 11 | Bean-shaped path |
| Funnel | 12 | Funnel-shaped path |
| Buzz | 13 | Buzzing movement |
| Square | 14 | Square path |
| Star | 15 | Star-shaped path |
| Heart | 16 | Heart-shaped path |
| Sine Wave | 17 | Sine wave pattern |

## Animation Timing

### Duration Values

Duration is specified in milliseconds (ms):

| Duration | Value | Use Case |
|----------|-------|----------|
| Very Fast | 200-300ms | Quick flashes, snappy UI |
| Fast | 400-500ms | Standard entrance/exit |
| Medium | 700-1000ms | Emphasis, attention drawing |
| Slow | 1500-2000ms | Dramatic reveals |
| Very Slow | 3000+ms | Storytelling, dramatic pause |

### Delay Values

Delay before animation starts:

| Delay | Value | Use Case |
|-------|-------|----------|
| Immediate | 0ms | Click-triggered |
| Short | 100-300ms | Staggered entrance |
| Medium | 500-1000ms | After previous |
| Long | 2000+ms | Auto-play sequences |

### Easing Functions

| Easing | Description |
|--------|-------------|
| linear | Constant speed |
| ease | Slow start, fast middle, slow end |
| easeIn | Slow start |
| easeOut | Slow end |
| easeInOut | Slow start and end |
| bounce | Bouncy ending |
| elastic | Spring-like overshoot |

## XML Structure

Animation timing is stored in `<p:timing>` element:

```xml
<p:timing>
  <p:tnLst>
    <p:par>
      <p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot">
        <p:childTnLst>
          <p:seq concurrent="1" nextAc="seek">
            <p:cTn id="2" dur="indefinite" nodeType="mainSeq">
              <p:childTnLst>
                <!-- Animation sequences here -->
              </p:childTnLst>
            </p:cTn>
          </p:seq>
        </p:childTnLst>
      </p:cTn>
    </p:par>
  </p:tnLst>
</p:timing>
```

### Key Attributes

- `presetID` - Animation type identifier
- `presetClass` - Animation category (entr, emph, exit, path)
- `presetSubtype` - Animation variation
- `dur` - Duration in milliseconds
- `delay` - Start delay
- `nodeType` - Trigger type (clickEffect, afterEffect, withEffect)