import { describe, it, expect } from "vitest";
import {
  createSpacingScale,
  createTypeScale,
  createDurationScale,
  createEasingTokens,
  createRadiusScale,
  createAnimationVars,
  createAnimationKeyframesCSS,
  ANIMATION_NAMES,
} from "../scales";
import { PHI, FIBONACCI, seededRandom } from "../constants";

describe("createSpacingScale", () => {
  it("produces 11 keys (0–10)", () => {
    const scale = createSpacingScale(4);
    expect(Object.keys(scale)).toHaveLength(11);
  });

  it("key 0 is always 0px", () => {
    const scale = createSpacingScale(4);
    expect(scale["0"]).toBe("0px");
  });

  it("matches Fibonacci × baseUnit for default baseUnit=4", () => {
    const scale = createSpacingScale(4);
    FIBONACCI.forEach((fib, i) => {
      expect(scale[String(i + 1)]).toBe(`${fib * 4}px`);
    });
  });

  it("scales proportionally with a different baseUnit", () => {
    const scale = createSpacingScale(8);
    expect(scale["1"]).toBe("8px");
    expect(scale["2"]).toBe("16px");
    expect(scale["4"]).toBe("40px"); // FIBONACCI[3]=5, 5×8=40
  });
});

describe("createTypeScale", () => {
  it("produces 8 size keys", () => {
    const scale = createTypeScale(16);
    expect(Object.keys(scale)).toHaveLength(8);
    expect(scale).toHaveProperty("xs");
    expect(scale).toHaveProperty("sm");
    expect(scale).toHaveProperty("base");
    expect(scale).toHaveProperty("lg");
    expect(scale).toHaveProperty("xl");
    expect(scale).toHaveProperty("2xl");
    expect(scale).toHaveProperty("3xl");
    expect(scale).toHaveProperty("4xl");
  });

  it("base size is exactly typeBase", () => {
    const scale = createTypeScale(16);
    expect(scale.base.fontSize).toBe("16px");
  });

  it("each step includes fontSize and lineHeight", () => {
    const scale = createTypeScale(16);
    for (const token of Object.values(scale)) {
      expect(token).toHaveProperty("fontSize");
      expect(token).toHaveProperty("lineHeight");
      expect(token.fontSize).toMatch(/^\d+(\.\d+)?px$/);
    }
  });

  it("lg is base × PHI", () => {
    const scale = createTypeScale(16);
    expect(scale.lg.fontSize).toBe(`${16 * PHI}px`);
  });

  it("sm is base × PHI^-1", () => {
    const scale = createTypeScale(16);
    expect(scale.sm.fontSize).toBe(`${16 / PHI}px`);
  });

  it("body line height is φ (1.618)", () => {
    const scale = createTypeScale(16);
    expect(scale.base.lineHeight).toBe("1.618");
    expect(scale.xs.lineHeight).toBe("1.618");
    expect(scale.lg.lineHeight).toBe("1.618");
  });

  it("heading sizes (xl–2xl) use 1+1/φ² line height (1.382)", () => {
    const scale = createTypeScale(16);
    expect(scale["xl"].lineHeight).toBe("1.382");
    expect(scale["2xl"].lineHeight).toBe("1.382");
  });

  it("display sizes (3xl–4xl) use 1+1/φ³ line height (1.236)", () => {
    const scale = createTypeScale(16);
    expect(scale["3xl"].lineHeight).toBe("1.236");
    expect(scale["4xl"].lineHeight).toBe("1.236");
  });
});

describe("createDurationScale", () => {
  it("produces 11 keys (0–10)", () => {
    const scale = createDurationScale();
    expect(Object.keys(scale)).toHaveLength(11);
  });

  it("key 0 is 0ms", () => {
    const scale = createDurationScale();
    expect(scale["0"]).toBe("0ms");
  });

  it("matches Fibonacci × 100ms for all 10 steps", () => {
    const scale = createDurationScale();
    FIBONACCI.slice(0, 10).forEach((fib, i) => {
      expect(scale[String(i + 1)]).toBe(`${fib * 100}ms`);
    });
  });

  it("step 1 is 100ms", () => {
    const scale = createDurationScale();
    expect(scale["1"]).toBe("100ms");
  });

  it("step 4 is 500ms", () => {
    const scale = createDurationScale();
    expect(scale["4"]).toBe("500ms");
  });

  it("step 9 is 5500ms", () => {
    const scale = createDurationScale();
    expect(scale["9"]).toBe("5500ms");
  });

  it("step 10 is 8900ms", () => {
    const scale = createDurationScale();
    expect(scale["10"]).toBe("8900ms");
  });
});

describe("createEasingTokens", () => {
  it("returns 5 easing curves", () => {
    const easing = createEasingTokens();
    expect(Object.keys(easing)).toHaveLength(5);
  });

  it("includes all named curves", () => {
    const easing = createEasingTokens();
    expect(easing).toHaveProperty("linear");
    expect(easing).toHaveProperty("ease-out");
    expect(easing).toHaveProperty("ease-in");
    expect(easing).toHaveProperty("ease-in-out");
    expect(easing).toHaveProperty("spring");
  });

  it("ease-out uses cubic-bezier", () => {
    const easing = createEasingTokens();
    expect(easing["ease-out"]).toContain("cubic-bezier");
  });

  it("spring has overshoot (y2 > 1)", () => {
    const easing = createEasingTokens();
    // spring: cubic-bezier(A, B, B, 1+A) — y2 = 1+1/φ² = 1.382 overshoots
    expect(easing["spring"]).toContain("1.382");
  });
});

describe("createRadiusScale", () => {
  it("contains none and full bookends", () => {
    const scale = createRadiusScale(4);
    expect(scale["none"]).toBe("0px");
    expect(scale["full"]).toBe("9999px");
  });

  it("produces 5 numeric steps plus bookends (7 total)", () => {
    const scale = createRadiusScale(4);
    expect(Object.keys(scale)).toHaveLength(7);
  });

  it("matches FIBONACCI[0..4] × baseUnit", () => {
    const scale = createRadiusScale(4);
    const first5 = FIBONACCI.slice(0, 5);
    first5.forEach((fib, i) => {
      expect(scale[String(i + 1)]).toBe(`${fib * 4}px`);
    });
  });

  it("radius-1 is 4px with default baseUnit", () => {
    const scale = createRadiusScale(4);
    expect(scale["1"]).toBe("4px");
  });

  it("radius-3 is 12px with default baseUnit", () => {
    const scale = createRadiusScale(4);
    expect(scale["3"]).toBe("12px");
  });
});

describe("createAnimationVars", () => {
  it("produces 15 entries — one per AnimationName", () => {
    const vars = createAnimationVars();
    expect(Object.keys(vars)).toHaveLength(15);
    expect(Object.keys(vars)).toHaveLength(ANIMATION_NAMES.length);
  });

  it("has a CSS var for every AnimationName", () => {
    const vars = createAnimationVars();
    for (const name of ANIMATION_NAMES) {
      expect(vars).toHaveProperty(`--renge-animation-${name}`);
    }
  });

  it("all values reference Fibonacci duration tokens, not hardcoded seconds", () => {
    const vars = createAnimationVars();
    for (const value of Object.values(vars)) {
      expect(value).toContain("var(--renge-duration-");
      expect(value).not.toMatch(/\d+\.\d+s/);
    }
  });

  it("slow animations (breathe, bloom) use duration-10", () => {
    const vars = createAnimationVars();
    expect(vars["--renge-animation-breathe"]).toContain("var(--renge-duration-10)");
    expect(vars["--renge-animation-bloom"]).toContain("var(--renge-duration-10)");
  });

  it("most animations use duration-9", () => {
    const vars = createAnimationVars();
    expect(vars["--renge-animation-float"]).toContain("var(--renge-duration-9)");
    expect(vars["--renge-animation-sacred-fade"]).toContain("var(--renge-duration-9)");
  });

  it("vibrate uses duration-6 (quick)", () => {
    const vars = createAnimationVars();
    expect(vars["--renge-animation-vibrate"]).toContain("var(--renge-duration-6)");
  });
});

describe("createSpacingScale — precision", () => {
  it("outputs exact Fibonacci × baseUnit without rounding", () => {
    const scale = createSpacingScale(3);
    // 3 × 5 = 15, 3 × 13 = 39 — should be exact, not rounded
    expect(scale["4"]).toBe("15px");
    expect(scale["6"]).toBe("39px");
  });

  it("spacing values are strictly increasing", () => {
    const scale = createSpacingScale(4);
    for (let i = 1; i < 10; i++) {
      const curr = parseFloat(scale[String(i)]);
      const next = parseFloat(scale[String(i + 1)]);
      expect(next).toBeGreaterThan(curr);
    }
  });

  it("variance produces non-integer values (no rounding)", () => {
    const rng = seededRandom("precision-test");
    const scale = createSpacingScale(4, 0.1, rng);
    const values = FIBONACCI.map((_, i) => parseFloat(scale[String(i + 1)]));
    // With variance, at least some values should have decimal parts
    const hasDecimals = values.some((v) => v !== Math.round(v));
    expect(hasDecimals).toBe(true);
  });
});

describe("createTypeScale — precision", () => {
  it("outputs exact φ-derived sizes without rounding", () => {
    const scale = createTypeScale(16);
    // xs = 16 * PHI^-2 — this is irrational, should not be rounded
    const expected = 16 * Math.pow(PHI, -2);
    expect(scale.xs.fontSize).toBe(`${expected}px`);
  });

  it("font sizes are strictly increasing from xs to 4xl", () => {
    const keys = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
    const scale = createTypeScale(16);
    for (let i = 0; i < keys.length - 1; i++) {
      const curr = parseFloat(scale[keys[i]].fontSize);
      const next = parseFloat(scale[keys[i + 1]].fontSize);
      expect(next).toBeGreaterThan(curr);
    }
  });

  it("custom ratio is used instead of PHI", () => {
    const scale = createTypeScale(16, 2);
    expect(scale.lg.fontSize).toBe("32px"); // 16 * 2^1
    expect(scale.xl.fontSize).toBe("64px"); // 16 * 2^2
  });

  it("scale is symmetric: sm × ratio ≈ base, base × ratio ≈ lg", () => {
    const scale = createTypeScale(16);
    const sm = parseFloat(scale.sm.fontSize);
    const base = parseFloat(scale.base.fontSize);
    const lg = parseFloat(scale.lg.fontSize);
    expect(sm * PHI).toBeCloseTo(base, 10);
    expect(base * PHI).toBeCloseTo(lg, 10);
  });
});

describe("createRadiusScale — precision", () => {
  it("outputs exact values without rounding", () => {
    const rng = seededRandom("radius-prec");
    const scale = createRadiusScale(4, 0.1, rng);
    const values = FIBONACCI.slice(0, 5).map((_, i) => parseFloat(scale[String(i + 1)]));
    const hasDecimals = values.some((v) => v !== Math.round(v));
    expect(hasDecimals).toBe(true);
  });

  it("radius and spacing share the same Fibonacci base for steps 1-5", () => {
    const spacing = createSpacingScale(4);
    const radius = createRadiusScale(4);
    for (let i = 1; i <= 5; i++) {
      expect(radius[String(i)]).toBe(spacing[String(i)]);
    }
  });
});

describe("createDurationScale — precision", () => {
  it("outputs exact values without rounding", () => {
    const rng = seededRandom("duration-prec");
    const scale = createDurationScale(0.1, rng);
    const values = FIBONACCI.slice(0, 10).map((_, i) => parseFloat(scale[String(i + 1)]));
    const hasDecimals = values.some((v) => v !== Math.round(v));
    expect(hasDecimals).toBe(true);
  });

  it("durations are strictly increasing", () => {
    const scale = createDurationScale();
    for (let i = 1; i < 10; i++) {
      const curr = parseFloat(scale[String(i)]);
      const next = parseFloat(scale[String(i + 1)]);
      expect(next).toBeGreaterThan(curr);
    }
  });
});

describe("createAnimationKeyframesCSS", () => {
  it("returns a non-empty CSS string", () => {
    const css = createAnimationKeyframesCSS();
    expect(typeof css).toBe("string");
    expect(css.length).toBeGreaterThan(0);
  });

  it("contains @keyframes blocks for all animation names", () => {
    const css = createAnimationKeyframesCSS();
    expect(css).toContain("@keyframes rengeVortexReveal");
    expect(css).toContain("@keyframes rengeFloat");
    expect(css).toContain("@keyframes rengeBreathe");
    expect(css).toContain("@keyframes rengeVibrate");
  });

  it("pulse-color-shift uses semantic color tokens, not hardcoded hex", () => {
    const css = createAnimationKeyframesCSS();
    expect(css).toContain("var(--renge-color-success)");
    expect(css).toContain("var(--renge-color-danger)");
    expect(css).not.toContain("#10b981");
    expect(css).not.toContain("#ef4444");
  });
});
