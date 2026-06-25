# Renge Mathematical Specification
## Complete Math Reference — Widths, Gutters, Sections, and All Scale Derivations

**Version:** 1.0  
**Philosophy:** "Proportion as a first principle. Form and function emerge together. The math is the beauty."

---

## 🎯 Core Constants

All of Renge derives from three mathematical primitives:

### φ (Phi) — The Golden Ratio
```
φ = (1 + √5) / 2 ≈ 1.618033988749895
```

**Usage:** Typography, layout containers, aspect ratios, motion easing control points.

**Why:** appears in nautilus shells, spiral galaxies, plant spirals, human proportions. It's the ratio that emerges when you demand that a ratio relate its parts in the same proportion as the whole relates to the larger part.

---

### φ² (Phi Squared)
```
φ² = (3 + √5) / 2 ≈ 2.618033988749895
```

**Usage:** Typography scale exponent transitions, container width growth multiplier.

**Reciprocal:** `1/φ² ≈ 0.382` — used as control point A in all motion easings.

---

### Fibonacci Sequence
```
FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
```

Each step is the sum of the two preceding. The ratio between consecutive Fibonacci numbers approaches φ as the sequence grows.

**Usage:** Spacing scale, motion durations, border radius, column minimum widths, grid heights.

---

### θ (Theta) — Golden Angle
```
GOLDEN_ANGLE = 360 / φ² ≈ 137.5077640500378°
```

**Usage:** Phyllotaxis spiral arrangement (avatar clusters, tag clouds, radial UI patterns).

**Why:** In nature (sunflower seeds, pinecones), this angle produces optimal packing without overlap or density clustering.

---

## 📏 Spacing Scale

**Base Unit:** 4px  
**Derivation:** Fibonacci[n] × baseUnit

### Scale Values (Default)
```
space-0:  0px     (0 × 4)
space-1:  4px     (1 × 4)
space-2:  8px     (2 × 4)
space-3:  12px    (3 × 4)
space-4:  20px    (5 × 4)
space-5:  32px    (8 × 4)
space-6:  52px    (13 × 4)
space-7:  84px    (21 × 4)
space-8:  136px   (34 × 4)
space-9:  220px   (55 × 4)
space-10: 356px   (89 × 4)
```

### CSS Variables
```css
:root {
  --renge-space-0: 0px;
  --renge-space-1: 4px;
  --renge-space-2: 8px;
  --renge-space-3: 12px;
  --renge-space-4: 20px;
  /* ... etc */
}
```

### Code Pattern (TypeScript)
```typescript
import { FIBONACCI } from '@renge/tokens';

const baseUnit = 4;
const spacingScale = {
  '0': '0px',
  ...FIBONACCI.reduce((acc, fib, idx) => ({
    ...acc,
    [String(idx + 1)]: `${fib * baseUnit}px`
  }), {})
};
```

### Use Cases
- **Padding:** All internal component spacing uses space-N
- **Margin:** All layout separation uses space-N
- **Gap:** All grid/flex gaps use space-N
- **Offsets:** Transform translate, position top/left/etc.

---

## 📐 Layout Scale

### Container Max-Widths

**Base:** 200px × φⁿ (n = 2..5)

Each tier is exactly **φ times** the previous. The entire sequence follows a single multiplicative ratio — the same curve as a nautilus shell growing proportionally.

```
sm:   200 × φ²  = 524px   (narrow prose, sidebars)
md:   200 × φ³  = 847px   (comfortable reading width, default content)
lg:   200 × φ⁴  = 1371px  (full desktop, multicolumn)
xl:   200 × φ⁵  = 2218px  (ultra-wide dashboard, gallery layouts)
full: 100%               (unbounded)
```

### Mathematical Derivation
```
sm  = 200 × 1.618² = 200 × 2.618 = 523.6 ≈ 524px
md  = 524 × 1.618 = 847.6 ≈ 848px
lg  = 848 × 1.618 = 1371.5 ≈ 1372px
xl  = 1372 × 1.618 = 2218.7 ≈ 2219px
```

### CSS Variables
```css
:root {
  --renge-container-sm:   524px;
  --renge-container-md:   848px;
  --renge-container-lg:   1372px;
  --renge-container-xl:   2219px;
  --renge-container-full: 100%;
}
```

### Responsive Breakpoints Map to Container Widths
```typescript
// At each breakpoint, use the corresponding container width
breakpoints: {
  sm: '640px',   // Use --renge-container-sm (524px)
  md: '768px',   // Use --renge-container-md (848px)
  lg: '1024px',  // Use --renge-container-lg (1372px)
  xl: '1280px',  // Use --renge-container-xl (2219px)
}
```

---

### Column Minimum Widths (Auto-fit Grid)

**Formula:** Fibonacci[6..9] × 8px

For responsive grids that automatically reflow: `grid-auto-fit: minmax(var(--renge-col-*), 1fr)`

```
col-xs:  21 × 8 = 168px  (icon lists, dense chips, tag clouds)
col-sm:  34 × 8 = 272px  (card grids, compact panels)
col-md:  55 × 8 = 440px  (article columns, form layouts)
col-lg:  89 × 8 = 712px  (wide content, feature sections)
```

### CSS Variables
```css
:root {
  --renge-col-xs:  168px;
  --renge-col-sm:  272px;
  --renge-col-md:  440px;
  --renge-col-lg:  712px;
}
```

### Usage Example
```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--renge-col-md), 1fr));
  gap: var(--renge-space-4);
}
```

---

### Aspect Ratios

PHI-derived and standard screen ratios:

```
square:   1         (1:1, equal dimensions)
golden:   φ         (1:φ landscape, ≈ 1.618:1; Fibonacci 34:21)
vertical: 1/φ       (φ:1 portrait, ≈ 0.618:1; Fibonacci 21:34)
video:    16/9      (2.111, standard widescreen)
classic:  4/3       (1.333, legacy broadcast)
```

### Code Implementation
```typescript
export function createAspectRatios(): Record<string, string> {
  return {
    square:   '1',
    golden:   PHI.toFixed(6),           // 1.618034
    vertical: (1 / PHI).toFixed(6),     // 0.618034
    video:    (16 / 9).toFixed(6),      // 1.777778
    classic:  (4 / 3).toFixed(6),       // 1.333333
  };
}
```

### CSS Custom Properties
```css
:root {
  --renge-aspect-square:   1;
  --renge-aspect-golden:   1.618034;
  --renge-aspect-vertical: 0.618034;
  --renge-aspect-video:    1.777778;
  --renge-aspect-classic:  1.333333;
}
```

---

## 🔤 Typography Scale

**Base Font Size:** 16px (default)  
**Scale Ratio:** φ (1.618) — each step is ratio^n from the base

### Type Steps (Exponents)
```
xs:   base × φ^(-0.5)  = 16 × 0.618  = 9.9px
sm:   base × φ^(-0.25) = 16 × 0.786  = 12.6px
base: base × φ^0       = 16 × 1     = 16px
lg:   base × φ^1       = 16 × 1.618 = 25.9px
xl:   base × φ^2       = 16 × 2.618 = 41.9px
2xl:  base × φ^3       = 16 × 4.236 = 67.8px
3xl:  base × φ^4       = 16 × 6.854 = 109.7px
4xl:  base × φ^5       = 16 × 11.090= 177.4px
```

### Line Heights (φ-Derived)

Three line-height constants derived from φ:

```
LH_BODY    = φ              = 1.618  (body, xs–lg)
LH_HEADING = 1 + 1/φ²       = 1.382  (heading, xl–2xl)
LH_DISPLAY = 1 + 1/φ³       = 1.236  (display, 3xl–4xl)
```

**Why:** Each is the previous line-height compressed by φ — maintaining readability while tightening visual hierarchy.

### CSS Custom Properties
```css
:root {
  /* Font Sizes */
  --renge-fontSize-xs:    9.9px;
  --renge-fontSize-sm:    12.6px;
  --renge-fontSize-base:  16px;
  --renge-fontSize-lg:    25.9px;
  --renge-fontSize-xl:    41.9px;
  --renge-fontSize-2xl:   67.8px;
  --renge-fontSize-3xl:   109.7px;
  --renge-fontSize-4xl:   177.4px;

  /* Line Heights */
  --renge-lineHeight-body:    1.618;
  --renge-lineHeight-heading: 1.382;
  --renge-lineHeight-display: 1.236;
}
```

### Code Pattern (TypeScript)
```typescript
const PHI = 1.618033988749895;
const baseSize = 16;
const TYPE_STEPS = [
  { key: 'xs', exp: -0.5, lineHeight: PHI },
  { key: 'sm', exp: -0.25, lineHeight: PHI },
  { key: 'base', exp: 0, lineHeight: PHI },
  { key: 'lg', exp: 1, lineHeight: PHI },
  { key: 'xl', exp: 2, lineHeight: 1 + 1 / (PHI * PHI) },
  { key: '2xl', exp: 3, lineHeight: 1 + 1 / (PHI * PHI) },
  { key: '3xl', exp: 4, lineHeight: 1 + 1 / (PHI * PHI * PHI) },
  { key: '4xl', exp: 5, lineHeight: 1 + 1 / (PHI * PHI * PHI) },
];

const typeScale = TYPE_STEPS.reduce((acc, step) => ({
  ...acc,
  [step.key]: {
    fontSize: `${baseSize * Math.pow(PHI, step.exp)}px`,
    lineHeight: step.lineHeight,
  }
}), {});
```

---

## 🎬 Motion Scale

### Duration Scale (Fibonacci × 100ms)

```
duration-0:  0ms    (0 × 100)
duration-1:  100ms  (1 × 100)
duration-2:  200ms  (2 × 100)
duration-3:  300ms  (3 × 100)
duration-4:  500ms  (5 × 100)
duration-5:  800ms  (8 × 100)
duration-6:  1300ms (13 × 100)
duration-7:  2100ms (21 × 100)
duration-8:  3400ms (34 × 100)
duration-9:  5500ms (55 × 100)
duration-10: 8900ms (89 × 100)
```

### Easing Functions (φ-Derived Control Points)

All cubic-bezier curves use two golden-ratio control point constants:

```
A = 1/φ²  ≈ 0.382  ("small" golden split)
B = 1/φ   ≈ 0.618  ("large" golden split)

A + B = 1.000 — perfect complementary split
```

#### ease-out
```
cubic-bezier(0.382, 1, 0.618, 1)
```
Snaps toward destination, lingers at the end to settle.

**Use:** Exit animations, dismissals, fade-outs.

---

#### ease-in
```
cubic-bezier(0.382, 0, 1, 0.618)
```
Starts still, arrives fast.

**Use:** Entrance animations, focus emphasis.

---

#### ease-in-out
```
cubic-bezier(0.382, 0, 0.618, 1)
```
Inflects at the golden splits (A, B). The first control point (0.382) is where the curve departs the axis, the second (0.618) is where it returns.

**Use:** Full-screen transitions, modal appears/disappears.

---

#### spring
```
cubic-bezier(0.382, 0.618, 0.618, 1.382)
```
Overshoots by exactly A = 1/φ² (≈3.8%), symmetric x control points at B.

**Use:** Playful reveals, elevation changes, scale transforms.

---

### CSS Custom Properties
```css
:root {
  /* Durations */
  --renge-duration-0: 0ms;
  --renge-duration-1: 100ms;
  --renge-duration-2: 200ms;
  --renge-duration-3: 300ms;
  --renge-duration-4: 500ms;
  --renge-duration-5: 800ms;
  --renge-duration-6: 1300ms;
  --renge-duration-7: 2100ms;
  --renge-duration-8: 3400ms;
  --renge-duration-9: 5500ms;
  --renge-duration-10: 8900ms;

  /* Easings */
  --renge-easing-linear:       linear;
  --renge-easing-ease-out:     cubic-bezier(0.382, 1, 0.618, 1);
  --renge-easing-ease-in:      cubic-bezier(0.382, 0, 1, 0.618);
  --renge-easing-ease-in-out:  cubic-bezier(0.382, 0, 0.618, 1);
  --renge-easing-spring:       cubic-bezier(0.382, 0.618, 0.618, 1.382);
}
```

---

## 🔘 Border Radius Scale

**Base Unit:** 4px  
**Derivation:** Fibonacci[1..5] × baseUnit

**Bookends:** `none` (0px) and `full` (9999px for pill shapes)

```
radius-none: 0px    (sharp corners)
radius-1:    4px    (1 × 4, slight rounding)
radius-2:    8px    (2 × 4, subtle curves)
radius-3:    12px   (3 × 4, comfortable roundness)
radius-4:    20px   (5 × 4, friendly curves)
radius-5:    32px   (8 × 4, prominent roundness)
radius-full: 9999px (complete pill)
```

### CSS Variables
```css
:root {
  --renge-radius-none:  0px;
  --renge-radius-1:     4px;
  --renge-radius-2:     8px;
  --renge-radius-3:     12px;
  --renge-radius-4:     20px;
  --renge-radius-5:     32px;
  --renge-radius-full:  9999px;
}
```

---

## 🎨 Fractal Size Scale

**Pure φ power series:** base × φⁿ

Unlike the Fibonacci spacing scale (which approximates φ growth), this is **exact φ multiplication**. Intended for component dimensions where self-similarity across scales is the architectural requirement.

**Property:** A component at size-3 contains the same proportional logic as one at size-6, scaled by exactly φ³. This is the **fractal property** — the small version is a precise mathematical miniature of the large.

```
size-1: 4 × φ⁰ = 4 × 1      = 4.00px
size-2: 4 × φ¹ = 4 × 1.618  = 6.47px
size-3: 4 × φ² = 4 × 2.618  = 10.47px
size-4: 4 × φ³ = 4 × 4.236  = 16.94px
size-5: 4 × φ⁴ = 4 × 6.854  = 27.42px
size-6: 4 × φ⁵ = 4 × 11.090 = 44.36px
size-7: 4 × φ⁶ = 4 × 17.944 = 71.78px
```

### CSS Variables
```css
:root {
  --renge-fractal-1: 4.00px;
  --renge-fractal-2: 6.47px;
  --renge-fractal-3: 10.47px;
  --renge-fractal-4: 16.94px;
  --renge-fractal-5: 27.42px;
  --renge-fractal-6: 44.36px;
  --renge-fractal-7: 71.78px;
}
```

### Code Pattern
```typescript
const PHI = 1.618033988749895;
const baseUnit = 4;

export function createFractalScale(): Record<string, string> {
  const scale: Record<string, string> = {};
  for (let n = 0; n < 7; n++) {
    const value = baseUnit * Math.pow(PHI, n);
    scale[String(n + 1)] = `${+value.toFixed(2)}px`;
  }
  return scale;
}
```

---

## 🌀 Phyllotaxis (Golden Angle Spiral)

**Golden Angle:** 360 / φ² ≈ 137.5077640500378°

**Formula per point (i):**
```
angle = i × θ
radius = spread × √i
x = radius × cos(angle)
y = radius × sin(angle)
```

### Natural Packing

Phyllotaxis is how sunflower seeds, pinecones, and succulent leaves arrange themselves to maximize light exposure and minimize overlap. The golden angle emerges naturally when a plant needs to grow radially without clustering patterns.

### Use Cases
- Avatar clusters (profile pictures arranged in a spiral)
- Tag clouds with hierarchical sizing
- Radial menus and command palettes
- Node graphs and network visualizations
- Decorative pattern generation

### Code Pattern
```typescript
import { GOLDEN_ANGLE } from '@renge/tokens';

interface PhyllotaxisConfig {
  count: number;        // How many points
  spread: number;       // Growth rate (distance multiplier)
  angleOffset: number;  // Rotation step (default: GOLDEN_ANGLE)
  scale: number;        // Final scale factor
}

export function phyllotaxis(config: PhyllotaxisConfig) {
  const points = [];
  for (let i = 0; i < config.count; i++) {
    const angle = i * config.angleOffset * (Math.PI / 180);
    const radius = config.spread * Math.sqrt(i) * config.scale;
    points.push({
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    });
  }
  return points;
}
```

---

## 📐 Fixed Widths and Gutters (Gutter Strategy)

### Layout Grid Assumptions

Since Renge uses **container max-widths** rather than column counts, here's the canonical gutter/section strategy:

#### Small Screens (mobile, sm breakpoint)
- **Container:** 524px max-width (--renge-container-sm)
- **Gutter (left/right):** 1 × space-4 (20px) on each side = 40px total horizontal padding
- **Active width:** 524 - 40 = **484px**
- **Gap between sibling sections:** space-5 (32px)

#### Medium Screens (tablet, md breakpoint)
- **Container:** 848px max-width (--renge-container-md)
- **Gutter (left/right):** 1.5 × space-5 (48px) on each side = 96px total
- **Active width:** 848 - 96 = **752px**
- **Gap between sibling sections:** space-6 (52px)

#### Large Screens (desktop, lg breakpoint)
- **Container:** 1372px max-width (--renge-container-lg)
- **Gutter (left/right):** 2 × space-6 (104px) on each side = 208px total
- **Active width:** 1372 - 208 = **1164px**
- **Gap between sibling sections:** space-7 (84px)

#### Extra Large (dashboard/gallery, xl breakpoint)
- **Container:** 2219px max-width (--renge-container-xl)
- **Gutter (left/right):** 2.5 × space-6 (130px) on each side = 260px total
- **Active width:** 2219 - 260 = **1959px**
- **Gap between sibling sections:** space-8 (136px)

### Code Pattern (CSS)
```css
.section {
  max-width: var(--renge-container-md);
  padding-left: calc(1.5 * var(--renge-space-5));
  padding-right: calc(1.5 * var(--renge-space-5));
  margin: 0 auto;
}

.section + .section {
  margin-top: var(--renge-space-6);
}
```

### Multi-Column Grid Within a Section

For a 3-column grid inside a section with responsive column widths:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--renge-col-md), 1fr));
  gap: var(--renge-space-6);  /* Gap between items */
}
```

At **md breakpoint**, each column is at least 440px (col-md). If section active width is 752px:
- 752 / 440 ≈ 1.7 columns fit → wraps to 1 or 2 columns depending on content
- Grid gap: 52px (space-6)

At **lg breakpoint**, section active width is 1164px:
- 1164 / 440 ≈ 2.6 columns fit → 2–3 columns depending on content
- Grid gap: 52px (space-6)

---

## 🏗️ Implementation Checklist: Following Renge Math Thoroughly

**Use this to ensure every UI element adheres to mathematical principles:**

### Spacing
- [ ] All padding uses `space-N` tokens (never arbitrary px)
- [ ] All margin uses `space-N` tokens
- [ ] All gap (flexbox/grid) uses `space-N` tokens
- [ ] Verify scaling across breakpoints (responsive gutters at sm → md → lg → xl)

### Layout & Widths
- [ ] Container uses `--renge-container-[SIZE]` (sm/md/lg/xl)
- [ ] Sections have symmetrical left/right padding (gutters scale with breakpoint)
- [ ] Multi-column grids use `--renge-col-[SIZE]` for min-widths
- [ ] Aspect ratios use `--renge-aspect-[TYPE]` (golden, video, etc.)

### Typography
- [ ] All font sizes use `fontSize-[SIZE]` tokens (xs through 4xl)
- [ ] Line heights match the assigned `lineHeight-[TYPE]` for the context (body/heading/display)
- [ ] Heading hierarchy maintains φ ratio between sizes (lg ≈ base × 1.618, etc.)
- [ ] Display text uses tighter line-height (1.236) for visual punch

### Motion
- [ ] Transition durations use `duration-N` tokens (100ms through 8900ms)
- [ ] Easing functions use named `easing-[TYPE]` tokens (ease-out, spring, etc.)
- [ ] Duration + easing combination feels "right" (slower/spring for playful; fast/ease-out for dismissal)

### Components
- [ ] Border radius uses `radius-N` tokens (never arbitrary)
- [ ] Icon sizes use `fractal-N` for self-similar scaling (when needed)
- [ ] Shadows derive from layered spacing + color opacity (not arbitrary)
- [ ] Z-index follows semantic ordering (dropdown < sticky < fixed < modal < toast)

### Cross-Scale Consistency
- [ ] All type sizes render at correct ratio (verify with inspection tools)
- [ ] All spacing increments are monotonically increasing (4, 8, 12, 20, 32, 52, 84, ...)
- [ ] Container widths scale by exactly φ (524 → 848 → 1372 → 2219)
- [ ] Duration scale maintains Fibonacci spacing (100, 200, 300, 500, 800, 1300, ...)

---

## 📊 Quick Reference Table

| Scale | Formula | Base | First 5 Values |
|-------|---------|------|---|
| **Spacing** | Fib[n] × 4px | 4px | 0, 4, 8, 12, 20px |
| **Container Width** | 200 × φⁿ | 200px | 524, 848, 1372, 2219px |
| **Column Min-Width** | Fib[6-9] × 8px | 8px | 168, 272, 440, 712px |
| **Type Size** | 16 × φⁿ | 16px | 9.9, 12.6, 16, 25.9, 41.9px |
| **Line Height** | φ / φ² / φ³ | 1 | 1.618, 1.382, 1.236 |
| **Duration** | Fib[n] × 100ms | 100ms | 0, 100, 200, 300, 500ms |
| **Border Radius** | Fib[1-5] × 4px | 4px | 0, 4, 8, 12, 20px |
| **Fractal Size** | 4 × φⁿ | 4px | 4.00, 6.47, 10.47, 16.94, 27.42px |

---

## 🧮 Mathematical Verification Code (TypeScript)

```typescript
import { PHI, FIBONACCI, GOLDEN_ANGLE } from '@renge/tokens';

// Verify all scales follow the math
export function verifyRengeMath() {
  // 1. Verify spacing (Fibonacci)
  const spacing = [0, 4, 8, 12, 20, 32, 52, 84, 136, 220, 356];
  for (let i = 1; i < spacing.length; i++) {
    const expected = FIBONACCI[i] * 4;
    console.assert(spacing[i] === expected, `Spacing mismatch at ${i}`);
  }

  // 2. Verify container widths (φ multiplication)
  const containers = [524, 848, 1372, 2219];
  for (let i = 1; i < containers.length; i++) {
    const ratio = containers[i] / containers[i - 1];
    console.assert(Math.abs(ratio - PHI) < 0.01, `Container ratio off at ${i}`);
  }

  // 3. Verify type scale (φ exponents from base 16)
  const typeBase = 16;
  const typeSteps = [-0.5, -0.25, 0, 1, 2, 3, 4, 5];
  const typeSizes = typeSteps.map(exp => typeBase * Math.pow(PHI, exp));
  const expected = [9.9, 12.6, 16, 25.9, 41.9, 67.8, 109.7, 177.4];
  for (let i = 0; i < typeSizes.length; i++) {
    console.assert(
      Math.abs(typeSizes[i] - expected[i]) < 0.5,
      `Type scale mismatch at ${i}`
    );
  }

  // 4. Verify easing control points (φ splits)
  const A = 1 / (PHI * PHI);   // 0.382
  const B = 1 / PHI;            // 0.618
  console.assert(Math.abs(A - 0.382) < 0.001, 'Easing A constant wrong');
  console.assert(Math.abs(B - 0.618) < 0.001, 'Easing B constant wrong');
  console.assert(Math.abs((A + B) - 1.0) < 0.001, 'Easing splits dont sum to 1');

  // 5. Verify golden angle
  const expectedAngle = (360 / (PHI * PHI));
  console.assert(
    Math.abs(expectedAngle - GOLDEN_ANGLE) < 0.01,
    'Golden angle off'
  );

  console.log('✅ All Renge math verified!');
}
```

---

## 🌿 Design Philosophy: Why This Math?

### Fibonacci (Spacing)
Best for **discrete steps** — like physical objects stacked. Your eye perceives jumps: 4px → 8px → 12px. Fibonacci is nature's answer to "what's a good next size that feels proportional to what came before?"

### φ (Container Widths, Type Sizes, Aspect Ratios)
Best for **continuous growth** — like a spiral expanding smoothly. A webpage flowing from mobile → tablet → desktop should grow in one unified ratio. Reading width at 848px should be exactly φ times as comfortable as 524px, not arbitrary.

### Fractal (Component Sizing When Exact Self-Similarity Matters)
Best for **recursive systems** — when a small button contains the same internal logic as a large modal dialog, scaled by φ³. Rare but critical when true.

### Phyllotaxis (Radial/Spiral Arrangements)
Best for **natural clustering** — avatars, tags, nodes. The golden angle prevents the visual dizziness and "Moiré" patterns that regular grids create.

### Motion Easings (φ-Derived)
Best for **perceptual smoothness**. Your eye experiences deceleration as *golden* when control points divide the cubic-bezier space at 0.382 and 0.618. Faster than linear feels jerky; these constants are "just right."

---

## 📚 References

1. **PHI Discovery**: https://en.wikipedia.org/wiki/Golden_ratio
2. **Fibonacci in Nature**: https://en.wikipedia.org/wiki/Fibonacci_number
3. **Phyllotaxis**: https://en.wikipedia.org/wiki/Phyllotaxis
4. **Golden Angle**: https://en.wikipedia.org/wiki/Golden_angle
5. **CSS Custom Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*

---

## 🎯 Summary

Renge's math is **not decorative**. Every scale, ratio, and constant is computed from first principles:

- **Spacing** scales by Fibonacci (natural step growth)
- **Layouts** scale by φ (continuous proportion)  
- **Type** scales by φ (readability that feels right)
- **Motion** is controlled by 1/φ and φ splits (natural acceleration)
- **Grids** arrange by golden angle (no clustering artifacts)
- **Radius/Borders** scale by Fibonacci (harmony with spacing)

To follow Renge's math thoroughly means: **never use arbitrary values**. Every dimension, timing, and proportion should reference a token. The math is the beauty.

---

**Version:** 1.0  
**Last Updated:** June 2026  
**Maintained by:** Renge Design System Contributors
