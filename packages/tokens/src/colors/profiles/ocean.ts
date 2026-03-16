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
  fgMuted:      oklch(palette.skyGrey),
  fgInverse:    oklch(palette.snowWhite),
  border:       "oklch(80% 0.02 210)",
  borderSubtle: "oklch(90% 0.01 210)",
  borderFocus:  oklch(palette.skyBlue),
  accent:       oklch(palette.skyBlue),
  accentHover:  oklch(palette.riverBlue),
  accentSubtle: "oklch(92% 0.04 210)",
  success:      oklch(palette.grassGreen),
  successSubtle:"oklch(92% 0.08 120)",
  warning:      oklch(palette.sunsetOrange),
  warningSubtle:"oklch(92% 0.08 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(92% 0.08 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(92% 0.08 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(14% 0.08 205)",           // deep ocean floor
  bgSubtle:     "oklch(20% 0.10 205)",           // lifted ocean dark
  bgMuted:      "oklch(27% 0.08 208)",
  bgInverse:    oklch(palette.fogWhite),
  fg:           "oklch(92% 0.02 205)",           // cool near-white
  fgSubtle:     "oklch(76% 0.04 205)",
  fgMuted:      "oklch(54% 0.06 210)",
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
