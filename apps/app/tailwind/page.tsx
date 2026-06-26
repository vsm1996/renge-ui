"use client";

import { CodeBlock, DocSection, UtilityTable } from "@/components/ui/DocPrimitives";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { StackVisual } from "./components/StackVisual";
import { ContainerVisual } from "./components/ContainerVisual";
import { GridVisual } from "./components/GridVisual";
import { AspectVisual } from "./components/AspectVisual";
import { TailwindSidebar } from "./Sidebar";

export default function TailwindPage() {
  const isMobile = useBreakpoint();

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

        {!isMobile && <TailwindSidebar />}

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
            @renge-ui/tailwind
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
            Tailwind, proportionally.
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
            Renge tokens as Tailwind utilities. One plugin line bakes spacing, color,
            typography, motion, radius, layout, and semantic petals into your stylesheet.
            Profile-reactive. Variant-complete. Proportionally correct.
          </p>
          <CodeBlock code={`pnpm add @renge-ui/tailwind @renge-ui/tokens`} />
        </header>

        {/* Setup */}
        <DocSection
          id="setup"
          label="Installation"
          title="Two minutes to proportional UI."
          description="Add the plugin to globals.css, set data-profile on <html>, and every Renge token becomes a utility class. All variants work: hover:, md:, dark:, focus:, group-hover:, etc."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>1. Install</h4>
              <CodeBlock code={`pnpm add @renge-ui/tailwind @renge-ui/tokens`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>2. Register the plugin</h4>
              <CodeBlock code={`/* globals.css */
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>3. Set the profile</h4>
              <CodeBlock code={`<!-- app.html or layout file -->
<html lang="en" data-profile="ocean" data-mode="light">
  <head>...</head>
  <body>...</body>
</html>

<!-- Optional: Switch profiles at runtime (no rebuild) -->
<script>
  document.documentElement.dataset.profile = "twilight";
  document.documentElement.dataset.mode = "dark";
</script>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Available profiles</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                Each profile is a complete color system with light and dark variants.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "var(--renge-space-3)" }}>
                {[
                  { name: "ocean", hex: "#5B7FB7", label: "Cool periwinkle" },
                  { name: "earth", hex: "#8B6F47", label: "Warm parchment" },
                  { name: "twilight", hex: "#6B5B95", label: "Dusk transition" },
                  { name: "fire", hex: "#C86B47", label: "Warm embers" },
                  { name: "void", hex: "#1A1F3A", label: "Deep space" },
                  { name: "leaf", hex: "#4A7C59", label: "Natural green" },
                ].map(profile => (
                  <div key={profile.name} style={{ textAlign: "center" }}>
                    <div style={{ width: "100%", height: "80px", background: profile.hex, borderRadius: "var(--renge-radius-2)", marginBottom: "var(--renge-space-2)" }} />
                    <p style={{ fontSize: "var(--renge-font-size-sm)", fontWeight: 600, margin: "0 0 var(--renge-space-1) 0", color: "var(--renge-color-fg)" }}>{profile.name}</p>
                    <p style={{ fontSize: "var(--renge-font-size-xs)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>{profile.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: "var(--renge-space-3)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              border: "1px solid var(--renge-color-border-subtle)",
            }}>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", margin: 0, lineHeight: "var(--renge-line-height-base)" }}>
                <strong>Note:</strong> Tailwind v4 plugin is recommended. For v3, use <code style={{ fontFamily: "var(--font-mono, monospace)" }}>@renge-ui/tailwind</code> directly as a preset in tailwind.config.js.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Color Profiles Reference */}
        <DocSection
          id="color-profiles"
          label="Color System"
          title="Six worlds with semantic tokens."
          description="Each profile includes 22 semantic color tokens for backgrounds, text, borders, states, and accents. All WCAG 2.1 AA certified."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Semantic color tokens</h4>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: "0 0 var(--renge-space-3) 0" }}>
                Use semantic colors instead of hardcoding hex values. They automatically adapt to the active profile and dark mode.
              </p>
              <CodeBlock code={`/* Don't use hardcoded colors */
.button {
  background: #5B7FB7;  /* ❌ breaks when profile changes */
}

/* Use semantic tokens instead */
.button {
  background: var(--renge-color-accent);        /* ✅ profile-reactive */
}

/* Tailwind equivalents */
<button class="bg-renge-accent hover:bg-renge-accent-hover text-renge-fg-inverse">
  Action
</button>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>22 semantic color tokens</h4>
              <UtilityTable rows={[
                ["bg-renge-bg", "Document background", "Adapts to profile + mode"],
                ["bg-renge-bg-subtle", "Subtle background layer", "Slightly elevated"],
                ["bg-renge-bg-muted", "Muted background", "Further elevated"],
                ["bg-renge-bg-inverse", "Inverse of primary bg", "For code blocks"],
                ["text-renge-fg", "Primary text color", "High contrast"],
                ["text-renge-fg-subtle", "Secondary text", "Lower contrast"],
                ["text-renge-fg-muted", "Tertiary text", "Minimal contrast"],
                ["text-renge-fg-inverse", "Inverse text", "For dark backgrounds"],
                ["border-renge-border", "Default border color", "Standard dividers"],
                ["border-renge-border-subtle", "Subtle border", "Minimal emphasis"],
                ["border-renge-border-focus", "Focus ring color", "Keyboard navigation"],
                ["bg-renge-accent", "Primary accent", "CTA, highlights"],
                ["bg-renge-accent-hover", "Hover state accent", "Interactive feedback"],
                ["bg-renge-accent-subtle", "Subtle accent background", "Soft highlight"],
                ["text-renge-success", "Success status color", "WCAG AA compliant"],
                ["text-renge-warning", "Warning status color", "WCAG AA compliant"],
                ["text-renge-danger", "Error/danger color", "WCAG AA compliant"],
                ["text-renge-info", "Informational color", "WCAG AA compliant"],
              ]} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 500, margin: "0 0 var(--renge-space-3) 0" }}>Real-world profile usage</h4>
              <CodeBlock code={`<!-- Example: Ocean profile (cool, professional) -->
<html data-profile="ocean">
  <!-- Periwinkle accent, cool neutrals -->
</html>

<!-- Example: Earth profile (warm, natural) -->
<html data-profile="earth">
  <!-- Warm tan accent, earthy neutrals -->
</html>

<!-- Example: Dark mode with Twilight -->
<html data-profile="twilight" data-mode="dark">
  <!-- All colors invert automatically -->
</html>

<!-- Switch profiles dynamically -->
<script>
  function setTheme(profile, mode) {
    document.documentElement.dataset.profile = profile;  // 'ocean', 'earth', 'twilight', etc.
    document.documentElement.dataset.mode = mode;        // 'light' or 'dark'
  }

  setTheme('fire', 'dark');  // Warm embers in dark mode
</script>`} />
            </div>
          </div>
        </DocSection>

        {/* Use Cases */}
        <DocSection
          id="use-cases"
          label="Use cases"
          title="What you can build."
          description="Real-world patterns: cards, forms, navigation, dashboards, modal layouts, and more."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            {/* Card example */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Product card</h4>
              <CodeBlock code={`<div class="petal-card-surfaceComfortable flex-renge-col gap-renge-3">
  <img src="/product.jpg" class="aspect-renge-golden rounded-renge-2 w-full" />
  <div class="flex-renge-col gap-renge-2">
    <h3 class="text-renge-lg leading-renge-lg text-renge-fg">
      Product name
    </h3>
    <p class="text-renge-sm leading-renge-sm text-renge-fg-muted">
      Description and details.
    </p>
    <div class="flex-renge-row justify-between">
      <span class="text-renge-xl text-renge-accent">$99</span>
      <button class="petal-interactive-buttonMedium bg-renge-accent text-renge-bg">
        Add to cart
      </button>
    </div>
  </div>
</div>`} />
            </div>

            {/* Form example */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Contact form</h4>
              <CodeBlock code={`<form class="flex-renge-col gap-renge-5">
  <div class="flex-renge-col gap-renge-2">
    <label class="text-renge-sm text-renge-fg font-semibold">
      Email
    </label>
    <input
      type="email"
      class="petal-composition-textField"
      placeholder="hello@example.com"
    />
  </div>

  <div class="flex-renge-col gap-renge-2">
    <label class="text-renge-sm text-renge-fg font-semibold">
      Message
    </label>
    <textarea
      class="petal-composition-textField min-h-32"
      placeholder="Your message..."
    />
  </div>

  <button
    type="submit"
    class="petal-interactive-buttonMedium bg-renge-accent text-renge-bg hover:bg-renge-accent-hover"
  >
    Send
  </button>
</form>`} />
            </div>

            {/* Navigation example */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Navigation bar</h4>
              <CodeBlock code={`<nav class="flex-renge-row justify-between px-renge-5 py-renge-4 border-b border-renge-border-subtle">
  <a href="/" class="text-renge-lg leading-renge-lg font-semibold text-renge-accent">
    Logo
  </a>

  <div class="stack-h gap-renge-6">
    <a href="/docs" class="text-renge-base text-renge-fg-muted hover:text-renge-fg">
      Docs
    </a>
    <a href="/api" class="text-renge-base text-renge-fg-muted hover:text-renge-fg">
      API
    </a>
    <button class="petal-interactive-buttonMedium bg-renge-accent text-renge-bg">
      Sign in
    </button>
  </div>
</nav>`} />
            </div>

            {/* Grid layout example */}
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Responsive grid</h4>
              <CodeBlock code={`<div class="grid grid-cols-renge-1 md:grid-cols-renge-2 lg:grid-cols-renge-3 gap-renge-5">
  {items.map(item => (
    <div key={item.id} class="petal-card-surfaceComfortable">
      {item.content}
    </div>
  ))}
</div>

<!-- Or responsive auto-fit -->
<div class="grid grid-cols-auto-fit-renge-md gap-renge-4">
  {items.map(item => (
    <div key={item.id} class="petal-card-surfaceMinimal">
      {item.content}
    </div>
  ))}
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Components with Petals */}
        <DocSection
          id="petals"
          label="Semantic petals"
          title="Pre-composed token patterns."
          description="Petals are semantic combinations of tokens — typography, spacing, cards, and interactive patterns. Apply them as single utilities for consistent, maintainable components."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>What are petals?</h4>
              <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: "0 0 var(--renge-space-3) 0" }}>
                Petals bridge individual tokens and full components. Instead of composing fontSize + lineHeight for every heading, use <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>petal-typography-displayLarge</code>. One class applies proven combinations.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>23 petals across 6 categories</h4>
              <CodeBlock code={`<!-- Typography: 8 levels from display to label -->
<h1 class="petal-typography-displayLarge">Hero headline</h1>
<h2 class="petal-typography-headingLarge">Section title</h2>
<h3 class="petal-typography-headingMedium">Subsection</h3>
<h4 class="petal-typography-headingSmall">Sub-subsection</h4>
<p class="petal-typography-bodyLarge">Large paragraph</p>
<p class="petal-typography-bodyRegular">Standard paragraph</p>
<p class="petal-typography-bodySmall">Small body text</p>
<span class="petal-typography-labelXs">UI label, <code>, <small></span>

<!-- Spacing: 4 comfort levels for padding/gap -->
<div class="petal-spacing-generous">Generous padding + gap</div>
<div class="petal-spacing-comfortable">Natural rhythm (default)</div>
<div class="petal-spacing-compact">Tight but breathable</div>
<div class="petal-spacing-condensed">Minimal spacing</div>

<!-- Cards: 4 surface levels with shadow and radius -->
<div class="petal-card-surfaceGenerous">Full featured</div>
<div class="petal-card-surfaceComfortable">Standard (most used)</div>
<div class="petal-card-surfaceCompact">Tight</div>
<div class="petal-card-surfaceMinimal">Subtle</div>

<!-- Interactive: Buttons and focus states -->
<button class="petal-interactive-buttonLarge">Primary action</button>
<button class="petal-interactive-buttonMedium">Standard</button>
<button class="petal-interactive-buttonSmall">Compact</button>
<div class="petal-interactive-focus">Focus ring (copy to any elem)</div>

<!-- Compositions: Pre-styled form elements -->
<input class="petal-composition-textField" placeholder="Text input" />
<span class="petal-composition-badge">Label</span>
<span class="petal-composition-chip">Dismissible ×</span>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Petal reference table</h4>
              <UtilityTable rows={[
                ["petal-typography-displayLarge", "font-size: 110px, line-height: 1.2, tracking: -0.02em", "Hero/title"],
                ["petal-typography-headingLarge", "font-size: 68px, line-height: 1.2", "H2 / section title"],
                ["petal-typography-headingMedium", "font-size: 42px, line-height: 1.4", "H3 / subsection"],
                ["petal-typography-headingSmall", "font-size: 26px, line-height: 1.4", "H4 / emphasis"],
                ["petal-typography-bodyLarge", "font-size: 18px, line-height: 1.6", "Lead paragraph"],
                ["petal-typography-bodyRegular", "font-size: 16px, line-height: 1.6", "Body text (default)"],
                ["petal-typography-bodySmall", "font-size: 14px, line-height: 1.6", "Small body"],
                ["petal-typography-labelXs", "font-size: 12px, line-height: 1.4, uppercase", "Labels, small UI"],
                ["petal-spacing-generous", "p: space-5 (32px), gap: space-4 (20px)", "Spacious UIs"],
                ["petal-spacing-comfortable", "p: space-4 (20px), gap: space-3 (12px)", "Standard rhythm"],
                ["petal-spacing-compact", "p: space-3 (12px), gap: space-2 (8px)", "Dense UIs"],
                ["petal-spacing-condensed", "p: space-2 (8px), gap: space-1 (4px)", "Very tight"],
                ["petal-card-surfaceGenerous", "p: space-5, shadow-5, radius-3", "Featured cards"],
                ["petal-card-surfaceComfortable", "p: space-4, shadow-3, radius-3", "Standard cards"],
                ["petal-card-surfaceCompact", "p: space-3, shadow-2, radius-2", "Compact cards"],
                ["petal-card-surfaceMinimal", "p: space-2, shadow-1, radius-2", "Subtle surfaces"],
                ["petal-interactive-buttonLarge", "p: space-3 space-5, radius-2, transition", "Large CTAs"],
                ["petal-interactive-buttonMedium", "p: space-2 space-4, radius-2, transition", "Standard buttons"],
                ["petal-interactive-buttonSmall", "p: space-1 space-3, radius-2, transition", "Icon/compact"],
                ["petal-interactive-focus", "ring-2, ring-color-border-focus, radius-1", "Keyboard focus"],
                ["petal-composition-textField", "p: space-2 space-3, border, radius-2", "Text inputs"],
                ["petal-composition-badge", "p: space-1 space-2, radius-full, font-size-xs", "Labels"],
                ["petal-composition-chip", "p: space-1 space-2, radius-full, bg-accent-subtle", "Tags/chips"],
              ]} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Building buttons with petals</h4>
              <CodeBlock code={`<!-- Primary button: petal + accent color -->
<button class="petal-interactive-buttonMedium bg-renge-accent text-renge-bg hover:bg-renge-accent-hover focus:ring-2 ring-renge-border-focus">
  Save changes
</button>

<!-- Secondary button: petal + subtle colors -->
<button class="petal-interactive-buttonMedium bg-renge-bg-subtle text-renge-fg hover:bg-renge-bg-muted border border-renge-border">
  Cancel
</button>

<!-- Danger button: petal + danger color -->
<button class="petal-interactive-buttonMedium bg-renge-danger text-renge-bg hover:opacity-90">
  Delete
</button>

<!-- Small compact button -->
<button class="petal-interactive-buttonSmall bg-renge-accent text-renge-bg">
  Add
</button>

<!-- Large, full-width button -->
<button class="petal-interactive-buttonLarge w-full bg-renge-accent text-renge-bg">
  Continue
</button>`} />
            </div>

            <div style={{
              padding: "var(--renge-space-3)",
              background: "var(--renge-color-bg-subtle)",
              borderRadius: "var(--renge-radius-2)",
              border: "1px solid var(--renge-color-border-subtle)",
            }}>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-muted)", fontFamily: "var(--font-body)", margin: 0, lineHeight: "var(--renge-line-height-base)" }}>
                Full petal reference: visit <a href="/petals" style={{ color: "var(--renge-color-accent)", textDecoration: "underline" }}>/petals</a> to explore all 23 petals with visual previews.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Best Practices */}
        <DocSection
          id="best-practices"
          label="Best practices"
          title="Build smarter with proportions."
          description="Patterns and principles for scalable, maintainable Tailwind + Renge interfaces."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Start with petals, extend with utilities</h4>
              <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: "0 0 var(--renge-space-3) 0" }}>
                Petals encode semantic intent. Use <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>petal-typography-bodyRegular</code> for body text, then add <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>text-renge-fg-muted</code> or <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>text-renge-accent</code> for variants. Never guess spacing or type sizes.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Use gap-renge-* for consistent rhythm</h4>
              <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: "0 0 var(--renge-space-3) 0" }}>
                Spacing within components should follow the Fibonacci scale. <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>gap-renge-4</code> inside a card is more consistent than arbitrary pixels. The scale compounds across your interface.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Compose cards from petals</h4>
              <CodeBlock code={`<!-- ❌ Don't hardcode spacing and radius -->
<div class="p-4 rounded-lg shadow-md">...</div>

<!-- ✅ Do use card petals -->
<div class="petal-card-surfaceComfortable">...</div>

<!-- ✅ Mix petals for custom combinations -->
<div class="petal-spacing-comfortable bg-renge-bg-subtle border border-renge-border rounded-renge-3">
  ...
</div>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Profile-aware colors</h4>
              <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: "0 0 var(--renge-space-3) 0" }}>
                Never hardcode colors. Use semantic tokens: <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>text-renge-fg</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>text-renge-fg-muted</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>bg-renge-accent</code>. They adapt to every color profile and dark mode.
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Responsive with golden breakpoints</h4>
              <CodeBlock code={`<!-- md: = 768px, lg: = 1024px, etc. (Fibonacci × base scale) -->
<div class="grid grid-cols-renge-1 md:grid-cols-renge-2 lg:grid-cols-renge-3 gap-renge-5">
  ...
</div>

<!-- Stack to flex-row on larger screens -->
<div class="stack md:stack-h gap-renge-4">
  ...
</div>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Motion and transitions</h4>
              <CodeBlock code={`<!-- Renge durations are Fibonacci × 100ms: 100ms, 100ms, 200ms, 300ms, 500ms... -->
<button class="transition-colors duration-renge-2 ease-renge-ease-out hover:bg-renge-accent">
  Smooth interaction
</button>

<!-- Motion scale: duration-renge-1 through duration-renge-10 -->
<div class="transition-all duration-renge-4 ease-renge-spring">
  Springy animation
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Utility Categories */}
        <DocSection
          id="utilities"
          label="Utility reference"
          title="Complete class reference."
          description="All available utility classes organized by category. Mix and match for infinite combinations."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-5)" }}>
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Spacing (Fibonacci × 4px, steps 0–10)</h4>
              <CodeBlock code={`<!-- Padding: p-, px-, py-, pt-, pr-, pb-, pl- -->
p-renge-0 through p-renge-10
px-renge-*, py-renge-*, pt-renge-*, etc.

<!-- Margin -->
m-renge-*, mx-renge-*, my-renge-*, mt-renge-*, etc.

<!-- Gap (flex/grid) -->
gap-renge-*, gap-x-renge-*, gap-y-renge-*

<!-- Width & Height -->
w-renge-*, h-renge-*, min-w-renge-*, max-w-renge-*, min-h-renge-*

<!-- Values: 0px, 4px, 8px, 12px, 20px, 32px, 52px, 84px, 136px, 220px -->
<div class="p-renge-4 m-renge-3 gap-renge-5">...</div>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Colors (22 semantic tokens)</h4>
              <CodeBlock code={`<!-- Backgrounds -->
bg-renge-bg, bg-renge-bg-subtle, bg-renge-bg-muted, bg-renge-bg-inverse

<!-- Text (foreground) -->
text-renge-fg, text-renge-fg-subtle, text-renge-fg-muted, text-renge-fg-inverse

<!-- Borders -->
border-renge-border, border-renge-border-subtle, border-renge-border-focus

<!-- Accent (primary) -->
bg-renge-accent, bg-renge-accent-hover, bg-renge-accent-subtle

<!-- Status -->
text-renge-success, text-renge-warning, text-renge-danger, text-renge-info

<!-- Focus ring -->
ring-renge-border-focus

<div class="bg-renge-bg text-renge-fg border border-renge-border">
  <button class="bg-renge-accent text-renge-bg hover:bg-renge-accent-hover">
    CTA
  </button>
</div>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Typography (PHI scale)</h4>
              <CodeBlock code={`<!-- Font size: text-renge-xs through text-renge-4xl -->
text-renge-xs   (10px)
text-renge-sm   (13px)
text-renge-base (16px)
text-renge-lg   (26px)
text-renge-xl   (42px)
text-renge-2xl  (68px)
text-renge-3xl  (110px)
text-renge-4xl  (177px)

<!-- Line height -->
leading-renge-xs through leading-renge-4xl

<!-- Font weight (standard Tailwind) -->
font-normal, font-semibold, font-bold

<h1 class="text-renge-3xl leading-renge-xs font-bold">Title</h1>
<p class="text-renge-base leading-renge-base">Body</p>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Radius (Fibonacci × 4px)</h4>
              <CodeBlock code={`<!-- Rounded corners -->
rounded-renge-0 (0px)
rounded-renge-1 (4px)
rounded-renge-2 (8px)
rounded-renge-3 (12px)
rounded-renge-4 (20px)
rounded-renge-5 (32px)
rounded-renge-full (pill)

<!-- Directional -->
rounded-t-renge-*, rounded-r-renge-*, rounded-b-renge-*, rounded-l-renge-*
rounded-tl-renge-*, rounded-tr-renge-*, rounded-br-renge-*, rounded-bl-renge-*

<div class="rounded-renge-2">Card</div>
<div class="rounded-renge-full">Pill</div>`} />
            </div>

            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", fontWeight: 600, margin: "0 0 var(--renge-space-2) 0" }}>Motion (Fibonacci × 100ms, 10 easing curves)</h4>
              <CodeBlock code={`<!-- Duration: duration-renge-1 through duration-renge-10 -->
duration-renge-1   (100ms)
duration-renge-2   (100ms)
duration-renge-3   (200ms)
duration-renge-4   (300ms)
duration-renge-5   (500ms)
/* ... through ... */
duration-renge-10  (5500ms)

<!-- Easing -->
ease-renge-linear, ease-renge-ease-in, ease-renge-ease-out, ease-renge-ease-in-out
ease-renge-spring, ease-renge-bounce, ease-renge-back-in, ease-renge-back-out
ease-renge-elastic-in, ease-renge-elastic-out

<div class="transition-all duration-renge-3 ease-renge-ease-out">
  Smooth animation
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Layout utilities */}
        <DocSection
          id="layout"
          label="Layout"
          title="Layout primitives."
          description="Stack, container, grid, flex, and aspect ratio — each derived from the PHI / Fibonacci foundation. Nothing hardcoded."
        >
          {/* Stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-xl)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>Stack</h3>
            <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0 }}>Direction-only flex containers. Compose with <code style={{ fontFamily: "var(--font-mono, monospace)" }}>gap-renge-*</code> for spacing.</p>
            <StackVisual />
            <CodeBlock code={`<div class="stack gap-renge-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<nav class="stack-h gap-renge-5">
  <a href="/">Home</a>
  <a href="/docs">Docs</a>
</nav>

<!-- Responsive direction -->
<div class="stack md:stack-h gap-renge-4"> ... </div>`} />
            <UtilityTable rows={[
              ["stack",   "—",                      "display: flex; flex-direction: column"],
              ["stack-h", "—",                      "display: flex; flex-direction: row"],
            ]} />
          </div>

          {/* Flex */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-xl)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>Flex</h3>
            <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0 }}>Directional flex with built-in alignment and default gap of space-3 (12px = 3 × Fibonacci base). Override with <code style={{ fontFamily: "var(--font-mono, monospace)" }}>gap-renge-*</code>.</p>
            <CodeBlock code={`<!-- Row: flex row, align-items center, gap space-3 -->
<div class="flex-renge-row">
  <Avatar />
  <span>Renge UI</span>
</div>

<!-- Col: flex column, align-items stretch, gap space-3 -->
<div class="flex-renge-col gap-renge-5">
  <h2>Title</h2>
  <p>Body</p>
</div>`} />
            <UtilityTable rows={[
              ["flex-renge-row", "gap: space-3 (12px)", "display: flex; flex-direction: row; align-items: center; gap: var(--renge-space-3)"],
              ["flex-renge-col", "gap: space-3 (12px)", "display: flex; flex-direction: column; align-items: stretch; gap: var(--renge-space-3)"],
            ]} />
          </div>

          {/* Container */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-xl)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>Container</h3>
            <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0 }}>Centered max-width wrappers. Each tier is exactly φ times the previous — 200px × φⁿ.</p>
            <ContainerVisual />
            <CodeBlock code={`<div class="container-renge-lg">
  <!-- max-width: 1371px · margin: auto -->
</div>

<!-- Compose with padding -->
<div class="container-renge-md px-renge-5 py-renge-7">
  <h1>Comfortable reading width.</h1>
</div>`} />
            <UtilityTable rows={[
              ["container-renge-sm",   "200 × φ² = 524px",  "width: 100%; max-width: 524px; margin: auto"],
              ["container-renge-md",   "200 × φ³ = 847px",  "width: 100%; max-width: 847px; margin: auto"],
              ["container-renge-lg",   "200 × φ⁴ = 1371px", "width: 100%; max-width: 1371px; margin: auto"],
              ["container-renge-xl",   "200 × φ⁵ = 2218px", "width: 100%; max-width: 2218px; margin: auto"],
              ["container-renge-full", "100%",               "width: 100%; max-width: 100%; margin: auto"],
            ]} />
          </div>

          {/* Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-xl)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>Grid</h3>
            <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0 }}>Fixed column counts (base-6 system) and responsive auto-fit/fill grids. Auto-fit/fill min-widths use Fibonacci[6..9] × 8px.</p>
            <GridVisual />
            <CodeBlock code={`<!-- Fixed columns: 2, 3, 4, 6, 12 -->
<div class="grid grid-cols-renge-3 gap-renge-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

<!-- Responsive: collapses when viewport narrows -->
<div class="grid grid-cols-auto-fit-renge-sm gap-renge-4">
  <!-- min column width: 272px (34 × 8px) -->
</div>

<!-- Preserve empty tracks -->
<div class="grid grid-cols-auto-fill-renge-md gap-renge-5">
  <!-- min column width: 440px (55 × 8px) -->
</div>`} />
            <UtilityTable rows={[
              ["grid-cols-renge-2",         "2 equal columns",          "grid-template-columns: repeat(2, minmax(0, 1fr))"],
              ["grid-cols-renge-3",         "3 equal columns",          "grid-template-columns: repeat(3, minmax(0, 1fr))"],
              ["grid-cols-renge-4",         "4 equal columns",          "grid-template-columns: repeat(4, minmax(0, 1fr))"],
              ["grid-cols-renge-6",         "6 equal columns",          "grid-template-columns: repeat(6, minmax(0, 1fr))"],
              ["grid-cols-renge-12",        "12 equal columns",         "grid-template-columns: repeat(12, minmax(0, 1fr))"],
              ["grid-cols-auto-fit-renge-xs", "min 168px (21 × 8)",   "repeat(auto-fit, minmax(168px, 1fr))"],
              ["grid-cols-auto-fit-renge-sm", "min 272px (34 × 8)",   "repeat(auto-fit, minmax(272px, 1fr))"],
              ["grid-cols-auto-fit-renge-md", "min 440px (55 × 8)",   "repeat(auto-fit, minmax(440px, 1fr))"],
              ["grid-cols-auto-fit-renge-lg", "min 712px (89 × 8)",   "repeat(auto-fit, minmax(712px, 1fr))"],
              ["grid-cols-auto-fill-renge-*", "same min-widths",       "repeat(auto-fill, ...) — preserves empty tracks"],
            ]} />
          </div>

          {/* Aspect ratio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-4)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-xl)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>Aspect ratio</h3>
            <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0 }}>PHI-derived ratios. <code style={{ fontFamily: "var(--font-mono, monospace)" }}>golden</code> = φ ≈ 1.618034 (Fibonacci 34:21 approximation). Values are CSS custom properties.</p>
            <AspectVisual />
            <CodeBlock code={`<!-- Golden ratio image -->
<div class="aspect-renge-golden overflow-hidden rounded-renge-3">
  <img src="/hero.jpg" class="w-full h-full object-cover" />
</div>

<!-- Widescreen video embed -->
<div class="aspect-renge-video">
  <iframe class="w-full h-full" src="..." />
</div>

<!-- Portrait card -->
<div class="aspect-renge-vertical bg-renge-bg-subtle rounded-renge-2">
  ...
</div>`} />
            <UtilityTable rows={[
              ["aspect-renge-square",   "1",        "aspect-ratio: var(--renge-aspect-square)   → 1"],
              ["aspect-renge-golden",   "φ ≈ 1.618", "aspect-ratio: var(--renge-aspect-golden)   → 1.618034"],
              ["aspect-renge-vertical", "1/φ ≈ 0.618", "aspect-ratio: var(--renge-aspect-vertical) → 0.618034"],
              ["aspect-renge-video",    "16/9 ≈ 1.778", "aspect-ratio: var(--renge-aspect-video)    → 1.777778"],
              ["aspect-renge-classic",  "4/3 ≈ 1.333", "aspect-ratio: var(--renge-aspect-classic)  → 1.333333"],
            ]} />
          </div>
        </DocSection>

        {/* Token utilities reference */}
        <DocSection
          id="tokens"
          label="Token utilities"
          title="Every token, a utility."
          description="All spacing, color, typography, motion, and radius tokens are available as Tailwind utilities. They reference CSS custom properties — profile changes update all values instantly."
        >
          <CodeBlock code={`<!-- Spacing (Fibonacci × 4px, steps 0–10) -->
<div class="p-renge-4 gap-renge-3 mt-renge-5">
  <!-- p = 20px (Fib 5 × 4), gap = 12px (Fib 3 × 4), mt = 32px (Fib 8 × 4) -->
</div>

<!-- Color (22 semantic tokens, profile-reactive) -->
<div class="bg-renge-bg text-renge-fg border-renge-border">
  <button class="bg-renge-accent hover:bg-renge-accent-hover
                 text-renge-fg-inverse rounded-renge-full">
    Action
  </button>
</div>

<!-- Typography (PHI scale: base × φⁿ) -->
<h1 class="text-renge-3xl leading-renge-3xl">Proportion.</h1>
<p  class="text-renge-base leading-renge-base text-renge-fg-subtle">
  Natural mathematics made visible.
</p>

<!-- Motion (Fibonacci × 100ms durations) -->
<div class="transition-colors duration-renge-2 ease-renge-ease-out">
  <!-- 200ms ease-out -->
</div>

<!-- Radius (Fibonacci × baseUnit) -->
<div class="rounded-renge-3">...</div>     <!-- 12px -->
<div class="rounded-renge-full">...</div>  <!-- pill -->`} />

          <div style={{
            padding: "var(--renge-space-4)",
            background: "var(--renge-color-bg-subtle)",
            borderRadius: "var(--renge-radius-2)",
            border: "1px solid var(--renge-color-border-subtle)",
          }}>
            <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", margin: 0, lineHeight: "var(--renge-line-height-base)" }}>
              All utilities support full Tailwind variant syntax: <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>hover:</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>md:</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>dark:</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>focus:</code>, <code style={{ fontFamily: "var(--font-mono, monospace)", color: "var(--renge-color-accent)" }}>group-hover:</code>, and arbitrary variants. Values are CSS custom properties — switch a color profile at runtime and every token updates without a rebuild or re-render.
            </p>
          </div>
        </DocSection>

        {/* Footer nav */}
        <footer style={{ paddingTop: "var(--renge-space-6)", borderTop: "1px solid var(--renge-color-border-subtle)", display: "flex", gap: "var(--renge-space-4)", flexWrap: "wrap" }}>
          <a href="/tokens" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >← Tokens</a>
          <a href="/components" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >React Components →</a>
        </footer>

        </main>
      </div>
    </ProfileProvider>
  );
}
