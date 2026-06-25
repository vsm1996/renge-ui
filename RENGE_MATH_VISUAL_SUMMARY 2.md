# Renge Math — Visual Summary & Implementation Quick Start

> **"Proportion as a first principle. Form and function emerge together. The math is the beauty."**

---

## 🎯 The Three Core Constants

```
┌─────────────────────────────────────┐
│ φ (Phi)        = 1.618033988...     │  The golden ratio
│ φ² (Phi²)      = 2.618033988...     │  Phi squared
│ θ (Theta)      = 137.507764°        │  Golden angle (360/φ²)
│ FIB[]          = [1,2,3,5,8,13,..] │  Fibonacci sequence
└─────────────────────────────────────┘
```

---

## 📏 All Renge Scales at a Glance

### Spacing (Fibonacci × 4px)
```
0    4    8    12   20   32   52   84   136  220  356
├──┤ ├──┤ ├──┤ ├───┤ ├───┤ ├──┤ ├───┤ ├───┤ ├────┤
 0   1   2   3   4   5   6   7   8    9    10
    Base unit: 4px
    Each step is Fibonacci: 1×4, 2×4, 3×4, 5×4, ...
```

**CSS Variables:** `--renge-space-0` through `--renge-space-10`  
**Use for:** padding, margin, gap — ALL internal/external spacing

---

### Container Widths (200 × φⁿ)
```
524px ← φ → 848px ← φ → 1372px ← φ → 2219px
 ↑           ↑          ↑            ↑
 sm          md         lg           xl
 
 Base: 200px
 Each step multiplies by exactly φ (1.618)
```

**Math Check:**
- 200 × φ² = 523.6 ≈ 524px ✓
- 524 × φ = 847.6 ≈ 848px ✓
- 848 × φ = 1371.5 ≈ 1372px ✓
- 1372 × φ = 2218.7 ≈ 2219px ✓

**CSS Variables:** `--renge-container-sm`, `--renge-container-md`, `--renge-container-lg`, `--renge-container-xl`, `--renge-container-full`

---

### Column Min-Widths (Fibonacci × 8px)
```
168px  ← Fib[6]×8
272px  ← Fib[7]×8
440px  ← Fib[8]×8
712px  ← Fib[9]×8

Use for: grid-template-columns: repeat(auto-fit, minmax(var(--renge-col-md), 1fr))
```

---

### Typography Sizes (16 × φⁿ)
```
SIZE    EXPONENT   FORMULA           RESULT
xs      φ^(-0.5)   16 × 0.618          9.9px
sm      φ^(-0.25)  16 × 0.786         12.6px
base    φ^0        16 × 1.000         16.0px
lg      φ^1        16 × 1.618         25.9px ← ratio 1.618 from base
xl      φ^2        16 × 2.618         41.9px ← ratio 1.618 from lg
2xl     φ^3        16 × 4.236         67.8px ← ratio 1.618 from xl
3xl     φ^4        16 × 6.854        109.7px ← ratio 1.618 from 2xl
4xl     φ^5        16 × 11.090       177.4px ← ratio 1.618 from 3xl
```

**Every step is φ times the previous** — the ratio is mathematically perfect.

### Line Heights
```
TYPE      VALUE   WHERE
body      1.618   xs, sm, base, lg (most text)
heading   1.382   xl, 2xl (subheadings)
display   1.236   3xl, 4xl (headlines)
```

All derived from φ:
- 1.618 = φ (golden ratio)
- 1.382 = 1 + 1/φ² (first compression)
- 1.236 = 1 + 1/φ³ (second compression)

---

### Motion Durations (Fibonacci × 100ms)
```
0ms   100ms  200ms  300ms  500ms  800ms  1300ms  2100ms  3400ms  5500ms  8900ms
 0     1      2      3      4      5       6       7       8       9      10
```

**Best practices:**
- UI interactions: 100–500ms
- Page transitions: 500–1300ms  
- Long animations: 2100ms+

---

### Motion Easings (φ-Derived Control Points)
```
                Control Points (Cubic-Bezier)

ease-out       (0.382, 1,     0.618, 1)      ▄▄▄▄▄▄▄▄▄▄▇ snap & settle
ease-in        (0.382, 0,     1,     0.618)  ▁▁▁▁▁▁▁▁▁▁█ slow start, fast end
ease-in-out    (0.382, 0,     0.618, 1)      ▁▁▁▁▄▄▄▄██ inflect at center
spring         (0.382, 0.618, 0.618, 1.382)  ▁▁▁▁▄▄▄▄▄▇▛ overshoot ~3.8%

              ↑           ↑
              A = 0.382   B = 0.618  (inverse golden splits)
              (1/φ²)      (1/φ)

              A + B = 1.000 (complementary)
```

---

### Border Radius (Fibonacci × 4px)
```
none  1    2    3     4     5     full
0px   4px  8px  12px  20px  32px  9999px
      1×4  2×4  3×4   5×4   8×4
```

**Use for:** All rounded corners, keep it consistent.

---

### Fractal Scale (4 × φⁿ)
```
size-1  →  4.00px  (4 × φ⁰)
size-2  →  6.47px  (4 × φ¹)
size-3  → 10.47px  (4 × φ²)
size-4  → 16.94px  (4 × φ³)
size-5  → 27.42px  (4 × φ⁴)
size-6  → 44.36px  (4 × φ⁵)
size-7  → 71.78px  (4 × φ⁶)

Use when: A small component must contain the exact same
internal proportions as a larger one, just scaled by φⁿ.
Rare but critical for recursive UI.
```

---

## 🔧 Gutters & Layout Grid Strategy

### Responsive Padding by Breakpoint

```
BREAKPOINT    CONTAINER     SIDE PADDING      ACTIVE WIDTH    GAP BETWEEN
─────────────────────────────────────────────────────────────────────────
sm (mobile)   524px    →  20px each side  =  484px          32px
md (tablet)   848px    →  48px each side  =  752px          52px
lg (desktop)  1372px   →  104px each side =  1164px         84px
xl (ultra)    2219px   →  130px each side =  1959px         136px
```

### CSS Implementation
```css
.container {
  max-width: var(--renge-container-md);
  padding-left: calc(1.5 * var(--renge-space-5));    /* 48px */
  padding-right: calc(1.5 * var(--renge-space-5));   /* 48px */
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .container {
    max-width: var(--renge-container-lg);
    padding-left: calc(2 * var(--renge-space-6));    /* 104px */
    padding-right: calc(2 * var(--renge-space-6));   /* 104px */
  }
}
```

### Multi-Column Grid Within Section
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--renge-col-md), 1fr));
  gap: var(--renge-space-6);  /* 52px */
}

/* At md: ~1-2 columns (752px / 440px) */
/* At lg: ~2-3 columns (1164px / 440px) */
/* At xl: ~4-5 columns (1959px / 440px) */
```

---

## ✅ Implementation Checklist

### Mandatory (Must Follow)
- [ ] All padding/margin/gap use `space-N` tokens
- [ ] All font sizes use `fontSize-*` tokens
- [ ] All borders/radius use `radius-N` tokens
- [ ] Column widths reference `col-*` for grids
- [ ] Container max-width references `container-*`
- [ ] Type line-height matches semantic context (body/heading/display)
- [ ] Transitions use `duration-N` + `easing-*` tokens
- [ ] No hardcoded color values (use CSV variables only)

### Verification  
- [ ] Spacing values are monotonically increasing (4 < 8 < 12 < 20 < ...)
- [ ] Type sizes maintain φ ratio between steps (verify with DevTools)
- [ ] Container widths multiply by φ (verify math)
- [ ] Duration scale follows Fibonacci (verify in dev tools)
- [ ] Layout responds gracefully at all four breakpoints

---

## 🎨 The Golden Ratio in Action

### 1:φ Rectangle (Golden Rectangle)
```
Width = 1 unit
Height = φ unit (1.618)

┌─────────────────────────┐
│                         │
│        CONTENT          │ ← 1.618:1
│                         │
└─────────────────────────┘

Used for: aspectRatio golden
```

### φ Spiral (Phyllotaxis)
```
     *
   *   *
 *       *
*         *
  *     *
    * *
     ▌

Angle between each point: 137.5° (golden angle)
Distance: spread × √(index)

Used for: Avatar clusters, tag clouds, radial patterns
```

---

## 🚨 Common Mistakes to Avoid

**❌ DON'T:**
```css
/* Arbitrary spacing */
padding: 15px;
margin: 7px;
gap: 22px;

/* Arbitrary font size */
font-size: 18px;

/* Hardcoded container width */
max-width: 1000px;

/* Random border radius */
border-radius: 6px;
```

**✅ DO:**
```css
/* Always use tokens */
padding: var(--renge-space-4);        /* 20px */
margin: var(--renge-space-3);         /* 12px */
gap: var(--renge-space-6);            /* 52px */

/* Always use type tokens */
font-size: var(--fontSize-lg);        /* 25.9px */

/* Always use container tokens */
max-width: var(--renge-container-md); /* 848px */

/* Always use radius tokens */
border-radius: var(--renge-radius-3); /* 12px */
```

---

## 🧮 Quick Math Verification

### "Is my spacing scale right?"
```javascript
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const spacing = FIBONACCI.map(n => n * 4); // [4, 8, 12, 20, 32, 52, 84, 136, 220, 356]
```

### "Is my type scale right?"
```javascript
const PHI = 1.618033988749895;
const base = 16;
const lg = base * Math.pow(PHI, 1);  // 25.9px
const xl = base * Math.pow(PHI, 2);  // 41.9px
// xl / lg should equal ~1.618
console.log(xl / lg);  // 1.618 ✓
```

### "Is my container width right?"
```javascript
const PHI = 1.618033988749895;
const containers = [524, 848, 1372, 2219];
// Each should be ~1.618× the previous
for (let i = 1; i < containers.length; i++) {
  const ratio = containers[i] / containers[i - 1];
  console.log(ratio); // Should be ~1.618 each time ✓
}
```

---

## 📖 Reading Order

1. **This document** — Visual overview and quick reference
2. **RENGE_MATH_SPECIFICATION.md** — Full math derivation and detailed formulas
3. **IMPLEMENTATION_PLAN.md** — How to build components using these scales
4. **Code in `/packages/tokens/src/scales/`** — Source of truth

---

## 🌟 Remember

Renge is built on **natural mathematics**. Every spacing decision, every type step, every motion duration is computed from φ or Fibonacci. There are no arbitrary numbers.

By following these scales rigorously, you don't just build consistent UI — you create **visual harmony** that feels correct without anyone knowing why.

The math is the beauty.

---

**Last Updated:** June 2026  
**Reference:** RENGE_MATH_SPECIFICATION.md
