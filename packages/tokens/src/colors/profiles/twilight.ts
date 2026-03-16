/**
 * Twilight Profile
 *
 * The transition between daylight and darkness.
 * Deep inky blue-purple backgrounds with warm amber/orange horizon glow.
 * High contrast, serene, dramatic.
 *
 * The key is tension between cool depth (background, text) and warm light
 * (accent, borders) — the way a sunset sky holds both blue and orange at once.
 *
 * Hue guide:
 *   bg:       h ≈ 260–270 (deep blue-purple, inky)
 *   fg:       h ≈ 255–260 (cool lavender-white)
 *   accent:   h ≈ 38–45   (amber-orange horizon glow)
 *   borders:  h ≈ 255–270 (cool indigo lines)
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const twilight: SemanticColorMap = {
  bg:           "oklch(14% 0.10 269)",          // deep inky indigo-purple
  bgSubtle:     "oklch(20% 0.12 272)",          // slightly lifted, still deep
  bgMuted:      "oklch(28% 0.10 269)",          // mid-depth layer
  bgInverse:    "oklch(94% 0.02 45)",           // warm cream inverse — like the lit horizon
  fg:           "oklch(92% 0.04 258)",          // cool near-white, faint purple hint
  fgSubtle:     "oklch(76% 0.06 258)",          // periwinkle mid-tone
  fgMuted:      "oklch(52% 0.08 263)",          // muted indigo-purple grey
  fgInverse:    "oklch(14% 0.10 269)",          // deep on warm surface
  border:       "oklch(34% 0.10 272)",          // visible border
  borderSubtle: "oklch(24% 0.08 272)",          // subtle dark line
  borderFocus:  oklch(palette.sunsetOrange),    // amber-orange focus — warm against dark blue
  accent:       oklch(palette.sunsetOrange),    // the horizon glow — amber/orange against deep blue
  accentHover:  "oklch(68% 0.22 36)",           // hotter orange on hover
  accentSubtle: "oklch(22% 0.10 40)",           // deep ember tint (subtle warm surface)
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(22% 0.10 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(22% 0.08 52)",
  danger:       oklch(palette.coralPink),
  dangerSubtle: "oklch(22% 0.10 22)",
  info:         oklch(palette.skyBlue),
  infoSubtle:   "oklch(22% 0.08 210)",
};
