/**
 * Fractal Size Scale
 *
 * Pure PHI power series. Each step = base × φⁿ.
 *
 * Unlike the Fibonacci spacing scale (which approximates φ growth),
 * this is exact φ multiplication — intended for component dimensions
 * where self-similarity across scales is the architectural requirement.
 *
 * A component at size-3 contains the same proportional logic as
 * one at size-6, scaled by exactly φ³. This is the fractal property:
 * the small version is a precise mathematical miniature of the large.
 *
 * Default (baseUnit: 4):
 *   size-1:  4.00px  (φ⁰)
 *   size-2:  6.47px  (φ¹)
 *   size-3: 10.47px  (φ²)
 *   size-4: 16.94px  (φ³)
 *   size-5: 27.42px  (φ⁴)
 *   size-6: 44.36px  (φ⁵)
 *   size-7: 71.78px  (φ⁶)
 */

import { PHI } from "../constants";

export const FRACTAL_STEPS = 7;

export function createFractalScale(
  baseUnit: number = 4
): Record<string, string> {
  const scale: Record<string, string> = {};

  for (let n = 0; n < FRACTAL_STEPS; n++) {
    const value = baseUnit * Math.pow(PHI, n);
    scale[String(n + 1)] = `${+value.toFixed(2)}px`;
  }

  return scale;
}
