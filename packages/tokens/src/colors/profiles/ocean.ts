/**
 * Ocean Profile
 *
 * Bright, airy. The default.
 * Sky-blue accent, snow-white backgrounds.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const ocean: SemanticColorMap = {
  bg: oklch(palette.snowWhite),
  bgSubtle: oklch(palette.fogWhite),
  bgMuted: "oklch(95% 0.02 210)",
  bgInverse: oklch(palette.slateBlue),
  fg: "oklch(20% 0.02 210)",
  fgSubtle: "oklch(35% 0.03 210)",
  fgMuted: oklch(palette.skyGrey),
  fgInverse: oklch(palette.snowWhite),
  border: "oklch(80% 0.02 210)",
  borderSubtle: "oklch(90% 0.01 210)",
  borderFocus: oklch(palette.skyBlue),
  accent: oklch(palette.skyBlue),
  accentHover: oklch(palette.riverBlue),
  accentSubtle: "oklch(92% 0.08 210)",
  success: oklch(palette.grassGreen),
  successSubtle: "oklch(92% 0.08 120)",
  warning: oklch(palette.sunsetOrange),
  warningSubtle: "oklch(92% 0.08 40)",
  danger: oklch(palette.cranberryRed),
  dangerSubtle: "oklch(92% 0.08 0)",
  info: oklch(palette.riverBlue),
  infoSubtle: "oklch(92% 0.08 200)",
};
