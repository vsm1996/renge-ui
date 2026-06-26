"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";

export default function SveltePage() {
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
            @renge-ui/svelte
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
            Stores for reactive theming.
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
            Svelte 4+ stores for Renge theme management. Automatic two-way binding, reactive updates, zero boilerplate.
          </p>
          <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
            <CodeBlock code={`pnpm add @renge-ui/svelte @renge-ui/tokens`} />
            <Badge variant="neutral">v1.0.0</Badge>
            <Badge variant="neutral">Svelte 4+</Badge>
          </Stack>
        </header>

        {/* Installation */}
        <DocSection
          id="setup"
          label="Getting Started"
          title="Setup in one step."
          description="Import tokens and use Renge stores. Svelte's reactivity handles the rest."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Step 1: Global Tokens
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Import CSS tokens once in your root layout or +page.svelte.
              </p>
              <CodeBlock code={`<script>
  import '@renge-ui/tokens/renge.css';
</script>

<slot />`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Step 2: Use Stores
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Import reactive stores. The <code style={{ fontFamily: "var(--font-mono, monospace)" }}>$</code> prefix auto-subscribes.
              </p>
              <CodeBlock code={`<script>
  import { profile, mode, switchProfile, switchMode } from '@renge-ui/svelte';
</script>

<div style="background: var(--renge-color-bg); color: var(--renge-color-fg);">
  <p>Profile: {$profile}</p>
  <p>Mode: {$mode}</p>

  <button on:click={() => switchProfile('twilight')}>
    Switch to Twilight
  </button>
</div>`} />
            </div>
          </div>
        </DocSection>

        {/* Stores */}
        <DocSection
          id="stores"
          label="Stores"
          title="Three reactive stores"
          description="All stores are writable — update them directly or use helper functions."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                profile
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Current color profile (ocean | earth | twilight | fire | void | leaf).
              </p>
              <CodeBlock code={`<script>
  import { profile } from '@renge-ui/svelte';

  // Read current profile
  {$profile}

  // Set directly
  profile.set('earth');
</script>`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                mode
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Light/dark mode (light | dark).
              </p>
              <CodeBlock code={`<script>
  import { mode } from '@renge-ui/svelte';

  // Reactive value
  {$mode === 'dark' ? '🌙' : '☀️'}

  // Update
  mode.set('dark');
</script>`} />
            </div>

            <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-2)", letterSpacing: "-0.01em" }}>
                🔜 Coming Soon: scale
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>
                Runtime base unit scaling (base unit in pixels, 0.5–16 range). Requires calc-based token regeneration to maintain mathematical integrity. When ready, scale changes will propagate through all spacing, radius, and dimension tokens.
              </p>
            </div>
          </Stack>
        </DocSection>

        {/* Helper Functions */}
        <DocSection
          id="functions"
          label="Helpers"
          title="Convenience functions"
          description="These functions update the theme store and DOM. Persistence to localStorage is your responsibility — use the patterns below."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                switchProfile(newProfile)
              </h3>
              <CodeBlock code={`<script>
  import { switchProfile } from '@renge-ui/svelte';

  // Change profile (update store + DOM)
  <button on:click={() => switchProfile('twilight')}>
    Twilight Mode
  </button>
</script>`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                switchMode(newMode)
              </h3>
              <CodeBlock code={`<script>
  import { switchMode } from '@renge-ui/svelte';

  // Toggle light/dark with auto-persist
  <button on:click={() => switchMode('dark')}>
    Dark Mode
  </button>
</script>`} />
            </div>
          </Stack>
        </DocSection>

        {/* Patterns */}
        <DocSection
          id="patterns"
          label="Patterns"
          title="Common patterns"
          description="Real-world examples of theme switching in Svelte apps."
        >
          <Stack gap="6">
            <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", margin: 0 }}>
                <strong>localStorage contract:</strong> Helpers like <code style={{ fontFamily: "var(--font-mono, monospace)" }}>switchProfile()</code> update the store and DOM. To survive page reload, you're responsible for saving to localStorage and loading on startup.
              </p>
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Persist and Restore Theme
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Save changes to localStorage and restore on app startup (e.g., in +layout.svelte).
              </p>
              <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { profile, mode } from '@renge-ui/svelte';

  onMount(() => {
    // Restore from localStorage on mount
    const savedProfile = localStorage.getItem('renge-profile');
    const savedMode = localStorage.getItem('renge-mode');
    if (savedProfile) profile.set(savedProfile);
    if (savedMode) mode.set(savedMode);
  });

  // Save to localStorage whenever theme changes
  $: localStorage.setItem('renge-profile', $profile);
  $: localStorage.setItem('renge-mode', $mode);
</script>`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Respect System Preference
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Detect system dark mode and switch automatically.
              </p>
              <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { switchMode } from '@renge-ui/svelte';

  onMount(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      switchMode('dark');
    }
  });
</script>`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Theme Switcher Component
              </h3>
              <CodeBlock code={`<script>
  import { profile, switchProfile } from '@renge-ui/svelte';

  const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];
</script>

<div style="display: flex; gap: 8px; flex-wrap: wrap;">
  {#each profiles as p (p)}
    <button
      class:active={$profile === p}
      on:click={() => switchProfile(p)}
    >
      {p.charAt(0).toUpperCase() + p.slice(1)}
    </button>
  {/each}
</div>

<style>
  button.active {
    background: var(--renge-color-accent);
    color: var(--renge-color-bg);
  }
</style>`} />
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
              ✨ WCAG 2.1 Level AA
            </Heading>
            <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
              All color profiles meet WCAG 2.1 Level AA accessibility. Switching themes maintains full accessibility compliance.
            </Text>
          </Stack>
        </div>
      </div>
    </ProfileProvider>
  );
}
