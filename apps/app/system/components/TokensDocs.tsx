import { Stack, Text, Heading } from "@renge-ui/react";
import { Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";

export function TokensDocs() {
  return (
    <ComponentSection id="tokens" title="Token API" description="@renge-ui/tokens exports two ways to consume tokens: createRengeTheme() for generating CSS, and rengeVars for typed CSS variable references.">
      <Callout>
        Every component in @renge-ui/react references CSS custom properties — never hardcoded values. Switch profiles by swapping which theme block is injected. No component re-renders required.
      </Callout>

      <Stack gap="3">
        <Heading level={3} size="lg">createRengeTheme(config?)</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Generates a complete token set from mathematical first principles. Returns CSS ready to inject and a JS vars map.
        </Text>
        <Code>{`import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({
  profile:    "ocean",   // 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
  mode:       "light",   // 'light' | 'dark'
  baseUnit:   4,         // Spacing multiplier in px — try 6 for denser UIs
  typeBase:   16,        // Root font size in px
  scaleRatio: 1.618,     // Typography scale ratio (φ = golden ratio)
  variance:   0,         // 0–1 tolerance drift (0 = exact math, deterministic)
  selector:   ":root",   // CSS selector to wrap the variables in
});

// theme.css   — full :root { --renge-* ... } string, ready to inject
// theme.vars  — Record<string, string> of every --renge-* variable
// theme.config — resolved config with all defaults applied`}</Code>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">rengeVars</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          A statically typed object of CSS variable references. No runtime dependency — IDE autocomplete for every token.
        </Text>
        <Code>{`import { rengeVars } from "@renge-ui/tokens";

// Color (22 semantic tokens, profile-reactive)
rengeVars.color.bg            // "var(--renge-color-bg)"
rengeVars.color.accent        // "var(--renge-color-accent)"
rengeVars.color.danger        // "var(--renge-color-danger)"

// Spacing (Fibonacci × baseUnit, steps 0–10)
rengeVars.space[3]   // "var(--renge-space-3)"  → 12px (Fib 3 × 4)
rengeVars.space[5]   // "var(--renge-space-5)"  → 32px (Fib 8 × 4)

// Typography (PHI scale, 8 steps)
rengeVars.fontSize.base       // "var(--renge-font-size-base)"
rengeVars.fontSize.lg         // "var(--renge-font-size-lg)"
rengeVars.lineHeight.base     // "var(--renge-line-height-base)"

// Motion (Fibonacci × 100ms, steps 0–10)
rengeVars.duration[2]         // "var(--renge-duration-2)"  → 200ms
rengeVars.duration[5]         // "var(--renge-duration-5)"  → 800ms
rengeVars.easing.out          // "var(--renge-easing-ease-out)"
rengeVars.easing.spring       // "var(--renge-easing-spring)"

// Radius (Fibonacci × baseUnit, steps none/1–5/full)
rengeVars.radius[2]           // "var(--renge-radius-2)"   → 8px
rengeVars.radius.full         // "var(--renge-radius-full)" → pill

// Layout (PHI-derived containers, Fibonacci column min-widths, φ aspect ratios)
rengeVars.container.sm        // "var(--renge-container-sm)"  → 524px (200 × φ²)
rengeVars.container.lg        // "var(--renge-container-lg)"  → 1371px (200 × φ⁴)
rengeVars.colMin.sm           // "var(--renge-col-min-sm)"    → 272px (34 × 8px)
rengeVars.aspect.golden       // "var(--renge-aspect-golden)" → 1.618034 (φ)
rengeVars.aspect.vertical     // "var(--renge-aspect-vertical)" → 0.618034 (1/φ)`}</Code>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">Bridging to another system</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Use <code>rengeVars</code> to map Renge tokens to your own CSS variable names — no string construction.
        </Text>
        <Code>{`import { createRengeTheme, rengeVars } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "earth", mode: "light" });

const aliases: [string, string][] = [
  ["--color-bg-primary",   rengeVars.color.bg],
  ["--color-bg-secondary", rengeVars.color.bgSubtle],
  ["--color-primary",      rengeVars.color.accent],
  ["--color-error",        rengeVars.color.danger],
  ["--space-sm",           rengeVars.space[2]],
  ["--space-md",           rengeVars.space[4]],
];

const aliasCSS = \`:root {\n\${aliases.map(([k, v]) => \`  \${k}: \${v};\`).join("\\n")}\n}\`;
document.head.insertAdjacentHTML("beforeend", \`<style>\${theme.css}\\n\${aliasCSS}</style>\`);`}</Code>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">Spacing tokens — --renge-space-{"{0–10}"}</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Each step is <code>FIBONACCI[n] × baseUnit</code>. Default baseUnit = 4px. Growth is non-linear by design.
        </Text>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["Token", "Fibonacci", "Default (baseUnit=4)"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["--renge-space-0",  "0",  "0px"],
                ["--renge-space-1",  "1",  "4px"],
                ["--renge-space-2",  "2",  "8px"],
                ["--renge-space-3",  "3",  "12px"],
                ["--renge-space-4",  "5",  "20px"],
                ["--renge-space-5",  "8",  "32px"],
                ["--renge-space-6",  "13", "52px"],
                ["--renge-space-7",  "21", "84px"],
                ["--renge-space-8",  "34", "136px"],
                ["--renge-space-9",  "55", "220px"],
                ["--renge-space-10", "89", "356px"],
              ] as [string, string, string][]).map(([tok, fib, val]) => (
                <tr key={tok}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{tok}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{fib}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">Typography tokens — --renge-font-size-{"{size}"}</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Formula: <code>typeBase × scaleRatio^n</code>. Default typeBase = 16px, scaleRatio = φ. Steps use fractional exponents for finer gradation at the small end.
        </Text>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["Token", "Formula", "Default"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["--renge-font-size-xs",   "base × φ^−0.5", "~12.6px"],
                ["--renge-font-size-sm",   "base × φ^−0.25", "~14.2px"],
                ["--renge-font-size-base", "base × φ⁰",      "16px"],
                ["--renge-font-size-lg",   "base × φ¹",      "~25.9px"],
                ["--renge-font-size-xl",   "base × φ²",      "~41.9px"],
                ["--renge-font-size-2xl",  "base × φ³",      "~67.8px"],
                ["--renge-font-size-3xl",  "base × φ⁴",      "~109.7px"],
                ["--renge-font-size-4xl",  "base × φ⁵",      "~177.4px"],
              ] as [string, string, string][]).map(([tok, formula, val]) => (
                <tr key={tok}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{tok}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{formula}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">Radius tokens — --renge-radius-{"{step}"}</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Steps 1–5 follow Fibonacci × baseUnit. <code>full</code> = 9999px pill.
        </Text>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["Token", "Default"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["--renge-radius-none", "0px"],
                ["--renge-radius-1",    "4px  (Fib 1 × 4)"],
                ["--renge-radius-2",    "8px  (Fib 2 × 4)"],
                ["--renge-radius-3",    "12px (Fib 3 × 4)"],
                ["--renge-radius-4",    "20px (Fib 5 × 4)"],
                ["--renge-radius-5",    "32px (Fib 8 × 4)"],
                ["--renge-radius-full", "9999px — pill"],
              ] as [string, string][]).map(([tok, val]) => (
                <tr key={tok}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{tok}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">Layout tokens</Heading>
        <Text as="p" color="fg-subtle" style={{ margin: 0 }}>
          Container widths, responsive column min-widths, and aspect ratios — all derived from φ and Fibonacci.
        </Text>
        <Code>{`rengeVars.container.sm   // "var(--renge-container-sm)"   → 524px  (200 × φ²)
rengeVars.container.md   // "var(--renge-container-md)"   → 847px  (200 × φ³)
rengeVars.container.lg   // "var(--renge-container-lg)"   → 1371px (200 × φ⁴) ← default
rengeVars.container.xl   // "var(--renge-container-xl)"   → 2218px (200 × φ⁵)
rengeVars.container.full // "var(--renge-container-full)" → 100%

rengeVars.colMin.xs   // "var(--renge-col-min-xs)" → 168px (Fib 21 × 8)
rengeVars.colMin.sm   // "var(--renge-col-min-sm)" → 272px (Fib 34 × 8)
rengeVars.colMin.md   // "var(--renge-col-min-md)" → 440px (Fib 55 × 8)
rengeVars.colMin.lg   // "var(--renge-col-min-lg)" → 712px (Fib 89 × 8)

rengeVars.aspect.square   // "var(--renge-aspect-square)"   → 1
rengeVars.aspect.golden   // "var(--renge-aspect-golden)"   → 1.618034 (φ)
rengeVars.aspect.vertical // "var(--renge-aspect-vertical)" → 0.618034 (1/φ)
rengeVars.aspect.video    // "var(--renge-aspect-video)"    → 1.777778 (16/9)
rengeVars.aspect.classic  // "var(--renge-aspect-classic)"  → 1.333333 (4/3)`}</Code>
      </Stack>

      <Stack gap="3">
        <Heading level={3} size="lg">All 22 semantic color tokens</Heading>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["rengeVars key", "CSS variable", "Role"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["color.bg",            "--renge-color-bg",             "Page background"],
                ["color.bgSubtle",      "--renge-color-bg-subtle",      "Slightly elevated surface"],
                ["color.bgMuted",       "--renge-color-bg-muted",       "Muted surface"],
                ["color.bgInverse",     "--renge-color-bg-inverse",     "Inverted background"],
                ["color.fg",            "--renge-color-fg",             "Primary text"],
                ["color.fgSubtle",      "--renge-color-fg-subtle",      "Secondary text"],
                ["color.fgMuted",       "--renge-color-fg-muted",       "Placeholder / disabled"],
                ["color.fgInverse",     "--renge-color-fg-inverse",     "Text on inverse bg"],
                ["color.border",        "--renge-color-border",         "Default divider"],
                ["color.borderSubtle",  "--renge-color-border-subtle",  "Hairline divider"],
                ["color.borderFocus",   "--renge-color-border-focus",   "Keyboard focus ring"],
                ["color.accent",        "--renge-color-accent",         "Primary interactive"],
                ["color.accentHover",   "--renge-color-accent-hover",   "Hover state"],
                ["color.accentSubtle",  "--renge-color-accent-subtle",  "Tinted background"],
                ["color.success",       "--renge-color-success",        "Positive outcome"],
                ["color.successSubtle", "--renge-color-success-subtle", "Success tint bg"],
                ["color.warning",       "--renge-color-warning",        "Caution"],
                ["color.warningSubtle", "--renge-color-warning-subtle", "Warning tint bg"],
                ["color.danger",        "--renge-color-danger",         "Error / destructive"],
                ["color.dangerSubtle",  "--renge-color-danger-subtle",  "Danger tint bg"],
                ["color.info",          "--renge-color-info",           "Informational"],
                ["color.infoSubtle",    "--renge-color-info-subtle",    "Info tint bg"],
              ] as [string, string, string][]).map(([key, cssVar, role]) => (
                <tr key={key}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{key}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{cssVar}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>
    </ComponentSection>
  );
}
