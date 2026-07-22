import { describe, it, expect } from "vitest";
import v4Plugin from "../v4-plugin";

/**
 * Regression: the v4 color utilities registered via matchUtilities used to
 * ignore the opacity modifier, so `bg-renge-success/60` generated NO CSS. The
 * fix passes `modifiers: "any"` and builds a color-mix() when a modifier is
 * present. This drives the plugin's handler with a mock Tailwind API and checks
 * the recorded color utilities directly (no full Tailwind compile needed).
 */

type MatchUtilFn = (value: string, extra: { modifier: string | null }) => Record<string, string>;

interface Recorded {
  fns: Record<string, MatchUtilFn>;
  options: { modifiers?: unknown };
}

function runHandler() {
  const colorCalls: Recorded[] = [];
  const api = {
    addBase() {},
    addUtilities() {},
    matchUtilities(fns: Record<string, MatchUtilFn>, options: { values?: unknown; modifiers?: unknown }) {
      // Color utilities are the ones whose value set includes a renge color key.
      const values = (options?.values ?? {}) as Record<string, string>;
      if (typeof values["renge-success"] === "string") {
        colorCalls.push({ fns, options });
      }
    },
  };
  // tailwindcss/plugin returns { handler, config }
  const handler = (v4Plugin as unknown as { handler: (api: unknown) => void }).handler;
  handler(api);
  return colorCalls;
}

describe("v4 plugin — color opacity modifiers", () => {
  const colorCalls = runHandler();

  it("registers color utilities (bg, text, border, ring, …)", () => {
    const utilityNames = colorCalls.flatMap((c) => Object.keys(c.fns));
    for (const name of ["bg", "text", "border", "ring", "outline", "fill", "stroke"]) {
      expect(utilityNames).toContain(name);
    }
  });

  it('opts every color utility into modifiers: "any"', () => {
    for (const call of colorCalls) {
      expect(call.options.modifiers).toBe("any");
    }
  });

  it("emits color-mix() when an opacity modifier is present", () => {
    const bg = colorCalls.find((c) => "bg" in c.fns)!.fns["bg"];
    const withMod = bg("var(--renge-color-success)", { modifier: "60" });
    expect(withMod["background-color"]).toBe(
      "color-mix(in oklab, var(--renge-color-success) 60%, transparent)",
    );
    // decimal modifier → percentage
    expect(bg("var(--renge-color-success)", { modifier: "0.4" })["background-color"]).toBe(
      "color-mix(in oklab, var(--renge-color-success) 40%, transparent)",
    );
  });

  it("passes the raw color through when there is no modifier (no needless color-mix)", () => {
    const bg = colorCalls.find((c) => "bg" in c.fns)!.fns["bg"];
    expect(bg("var(--renge-color-success)", { modifier: null })["background-color"]).toBe(
      "var(--renge-color-success)",
    );
  });
});
