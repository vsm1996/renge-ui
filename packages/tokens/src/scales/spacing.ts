/**
 * Spacing Scale
 *
 * Fibonacci × baseUnit. Natural growth, not arbitrary steps.
 * Default (baseUnit: 4): 1×4, 2×4, 3×4, 5×4, 8×4, 13×4, 21×4, 34×4, 55×4, 89×4
 *
 * Output is calc-based so the base unit is a runtime variable:
 *   calc(<fib> * var(--renge-base-unit, <baseUnit>px))
 * The Fibonacci multiplier is fixed at build time; only the base unit can be
 * overridden at runtime (e.g. switchScale()) without regenerating tokens.
 */

import { FIBONACCI, applyVariance } from "../constants";

export function createSpacingScale(
  baseUnit: number,
  variance: number = 0,
  random?: () => number
): Record<string, string> {
  const scale: Record<string, string> = { "0": "0px" };

  FIBONACCI.forEach((fib, index) => {
    let multiplier: number = fib;
    if (variance > 0 && random) {
      multiplier = applyVariance(multiplier, variance, random);
    }
    scale[String(index + 1)] = `calc(${multiplier} * var(--renge-base-unit, ${baseUnit}px))`;
  });

  return scale;
}
