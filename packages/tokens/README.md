# @renge-ui/tokens

> Design tokens for the Renge design system — φ-based typography, Fibonacci spacing, OKLCH colors, natural motion.

[![npm version](https://img.shields.io/npm/v/@renge-ui/tokens)](https://www.npmjs.com/package/@renge-ui/tokens)
[![license](https://img.shields.io/npm/l/@renge-ui/tokens)](https://github.com/vsm1996/renge-ui/blob/main/LICENSE.md)

Zero dependencies. Generates a complete set of CSS custom properties from mathematical first principles — golden ratio typography, Fibonacci spacing, OKLCH color profiles, and φ-derived motion curves. Every value traces back to a formula, not a guess.

---

## Install

```bash
pnpm add @renge-ui/tokens
# or
npm install @renge-ui/tokens
```

---

## Quick Start

```ts
import { createRengeTheme } from '@renge-ui/tokens';

const theme = createRengeTheme({ profile: 'ocean', mode: 'light' });

const style = document.createElement('style');
style.textContent = theme.css;
document.head.appendChild(style);

// CSS variables are now available on :root
// var(--renge-color-bg), var(--renge-space-4), var(--renge-font-size-lg) ...
```

**Next.js (server-side, no flash):**

```tsx
// app/layout.tsx
import { createRengeTheme } from '@renge-ui/tokens';

export default function RootLayout({ children }) {
  const theme = createRengeTheme({ profile: 'ocean' });
  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: theme.css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## API

### `createRengeTheme(config?)`

The main entry point. Returns `{ config, vars, css }`.

| Field | Type | Description |
|-------|------|-------------|
| `css` | `string` | Complete CSS ready to inject — `:root { --renge-* ... }` |
| `vars` | `Record<string, string>` | All `--renge-*` custom properties as a JS object |
| `config` | `Required<RengeThemeConfig>` | Resolved configuration with all defaults applied |

#### Configuration

```ts
const theme = createRengeTheme({
  baseUnit:      4,           // Spacing multiplier in px. Default: 4
  typeBase:      16,          // Root font size in px. Default: 16
  scaleRatio:    1.618,       // Typography scale ratio (φ). Default: PHI
  profile:       'ocean',     // Color profile. Default: 'ocean'
  mode:          'light',     // 'light' | 'dark'. Default: 'light'
  variance:      0,           // Tolerance band 0–1 (0 = disabled). Default: 0
  varianceSeed:  'renge',     // Seed for deterministic variance. Default: 'renge'
  includeReset:  false,       // Inject minimal CSS reset. Default: false
  selector:      ':root',     // CSS selector for variables. Default: ':root'
});
```

---

## Static Token References — `rengeVars`

`rengeVars` is a statically typed object of all CSS variable references. Use it instead of constructing `var(--renge-*)` strings by hand — full IDE autocomplete, no typos, no prefix guessing.

```ts
import { rengeVars } from '@renge-ui/tokens';

// All values are literal CSS var() strings
rengeVars.color.bg          // "var(--renge-color-bg)"
rengeVars.color.bgSubtle    // "var(--renge-color-bg-subtle)"
rengeVars.color.accent      // "var(--renge-color-accent)"
rengeVars.space[4]          // "var(--renge-space-4)"
rengeVars.fontSize.lg       // "var(--renge-font-size-lg)"
rengeVars.duration[3]       // "var(--renge-duration-3)"
rengeVars.radius[2]         // "var(--renge-radius-2)"
rengeVars.easing.out        // "var(--renge-easing-ease-out)"
```

### Mapping to another system's tokens

```ts
import { createRengeTheme, rengeVars } from '@renge-ui/tokens';

const theme = createRengeTheme({ profile: 'earth', mode: 'light' });

// Direct mapping — no resolveVar() or prefix guessing needed
const aliases: [string, string][] = [
  ['--color-bg-primary',    rengeVars.color.bg],
  ['--color-bg-secondary',  rengeVars.color.bgSubtle],
  ['--color-text-primary',  rengeVars.color.fg],
  ['--color-accent',        rengeVars.color.accent],
  ['--color-error',         rengeVars.color.danger],
  ['--color-success',       rengeVars.color.success],
];

const aliasCSS = `:root {\n${aliases.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
document.head.insertAdjacentHTML('beforeend', `<style>${theme.css}\n${aliasCSS}</style>`);
```

### Available keys

| Group | Keys |
|-------|------|
| `color` | `bg`, `bgSubtle`, `bgMuted`, `bgInverse`, `fg`, `fgSubtle`, `fgMuted`, `fgInverse`, `border`, `borderSubtle`, `borderFocus`, `accent`, `accentHover`, `accentSubtle`, `success`, `successSubtle`, `warning`, `warningSubtle`, `danger`, `dangerSubtle`, `info`, `infoSubtle` |
| `space` | `0` – `10` |
| `fontSize` | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl` |
| `lineHeight` | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl` |
| `duration` | `0` – `9` |
| `easing` | `linear`, `out`, `in`, `inOut`, `spring` |
| `radius` | `none`, `1` – `5`, `full` |

---

## Generated Tokens

All tokens are CSS custom properties under the `--renge-*` namespace.

### Spacing — `--renge-space-{0–10}`

Each step is `FIBONACCI[n] × baseUnit`. Default baseUnit = 4px.

| Token | Fibonacci | Default value |
|-------|-----------|---------------|
| `--renge-space-0` | 0 | 0px |
| `--renge-space-1` | 1 | 4px |
| `--renge-space-2` | 1 | 4px |
| `--renge-space-3` | 3 | 12px |
| `--renge-space-4` | 5 | 20px |
| `--renge-space-5` | 8 | 32px |
| `--renge-space-6` | 13 | 52px |
| `--renge-space-7` | 21 | 84px |
| `--renge-space-8` | 34 | 136px |
| `--renge-space-9` | 55 | 220px |
| `--renge-space-10` | 89 | 356px |

Growth is non-linear by design. Steps 1–4 are tight (4–20px). Steps 5–8 open up into structural spacing.

### Typography — `--renge-font-size-{size}` + `--renge-line-height-{size}`

Formula: `typeBase × scaleRatio^n` where n ranges from −2 to +5.

| Token | Formula | Default |
|-------|---------|---------|
| `--renge-font-size-xs` | base × φ⁻² | ~6.1px |
| `--renge-font-size-sm` | base × φ⁻¹ | ~9.9px |
| `--renge-font-size-base` | base × φ⁰ | 16px |
| `--renge-font-size-lg` | base × φ¹ | ~25.9px |
| `--renge-font-size-xl` | base × φ² | ~41.9px |
| `--renge-font-size-2xl` | base × φ³ | ~67.8px |
| `--renge-font-size-3xl` | base × φ⁴ | ~109.7px |
| `--renge-font-size-4xl` | base × φ⁵ | ~177.4px |

Line heights: `xs`/`sm`/`base`/`lg` → 1.618 (φ) · `xl`/`2xl` → 1.382 (1/φ + 1) · `3xl`/`4xl` → 1.236

### Motion — `--renge-duration-{0–10}` + `--renge-easing-{curve}`

Durations: `FIBONACCI[n] × 100ms`.

| Token | Duration | Typical use |
|-------|----------|-------------|
| `--renge-duration-0` | 0ms | Instant / disabled |
| `--renge-duration-1` | 100ms | Micro-interactions |
| `--renge-duration-2` | 200ms | Hover states |
| `--renge-duration-3` | 300ms | Button presses |
| `--renge-duration-4` | 500ms | Component transitions |
| `--renge-duration-5` | 800ms | Page element reveals |
| `--renge-duration-6` | 1300ms | Complex transitions |
| `--renge-duration-7` | 2100ms | Orchestrated sequences |
| `--renge-duration-8` | 3400ms | Extended animations |
| `--renge-duration-9` | 5500ms | Ambient / looping |

Easing curves — all control points derived from φ (A = 1/φ² ≈ 0.382, B = 1/φ ≈ 0.618):

| Token | Curve | Use |
|-------|-------|-----|
| `--renge-easing-linear` | `linear` | Progress bars, scrubbing |
| `--renge-easing-ease-out` | `cubic-bezier(0.382, 1, 0.618, 1)` | Entrances |
| `--renge-easing-ease-in` | `cubic-bezier(0.382, 0, 1, 0.618)` | Exits |
| `--renge-easing-ease-in-out` | `cubic-bezier(0.382, 0, 0.618, 1)` | Balanced transitions |
| `--renge-easing-spring` | `cubic-bezier(0.382, 0.618, 0.618, 1.382)` | Playful overshoot |

### Radius — `--renge-radius-{none|1–5|full}`

| Token | Default value |
|-------|---------------|
| `--renge-radius-none` | 0px |
| `--renge-radius-1` | 4px |
| `--renge-radius-2` | 8px |
| `--renge-radius-3` | 12px |
| `--renge-radius-4` | 20px |
| `--renge-radius-5` | 32px |
| `--renge-radius-full` | 9999px |

### Animations — `--renge-animation-*`

15 named animation tokens included in `createRengeTheme()` output alongside their `@keyframes` definitions. Apply via the CSS variable or the `animation` prop on `@renge-ui/react` components:

```css
.my-element {
  animation: var(--renge-animation-bloom);
}
```

Available: `vortex-reveal`, `helix-rise`, `sacred-fade`, `spiral-in`, `morph-fade-in`, `bloom`, `pulse`, `vibrate`, `wave`, `breathe`, `fall`, `float`, `float-wave`, `pulse-color-shift`, `swelling`.

---

## Color System

Three layers. Consumer code only touches the outermost.

```
palette (43 raw OKLCH colors)
    ↓
profile (semantic mapping: palette → 22 role tokens)
    ↓
--renge-color-* (what components reference)
```

### Why OKLCH

OKLCH is perceptually uniform — a 10-point change in `L` always looks like the same change in lightness, regardless of hue. Contrast ratios are reliable. Dark mode is math, not guesswork.

### Profiles

All profiles have `light` and `dark` variants.

| Profile | Character | Notes |
|---------|-----------|-------|
| `ocean` | Bright, airy — sky blue accent | Default |
| `earth` | Grounded, warm — earthy ochre | Warm neutrals |
| `twilight` | Cool, atmospheric — lavender | Works well as dark mode |
| `fire` | Energetic, warm — amber-orange | High energy |
| `void` | Deep, minimal — muted indigo | Maximum contrast |
| `leaf` | Fresh, natural — moss green | Organic |

```ts
const theme = createRengeTheme({ profile: 'earth', mode: 'dark' });
```

### Semantic Tokens (22)

Components reference these — never raw palette colors.

| Role | Tokens |
|------|--------|
| Background | `bg`, `bg-subtle`, `bg-muted`, `bg-inverse` |
| Foreground | `fg`, `fg-subtle`, `fg-muted`, `fg-inverse` |
| Border | `border`, `border-subtle`, `border-focus` |
| Interactive | `accent`, `accent-hover`, `accent-subtle` |
| Status | `success`, `success-subtle`, `warning`, `warning-subtle`, `danger`, `danger-subtle`, `info`, `info-subtle` |

CSS variable name: `--renge-color-{token}` (e.g. `--renge-color-accent-hover`).

---

## Tolerance / Variance

When `variance > 0`, spacing, radius, and motion values drift from their mathematical targets via a deterministic seeded PRNG. Same seed always produces the same output.

```ts
const theme = createRengeTheme({
  variance:     0.05,         // max 5% drift
  varianceSeed: 'my-project', // deterministic
});
```

**Affected:** spacing, radius, motion timing.
**Never affected:** font size, contrast ratios, meaning-bearing layout.

---

## TypeScript Types

```ts
import type {
  RengeThemeConfig,   // createRengeTheme() input
  RengeTheme,         // createRengeTheme() return type
  RengeVars,          // typeof rengeVars
  OklchColor,         // { l: number, c: number, h: number }
  SemanticColorMap,   // All 22 semantic color role keys
  SemanticColor,      // keyof SemanticColorMap
  ProfileName,        // 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
  ProfileMode,        // 'light' | 'dark'
  ProfileVariant,     // { light: SemanticColorMap, dark: SemanticColorMap }
  PhyllotaxisPoint,   // { x, y, index, angle, radius }
  PhyllotaxisConfig,  // { count, spread?, angleOffset?, scale? }
} from '@renge-ui/tokens';
```

---

## Advanced Exports

```ts
import {
  // Scale generators
  createSpacingScale,
  createTypeScale,
  createDurationScale,
  createEasingTokens,
  createRadiusScale,
  createFractalScale,
  FRACTAL_STEPS,
  createAnimationVars,
  createAnimationKeyframesCSS,
  ANIMATION_NAMES,       // string[] of all 15 animation names

  // Color utilities
  palette,
  oklch,
  createPaletteVars,
  profiles,
  getProfile,
  createSemanticColorVars,

  // Geometry
  phyllotaxis,

  // Math constants
  PHI,
  GOLDEN_ANGLE,
  FIBONACCI,
} from '@renge-ui/tokens';
```

### `phyllotaxis(config)`

Generates point coordinates in a golden-angle spiral arrangement — the same pattern as sunflower seeds and nautilus shells.

```ts
const points = phyllotaxis({
  count:       50,
  spread:      10,     // Density factor. Default: 10
  angleOffset: 137.5,  // Degrees. Default: GOLDEN_ANGLE (137.5°)
  scale:       1,      // Growth factor. Default: 1
});
// Returns: [{ x, y, index, angle, radius }, ...]
```

### `getProfile(name, mode?)`

Returns a `SemanticColorMap` for a given profile and mode without generating a full theme.

```ts
import { getProfile } from '@renge-ui/tokens';

const colors = getProfile('earth', 'dark');
// colors.accent → the earth-dark accent color value
```

---

## Trade-offs

**Fibonacci spacing is non-linear.** `space-3` + `space-3` ≠ `space-4`. Design to the scale, not around it.

**φ-typography produces extreme values at the edges.** `xs` (~6px) and `4xl` (~177px) are rarely useful as body text. The scale is designed for display headings. Stay between `sm` and `xl` for reading copy.

**OKLCH requires modern browsers.** Chrome 111+, Firefox 113+, Safari 16.4+.

**CSS custom properties require injection.** For critical-path rendering, generate `theme.css` server-side and embed it before any JS loads.

---

## Development

```bash
pnpm build       # compile to dist/
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest run (105 tests)
```

---

*Part of the [Renge design system](https://renge-ui.vercel.app). Built by Soka Labs. Proportion as a first principle.*
