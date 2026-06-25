# @renge-ui/test-utils

Testing utilities and validators for the [Renge](https://github.com/vsm1996/renge-ui) design system.

Use these validators to ensure your token scales follow mathematical principles and meet accessibility standards.

---

## Installation

```bash
pnpm add -D @renge-ui/test-utils
```

---

## Validators

### `validateSpacingScale`

Validate that a spacing scale is **monotonically increasing** — each step larger than the previous.

**Useful for:**
- Verifying Fibonacci-based spacing scales
- Catching token ordering issues
- Ensuring no duplicate values

**Usage:**

```typescript
import { validateSpacingScale } from '@renge-ui/test-utils';

const spacingScale = {
  'space-1': '4px',
  'space-2': '8px',
  'space-3': '16px',
  'space-4': '32px',
  'space-5': '64px',
};

const result = validateSpacingScale(spacingScale);

if (!result.valid) {
  console.error('Spacing scale errors:', result.errors);
}
```

**Returns:**

```typescript
{
  valid: boolean;
  errors: string[];
  warnings: string[];
}
```

---

### `validateTypeScale`

Validate that a typography scale follows a **consistent ratio** between consecutive sizes (typically PHI ≈ 1.618).

**Useful for:**
- Verifying typographic harmony
- Checking PHI (golden ratio) proportions
- Catching scale inconsistencies

**Usage:**

```typescript
import { validateTypeScale } from '@renge-ui/test-utils';

const typeScale = {
  'xs': { fontSize: '12px', lineHeight: '1.5' },
  'sm': { fontSize: '14px', lineHeight: '1.5' },
  'base': { fontSize: '16px', lineHeight: '1.6' },
  'md': { fontSize: '20px', lineHeight: '1.6' },
  'lg': { fontSize: '32px', lineHeight: '1.7' },
};

const result = validateTypeScale(typeScale);

if (!result.valid) {
  console.error('Typography scale errors:', result.errors);
}
```

**Parameters:**

- `scale` — Object with format `{ [tokenName]: { fontSize, lineHeight } }`
- `expectedRatio` — Expected ratio between sizes (default: `1.618` for PHI)
- `tolerance` — Acceptable deviation as fraction (default: `0.05` = ±5%)

---

### `validateContrastRatio`

Validate WCAG contrast ratio between two colors.

**Status:** Stub implementation (always passes). Full implementation coming soon.

**Useful for:**
- Verifying accessible color pairs
- Meeting WCAG AA/AAA standards

**Usage:**

```typescript
import { validateContrastRatio } from '@renge-ui/test-utils';

const result = validateContrastRatio(
  'oklch(70% 0.1 10)',  // foreground
  'oklch(90% 0.05 10)', // background
  4.5                   // WCAG AA minimum
);

if (!result.valid) {
  console.error('Contrast issues:', result.errors);
}
```

**Parameters:**

- `foreground` — Color value (hex, rgb, oklch, or named color)
- `background` — Color value
- `minRatio` — Minimum acceptable contrast (default: `4.5` for WCAG AA text)

---

## Integration Examples

### In Token Tests

```typescript
import { describe, it, expect } from 'vitest';
import { validateSpacingScale, validateTypeScale } from '@renge-ui/test-utils';
import { createSpacingScale, createTypeScale } from './scales';

describe('Token Scales', () => {
  it('should have monotonic spacing', () => {
    const spacing = createSpacingScale();
    const result = validateSpacingScale(spacing);
    expect(result.valid).toBe(true);
  });

  it('should maintain PHI ratio in typography', () => {
    const type = createTypeScale();
    const result = validateTypeScale(type);
    expect(result.valid).toBe(true);
  });
});
```

### In CI/CD

```bash
# In your test script:
pnpm test --include="**/validators.test.ts"
```

---

## Return Value Structure

All validators return a `ValidationResult` object:

```typescript
interface ValidationResult {
  valid: boolean;      // true if all checks pass
  errors: string[];    // List of validation failures
  warnings: string[];  // Non-fatal issues (reserved for future use)
}
```

---

## Philosophy

Validators are **not opinionated** — they check mathematical properties, not design taste.

- ✅ "Is this scale monotonically increasing?" (validator's job)
- ✅ "Does this match the expected PHI ratio?" (validator's job)
- ❌ "Is this color beautiful?" (not a validator's job)

---

## Future Enhancements

- [ ] Full `validateContrastRatio` implementation with OKLCH→RGB conversion
- [ ] `validateBrandGuidance` for brand compliance checks
- [ ] `validateAccessibility` for WCAG automation
- [ ] Snapshot testing utilities

---

## License

MIT — Same as Renge.
