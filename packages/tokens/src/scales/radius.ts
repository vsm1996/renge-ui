/**
 * Radius Scale
 *
 * Fibonacci × baseUnit for border radius.
 * Includes none (0) and full (pill) as bookends.
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
    let value = fib * baseUnit;
    if (variance > 0 && random) {
      value = applyVariance(value, variance, random);
    }
    scale[String(index + 1)] = `${value}px`;
  });

  return scale;
}
