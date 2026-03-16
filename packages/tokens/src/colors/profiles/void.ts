/**
 * Void Profile
 *
 * Deep calm. Minimal energy state.
 * Near-black, near-zero chroma. Everything stripped to essence.
 * Accent is cool moonlight — present but not demanding.
 *
 * Hue guide:
 *   All surfaces: h ≈ 250 (cool night, barely detectable)
 *   Accent: cool grey-white — moonlight, not spotlight
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const void_: SemanticColorMap = {
  bg:           "oklch(7%  0.00 0)",           // pure near-black — the void
  bgSubtle:     "oklch(12% 0.01 250)",         // with only the faintest cool presence
  bgMuted:      "oklch(18% 0.01 250)",         // slightly lifted dark
  bgInverse:    "oklch(96% 0.00 0)",           // near-pure white (inverse)
  fg:           "oklch(94% 0.01 250)",         // barely-cool white text
  fgSubtle:     "oklch(68% 0.01 250)",         // dimmed white
  fgMuted:      "oklch(40% 0.01 250)",         // very dim — present but receding
  fgInverse:    "oklch(7%  0.00 0)",           // black on white surface
  border:       "oklch(20% 0.01 250)",         // barely visible dark line
  borderSubtle: "oklch(14% 0.01 250)",         // almost invisible
  borderFocus:  "oklch(72% 0.03 250)",         // moonlight focus ring — subtle
  accent:       "oklch(80% 0.04 250)",         // moonlight grey — cool, present, quiet
  accentHover:  "oklch(90% 0.03 250)",         // slightly brighter on hover
  accentSubtle: "oklch(16% 0.02 250)",         // barely-there tint
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(14% 0.06 170)",
  warning:      oklch(palette.wheatYellow),
  warningSubtle:"oklch(14% 0.05 60)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(14% 0.06 0)",
  info:         oklch(palette.skyGrey),
  infoSubtle:   "oklch(14% 0.03 210)",
};
