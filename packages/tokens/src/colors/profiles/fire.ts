/**
 * Fire Profile
 *
 * Light: Ember glow — near-white with an orange-red blush, deep red-orange accent. Distinct from Earth.
 * Dark:  Deep charcoal — near-black with coal warmth, burning orange accent.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(99% 0.005 26)",           // near-white, faintest ember blush
  bgSubtle:     "oklch(96% 0.03 24)",            // visible orange-red warmth
  bgMuted:      "oklch(90% 0.07 22)",            // ember-tinted, clearly orange
  bgInverse:    "oklch(14% 0.05 26)",            // deep char inverse
  fg:           "oklch(16% 0.04 22)",            // near-black, coal undertone
  fgSubtle:     "oklch(30% 0.07 24)",
  fgMuted:      "oklch(50% 0.07 28)",
  fgInverse:    "oklch(96% 0.02 26)",
  border:       "oklch(80% 0.06 22)",
  borderSubtle: "oklch(92% 0.03 24)",
  borderFocus:  "oklch(50% 0.22 24)",            // deep red-orange ember — ~5:1 on near-white
  accent:       "oklch(50% 0.22 24)",            // burning ember — red-orange, distinct from Earth's amber
  accentHover:  "oklch(42% 0.24 22)",
  accentSubtle: "oklch(96% 0.10 24)",            // orange-red glow on surface
  success:      oklch(palette.mossGreen),
  successSubtle:"oklch(93% 0.05 130)",
  warning:      "oklch(62% 0.20 52)",
  warningSubtle:"oklch(95% 0.04 52)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(95% 0.04 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(94% 0.04 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(10% 0.04 25)",            // near-black char, ember warmth
  bgSubtle:     "oklch(16% 0.06 26)",
  bgMuted:      "oklch(24% 0.08 28)",
  bgInverse:    "oklch(95% 0.02 38)",            // pale warm cream
  fg:           "oklch(93% 0.02 40)",            // warm off-white
  fgSubtle:     "oklch(76% 0.05 38)",
  fgMuted:      "oklch(54% 0.08 32)",
  fgInverse:    "oklch(10% 0.04 25)",
  border:       "oklch(30% 0.10 30)",
  borderSubtle: "oklch(20% 0.07 27)",
  borderFocus:  oklch(palette.sunsetOrange),
  accent:       oklch(palette.sunsetOrange),     // burning orange on dark char
  accentHover:  "oklch(68% 0.22 36)",
  accentSubtle: "oklch(20% 0.10 30)",
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(18% 0.08 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(20% 0.08 52)",
  danger:       oklch(palette.autumnRed),
  dangerSubtle: "oklch(18% 0.10 10)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(18% 0.06 200)",
};

export const fire = { light, dark };
