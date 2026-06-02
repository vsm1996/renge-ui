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
