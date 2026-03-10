import { describe, it, expect } from "vitest";
import { PHI, GOLDEN_ANGLE, FIBONACCI, seededRandom, applyVariance } from "../constants";

describe("PHI", () => {
  it("satisfies the golden ratio identity: φ² = φ + 1", () => {
    expect(PHI * PHI).toBeCloseTo(PHI + 1, 14);
  });

  it("is computed from sqrt(5), not a hardcoded approximation", () => {
    expect(PHI).toBe((1 + Math.sqrt(5)) / 2);
  });

  it("1/φ = φ - 1", () => {
    expect(1 / PHI).toBeCloseTo(PHI - 1, 14);
  });
});

describe("GOLDEN_ANGLE", () => {
  it("equals 360 / φ²", () => {
    expect(GOLDEN_ANGLE).toBe(360 / (PHI * PHI));
  });

  it("is approximately 137.508°", () => {
    expect(GOLDEN_ANGLE).toBeCloseTo(137.508, 2);
  });

  it("complementary angle sums to 360/φ", () => {
    // 360 - GOLDEN_ANGLE*PHI should relate back to PHI
    expect(360 / PHI).toBeCloseTo(360 - GOLDEN_ANGLE, 10);
  });
});

describe("FIBONACCI", () => {
  it("has 10 elements", () => {
    expect(FIBONACCI).toHaveLength(10);
  });

  it("each element (after first two) is sum of previous two", () => {
    for (let i = 2; i < FIBONACCI.length; i++) {
      expect(FIBONACCI[i]).toBe(FIBONACCI[i - 1] + FIBONACCI[i - 2]);
    }
  });

  it("starts at 1, not 0", () => {
    expect(FIBONACCI[0]).toBe(1);
  });

  it("is strictly increasing", () => {
    for (let i = 1; i < FIBONACCI.length; i++) {
      expect(FIBONACCI[i]).toBeGreaterThan(FIBONACCI[i - 1]);
    }
  });

  it("consecutive ratios converge toward PHI", () => {
    const lastRatio = FIBONACCI[9] / FIBONACCI[8];
    expect(lastRatio).toBeCloseTo(PHI, 2);
  });
});

describe("seededRandom", () => {
  it("same seed always gives same sequence", () => {
    const a = seededRandom("test");
    const b = seededRandom("test");
    for (let i = 0; i < 20; i++) {
      expect(a()).toBe(b());
    }
  });

  it("different seeds give different sequences", () => {
    const a = seededRandom("alpha");
    const b = seededRandom("beta");
    const sameCount = Array.from({ length: 10 }, () => a() === b()).filter(Boolean).length;
    expect(sameCount).toBeLessThan(10);
  });

  it("returns values in [0, 1)", () => {
    const rng = seededRandom("bounds");
    for (let i = 0; i < 100; i++) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe("applyVariance", () => {
  it("returns original value when variance is 0", () => {
    const rng = seededRandom("noop");
    expect(applyVariance(100, 0, rng)).toBe(100);
  });

  it("drift is bounded by ±variance of original", () => {
    const variance = 0.1;
    for (const seed of ["a", "b", "c", "d", "e"]) {
      const rng = seededRandom(seed);
      for (let i = 0; i < 20; i++) {
        const result = applyVariance(100, variance, rng);
        expect(result).toBeGreaterThanOrEqual(100 * (1 - variance));
        expect(result).toBeLessThanOrEqual(100 * (1 + variance));
      }
    }
  });

  it("does not return the same value every time with variance > 0", () => {
    const results = new Set<number>();
    for (let i = 0; i < 10; i++) {
      const rng = seededRandom(`seed-${i}`);
      results.add(applyVariance(100, 0.5, rng));
    }
    expect(results.size).toBeGreaterThan(1);
  });
});
