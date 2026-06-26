/**
 * Validation utilities for Renge design system tokens.
 * Validators check token scales for mathematical properties,
 * monotonic increase, and WCAG compliance.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate that a spacing scale is monotonically increasing.
 * Useful for ensuring each step is larger than the previous.
 *
 * @param scale - Object mapping token names to pixel values (e.g., { "space-1": "4px", "space-2": "8px" })
 * @returns ValidationResult with errors if scale is not monotonic
 *
 * @example
 * const result = validateSpacingScale({
 *   "space-1": "4px",
 *   "space-2": "8px",
 *   "space-3": "16px",
 * });
 * if (!result.valid) console.error(result.errors);
 */
export function validateSpacingScale(
  scale: Record<string, string>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Parse values and sort numerically.
  // Tokens may be literal pixels ("8px") or calc-based, where the base unit is
  // a runtime variable ("calc(2 * var(--renge-base-unit, 4px))"). For the latter
  // the build-time multiplier is the comparable magnitude: every step shares the
  // same base unit, so multiplier ordering matches rendered-size ordering.
  const values = Object.entries(scale)
    .map(([key, val]) => {
      const calc = val.match(/^calc\(\s*([\d.]+)\s*\*/);
      const px = calc ? parseFloat(calc[1]) : parseFloat(val);
      return { key, val, px, isValid: !isNaN(px) };
    })
    .sort((a, b) => a.px - b.px);

  // Check for invalid (non-numeric) values
  values.forEach(({ key, val, isValid }) => {
    if (!isValid) {
      errors.push(`Invalid spacing value for ${key}: "${val}" is not a valid pixel value`);
    }
  });

  // Check monotonic increase (each value > previous)
  for (let i = 1; i < values.length; i++) {
    if (values[i].px <= values[i - 1].px) {
      errors.push(
        `Scale not monotonically increasing: ${values[i - 1].key} (${values[i - 1].px}px) >= ${values[i].key} (${values[i].px}px)`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate that a typography scale follows a consistent ratio (typically PHI ≈ 1.618).
 * Checks that each size is approximately ratio * previous size.
 *
 * @param scale - Object mapping token names to { fontSize, lineHeight } (e.g., { "xs": { fontSize: "12px", lineHeight: "1.5" } })
 * @param expectedRatio - Expected ratio between consecutive sizes (default: 1.618 for PHI)
 * @param tolerance - Acceptable deviation from expected ratio as fraction (default: 0.05 = ±5%)
 * @returns ValidationResult with errors if ratios deviate beyond tolerance
 *
 * @example
 * const result = validateTypeScale({
 *   "xs": { fontSize: "12px", lineHeight: "1.5" },
 *   "sm": { fontSize: "14px", lineHeight: "1.5" },
 *   "md": { fontSize: "16px", lineHeight: "1.6" },
 *   "lg": { fontSize: "20px", lineHeight: "1.6" },
 * });
 */
export function validateTypeScale(
  scale: Record<string, { fontSize: string; lineHeight: string }>,
  expectedRatio: number = 1.618,
  tolerance: number = 0.05
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Extract font sizes and sort
  const sizes = Object.entries(scale)
    .map(([key, { fontSize }]) => {
      const px = parseFloat(fontSize);
      return { key, fontSize, px, isValid: !isNaN(px) };
    })
    .sort((a, b) => a.px - b.px);

  // Check for invalid values
  sizes.forEach(({ key, fontSize, isValid }) => {
    if (!isValid) {
      errors.push(`Invalid type scale fontSize for ${key}: "${fontSize}" is not a valid pixel value`);
    }
  });

  // Check ratios between consecutive steps
  for (let i = 1; i < sizes.length; i++) {
    const ratio = sizes[i].px / sizes[i - 1].px;
    const expectedMin = expectedRatio * (1 - tolerance);
    const expectedMax = expectedRatio * (1 + tolerance);

    if (ratio < expectedMin || ratio > expectedMax) {
      const deviation = ((ratio - expectedRatio) / expectedRatio * 100).toFixed(1);
      errors.push(
        `Typography ratio deviation: ${ratio.toFixed(3)} ` +
        `(expected ~${expectedRatio.toFixed(3)}, actual deviation: ${deviation}%) ` +
        `between ${sizes[i - 1].key} (${sizes[i - 1].px}px) and ${sizes[i].key} (${sizes[i].px}px)`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate WCAG contrast ratio between two colors.
 * Supports OKLCH color space with OKLCH→RGB→luminance conversion.
 *
 * Contrast ratio formula (WCAG 2.0):
 * - L1 = relative luminance of lighter color
 * - L2 = relative luminance of darker color
 * - Contrast = (L1 + 0.05) / (L2 + 0.05)
 *
 * @param foreground - Color value (oklch format, e.g., "oklch(70% 0.1 10)")
 * @param background - Color value (oklch format, e.g., "oklch(90% 0.05 10)")
 * @param minRatio - Minimum acceptable contrast ratio (default: 4.5 for WCAG AA normal text)
 * @returns ValidationResult with errors if contrast is below minRatio
 *
 * @example
 * const result = validateContrastRatio(
 *   "oklch(70% 0.1 10)",  // foreground
 *   "oklch(90% 0.05 10)", // background
 *   4.5                   // WCAG AA minimum
 * );
 */
export function validateContrastRatio(
  foreground: string,
  background: string,
  minRatio: number = 4.5
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!foreground || !background) {
    errors.push("Foreground and background colors are required");
    return { valid: false, errors, warnings };
  }

  if (minRatio < 1) {
    errors.push(`Minimum contrast ratio must be >= 1, got ${minRatio}`);
    return { valid: false, errors, warnings };
  }

  // Parse OKLCH colors and convert to RGB, then calculate luminance
  const fgLuminance = parseLuminance(foreground);
  const bgLuminance = parseLuminance(background);

  if (fgLuminance === null || bgLuminance === null) {
    errors.push(`Invalid color format. Expected oklch(L% C H), got "${foreground}" and "${background}"`);
    return { valid: false, errors, warnings };
  }

  // Calculate WCAG contrast ratio
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  const contrastRatio = (lighter + 0.05) / (darker + 0.05);

  if (contrastRatio < minRatio) {
    errors.push(
      `Contrast ratio ${contrastRatio.toFixed(2)} is below minimum ${minRatio.toFixed(2)} ` +
      `(foreground: ${foreground}, background: ${background})`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Parse color and return relative luminance (0–1)
 * Supports OKLCH format: oklch(L% C H)
 */
function parseLuminance(colorStr: string): number | null {
  // Try OKLCH format first
  const oklchMatch = colorStr.match(/oklch\s*\(\s*([\d.]+)%?\s+([.\d]+)\s+([.\d]+)\s*\)/);
  if (oklchMatch) {
    return oklchToLuminance(
      parseFloat(oklchMatch[1]) / 100,
      parseFloat(oklchMatch[2]),
      parseFloat(oklchMatch[3])
    );
  }

  // Fallback: unsupported format
  return null;
}

/**
 * Convert OKLCH color to relative luminance
 * @param L - Lightness (0–1)
 * @param C - Chroma
 * @param H - Hue (0–360)
 */
function oklchToLuminance(L: number, C: number, H: number): number {
  // Convert OKLCH to OKLab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // Convert OKLab to linear sRGB
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = 4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s;
  const b_ = -0.0041960771 * l - 0.7034186147 * m + 1.7076147010 * s;

  // Linearize RGB values for luminance calculation
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b_);

  // WCAG relative luminance formula
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * Apply gamma linearization for luminance calculation
 * Converts sRGB to linear RGB values
 */
function linearize(c: number): number {
  c = Math.max(0, Math.min(1, c)); // clamp to 0–1
  if (c <= 0.04045) {
    return c / 12.92;
  }
  return Math.pow((c + 0.055) / 1.055, 2.4);
}
