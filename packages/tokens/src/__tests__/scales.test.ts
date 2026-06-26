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
  createShadowScale,
  createZIndexScale,
  createDimensionScale,
} from "../scales";
import { createFractalScale, FRACTAL_STEPS } from "../index";
import { PHI, FIBONACCI, seededRandom } from "../constants";

/**
 * Extract the build-time multiplier from a calc-based token value.
 * Spacing/radius/dimension/type tokens are emitted as
 *   `calc(<multiplier> * var(--renge-base-..., <fallback>px))`
 * so ordering/ratio assertions compare the fixed multiplier. Literal px
 * values (e.g. "0px", "9999px") fall back to parseFloat.
 */
const coeff = (value: string): number => {
  const match = value.match(/^calc\(\s*([\d.]+)\s*\*/);
  return match ? parseFloat(match[1]) : parseFloat(value);
};

describe("createSpacingScale", () => {
  it("produces 11 keys (0–10)", () => {
    const scale = createSpacingScale(4);
    expect(Object.keys(scale)).toHaveLength(11);
  });

  it("key 0 is always 0px", () => {
    const scale = createSpacingScale(4);
    expect(scale["0"]).toBe("0px");
  });

  it("emits calc(fib * var(--renge-base-unit)) for default baseUnit=4", () => {
    const scale = createSpacingScale(4);
    FIBONACCI.forEach((fib, i) => {
      expect(scale[String(i + 1)]).toBe(
        `calc(${fib} * var(--renge-base-unit, 4px))`
      );
    });
  });

  it("encodes the baseUnit as the calc fallback", () => {
    const scale = createSpacingScale(8);
    expect(scale["1"]).toBe("calc(1 * var(--renge-base-unit, 8px))");
    expect(scale["2"]).toBe("calc(2 * var(--renge-base-unit, 8px))");
    expect(scale["4"]).toBe("calc(5 * var(--renge-base-unit, 8px))"); // FIBONACCI[3]=5
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

  it("base size multiplier is 1 over var(--renge-base-size)", () => {
    const scale = createTypeScale(16);
    expect(scale.base.fontSize).toBe(
      "calc(1.0000 * var(--renge-base-size, 16px))"
    );
  });

  it("each step includes fontSize and lineHeight", () => {
    const scale = createTypeScale(16);
    for (const token of Object.values(scale)) {
      expect(token).toHaveProperty("fontSize");
      expect(token).toHaveProperty("lineHeight");
      expect(token.fontSize).toMatch(
        /^calc\([\d.]+ \* var\(--renge-base-size, \d+px\)\)$/
      );
    }
  });

  it("lg multiplier is PHI over var(--renge-base-size)", () => {
    const scale = createTypeScale(16);
    expect(scale.lg.fontSize).toBe(
      `calc(${PHI.toFixed(4)} * var(--renge-base-size, 16px))`
    );
  });

  it("sm multiplier is PHI^-0.25 over var(--renge-base-size)", () => {
    const scale = createTypeScale(16);
    expect(scale.sm.fontSize).toBe(
      `calc(${Math.pow(PHI, -0.25).toFixed(4)} * var(--renge-base-size, 16px))`
    );
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

  it("emits calc(fib * var(--renge-base-unit)) for FIBONACCI[0..4]", () => {
    const scale = createRadiusScale(4);
    const first5 = FIBONACCI.slice(0, 5);
    first5.forEach((fib, i) => {
      expect(scale[String(i + 1)]).toBe(
        `calc(${fib} * var(--renge-base-unit, 4px))`
      );
    });
  });

  it("radius-1 multiplier is 1 with default baseUnit fallback", () => {
    const scale = createRadiusScale(4);
    expect(scale["1"]).toBe("calc(1 * var(--renge-base-unit, 4px))");
  });

  it("radius-3 multiplier is 3 with default baseUnit fallback", () => {
    const scale = createRadiusScale(4);
    expect(scale["3"]).toBe("calc(3 * var(--renge-base-unit, 4px))");
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
  it("preserves the exact Fibonacci multiplier in the calc expression", () => {
    const scale = createSpacingScale(3);
    // FIBONACCI[3]=5, FIBONACCI[5]=13 — multipliers stay exact, base is runtime
    expect(scale["4"]).toBe("calc(5 * var(--renge-base-unit, 3px))");
    expect(scale["6"]).toBe("calc(13 * var(--renge-base-unit, 3px))");
  });

  it("spacing multipliers are strictly increasing", () => {
    const scale = createSpacingScale(4);
    for (let i = 1; i < 10; i++) {
      const curr = coeff(scale[String(i)]);
      const next = coeff(scale[String(i + 1)]);
      expect(next).toBeGreaterThan(curr);
    }
  });

  it("variance produces non-integer multipliers (no rounding)", () => {
    const rng = seededRandom("precision-test");
    const scale = createSpacingScale(4, 0.1, rng);
    const values = FIBONACCI.map((_, i) => coeff(scale[String(i + 1)]));
    // With variance, at least some multipliers should have decimal parts
    const hasDecimals = values.some((v) => v !== Math.round(v));
    expect(hasDecimals).toBe(true);
  });
});

describe("createTypeScale — precision", () => {
  it("encodes the φ-derived multiplier to 4 decimals", () => {
    const scale = createTypeScale(16);
    // xs = PHI^-0.5 multiplier, base size is runtime
    const expected = Math.pow(PHI, -0.5).toFixed(4);
    expect(scale.xs.fontSize).toBe(
      `calc(${expected} * var(--renge-base-size, 16px))`
    );
  });

  it("font multipliers are strictly increasing from xs to 4xl", () => {
    const keys = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
    const scale = createTypeScale(16);
    for (let i = 0; i < keys.length - 1; i++) {
      const curr = coeff(scale[keys[i]].fontSize);
      const next = coeff(scale[keys[i + 1]].fontSize);
      expect(next).toBeGreaterThan(curr);
    }
  });

  it("custom ratio is used instead of PHI", () => {
    const scale = createTypeScale(16, 2);
    expect(scale.lg.fontSize).toBe(
      "calc(2.0000 * var(--renge-base-size, 16px))"
    ); // 2^1
    expect(scale.xl.fontSize).toBe(
      "calc(4.0000 * var(--renge-base-size, 16px))"
    ); // 2^2
  });

  it("base × ratio ≈ lg (integer step symmetry holds)", () => {
    const scale = createTypeScale(16);
    const base = coeff(scale.base.fontSize);
    const lg = coeff(scale.lg.fontSize);
    expect(base * PHI).toBeCloseTo(lg, 3);
  });
});

describe("createRadiusScale — precision", () => {
  it("variance produces non-integer multipliers (no rounding)", () => {
    const rng = seededRandom("radius-prec");
    const scale = createRadiusScale(4, 0.1, rng);
    const values = FIBONACCI.slice(0, 5).map((_, i) => coeff(scale[String(i + 1)]));
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

describe("createFractalScale", () => {
  it(`produces ${FRACTAL_STEPS} steps`, () => {
    const scale = createFractalScale(4);
    expect(Object.keys(scale)).toHaveLength(FRACTAL_STEPS);
  });

  it("keys are '1' through FRACTAL_STEPS", () => {
    const scale = createFractalScale(4);
    for (let i = 1; i <= FRACTAL_STEPS; i++) {
      expect(scale).toHaveProperty(String(i));
    }
  });

  it("values are px strings", () => {
    const scale = createFractalScale(4);
    for (const v of Object.values(scale)) {
      expect(v).toMatch(/^\d+(\.\d+)?px$/);
    }
  });

  it("step-1 equals baseUnit", () => {
    expect(createFractalScale(4)["1"]).toBe("4px");
    expect(createFractalScale(8)["1"]).toBe("8px");
  });

  it("each step grows by PHI relative to the previous", () => {
    const scale = createFractalScale(4);
    for (let i = 2; i <= FRACTAL_STEPS; i++) {
      const prev = parseFloat(scale[String(i - 1)]);
      const curr = parseFloat(scale[String(i)]);
      expect(curr / prev).toBeCloseTo(1.6180339887, 2);
    }
  });

  it("scales proportionally with a different baseUnit", () => {
    const s4 = createFractalScale(4);
    const s8 = createFractalScale(8);
    for (let i = 1; i <= FRACTAL_STEPS; i++) {
      const v4 = parseFloat(s4[String(i)]);
      const v8 = parseFloat(s8[String(i)]);
      expect(v8 / v4).toBeCloseTo(2, 1);
    }
  });
});

describe("createShadowScale", () => {
  it("produces 5 shadow keys", () => {
    const scale = createShadowScale();
    expect(Object.keys(scale)).toHaveLength(5);
    expect(scale).toHaveProperty("layer-1");
    expect(scale).toHaveProperty("layer-2");
    expect(scale).toHaveProperty("layer-3");
    expect(scale).toHaveProperty("focus");
    expect(scale).toHaveProperty("inset");
  });

  it("layer-1 is most subtle", () => {
    const scale = createShadowScale();
    expect(scale["layer-1"]).toContain("0.05");
  });

  it("layer-2 is more pronounced than layer-1", () => {
    const scale = createShadowScale();
    expect(scale["layer-2"]).toContain("0.1");
  });

  it("layer-3 is strongest", () => {
    const scale = createShadowScale();
    expect(scale["layer-3"]).toContain("0.15");
  });

  it("focus shadow uses color reference", () => {
    const scale = createShadowScale();
    expect(scale["focus"]).toContain("--renge-color-accent-rgb");
  });

  it("inset shadow uses correct pattern", () => {
    const scale = createShadowScale();
    expect(scale["inset"]).toContain("inset");
  });

  it("all shadow values are valid CSS", () => {
    const scale = createShadowScale();
    Object.values(scale).forEach((val) => {
      // Valid shadow format: should contain 'rgb', 'inset', or color ref
      expect(
        val.includes("rgb") ||
        val.includes("--renge") ||
        val.includes("inset")
      ).toBe(true);
    });
  });

  it("elevation layers scale via calc(--renge-base-unit)", () => {
    const scale = createShadowScale(4);
    // layer-1 offset = FIBONACCI[0]=1, blur = FIBONACCI[1]=2
    expect(scale["layer-1"]).toContain("calc(1 * var(--renge-base-unit, 4px))");
    expect(scale["layer-1"]).toContain("calc(2 * var(--renge-base-unit, 4px))");
    // layer-3 offset = FIBONACCI[2]=3, blur = FIBONACCI[3]=5
    expect(scale["layer-3"]).toContain("calc(3 * var(--renge-base-unit, 4px))");
    expect(scale["layer-3"]).toContain("calc(5 * var(--renge-base-unit, 4px))");
  });

  it("encodes the baseUnit as the calc fallback", () => {
    const scale = createShadowScale(6);
    expect(scale["layer-1"]).toContain("var(--renge-base-unit, 6px)");
  });
});

describe("createZIndexScale", () => {
  it("produces 5 z-index keys", () => {
    const scale = createZIndexScale();
    expect(Object.keys(scale)).toHaveLength(5);
  });

  it("has expected semantic keys", () => {
    const scale = createZIndexScale();
    expect(scale).toHaveProperty("dropdown");
    expect(scale).toHaveProperty("sticky");
    expect(scale).toHaveProperty("fixed");
    expect(scale).toHaveProperty("modal");
    expect(scale).toHaveProperty("toast");
  });

  it("values are numeric strings", () => {
    const scale = createZIndexScale();
    Object.values(scale).forEach((val) => {
      expect(/^\d+$/.test(val)).toBe(true);
    });
  });

  it("values are in ascending order", () => {
    const scale = createZIndexScale();
    const values = Object.values(scale).map(Number);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });

  it("dropdown is 100, sticky is 200, fixed is 300, modal is 400, toast is 500", () => {
    const scale = createZIndexScale();
    expect(scale["dropdown"]).toBe("100");
    expect(scale["sticky"]).toBe("200");
    expect(scale["fixed"]).toBe("300");
    expect(scale["modal"]).toBe("400");
    expect(scale["toast"]).toBe("500");
  });
});

describe("createDimensionScale", () => {
  it("produces width, height, minWidth, maxWidth objects", () => {
    const scale = createDimensionScale(4);
    expect(scale).toHaveProperty("width");
    expect(scale).toHaveProperty("height");
    expect(scale).toHaveProperty("minWidth");
    expect(scale).toHaveProperty("maxWidth");
  });

  it("width has auto, full, screen, container refs", () => {
    const scale = createDimensionScale(4);
    expect(scale.width).toHaveProperty("auto");
    expect(scale.width).toHaveProperty("full");
    expect(scale.width).toHaveProperty("screen");
    expect(scale.width.auto).toBe("auto");
    expect(scale.width.full).toBe("100%");
    expect(scale.width.screen).toBe("100vw");
  });

  it("height has auto, full, screen, and Fibonacci steps", () => {
    const scale = createDimensionScale(4);
    expect(scale.height).toHaveProperty("auto");
    expect(scale.height).toHaveProperty("full");
    expect(scale.height).toHaveProperty("screen");
    expect(scale.height).toHaveProperty("1");
    expect(scale.height["1"]).toBe("calc(1 * var(--renge-base-unit, 4px))");
  });

  it("minWidth and maxWidth are Fibonacci-based", () => {
    const scale = createDimensionScale(4);
    expect(scale.minWidth).toHaveProperty("0");
    expect(scale.minWidth).toHaveProperty("1");
    expect(scale.minWidth["0"]).toBe("0px");
    expect(scale.minWidth["1"]).toBe("calc(1 * var(--renge-base-unit, 4px))");
  });

  it("maxWidth has none and full + Fibonacci values", () => {
    const scale = createDimensionScale(4);
    expect(scale.maxWidth).toHaveProperty("none");
    expect(scale.maxWidth).toHaveProperty("full");
    expect(scale.maxWidth.none).toBe("none");
    expect(scale.maxWidth.full).toBe("100%");
  });

  it("encodes the baseUnit as the calc fallback", () => {
    const scale = createDimensionScale(8);
    expect(scale.height["1"]).toBe("calc(1 * var(--renge-base-unit, 8px))");
    expect(scale.height["2"]).toBe("calc(2 * var(--renge-base-unit, 8px))");
  });
});
