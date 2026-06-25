"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";

export default function TestUtilsPage() {
  const isMobile = useBreakpoint();

  return (
    <ProfileProvider>
      <Nav />
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: `calc(52px + var(--renge-space-8)) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"} var(--renge-space-9)`,
        display: "flex",
        flexDirection: "column",
        gap: "var(--renge-space-9)",
      }}>

        {/* Hero */}
        <header style={{ paddingBottom: "var(--renge-space-7)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
          <p style={{
            fontSize: "var(--renge-font-size-sm)",
            color: "var(--renge-color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body)",
            margin: 0,
            marginBottom: "var(--renge-space-3)",
          }}>
            @renge-ui/test-utils
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 72px)",
            color: "var(--renge-color-fg)",
            fontWeight: 400,
            margin: 0,
            marginBottom: "var(--renge-space-5)",
            letterSpacing: "-0.02em",
          }}>
            Validators for design systems.
          </h1>
          <p style={{
            fontSize: "var(--renge-font-size-lg)",
            color: "var(--renge-color-fg-subtle)",
            fontFamily: "var(--font-body)",
            lineHeight: "var(--renge-line-height-lg)",
            margin: 0,
            marginBottom: "var(--renge-space-6)",
            maxWidth: 560,
          }}>
            Test utilities to verify token correctness. Validate spacing scales, typography ratios, color contrast, and accessibility compliance.
          </p>
          <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
            <CodeBlock code={`pnpm add -D @renge-ui/test-utils vitest`} />
            <Badge variant="neutral">v1.0.0</Badge>
            <Badge variant="neutral">Framework agnostic</Badge>
          </Stack>
        </header>

        {/* Installation */}
        <DocSection
          id="setup"
          label="Getting Started"
          title="Add to your test suite."
          description="Use these validators in your test files to ensure token correctness and design system compliance."
        >
          <CodeBlock code={`import { describe, it, expect } from 'vitest';
import { validateSpacingScale, validateTypeScale, validateContrastRatio } from '@renge-ui/test-utils';

describe('Renge Tokens', () => {
  it('spacing scale follows Fibonacci', () => {
    const result = validateSpacingScale();
    expect(result.valid).toBe(true);
  });

  it('typography scale uses PHI ratio', () => {
    const result = validateTypeScale();
    expect(result.valid).toBe(true);
  });

  it('colors meet WCAG AA contrast', () => {
    const result = validateContrastRatio('earth', 'light');
    expect(result.valid).toBe(true);
  });
});`} />
        </DocSection>

        {/* Validators */}
        <DocSection
          id="validators"
          label="Validators"
          title="Available validators"
          description="Each validator returns { valid: boolean; errors: string[]; details: object }"
        >
          <Stack gap="8">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                validateSpacingScale()
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Verify spacing follows Fibonacci sequence and base unit derivation.
              </p>
              <CodeBlock code={`import { validateSpacingScale } from '@renge-ui/test-utils';

const result = validateSpacingScale();

// Returns:
// {
//   valid: true,
//   errors: [],
//   details: {
//     baseUnit: 4,
//     fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
//     scales: [
//       { step: 1, expected: '4px', actual: '4px', valid: true },
//       { step: 2, expected: '8px', actual: '8px', valid: true },
//       // ...
//     ]
//   }
// }`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                validateTypeScale()
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Verify typography scale uses PHI ratio between consecutive sizes.
              </p>
              <CodeBlock code={`import { validateTypeScale } from '@renge-ui/test-utils';

const result = validateTypeScale();

// Returns:
// {
//   valid: true,
//   errors: [],
//   details: {
//     phi: 1.618033988749895,
//     baseSize: 16,
//     sizes: [
//       { key: 'xs', expected: '10px', actual: '10px', ratio: 0.6875, valid: true },
//       { key: 'sm', expected: '13px', actual: '13px', ratio: 0.875, valid: true },
//       { key: 'base', expected: '16px', actual: '16px', ratio: 1, valid: true },
//       { key: 'lg', expected: '26px', actual: '26px', ratio: 1.618, valid: true },
//       // ...
//     ]
//   }
// }`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                validateContrastRatio(profile, mode)
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Verify text color contrast meets WCAG AA (4.5:1) for readability.
              </p>
              <CodeBlock code={`import { validateContrastRatio } from '@renge-ui/test-utils';

const result = validateContrastRatio('earth', 'light');

// Returns:
// {
//   valid: true,
//   errors: [],
//   details: {
//     profile: 'earth',
//     mode: 'light',
//     pairs: [
//       {
//         fg: 'fg',
//         bg: 'bg',
//         fgColor: 'oklch(18% 0.04 50)',
//         bgColor: 'oklch(98% 0.01 70)',
//         ratio: 8.2,
//         wcagAA: true,
//         wcagAAA: true
//       },
//       // ... more pairs
//     ]
//   }
// }`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                validateAccessibility()
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Comprehensive WCAG 2.1 AA compliance check across all profiles and modes.
              </p>
              <CodeBlock code={`import { validateAccessibility } from '@renge-ui/test-utils';

const result = validateAccessibility();

// Returns:
// {
//   valid: true,
//   errors: [],
//   details: {
//     profiles: {
//       ocean: { light: { valid: true }, dark: { valid: true } },
//       earth: { light: { valid: true }, dark: { valid: true } },
//       twilight: { light: { valid: true }, dark: { valid: true } },
//       // ... all 6 profiles
//     },
//     wcagLevel: 'AA'
//   }
// }`} />
            </div>
          </Stack>
        </DocSection>

        {/* Example Tests */}
        <DocSection
          id="examples"
          label="Examples"
          title="Real test suites"
          description="Complete examples using Vitest."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Token Correctness
              </h3>
              <CodeBlock code={`// test/tokens.test.ts
import { describe, it, expect } from 'vitest';
import {
  validateSpacingScale,
  validateTypeScale,
  validateContrastRatio,
} from '@renge-ui/test-utils';

describe('Renge Tokens', () => {
  describe('Spacing', () => {
    it('follows Fibonacci sequence', () => {
      const result = validateSpacingScale();
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Typography', () => {
    it('uses PHI ratio', () => {
      const result = validateTypeScale();
      expect(result.valid).toBe(true);
      expect(result.details.phi).toBe(1.618033988749895);
    });
  });

  describe('Colors', () => {
    it('all profiles meet WCAG AA', () => {
      const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];

      profiles.forEach(profile => {
        const lightResult = validateContrastRatio(profile, 'light');
        const darkResult = validateContrastRatio(profile, 'dark');

        expect(lightResult.valid).toBe(true);
        expect(darkResult.valid).toBe(true);
      });
    });
  });
});`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Accessibility Audit
              </h3>
              <CodeBlock code={`// test/accessibility.test.ts
import { describe, it, expect } from 'vitest';
import { validateAccessibility } from '@renge-ui/test-utils';

describe('Accessibility Compliance', () => {
  it('meets WCAG 2.1 Level AA across all profiles', () => {
    const result = validateAccessibility();

    expect(result.valid).toBe(true);
    expect(result.details.wcagLevel).toBe('AA');
    expect(result.errors).toHaveLength(0);
  });

  it('provides error details for failures', () => {
    const result = validateAccessibility();

    if (!result.valid) {
      console.error('Accessibility issues:', result.errors);
      result.errors.forEach(err => {
        console.log('- ' + err);
      });
    }
  });
});`} />
            </div>
          </Stack>
        </DocSection>

        {/* Integration */}
        <DocSection
          id="integration"
          label="Integration"
          title="CI/CD integration"
          description="Use validators in your continuous integration pipeline."
        >
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
              GitHub Actions Example
            </h3>
            <CodeBlock code={`# .github/workflows/design-system-audit.yml
name: Design System Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm run test
      - run: pnpm run test --run packages/tokens

      # All token validators run automatically as part of \`pnpm test\`
      # If any validator fails, the workflow fails and blocks merge`} />
          </div>
        </DocSection>

        {/* WCAG */}
        <div style={{
          padding: "var(--renge-space-5)",
          border: "2px solid var(--renge-color-accent)",
          borderRadius: "var(--renge-radius-2)",
          background: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)",
        }}>
          <Stack gap="3">
            <Heading level={3} style={{ fontSize: "var(--renge-font-size-lg)", margin: 0 }}>
              ✨ Accessibility-First Testing
            </Heading>
            <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
              These utilities focus on accessibility compliance. Use them to ensure your design tokens maintain WCAG 2.1 AA standards across all modifications and updates.
            </Text>
          </Stack>
        </div>
      </div>
    </ProfileProvider>
  );
}
