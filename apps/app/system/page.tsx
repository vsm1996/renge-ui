"use client";

import { useState } from "react";
import { useBreakpoint } from "@/lib/useBreakpoint";
import {
  Stack, Text, Heading, Card, Badge,
  Button, Input, FormField, Progress, Divider, Grid, Stat,
} from "@renge-ui/react";
import { PropRow, PropsTable, Demo, Code, Callout, ComponentSection } from "@/components/ui/DocPrimitives";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";

function TokensDocs() {
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

// ============================================================================
// Animations
// ============================================================================

function AnimationsDocs() {
  return (
    <ComponentSection id="animations" title="Animations" description="15 named animations derived from the token system. Apply via the animation prop on any component, or directly via the CSS variable.">
      <Demo label="All 15 tokens">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "var(--renge-space-3)", width: "100%" }}>
          {[
            "vortex-reveal", "helix-rise", "sacred-fade", "spiral-in",
            "morph-fade-in", "bloom", "pulse", "vibrate",
            "wave", "breathe", "fall", "float",
            "float-wave", "pulse-color-shift", "swelling",
          ].map(name => (
            <div key={name} style={{ padding: "var(--renge-space-2) var(--renge-space-3)", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)", background: "var(--renge-color-bg)" }}>
              <Text size="sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>{name}</Text>
            </div>
          ))}
        </div>
      </Demo>
      <Demo label="Live examples">
        <Heading level={3} animation="breathe">breathe</Heading>
        <Text size="lg" animation="float">float</Text>
        <span style={{ animation: "var(--renge-animation-pulse)" }}><Badge variant="accent">pulse</Badge></span>
        <Card variant="outlined" padding="3" animation="bloom">
          <Text size="sm">bloom</Text>
        </Card>
      </Demo>
      <Code>{`{/* animation prop — available on Heading, Text, Card, Section, Badge, and more */}
<Heading level={2} animation="breathe">Living proportion.</Heading>
<Badge variant="accent" animation="pulse">New</Badge>
<Card animation="bloom"><Text>Enters with bloom.</Text></Card>

{/* Via CSS variable — works on any element */}
<div style={{ animation: "var(--renge-animation-float)" }}>
  Floats gently.
</div>

{/* Duration tokens govern speed — Fibonacci × 100ms */}
/* breathe → var(--renge-duration-10) = 8900ms  (slow, organic) */
/* vibrate → var(--renge-duration-6)  = 1300ms  (quick, alert)  */`}</Code>
      <Callout>
        All 15 <code>@keyframes</code> blocks and their <code>--renge-animation-*</code> CSS variables are generated by <code>createRengeTheme()</code> — no separate import needed. Durations reference <code>--renge-duration-*</code> tokens derived from Fibonacci × 100ms.
      </Callout>

      <Stack gap="3">
        <Heading level={3} size="lg">Duration reference</Heading>
        <div style={{ overflowX: "auto", borderRadius: "var(--renge-radius-2)", border: "1px solid var(--renge-color-border-subtle)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--renge-color-bg-subtle)" }}>
                {["Token", "Value", "Fibonacci derivation"].map(h => (
                  <th key={h} style={{ padding: "var(--renge-space-2) var(--renge-space-4)", textAlign: "left", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ["--renge-duration-1",  "100ms",  "Fib 1 × 100ms"],
                ["--renge-duration-2",  "200ms",  "Fib 2 × 100ms"],
                ["--renge-duration-3",  "300ms",  "Fib 3 × 100ms"],
                ["--renge-duration-4",  "500ms",  "Fib 5 × 100ms"],
                ["--renge-duration-5",  "800ms",  "Fib 8 × 100ms — motion default"],
                ["--renge-duration-6",  "1300ms", "Fib 13 × 100ms"],
                ["--renge-duration-7",  "2100ms", "Fib 21 × 100ms — toast timeout"],
                ["--renge-duration-8",  "3400ms", "Fib 34 × 100ms"],
                ["--renge-duration-9",  "5500ms", "Fib 55 × 100ms — most animations"],
                ["--renge-duration-10", "8900ms", "Fib 89 × 100ms — breathe, bloom"],
              ] as [string, string, string][]).map(([tok, val, note]) => (
                <tr key={tok}>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{tok}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontFamily: "var(--font-mono, monospace)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", borderBottom: "1px solid var(--renge-color-border-subtle)", whiteSpace: "nowrap" }}>{val}</td>
                  <td style={{ padding: "var(--renge-space-2) var(--renge-space-4)", fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Stack>
    </ComponentSection>
  );
}

// ============================================================================
// Patterns
// ============================================================================

function PatternsDocs() {
  return (
    <ComponentSection id="patterns" title="Patterns" description="Common composition patterns using @renge-ui/react components. Every value resolves to a CSS custom property — switch profiles and all colors update instantly.">
      <Demo label="Status card">
        <Card variant="outlined" padding="5" style={{ minWidth: 240 }}>
          <Stack gap="4">
            <Stack direction="horizontal" justify="between" align="center">
              <Heading level={3} size="lg">Build status</Heading>
              <Badge variant="success">Passing</Badge>
            </Stack>
            <Stack gap="2">
              <Stack direction="horizontal" justify="between">
                <Text size="sm" color="fg-subtle">Tests</Text>
                <Text size="sm" weight="medium">114 / 114</Text>
              </Stack>
              <Progress value={100} color="success" size="sm" />
            </Stack>
            <Divider spacing="0" />
            <Text size="sm" color="fg-subtle">Last run 2 minutes ago</Text>
          </Stack>
        </Card>
      </Demo>
      <Demo label="Form with validation">
        <Stack gap="5" style={{ width: "100%", maxWidth: 360 }}>
          <FormField label="Email" htmlFor="pat-email" helperText="Used for login and notifications.">
            <Input id="pat-email" type="email" placeholder="you@example.com" fullWidth />
          </FormField>
          <FormField label="Password" htmlFor="pat-pass" required errorText="Must be at least 12 characters.">
            <Input id="pat-pass" type="password" state="error" placeholder="••••••••••••" fullWidth />
          </FormField>
          <Stack direction="horizontal" gap="3" justify="end">
            <Button variant="ghost" colorScheme="accent">Cancel</Button>
            <Button variant="solid" colorScheme="accent">Save changes</Button>
          </Stack>
        </Stack>
      </Demo>
      <Demo label="Metric grid">
        <Grid columns={3} gap="3" style={{ width: "100%" }}>
          <Card variant="filled" padding="3"><Stat value="φ" label="Scale ratio" /></Card>
          <Card variant="filled" padding="3"><Stat value="89" label="Fibonacci 10" trend="up" trendValue="+34" /></Card>
          <Card variant="filled" padding="3"><Stat value="114" label="Tests" trend="up" trendValue="+9" /></Card>
        </Grid>
      </Demo>
      <Code>{`{/* Every component uses only CSS custom properties */}
{/* Switch profiles and all colors update instantly — no re-render */}
import { createRengeTheme } from "@renge-ui/tokens";

const theme = createRengeTheme({ profile: "twilight" });
// Inject theme.css — all @renge-ui/react components adapt automatically.`}</Code>
      <Callout>
        All 44 components use only <code>var(--renge-*)</code> CSS custom properties. Switch color profiles by swapping the injected theme block — no component state changes required.
      </Callout>
    </ComponentSection>
  );
}

// ============================================================================
// Sidebar
// ============================================================================

const NAV_SECTIONS = [
  { label: "Reference", items: [
    { id: "tokens",     label: "Token API" },
    { id: "animations", label: "Animations" },
    { id: "patterns",   label: "Patterns" },
  ]},
];

function Sidebar({ active }: { active: string }) {
  return (
    <aside style={{ width: 180, flexShrink: 0, position: "sticky", top: "calc(52px + var(--renge-space-4))" }}>
      <div style={{ height: "calc(100vh - 52px - var(--renge-space-4))", overflowY: "auto", display: "flex", flexDirection: "column", gap: "var(--renge-space-5)", paddingBottom: "var(--renge-space-5)" }}>
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, margin: 0, marginBottom: "var(--renge-space-2)" }}>
              {section.label}
            </p>
            <Stack gap="1">
              {section.items.map(item => (
                <a key={item.id} href={`#${item.id}`} style={{
                  display: "block",
                  padding: "var(--renge-space-1) var(--renge-space-3)",
                  borderRadius: "var(--renge-radius-1)",
                  fontSize: "var(--renge-font-size-base)",
                  fontFamily: "var(--font-body)",
                  color: active === item.id ? "var(--renge-color-accent)" : "var(--renge-color-fg-subtle)",
                  background: active === item.id ? "var(--renge-color-accent-subtle)" : "transparent",
                  textDecoration: "none",
                  transition: "all 150ms",
                }}>
                  {item.label}
                </a>
              ))}
            </Stack>
          </div>
        ))}

        <div style={{ paddingTop: "var(--renge-space-4)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", flexDirection: "column", gap: "var(--renge-space-2)" }}>
          <a href="/tailwind" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Tailwind →</a>
          <a href="/components" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", textDecoration: "none" }}>Components →</a>
        </div>
      </div>
    </aside>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function SystemPage() {
  const isMobile = useBreakpoint();

  return (
    <ProfileProvider>
      <Nav />
      <div style={{ maxWidth: 1260, margin: "0 auto", paddingLeft: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingRight: isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)", paddingTop: "calc(52px + var(--renge-space-7))", paddingBottom: "var(--renge-space-8)", display: "flex", gap: "var(--renge-space-8)", alignItems: "flex-start" }}>

        {!isMobile && <Sidebar active="tokens" />}

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>

          <div style={{ paddingBottom: "var(--renge-space-6)", borderBottom: "1px solid var(--renge-color-border-subtle)" }}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0, marginBottom: "var(--renge-space-3)" }}>@renge-ui/tokens</p>
            <Heading level={1} size="3xl" style={{ marginBottom: "var(--renge-space-4)", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>System</Heading>
            <Text as="p" size="lg" color="fg-subtle" style={{ margin: 0, marginBottom: "var(--renge-space-5)", maxWidth: 560 }}>
              Token API reference, animation system, and composition patterns. The mathematical foundation made programmable.
            </Text>
          </div>

          <TokensDocs />
          <AnimationsDocs />
          <PatternsDocs />

        </main>
      </div>
    </ProfileProvider>
  );
}
