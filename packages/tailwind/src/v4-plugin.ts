/**
 * @renge-ui/tailwind — Tailwind CSS v4 Plugin
 *
 * Bakes ALL Renge token CSS into the stylesheet at build time:
 *   1. Base custom properties (:root) — spacing, type, motion, radius
 *   2. Profile color CSS ([data-profile] selectors) — all 6 profiles × light/dark
 *   3. Full utility class registration via matchUtilities — variants work automatically
 *
 * Usage (globals.css):
 *   @import "tailwindcss";
 *   @plugin "@renge-ui/tailwind/plugin";
 *
 * Then set data-profile on <html>:
 *   <html data-profile="ocean">              ← light
 *   <html data-profile="earth" data-mode="dark">  ← explicit dark
 *
 * Available profiles: ocean, earth, twilight, fire, void, leaf
 *
 * Generated utilities (all support Tailwind variants: hover:, md:, dark:, etc.):
 *   Spacing   p-renge-4, px-renge-3, gap-renge-2, w-renge-6, mt-renge-1 …
 *   Color     bg-renge-accent, text-renge-fg, border-renge-border, ring-renge-border-focus …
 *   Type      text-renge-lg, leading-renge-base …
 *   Radius    rounded-renge-2, rounded-t-renge-1, rounded-renge-full …
 *   Motion    duration-renge-4, ease-renge-spring …
 */

import plugin from "tailwindcss/plugin";
import {
  createRengeTheme,
  profiles,
  createSemanticColorVars,
} from "@renge-ui/tokens";
import type { ProfileName } from "@renge-ui/tokens";

// ─── Token value maps ──────────────────────────────────────────────────────────
// These are the discriminator values passed to matchUtilities.
// Key  = the class name suffix (e.g. "renge-4" → p-renge-4)
// Value = the CSS var reference (e.g. "var(--renge-space-4)")

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
} as const;

const colors = {
  // Backgrounds
  "renge-bg":             "var(--renge-color-bg)",
  "renge-bg-subtle":      "var(--renge-color-bg-subtle)",
  "renge-bg-muted":       "var(--renge-color-bg-muted)",
  "renge-bg-inverse":     "var(--renge-color-bg-inverse)",
  // Foregrounds
  "renge-fg":             "var(--renge-color-fg)",
  "renge-fg-subtle":      "var(--renge-color-fg-subtle)",
  "renge-fg-muted":       "var(--renge-color-fg-muted)",
  "renge-fg-inverse":     "var(--renge-color-fg-inverse)",
  // Borders
  "renge-border":         "var(--renge-color-border)",
  "renge-border-subtle":  "var(--renge-color-border-subtle)",
  "renge-border-focus":   "var(--renge-color-border-focus)",
  // Accent
  "renge-accent":         "var(--renge-color-accent)",
  "renge-accent-hover":   "var(--renge-color-accent-hover)",
  "renge-accent-subtle":  "var(--renge-color-accent-subtle)",
  // Semantic states
  "renge-success":        "var(--renge-color-success)",
  "renge-success-subtle": "var(--renge-color-success-subtle)",
  "renge-warning":        "var(--renge-color-warning)",
  "renge-warning-subtle": "var(--renge-color-warning-subtle)",
  "renge-danger":         "var(--renge-color-danger)",
  "renge-danger-subtle":  "var(--renge-color-danger-subtle)",
  "renge-info":           "var(--renge-color-info)",
  "renge-info-subtle":    "var(--renge-color-info-subtle)",
} as const;

const fontSizes = {
  "renge-xs":   "var(--renge-font-size-xs)",
  "renge-sm":   "var(--renge-font-size-sm)",
  "renge-base": "var(--renge-font-size-base)",
  "renge-lg":   "var(--renge-font-size-lg)",
  "renge-xl":   "var(--renge-font-size-xl)",
  "renge-2xl":  "var(--renge-font-size-2xl)",
  "renge-3xl":  "var(--renge-font-size-3xl)",
  "renge-4xl":  "var(--renge-font-size-4xl)",
} as const;

const lineHeights = {
  "renge-xs":   "var(--renge-line-height-xs)",
  "renge-sm":   "var(--renge-line-height-sm)",
  "renge-base": "var(--renge-line-height-base)",
  "renge-lg":   "var(--renge-line-height-lg)",
  "renge-xl":   "var(--renge-line-height-xl)",
  "renge-2xl":  "var(--renge-line-height-2xl)",
  "renge-3xl":  "var(--renge-line-height-3xl)",
  "renge-4xl":  "var(--renge-line-height-4xl)",
} as const;

const radii = {
  "renge-none": "var(--renge-radius-none)",
  "renge-1":    "var(--renge-radius-1)",
  "renge-2":    "var(--renge-radius-2)",
  "renge-3":    "var(--renge-radius-3)",
  "renge-4":    "var(--renge-radius-4)",
  "renge-5":    "var(--renge-radius-5)",
  "renge-full": "var(--renge-radius-full)",
} as const;

const durations = {
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
} as const;

const easings = {
  "renge-linear":      "var(--renge-easing-linear)",
  "renge-ease-in":     "var(--renge-easing-ease-in)",
  "renge-ease-out":    "var(--renge-easing-ease-out)",
  "renge-ease-in-out": "var(--renge-easing-ease-in-out)",
  "renge-spring":      "var(--renge-easing-spring)",
} as const;

// ─── Plugin ───────────────────────────────────────────────────────────────────

// Explicit type annotation avoids TS2742 ("type cannot be named without reference to…")
const rengeV4Plugin: ReturnType<typeof plugin> = plugin(function ({
  addBase,
  addUtilities,
  matchUtilities,
}) {

  // ═══════════════════════════════════════════════════════════════════════════
  // § 1 — Base CSS custom properties → :root
  //   Spacing, typography, motion, radius. Colors are handled per-profile (§2).
  //   Animations/keyframes excluded — inject via @renge-ui/tokens if needed.
  // ═══════════════════════════════════════════════════════════════════════════

  const theme = createRengeTheme();
  const baseVars: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme.vars)) {
    if (
      key.startsWith("--renge-space-") ||
      key.startsWith("--renge-font-size-") ||
      key.startsWith("--renge-line-height-") ||
      key.startsWith("--renge-radius-") ||
      key.startsWith("--renge-duration-") ||
      key.startsWith("--renge-easing-")
    ) {
      baseVars[key] = value;
    }
  }

  addBase({ ":root": baseVars });

  // ═══════════════════════════════════════════════════════════════════════════
  // § 2 — Profile color CSS → [data-profile] attribute selectors
  //   All 6 profiles × light/dark. Covers:
  //     [data-profile="X"]                          light (default)
  //     [data-profile="X"][data-mode="dark"]         explicit dark
  //     @media (prefers-color-scheme: dark)          system dark preference
  // ═══════════════════════════════════════════════════════════════════════════

  const profileNames = Object.keys(profiles) as ProfileName[];

  for (const name of profileNames) {
    const variant = profiles[name];
    const lightVars = createSemanticColorVars(variant.light);
    const darkVars  = createSemanticColorVars(variant.dark);

    addBase({ [`[data-profile="${name}"]`]: lightVars });
    addBase({ [`[data-profile="${name}"][data-mode="dark"]`]: darkVars });
    addBase({
      "@media (prefers-color-scheme: dark)": {
        [`[data-profile="${name}"]:not([data-mode="light"])`]: darkVars,
      },
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // § 3 — Spacing utilities
  //   All standard Tailwind spacing consumers: padding, margin, gap, size,
  //   positioning, and logical properties. Variants (hover:, md:, etc.) work
  //   automatically because matchUtilities integrates with Tailwind's engine.
  // ═══════════════════════════════════════════════════════════════════════════

  // Padding — physical
  matchUtilities({ p:  (v) => ({ padding: v }) }, { values: spacing });
  matchUtilities({ px: (v) => ({ "padding-left": v, "padding-right": v }) }, { values: spacing });
  matchUtilities({ py: (v) => ({ "padding-top": v, "padding-bottom": v }) }, { values: spacing });
  matchUtilities({ pt: (v) => ({ "padding-top": v }) }, { values: spacing });
  matchUtilities({ pr: (v) => ({ "padding-right": v }) }, { values: spacing });
  matchUtilities({ pb: (v) => ({ "padding-bottom": v }) }, { values: spacing });
  matchUtilities({ pl: (v) => ({ "padding-left": v }) }, { values: spacing });
  // Padding — logical
  matchUtilities({ ps: (v) => ({ "padding-inline-start": v }) }, { values: spacing });
  matchUtilities({ pe: (v) => ({ "padding-inline-end": v }) }, { values: spacing });

  // Margin — physical
  matchUtilities({ m:  (v) => ({ margin: v }) }, { values: spacing });
  matchUtilities({ mx: (v) => ({ "margin-left": v, "margin-right": v }) }, { values: spacing });
  matchUtilities({ my: (v) => ({ "margin-top": v, "margin-bottom": v }) }, { values: spacing });
  matchUtilities({ mt: (v) => ({ "margin-top": v }) }, { values: spacing });
  matchUtilities({ mr: (v) => ({ "margin-right": v }) }, { values: spacing });
  matchUtilities({ mb: (v) => ({ "margin-bottom": v }) }, { values: spacing });
  matchUtilities({ ml: (v) => ({ "margin-left": v }) }, { values: spacing });
  // Margin — logical
  matchUtilities({ ms: (v) => ({ "margin-inline-start": v }) }, { values: spacing });
  matchUtilities({ me: (v) => ({ "margin-inline-end": v }) }, { values: spacing });

  // Gap
  matchUtilities({ gap:    (v) => ({ gap: v }) }, { values: spacing });
  matchUtilities({ "gap-x": (v) => ({ "column-gap": v }) }, { values: spacing });
  matchUtilities({ "gap-y": (v) => ({ "row-gap": v }) }, { values: spacing });

  // Size (width / height)
  matchUtilities({ w:      (v) => ({ width: v }) }, { values: spacing });
  matchUtilities({ h:      (v) => ({ height: v }) }, { values: spacing });
  matchUtilities({ size:   (v) => ({ width: v, height: v }) }, { values: spacing });
  matchUtilities({ "min-w": (v) => ({ "min-width": v }) }, { values: spacing });
  matchUtilities({ "min-h": (v) => ({ "min-height": v }) }, { values: spacing });
  matchUtilities({ "max-w": (v) => ({ "max-width": v }) }, { values: spacing });
  matchUtilities({ "max-h": (v) => ({ "max-height": v }) }, { values: spacing });

  // Positioning
  matchUtilities({ inset:    (v) => ({ inset: v }) }, { values: spacing });
  matchUtilities({ "inset-x": (v) => ({ left: v, right: v }) }, { values: spacing });
  matchUtilities({ "inset-y": (v) => ({ top: v, bottom: v }) }, { values: spacing });
  matchUtilities({ top:    (v) => ({ top: v }) }, { values: spacing });
  matchUtilities({ right:  (v) => ({ right: v }) }, { values: spacing });
  matchUtilities({ bottom: (v) => ({ bottom: v }) }, { values: spacing });
  matchUtilities({ left:   (v) => ({ left: v }) }, { values: spacing });

  // Space between children — uses addUtilities (not matchUtilities) because the
  // child combinator selector needs to be the rule itself, not a nested value.
  const spaceBetween: Record<string, Record<string, string>> = {};
  for (const [key, value] of Object.entries(spacing)) {
    spaceBetween[`.space-x-${key} > * + *`] = { "margin-left": value };
    spaceBetween[`.space-y-${key} > * + *`] = { "margin-top": value };
  }
  addUtilities(spaceBetween);

  // ═══════════════════════════════════════════════════════════════════════════
  // § 4 — Color utilities
  //   All 22 semantic tokens available on every color-accepting utility.
  //   Note: text-renge-{color} and text-renge-{size} coexist without conflict
  //   because matchUtilities resolves them by value-set key lookup.
  // ═══════════════════════════════════════════════════════════════════════════

  matchUtilities({ bg:         (v) => ({ "background-color": v }) }, { values: colors });
  matchUtilities({ text:       (v) => ({ color: v }) }, { values: colors });
  matchUtilities({ border:     (v) => ({ "border-color": v }) }, { values: colors });
  matchUtilities({ outline:    (v) => ({ "outline-color": v }) }, { values: colors });
  matchUtilities({ ring:       (v) => ({ "--tw-ring-color": v }) }, { values: colors });
  matchUtilities({ fill:       (v) => ({ fill: v }) }, { values: colors });
  matchUtilities({ stroke:     (v) => ({ stroke: v }) }, { values: colors });
  matchUtilities({ caret:      (v) => ({ "caret-color": v }) }, { values: colors });
  matchUtilities({ accent:     (v) => ({ "accent-color": v }) }, { values: colors });
  matchUtilities({ decoration: (v) => ({ "text-decoration-color": v }) }, { values: colors });
  matchUtilities({ shadow:     (v) => ({ "--tw-shadow-color": v }) }, { values: colors });

  // ═══════════════════════════════════════════════════════════════════════════
  // § 5 — Typography utilities
  // ═══════════════════════════════════════════════════════════════════════════

  matchUtilities({ text:    (v) => ({ "font-size": v }) }, { values: fontSizes });
  matchUtilities({ leading: (v) => ({ "line-height": v }) }, { values: lineHeights });

  // ═══════════════════════════════════════════════════════════════════════════
  // § 6 — Border radius utilities
  //   Full coverage: all-corners, edges, logical edges, individual corners.
  // ═══════════════════════════════════════════════════════════════════════════

  // All corners
  matchUtilities({ rounded: (v) => ({ "border-radius": v }) }, { values: radii });
  // Sides (physical)
  matchUtilities({ "rounded-t": (v) => ({ "border-top-left-radius": v, "border-top-right-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-r": (v) => ({ "border-top-right-radius": v, "border-bottom-right-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-b": (v) => ({ "border-bottom-right-radius": v, "border-bottom-left-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-l": (v) => ({ "border-top-left-radius": v, "border-bottom-left-radius": v }) }, { values: radii });
  // Sides (logical)
  matchUtilities({ "rounded-s": (v) => ({ "border-start-start-radius": v, "border-end-start-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-e": (v) => ({ "border-start-end-radius": v, "border-end-end-radius": v }) }, { values: radii });
  // Individual corners (physical)
  matchUtilities({ "rounded-tl": (v) => ({ "border-top-left-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-tr": (v) => ({ "border-top-right-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-br": (v) => ({ "border-bottom-right-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-bl": (v) => ({ "border-bottom-left-radius": v }) }, { values: radii });
  // Individual corners (logical)
  matchUtilities({ "rounded-ss": (v) => ({ "border-start-start-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-se": (v) => ({ "border-start-end-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-ee": (v) => ({ "border-end-end-radius": v }) }, { values: radii });
  matchUtilities({ "rounded-es": (v) => ({ "border-end-start-radius": v }) }, { values: radii });

  // ═══════════════════════════════════════════════════════════════════════════
  // § 7 — Motion utilities
  // ═══════════════════════════════════════════════════════════════════════════

  matchUtilities({ duration: (v) => ({ "transition-duration": v }) }, { values: durations });
  matchUtilities({ ease:     (v) => ({ "transition-timing-function": v }) }, { values: easings });
});

export default rengeV4Plugin;
