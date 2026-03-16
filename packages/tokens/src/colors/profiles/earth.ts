/**
 * Earth Profile
 *
 * Light: Warm parchment — cream surfaces, dark-brown text, amber accent.
 * Dark:  Deep soil — rich earth-brown backgrounds, amber accent on dark.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(97% 0.015 52)",           // warm parchment — golden-beige, clearly not white
  bgSubtle:     "oklch(93% 0.04 50)",            // visible ochre warmth
  bgMuted:      "oklch(86% 0.08 48)",            // clay-toned surface
  bgInverse:    "oklch(22% 0.05 35)",            // dark soil inverse
  fg:           "oklch(18% 0.06 40)",            // warm dark brown, not neutral black
  fgSubtle:     "oklch(34% 0.10 42)",
  fgMuted:      "oklch(52% 0.10 46)",
  fgInverse:    "oklch(97% 0.015 52)",           // parchment on dark surface
  border:       "oklch(76% 0.08 48)",
  borderSubtle: "oklch(89% 0.05 50)",
  borderFocus:  "oklch(48% 0.20 50)",            // golden ochre — ~5:1 on parchment
  accent:       "oklch(48% 0.20 50)",            // golden ochre — warm clay, clearly distinct from fire's red-orange
  accentHover:  "oklch(40% 0.22 48)",
  accentSubtle: "oklch(92% 0.10 50)",            // golden tint on parchment
  success:      oklch(palette.grassGreen),
  successSubtle:"oklch(92% 0.06 120)",
  warning:      oklch(palette.sunsetOrange),
  warningSubtle:"oklch(94% 0.05 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(94% 0.05 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(94% 0.05 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(22% 0.05 35)",            // deep soil brown
  bgSubtle:     "oklch(28% 0.07 35)",
  bgMuted:      "oklch(36% 0.08 35)",
  bgInverse:    "oklch(94% 0.03 42)",            // warm cream inverse
  fg:           "oklch(93% 0.03 42)",            // warm cream text
  fgSubtle:     "oklch(76% 0.07 40)",
  fgMuted:      "oklch(58% 0.09 38)",
  fgInverse:    "oklch(20% 0.05 35)",
  border:       "oklch(44% 0.08 35)",
  borderSubtle: "oklch(32% 0.06 35)",
  borderFocus:  "oklch(78% 0.24 42)",
  accent:       "oklch(78% 0.24 42)",            // amber-ochre on dark soil
  accentHover:  "oklch(70% 0.22 42)",
  accentSubtle: "oklch(30% 0.12 42)",
  success:      oklch(palette.leafGreen),
  successSubtle:"oklch(25% 0.08 130)",
  warning:      "oklch(80% 0.20 50)",
  warningSubtle:"oklch(28% 0.08 50)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(26% 0.08 10)",
  info:         oklch(palette.skyBlue),
  infoSubtle:   "oklch(26% 0.06 210)",
};

export const earth = { light, dark };
