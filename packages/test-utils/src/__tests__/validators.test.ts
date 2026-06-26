import { describe, it, expect } from 'vitest';
import {
  validateSpacingScale,
  validateTypeScale,
  validateContrastRatio,
  type ValidationResult,
} from '../validators';

describe('validateSpacingScale', () => {
  it('should pass for monotonically increasing scale', () => {
    const scale = {
      'space-1': '4px',
      'space-2': '8px',
      'space-3': '16px',
      'space-4': '32px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should fail for scale with duplicate values', () => {
    const scale = {
      'space-1': '4px',
      'space-2': '8px',
      'space-3': '8px', // Duplicate value breaks monotonic increase
      'space-4': '16px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatch(/not monotonically increasing/);
  });

  it('should fail for duplicate values', () => {
    const scale = {
      'space-1': '8px',
      'space-2': '8px', // Duplicate
      'space-3': '16px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/not monotonically increasing/);
  });

  it('should handle invalid pixel values', () => {
    const scale = {
      'space-1': '4px',
      'space-2': 'invalid',
      'space-3': '16px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Invalid spacing value'))).toBe(true);
  });

  it('should work with unsorted input', () => {
    const scale = {
      'space-3': '16px',
      'space-1': '4px',
      'space-4': '32px',
      'space-2': '8px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate calc-based runtime-scaled tokens', () => {
    // Generated spacing tokens scale via a runtime CSS variable; the
    // build-time multiplier is the comparable magnitude.
    const scale = {
      'space-1': 'calc(1 * var(--renge-base-unit, 4px))',
      'space-2': 'calc(2 * var(--renge-base-unit, 4px))',
      'space-3': 'calc(3 * var(--renge-base-unit, 4px))',
      'space-4': 'calc(5 * var(--renge-base-unit, 4px))',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for calc tokens with duplicate multipliers', () => {
    const scale = {
      'space-1': 'calc(1 * var(--renge-base-unit, 4px))',
      'space-2': 'calc(2 * var(--renge-base-unit, 4px))',
      'space-3': 'calc(2 * var(--renge-base-unit, 4px))', // duplicate
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/not monotonically increasing/);
  });

  it('should handle Fibonacci-based spacing', () => {
    const scale = {
      'fib-0': '0px',
      'fib-1': '4px',
      'fib-1-2': '4px', // Duplicate with fib-1
      'fib-2': '8px',
      'fib-3': '16px',
      'fib-4': '32px',
      'fib-5': '64px',
    };

    const result = validateSpacingScale(scale);

    expect(result.valid).toBe(false); // Fails on duplicate
  });
});

describe('validateTypeScale', () => {
  it('should pass for scale with consistent ratio', () => {
    // Scale with ~1.25 ratio between sizes (not PHI, but consistent)
    const scale = {
      'xs': { fontSize: '10px', lineHeight: '1.5' },
      'sm': { fontSize: '12.5px', lineHeight: '1.5' },
      'base': { fontSize: '16px', lineHeight: '1.6' },
      'md': { fontSize: '20px', lineHeight: '1.6' },
      'lg': { fontSize: '25px', lineHeight: '1.7' },
    };

    // Use 1.25 ratio with generous tolerance
    const result = validateTypeScale(scale, 1.25, 0.05);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for inconsistent ratios', () => {
    const scale = {
      'xs': { fontSize: '12px', lineHeight: '1.5' },
      'sm': { fontSize: '14px', lineHeight: '1.5' },
      'md': { fontSize: '28px', lineHeight: '1.6' }, // Ratio jump
      'lg': { fontSize: '45px', lineHeight: '1.6' },
    };

    const result = validateTypeScale(scale, 1.618, 0.05); // 5% tolerance

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toMatch(/Typography ratio deviation/);
  });

  it('should handle invalid font size values', () => {
    const scale = {
      'xs': { fontSize: 'invalid', lineHeight: '1.5' },
      'sm': { fontSize: '14px', lineHeight: '1.5' },
    };

    const result = validateTypeScale(scale);

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Invalid type scale fontSize'))).toBe(true);
  });

  it('should calculate ratio deviation correctly', () => {
    const scale = {
      'base': { fontSize: '16px', lineHeight: '1.6' },
      'lg': { fontSize: '20px', lineHeight: '1.6' }, // Ratio: 1.25 (expected: 1.618)
    };

    const result = validateTypeScale(scale, 1.618, 0.05);

    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/deviation/);
  });

  it('should work with unsorted font sizes', () => {
    const scale = {
      'lg': { fontSize: '20px', lineHeight: '1.7' },
      'base': { fontSize: '16px', lineHeight: '1.6' },
      'sm': { fontSize: '12.8px', lineHeight: '1.5' }, // 16/12.8 = 1.25, 20/16 = 1.25
    };

    // Use consistent 1.25 ratio with 5% tolerance
    const result = validateTypeScale(scale, 1.25, 0.05);

    expect(result.valid).toBe(true);
  });

  it('should respect custom ratio and tolerance', () => {
    const scale = {
      'size-1': { fontSize: '10px', lineHeight: '1.5' },
      'size-2': { fontSize: '12px', lineHeight: '1.5' }, // Ratio: 1.2
    };

    // Should fail with default PHI ratio
    const resultPhi = validateTypeScale(scale, 1.618, 0.05);
    expect(resultPhi.valid).toBe(false);

    // Should pass with custom ratio
    const resultCustom = validateTypeScale(scale, 1.2, 0.05);
    expect(resultCustom.valid).toBe(true);
  });
});

describe('validateContrastRatio', () => {
  it('should validate basic color inputs', () => {
    const result = validateContrastRatio('#000000', '#FFFFFF');

    expect(result).toBeDefined();
    expect(result.valid).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(result.warnings).toBeDefined();
  });

  it('should validate sufficient contrast', () => {
    // oklch(0% 0 0) = black, oklch(100% 0 0) = white, contrast = 21
    const result = validateContrastRatio(
      'oklch(0% 0 0)',
      'oklch(100% 0 0)',
      4.5
    );

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail for insufficient contrast', () => {
    // oklch(70% 0.1 10) vs oklch(90% 0.05 10), contrast ≈ 3.22 < 4.5
    const result = validateContrastRatio(
      'oklch(70% 0.1 10)',
      'oklch(90% 0.05 10)',
      4.5
    );

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors.some((e) => e.includes('Contrast ratio'))).toBe(true);
  });

  it('should reject missing colors', () => {
    const result = validateContrastRatio('', '#FFFFFF');

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should reject invalid minRatio', () => {
    const result = validateContrastRatio(
      '#000000',
      '#FFFFFF',
      0.5 // Less than 1
    );

    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Minimum contrast ratio'))).toBe(true);
  });

  it('should accept reasonable minRatio values', () => {
    const result = validateContrastRatio(
      'oklch(0% 0 0)',
      'oklch(100% 0 0)',
      4.5 // WCAG AA
    );

    expect(result.valid).toBe(true);
  });

  it('should handle various color formats', () => {
    const formats = [
      { fg: '#000000', bg: '#FFFFFF' }, // Hex
      { fg: 'rgb(0, 0, 0)', bg: 'rgb(255, 255, 255)' }, // RGB
      { fg: 'oklch(0% 0 0)', bg: 'oklch(100% 0 0)' }, // OKLCH
    ];

    formats.forEach(({ fg, bg }) => {
      const result = validateContrastRatio(fg, bg);
      expect(result).toBeDefined();
      expect(result.errors).toBeDefined();
    });
  });
});

describe('ValidationResult interface', () => {
  it('should return valid structure', () => {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
    };

    expect(result.valid).toBe(true);
    expect(Array.isArray(result.errors)).toBe(true);
    expect(Array.isArray(result.warnings)).toBe(true);
  });
});
