import { describe, it, expect } from "vitest";
import { createRengeTheme } from "../index";
import { FIBONACCI } from "../index";

describe("variance system", () => {
  it("variance=0 produces exact Fibonacci spacing values", () => {
    const theme = createRengeTheme({ variance: 0 });
    FIBONACCI.forEach((fib, i) => {
      expect(theme.vars[`--renge-space-${i + 1}`]).toBe(`${fib * 6}px`);
    });
  });

  it("same seed produces identical output on repeated calls", () => {
    const a = createRengeTheme({ variance: 0.1, varianceSeed: "test-seed" });
    const b = createRengeTheme({ variance: 0.1, varianceSeed: "test-seed" });
    expect(a.css).toBe(b.css);
    expect(a.vars).toEqual(b.vars);
  });

  it("different seeds produce different output", () => {
    const a = createRengeTheme({ variance: 0.1, varianceSeed: "seed-a" });
    const b = createRengeTheme({ variance: 0.1, varianceSeed: "seed-b" });
    // At least some spacing value should differ
    const differ = FIBONACCI.some(
      (_, i) =>
        a.vars[`--renge-space-${i + 1}`] !== b.vars[`--renge-space-${i + 1}`]
    );
    expect(differ).toBe(true);
  });

  it("variance>0 produces values different from exact Fibonacci", () => {
    const theme = createRengeTheme({ variance: 0.2, varianceSeed: "drift" });
    // At least one value should differ from the exact calculation
    const anyDrifted = FIBONACCI.some(
      (fib, i) => theme.vars[`--renge-space-${i + 1}`] !== `${fib * 6}px`
    );
    expect(anyDrifted).toBe(true);
  });

  it("variance does not affect font sizes (typography is never varied)", () => {
    const exact = createRengeTheme({ variance: 0 });
    const varied = createRengeTheme({ variance: 0.5, varianceSeed: "heavy" });
    // Font sizes should be identical regardless of variance
    const sizeKeys = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
    for (const key of sizeKeys) {
      expect(varied.vars[`--renge-font-size-${key}`]).toBe(
        exact.vars[`--renge-font-size-${key}`]
      );
    }
  });

  it("variance stays within bounds (spacing drift ≤ variance × 2)", () => {
    const variance = 0.1;
    const theme = createRengeTheme({ variance, varianceSeed: "bounds-test" });
    FIBONACCI.forEach((fib, i) => {
      const exact = fib * 6;
      const actual = parseFloat(theme.vars[`--renge-space-${i + 1}`]);
      const maxDrift = exact * variance;
      expect(Math.abs(actual - exact)).toBeLessThanOrEqual(maxDrift + 0.01); // 0.01 for rounding
    });
  });

  it("variance does not affect color variables", () => {
    const noVariance = createRengeTheme({ variance: 0 });
    const withVariance = createRengeTheme({ variance: 0.5, varianceSeed: "color-test" });
    const colorKeys = Object.keys(noVariance.vars).filter((k) =>
      k.startsWith("--renge-color-")
    );
    for (const key of colorKeys) {
      expect(withVariance.vars[key]).toBe(noVariance.vars[key]);
    }
  });
});
