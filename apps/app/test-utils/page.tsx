"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { DocPageLayout } from "@/components/ui/DocPageLayout";
import { DocSidebar, type SidebarSection } from "@/components/ui/DocSidebar";

const TESTUTILS_NAV: SidebarSection[] = [
  { label: "Overview", items: [
    { id: "overview", label: "About" },
    { id: "setup", label: "Getting Started" },
  ]},
  { label: "Reference", items: [
    { id: "validators", label: "Validators" },
    { id: "examples", label: "Test Examples" },
  ]},
  { label: "Integration", items: [
    { id: "cicd", label: "CI/CD Setup" },
  ]},
];

export default function TestUtilsPage() {
  return (
    <DocPageLayout sidebar={<DocSidebar sections={TESTUTILS_NAV} footerLinks={[
      { href: "/tokens", label: "Tokens" },
      { href: "/components", label: "Components" },
    ]} />}>

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
              Test utilities to verify token correctness. Validate spacing scales, typography ratios, color contrast, accessibility compliance, and more.
            </p>
            <Stack gap="4">
              <CodeBlock code={`pnpm add -D @renge-ui/test-utils vitest`} />
              <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap", alignItems: "center" }}>
                  <Badge variant="neutral">v1.0.2</Badge>
                <Badge variant="neutral">Framework agnostic</Badge>
                <a href="https://github.com/soka-labs/renge/tree/main/packages/test-utils" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>GitHub →</a>
                <a href="https://npmjs.com/package/@renge-ui/test-utils" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>npm →</a>
              </Stack>
            </Stack>
          </header>

          {/* Overview */}
          <DocSection
            id="overview"
            label="Overview"
            title="What is @renge-ui/test-utils?"
            description="Testing utilities for Renge design system validation."
          >
            <Stack gap="6">
              <div>
                <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", margin: 0, marginBottom: "var(--renge-space-4)", lineHeight: "var(--renge-line-height-lg)" }}>
                  @renge-ui/test-utils provides validators for testing Renge tokens in your design system. These utilities ensure that tokens maintain mathematical integrity, accessibility compliance, and design system standards across updates and modifications.
                </p>
              </div>
              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", margin: 0 }}>
                  <strong>Framework agnostic:</strong> Works with Vitest, Jest, or any testing framework. Validates tokens at build time or in CI/CD pipelines to prevent regressions.
                </p>
              </div>
            </Stack>
          </DocSection>

          {/* Installation */}
          <DocSection
            id="setup"
            label="Getting Started"
            title="Add to your test suite."
            description="Use these validators in your test files to ensure token correctness and design system compliance."
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  1. Install Package
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Add @renge-ui/test-utils as a dev dependency.
                </p>
                <CodeBlock code={`pnpm add -D @renge-ui/test-utils vitest`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  2. Basic Test
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Import validators and add assertions to your test suite.
                </p>
                <CodeBlock code={`import { describe, it, expect } from 'vitest';
import { validateSpacingScale, validateTypeScale, validateContrastRatio } from '@renge-ui/test-utils';

describe('Renge Tokens', () => {
  it('spacing scale is valid', () => {
    const result = validateSpacingScale();
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('typography scale maintains PHI ratio', () => {
    const result = validateTypeScale();
    expect(result.valid).toBe(true);
  });

  it('all color profiles meet WCAG AA', () => {
    const result = validateContrastRatio('earth', 'light');
    expect(result.valid).toBe(true);
  });
});`} />
              </div>
            </div>
          </DocSection>

          {/* Validators */}
          <DocSection
            id="validators"
            label="Validators"
            title="Available validators"
            description="Each validator returns a result object with validity status, errors, warnings, and detailed metrics."
          >
            <Stack gap="8">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  ValidationResult Type
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  All validators return this interface:
                </p>
                <CodeBlock code={`export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  validateSpacingScale()
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Verify spacing follows Fibonacci sequence and base unit derivation. Checks that values are monotonically increasing and properly calculated from the base unit.
                </p>
                <CodeBlock code={`import { validateSpacingScale } from '@renge-ui/test-utils';

const result = validateSpacingScale();

// Returns:
// {
//   valid: true,
//   errors: [],
//   warnings: [],
//   details: {
//     baseUnit: 4,
//     fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
//     scales: [
//       { step: 1, expected: '4px', actual: '4px', valid: true },
//       { step: 2, expected: '8px', actual: '8px', valid: true },
//       // ... more steps
//     ]
//   }
// }`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  validateTypeScale()
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Verify typography scale uses PHI ratio between consecutive sizes. Checks that each font size is proportionally correct and line heights are appropriate.
                </p>
                <CodeBlock code={`import { validateTypeScale } from '@renge-ui/test-utils';

const result = validateTypeScale(
  // scale: Record<string, { fontSize: string; lineHeight: string }>,
  // expectedRatio: number = 1.618 (PHI),
  // tolerance: number = 0.05 (±5%)
);

// Returns:
// {
//   valid: true,
//   errors: [],
//   warnings: [],
//   details: {
//     phi: 1.618033988749895,
//     baseSize: 16,
//     sizes: [
//       {
//         key: 'xs',
//         expected: '10px',
//         actual: '10px',
//         ratio: 0.6875,
//         valid: true
//       },
//       { key: 'sm', expected: '13px', actual: '13px', ratio: 0.875, valid: true },
//       { key: 'base', expected: '16px', actual: '16px', ratio: 1, valid: true },
//       { key: 'lg', expected: '26px', actual: '26px', ratio: 1.618, valid: true },
//       // ... more sizes
//     ]
//   }
// }`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  validateContrastRatio(profile, mode)
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Verify text color contrast meets WCAG AA (4.5:1) and WCAG AAA (7:1) standards. Essential for accessibility compliance.
                </p>
                <CodeBlock code={`import { validateContrastRatio } from '@renge-ui/test-utils';

const result = validateContrastRatio('earth', 'light');

// Returns:
// {
//   valid: true,
//   errors: [],
//   warnings: [],
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
//         wcagAA: true,  // 4.5:1 threshold
//         wcagAAA: true  // 7:1 threshold
//       },
//       // ... more color pairs
//     ]
//   }
// }`} />
              </div>
            </Stack>
          </DocSection>

          {/* Examples */}
          <DocSection
            id="examples"
            label="Examples"
            title="Real test suites"
            description="Complete test examples using Vitest."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Token Correctness Tests
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Validate all token scales maintain design system integrity.
                </p>
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

    it('has no warnings', () => {
      const result = validateSpacingScale();
      expect(result.warnings).toHaveLength(0);
    });
  });

  describe('Typography', () => {
    it('uses PHI ratio between sizes', () => {
      const result = validateTypeScale();
      expect(result.valid).toBe(true);
      expect(result.details.phi).toBe(1.618033988749895);
    });

    it('maintains consistent line heights', () => {
      const result = validateTypeScale();
      result.details.sizes.forEach(size => {
        expect(parseFloat(size.lineHeight)).toBeGreaterThan(1);
      });
    });
  });

  describe('Colors', () => {
    it('all profiles meet WCAG AA', () => {
      const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];

      profiles.forEach(profile => {
        const lightResult = validateContrastRatio(profile, 'light');
        const darkResult = validateContrastRatio(profile, 'dark');

        expect(lightResult.valid).toBe(true, \`\${profile} light mode failed\`);
        expect(darkResult.valid).toBe(true, \`\${profile} dark mode failed\`);
      });
    });

    it('all profiles exceed WCAG AAA where possible', () => {
      const profiles = ['ocean', 'earth', 'twilight'];

      profiles.forEach(profile => {
        const result = validateContrastRatio(profile, 'light');
        const allAAA = result.details.pairs.every(pair => pair.wcagAAA);
        expect(allAAA).toBe(true, \`\${profile} should meet AAA standard\`);
      });
    });
  });
});`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Accessibility Audit
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Comprehensive accessibility compliance testing.
                </p>
                <CodeBlock code={`// test/accessibility.test.ts
import { describe, it, expect, beforeAll } from 'vitest';
import { validateContrastRatio } from '@renge-ui/test-utils';

describe('Accessibility Compliance', () => {
  const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];
  const modes = ['light', 'dark'];

  let results = {};

  beforeAll(() => {
    // Run all validations once
    profiles.forEach(profile => {
      results[profile] = {};
      modes.forEach(mode => {
        results[profile][mode] = validateContrastRatio(profile, mode);
      });
    });
  });

  profiles.forEach(profile => {
    describe(\`\${profile} profile\`, () => {
      modes.forEach(mode => {
        it(\`meets WCAG AA in \${mode} mode\`, () => {
          const result = results[profile][mode];
          expect(result.valid).toBe(true);
          expect(result.errors).toHaveLength(0);
        });

        it(\`has valid contrast ratios in \${mode} mode\`, () => {
          const result = results[profile][mode];
          result.details.pairs.forEach(pair => {
            expect(pair.ratio).toBeGreaterThanOrEqual(4.5);
          });
        });
      });
    });
  });

  it('generates accessibility report', () => {
    const report = profiles.map(profile => ({
      profile,
      light: results[profile]['light'].valid,
      dark: results[profile]['dark'].valid,
    }));

    console.table(report);

    const allValid = report.every(r => r.light && r.dark);
    expect(allValid).toBe(true);
  });
});`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Custom Scale Validation
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Validate custom spacing or typography scales with custom parameters.
                </p>
                <CodeBlock code={`// test/custom-scales.test.ts
import { describe, it, expect } from 'vitest';
import { validateSpacingScale, validateTypeScale } from '@renge-ui/test-utils';

describe('Custom Scales', () => {
  it('validates custom spacing scale', () => {
    const customScale = {
      'space-1': '4px',
      'space-2': '8px',
      'space-3': '12px',
      'space-4': '16px',
      'space-5': '24px',
    };

    const result = validateSpacingScale(customScale);
    expect(result.valid).toBe(true);
  });

  it('validates custom type scale with PHI', () => {
    const customTypeScale = {
      'xs': { fontSize: '12px', lineHeight: '1.5' },
      'sm': { fontSize: '16px', lineHeight: '1.5' },
      'base': { fontSize: '20px', lineHeight: '1.6' },
      'lg': { fontSize: '32px', lineHeight: '1.6' },
    };

    const result = validateTypeScale(customTypeScale, 1.618, 0.1);
    expect(result.valid).toBe(true);
  });

  it('detects non-monotonic spacing scale', () => {
    const badScale = {
      'space-1': '4px',
      'space-2': '8px',
      'space-3': '4px', // Decreases!
      'space-4': '16px',
    };

    const result = validateSpacingScale(badScale);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});`} />
              </div>
            </Stack>
          </DocSection>

          {/* Integration */}
          <DocSection
            id="integration"
            label="Integration"
            title="CI/CD Integration"
            description="Use validators in your continuous integration pipeline."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  GitHub Actions
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Run token validators in GitHub Actions to prevent regressions.
                </p>
                <CodeBlock code={`# .github/workflows/design-system-audit.yml
name: Design System Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Run design system tests
        run: pnpm test packages/tokens

      # All token validators run automatically
      # If any fail, the workflow fails and blocks merge`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Pre-commit Hook
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Run validators before committing token changes.
                </p>
                <CodeBlock code={`#!/bin/bash
# .husky/pre-commit

echo "Validating design system tokens..."
pnpm test packages/tokens --run

if [ $? -ne 0 ]; then
  echo "Token validation failed. Fix errors before committing."
  exit 1
fi

echo "All token validators passed."
exit 0`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  NPM Scripts
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Configure test scripts in your package.json.
                </p>
                <CodeBlock code={`{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "tokens:validate": "vitest run packages/tokens",
    "tokens:watch": "vitest watch packages/tokens"
  }
}

# Run from command line:
# pnpm tokens:validate
# pnpm test:coverage`} />
              </div>
            </Stack>
          </DocSection>

          {/* Best Practices */}
          <DocSection
            id="best-practices"
            label="Best Practices"
            title="Testing patterns"
            description="Recommended approaches for comprehensive token validation."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Test all profiles and modes
                </h3>
                <CodeBlock code={`// Good: comprehensive coverage
const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];
const modes = ['light', 'dark'];

profiles.forEach(profile => {
  modes.forEach(mode => {
    const result = validateContrastRatio(profile, mode);
    expect(result.valid).toBe(true);
  });
});

// Not recommended: only testing one profile
// const result = validateContrastRatio('earth', 'light');
// expect(result.valid).toBe(true);`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Check both errors and warnings
                </h3>
                <CodeBlock code={`// Good: comprehensive validation
const result = validateSpacingScale();

expect(result.valid).toBe(true);
expect(result.errors).toHaveLength(0);
expect(result.warnings).toHaveLength(0);

// Not recommended: only checking valid status
// const result = validateSpacingScale();
// expect(result.valid).toBe(true);`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Validate details, not just status
                </h3>
                <CodeBlock code={`// Good: validate specific properties
const result = validateTypeScale();

expect(result.details.phi).toBe(1.618033988749895);
result.details.sizes.forEach(size => {
  expect(size.valid).toBe(true);
  expect(parseFloat(size.ratio)).toBeGreaterThan(0);
});

// Not recommended: only checking top-level valid
// const result = validateTypeScale();
// expect(result.valid).toBe(true);`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Use descriptive error messages
                </h3>
                <CodeBlock code={`// Good: clear assertion messages
profiles.forEach(profile => {
  const result = validateContrastRatio(profile, 'light');
  expect(result.valid).toBe(true,
    \`\${profile} light mode failed contrast check: \${result.errors.join(', ')}\`
  );
});

// Not recommended: no context
// expect(result.valid).toBe(true);`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Cache results for performance
                </h3>
                <CodeBlock code={`// Good: run expensive validations once
const cachedResults = {
  spacing: validateSpacingScale(),
  typography: validateTypeScale(),
};

describe('Tokens', () => {
  it('spacing is valid', () => {
    expect(cachedResults.spacing.valid).toBe(true);
  });

  it('typography is valid', () => {
    expect(cachedResults.typography.valid).toBe(true);
  });
});`} />
              </div>
            </Stack>
          </DocSection>

          {/* Framework Notes */}
          <DocSection
            id="frameworks"
            label="Frameworks"
            title="Framework-specific setup"
            description="Integration with different testing frameworks."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Vitest (Recommended)
                </h3>
                <CodeBlock code={`// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.test.ts'],
  },
});

// test/tokens.test.ts
import { describe, it, expect } from 'vitest';
import { validateSpacingScale } from '@renge-ui/test-utils';

describe('Tokens', () => {
  it('spacing is valid', () => {
    expect(validateSpacingScale().valid).toBe(true);
  });
});`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Jest
                </h3>
                <CodeBlock code={`// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
};

// test/tokens.test.ts
import { validateSpacingScale } from '@renge-ui/test-utils';

describe('Tokens', () => {
  it('spacing is valid', () => {
    expect(validateSpacingScale().valid).toBe(true);
  });
});`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  TypeScript Configuration
                </h3>
                <CodeBlock code={`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}`} />
              </div>
            </Stack>
          </DocSection>

          {/* Accessibility */}
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
    </DocPageLayout>
  );
}
