/**
 * Earth Profile
 *
 * Light: Warm parchment — cream surfaces, dark-brown text, amber accent.
 * Dark:  Deep soil — rich earth-brown backgrounds, amber accent on dark.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(98% 0.01 70)",            // warm cream — soft ivory, clearly beige not white
  bgSubtle:     "oklch(94% 0.02 68)",            // biscuit/linen tone
  bgMuted:      "oklch(88% 0.04 65)",            // deeper cream, like aged parchment
  bgInverse:    "oklch(22% 0.05 45)",            // dark walnut inverse
  fg:           "oklch(18% 0.04 50)",            // warm near-black, brown not blue-black
  fgSubtle:     "oklch(35% 0.07 52)",
  fgMuted:      "oklch(52% 0.07 58)",
  fgInverse:    "oklch(97% 0.01 70)",            // cream on dark surface
  border:       "oklch(80% 0.04 65)",
  borderSubtle: "oklch(91% 0.02 68)",
  borderFocus:  "oklch(46% 0.16 58)",            // warm tan-brown — ~5:1 on cream
  accent:       "oklch(46% 0.16 58)",            // warm tan — clearly golden-beige, not orange or red
  accentHover:  "oklch(38% 0.18 55)",
  accentSubtle: "oklch(94% 0.05 68)",            // barely-there cream tint
  success:      oklch(palette.mossGreen),
  successSubtle:"oklch(92% 0.06 130)",
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
