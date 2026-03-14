# Renge

A design system rooted in the mathematics of natural growth.

Typography scales by the golden ratio. Spacing follows the Fibonacci sequence. Colors are mapped in perceptually uniform OKLCH. Motion accelerates the way living things do — gradually, then all at once.

Renge doesn't guess at proportions. It derives them from the same patterns that govern sunflower spirals, nautilus shells, and the branching of trees. The result is an interface that *feels* right before you can explain why.

---

## Philosophy

### Bias, Not Law

Nature uses φ statistically, not dogmatically. Renge does the same. Proportions follow the golden ratio as a scaling heuristic, not a rigid grid. An optional tolerance system introduces bounded micro-variance — deterministic, seed-based drift that keeps surfaces from feeling machine-stamped.

```
targetScale = base × φⁿ ± smallNoise
```

That `±` is what keeps it alive.

### Form Without Behavior

Renge defines how an interface *looks* — proportion, rhythm, color, motion cadence. It has no opinion on how an interface *behaves*. No state management, no adaptation logic, no user profiling. That separation is intentional.

If you need capacity-aware behavior, [Harmonia UI](https://github.com/vsm1996/harmonia-ui) consumes Renge tokens and modulates them based on human state. Renge never knows Harmonia exists. The dependency flows one direction.

```
@renge/tokens       ← proportional source of truth
       ↑
@renge/react        ← optional component layer
       ↑
harmonia-ui         ← behavioral layer (consumes Renge)
       ↑
your app            ← consumes one, both, or neither
```

### Self-Similar at Every Scale

Components follow fractal design principles — a card at 200px and a card at 800px maintain the same internal proportions. Spacing, type, and density scale together. Nothing breaks when the container changes.

---

## Packages

| Package | Purpose | Status |
|---------|---------|--------|
| `@renge/tokens` | Design tokens — spacing, typography, color, motion, radius, animation, phyllotaxis | ✅ v0.1 |
| `@renge/react` | Component primitives — Stack, Grid, Text, Card, Button, Heading, Divider, Section | ✅ v0.1 |
| `@renge/tailwind` | Tailwind CSS preset | Planned |

---

## Quick Start

```bash
pnpm add @renge/tokens
```

```ts
import { createRengeTheme } from '@renge/tokens';

const theme = createRengeTheme();

// Inject into your document
const style = document.createElement('style');
style.textContent = theme.css;
document.head.appendChild(style);
```

That gives you the full set of CSS custom properties — spacing, type, motion, radius, and color — ready to use anywhere.

---

## The Scales

### Spacing — Fibonacci × base unit

Each step is a Fibonacci number multiplied by the base unit (default: 4px). Growth accelerates the way branches do — tight at first, then increasingly open.

| Token | Value |
|-------|-------|
| `--renge-space-1` | 4px |
| `--renge-space-2` | 8px |
| `--renge-space-3` | 12px |
| `--renge-space-4` | 20px |
| `--renge-space-5` | 32px |
| `--renge-space-6` | 52px |
| `--renge-space-7` | 84px |
| `--renge-space-8` | 136px |
| `--renge-space-9` | 220px |
| `--renge-space-10` | 356px |

### Typography — φ-based progression

Font sizes scale by powers of the golden ratio from a 16px base. Small text contracts. Display text expands. The intervals feel inevitable rather than chosen.

| Token | Size | Line Height |
|-------|------|-------------|
| `--renge-font-size-xs` | ~6.1px | 1.5 |
| `--renge-font-size-sm` | ~9.9px | 1.5 |
| `--renge-font-size-base` | 16px | 1.6 |
| `--renge-font-size-lg` | ~25.9px | 1.4 |
| `--renge-font-size-xl` | ~41.9px | 1.3 |
| `--renge-font-size-2xl` | ~67.8px | 1.2 |
| `--renge-font-size-3xl` | ~109.7px | 1.2 |
| `--renge-font-size-4xl` | ~177.4px | 1.2 |

### Motion — Fibonacci durations

Animation timing follows Fibonacci intervals. Short transitions feel snappy. Long ones breathe. The easing curves are tuned for specific interaction types.

| Token | Duration | Use |
|-------|----------|-----|
| `--renge-duration-1` | 100ms | Micro-interactions |
| `--renge-duration-2` | 200ms | Hover states |
| `--renge-duration-3` | 300ms | Transitions |
| `--renge-duration-4` | 500ms | Page elements |
| `--renge-duration-5` | 800ms | Complex transitions |
| `--renge-duration-6` | 1300ms | Quick animations |
| `--renge-duration-7` | 2100ms | — |
| `--renge-duration-8` | 3400ms | — |
| `--renge-duration-9` | 5500ms | Natural animations |
| `--renge-duration-10` | 8900ms | Slow animations (breathe, bloom) |

| Easing | Curve | Use |
|--------|-------|-----|
| `--renge-easing-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances |
| `--renge-easing-ease-in` | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | Exits |
| `--renge-easing-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Playful interactions |

### Radius — Fibonacci-based

```
none → 0px
1 → 4px  ·  2 → 8px  ·  3 → 12px  ·  4 → 20px  ·  5 → 32px
full → 9999px
```

---

## Color System

Three layers. Components only touch the outermost one.

### Palette → Semantic → Profile

**Palette** — 43 raw OKLCH colors drawn from nature. Sky blues, earth browns, indigos, moss greens, sunset oranges. These are never consumed directly by components.

**Semantic** — 22 role-based tokens that components actually use: `--renge-color-bg`, `--renge-color-fg`, `--renge-color-accent`, `--renge-color-danger`, etc.

**Profiles** — Mappings from palette to semantic. Switch the profile, switch the entire mood.

| Profile | Character | Accent |
|---------|-----------|--------|
| **Ocean** | Bright, airy | Sky blue |
| **Earth** | Grounded, warm | Earthy ochre |
| **Twilight** | Dark, cool | Lavender |

```ts
import { createRengeTheme } from '@renge/tokens';

// Default: Ocean
const light = createRengeTheme();

// Grounded alternative
const warm = createRengeTheme({ profile: 'earth' });

// Dark mode
const dark = createRengeTheme({ profile: 'twilight' });
```

---

## Configuration

Everything has a sensible default. Everything is configurable.

```ts
import { createRengeTheme, PHI } from '@renge/tokens';

const theme = createRengeTheme({
  baseUnit: 4,           // Spacing multiplier (px)
  typeBase: 16,          // Root font size (px)
  scaleRatio: PHI,       // Typography scale ratio (φ = (1 + √5) / 2)
  profile: 'ocean',      // Color profile
  variance: 0,           // Tolerance band (0 = disabled)
  varianceSeed: 'renge', // Deterministic seed for variance
  includeReset: false,   // Inject minimal CSS reset
  selector: ':root',     // CSS selector for variables
});

theme.css;    // Complete CSS string, ready to inject
theme.vars;   // JS object of all custom properties
theme.config; // Resolved configuration
```

---

## Tolerance

Opt-in. Deterministic. Bounded.

When `variance` is set above 0, spacing, radius, and motion values drift slightly from their mathematical targets — always reproducibly (same seed = same output), always within bounds.

**Allowed:** spacing, radius, motion timing.
**Never allowed:** font size, contrast, meaning-bearing layout.

```ts
const theme = createRengeTheme({
  variance: 0.05,
  varianceSeed: 'my-project',
});
```

This is implementation intent, not chaos. The drift is what keeps surfaces from feeling machine-stamped while preserving accessibility and readability.

---

## Phyllotaxis

A utility for golden-angle spiral arrangements — the same pattern that positions seeds in a sunflower head.

```ts
import { phyllotaxis } from '@renge/tokens';

const points = phyllotaxis({
  count: 50,
  spread: 10,
  scale: 1,
});

// Returns: [{ x, y, index, angle, radius }, ...]
```

Use for avatar clusters, tag clouds, decorative patterns, radial menus, or data visualization nodes.

---

## The Name

蓮華 (Renge) — the lotus flower. It blooms in muddy water. Seeding and blooming, cause and effect arise simultaneously.

A design system built on natural proportions, named for the principle that form and function emerge together. The math *is* the beauty. The structure *is* the expression.

---

## License

MIT