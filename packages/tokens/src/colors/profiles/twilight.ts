/**
 * Twilight Profile
 *
 * The transition between daylight and darkness.
 *
 * Light: Soft dusk periwinkle sky — lavender-tinted surfaces, orange horizon accent.
 * Dark:  Deep inky indigo-purple — the tension of cool depth vs warm horizon glow.
 *
 * The amber/orange accent reads against both modes:
 *   on light (periwinkle bg) — warm glow against cool sky
 *   on dark  (indigo bg)     — ember against deep night
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(96% 0.02 265)",           // soft dusk periwinkle-white
  bgSubtle:     "oklch(91% 0.03 268)",
  bgMuted:      "oklch(84% 0.05 265)",
  bgInverse:    "oklch(18% 0.12 269)",           // deep night inverse
  fg:           "oklch(16% 0.08 265)",           // dark indigo-navy, high contrast
  fgSubtle:     "oklch(30% 0.10 265)",
  fgMuted:      "oklch(50% 0.08 260)",
  fgInverse:    "oklch(92% 0.04 258)",           // cool near-white on dark
  border:       "oklch(78% 0.06 268)",
  borderSubtle: "oklch(88% 0.04 268)",
  borderFocus:  oklch(palette.sunsetOrange),     // warm horizon against cool sky
  accent:       oklch(palette.sunsetOrange),
  accentHover:  "oklch(54% 0.22 36)",
  accentSubtle: "oklch(93% 0.04 40)",            // barely-warm tint on periwinkle bg
  success:      oklch(palette.grassGreen),
  successSubtle:"oklch(92% 0.06 120)",
  warning:      "oklch(62% 0.20 40)",
  warningSubtle:"oklch(94% 0.04 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(94% 0.04 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(92% 0.05 210)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(14% 0.10 269)",           // deep inky indigo-purple
  bgSubtle:     "oklch(20% 0.12 272)",
  bgMuted:      "oklch(28% 0.10 269)",
  bgInverse:    "oklch(94% 0.02 45)",            // warm cream — lit horizon
  fg:           "oklch(92% 0.04 258)",           // cool near-white
  fgSubtle:     "oklch(76% 0.06 258)",
  fgMuted:      "oklch(52% 0.08 263)",
  fgInverse:    "oklch(14% 0.10 269)",
  border:       "oklch(34% 0.10 272)",
  borderSubtle: "oklch(24% 0.08 272)",
  borderFocus:  oklch(palette.sunsetOrange),
  accent:       oklch(palette.sunsetOrange),     // amber horizon against deep indigo
  accentHover:  "oklch(68% 0.22 36)",
  accentSubtle: "oklch(22% 0.10 40)",
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(22% 0.10 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(22% 0.08 52)",
  danger:       oklch(palette.coralPink),
  dangerSubtle: "oklch(22% 0.10 22)",
  info:         oklch(palette.skyBlue),
  infoSubtle:   "oklch(22% 0.08 210)",
};

export const twilight = { light, dark };
