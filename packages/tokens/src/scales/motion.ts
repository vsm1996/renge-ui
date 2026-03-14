/**
 * Motion Scale
 *
 * Durations: Fibonacci × 100ms. Natural acceleration.
 *
 * Easings: All control points are derived from φ.
 *   A = 1/φ² ≈ 0.382   (the "small" golden split)
 *   B = 1/φ  ≈ 0.618   (the "large" golden split)
 *   A + B = 1.000 — golden complements
 *
 *   ease-out     (A, 1,   B, 1)   — snaps toward destination, lingers to settle
 *   ease-in      (A, 0,   1, B)   — starts still, arrives fast
 *   ease-in-out  (A, 0,   B, 1)   — inflects at the golden splits; x₁+x₂ = 1
 *   spring       (A, B,   B, 1+A) — overshoots by A = 1/φ²; symmetric x pair at B
 */

import { PHI, FIBONACCI, applyVariance } from "../constants";

// φ-derived control-point constants
const A = +(1 / (PHI * PHI)).toFixed(3); // 0.382
const B = +(1 / PHI).toFixed(3);         // 0.618

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
    "ease-out":    `cubic-bezier(${A}, 1, ${B}, 1)`,
    "ease-in":     `cubic-bezier(${A}, 0, 1, ${B})`,
    "ease-in-out": `cubic-bezier(${A}, 0, ${B}, 1)`,
    spring:        `cubic-bezier(${A}, ${B}, ${B}, ${1 + A})`,
  };
}
