/**
 * Renge Palette
 *
 * 43 nature-inspired OKLCH colors.
 * This is the raw palette — components never consume these directly.
 * Profiles map palette → semantic tokens.
 *
 * Chroma values are calibrated to sRGB gamut boundaries per hue.
 * OKLCH chroma is absolute — C=0.1 at L=90 renders as vivid cyan,
 * not a subtle tint. Reference: CSS skyblue ≈ oklch(81% 0.10 221).
 */

import type { OklchColor } from "../types";

export const palette = {
  // Blues
  // H≈210: sRGB gamut ≈ C=0.14 max at L=75, C=0.18 max at L=50
  skyBlue:    { l: 75, c: 0.12, h: 210 }, // soft clear-day sky
  oceanBlue:  { l: 50, c: 0.16, h: 190 }, // deep ocean from the shore
  riverBlue:  { l: 60, c: 0.14, h: 200 }, // mountain stream, blue-green cast
  slateBlue:  { l: 50, c: 0.08, h: 210 }, // muted slate rock
  cobaltBlue: { l: 45, c: 0.22, h: 230 }, // vivid cobalt crystal (blue-violet)

  // Indigos
  indigo:     { l: 45, c: 0.22, h: 280 },
  deepIndigo: { l: 30, c: 0.18, h: 280 },
  wildIndigo: { l: 55, c: 0.22, h: 275 },

  // Purples
  // H≈250-270: sRGB gamut ≈ C=0.26-0.30 max at L=40-45
  twilightPurple: { l: 40, c: 0.26, h: 250 }, // deep twilight sky
  lavender:       { l: 75, c: 0.12, h: 240 }, // soft lavender fields
  plumPurple:     { l: 45, c: 0.26, h: 270 }, // ripe plum

  // Greens
  // H≈120-140: sRGB gamut ≈ C=0.26-0.30 max; greens are the most chromatic hue in sRGB
  grassGreen: { l: 68, c: 0.26, h: 120 }, // healthy lush grass
  leafGreen:  { l: 72, c: 0.24, h: 122 }, // fresh spring leaves
  mossGreen:  { l: 50, c: 0.20, h: 130 }, // forest floor moss
  seaFoam:    { l: 80, c: 0.10, h: 170 }, // pale ocean foam
  rainforest: { l: 45, c: 0.24, h: 130 }, // dense rainforest canopy
  pineGreen:  { l: 42, c: 0.22, h: 140 }, // pine tree needles
  appleGreen: { l: 75, c: 0.22, h: 120 }, // green apple skin
  oliveGreen: { l: 55, c: 0.12, h: 90  }, // muted olive leaf
  mossyRock:  { l: 45, c: 0.14, h: 125 }, // moss on weathered rock

  // Browns & Earthtones
  // H≈30: sRGB gamut ≈ C=0.12-0.14 max; browns are naturally low-chroma
  earthBrown:  { l: 45, c: 0.12, h: 30 }, // fertile soil
  barkBrown:   { l: 40, c: 0.10, h: 30 }, // tree bark
  chocolate:   { l: 35, c: 0.12, h: 30 }, // dark chocolate
  sandBeige:   { l: 75, c: 0.05, h: 40 }, // desert sand — very low chroma
  desertTan:   { l: 80, c: 0.06, h: 30 }, // dry desert soil
  earthyOchre: { l: 60, c: 0.16, h: 40 }, // clay-rich ochre

  // Oranges & Yellows
  // H≈40-60: sRGB gamut ≈ C=0.18-0.22 at L=60-70; yellows can reach C=0.28 at L=85+
  sunsetOrange: { l: 62, c: 0.20, h: 40 }, // golden hour warmth
  leafYellow:   { l: 70, c: 0.18, h: 62 }, // autumn birch/ginkgo
  wheatYellow:  { l: 76, c: 0.12, h: 60 }, // ripe wheat field
  honeyYellow:  { l: 78, c: 0.14, h: 52 }, // fresh honeycomb
  lemonYellow:  { l: 88, c: 0.22, h: 98 }, // lemon zest bright (H=98 = true lemon)

  // Reds & Pinks
  // H≈0-10: sRGB gamut ≈ C=0.24-0.26 max at L=55-63
  autumnRed:    { l: 58, c: 0.22, h: 10  }, // maple autumn foliage
  raspberryRed: { l: 55, c: 0.24, h: 2   }, // ripe raspberry
  firebrickRed: { l: 52, c: 0.20, h: 12  }, // volcanic/firebrick
  cranberryRed: { l: 55, c: 0.20, h: 2   }, // ripe cranberry
  coralPink:    { l: 76, c: 0.12, h: 22  }, // tropical coral reef (warm orange-pink)
  cherryBlossom:{ l: 90, c: 0.05, h: 340 }, // pale spring blooms — nearly white-pink
  wildflowerPink:{ l: 78, c: 0.10, h: 328 }, // soft meadow wildflower

  // Neutrals
  // These should be near-neutral with only the faintest tint
  snowWhite:  { l: 99, c: 0.01, h: 210 }, // fresh snow — pure, cool-neutral
  fogWhite:   { l: 93, c: 0.02, h: 210 }, // morning fog — barely-blue near-white
  birchWhite: { l: 93, c: 0.02, h: 40  }, // birch bark — barely-warm near-white
  skyGrey:    { l: 70, c: 0.04, h: 210 }, // overcast sky — light grey, cool hint
  stoneGrey:  { l: 52, c: 0.03, h: 30  }, // stone/rock — mid grey, warm hint
} as const satisfies Record<string, OklchColor>;

/**
 * Convert an OklchColor to a CSS oklch() string.
 */
export function oklch(color: OklchColor): string {
  return `oklch(${color.l}% ${color.c} ${color.h})`;
}

/**
 * Generate CSS custom properties for the full palette.
 */
export function createPaletteVars(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, color] of Object.entries(palette)) {
    const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    vars[`--renge-palette-${kebab}`] = oklch(color);
  }

  return vars;
}
