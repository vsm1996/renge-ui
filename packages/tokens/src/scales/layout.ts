/**
 * Layout Scale
 *
 * PHI-derived container widths, column min-widths, and aspect ratios.
 * Every value is mathematically derived — no arbitrary numbers.
 */

import { PHI } from "../constants";

/**
 * Container max-widths: 200px × φⁿ (n = 2..5)
 *
 * Each tier is φ times the previous — one multiplicative ratio governs
 * the entire sequence. The jump from sm → xl traces the same curve as
 * a nautilus shell growing outward from its center.
 *
 *   sm:   200 × φ² =  524px  — narrow prose / sidebar
 *   md:   200 × φ³ =  847px  — comfortable reading width
 *   lg:   200 × φ⁴ = 1371px  — full desktop layout
 *   xl:   200 × φ⁵ = 2218px  — ultra-wide / dashboard
 *   full: 100%               — unbounded
 */
export function createContainerWidths(): Record<string, string> {
  const base = 200;
  return {
    sm:   `${Math.round(base * Math.pow(PHI, 2))}px`,
    md:   `${Math.round(base * Math.pow(PHI, 3))}px`,
    lg:   `${Math.round(base * Math.pow(PHI, 4))}px`,
    xl:   `${Math.round(base * Math.pow(PHI, 5))}px`,
    full: "100%",
  };
}

/**
 * Column min-widths for auto-fit / auto-fill grids: Fibonacci[6..9] × 8px
 *
 * 8px is a common component base unit. Multiplying by Fibonacci numbers
 * from the middle of the sequence (21, 34, 55, 89) yields sizes that
 * feel proportional at every level of UI density.
 *
 *   xs:  21 × 8 = 168px  — icon lists, dense chips
 *   sm:  34 × 8 = 272px  — cards, compact panels
 *   md:  55 × 8 = 440px  — article columns, forms
 *   lg:  89 × 8 = 712px  — wide content areas, feature sections
 */
export function createColumnMinWidths(): Record<string, string> {
  const unit = 8;
  return {
    xs: `${21 * unit}px`,
    sm: `${34 * unit}px`,
    md: `${55 * unit}px`,
    lg: `${89 * unit}px`,
  };
}

/**
 * Aspect ratios — PHI-derived and standard screen ratios
 *
 *   square:   1     — 1:1 equal dimensions
 *   golden:   φ     — 1:φ landscape golden rectangle; Fibonacci approx 34:21
 *   vertical: 1/φ   — φ:1 portrait golden rectangle; Fibonacci approx 21:34
 *   video:    16/9  — standard widescreen
 *   classic:  4/3   — legacy broadcast / early monitor
 *
 * Values are plain numbers; CSS `aspect-ratio` accepts a single <number>
 * as width/height (e.g. `aspect-ratio: 1.618` means width = 1.618 × height).
 */
export function createAspectRatios(): Record<string, string> {
  return {
    square:   "1",
    golden:   PHI.toFixed(6),
    vertical: (1 / PHI).toFixed(6),
    video:    (16 / 9).toFixed(6),
    classic:  (4 / 3).toFixed(6),
  };
}
