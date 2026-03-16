/**
 * Void Profile
 *
 * Light: Absolute silence — near-pure white, near-zero chroma. Clarity without color.
 * Dark:  Deep void — near-pure black, moonlight accent. Everything stripped to essence.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(99% 0.00 0)",             // pure near-white
  bgSubtle:     "oklch(96% 0.01 250)",
  bgMuted:      "oklch(90% 0.01 250)",
  bgInverse:    "oklch(8% 0.00 0)",              // pure near-black
  fg:           "oklch(12% 0.00 0)",             // true neutral near-black
  fgSubtle:     "oklch(26% 0.01 250)",
  fgMuted:      "oklch(48% 0.01 250)",           // ~4.6:1 on white — AA ✓
  fgInverse:    "oklch(97% 0.00 0)",
  border:       "oklch(82% 0.01 250)",
  borderSubtle: "oklch(91% 0.00 0)",
  borderFocus:  "oklch(28% 0.04 250)",
  accent:       "oklch(28% 0.04 250)",           // dark cool grey — high contrast on white
  accentHover:  "oklch(18% 0.03 250)",
  accentSubtle: "oklch(94% 0.02 250)",
  success:      oklch(palette.grassGreen),
  successSubtle:"oklch(93% 0.04 120)",
  warning:      oklch(palette.sunsetOrange),
  warningSubtle:"oklch(95% 0.03 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(95% 0.03 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(94% 0.03 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(7%  0.00 0)",             // the void
  bgSubtle:     "oklch(12% 0.01 250)",
  bgMuted:      "oklch(18% 0.01 250)",
  bgInverse:    "oklch(96% 0.00 0)",
  fg:           "oklch(94% 0.01 250)",
  fgSubtle:     "oklch(68% 0.01 250)",
  fgMuted:      "oklch(40% 0.01 250)",
  fgInverse:    "oklch(7%  0.00 0)",
  border:       "oklch(20% 0.01 250)",
  borderSubtle: "oklch(14% 0.01 250)",
  borderFocus:  "oklch(72% 0.03 250)",
  accent:       "oklch(80% 0.04 250)",           // moonlight — quiet but present
  accentHover:  "oklch(90% 0.03 250)",
  accentSubtle: "oklch(16% 0.02 250)",
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(14% 0.06 170)",
  warning:      oklch(palette.wheatYellow),
  warningSubtle:"oklch(14% 0.05 60)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(14% 0.06 0)",
  info:         oklch(palette.skyGrey),
  infoSubtle:   "oklch(14% 0.03 210)",
};

export const void_ = { light, dark };
