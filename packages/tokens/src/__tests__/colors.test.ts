import { describe, it, expect } from "vitest";
import { createRengeTheme } from "../index";
import { profiles, getProfile, createSemanticColorVars, createPaletteVars } from "../index";
import { semanticColorKeys } from "../types";

const ALL_PROFILES = ["ocean", "earth", "twilight"] as const;

describe("color profiles", () => {
  it("all three profiles exist", () => {
    expect(profiles).toHaveProperty("ocean");
    expect(profiles).toHaveProperty("earth");
    expect(profiles).toHaveProperty("twilight");
  });

  it("getProfile returns the correct profile", () => {
    expect(getProfile("ocean")).toBe(profiles.ocean);
    expect(getProfile("earth")).toBe(profiles.earth);
    expect(getProfile("twilight")).toBe(profiles.twilight);
  });

  it("each profile has all 22 semantic keys", () => {
    for (const name of ALL_PROFILES) {
      const profile = profiles[name];
      for (const key of semanticColorKeys) {
        expect(profile).toHaveProperty(key);
      }
    }
  });
});

describe("createSemanticColorVars", () => {
  it("generates CSS vars for all semantic keys", () => {
    const vars = createSemanticColorVars(profiles.ocean);
    for (const key of semanticColorKeys) {
      // camelCase → kebab-case: bgSubtle → bg-subtle
      const cssKey = `--renge-color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      expect(vars).toHaveProperty(cssKey);
    }
  });

  it("all values are non-empty strings", () => {
    const vars = createSemanticColorVars(profiles.twilight);
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
    const theme = createRengeTheme({ profile: "twilight" });
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
});
