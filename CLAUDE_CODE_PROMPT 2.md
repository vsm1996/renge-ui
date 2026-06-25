# Claude Code Handoff: Implement Renge with Mathematical Rigor

## Mission

You are building **Renge** — a design system where every spacing decision, typography step, motion duration, and layout dimension derives from natural mathematics (φ, Fibonacci, phyllotaxis).

**Your job:** Ensure every component, every token, every CSS value follows the mathematical specification provided. No arbitrary numbers. The math is the beauty.

---

## What You're Working With

### The Codebase
- Located: `/Users/vanessa/Desktop/code/_priv/renge`
- Monorepo structure: `packages/tokens`, `packages/react`, `apps/app` (Next.js site)
- Current branch: `feat/renge-enhancements-phase-1`

### The Math (NEW — Read This First)
**5 comprehensive specification documents on your Desktop:**
- `RENGE_MATH_README.md` — Navigation guide + quick reference
- `RENGE_MATH_VISUAL_SUMMARY.md` — Visual diagrams of all scales
- `RENGE_MATH_SPECIFICATION.md` — Definitive reference (22KB, complete derivations)
- `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` — Copy-paste code patterns for every use case
- `RENGE_MATH_INDEX.txt` — One-page quick ref

**Read in this order:**
1. `RENGE_MATH_README.md` (5 min) — Understand what you have
2. `RENGE_MATH_VISUAL_SUMMARY.md` (10 min) — See the scales visually
3. `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` (reference as needed) — Code patterns
4. `RENGE_MATH_SPECIFICATION.md` (deep reference) — When you need exact formulas

---

## The Three Core Constants

**Everything derives from these:**

```
φ (Phi)        = 1.618033988749895     (golden ratio)
Fibonacci[]    = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]    (sequence)
θ (Golden Angle) = 360 / φ² ≈ 137.507764°
```

---

## All Scales Reference (Commit This to Memory)

| Scale | Formula | Base | First 5 Values | CSS Variable |
|-------|---------|------|---|---|
| **Spacing** | Fib[n] × 4px | 4px | 0, 4, 8, 12, 20px | `--renge-space-0` through `--renge-space-10` |
| **Container Width** | 200 × φⁿ | 200px | 524, 848, 1372, 2219px | `--renge-container-sm/md/lg/xl` |
| **Column Min-Width** | Fib[6-9] × 8px | 8px | 168, 272, 440, 712px | `--renge-col-xs/sm/md/lg` |
| **Font Size** | 16 × φⁿ | 16px | 9.9, 12.6, 16, 25.9, 41.9px | `--renge-fontSize-xs` through `--renge-fontSize-4xl` |
| **Line Height** | φ / φ² / φ³ | 1 | 1.618, 1.382, 1.236 | `--renge-lineHeight-body/heading/display` |
| **Duration** | Fib[n] × 100ms | 100ms | 100, 200, 300, 500, 800ms | `--renge-duration-0` through `--renge-duration-10` |
| **Easing** | φ-split curves | — | 0.382, 0.618, 1.0 splits | `--renge-easing-ease-out/in/in-out/spring` |
| **Border Radius** | Fib[1-5] × 4px | 4px | 0, 4, 8, 12, 20, 32px | `--renge-radius-none` through `--renge-radius-full` |
| **Fractal Size** | 4 × φⁿ | 4px | 4, 6.47, 10.47, 16.94, 27.42px | `--renge-fractal-1` through `--renge-fractal-7` |

---

## IMMEDIATE TASK: [Choose One Below Based on Context]

### Option A: Complete Token System Implementation
**If working on `/packages/tokens`:**

Audit and complete the token system to ensure mathematical rigor:

1. **Verify all scale files exist and are correct:**
   - `/packages/tokens/src/scales/spacing.ts` — Fibonacci × 4px ✓
   - `/packages/tokens/src/scales/layout.ts` — Containers + columns + aspect ratios ✓
   - `/packages/tokens/src/scales/typography.ts` — 16 × φⁿ with φ-derived line heights ✓
   - `/packages/tokens/src/scales/motion.ts` — Durations + φ-split easings ✓
   - `/packages/tokens/src/scales/radius.ts` — Fibonacci × 4px ✓
   - `/packages/tokens/src/scales/fractal.ts` — 4 × φⁿ ✓

2. **Generate CSS custom properties correctly:**
   - All variables should follow naming: `--renge-[category]-[name]`
   - No hardcoded values in theme generation
   - Verify every variable has the correct value per spec

3. **Export TypeScript token references:**
   - `rengeVars.space[0]` through `rengeVars.space[10]`
   - `rengeVars.fontSize.*`, `rengeVars.container.*`, etc.
   - All should return `"var(--renge-...)"` strings for CSS consumption

4. **Run tests to verify:**
   - Spacing is monotonically increasing
   - Type scale maintains φ ratio between steps
   - Container widths multiply by φ
   - Duration scale follows Fibonacci
   - All derivations match RENGE_MATH_SPECIFICATION.md

**Acceptance Criteria:**
- [ ] All 8 scale files present and correct
- [ ] CSS variables generated with zero hardcoded values
- [ ] TypeScript token exports work in consuming code
- [ ] Tests pass: `pnpm run test` in tokens package
- [ ] Every scale verifies against spec (use verification code in RENGE_MATH_SPECIFICATION.md)

---

### Option B: Build Components Using the Math
**If working on `/apps/app` or creating new components:**

Build UI components that **rigorously follow the mathematical scales**. No arbitrary spacing, no hardcoded colors, no decisions unmotivated by the system.

**Rules (MANDATORY):**
- ✅ All padding/margin/gap from `--renge-space-N` tokens ONLY
- ✅ All font sizes from `--renge-fontSize-*` tokens ONLY
- ✅ All containers from `--renge-container-*` tokens ONLY
- ✅ All motion from `--renge-duration-N` + `--renge-easing-*` tokens ONLY
- ✅ All border radius from `--renge-radius-N` tokens ONLY
- ✅ All color from CSS variables (never hex values)
- ✅ No approximations. Every value must be exact.

**Example: Building a Button**
```css
.button {
  /* Typography */
  font-size: var(--renge-fontSize-base);      /* 16px — token */
  line-height: var(--renge-lineHeight-body);  /* 1.618 — token */
  
  /* Spacing */
  padding: var(--renge-space-3) var(--renge-space-4);  /* 12px 20px — tokens */
  
  /* Radius */
  border-radius: var(--renge-radius-2);  /* 8px — token */
  
  /* Motion */
  transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
}
```

**Reference:** `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` for all component patterns.

**Acceptance Criteria:**
- [ ] Component renders correctly
- [ ] Every spacing decision uses `--renge-space-N` token
- [ ] Every type decision uses `--renge-fontSize-*` and `--renge-lineHeight-*` tokens
- [ ] No hardcoded values anywhere
- [ ] Responsive behavior scales gutters at each breakpoint (sm/md/lg/xl)
- [ ] DevTools inspection shows only CSS variable references

---

### Option C: Audit & Refactor Existing Code
**If components exist but were built before the math spec:**

Review existing code against RENGE_MATH_SPECIFICATION.md and refactor to remove hardcoded values.

**Process:**
1. Search for hardcoded px values (15px, 23px, 1000px, etc.)
2. Match each to the nearest token in the system
3. Replace with `var(--renge-...)`
4. Verify DevTools shows only token references
5. Test at all breakpoints

**Acceptance Criteria:**
- [ ] Zero hardcoded spacing values
- [ ] Zero hardcoded font sizes
- [ ] Zero hardcoded container widths
- [ ] All motion uses duration + easing tokens
- [ ] All border radius uses token
- [ ] Code audit shows 100% token compliance

---

## Key Checkpoints (Before You Run Tests)

**Math Verification:**
```javascript
// Spacing: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220, 356]
// Container widths: [524, 848, 1372, 2219] each ≈ φ × previous
// Type sizes: each step ≈ φ × prev step
// Durations: [0, 100, 200, 300, 500, 800, 1300, 2100, 3400, 5500, 8900]
```

**Gutter Strategy (All Breakpoints):**
```
mobile (sm):   524px max → 20px padding each side → 484px active width
tablet (md):   848px max → 48px padding each side → 752px active width
desktop (lg):  1372px max → 104px padding each side → 1164px active width
ultra (xl):    2219px max → 130px padding each side → 1959px active width
```

**Common Mistakes to Avoid:**
- ❌ Hardcoded `padding: 15px;` instead of `var(--renge-space-*)`
- ❌ Hardcoded `font-size: 18px;` instead of `var(--renge-fontSize-*)`
- ❌ Arbitrary `max-width: 1000px;` instead of `var(--renge-container-*)`
- ❌ String interpolation of token values instead of CSS vars
- ❌ Approximating scales instead of using exact tokens

---

## Files to Reference While Working

1. **Specification** (for exact formulas):
   - `/Users/vanessa/Desktop/RENGE_MATH_SPECIFICATION.md`

2. **Implementation Patterns** (for CSS/TS code examples):
   - `/Users/vanessa/Desktop/RENGE_MATH_IMPLEMENTATION_PATTERNS.md`

3. **Source of Truth** (the actual token generation):
   - `/packages/tokens/src/scales/*.ts`
   - `/packages/tokens/src/theme.ts` (CSS variable generation)
   - `/packages/tokens/src/vars.ts` (TypeScript token exports)

4. **Tests** (to verify your work):
   - `/packages/tokens/src/__tests__/`

---

## Definition of Done

**For Any Task:**

- [ ] All values match RENGE_MATH_SPECIFICATION.md exactly
- [ ] No hardcoded numbers (all token-based)
- [ ] Tests pass (100% compliance)
- [ ] Code audit shows 100% token usage
- [ ] Responsive behavior verified at all 4 breakpoints
- [ ] DevTools inspection shows only `var(--renge-*)` in computed styles
- [ ] Changes committed with clear message referencing spec

---

## Philosophy (Read This When You Doubt)

> "Proportion as a first principle. Form and function emerge together. The math is the beauty."

Every pixel, every millisecond, every color value is **mathematically derived**. There are no arbitrary decisions. The system is self-consistent and inevitable.

By following the scales rigorously, you create visual harmony that **feels correct before anyone knows why**.

The math is not negotiable. It is the foundation.

---

## Start Here

1. **Read** `RENGE_MATH_README.md` (5 min)
2. **Skim** `RENGE_MATH_VISUAL_SUMMARY.md` (visual overview)
3. **Choose your task** from Option A, B, or C above
4. **Reference** `RENGE_MATH_IMPLEMENTATION_PATTERNS.md` while coding
5. **Verify** against `RENGE_MATH_SPECIFICATION.md` periodically
6. **Run tests** to confirm mathematical compliance

---

## Questions to Ask Me

**Ask if:**
- A scale doesn't match the spec (math error)
- You need clarification on a token's purpose
- A component needs special handling
- Tests fail and you need debugging

**Don't ask:**
- Can I use a hardcoded value instead? (No)
- Can I approximate this token? (No)
- Can I skip a scale? (No)
- Should I use hex colors? (No)

The math is non-negotiable. Everything else is implementation detail.

---

## Ready?

Check the math docs are on your Desktop, pick your task, and start. The system is complete. The math is sound. Your job is to implement it with rigor.

The beauty is in the precision.

**Go build something mathematically inevitable.** ✨
