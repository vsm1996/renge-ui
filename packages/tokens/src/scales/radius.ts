/**
 * Radius Scale
 *
 * Fibonacci × baseUnit for border radius.
 * Includes none (0) and full (pill) as bookends.
 *
 * Numeric steps are calc-based so the base unit is a runtime variable:
 *   calc(<fib> * var(--renge-base-unit, <baseUnit>px))
 * The none/full bookends remain fixed (0px / pill).
 */

import { FIBONACCI, applyVariance } from "../constants";

export function createRadiusScale(
  baseUnit: number,
  variance: number = 0,
  random?: () => number
): Record<string, string> {
  const scale: Record<string, string> = {
    none: "0px",
    full: "9999px",
  };

  FIBONACCI.slice(0, 5).forEach((fib, index) => {
    let multiplier: number = fib;
    if (variance > 0 && random) {
      multiplier = applyVariance(multiplier, variance, random);
    }
    scale[String(index + 1)] = `calc(${multiplier} * var(--renge-base-unit, ${baseUnit}px))`;
  });

  return scale;
}
