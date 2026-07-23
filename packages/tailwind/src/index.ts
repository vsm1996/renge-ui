/**
 * @renge-ui/tailwind
 *
 * Tailwind CSS v3 preset that maps all --renge-* CSS custom properties to
 * Tailwind utility classes. All values reference CSS variables — no
 * hardcoded values. Requires @renge-ui/tokens (or equivalent) to inject
 * the CSS custom properties at runtime.
 *
 * Usage:
 *   // tailwind.config.ts
 *   import rengePreset from '@renge-ui/tailwind';
 *   export default { presets: [rengePreset] };
 */

// ─── Spacing ──────────────────────────────────────────────────────────────────
// --renge-space-{0-10} → space-renge-*, p-renge-*, m-renge-*, gap-renge-*, etc.

const spacing = {
  "renge-0":  "var(--renge-space-0)",
  "renge-1":  "var(--renge-space-1)",
  "renge-2":  "var(--renge-space-2)",
  "renge-3":  "var(--renge-space-3)",
  "renge-4":  "var(--renge-space-4)",
  "renge-5":  "var(--renge-space-5)",
  "renge-6":  "var(--renge-space-6)",
  "renge-7":  "var(--renge-space-7)",
  "renge-8":  "var(--renge-space-8)",
  "renge-9":  "var(--renge-space-9)",
  "renge-10": "var(--renge-space-10)",
};

// ─── Typography — Font Size ───────────────────────────────────────────────────
// --renge-font-size-{xs|sm|base|lg|xl|2xl|3xl|4xl} → text-renge-*

const fontSize = {
  "renge-xs":   "var(--renge-font-size-xs)",
  "renge-sm":   "var(--renge-font-size-sm)",
  "renge-base": "var(--renge-font-size-base)",
  "renge-lg":   "var(--renge-font-size-lg)",
  "renge-xl":   "var(--renge-font-size-xl)",
  "renge-2xl":  "var(--renge-font-size-2xl)",
  "renge-3xl":  "var(--renge-font-size-3xl)",
  "renge-4xl":  "var(--renge-font-size-4xl)",
};

// ─── Typography — Line Height ─────────────────────────────────────────────────
// --renge-line-height-{xs|sm|base|lg|xl|2xl|3xl|4xl} → leading-renge-*

const lineHeight = {
  "renge-xs":   "var(--renge-line-height-xs)",
  "renge-sm":   "var(--renge-line-height-sm)",
  "renge-base": "var(--renge-line-height-base)",
  "renge-lg":   "var(--renge-line-height-lg)",
  "renge-xl":   "var(--renge-line-height-xl)",
  "renge-2xl":  "var(--renge-line-height-2xl)",
  "renge-3xl":  "var(--renge-line-height-3xl)",
  "renge-4xl":  "var(--renge-line-height-4xl)",
};

// ─── Border Radius ────────────────────────────────────────────────────────────
// --renge-radius-{none|1-5|full} → rounded-renge-*

const borderRadius = {
  "renge-none": "var(--renge-radius-none)",
  "renge-1":    "var(--renge-radius-1)",
  "renge-2":    "var(--renge-radius-2)",
  "renge-3":    "var(--renge-radius-3)",
  "renge-4":    "var(--renge-radius-4)",
  "renge-5":    "var(--renge-radius-5)",
  "renge-full": "var(--renge-radius-full)",
};

// ─── Motion — Duration ───────────────────────────────────────────────────────
// --renge-duration-{0-10} → duration-renge-*

const transitionDuration = {
  "renge-0":  "var(--renge-duration-0)",
  "renge-1":  "var(--renge-duration-1)",
  "renge-2":  "var(--renge-duration-2)",
  "renge-3":  "var(--renge-duration-3)",
  "renge-4":  "var(--renge-duration-4)",
  "renge-5":  "var(--renge-duration-5)",
  "renge-6":  "var(--renge-duration-6)",
  "renge-7":  "var(--renge-duration-7)",
  "renge-8":  "var(--renge-duration-8)",
  "renge-9":  "var(--renge-duration-9)",
  "renge-10": "var(--renge-duration-10)",
};

// ─── Motion — Easing ─────────────────────────────────────────────────────────
// --renge-easing-{linear|ease-out|ease-in|ease-in-out|spring} → ease-renge-*

const transitionTimingFunction = {
  "renge-linear":      "var(--renge-easing-linear)",
  "renge-ease-in":     "var(--renge-easing-ease-in)",
  "renge-ease-out":    "var(--renge-easing-ease-out)",
  "renge-ease-in-out": "var(--renge-easing-ease-in-out)",
  "renge-spring":      "var(--renge-easing-spring)",
};

// ─── Colors — Semantic ────────────────────────────────────────────────────────
// --renge-color-{token} → bg-renge-*, text-renge-*, border-renge-*, etc.
//
// Nested under `renge` so Tailwind generates: bg-renge-accent, text-renge-fg,
// border-renge-subtle, etc.

// Each color is a FUNCTION so the /opacity modifier works in Tailwind v3
// (bg-renge-success/60). With a numeric opacityValue we emit
// color-mix(in oklab, <token> <pct>, transparent) — the base tokens are OKLCH
// and color-mix is already a Renge dependency; otherwise the plain var. Raw
// string values would make the /NN modifier silently generate nothing (the same
// gap the v4 plugin had). The `.raw` on each function carries the plain var so
// tests and tooling can read the underlying reference.
type OpacityArg = { opacityValue?: string };
interface RengeColorFn {
  (arg?: OpacityArg): string;
  raw: string;
}
const alphaColor = (varRef: string): RengeColorFn => {
  const fn = (({ opacityValue }: OpacityArg = {}) => {
    if (opacityValue && /^[\d.]+$/.test(opacityValue) && opacityValue !== "1") {
      const pct = +(parseFloat(opacityValue) * 100).toFixed(4);
      return `color-mix(in oklab, var(${varRef}) ${pct}%, transparent)`;
    }
    return `var(${varRef})`;
  }) as RengeColorFn;
  fn.raw = `var(${varRef})`;
  return fn;
};

const RENGE_COLOR_VARS: Record<string, string> = {
  // Backgrounds
  "bg": "--renge-color-bg",
  "bg-subtle": "--renge-color-bg-subtle",
  "bg-muted": "--renge-color-bg-muted",
  "bg-inverse": "--renge-color-bg-inverse",
  // Foregrounds
  "fg": "--renge-color-fg",
  "fg-subtle": "--renge-color-fg-subtle",
  "fg-muted": "--renge-color-fg-muted",
  "fg-inverse": "--renge-color-fg-inverse",
  // Borders
  "border": "--renge-color-border",
  "border-subtle": "--renge-color-border-subtle",
  "border-focus": "--renge-color-border-focus",
  // Accent
  "accent": "--renge-color-accent",
  "accent-hover": "--renge-color-accent-hover",
  "accent-subtle": "--renge-color-accent-subtle",
  // Semantic states
  "success": "--renge-color-success",
  "success-subtle": "--renge-color-success-subtle",
  "warning": "--renge-color-warning",
  "warning-subtle": "--renge-color-warning-subtle",
  "danger": "--renge-color-danger",
  "danger-subtle": "--renge-color-danger-subtle",
  "info": "--renge-color-info",
  "info-subtle": "--renge-color-info-subtle",
};

const colors = {
  renge: Object.fromEntries(
    Object.entries(RENGE_COLOR_VARS).map(([name, varRef]) => [name, alphaColor(varRef)]),
  ) as Record<string, RengeColorFn>,
};

// ─── Preset ───────────────────────────────────────────────────────────────────

const rengePreset = {
  theme: {
    extend: {
      spacing,
      fontSize,
      lineHeight,
      borderRadius,
      transitionDuration,
      transitionTimingFunction,
      colors,
    },
  },
};

export default rengePreset;
