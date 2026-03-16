/**
 * Leaf Profile
 *
 * Light. Living. Organic.
 * Daylight through a forest canopy — near-white backgrounds with a
 * barely-perceptible green tint, forest-green accent.
 *
 * Accessibility: all text/bg combinations target WCAG AA minimum (4.5:1).
 *
 * Hue guide:
 *   surfaces: h ≈ 130  (yellow-green leaf hue)
 *   accent:   h ≈ 130  (forest green — L=50 gives ~5.5:1 on near-white bg)
 *   success:  h ≈ 170  (teal — intentionally distinct from the green accent)
 *   text:     h ≈ 135  (very dark green-black for maximum contrast)
 *
 * Contrast ratios (approximate WCAG):
 *   fg (L=16) on bg (L=98):           ~18:1  — AAA ✓
 *   fgSubtle (L=30) on bg (L=98):     ~10:1  — AAA ✓
 *   fgMuted (L=50) on bg (L=98):      ~4.6:1 — AA  ✓
 *   accent (L=50) on bg (L=98):       ~5.5:1 — AA  ✓
 *   accent (L=50) on accentSubtle (L=93): ~4.8:1 — AA ✓
 *   fgInverse (L=98) on bgInverse (L=28): ~15:1 — AAA ✓
 */

import type { SemanticColorMap } from "../../types";
import { oklch, palette } from "../palette";

export const leaf: SemanticColorMap = {
  bg:           "oklch(98% 0.01 130)",          // near-pure white, barely green
  bgSubtle:     "oklch(94% 0.02 130)",          // light green-tinted surface
  bgMuted:      "oklch(88% 0.03 130)",          // visibly tinted muted surface
  bgInverse:    "oklch(28% 0.14 135)",          // deep forest green (inverse)
  fg:           "oklch(16% 0.04 135)",          // near-black, deep green undertone
  fgSubtle:     "oklch(30% 0.05 135)",          // dark forest green
  fgMuted:      "oklch(50% 0.06 130)",          // medium green-grey — AA on bg ✓
  fgInverse:    "oklch(97% 0.01 130)",          // near-white on dark forest surface
  border:       "oklch(78% 0.04 130)",          // visible light-green border
  borderSubtle: "oklch(90% 0.02 130)",          // subtle near-white border
  borderFocus:  "oklch(50% 0.20 130)",          // vivid forest green focus ring
  accent:       "oklch(50% 0.20 130)",          // forest green — ~5.5:1 on bg ✓
  accentHover:  "oklch(44% 0.22 130)",          // deeper on hover
  accentSubtle: "oklch(93% 0.06 130)",          // light green tint for subtle surfaces
  success:      oklch(palette.seaFoam),         // teal — distinct from the green accent
  successSubtle:"oklch(92% 0.06 170)",
  warning:      oklch(palette.sunsetOrange),
  warningSubtle:"oklch(94% 0.04 40)",
  danger:       oklch(palette.cranberryRed),
  dangerSubtle: "oklch(94% 0.04 2)",
  info:         oklch(palette.riverBlue),
  infoSubtle:   "oklch(94% 0.04 200)",
};
