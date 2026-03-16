import { describe, it, expect } from "vitest";
import { createRengeTheme } from "../index";
import { profiles, getProfile, createSemanticColorVars, createPaletteVars } from "../index";
import { semanticColorKeys } from "../types";

const ALL_PROFILES = ["ocean", "earth", "twilight", "fire", "void", "leaf"] as const;
const ALL_MODES = ["light", "dark"] as const;

describe("color profiles", () => {
  it("all profiles exist", () => {
    for (const name of ALL_PROFILES) {
      expect(profiles).toHaveProperty(name);
    }
  });

  it("getProfile returns the correct light variant by default", () => {
    expect(getProfile("ocean")).toBe(profiles.ocean.light);
    expect(getProfile("earth")).toBe(profiles.earth.light);
    expect(getProfile("twilight", "dark")).toBe(profiles.twilight.dark);
  });

  it("each profile × mode has all semantic keys", () => {
    for (const name of ALL_PROFILES) {
      for (const mode of ALL_MODES) {
        const profile = profiles[name][mode];
        for (const key of semanticColorKeys) {
          expect(profile).toHaveProperty(key);
        }
      }
    }
  });
});

describe("createSemanticColorVars", () => {
  it("generates CSS vars for all semantic keys", () => {
    const vars = createSemanticColorVars(profiles.ocean.light);
    for (const key of semanticColorKeys) {
      // camelCase → kebab-case: bgSubtle → bg-subtle
      const cssKey = `--renge-color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      expect(vars).toHaveProperty(cssKey);
    }
  });

  it("all values are non-empty strings", () => {
    const vars = createSemanticColorVars(profiles.twilight.dark);
    for (const value of Object.values(vars)) {
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe("palette vars", () => {
  it("generates at least 43 palette entries", () => {
    const vars = createPaletteVars();
    const count = Object.keys(vars).filter((k) =>
      k.startsWith("--renge-palette-")
    ).length;
    expect(count).toBeGreaterThanOrEqual(43);
  });

  it("includes expected color names", () => {
    const vars = createPaletteVars();
    expect(vars).toHaveProperty("--renge-palette-sky-blue");
    expect(vars).toHaveProperty("--renge-palette-earth-brown");
    expect(vars).toHaveProperty("--renge-palette-lavender");
  });

  it("values are oklch() strings", () => {
    const vars = createPaletteVars();
    for (const value of Object.values(vars)) {
      expect(value).toMatch(/^oklch\(/);
    }
  });
});

describe("palette abstraction", () => {
  it("ocean profile danger uses cranberryRed from the palette (not hardcoded)", () => {
    const theme = createRengeTheme({ profile: "ocean" });
    const paletteVars = createPaletteVars();
    expect(theme.vars["--renge-color-danger"]).toBe(paletteVars["--renge-palette-cranberry-red"]);
  });
});

describe("theme color output per profile", () => {
  it("ocean profile has a light background", () => {
    const theme = createRengeTheme({ profile: "ocean" });
    const bg = theme.vars["--renge-color-bg"];
    expect(bg).toBeDefined();
    // Ocean bg should be a high-lightness oklch value
    const match = bg.match(/oklch\((\d+(?:\.\d+)?)%/);
    if (match) {
      expect(parseFloat(match[1])).toBeGreaterThan(80);
    }
  });

  it("twilight profile has a dark background", () => {
    const theme = createRengeTheme({ profile: "twilight", mode: "dark" });
    const bg = theme.vars["--renge-color-bg"];
    expect(bg).toBeDefined();
    // Twilight bg should be a low-lightness oklch value
    const match = bg.match(/oklch\((\d+(?:\.\d+)?)%/);
    if (match) {
      expect(parseFloat(match[1])).toBeLessThan(50);
    }
  });

  it("each profile produces --renge-color-bg, --renge-color-accent, --renge-color-danger", () => {
    for (const profile of ALL_PROFILES) {
      const theme = createRengeTheme({ profile });
      expect(theme.vars).toHaveProperty("--renge-color-bg");
      expect(theme.vars).toHaveProperty("--renge-color-accent");
      expect(theme.vars).toHaveProperty("--renge-color-danger");
    }
  });

  it("earth and fire light profiles have distinct accent colors", () => {
    const earth = createRengeTheme({ profile: "earth", mode: "light" });
    const fire  = createRengeTheme({ profile: "fire",  mode: "light" });
    expect(earth.vars["--renge-color-accent"]).not.toBe(fire.vars["--renge-color-accent"]);
    // Earth accent is golden-ochre (H≈50), fire is red-orange (H≈24) — hues must differ
    const earthH = parseFloat(earth.vars["--renge-color-accent"].match(/oklch\([^)]+\s+(\d+(?:\.\d+)?)\)/)?.[1] ?? "0");
    const fireH  = parseFloat(fire.vars["--renge-color-accent"].match(/oklch\([^)]+\s+(\d+(?:\.\d+)?)\)/)?.[1] ?? "0");
    expect(Math.abs(earthH - fireH)).toBeGreaterThan(10);
  });

  it("mode config is respected — light and dark produce different bg", () => {
    for (const profile of ALL_PROFILES) {
      const light = createRengeTheme({ profile, mode: "light" });
      const dark  = createRengeTheme({ profile, mode: "dark" });
      expect(light.vars["--renge-color-bg"]).not.toBe(dark.vars["--renge-color-bg"]);
    }
  });
});
