"use client";

import { CodeBlock, DocSection, UtilityTable } from "@/components/ui/DocPrimitives";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { StackVisual } from "./components/StackVisual";
import { ContainerVisual } from "./components/ContainerVisual";
import { GridVisual } from "./components/GridVisual";
import { AspectVisual } from "./components/AspectVisual";

export default function TailwindPage() {
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
            One plugin line bakes every Renge token into your stylesheet as utility classes.
            Spacing, color, typography, motion, radius, and layout — all Tailwind-native,
            all derived.
          </p>
          <CodeBlock code={`pnpm add @renge-ui/tailwind`} />
        </header>

        {/* Setup */}
        <DocSection
          id="setup"
          label="Installation"
          title="One line."
          description="Add the plugin to globals.css and set data-profile on <html>. Every Renge token becomes a utility class. All variants work: hover:, md:, dark:, focus:."
        >
          <CodeBlock code={`/* globals.css */
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";`} />
          <CodeBlock code={`<!-- Activate a color profile — light by default -->
<html data-profile="ocean" data-mode="light">

<!-- All 6 profiles: ocean · earth · twilight · fire · void · leaf -->
<!-- Switch at runtime — no rebuild needed -->
<script>
  document.documentElement.setAttribute("data-profile", "twilight");
  document.documentElement.setAttribute("data-mode", "dark");
</script>`} />
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
          <a href="/" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >← Tokens</a>
          <a href="/docs" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", fontFamily: "var(--font-body)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--renge-color-fg)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--renge-color-fg-subtle)")}
          >React Components →</a>
        </footer>

      </div>
    </ProfileProvider>
  );
}
