/**
 * Theme Generator
 *
 * createRengeTheme() is the main entry point for @renge/tokens.
 * Takes configuration, returns { config, vars, css }.
 */

import { PHI, seededRandom } from "./constants";
import {
  createSpacingScale,
  createTypeScale,
  createDurationScale,
  createEasingTokens,
  createRadiusScale,
  createFractalScale,
  createAnimationVars,
  createAnimationKeyframesCSS,
} from "./scales";
import { createPaletteVars } from "./colors/palette";
import { profiles, createSemanticColorVars } from "./colors/profiles";
import type { RengeThemeConfig, RengeTheme } from "./types";

// ============================================================================
// Defaults
// ============================================================================

const defaults: Required<RengeThemeConfig> = {
  baseUnit: 4,
  typeBase: 16,
  scaleRatio: PHI,
  profile: "ocean",
  variance: 0,
  varianceSeed: "renge",
  includeReset: false,
  selector: ":root",
};

// ============================================================================
// Theme Generator
// ============================================================================

export function createRengeTheme(config: RengeThemeConfig = {}): RengeTheme {
  const resolved = { ...defaults, ...config };
  const {
    baseUnit,
    typeBase,
    scaleRatio,
    profile,
    variance,
    varianceSeed,
    selector,
    includeReset,
  } = resolved;

  // Deterministic random if variance is enabled
  const random = variance > 0 ? seededRandom(varianceSeed) : undefined;

  // Generate all scales
  const spacing = createSpacingScale(baseUnit, variance, random);
  const typography = createTypeScale(typeBase, scaleRatio);
  const duration = createDurationScale(variance, random);
  const easing = createEasingTokens();
  const radius = createRadiusScale(baseUnit, variance, random);
  const fractal = createFractalScale(baseUnit);
  const paletteVars = createPaletteVars();
  const semanticVars = createSemanticColorVars(profiles[profile]);

  // Assemble all CSS variables
  const vars: Record<string, string> = {};

  // Spacing
  for (const [key, value] of Object.entries(spacing)) {
    vars[`--renge-space-${key}`] = value;
  }

  // Typography
  for (const [key, { fontSize, lineHeight }] of Object.entries(typography)) {
    vars[`--renge-font-size-${key}`] = fontSize;
    vars[`--renge-line-height-${key}`] = lineHeight;
  }

  // Duration
  for (const [key, value] of Object.entries(duration)) {
    vars[`--renge-duration-${key}`] = value;
  }

  // Easing
  for (const [key, value] of Object.entries(easing)) {
    vars[`--renge-easing-${key}`] = value;
  }

  // Radius
  for (const [key, value] of Object.entries(radius)) {
    vars[`--renge-radius-${key}`] = value;
  }

  // Fractal size scale
  for (const [key, value] of Object.entries(fractal)) {
    vars[`--renge-size-${key}`] = value;
  }

  // Palette
  for (const [key, value] of Object.entries(paletteVars)) {
    vars[key] = value;
  }

  // Semantic colors
  for (const [key, value] of Object.entries(semanticVars)) {
    vars[key] = value;
  }

  // Animations
  for (const [key, value] of Object.entries(createAnimationVars())) {
    vars[key] = value;
  }

  // Generate CSS
  const css = generateCSS(vars, selector, includeReset, createAnimationKeyframesCSS());

  return { config: resolved, vars, css };
}

// ============================================================================
// CSS Generator
// ============================================================================

function generateCSS(
  vars: Record<string, string>,
  selector: string,
  includeReset: boolean,
  keyframesCSS: string
): string {
  const lines: string[] = [];

  if (includeReset) {
    lines.push(`*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`);
  }

  lines.push(`${selector} {`);

  // Group by category for readable output
  const categories = [
    { prefix: "--renge-space-", comment: "/* Spacing */" },
    { prefix: "--renge-font-size-", comment: "/* Typography - Font Size */" },
    {
      prefix: "--renge-line-height-",
      comment: "/* Typography - Line Height */",
    },
    { prefix: "--renge-duration-", comment: "/* Motion - Duration */" },
    { prefix: "--renge-easing-", comment: "/* Motion - Easing */" },
    { prefix: "--renge-radius-", comment: "/* Border Radius */" },
    { prefix: "--renge-size-", comment: "/* Fractal Size Scale */" },
    { prefix: "--renge-animation-", comment: "/* Animations */" },
    { prefix: "--renge-palette-", comment: "/* Palette Colors */" },
    { prefix: "--renge-color-", comment: "/* Semantic Colors */" },
  ];

  for (const { prefix, comment } of categories) {
    const categoryVars = Object.entries(vars)
      .filter(([key]) => key.startsWith(prefix))
      .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));

    if (categoryVars.length > 0) {
      lines.push(`  ${comment}`);
      for (const [key, value] of categoryVars) {
        lines.push(`  ${key}: ${value};`);
      }
      lines.push("");
    }
  }

  lines.push("}");

  if (keyframesCSS) {
    lines.push("");
    lines.push("/* Animation Keyframes */");
    lines.push(keyframesCSS);
  }

  return lines.join("\n");
}
