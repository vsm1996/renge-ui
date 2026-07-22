import { describe, it, expect } from "vitest";
import { createRengeTheme } from "@renge-ui/tokens";
import { validateContrastRatio } from "../validators";

const PROFILES = ["ocean", "earth", "twilight", "fire", "void", "leaf"] as const;
const MODES = ["light", "dark"] as const;

// Helper to extract contrast ratio from colors
function getContrastRatio(fg: string, bg: string): number | null {
  function parseLuminance(oklchStr: string): number | null {
    const match = oklchStr.match(
      /oklch\s*\(\s*([\d.]+)%?\s+([.\d]+)\s+([.\d]+)\s*\)/
    );
    if (!match) return null;

    const L = parseFloat(match[1]) / 100;
    const C = parseFloat(match[2]);
    const H = parseFloat(match[3]);

    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);

    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    // OKLab → LINEAR-light sRGB; WCAG luminance uses these directly (no second
    // sRGB EOTF — see validators.ts oklchToLuminance). Clamp out-of-gamut.
    const clamp = (c: number) => Math.max(0, Math.min(1, c));
    const r = clamp(4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s);
    const g = clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s);
    const b_ = clamp(-0.0041960771 * l - 0.7034186147 * m + 1.7076147010 * s);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b_;
  }

  const fgL = parseLuminance(fg);
  const bgL = parseLuminance(bg);

  if (fgL === null || bgL === null) return null;

  const lighter = Math.max(fgL, bgL);
  const darker = Math.min(fgL, bgL);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("contrast validation — all profiles × modes", () => {
  describe.each(PROFILES)("profile: %s", (profile) => {
    describe.each(MODES)("mode: %s", (mode) => {
      it(`${profile} ${mode} — fg / bg (text)`, () => {
        const theme = createRengeTheme({ profile: profile as any, mode: mode as any });
        const result = validateContrastRatio(
          theme.vars["--renge-color-fg"],
          theme.vars["--renge-color-bg"]
        );
        const ratio = getContrastRatio(
          theme.vars["--renge-color-fg"],
          theme.vars["--renge-color-bg"]
        );
        expect(result.valid).toBe(true);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });

      it(`${profile} ${mode} — accent / bg`, () => {
        const theme = createRengeTheme({ profile: profile as any, mode: mode as any });
        const result = validateContrastRatio(
          theme.vars["--renge-color-accent"],
          theme.vars["--renge-color-bg"]
        );
        const ratio = getContrastRatio(
          theme.vars["--renge-color-accent"],
          theme.vars["--renge-color-bg"]
        );
        if (ratio && ratio < 4.5) {
          console.log(`  accent/bg ratio ${ratio.toFixed(2)}:1 (${theme.vars["--renge-color-accent"]} on ${theme.vars["--renge-color-bg"]})`);
        }
        expect(result.valid).toBe(true);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });

      it(`${profile} ${mode} — danger / bg`, () => {
        const theme = createRengeTheme({ profile: profile as any, mode: mode as any });
        const result = validateContrastRatio(
          theme.vars["--renge-color-danger"],
          theme.vars["--renge-color-bg"]
        );
        const ratio = getContrastRatio(
          theme.vars["--renge-color-danger"],
          theme.vars["--renge-color-bg"]
        );
        if (ratio && ratio < 4.5) {
          console.log(`  danger/bg ratio ${ratio.toFixed(2)}:1 (${theme.vars["--renge-color-danger"]} on ${theme.vars["--renge-color-bg"]})`);
        }
        expect(result.valid).toBe(true);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });

      it(`${profile} ${mode} — success / bg`, () => {
        const theme = createRengeTheme({ profile: profile as any, mode: mode as any });
        const result = validateContrastRatio(
          theme.vars["--renge-color-success"],
          theme.vars["--renge-color-bg"]
        );
        const ratio = getContrastRatio(
          theme.vars["--renge-color-success"],
          theme.vars["--renge-color-bg"]
        );
        if (ratio && ratio < 4.5) {
          console.log(`  success/bg ratio ${ratio.toFixed(2)}:1 (${theme.vars["--renge-color-success"]} on ${theme.vars["--renge-color-bg"]})`);
        }
        expect(result.valid).toBe(true);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });
    });
  });
});
