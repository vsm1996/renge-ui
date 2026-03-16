import { describe, it, expect } from "vitest";
import { createRengeTheme } from "../index";

describe("createRengeTheme", () => {
  it("returns css, vars, and config", () => {
    const theme = createRengeTheme();
    expect(theme).toHaveProperty("css");
    expect(theme).toHaveProperty("vars");
    expect(theme).toHaveProperty("config");
  });

  it("resolves all defaults", () => {
    const { config } = createRengeTheme();
    expect(config.baseUnit).toBe(6);
    expect(config.typeBase).toBe(16);
    expect(config.scaleRatio).toBeCloseTo(1.618);
    expect(config.profile).toBe("ocean");
    expect(config.variance).toBe(0);
    expect(config.varianceSeed).toBe("renge");
    expect(config.includeReset).toBe(false);
    expect(config.selector).toBe(":root");
  });

  it("uses :root selector by default", () => {
    const { css } = createRengeTheme();
    expect(css).toMatch(/^:root\s*\{/m);
  });

  it("uses a custom selector", () => {
    const { css } = createRengeTheme({ selector: ".my-theme" });
    expect(css).toMatch(/^\.my-theme\s*\{/m);
    expect(css).not.toContain(":root");
  });

  it("includes all CSS variable families", () => {
    const { css } = createRengeTheme();
    expect(css).toContain("--renge-space-");
    expect(css).toContain("--renge-font-size-");
    expect(css).toContain("--renge-line-height-");
    expect(css).toContain("--renge-duration-");
    expect(css).toContain("--renge-easing-");
    expect(css).toContain("--renge-radius-");
    expect(css).toContain("--renge-animation-");
    expect(css).toContain("--renge-palette-");
    expect(css).toContain("--renge-color-");
  });

  it("vars object contains all key families", () => {
    const { vars } = createRengeTheme();
    const keys = Object.keys(vars);
    expect(keys.some((k) => k.startsWith("--renge-space-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-font-size-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-duration-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-easing-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-radius-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-animation-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-palette-"))).toBe(true);
    expect(keys.some((k) => k.startsWith("--renge-color-"))).toBe(true);
  });

  it("css output includes animation @keyframes after the :root block", () => {
    const { css } = createRengeTheme();
    expect(css).toContain("@keyframes");
    expect(css).toContain("rengeSacredFade");
    expect(css).toContain("rengeFloat");
    const rootEnd = css.indexOf("}");
    const keyframesStart = css.indexOf("@keyframes");
    expect(keyframesStart).toBeGreaterThan(rootEnd);
  });

  it("includes CSS reset when includeReset is true", () => {
    const { css } = createRengeTheme({ includeReset: true });
    expect(css).toContain("box-sizing: border-box");
    expect(css).toContain("-webkit-font-smoothing");
  });

  it("does not include CSS reset by default", () => {
    const { css } = createRengeTheme();
    expect(css).not.toContain("box-sizing: border-box");
  });

  it("switching profiles changes color vars", () => {
    const ocean = createRengeTheme({ profile: "ocean" });
    const twilight = createRengeTheme({ profile: "twilight" });
    expect(ocean.vars["--renge-color-bg"]).not.toBe(
      twilight.vars["--renge-color-bg"]
    );
  });

  it("switching profiles does not change spacing vars", () => {
    const ocean = createRengeTheme({ profile: "ocean" });
    const earth = createRengeTheme({ profile: "earth" });
    expect(ocean.vars["--renge-space-4"]).toBe(earth.vars["--renge-space-4"]);
  });

  it("custom baseUnit scales spacing", () => {
    const theme = createRengeTheme({ baseUnit: 8 });
    expect(theme.vars["--renge-space-1"]).toBe("8px");
    expect(theme.vars["--renge-space-2"]).toBe("16px");
  });
});
