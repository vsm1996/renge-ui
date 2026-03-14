# @renge/tokens

The proportional foundation of the Renge design system. Zero dependencies. Generates a complete set of CSS custom properties from mathematical first principles.

## Install

```bash
pnpm add @renge/tokens
```

## Quick Start

```ts
import { createRengeTheme } from '@renge/tokens';

const theme = createRengeTheme();

const style = document.createElement('style');
style.textContent = theme.css;
document.head.appendChild(style);
```

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
  variance: 0,           // Tolerance band 0–1 (0 = disabled). Default: 0
  varianceSeed: 'renge', // Seed for deterministic variance. Default: 'renge'
  includeReset: false,   // Inject minimal CSS reset. Default: false
  selector: ':root',     // CSS selector for variables. Default: ':root'
});
```

---

## Generated Tokens

All tokens are CSS custom properties under the `--renge-*` namespace.

### Spacing — `--renge-space-{0–10}`

Each step is `FIBONACCI[n] × baseUnit`. Default baseUnit = 4px.

| Token | Value |
|-------|-------|
| `--renge-space-0` | 0px |
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

### Typography — `--renge-font-size-{size}` + `--renge-line-height-{size}`

Sizes: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`

Formula: `typeBase × scaleRatio^n` where n ranges from -2 to +5. Default produces ~6px to ~178px with line heights tuned per tier.

### Motion — `--renge-duration-{0–8}` + `--renge-easing-{curve}`

Durations: `FIBONACCI[n] × 100ms` — 100ms, 200ms, 300ms, 500ms, 800ms, 1300ms, 2100ms, 3400ms.

Easing curves: `linear`, `ease-out`, `ease-in`, `ease-in-out`, `spring`

### Radius — `--renge-radius-{none|1–5|full}`

`FIBONACCI[n] × baseUnit` for steps 1–5, plus fixed bookends `none` (0px) and `full` (9999px).

### Colors — `--renge-palette-{name}` + `--renge-color-{semantic}`

See **Color System** below.

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

### Profiles

| Profile | Character | Accent |
|---------|-----------|--------|
| `ocean` | Bright, airy light theme | Sky blue |
| `earth` | Grounded, warm light theme | Earthy ochre |
| `twilight` | Dark mode, cool tones | Lavender |

### Semantic Tokens (22)

Background: `bg`, `bgSubtle`, `bgMuted`, `bgInverse`
Foreground: `fg`, `fgSubtle`, `fgMuted`, `fgInverse`
Border: `border`, `borderSubtle`, `borderFocus`
Interactive: `accent`, `accentHover`, `accentSubtle`
Status: `success`, `successSubtle`, `warning`, `warningSubtle`, `danger`, `dangerSubtle`, `info`, `infoSubtle`

---

## Tolerance / Variance

When `variance > 0`, spacing, radius, and motion values drift from their mathematical targets via a deterministic seeded PRNG. Same seed always produces the same output. Font size, contrast, and meaning-bearing layout are never varied.

```ts
const theme = createRengeTheme({
  variance: 0.05,        // max 5% drift
  varianceSeed: 'my-project',
});
```

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
} from '@renge/tokens';
```

### `phyllotaxis({ count, spread?, angleOffset?, scale? })`

Generates point coordinates in a golden-angle spiral arrangement — the same pattern as sunflower seeds.

```ts
const points = phyllotaxis({ count: 50, spread: 10 });
// Returns: [{ x, y, index, angle, radius }, ...]
```

---

## Development

```bash
pnpm build       # compile to dist/
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest run
```
