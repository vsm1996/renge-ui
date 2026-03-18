# @renge-ui/tailwind

Tailwind CSS v3 preset for the Renge design system. Maps all `--renge-*` CSS custom properties to utility classes. Zero hardcoded values — every utility references a CSS variable.

Requires `@renge-ui/tokens` (or equivalent) to inject the CSS custom properties at runtime.

## Install

```bash
pnpm add @renge-ui/tailwind
```

## Setup

```ts
// tailwind.config.ts
import rengePreset from '@renge-ui/tailwind';
import type { Config } from 'tailwindcss';

export default {
  presets: [rengePreset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
```

Then inject the Renge CSS variables via `@renge-ui/tokens`:

```ts
import { createRengeTheme } from '@renge-ui/tokens';

const { css } = createRengeTheme({ profile: 'ocean', mode: 'light' });
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

---

## Generated Utility Classes

All utilities are prefixed with `renge-` and reference CSS variables — values update automatically when the active token profile changes.

### Spacing

Maps `--renge-space-{0–10}` (Fibonacci × base unit).

```html
<div class="p-renge-4 m-renge-2 gap-renge-3">
<div class="space-x-renge-5 px-renge-6">
```

| Class suffix | CSS variable |
|---|---|
| `renge-0` | `var(--renge-space-0)` |
| `renge-1` | `var(--renge-space-1)` |
| `renge-2` | `var(--renge-space-2)` |
| `renge-3` | `var(--renge-space-3)` |
| `renge-4` | `var(--renge-space-4)` |
| `renge-5` | `var(--renge-space-5)` |
| `renge-6` | `var(--renge-space-6)` |
| `renge-7` | `var(--renge-space-7)` |
| `renge-8` | `var(--renge-space-8)` |
| `renge-9` | `var(--renge-space-9)` |
| `renge-10` | `var(--renge-space-10)` |

### Font Size

Maps `--renge-font-size-{xs–4xl}` (φ-based scale, 8 steps).

```html
<h1 class="text-renge-4xl">Display heading</h1>
<p class="text-renge-base">Body copy</p>
<span class="text-renge-xs">Caption</span>
```

| Class | CSS variable |
|---|---|
| `text-renge-xs` | `var(--renge-font-size-xs)` |
| `text-renge-sm` | `var(--renge-font-size-sm)` |
| `text-renge-base` | `var(--renge-font-size-base)` |
| `text-renge-lg` | `var(--renge-font-size-lg)` |
| `text-renge-xl` | `var(--renge-font-size-xl)` |
| `text-renge-2xl` | `var(--renge-font-size-2xl)` |
| `text-renge-3xl` | `var(--renge-font-size-3xl)` |
| `text-renge-4xl` | `var(--renge-font-size-4xl)` |

### Line Height

Maps `--renge-line-height-{xs–4xl}` (φ-derived: body 1.618, heading 1.382, display 1.236).

```html
<p class="leading-renge-base">Body — φ = 1.618</p>
<h2 class="leading-renge-xl">Heading — 1.382</h2>
```

Same 8 steps as font size (`renge-xs` through `renge-4xl`).

### Border Radius

Maps `--renge-radius-{none|1–5|full}` (Fibonacci × base unit).

```html
<button class="rounded-renge-2">Default button</button>
<div class="rounded-renge-full">Pill shape</div>
<div class="rounded-renge-none">Square</div>
```

| Class | CSS variable |
|---|---|
| `rounded-renge-none` | `var(--renge-radius-none)` |
| `rounded-renge-1` | `var(--renge-radius-1)` |
| `rounded-renge-2` | `var(--renge-radius-2)` |
| `rounded-renge-3` | `var(--renge-radius-3)` |
| `rounded-renge-4` | `var(--renge-radius-4)` |
| `rounded-renge-5` | `var(--renge-radius-5)` |
| `rounded-renge-full` | `var(--renge-radius-full)` |

### Transition Duration

Maps `--renge-duration-{0–10}` (Fibonacci × 100ms: 0ms, 100ms, 200ms, 300ms, 500ms, 800ms…).

```html
<div class="duration-renge-4 transition-all">500ms — natural acceleration</div>
<div class="duration-renge-3 transition-opacity">300ms</div>
```

| Class | CSS variable | Default value |
|---|---|---|
| `duration-renge-0` | `var(--renge-duration-0)` | 0ms |
| `duration-renge-1` | `var(--renge-duration-1)` | 100ms |
| `duration-renge-2` | `var(--renge-duration-2)` | 200ms |
| `duration-renge-3` | `var(--renge-duration-3)` | 300ms |
| `duration-renge-4` | `var(--renge-duration-4)` | 500ms |
| `duration-renge-5` | `var(--renge-duration-5)` | 800ms |
| `duration-renge-6` | `var(--renge-duration-6)` | 1300ms |
| `duration-renge-7` | `var(--renge-duration-7)` | 2100ms |
| `duration-renge-8` | `var(--renge-duration-8)` | 3400ms |
| `duration-renge-9` | `var(--renge-duration-9)` | 5500ms |
| `duration-renge-10` | `var(--renge-duration-10)` | 8900ms |

### Transition Easing

Maps `--renge-easing-{curve}` (all control points derived from φ: A = 1/φ² ≈ 0.382, B = 1/φ ≈ 0.618).

```html
<div class="ease-renge-spring duration-renge-4 transition-transform">Spring</div>
<div class="ease-renge-ease-out duration-renge-3 transition-opacity">Ease out</div>
```

| Class | CSS variable | Curve |
|---|---|---|
| `ease-renge-linear` | `var(--renge-easing-linear)` | `linear` |
| `ease-renge-ease-in` | `var(--renge-easing-ease-in)` | `cubic-bezier(0.382, 0, 1, 0.618)` |
| `ease-renge-ease-out` | `var(--renge-easing-ease-out)` | `cubic-bezier(0.382, 1, 0.618, 1)` |
| `ease-renge-ease-in-out` | `var(--renge-easing-ease-in-out)` | `cubic-bezier(0.382, 0, 0.618, 1)` |
| `ease-renge-spring` | `var(--renge-easing-spring)` | `cubic-bezier(0.382, 0.618, 0.618, 1.382)` |

### Colors

Maps `--renge-color-{token}` (22 semantic tokens — profile- and mode-aware via CSS variables).

```html
<div class="bg-renge-bg text-renge-fg border border-renge-border">
<button class="bg-renge-accent text-renge-fg-inverse hover:bg-renge-accent-hover">
<p class="text-renge-danger">Error message</p>
```

#### Backgrounds
| Class | CSS variable |
|---|---|
| `bg-renge-bg` | `var(--renge-color-bg)` |
| `bg-renge-bg-subtle` | `var(--renge-color-bg-subtle)` |
| `bg-renge-bg-muted` | `var(--renge-color-bg-muted)` |
| `bg-renge-bg-inverse` | `var(--renge-color-bg-inverse)` |

#### Foregrounds
| Class | CSS variable |
|---|---|
| `text-renge-fg` | `var(--renge-color-fg)` |
| `text-renge-fg-subtle` | `var(--renge-color-fg-subtle)` |
| `text-renge-fg-muted` | `var(--renge-color-fg-muted)` |
| `text-renge-fg-inverse` | `var(--renge-color-fg-inverse)` |

#### Borders
| Class | CSS variable |
|---|---|
| `border-renge-border` | `var(--renge-color-border)` |
| `border-renge-border-subtle` | `var(--renge-color-border-subtle)` |
| `border-renge-border-focus` | `var(--renge-color-border-focus)` |

#### Accent
| Class | CSS variable |
|---|---|
| `bg-renge-accent` | `var(--renge-color-accent)` |
| `bg-renge-accent-hover` | `var(--renge-color-accent-hover)` |
| `bg-renge-accent-subtle` | `var(--renge-color-accent-subtle)` |

#### Semantic States
| Class | CSS variable |
|---|---|
| `text-renge-success` | `var(--renge-color-success)` |
| `bg-renge-success-subtle` | `var(--renge-color-success-subtle)` |
| `text-renge-warning` | `var(--renge-color-warning)` |
| `bg-renge-warning-subtle` | `var(--renge-color-warning-subtle)` |
| `text-renge-danger` | `var(--renge-color-danger)` |
| `bg-renge-danger-subtle` | `var(--renge-color-danger-subtle)` |
| `text-renge-info` | `var(--renge-color-info)` |
| `bg-renge-info-subtle` | `var(--renge-color-info-subtle)` |

> Color utilities work with any Tailwind color modifier: `bg-renge-accent`, `text-renge-fg`, `border-renge-border`, `ring-renge-border-focus`, `fill-renge-accent`, `stroke-renge-accent`, etc.

---

## Profile Switching

Because every utility references a CSS variable, switching color profiles is a single class swap — no Tailwind config change needed.

```ts
// Switch to earth profile, dark mode
const { css } = createRengeTheme({ profile: 'earth', mode: 'dark' });
document.documentElement.style.cssText = css; // or re-inject the stylesheet
```

Available profiles: `ocean` (default), `earth`, `twilight`, `fire`, `void`, `leaf`.

---

## Compatibility

- **Tailwind CSS v3** — fully supported via `presets` array.
- **Tailwind CSS v4** — uses a different CSS-based config model (`@theme`). This preset is not applicable for v4; use `@renge-ui/tokens` CSS output directly with `@theme` instead.

---

*Part of the Renge design system. Built by Soka Labs. Proportion as a first principle.*
