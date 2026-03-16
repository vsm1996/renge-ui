/**
 * Leaf Profile
 *
 * Light: Daylight through the canopy — near-white, barely green, forest accent. WCAG AA throughout.
 * Dark:  Forest floor at night — dark green depths, fresh vivid leaf accent.
 *
 * Accessibility (light mode):
 *   fg (L=16) on bg (L=98):           ~18:1 — AAA ✓
 *   fgSubtle (L=30) on bg (L=98):     ~10:1 — AAA ✓
 *   fgMuted (L=50) on bg (L=98):      ~4.6:1 — AA  ✓
 *   accent (L=50) on bg (L=98):       ~5.5:1 — AA  ✓
 *   accent (L=50) on accentSubtle (L=93): ~4.8:1 — AA ✓
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

const light: SemanticColorMap = {
  bg:           "oklch(98% 0.01 130)",           // near-pure white, barely green
  bgSubtle:     "oklch(94% 0.02 130)",
  bgMuted:      "oklch(88% 0.03 130)",
  bgInverse:    "oklch(28% 0.14 135)",           // deep forest inverse
  fg:           "oklch(16% 0.04 135)",           // near-black, deep green undertone
  fgSubtle:     "oklch(30% 0.05 135)",
  fgMuted:      "oklch(50% 0.06 130)",           // AA on bg ✓
  fgInverse:    "oklch(97% 0.01 130)",
  border:       "oklch(78% 0.04 130)",
  borderSubtle: "oklch(90% 0.02 130)",
  borderFocus:  "oklch(50% 0.20 130)",           // forest green focus — ~5.5:1 ✓
  accent:       "oklch(50% 0.20 130)",
  accentHover:  "oklch(44% 0.22 130)",
  accentSubtle: "oklch(93% 0.06 130)",
  success:      oklch(palette.seaFoam),          // teal — distinct from green accent
  successSubtle:"oklch(92% 0.06 170)",
  warning:      oklch(palette.sunsetOrange),
  warningSubtle:"oklch(94% 0.04 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(94% 0.04 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(94% 0.04 200)",
};

const dark: SemanticColorMap = {
  bg:           "oklch(12% 0.06 135)",           // dark forest floor
  bgSubtle:     "oklch(18% 0.08 135)",
  bgMuted:      "oklch(26% 0.07 135)",
  bgInverse:    "oklch(97% 0.01 130)",           // near-white inverse
  fg:           "oklch(92% 0.02 130)",           // near-white with green hint
  fgSubtle:     "oklch(76% 0.04 130)",
  fgMuted:      "oklch(54% 0.05 130)",
  fgInverse:    "oklch(12% 0.06 135)",
  border:       "oklch(26% 0.06 135)",
  borderSubtle: "oklch(20% 0.04 135)",
  borderFocus:  "oklch(62% 0.22 130)",           // vivid forest green on dark bg
  accent:       "oklch(62% 0.22 130)",           // fresh leaf green — L=62 pops on dark
  accentHover:  "oklch(70% 0.20 130)",
  accentSubtle: "oklch(20% 0.10 130)",
  success:      oklch(palette.seaFoam),
  successSubtle:"oklch(18% 0.08 170)",
  warning:      oklch(palette.honeyYellow),
  warningSubtle:"oklch(20% 0.06 52)",
  danger:       oklch(palette.coralPink),
  dangerSubtle: "oklch(20% 0.08 22)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(20% 0.06 200)",
};

export const leaf = { light, dark };
