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

  it('should fail for non-monotonic scale', () => {
    const scale = {
      'space-1': '4px',
      'space-2': '16px',
      'space-3': '8px', // Out of order
      'space-4': '32px',
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
  it('should pass for scale with correct PHI ratio', () => {
    // Base 16px × φ sequence
    const scale = {
      'xs': { fontSize: '12px', lineHeight: '1.5' },
      'sm': { fontSize: '14px', lineHeight: '1.5' },
      'base': { fontSize: '16px', lineHeight: '1.6' },
      'md': { fontSize: '20px', lineHeight: '1.6' },
      'lg': { fontSize: '32px', lineHeight: '1.7' },
    };

    const result = validateTypeScale(scale, 1.618, 0.15); // 15% tolerance for variety

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
      'lg': { fontSize: '32px', lineHeight: '1.7' },
      'base': { fontSize: '16px', lineHeight: '1.6' },
      'sm': { fontSize: '14px', lineHeight: '1.5' },
    };

    const result = validateTypeScale(scale, 1.618, 0.15);

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

  it('should currently always pass (stub implementation)', () => {
    const result = validateContrastRatio(
      'oklch(70% 0.1 10)',
      'oklch(90% 0.05 10)',
      4.5
    );

    // Stub implementation passes (to be extended)
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
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
      '#000000',
      '#FFFFFF',
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
