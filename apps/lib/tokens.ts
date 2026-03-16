/**
 * Token utilities for the Renge site.
 * Generates CSS and provides typed access to design tokens.
 */

import {
  createRengeTheme,
  profiles,
  createSemanticColorVars,
  PHI,
  FIBONACCI,
} from "@renge/tokens";
import type { ProfileName, ProfileMode } from "@renge/tokens";

export type { ProfileMode };

export { PHI, FIBONACCI };
export type { ProfileName };

/** Generate :root CSS for a given profile (base scales + that profile's colors) */
export function generateRootCSS(profile: ProfileName = "ocean", baseUnit = 6): string {
  const theme = createRengeTheme({ profile, baseUnit });
  return theme.css;
}

/**
 * Generate CSS for all profiles × modes using attribute selectors.
 * The browser applies the correct profile+mode from CSS alone — zero JS flash.
 *
 * Selector strategy:
 *   [data-profile="X"]                          → light (default)
 *   [data-profile="X"][data-mode="dark"]        → dark explicit
 *   @media (prefers-color-scheme: dark)
 *     [data-profile="X"]:not([data-mode="light"]) → dark when no manual override
 */
export function generateAllProfilesCSS(): string {
  const profileNames = Object.keys(profiles) as ProfileName[];
  const blocks: string[] = [];

  for (const name of profileNames) {
    const variant = profiles[name];

    const lightVars = createSemanticColorVars(variant.light);
    const darkVars  = createSemanticColorVars(variant.dark);

    const lightLines = Object.entries(lightVars).map(([k, v]) => `  ${k}: ${v};`).join("\n");
    const darkLines  = Object.entries(darkVars).map(([k, v]) => `  ${k}: ${v};`).join("\n");

    blocks.push(
      // Light (default for this profile)
      `[data-profile="${name}"] {\n${lightLines}\n}`,
      // Explicit dark override
      `[data-profile="${name}"][data-mode="dark"] {\n${darkLines}\n}`,
      // System dark preference (only when user hasn't manually chosen light)
      `@media (prefers-color-scheme: dark) {\n  [data-profile="${name}"]:not([data-mode="light"]) {\n${darkLines.split("\n").map(l => "  " + l).join("\n")}\n  }\n}`,
    );
  }

  return blocks.join("\n\n");
}

/** Get CSS variable string map for a profile (for inline style injection) */
export function getProfileVars(profile: ProfileName, mode: ProfileMode = "light"): Record<string, string> {
  const semanticColorVars = createSemanticColorVars(profiles[profile][mode]);
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(semanticColorVars)) {
    vars[key] = value;
  }
  return vars;
}

/** Spacing steps: Fibonacci × 4px — var refs */
export const space = {
  0: "var(--renge-space-0)",
  1: "var(--renge-space-1)",   // 4px
  2: "var(--renge-space-2)",   // 8px
  3: "var(--renge-space-3)",   // 12px
  4: "var(--renge-space-4)",   // 20px
  5: "var(--renge-space-5)",   // 32px
  6: "var(--renge-space-6)",   // 52px
  7: "var(--renge-space-7)",   // 84px
  8: "var(--renge-space-8)",   // 136px
  9: "var(--renge-space-9)",   // 220px
  10: "var(--renge-space-10)", // 356px
} as const;

/** Typography size var refs */
export const fontSize = {
  xs: "var(--renge-font-size-xs)",
  sm: "var(--renge-font-size-sm)",
  base: "var(--renge-font-size-base)",
  lg: "var(--renge-font-size-lg)",
  xl: "var(--renge-font-size-xl)",
  "2xl": "var(--renge-font-size-2xl)",
  "3xl": "var(--renge-font-size-3xl)",
  "4xl": "var(--renge-font-size-4xl)",
} as const;

/** Duration var refs */
export const duration = {
  0: "var(--renge-duration-0)",
  1: "var(--renge-duration-1)",   // 100ms
  2: "var(--renge-duration-2)",   // 200ms
  3: "var(--renge-duration-3)",   // 300ms
  4: "var(--renge-duration-4)",   // 500ms
  5: "var(--renge-duration-5)",   // 800ms
  6: "var(--renge-duration-6)",   // 1300ms
} as const;

/** Easing var refs */
export const easing = {
  linear: "var(--renge-easing-linear)",
  out: "var(--renge-easing-ease-out)",
  in: "var(--renge-easing-ease-in)",
  inOut: "var(--renge-easing-ease-in-out)",
  spring: "var(--renge-easing-spring)",
} as const;

/** Radius var refs */
export const radius = {
  none: "var(--renge-radius-none)",
  1: "var(--renge-radius-1)",  // 4px
  2: "var(--renge-radius-2)",  // 8px
  3: "var(--renge-radius-3)",  // 12px
  4: "var(--renge-radius-4)",  // 20px
  5: "var(--renge-radius-5)",  // 32px
  full: "var(--renge-radius-full)",
} as const;

/** Semantic color var refs */
export const color = {
  bg: "var(--renge-color-bg)",
  bgSubtle: "var(--renge-color-bg-subtle)",
  bgMuted: "var(--renge-color-bg-muted)",
  bgInverse: "var(--renge-color-bg-inverse)",
  fg: "var(--renge-color-fg)",
  fgSubtle: "var(--renge-color-fg-subtle)",
  fgMuted: "var(--renge-color-fg-muted)",
  fgInverse: "var(--renge-color-fg-inverse)",
  border: "var(--renge-color-border)",
  borderSubtle: "var(--renge-color-border-subtle)",
  accent: "var(--renge-color-accent)",
  accentHover: "var(--renge-color-accent-hover)",
  accentSubtle: "var(--renge-color-accent-subtle)",
} as const;
