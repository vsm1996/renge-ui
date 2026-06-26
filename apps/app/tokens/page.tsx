"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { CodeBlock, DocSection, UtilityTable } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";

export default function TokensPage() {
  const isMobile = useBreakpoint();
  const PHI = 1.618033988749895;

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
            @renge-ui/tokens
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
            The proportions made programmable.
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
            15+ token categories derived from natural mathematics. CSS custom properties, JavaScript objects, Tailwind preset, and framework adapters. Zero dependencies. WCAG 2.1 AA certified.
          </p>
          <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
            <CodeBlock code={`pnpm add @renge-ui/tokens`} />
            <Badge variant="neutral">v2.5.0</Badge>
            <Badge variant="neutral">WCAG 2.1 AA</Badge>
          </Stack>
        </header>

        {/* Installation */}
        <DocSection
          id="installation"
          label="Getting Started"
          title="Three ways to consume."
          description="Tokens are available as CSS custom properties, JavaScript objects, or Tailwind utilities. Pick the interface that fits your workflow."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
            {/* CSS */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                CSS Custom Properties
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Import the stylesheet. Every token becomes a CSS variable ready to use.
              </p>
              <CodeBlock code={`import '@renge-ui/tokens/renge.css';

/* In your CSS */
.card {
  padding: var(--renge-space-4);
  border-radius: var(--renge-radius-2);
  background: var(--renge-color-bg-subtle);
  border: 1px solid var(--renge-color-border);
}`} />
            </div>

            {/* JavaScript */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                JavaScript / TypeScript
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Fully typed token objects for programmatic access.
              </p>
              <CodeBlock code={`import { rengeVars } from '@renge-ui/tokens';

const cardStyles = {
  padding: rengeVars.space[4],
  borderRadius: rengeVars.radius[2],
  background: rengeVars.color.bgSubtle,
  border: \`1px solid \${rengeVars.color.border}\`,
};`} />
            </div>

            {/* Tailwind */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Tailwind CSS
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Plugin automatically registers all tokens as utilities.
              </p>
              <CodeBlock code={`/* globals.css */
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";

<!-- HTML -->
<div class="p-renge-4 rounded-renge-2 bg-renge-bg-subtle border border-renge-border">
  Fully proportional design, zero hardcoding.
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Token Categories */}
        <DocSection
          id="categories"
          label="Token System"
          title="15+ categories. All derived."
          description="Every token is rooted in natural mathematics or WCAG compliance."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-8)" }}>
            {/* Spacing */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Spacing — Fibonacci × 4px
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Each step is a Fibonacci number × base unit (4px). 11 values from 4px to 220px.
              </p>
              <UtilityTable rows={[
                ["--renge-space-1", "4px", "1 × 4"],
                ["--renge-space-2", "8px", "2 × 4"],
                ["--renge-space-3", "12px", "3 × 4"],
                ["--renge-space-4", "20px", "5 × 4"],
                ["--renge-space-5", "32px", "8 × 4"],
                ["--renge-space-6", "52px", "13 × 4"],
                ["--renge-space-7", "84px", "21 × 4"],
                ["--renge-space-8", "136px", "34 × 4"],
              ]} />
            </div>

            {/* Typography */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Typography — φ Ratio Scale
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Each size is exactly {PHI.toFixed(3)} times the previous. 8 sizes from 10px to 177px.
              </p>
              <UtilityTable rows={[
                ["--renge-font-size-xs", "10px", "base × φ⁻⁰·⁵"],
                ["--renge-font-size-sm", "13px", "base × φ⁻⁰·²⁵"],
                ["--renge-font-size-base", "16px", "base"],
                ["--renge-font-size-lg", "26px", "base × φ"],
                ["--renge-font-size-xl", "42px", "base × φ²"],
                ["--renge-font-size-2xl", "68px", "base × φ³"],
              ]} />
            </div>

            {/* Color Profiles */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Color Profiles — 6 Worlds
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Six complete color systems, each WCAG 2.1 AA certified. Set via <code style={{ fontFamily: "var(--font-mono, monospace)" }}>data-profile</code> on <code style={{ fontFamily: "var(--font-mono, monospace)" }}>&lt;html&gt;</code>.
              </p>
              <UtilityTable rows={[
                ["ocean", "Cool periwinkle—white sky to deep indigo", "data-profile=\"ocean\""],
                ["earth", "Warm parchment—cream to deep soil", "data-profile=\"earth\""],
                ["twilight", "Dusk transition—soft periwinkle to inky indigo", "data-profile=\"twilight\""],
                ["fire", "Warm embers—soft cream to deep red-brown", "data-profile=\"fire\""],
                ["void", "Deep space—cool near-black to deep navy", "data-profile=\"void\""],
                ["leaf", "Natural green—light sage to forest green", "data-profile=\"leaf\""],
              ]} />
            </div>

            {/* Z-Index */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Z-Index — Stacking Context
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Semantic stacking levels prevent z-index wars.
              </p>
              <UtilityTable rows={[
                ["--renge-z-dropdown", "100", "Select, datalist, popover"],
                ["--renge-z-sticky", "200", "Sticky headers, scroll-fix"],
                ["--renge-z-fixed", "300", "Fixed nav, sidebars"],
                ["--renge-z-modal", "400", "Modal backdrop + dialog"],
                ["--renge-z-toast", "500", "Toast notifications"],
              ]} />
            </div>

            {/* Motion */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Motion — Duration & Easing
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                5 duration tiers (100ms–400ms) and 15 easing curves derived from φ (0.382, 0.618).
              </p>
              <CodeBlock code={`/* Durations */
--renge-duration-1: 100ms  /* snappy */
--renge-duration-2: 150ms  /* quick */
--renge-duration-3: 250ms  /* balanced */
--renge-duration-4: 350ms  /* deliberate */
--renge-duration-5: 400ms  /* languorous */

/* 15 easing curves: ease-out, ease-in, ease-in-out, spring, bounce, etc. */
--renge-easing-ease-out: cubic-bezier(0.382, 1, 0.618, 1)`} />
            </div>

            {/* Other Categories */}
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Other Categories
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Border radius, line height, shadow/elevation, dimensions (width/height), and more.
              </p>
              <Stack gap="2" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)" }}>
                <div>• <strong>Radius:</strong> 5 values (1px–9999px) for cards, buttons, inputs</div>
                <div>• <strong>Shadows:</strong> 10 elevation layers with WCAG-compliant opacity</div>
                <div>• <strong>Dimensions:</strong> Width, height, min/max constraints (Fibonacci-based)</div>
                <div>• <strong>Line Height:</strong> 4 values (1.2–1.8) for readability</div>
                <div>• <strong>Container:</strong> 5 max-width breakpoints (φ⁴ progression)</div>
              </Stack>
            </div>
          </div>
        </DocSection>

        {/* Framework Integration */}
        <DocSection
          id="frameworks"
          label="Integration"
          title="Works everywhere."
          description="Tokens integrate with React, Vue, Svelte, or vanilla JavaScript."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                React
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Use <code style={{ fontFamily: "var(--font-mono, monospace)" }}>useRengeTheme()</code> hook or <code style={{ fontFamily: "var(--font-mono, monospace)" }}>RengeProvider</code> wrapper for dynamic theme switching.
              </p>
              <CodeBlock code={`import { RengeProvider, useRengeTheme } from '@renge-ui/react';

function App() {
  return (
    <RengeProvider config={{ profile: 'ocean' }}>
      <ThemeSwitcher />
    </RengeProvider>
  );
}

function ThemeSwitcher() {
  const { profile, switchProfile } = useRengeTheme();
  return (
    <button onClick={() => switchProfile('twilight')}>
      Switch to Twilight
    </button>
  );
}`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Vue 3
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Access profile/mode via <code style={{ fontFamily: "var(--font-mono, monospace)" }}>useRengeTheme()</code> composable.
              </p>
              <CodeBlock code={`import { useRengeTheme } from '@renge-ui/vue';

export default {
  setup() {
    const { profile, mode, switchProfile } = useRengeTheme();

    return { profile, mode, switchProfile };
  }
};`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Svelte
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Reactive stores for theme management.
              </p>
              <CodeBlock code={`import { profile, mode, switchProfile } from '@renge-ui/svelte';

<button on:click={() => switchProfile('earth')}>
  Switch to Earth (currently: {$profile})
</button>`} />
            </div>
          </Stack>
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
              ✨ WCAG 2.1 Level AA Certified
            </Heading>
            <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
              All color tokens meet 4.5:1 contrast ratio on light backgrounds. All breakpoints and spacing values verified for touch target accessibility (44×44px minimum). See the <a href="/system#accessibility" style={{ color: "var(--renge-color-accent)", textDecoration: "none" }}>Accessibility</a> reference for full compliance details.
            </Text>
          </Stack>
        </div>
      </div>
    </ProfileProvider>
  );
}
