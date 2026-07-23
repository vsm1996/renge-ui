/**
 * Ocean Profile
 *
 * Light: Bright, airy — sky-blue accent on near-white. The default.
 * Dark:  Deep ocean — dark teal-blue, bright sky accent on near-black water.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           oklch(palette.snowWhite),
  bgSubtle:     oklch(palette.fogWhite),
  bgMuted:      "oklch(95% 0.02 210)",
  bgInverse:    oklch(palette.slateBlue),
  fg:           "oklch(20% 0.02 210)",
  fgSubtle:     "oklch(35% 0.03 210)",
  fgMuted:      "oklch(46% 0.04 210)",           // WCAG AA: ~5:1 on white (skyGrey L=70 was 2.56:1)
  fgInverse:    oklch(palette.snowWhite),
  border:       "oklch(80% 0.02 210)",
  borderSubtle: "oklch(90% 0.01 210)",
  borderFocus:  "oklch(53% 0.12 210)",           // unified with accent (4.70:1 on bg; ≥3:1 focus indicator)
  accent:       "oklch(53% 0.12 210)",          // WCAG AA: 4.70:1 on bg. (Was 60% — a prior "fix" made with the buggy contrast validator, actually only 3.59:1.)
  accentHover:  oklch(palette.riverBlue),
  accentSubtle: "oklch(92% 0.04 210)",
  success:      oklch(palette.mossGreen),
  successSubtle:"oklch(92% 0.08 130)",
  warning:      "oklch(55% 0.2 40)",   // AA: darkened for 4.5:1 text-on-bg (was sunsetOrange, ~3.9:1)
  warningSubtle:"oklch(92% 0.08 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(92% 0.08 2)",
  info:         "oklch(50% 0.14 200)",  // AA: darkened for 4.5:1 text-on-bg (was riverBlue, ~3.4:1)
  infoSubtle:   "oklch(92% 0.08 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(14% 0.08 205)",           // deep ocean floor
  bgSubtle:     "oklch(20% 0.10 205)",           // lifted ocean dark
  bgMuted:      "oklch(27% 0.08 208)",
  bgInverse:    oklch(palette.fogWhite),
  fg:           "oklch(92% 0.02 205)",           // cool near-white
  fgSubtle:     "oklch(76% 0.04 205)",
  fgMuted:      "oklch(62% 0.06 210)",         // WCAG AA >=4.5:1 on bg + bg-subtle (was 54%, ~2.9:1)
  fgInverse:    "oklch(14% 0.08 205)",
  border:       "oklch(28% 0.06 208)",
  borderSubtle: "oklch(22% 0.04 208)",
  borderFocus:  oklch(palette.skyBlue),
  accent:       oklch(palette.skyBlue),          // L=75 reads well on dark ocean
  accentHover:  "oklch(82% 0.12 210)",           // brighter on hover in dark context
  accentSubtle: "oklch(22% 0.08 210)",
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(20% 0.10 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(22% 0.08 52)",
  danger:       oklch(palette.coralPink),
  dangerSubtle: "oklch(22% 0.08 22)",
  info:         oklch(palette.skyBlue),
  infoSubtle:   "oklch(22% 0.08 210)",
};

export const ocean = { light, dark };
