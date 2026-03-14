/**
 * Earth Profile
 *
 * Grounded, warm. The alternative light theme.
 * Rich brown accent, warm tan backgrounds.
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const earth: SemanticColorMap = {
  bg: oklch(palette.birchWhite),
  bgSubtle: oklch(palette.desertTan),
  bgMuted: "oklch(92% 0.03 28)",
  bgInverse: oklch(palette.barkBrown),
  fg: "oklch(18% 0.04 28)",
  fgSubtle: "oklch(33% 0.05 28)",
  fgMuted: "oklch(52% 0.1 28)",
  fgInverse: oklch(palette.birchWhite),
  border: "oklch(76% 0.05 28)",
  borderSubtle: "oklch(87% 0.03 28)",
  borderFocus: oklch(palette.earthBrown),
  accent: oklch(palette.earthBrown),
  accentHover: oklch(palette.chocolate),
  accentSubtle: "oklch(88% 0.06 28)",
  success: oklch(palette.mossGreen),
  successSubtle: "oklch(90% 0.08 130)",
  warning: oklch(palette.sunsetOrange),
  warningSubtle: "oklch(90% 0.08 40)",
  danger: oklch(palette.autumnRed),
  dangerSubtle: "oklch(90% 0.08 10)",
  info: oklch(palette.slateBlue),
  infoSubtle: "oklch(90% 0.08 210)",
};
