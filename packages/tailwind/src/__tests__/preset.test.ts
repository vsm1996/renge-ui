import { describe, it, expect } from "vitest";
import preset from "../index";

// ─── Structure ────────────────────────────────────────────────────────────────

describe("preset shape", () => {
  it("has a theme key", () => {
    expect(preset).toHaveProperty("theme");
  });

  it("theme has an extend key (additive — does not wipe Tailwind defaults)", () => {
    expect(preset.theme).toHaveProperty("extend");
  });

  it("extend contains all six scale sections", () => {
    const { extend } = preset.theme;
    expect(extend).toHaveProperty("spacing");
    expect(extend).toHaveProperty("fontSize");
    expect(extend).toHaveProperty("lineHeight");
    expect(extend).toHaveProperty("borderRadius");
    expect(extend).toHaveProperty("transitionDuration");
    expect(extend).toHaveProperty("transitionTimingFunction");
    expect(extend).toHaveProperty("colors");
  });

  it("has no extra top-level keys beyond theme", () => {
    expect(Object.keys(preset)).toEqual(["theme"]);
  });
});

// ─── Naming convention ────────────────────────────────────────────────────────

describe("renge- prefix convention", () => {
  it("every spacing key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.spacing)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("every fontSize key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.fontSize)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("every lineHeight key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.lineHeight)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("every borderRadius key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.borderRadius)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("every transitionDuration key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.transitionDuration)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("every transitionTimingFunction key starts with renge-", () => {
    for (const key of Object.keys(preset.theme.extend.transitionTimingFunction)) {
      expect(key).toMatch(/^renge-/);
    }
  });

  it("colors are nested under renge namespace", () => {
    expect(preset.theme.extend.colors).toHaveProperty("renge");
    expect(typeof preset.theme.extend.colors.renge).toBe("object");
  });
});

// ─── No hardcoded values ──────────────────────────────────────────────────────

function allLeafValues(obj: Record<string, unknown>): string[] {
  const results: string[] = [];
  for (const val of Object.values(obj)) {
    if (typeof val === "string") results.push(val);
    else if (typeof val === "object" && val !== null) {
      results.push(...allLeafValues(val as Record<string, unknown>));
    }
  }
  return results;
}

describe("CSS variable references only", () => {
  it("every spacing value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.spacing)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every fontSize value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.fontSize)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every lineHeight value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.lineHeight)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every borderRadius value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.borderRadius)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every transitionDuration value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.transitionDuration)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every transitionTimingFunction value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.transitionTimingFunction)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("every color value is a CSS var reference", () => {
    for (const val of Object.values(preset.theme.extend.colors.renge)) {
      expect(val).toMatch(/^var\(--renge-/);
    }
  });

  it("no hardcoded px values anywhere in the preset", () => {
    const allValues = allLeafValues(preset.theme.extend as Record<string, unknown>);
    for (const val of allValues) {
      expect(val).not.toMatch(/^\d+px$/);
    }
  });

  it("no hardcoded hex colors anywhere in the preset", () => {
    const allValues = allLeafValues(preset.theme.extend as Record<string, unknown>);
    for (const val of allValues) {
      expect(val).not.toMatch(/^#[0-9a-fA-F]{3,8}$/);
    }
  });

  it("no hardcoded oklch values anywhere in the preset", () => {
    const allValues = allLeafValues(preset.theme.extend as Record<string, unknown>);
    for (const val of allValues) {
      expect(val).not.toMatch(/^oklch\(/);
    }
  });
});

// ─── Spacing ──────────────────────────────────────────────────────────────────

describe("spacing scale", () => {
  it("has exactly 11 entries (0–10)", () => {
    expect(Object.keys(preset.theme.extend.spacing)).toHaveLength(11);
  });

  it("has keys renge-0 through renge-10", () => {
    for (let i = 0; i <= 10; i++) {
      expect(preset.theme.extend.spacing).toHaveProperty(`renge-${i}`);
    }
  });

  it("each key maps to its corresponding --renge-space-* var", () => {
    for (let i = 0; i <= 10; i++) {
      expect(preset.theme.extend.spacing[`renge-${i}` as keyof typeof preset.theme.extend.spacing])
        .toBe(`var(--renge-space-${i})`);
    }
  });
});

// ─── Font Size ────────────────────────────────────────────────────────────────

describe("fontSize scale", () => {
  const expectedKeys = ["renge-xs", "renge-sm", "renge-base", "renge-lg", "renge-xl", "renge-2xl", "renge-3xl", "renge-4xl"];

  it("has exactly 8 entries", () => {
    expect(Object.keys(preset.theme.extend.fontSize)).toHaveLength(8);
  });

  it("has all expected keys", () => {
    for (const key of expectedKeys) {
      expect(preset.theme.extend.fontSize).toHaveProperty(key);
    }
  });

  it("each key maps to its corresponding --renge-font-size-* var", () => {
    const suffixes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
    for (const suffix of suffixes) {
      expect(preset.theme.extend.fontSize[`renge-${suffix}` as keyof typeof preset.theme.extend.fontSize])
        .toBe(`var(--renge-font-size-${suffix})`);
    }
  });
});

// ─── Line Height ──────────────────────────────────────────────────────────────

describe("lineHeight scale", () => {
  it("has exactly 8 entries (mirrors font size steps)", () => {
    expect(Object.keys(preset.theme.extend.lineHeight)).toHaveLength(8);
  });

  it("fontSize and lineHeight have identical step names", () => {
    const fontKeys = Object.keys(preset.theme.extend.fontSize).sort();
    const lineKeys = Object.keys(preset.theme.extend.lineHeight).sort();
    expect(fontKeys).toEqual(lineKeys);
  });

  it("each key maps to its corresponding --renge-line-height-* var", () => {
    const suffixes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"];
    for (const suffix of suffixes) {
      expect(preset.theme.extend.lineHeight[`renge-${suffix}` as keyof typeof preset.theme.extend.lineHeight])
        .toBe(`var(--renge-line-height-${suffix})`);
    }
  });
});

// ─── Border Radius ────────────────────────────────────────────────────────────

describe("borderRadius scale", () => {
  it("has exactly 7 entries (none + 1-5 + full)", () => {
    expect(Object.keys(preset.theme.extend.borderRadius)).toHaveLength(7);
  });

  it("has none and full bookends", () => {
    expect(preset.theme.extend.borderRadius).toHaveProperty("renge-none");
    expect(preset.theme.extend.borderRadius).toHaveProperty("renge-full");
  });

  it("has numeric steps 1–5", () => {
    for (let i = 1; i <= 5; i++) {
      expect(preset.theme.extend.borderRadius).toHaveProperty(`renge-${i}`);
    }
  });

  it("each key maps to its corresponding --renge-radius-* var", () => {
    const { borderRadius } = preset.theme.extend;
    expect(borderRadius["renge-none"]).toBe("var(--renge-radius-none)");
    expect(borderRadius["renge-full"]).toBe("var(--renge-radius-full)");
    for (let i = 1; i <= 5; i++) {
      expect(borderRadius[`renge-${i}` as keyof typeof borderRadius]).toBe(`var(--renge-radius-${i})`);
    }
  });
});

// ─── Transition Duration ──────────────────────────────────────────────────────

describe("transitionDuration scale", () => {
  it("has exactly 11 entries (0–10, matching Fibonacci token range)", () => {
    expect(Object.keys(preset.theme.extend.transitionDuration)).toHaveLength(11);
  });

  it("has keys renge-0 through renge-10", () => {
    for (let i = 0; i <= 10; i++) {
      expect(preset.theme.extend.transitionDuration).toHaveProperty(`renge-${i}`);
    }
  });

  it("each key maps to its corresponding --renge-duration-* var", () => {
    for (let i = 0; i <= 10; i++) {
      expect(preset.theme.extend.transitionDuration[`renge-${i}` as keyof typeof preset.theme.extend.transitionDuration])
        .toBe(`var(--renge-duration-${i})`);
    }
  });
});

// ─── Transition Timing Function ───────────────────────────────────────────────

describe("transitionTimingFunction scale", () => {
  it("has exactly 5 easing curves", () => {
    expect(Object.keys(preset.theme.extend.transitionTimingFunction)).toHaveLength(5);
  });

  it("includes all named φ-derived curves", () => {
    const { transitionTimingFunction: ttf } = preset.theme.extend;
    expect(ttf).toHaveProperty("renge-linear");
    expect(ttf).toHaveProperty("renge-ease-in");
    expect(ttf).toHaveProperty("renge-ease-out");
    expect(ttf).toHaveProperty("renge-ease-in-out");
    expect(ttf).toHaveProperty("renge-spring");
  });

  it("each key maps to its corresponding --renge-easing-* var", () => {
    const { transitionTimingFunction: ttf } = preset.theme.extend;
    expect(ttf["renge-linear"]).toBe("var(--renge-easing-linear)");
    expect(ttf["renge-ease-in"]).toBe("var(--renge-easing-ease-in)");
    expect(ttf["renge-ease-out"]).toBe("var(--renge-easing-ease-out)");
    expect(ttf["renge-ease-in-out"]).toBe("var(--renge-easing-ease-in-out)");
    expect(ttf["renge-spring"]).toBe("var(--renge-easing-spring)");
  });
});

// ─── Colors ───────────────────────────────────────────────────────────────────

describe("colors scale", () => {
  it("has exactly 22 semantic tokens under renge namespace", () => {
    expect(Object.keys(preset.theme.extend.colors.renge)).toHaveLength(22);
  });

  it("has all background tokens", () => {
    const { renge } = preset.theme.extend.colors;
    expect(renge).toHaveProperty("bg");
    expect(renge).toHaveProperty("bg-subtle");
    expect(renge).toHaveProperty("bg-muted");
    expect(renge).toHaveProperty("bg-inverse");
  });

  it("has all foreground tokens", () => {
    const { renge } = preset.theme.extend.colors;
    expect(renge).toHaveProperty("fg");
    expect(renge).toHaveProperty("fg-subtle");
    expect(renge).toHaveProperty("fg-muted");
    expect(renge).toHaveProperty("fg-inverse");
  });

  it("has all border tokens", () => {
    const { renge } = preset.theme.extend.colors;
    expect(renge).toHaveProperty("border");
    expect(renge).toHaveProperty("border-subtle");
    expect(renge).toHaveProperty("border-focus");
  });

  it("has all accent tokens", () => {
    const { renge } = preset.theme.extend.colors;
    expect(renge).toHaveProperty("accent");
    expect(renge).toHaveProperty("accent-hover");
    expect(renge).toHaveProperty("accent-subtle");
  });

  it("has all semantic state tokens", () => {
    const { renge } = preset.theme.extend.colors;
    expect(renge).toHaveProperty("success");
    expect(renge).toHaveProperty("success-subtle");
    expect(renge).toHaveProperty("warning");
    expect(renge).toHaveProperty("warning-subtle");
    expect(renge).toHaveProperty("danger");
    expect(renge).toHaveProperty("danger-subtle");
    expect(renge).toHaveProperty("info");
    expect(renge).toHaveProperty("info-subtle");
  });

  it("each color maps to its corresponding --renge-color-* var", () => {
    const { renge } = preset.theme.extend.colors;
    const colorKeys = [
      "bg", "bg-subtle", "bg-muted", "bg-inverse",
      "fg", "fg-subtle", "fg-muted", "fg-inverse",
      "border", "border-subtle", "border-focus",
      "accent", "accent-hover", "accent-subtle",
      "success", "success-subtle",
      "warning", "warning-subtle",
      "danger", "danger-subtle",
      "info", "info-subtle",
    ];
    for (const key of colorKeys) {
      expect(renge[key as keyof typeof renge]).toBe(`var(--renge-color-${key})`);
    }
  });
});

// ─── Cross-scale consistency ──────────────────────────────────────────────────

describe("cross-scale consistency", () => {
  it("spacing and transitionDuration have the same number of numeric steps", () => {
    expect(Object.keys(preset.theme.extend.spacing)).toHaveLength(11);
    expect(Object.keys(preset.theme.extend.transitionDuration)).toHaveLength(11);
  });

  it("all var() references are well-formed (no unclosed parens)", () => {
    const allValues = allLeafValues(preset.theme.extend as Record<string, unknown>);
    for (const val of allValues) {
      const opens = (val.match(/\(/g) ?? []).length;
      const closes = (val.match(/\)/g) ?? []).length;
      expect(opens).toBe(closes);
    }
  });

  it("all CSS var names follow --renge-{category}-{key} pattern", () => {
    const allValues = allLeafValues(preset.theme.extend as Record<string, unknown>);
    for (const val of allValues) {
      expect(val).toMatch(/^var\(--renge-[a-z]+(-[a-z0-9]+)+\)$/);
    }
  });
});
