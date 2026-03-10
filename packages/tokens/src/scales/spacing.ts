/**
 * Spacing Scale
 *
 * Fibonacci × baseUnit. Natural growth, not arbitrary steps.
 * Default (baseUnit: 4): 1×4, 2×4, 3×4, 5×4, 8×4, 13×4, 21×4, 34×4, 55×4, 89×4
 */

import { FIBONACCI, applyVariance } from "../constants";

export function createSpacingScale(
  baseUnit: number,
  variance: number = 0,
  random?: () => number
): Record<string, string> {
  const scale: Record<string, string> = { "0": "0px" };

  FIBONACCI.forEach((fib, index) => {
    let value = fib * baseUnit;
    if (variance > 0 && random) {
      value = applyVariance(value, variance, random);
    }
    scale[String(index + 1)] = `${value}px`;
  });

  return scale;
}
