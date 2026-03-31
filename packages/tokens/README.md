# @renge-ui/tokens

The proportional foundation of the Renge design system. Zero dependencies. Generates a complete set of CSS custom properties from mathematical first principles.

## Install

```bash
pnpm add @renge-ui/tokens
```

## Quick Start

```ts
import { createRengeTheme } from '@renge-ui/tokens';

const theme = createRengeTheme();

const style = document.createElement('style');
style.textContent = theme.css;
document.head.appendChild(style);
```

---

## API

### `createRengeTheme(config?)`

The main entry point. Returns `{ config, vars, css }`.

| Field | Type | Description |
|-------|------|-------------|
| `css` | `string` | Complete CSS string ready to inject |
| `vars` | `Record<string, string>` | All `--renge-*` custom properties as a JS object |
| `config` | `Required<RengeThemeConfig>` | Resolved configuration with all defaults applied |

#### Configuration

```ts
const theme = createRengeTheme({
  baseUnit: 4,           // Spacing multiplier in px. Default: 4
  typeBase: 16,          // Root font size in px. Default: 16
  scaleRatio: 1.618,     // Typography scale ratio (φ). Default: PHI
  profile: 'ocean',      // Color profile. Default: 'ocean'
  mode: 'light',         // 'light' | 'dark'. Default: 'light'
  variance: 0,           // Tolerance band 0–1 (0 = disabled). Default: 0
  varianceSeed: 'renge', // Seed for deterministic variance. Default: 'renge'
  includeReset: false,   // Inject minimal CSS reset. Default: false
  selector: ':root',     // CSS selector for variables. Default: ':root'
});
```

#### TypeScript Types

```ts
import type {
  RengeThemeConfig,    // Configuration object
  RengeTheme,          // Return type of createRengeTheme()
  OklchColor,          // { l: number, c: number, h: number }
  SemanticColorMap,    // All 22 semantic color role keys
  SemanticColor,       // keyof SemanticColorMap
  ProfileName,         // 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
  ProfileMode,         // 'light' | 'dark'
  ProfileVariant,      // { light: SemanticColorMap, dark: SemanticColorMap }
  PhyllotaxisPoint,    // { x, y, index, angle, radius }
  PhyllotaxisConfig,   // { count, spread?, angleOffset?, scale? }
} from '@renge-ui/tokens';
```

---

## Generated Tokens

All tokens are CSS custom properties under the `--renge-*` namespace.

### Spacing — `--renge-space-{0–10}`

Each step is `FIBONACCI[n] × baseUnit`. Default baseUnit = 4px.

| Token | Fibonacci | Value |
|-------|-----------|-------|
| `--renge-space-0` | 0 | 0px |
| `--renge-space-1` | 1 | 4px |
| `--renge-space-2` | 1 | 8px |
| `--renge-space-3` | 3 | 12px |
| `--renge-space-4` | 5 | 20px |
| `--renge-space-5` | 8 | 32px |
| `--renge-space-6` | 13 | 52px |
| `--renge-space-7` | 21 | 84px |
| `--renge-space-8` | 34 | 136px |
| `--renge-space-9` | 55 | 220px |
| `--renge-space-10` | 89 | 356px |

Growth is non-linear by design. Steps 1–4 are tight (4–20px). Steps 5–8 open up. Steps 9–10 are for large structural spacing.

### Typography — `--renge-font-size-{size}` + `--renge-line-height-{size}`

Sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

Formula: `typeBase × scaleRatio^n` where n ranges from -2 to +5.

| Token | Formula | Default | Line Height |
|-------|---------|---------|-------------|
| `--renge-font-size-xs` | base × φ⁻² | ~6.1px | 1.618 |
| `--renge-font-size-sm` | base × φ⁻¹ | ~9.9px | 1.618 |
| `--renge-font-size-base` | base × φ⁰ | 16px | 1.618 |
| `--renge-font-size-lg` | base × φ¹ | ~25.9px | 1.618 |
| `--renge-font-size-xl` | base × φ² | ~41.9px | 1.382 |
| `--renge-font-size-2xl` | base × φ³ | ~67.8px | 1.382 |
| `--renge-font-size-3xl` | base × φ⁴ | ~109.7px | 1.236 |
| `--renge-font-size-4xl` | base × φ⁵ | ~177.4px | 1.236 |

Note: `xs` (~6px) and `sm` (~10px) are very small. Use `base` and above for body copy.

### Motion — `--renge-duration-{0–10}` + `--renge-easing-{curve}`

Durations: `FIBONACCI[n] × 100ms`.

| Token | Duration | Typical Use |
|-------|----------|-------------|
| `--renge-duration-0` | 0ms | Instant / disabled |
| `--renge-duration-1` | 100ms | Micro-interactions, hover flashes |
| `--renge-duration-2` | 200ms | Hover states |
| `--renge-duration-3` | 300ms | Button presses, simple toggles |
| `--renge-duration-4` | 500ms | Component transitions |
| `--renge-duration-5` | 800ms | Page element reveals |
| `--renge-duration-6` | 1300ms | Complex transitions |
| `--renge-duration-7` | 2100ms | Orchestrated sequences |
| `--renge-duration-8` | 3400ms | Extended animations |
| `--renge-duration-9` | 5500ms | Ambient, looping motion |
| `--renge-duration-10` | 8900ms | Slow, breathing animations |

Easing curves — all control points derived from φ (A = 1/φ² ≈ 0.382, B = 1/φ ≈ 0.618):

| Token | Curve | Use |
|-------|-------|-----|
| `--renge-easing-linear` | `linear` | Progress bars, scrubbing |
| `--renge-easing-ease-out` | `cubic-bezier(0.382, 1, 0.618, 1)` | Entrances — fast start, settles |
| `--renge-easing-ease-in` | `cubic-bezier(0.382, 0, 1, 0.618)` | Exits — starts still, arrives fast |
| `--renge-easing-ease-in-out` | `cubic-bezier(0.382, 0, 0.618, 1)` | Balanced transitions |
| `--renge-easing-spring` | `cubic-bezier(0.382, 0.618, 0.618, 1.382)` | Playful — overshoots by 1/φ² |

### Radius — `--renge-radius-{none|1–5|full}`

`FIBONACCI[n] × baseUnit` for steps 1–5, plus fixed bookends.

| Token | Value |
|-------|-------|
| `--renge-radius-none` | 0px |
| `--renge-radius-1` | 4px |
| `--renge-radius-2` | 8px |
| `--renge-radius-3` | 12px |
| `--renge-radius-4` | 20px |
| `--renge-radius-5` | 32px |
| `--renge-radius-full` | 9999px |

### Animations — `--renge-animation-*` + keyframe rules

`createAnimationVars()` generates named animation tokens for entrance, exit, and ambient effects. `createAnimationKeyframesCSS()` returns the raw `@keyframes` CSS string to inject alongside your theme CSS.

Both are included in the output of `createRengeTheme()` — you don't need to call them directly unless composing your own theme pipeline.

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

OKLCH is perceptually uniform. A 10-point change in `L` always looks like the same change in lightness, regardless of hue — unlike HSL. This makes programmatic color manipulation predictable and accessible contrast ratios reliable.

### Profiles

All profiles have both `light` and `dark` variants.

| Profile | Character | Accent | Notes |
|---------|-----------|--------|-------|
| `ocean` | Bright, airy | Sky blue | Default |
| `earth` | Grounded, warm | Earthy ochre | Warm neutrals |
| `twilight` | Cool, atmospheric | Lavender | Works well as dark mode |
| `fire` | Energetic, warm | Amber-orange | High energy |
| `void` | Deep, minimal | Muted indigo | Maximum contrast |
| `leaf` | Fresh, natural | Moss green | Organic |

```ts
const theme = createRengeTheme({ profile: 'earth', mode: 'dark' });
```

### Semantic Tokens (22)

Components reference these — never raw palette colors.

| Role | Tokens |
|------|--------|
| Background | `--renge-color-bg`, `--renge-color-bg-subtle`, `--renge-color-bg-muted`, `--renge-color-bg-inverse` |
| Foreground | `--renge-color-fg`, `--renge-color-fg-subtle`, `--renge-color-fg-muted`, `--renge-color-fg-inverse` |
| Border | `--renge-color-border`, `--renge-color-border-subtle`, `--renge-color-border-focus` |
| Interactive | `--renge-color-accent`, `--renge-color-accent-hover`, `--renge-color-accent-subtle` |
| Status | `--renge-color-success`, `--renge-color-success-subtle`, `--renge-color-warning`, `--renge-color-warning-subtle`, `--renge-color-danger`, `--renge-color-danger-subtle`, `--renge-color-info`, `--renge-color-info-subtle` |

---

## Tolerance / Variance

When `variance > 0`, spacing, radius, and motion values drift from their mathematical targets via a deterministic seeded PRNG. Same seed always produces the same output.

```ts
const theme = createRengeTheme({
  variance: 0.05,        // max 5% drift
  varianceSeed: 'my-project',
});
```

**Affected:** spacing, radius, motion timing.
**Never affected:** font size, contrast ratios, meaning-bearing layout.

The drift is what keeps surfaces from feeling machine-stamped while preserving accessibility and readability.

---

## Static Token References — `rengeVars`

`rengeVars` is a statically typed object of all CSS variable references. Use it instead of constructing `var(--renge-*)` strings by hand — IDE autocomplete, no typos, no prefix guessing.

```ts
import { rengeVars } from '@renge-ui/tokens';

// All values are literal CSS var() strings
rengeVars.color.bg          // "var(--renge-color-bg)"
rengeVars.color.bgSubtle    // "var(--renge-color-bg-subtle)"
rengeVars.space[4]          // "var(--renge-space-4)"
rengeVars.fontSize.lg       // "var(--renge-font-size-lg)"
rengeVars.duration[3]       // "var(--renge-duration-3)"
rengeVars.radius[2]         // "var(--renge-radius-2)"
rengeVars.easing.out        // "var(--renge-easing-ease-out)"
```

### Mapping to another system's tokens

`rengeVars` eliminates the need for defensive prefix checking when integrating with a host design system:

```ts
import { createRengeTheme, rengeVars } from '@renge-ui/tokens';

const theme = createRengeTheme({ profile: 'earth', mode: 'light' });

// Direct mapping — no resolveVar() or prefix guessing needed
const aliases: [string, string][] = [
  ['--color-bg-primary',    rengeVars.color.bg],
  ['--color-bg-secondary',  rengeVars.color.bgSubtle],
  ['--color-text-primary',  rengeVars.color.fg],
  ['--color-text-secondary',rengeVars.color.fgSubtle],
  ['--color-accent',        rengeVars.color.accent],
  ['--color-error',         rengeVars.color.danger],
  ['--color-success',       rengeVars.color.success],
];

const aliasCSS = `:root {\n${aliases.map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;

// Inject both: Renge base vars + your system's aliases
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

## Advanced Exports

For custom scale generation or extending the system:

```ts
import {
  // Scale generators
  createSpacingScale,
  createTypeScale,
  createDurationScale,
  createEasingTokens,
  createRadiusScale,
  createFractalScale,
  createAnimationVars,
  createAnimationKeyframesCSS,

  // Color utilities
  palette,
  oklch,
  createPaletteVars,
  profiles,
  getProfile,
  createSemanticColorVars,

  // Geometry
  phyllotaxis,

  // Math constants + utilities
  PHI,
  GOLDEN_ANGLE,
  FIBONACCI,
  applyVariance,
  seededRandom,
} from '@renge-ui/tokens';
```

### `phyllotaxis(config)`

Generates point coordinates in a golden-angle spiral arrangement — the same pattern as sunflower seeds.

```ts
const points = phyllotaxis({
  count: 50,
  spread: 10,        // Controls density. Default: 10
  angleOffset: 137.5, // Degrees. Default: GOLDEN_ANGLE (137.5°)
  scale: 1,          // Growth factor. Default: 1
});

// Returns: [{ x, y, index, angle, radius }, ...]
```

Use for avatar clusters, tag clouds, decorative patterns, radial menus, or data visualization nodes.

### `getProfile(name, mode?)`

Returns a `SemanticColorMap` for a given profile and mode without generating a full theme.

```ts
import { getProfile } from '@renge-ui/tokens';

const colors = getProfile('earth', 'dark');
// colors.accent → the earth-dark accent color string
```

---

## Trade-offs

**Fibonacci spacing is non-linear.** You cannot compose small gaps to reach a large one — `space-3` + `space-3` ≠ `space-4`. This is a feature (scale growth feels natural) and a constraint (arithmetic composition doesn't work). Design to the scale, not around it.

**φ-based typography produces extreme values at the edges.** `xs` (~6px) and `4xl` (~177px) are rarely useful as-is. The scale is intentional for display work. For body copy, stay between `sm` and `lg`.

**OKLCH requires modern browsers.** Supported in Chrome 111+, Firefox 113+, Safari 16.4+. For older browser support, generate hex fallbacks from the OKLCH values before injecting the CSS.

**CSS custom properties require JavaScript to inject** (unless you copy the CSS statically). For critical-path rendering, generate `theme.css` server-side and embed it in your `<head>` before any JS loads.

**Variance is deterministic but opaque.** Enabling variance with a seed makes values differ from their mathematical targets. This can make debugging "why is this 22px instead of 20px?" confusing if you forget variance is on.

---

## Development

```bash
pnpm build       # compile to dist/
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest run
```
