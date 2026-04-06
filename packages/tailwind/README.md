# @renge-ui/tailwind

Tailwind CSS integration for the Renge design system. Maps all `--renge-*` CSS custom properties to utility classes. Zero hardcoded values — every utility references a CSS variable.

Two exports:
- **`@renge-ui/tailwind`** — Tailwind CSS v3 preset (`theme.extend`)
- **`@renge-ui/tailwind/plugin`** — Tailwind CSS v4 plugin (`@plugin`)

---

## Tailwind CSS v4 (recommended)

One import. Everything baked in at build time. No runtime injection.

### Install

```bash
pnpm add @renge-ui/tailwind
```

### Setup

```css
/* globals.css */
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";
```

```html
<!-- Set data-profile on <html> to activate a color profile -->
<html data-profile="ocean">
<html data-profile="earth" data-mode="dark">
```

Done. All `--renge-*` token CSS is injected at build time. All utility classes are registered and support every Tailwind variant (`hover:`, `md:`, `dark:`, `focus:`, etc.).

### What the plugin injects

**Into `:root`** — base token custom properties:
```css
:root {
  --renge-space-0: 0px;
  --renge-space-4: 20px;
  --renge-font-size-base: 16px;
  --renge-font-size-lg: 25.89px;
  --renge-radius-2: 8px;
  --renge-duration-4: 500ms;
  --renge-easing-spring: cubic-bezier(0.382, 0.618, 0.618, 1.382);
  /* … all spacing, type, radius, duration, easing vars */
}
```

**Into `[data-profile]` selectors** — all 6 profiles × light/dark:
```css
[data-profile="ocean"]                              { --renge-color-bg: oklch(…); … }
[data-profile="ocean"][data-mode="dark"]            { --renge-color-bg: oklch(…); … }
@media (prefers-color-scheme: dark) {
  [data-profile="ocean"]:not([data-mode="light"])   { --renge-color-bg: oklch(…); … }
}
/* × 6 profiles (ocean, earth, twilight, fire, void, leaf) */
```

### Profile switching

```ts
// Runtime profile switch — CSS updates immediately, no rebuild
document.documentElement.setAttribute('data-profile', 'twilight');

// Force dark mode
document.documentElement.setAttribute('data-mode', 'dark');

// Follow system preference (remove the override)
document.documentElement.removeAttribute('data-mode');
```

---

## Tailwind CSS v3

Uses `theme.extend` via the preset. Requires a separate CSS injection step — the preset only maps class names to var references and does not inject the vars themselves.

### Install

```bash
pnpm add @renge-ui/tailwind @renge-ui/tokens
```

(`@renge-ui/tokens` is needed to call `createRengeTheme()` directly for CSS variable injection.)

### Setup

```ts
// tailwind.config.ts
import rengePreset from '@renge-ui/tailwind';
import type { Config } from 'tailwindcss';

export default {
  presets: [rengePreset],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
```

Inject the CSS variables by importing the pre-built stylesheet from `@renge-ui/tokens`:

```tsx
// app/layout.tsx
import '@renge-ui/tokens/renge.css';

export default function Layout({ children }) {
  return (
    <html data-profile="ocean">
      <body>{children}</body>
    </html>
  );
}
```

All 6 profiles × light/dark are included. No `dangerouslySetInnerHTML`, no React dependency for token injection.

Alternatively, use `<RengeStylesheet />` from `@renge-ui/react` if you need to generate tokens from a custom config at render time.

---

## Generated Utility Classes

All utilities are prefixed with `renge-` and reference CSS variables. Values update automatically when the active token profile changes — no rebuild needed.

### Spacing

Maps `--renge-space-{0–10}` (Fibonacci × base unit). Applies to all Tailwind spacing consumers.

```html
<div class="p-renge-4 m-renge-2 gap-renge-3">
<div class="space-x-renge-5 px-renge-6 w-renge-8">
<div class="hover:p-renge-5 md:gap-renge-4">
```

| Suffix | CSS variable | Default |
|---|---|---|
| `renge-0` | `var(--renge-space-0)` | 0px |
| `renge-1` | `var(--renge-space-1)` | 4px |
| `renge-2` | `var(--renge-space-2)` | 4px |
| `renge-3` | `var(--renge-space-3)` | 12px |
| `renge-4` | `var(--renge-space-4)` | 20px |
| `renge-5` | `var(--renge-space-5)` | 32px |
| `renge-6` | `var(--renge-space-6)` | 52px |
| `renge-7` | `var(--renge-space-7)` | 84px |
| `renge-8` | `var(--renge-space-8)` | 136px |
| `renge-9` | `var(--renge-space-9)` | 220px |
| `renge-10` | `var(--renge-space-10)` | 356px |

Applicable utilities: `p-`, `px-`, `py-`, `pt-`, `pr-`, `pb-`, `pl-`, `ps-`, `pe-`, `m-`, `mx-`, `my-`, `mt-`, `mr-`, `mb-`, `ml-`, `ms-`, `me-`, `gap-`, `gap-x-`, `gap-y-`, `w-`, `h-`, `size-`, `min-w-`, `min-h-`, `max-w-`, `max-h-`, `inset-`, `inset-x-`, `inset-y-`, `top-`, `right-`, `bottom-`, `left-`, `space-x-`, `space-y-`

### Font Size

Maps `--renge-font-size-{xs–4xl}` (φ-based scale, 8 steps).

```html
<h1 class="text-renge-4xl">Display heading</h1>
<p class="text-renge-base">Body copy</p>
<span class="text-renge-xs">Caption</span>
```

| Class | CSS variable | Default |
|---|---|---|
| `text-renge-xs` | `var(--renge-font-size-xs)` | ~6.1px |
| `text-renge-sm` | `var(--renge-font-size-sm)` | ~9.9px |
| `text-renge-base` | `var(--renge-font-size-base)` | 16px |
| `text-renge-lg` | `var(--renge-font-size-lg)` | ~25.9px |
| `text-renge-xl` | `var(--renge-font-size-xl)` | ~41.9px |
| `text-renge-2xl` | `var(--renge-font-size-2xl)` | ~67.8px |
| `text-renge-3xl` | `var(--renge-font-size-3xl)` | ~109.7px |
| `text-renge-4xl` | `var(--renge-font-size-4xl)` | ~177.4px |

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
<div class="rounded-renge-full">Pill</div>
<div class="rounded-t-renge-3 rounded-b-renge-1">Asymmetric</div>
```

| Class | CSS variable | Default |
|---|---|---|
| `rounded-renge-none` | `var(--renge-radius-none)` | 0px |
| `rounded-renge-1` | `var(--renge-radius-1)` | 4px |
| `rounded-renge-2` | `var(--renge-radius-2)` | 8px |
| `rounded-renge-3` | `var(--renge-radius-3)` | 12px |
| `rounded-renge-4` | `var(--renge-radius-4)` | 20px |
| `rounded-renge-5` | `var(--renge-radius-5)` | 32px |
| `rounded-renge-full` | `var(--renge-radius-full)` | 9999px |

Applicable utilities: `rounded-`, `rounded-t-`, `rounded-r-`, `rounded-b-`, `rounded-l-`, `rounded-s-`, `rounded-e-`, `rounded-tl-`, `rounded-tr-`, `rounded-br-`, `rounded-bl-`, `rounded-ss-`, `rounded-se-`, `rounded-ee-`, `rounded-es-`

### Transition Duration

Maps `--renge-duration-{0–10}` (Fibonacci × 100ms).

```html
<div class="duration-renge-4 transition-all">500ms</div>
<div class="hover:duration-renge-2 transition-opacity">200ms on hover</div>
```

| Class | CSS variable | Default |
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

Maps `--renge-easing-{curve}` (all control points derived from φ).

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

Maps `--renge-color-{token}` (22 semantic tokens — profile- and mode-aware).

```html
<div class="bg-renge-bg text-renge-fg border border-renge-border">
<button class="bg-renge-accent text-renge-fg-inverse hover:bg-renge-accent-hover">
<p class="text-renge-danger">Error message</p>
<div class="ring-2 ring-renge-border-focus">Focus indicator</div>
```

All 22 tokens are available on every color-accepting utility: `bg-`, `text-`, `border-`, `ring-`, `outline-`, `fill-`, `stroke-`, `caret-`, `accent-`, `decoration-`, `shadow-`.

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

---

## Compatibility

| Tailwind version | Import | Config |
|---|---|---|
| v3 | `import rengePreset from '@renge-ui/tailwind'` | `presets: [rengePreset]` in `tailwind.config.ts` |
| v4 | `@plugin "@renge-ui/tailwind/plugin"` | In CSS file |

---

*Part of the Renge design system. Built by Soka Labs. Proportion as a first principle.*
