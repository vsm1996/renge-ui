# Renge Mathematical System — Complete Documentation Index

> **Philosophy:** "Proportion as a first principle. Form and function emerge together. The math is the beauty."

This is a **complete mathematical specification** for the Renge design system, with all widths, gutters, sections, spacing, typography, motion, and layout rules derived from natural mathematics (φ, Fibonacci, phyllotaxis).

---

## 📚 Documentation Files

### 1. **RENGE_MATH_VISUAL_SUMMARY.md** ✓ START HERE
**Best for:** Quick reference, visual learner, 5-minute overview

- Visual breakdown of all scales (spacing, containers, type, motion)
- Responsive gutter strategy (mobile → tablet → desktop → ultra-wide)
- Quick implementation checklist
- Common mistakes to avoid
- One-page visualizations of scale relationships

**Start with this if:** You need a quick visual reference or are new to Renge's math system.

---

### 2. **RENGE_MATH_SPECIFICATION.md** ⭐ THE DEFINITIVE REFERENCE
**Best for:** architects, deep understanding, implementation spec

- **22KB comprehensive reference** covering all scales in detail
- Mathematical foundation (φ, Fibonacci, golden angle)
- Complete derivation for each scale (spacing, layout, typography, motion, radius, fractal)
- Container width math + gutter strategy (all breakpoints)
- Border radius, aspect ratio, phyllotaxis
- Cross-scale consistency rules
- Implementation checklist for builders
- Mathematical verification code (TypeScript)
- Design philosophy behind each choice

**Start with this if:** You're building components and need to understand the **why** behind every choice.

---

### 3. **RENGE_MATH_IMPLEMENTATION_PATTERNS.md** 🛠️ PRACTICAL CODE
**Best for:** developers, copy-paste examples, real-world usage

- **CSS examples** for all spacing use cases (padding, margin, gap)
- **Layout patterns** (container + gutters, multi-column grids, hero sections)
- **Typography examples** (headings, body text, type scales)
- **Motion examples** (animations, transitions, scroll reveals)
- **Component examples** (buttons, cards, inputs, alerts)
- **Phyllotaxis examples** (avatar clusters, tag clouds, radial patterns)
- **TypeScript utilities** for token consumption
- **"Wrong vs. Right" patterns** showing hardcoded vs. token-based approaches

**Start with this if:** You're writing CSS or React components and need concrete code patterns to follow.

---

## 🎯 Quick Navigation

### By Use Case

**I need a quick visual reference:**
→ Read `RENGE_MATH_VISUAL_SUMMARY.md` (10 min)

**I'm building CSS/components and need code patterns:**
→ Read `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` (15 min per section)

**I need to understand the complete mathematical system:**
→ Read `RENGE_MATH_SPECIFICATION.md` (complete reference, 30+ min)

**I'm designing a new component and want to verify it follows Renge math:**
→ Use the checklist in `RENGE_MATH_VISUAL_SUMMARY.md`, then verify against patterns in `RENGE_MATH_IMPLEMENTATION_PATTERNS.md`

**I found a scale that seems wrong:**
→ Verify against tables and formulas in `RENGE_MATH_SPECIFICATION.md`, then check code in `/packages/tokens/src/scales/`

---

## 🧮 The Three Core Constants

All of Renge derives from these three mathematical primitives:

```
φ (Phi)       = 1.618033988...  (golden ratio)
Fibonacci[]   = [1,2,3,5,8,13...]  (natural growth)
θ (Theta)     = 137.5077640°     (golden angle)
```

Every token value is computed from these constants.

---

## 📏 All Scales at a Glance

| Scale | Formula | Base | Examples |
|-------|---------|------|---|
| **Spacing** | Fib[n] × 4px | 4 | 4px, 8px, 12px, 20px, 32px, 52px, 84px |
| **Container Width** | 200 × φⁿ | 200 | 524px, 848px, 1372px, 2219px |
| **Column Min-Width** | Fib[6-9] × 8px | 8 | 168px, 272px, 440px, 712px |
| **Font Size** | 16 × φⁿ | 16 | 9.9px, 12.6px, 16px, 25.9px, 41.9px |
| **Line Height** | φ / φ² / φ³ | 1 | 1.618, 1.382, 1.236 |
| **Duration** | Fib[n] × 100ms | 100 | 100ms, 200ms, 300ms, 500ms, 800ms |
| **Border Radius** | Fib[1-5] × 4px | 4 | 0px, 4px, 8px, 12px, 20px, 32px |
| **Fractal Size** | 4 × φⁿ | 4 | 4px, 6.47px, 10.47px, 16.94px, 27.42px |

---

## ✅ Implementation Checklist

**Essential (Never Break These):**
- [ ] All spacing values use `space-N` tokens
- [ ] All font sizes use `fontSize-*` tokens
- [ ] All containers use `container-*` tokens
- [ ] All border radius uses `radius-N` tokens
- [ ] All motion durations use `duration-N` tokens
- [ ] All easings use `easing-*` tokens
- [ ] No hardcoded color values

**Verification:**
- [ ] Spacing values are monotonically increasing
- [ ] Type sizes maintain φ ratio between steps
- [ ] Container widths multiply by exactly φ
- [ ] Duration scale follows Fibonacci progression
- [ ] Layout responds correctly at all 4 breakpoints (sm/md/lg/xl)

---

## 🌀 Key Concepts

### Fibonacci-Based Scales (Spacing, Radius, Duration)
- Best for **discrete steps** (4px, 8px, 12px, 20px, ...)
- Used when: "What's the next size that feels proportional?"
- Pattern: Each value is the sum of the two previous (1+1=2, 1+2=3, 2+3=5, ...)

### φ-Based Scales (Container Widths, Type Sizes, Aspect Ratios)
- Best for **continuous growth across breakpoints**
- Used when: "How much larger should this be than the previous size?"
- Pattern: Each value is exactly φ (1.618) times the previous

### Fractal Scaling (When True Self-Similarity Matters)
- Used when: A tiny button must have the same internal proportions as a large modal
- Pattern: 4 × φⁿ (exact powers of φ, not Fibonacci approximation)
- Rare but critical for recursive UI

### Phyllotaxis (Spiral Arrangement)
- Used when: Arranging avatars, tags, or nodes in a radial pattern
- Pattern: Golden angle (137.5°) prevents visual clustering
- Found in nature: sunflower seeds, pinecones, plant spirals

### Motion Easing (φ-Derived Control Points)
- All cubic-bezier curves use 1/φ² (≈0.382) and 1/φ (≈0.618) as control points
- These "golden splits" create the smooth, natural-feeling acceleration curves
- A + B = 1.000 (perfect complement)

---

## 🎨 Responsive Gutter Strategy

Gutters scale by breakpoint to maintain reading comfort:

| Breakpoint | Container | Side Gutter | Active Width | Section Gap |
|---|---|---|---|---|
| sm (mobile) | 524px | 20px × 1 | 484px | 32px |
| md (tablet) | 848px | 20px × 2.4 = 48px | 752px | 52px |
| lg (desktop) | 1372px | 20px × 5.2 = 104px | 1164px | 84px |
| xl (ultra) | 2219px | 20px × 6.5 = 130px | 1959px | 136px |

All gutter values are derived from the spacing scale.

---

## 🚨 Common Implementation Mistakes

**❌ DON'T:**
```css
padding: 15px;           /* Arbitrary */
margin: 7px;             /* Arbitrary */
font-size: 18px;         /* Arbitrary */
max-width: 1000px;       /* Arbitrary */
border-radius: 6px;      /* Arbitrary */
```

**✅ DO:**
```css
padding: var(--renge-space-4);            /* 20px — token */
margin: var(--renge-space-3);             /* 12px — token */
font-size: var(--renge-fontSize-lg);      /* 25.9px — token */
max-width: var(--renge-container-md);     /* 848px — token */
border-radius: var(--renge-radius-3);     /* 12px — token */
```

Every value must reference a token. The math is the beauty.

---

## 🧪 Verification Examples

### Verify Spacing Scale
```javascript
const expected = [0, 4, 8, 12, 20, 32, 52, 84, 136, 220, 356];
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
const actual = FIBONACCI.map(f => f * 4);
console.assert(actual.every((v, i) => v === expected[i + 1]));
```

### Verify Container Widths
```javascript
const PHI = 1.618033988749895;
const containers = [524, 848, 1372, 2219];
for (let i = 1; i < containers.length; i++) {
  const ratio = containers[i] / containers[i - 1];
  console.assert(Math.abs(ratio - PHI) < 0.01);  // Should be ~1.618 each
}
```

### Verify Type Scale
```javascript
const PHI = 1.618033988749895;
const base = 16;
const lg = base * Math.pow(PHI, 1);   // 25.9px
const xl = base * Math.pow(PHI, 2);   // 41.9px
console.assert(Math.abs((xl / lg) - PHI) < 0.01);  // Ratio should be φ
```

---

## 📖 Reading Recommendations

**For Designers:**
1. `RENGE_MATH_VISUAL_SUMMARY.md` — Get the visual intuition
2. Philosophy section in `RENGE_MATH_SPECIFICATION.md` — Understand the "why"

**For Frontend Engineers:**
1. `RENGE_MATH_VISUAL_SUMMARY.md` — Quick reference
2. `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` — Copy/paste code patterns
3. `RENGE_MATH_SPECIFICATION.md` — Deep reference as needed

**For Design System Maintainers:**
1. Entire `RENGE_MATH_SPECIFICATION.md` — The Bible
2. `/packages/tokens/src/scales/` — Source of truth
3. `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` — Common patterns

---

## 🔗 Source Code References

The actual token generation code lives in the Renge monorepo:

```
/packages/tokens/src/
  ├── constants.ts            ← φ, Fibonacci, θ definitions
  ├── scales/
  │   ├── spacing.ts          ← Fibonacci × 4px
  │   ├── layout.ts           ← Container widths, column dims, aspect ratios
  │   ├── typography.ts       ← 16 × φⁿ with φ-derived line heights
  │   ├── motion.ts           ← Fibonacci × 100ms + φ-split easings
  │   ├── radius.ts           ← Fibonacci × 4px
  │   ├── fractal.ts          ← 4 × φⁿ (exact powers)
  │   └── animations.ts       ← Keyframe timing
  ├── colors/                 ← OKLCH profiles (Clear, Earth, Twilight)
  ├── phyllotaxis.ts          ← Golden angle spiral math
  ├── theme.ts                ← CSS variable generation
  └── vars.ts                 ← JavaScript token references
```

All scales are generated deterministically from these constants. No magic numbers.

---

## 🎯 Next Steps

1. **Read `RENGE_MATH_VISUAL_SUMMARY.md`** (5 min) for a quick overview
2. **Pick your role:**
   - **Building components?** → Jump to `RENGE_MATH_IMPLEMENTATION_PATTERNS.md`
   - **Understanding the system?** → Read `RENGE_MATH_SPECIFICATION.md`
   - **Verifying math compliance?** → Use checklist and verification code
3. **Reference these docs while coding**
4. **When in doubt, check the source code** in `/packages/tokens/src/scales/`

---

## 💡 Key Takeaway

Renge isn't just consistent spacing—it's **mathematically principled**. Every value derives from φ or Fibonacci. Every scale relationship is exact. Every breakpoint transition is proportional.

By following these scales rigorously, you create visual harmony that **feels correct before anyone knows why**.

The math is the beauty.

---

**Created:** June 2026  
**Audience:** Renge contributors, design system users, builders  
**Maintenance:** Keep in sync with `/packages/tokens/src/`  
**Questions?** Reference `RENGE_MATH_SPECIFICATION.md` or check source code
