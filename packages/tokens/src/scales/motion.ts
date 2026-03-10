/**
 * Motion Scale
 *
 * Durations: Fibonacci × 100ms. Natural acceleration.
 * Easings: Curated curves for common transitions.
 */

import { FIBONACCI, applyVariance } from "../constants";

export function createDurationScale(
  variance: number = 0,
  random?: () => number
): Record<string, string> {
  const scale: Record<string, string> = { "0": "0ms" };

  FIBONACCI.slice(0, 10).forEach((fib, index) => {
    let value = fib * 100;
    if (variance > 0 && random) {
      value = applyVariance(value, variance, random);
    }
    scale[String(index + 1)] = `${value}ms`;
  });

  return scale;
}

export function createEasingTokens(): Record<string, string> {
  return {
    linear: "linear",
    "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
    "ease-in": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  };
}
