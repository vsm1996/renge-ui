/**
 * Earth Profile
 *
 * Dark soil. Rich earth-brown backgrounds, cream text, terracotta accent.
 *
 * Hue guide:
 *   bg/neutrals: h ≈ 32–38 (dark soil browns)
 *   fg/text:     h ≈ 38–44 (warm cream/parchment)
 *   Accent:      h ≈ 40    (earthyOchre — warm amber pops on dark brown)
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const earth: SemanticColorMap = {
  bg:           "oklch(22% 0.05 35)",          // deep soil brown
  bgSubtle:     "oklch(28% 0.07 35)",          // slightly lighter brown
  bgMuted:      "oklch(36% 0.08 35)",          // medium brown
  bgInverse:    "oklch(94% 0.03 42)",          // warm cream (inverse surface)
  fg:           "oklch(93% 0.03 42)",          // warm cream text
  fgSubtle:     "oklch(76% 0.07 40)",          // light tan
  fgMuted:      "oklch(58% 0.09 38)",          // muted sand
  fgInverse:    "oklch(20% 0.05 35)",          // dark brown on cream surface
  border:       "oklch(44% 0.08 35)",          // visible brown border
  borderSubtle: "oklch(32% 0.06 35)",          // subtle dark border
  borderFocus:  "oklch(78% 0.24 42)",          // amber-ochre focus ring
  accent:       "oklch(78% 0.24 42)",          // amber-ochre — warm, readable on dark soil
  accentHover:  "oklch(70% 0.28 42)",          // richer on hover
  accentSubtle: "oklch(30% 0.12 42)",          // dark ochre tint for subtle surfaces
  success:      oklch(palette.leafGreen),
  successSubtle:"oklch(25% 0.08 130)",
  warning:      "oklch(80% 0.20 50)",
  warningSubtle:"oklch(28% 0.08 50)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(26% 0.08 10)",
  info:         oklch(palette.skyBlue),
  infoSubtle:   "oklch(26% 0.06 210)",
};
