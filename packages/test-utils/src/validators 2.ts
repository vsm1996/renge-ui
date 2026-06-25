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

  // Parse values and sort numerically
  const values = Object.entries(scale)
    .map(([key, val]) => {
      const px = parseFloat(val);
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
 * Stub implementation — full version requires OKLCH to RGB conversion.
 *
 * Contrast ratio formula (WCAG 2.0):
 * - L1 = relative luminance of lighter color
 * - L2 = relative luminance of darker color
 * - Contrast = (L1 + 0.05) / (L2 + 0.05)
 *
 * @param foreground - Color value (hex, rgb, oklch, or named color)
 * @param background - Color value (hex, rgb, oklch, or named color)
 * @param minRatio - Minimum acceptable contrast ratio (default: 4.5 for WCAG AA normal text)
 * @returns ValidationResult (stub: always valid, to be extended)
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

  // TODO: Implement full OKLCH/RGB conversion and luminance calculation
  // For now, this is a stub that always passes.
  // Full implementation would:
  // 1. Parse foreground/background into OKLCH or RGB
  // 2. Convert to RGB if needed
  // 3. Calculate relative luminance: 0.2126*R + 0.7152*G + 0.0722*B
  // 4. Compute contrast ratio: (lighter + 0.05) / (darker + 0.05)
  // 5. Compare to minRatio

  if (!foreground || !background) {
    errors.push("Foreground and background colors are required");
  }

  if (minRatio < 1) {
    errors.push(`Minimum contrast ratio must be >= 1, got ${minRatio}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
