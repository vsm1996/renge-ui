"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { CodeBlock, DocSection, UtilityTable } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { TokensSidebar } from "./Sidebar";

export default function TokensPage() {
  const isMobile = useBreakpoint();
  const PHI = 1.618033988749895;

  return (
    <ProfileProvider>
      <Nav />
      <div style={{
        maxWidth: 1260,
        margin: "0 auto",
        padding: `calc(52px + var(--renge-space-8)) ${isMobile ? "var(--renge-space-4)" : "var(--renge-space-5)"} var(--renge-space-9)`,
        display: "flex",
        gap: "var(--renge-space-8)",
        alignItems: "flex-start",
        overflowX: "clip",
      }}>

        {!isMobile && <TokensSidebar />}

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "var(--renge-space-9)" }}>

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

        {/* Spacing */}
        <DocSection
          id="spacing"
          label="Spacing"
          title="Fibonacci × 4px"
          description="Each spacing step is a Fibonacci number multiplied by 4px (the base unit). 11 values from 4px to 220px create a naturally proportional scale."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 400, margin: "0 0 var(--renge-space-3) 0" }}>All spacing values</h3>
              <UtilityTable rows={[
                ["--renge-space-1", "4px", "1 × 4px"],
                ["--renge-space-2", "8px", "2 × 4px"],
                ["--renge-space-3", "12px", "3 × 4px"],
                ["--renge-space-4", "20px", "5 × 4px"],
                ["--renge-space-5", "32px", "8 × 4px"],
                ["--renge-space-6", "52px", "13 × 4px"],
                ["--renge-space-7", "84px", "21 × 4px"],
                ["--renge-space-8", "136px", "34 × 4px"],
                ["--renge-space-9", "220px", "55 × 4px"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`/* Padding — all directions or individual sides */
.box {
  padding: var(--renge-space-4);           /* 20px all sides */
  padding-left: var(--renge-space-5);      /* 32px left only */
}

/* Margin */
.card {
  margin: var(--renge-space-3);
  margin-bottom: var(--renge-space-6);    /* Increased bottom gap */
}

/* Gap in flexbox/grid */
.grid {
  display: grid;
  gap: var(--renge-space-5);              /* 32px between all items */
  grid-template-columns: repeat(3, 1fr);
}

/* Tailwind: prefix token names with p-, m-, gap-, etc. */
<div class="p-renge-4 m-renge-3 gap-renge-5">...</div>`} />
            </div>
            <div style={{
              padding: "var(--renge-space-4)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              border: "1px solid var(--renge-color-border-subtle)",
            }}>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>
                <strong>Tip:</strong> Use consistent spacing values to build visual rhythm. The Fibonacci scale naturally creates a sense of balance. If you need something between space-4 (20px) and space-5 (32px), consider the intended visual weight — often space-4 is sufficient.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Typography */}
        <DocSection
          id="typography"
          label="Typography"
          title="PHI ratio scale"
          description="Eight font sizes derived from the golden ratio. Each size is exactly {PHI.toFixed(4)} times the previous, creating a proportionally harmonious hierarchy."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 400, margin: "0 0 var(--renge-space-3) 0" }}>Font sizes (base 16px)</h3>
              <UtilityTable rows={[
                ["--renge-font-size-xs", "10px", "16 × φ⁻⁰·⁵ ≈ 10px"],
                ["--renge-font-size-sm", "13px", "16 × φ⁻⁰·²⁵ ≈ 13px"],
                ["--renge-font-size-base", "16px", "base (1.0)"],
                ["--renge-font-size-lg", "26px", "16 × φ ≈ 26px"],
                ["--renge-font-size-xl", "42px", "16 × φ² ≈ 42px"],
                ["--renge-font-size-2xl", "68px", "16 × φ³ ≈ 68px"],
                ["--renge-font-size-3xl", "110px", "16 × φ⁴ ≈ 110px"],
                ["--renge-font-size-4xl", "177px", "16 × φ⁵ ≈ 177px"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Line height scale</h4>
              <UtilityTable rows={[
                ["--renge-line-height-xs", "1.2", "Tight, for labels and captions"],
                ["--renge-line-height-sm", "1.4", "Compact, for small text"],
                ["--renge-line-height-base", "1.6", "Standard, for body text"],
                ["--renge-line-height-lg", "1.8", "Generous, for long-form content"],
                ["--renge-line-height-xl", "2.0", "Spacious, for visual comfort"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Letter spacing</h4>
              <UtilityTable rows={[
                ["--renge-letter-spacing-tight", "-0.02em", "Headings, display text"],
                ["--renge-letter-spacing-normal", "0em", "Body text (default)"],
                ["--renge-letter-spacing-wide", "0.05em", "Small caps, emphasis"],
                ["--renge-letter-spacing-ultra", "0.2em", "Labels, all-caps UI text"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`/* Display heading */
h1 {
  font-size: var(--renge-font-size-3xl);      /* 110px */
  line-height: var(--renge-line-height-xs);   /* 1.2 tight */
  letter-spacing: var(--renge-letter-spacing-tight);
}

/* Body text */
p {
  font-size: var(--renge-font-size-base);     /* 16px */
  line-height: var(--renge-line-height-base); /* 1.6 */
}

/* Label or caption */
.label {
  font-size: var(--renge-font-size-sm);       /* 13px */
  text-transform: uppercase;
  letter-spacing: var(--renge-letter-spacing-ultra);
}

/* Tailwind: text-renge-xs, text-renge-sm, leading-renge-base, tracking-renge-wide */
<h1 class="text-renge-3xl leading-renge-xs">Heading</h1>
<p class="text-renge-base leading-renge-base">Paragraph</p>`} />
            </div>
            <div style={{
              padding: "var(--renge-space-4)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              border: "1px solid var(--renge-color-border-subtle)",
            }}>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>
                <strong>Pro tip:</strong> Combine font-size with matching line-height for visual harmony. The progression from xs to 4xl maintains consistent visual weight relative to line length. Never use line-height alone; always pair with appropriate font-size.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Color Profiles */}
        <DocSection
          id="colors"
          label="Color Profiles"
          title="Six complete worlds"
          description="Six color systems, each with light and dark variants, all WCAG 2.1 AA certified. Switch profiles at runtime with no rebuild required."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 400, margin: "0 0 var(--renge-space-3) 0" }}>Available profiles</h3>
              <UtilityTable rows={[
                ["ocean", "Cool periwinkle to deep indigo", "data-profile=\"ocean\""],
                ["earth", "Warm parchment to deep soil", "data-profile=\"earth\""],
                ["twilight", "Soft periwinkle to inky indigo", "data-profile=\"twilight\""],
                ["fire", "Soft cream to deep red-brown", "data-profile=\"fire\""],
                ["void", "Cool near-black to deep navy", "data-profile=\"void\""],
                ["leaf", "Light sage to forest green", "data-profile=\"leaf\""],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Semantic color tokens</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                All colors are semantic — they adapt to the active profile and dark mode automatically.
              </p>
              <UtilityTable rows={[
                ["--renge-color-bg", "Document background", "Adapts to profile + mode"],
                ["--renge-color-bg-subtle", "Subtle background layer", "Slightly elevated from bg"],
                ["--renge-color-bg-muted", "Muted background", "Further elevated"],
                ["--renge-color-fg", "Foreground (text)", "Primary text color"],
                ["--renge-color-fg-subtle", "Subtle foreground", "Secondary text"],
                ["--renge-color-fg-muted", "Muted foreground", "Tertiary text"],
                ["--renge-color-accent", "Primary accent", "CTA, highlights"],
                ["--renge-color-accent-hover", "Hover state accent", "Darkened accent"],
                ["--renge-color-border", "Border color", "Default border"],
                ["--renge-color-border-subtle", "Subtle border", "Minimal emphasis"],
                ["--renge-color-border-focus", "Focus ring color", "Keyboard focus"],
                ["--renge-color-success", "Success status", "WCAG AA compliant"],
                ["--renge-color-warning", "Warning status", "WCAG AA compliant"],
                ["--renge-color-danger", "Danger/error status", "WCAG AA compliant"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`<!-- HTML: Set profile on root element -->
<html data-profile="ocean" data-mode="light">
  ...
</html>

/* All colors reference the active profile */
.card {
  background: var(--renge-color-bg-subtle);
  border: 1px solid var(--renge-color-border-subtle);
  color: var(--renge-color-fg);
}

.button {
  background: var(--renge-color-accent);
  color: var(--renge-color-fg-inverse);
}

.button:hover {
  background: var(--renge-color-accent-hover);
}

/* Switch profiles at runtime (no rebuild) */
<script>
  document.documentElement.dataset.profile = "twilight";
  document.documentElement.dataset.mode = "dark";
</script>

/* Tailwind: bg-renge-bg, text-renge-fg, border-renge-border, etc. */
<div class="bg-renge-bg-subtle border border-renge-border-subtle p-renge-4">
  <p class="text-renge-fg">Content</p>
  <button class="bg-renge-accent text-renge-fg-inverse">Action</button>
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Border Radius */}
        <DocSection
          id="radius"
          label="Border Radius"
          title="Fibonacci scale"
          description="Five radius values (plus full pill radius) derived from Fibonacci × base unit. Used for cards, buttons, inputs, and other rounded elements."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <UtilityTable rows={[
                ["--renge-radius-0", "0px", "Sharp corners"],
                ["--renge-radius-1", "4px", "Subtle rounding (1 × 4)"],
                ["--renge-radius-2", "8px", "Buttons, inputs (2 × 4)"],
                ["--renge-radius-3", "12px", "Cards, surfaces (3 × 4)"],
                ["--renge-radius-4", "20px", "Large surfaces (5 × 4)"],
                ["--renge-radius-5", "32px", "XL surfaces (8 × 4)"],
                ["--renge-radius-full", "9999px", "Pill shape, circles"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`/* Button: subtle rounding */
button {
  border-radius: var(--renge-radius-2);  /* 8px */
}

/* Card: more prominent rounding */
.card {
  border-radius: var(--renge-radius-3);  /* 12px */
}

/* Badge or pill */
.badge {
  border-radius: var(--renge-radius-full);
}

/* Avatar circle */
img {
  border-radius: 50%;  /* or var(--renge-radius-full) for square images */
}

/* Tailwind: rounded-renge-1, rounded-renge-2, rounded-renge-full */
<button class="rounded-renge-2">Button</button>
<div class="rounded-renge-3">Card</div>
<div class="rounded-renge-full">Pill</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Z-Index */}
        <DocSection
          id="zindex"
          label="Z-Index"
          title="Stacking context"
          description="Semantic z-index values that prevent stacking conflicts. Each tier is for a specific UI layer."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <UtilityTable rows={[
                ["--renge-z-dropdown", "100", "Select, datalist, popover"],
                ["--renge-z-sticky", "200", "Sticky headers, scroll-fix elements"],
                ["--renge-z-fixed", "300", "Fixed nav, sidebars"],
                ["--renge-z-modal", "400", "Modal backdrop + dialog"],
                ["--renge-z-toast", "500", "Toast notifications (topmost)"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`/* Dropdown menu */
.dropdown {
  position: absolute;
  z-index: var(--renge-z-dropdown);  /* 100 */
}

/* Sticky navbar */
nav {
  position: sticky;
  z-index: var(--renge-z-sticky);    /* 200 */
}

/* Fixed sidebar */
aside {
  position: fixed;
  z-index: var(--renge-z-fixed);     /* 300 */
}

/* Modal backdrop */
.modal-backdrop {
  z-index: var(--renge-z-modal);     /* 400 */
}

.modal-dialog {
  z-index: calc(var(--renge-z-modal) + 1);  /* 401 */
}

/* Toast notification */
.toast {
  position: fixed;
  z-index: var(--renge-z-toast);     /* 500 */
}`} />
            </div>
          </div>
        </DocSection>

        {/* Motion */}
        <DocSection
          id="motion"
          label="Motion"
          title="Duration and easing"
          description="Fibonacci-based durations (100–5500ms) and 10+ easing curves. Create consistent, natural-feeling animations."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Duration scale (Fibonacci × 100ms)</h4>
              <UtilityTable rows={[
                ["--renge-duration-1", "100ms", "Snappy microinteractions"],
                ["--renge-duration-2", "100ms", "Quick feedback"],
                ["--renge-duration-3", "200ms", "Standard transitions"],
                ["--renge-duration-4", "300ms", "Deliberate animations"],
                ["--renge-duration-5", "500ms", "Slower, layered effects"],
                ["--renge-duration-6", "800ms", "Extended motion"],
                ["--renge-duration-7", "1300ms", "Long sequences"],
                ["--renge-duration-8", "2100ms", "Extended sequences"],
                ["--renge-duration-9", "3400ms", "Very long motion"],
                ["--renge-duration-10", "5500ms", "Languorous effects"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Easing curves</h4>
              <UtilityTable rows={[
                ["--renge-easing-linear", "linear", "No acceleration"],
                ["--renge-easing-ease-in", "cubic-bezier(0.618, 0, 1, 1)", "Slow start"],
                ["--renge-easing-ease-out", "cubic-bezier(0, 0, 0.382, 1)", "Slow end"],
                ["--renge-easing-ease-in-out", "cubic-bezier(0.618, 0, 0.382, 1)", "Both"],
                ["--renge-easing-spring", "cubic-bezier(0.34, 1.56, 0.64, 1)", "Springy overshoot"],
                ["--renge-easing-bounce", "cubic-bezier(0.68, -0.55, 0.265, 1.55)", "Bouncy"],
                ["--renge-easing-back-in", "cubic-bezier(0.6, -0.28, 0.735, 0.045)", "Pull back entrance"],
                ["--renge-easing-back-out", "cubic-bezier(0.175, 0.885, 0.32, 1.275)", "Pull back exit"],
                ["--renge-easing-elastic-in", "cubic-bezier(0.68, -0.55, 0.265, 1.55)", "Elastic entrance"],
                ["--renge-easing-elastic-out", "cubic-bezier(0.68, -0.55, 0.265, 1.55)", "Elastic exit"],
              ]} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Usage example</h4>
              <CodeBlock code={`/* Button hover — quick and snappy */
button {
  transition: background-color var(--renge-duration-2) var(--renge-easing-ease-out);
}

/* Smooth color transition */
.card {
  transition: all var(--renge-duration-3) var(--renge-easing-ease-in-out);
}

/* Animated entrance */
.modal {
  animation: slideIn var(--renge-duration-4) var(--renge-easing-ease-out);
}

/* Springy, playful interaction */
.button:active {
  animation: bounce var(--renge-duration-3) var(--renge-easing-spring);
}

/* Tailwind: duration-renge-2, ease-renge-ease-out, etc. */
<button class="transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-accent">
  Hover me
</button>`} />
            </div>
          </div>
        </DocSection>

        {/* Other Categories */}
        <DocSection
          id="other"
          label="Other Categories"
          title="Complete reference"
          description="Additional token categories for shadows, dimensions, and layout constraints."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Shadows & Elevation</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                10 elevation levels with WCAG-compliant opacity. Higher values create stronger depth perception.
              </p>
              <CodeBlock code={`/* 10 shadow levels */
--renge-shadow-1: 0 1px 2px rgba(0,0,0,0.05);
--renge-shadow-2: 0 2px 4px rgba(0,0,0,0.08);
/* ... through ... */
--renge-shadow-10: 0 20px 25px rgba(0,0,0,0.2);

/* Usage */
.elevated {
  box-shadow: var(--renge-shadow-5);
}

.card {
  box-shadow: var(--renge-shadow-3);
}

.modal-backdrop {
  box-shadow: var(--renge-shadow-8);
}`} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Dimensions (Width & Height)</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                Fixed sizes for common UI elements. Fibonacci-based progression.
              </p>
              <CodeBlock code={`/* Avatar size */
--renge-size-avatar-sm: 24px;
--renge-size-avatar: 32px;
--renge-size-avatar-lg: 52px;

/* Icon sizes */
--renge-size-icon-sm: 16px;
--renge-size-icon: 20px;
--renge-size-icon-lg: 24px;

/* Usage */
.avatar {
  width: var(--renge-size-avatar);
  height: var(--renge-size-avatar);
}

img.icon {
  width: var(--renge-size-icon);
}`} />
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Container (Max-width breakpoints)</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                5 max-width values for responsive containers. Derived from φ⁴ progression.
              </p>
              <UtilityTable rows={[
                ["--renge-container-sm", "524px", "φ² × 200"],
                ["--renge-container-md", "847px", "φ³ × 200"],
                ["--renge-container-lg", "1371px", "φ⁴ × 200"],
                ["--renge-container-xl", "2218px", "φ⁵ × 200"],
              ]} />
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

        {/* Footer nav */}
        <footer style={{ paddingTop: "var(--renge-space-6)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", gap: "var(--renge-space-4)", flexWrap: "wrap" }}>
          <a href="/" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >← Home</a>
          <a href="/components" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >Components →</a>
          <a href="/tailwind" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >Tailwind →</a>
        </footer>

        </main>
      </div>
    </ProfileProvider>
  );
}
