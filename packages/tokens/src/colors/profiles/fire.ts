/**
 * Fire Profile
 *
 * High energy. Active state.
 * Deep charcoal backgrounds, ember-warm surfaces, burning orange accent.
 *
 * Hue guide:
 *   bg/neutrals: h ≈ 22–30 (dark char, warm undertone)
 *   fg/text:     h ≈ 36–42 (warm off-white, parchment)
 *   accent:      h ≈ 38–42 (burning orange — sunsetOrange territory)
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const fire: SemanticColorMap = {
  bg:           "oklch(10% 0.04 25)",          // near-black char with ember warmth
  bgSubtle:     "oklch(16% 0.06 26)",          // glowing coal surface
  bgMuted:      "oklch(24% 0.08 28)",          // deeper ember layer
  bgInverse:    "oklch(95% 0.02 38)",          // pale warm cream (inverse)
  fg:           "oklch(93% 0.02 40)",          // warm off-white text
  fgSubtle:     "oklch(76% 0.05 38)",          // amber-light mid tone
  fgMuted:      "oklch(54% 0.08 32)",          // smoldering ember mid
  fgInverse:    "oklch(10% 0.04 25)",          // char on cream surface
  border:       "oklch(30% 0.10 30)",          // glowing ember border
  borderSubtle: "oklch(20% 0.07 27)",          // almost-invisible warm line
  borderFocus:  oklch(palette.sunsetOrange),   // burning orange focus ring
  accent:       oklch(palette.sunsetOrange),   // sunset orange — principal energy
  accentHover:  "oklch(68% 0.22 36)",          // hotter on hover
  accentSubtle: "oklch(20% 0.10 30)",          // deep ember tint for subtle surfaces
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(18% 0.08 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(20% 0.08 52)",
  danger:       oklch(palette.autumnRed),
  dangerSubtle: "oklch(18% 0.10 10)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(18% 0.06 200)",
};
