"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { DocPageLayout } from "@/components/ui/DocPageLayout";
import { DocSidebar, type SidebarSection } from "@/components/ui/DocSidebar";

const SVELTE_NAV: SidebarSection[] = [
  { label: "Overview", items: [
    { id: "overview", label: "About" },
    { id: "setup", label: "Setup" },
  ]},
  { label: "API", items: [
    { id: "stores", label: "Stores" },
    { id: "functions", label: "Functions" },
    { id: "tokens", label: "Tokens" },
  ]},
  { label: "Patterns", items: [
    { id: "patterns", label: "Real-World Examples" },
  ]},
];

export default function SveltePage() {
  return (
    <DocPageLayout sidebar={<DocSidebar sections={SVELTE_NAV} footerLinks={[
      { href: "/vue", label: "Vue Composables" },
      { href: "/components", label: "React Components" },
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
              Svelte 4+ stores for Renge theme management. Automatic two-way binding, reactive updates, zero boilerplate. Full token integration with CSS custom properties.
            </p>
            <Stack gap="4">
              <CodeBlock code={`pnpm add @renge-ui/svelte @renge-ui/tokens`} />
              <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap", alignItems: "center" }}>
                <Badge variant="neutral">v1.0.0</Badge>
                <Badge variant="neutral">Svelte 4+</Badge>
                <a href="https://github.com/soka-labs/renge/tree/main/packages/svelte" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>GitHub →</a>
                <a href="https://npmjs.com/package/@renge-ui/svelte" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>npm →</a>
              </Stack>
            </Stack>
          </header>

          {/* Overview */}
          <DocSection
            id="overview"
            label="Overview"
            title="What is @renge-ui/svelte?"
            description="A lightweight Svelte-first adapter for Renge tokens."
          >
            <Stack gap="6">
              <div>
                <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", margin: 0, marginBottom: "var(--renge-space-4)", lineHeight: "var(--renge-line-height-lg)" }}>
                  @renge-ui/svelte provides Svelte stores and utilities to consume Renge tokens with automatic reactivity. It integrates seamlessly with Svelte's built-in store mechanism and requires zero configuration beyond importing tokens.
                </p>
              </div>
              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", margin: 0 }}>
                  <strong>Key features:</strong> Writable stores for profile and mode, automatic DOM synchronization, export of all Renge tokens and constants (PHI, FIBONACCI, GOLDEN_ANGLE), optional SSR support via hydration.
                </p>
              </div>
            </Stack>
          </DocSection>

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
                  1. Install Packages
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Add both @renge-ui/svelte and @renge-ui/tokens to your project.
                </p>
                <CodeBlock code={`pnpm add @renge-ui/svelte @renge-ui/tokens`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  2. Import Tokens
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Import CSS tokens in your root layout or +page.svelte. This applies CSS custom properties globally.
                </p>
                <CodeBlock code={`<script>
  import '@renge-ui/tokens/renge.css';
</script>

<slot />`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  3. Use Stores
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Import reactive stores in any component. The <code style={{ fontFamily: "var(--font-mono, monospace)" }}>$</code> prefix auto-subscribes to changes.
                </p>
                <CodeBlock code={`<script>
  import { profile, mode, switchProfile, switchMode } from '@renge-ui/svelte';
</script>

<div style="background: var(--renge-color-bg); color: var(--renge-color-fg);">
  <p>Profile: {$profile}</p>
  <p>Mode: {$mode}</p>

  <button on:click={() => switchProfile('earth')}>
    Switch to Earth
  </button>

  <button on:click={() => switchMode($mode === 'dark' ? 'light' : 'dark')}>
    Toggle Mode
  </button>
</div>`} />
              </div>
            </div>
          </DocSection>

          {/* Stores API */}
          <DocSection
            id="stores"
            label="Stores"
            title="Reactive stores"
            description="All stores are writable — update them directly or use helper functions."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  profile
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Writable store for the current color profile. Valid values: <code style={{ fontFamily: "var(--font-mono, monospace)" }}>ocean | earth | twilight | fire | void | leaf</code>.
                </p>
                <CodeBlock code={`<script>
  import { profile } from '@renge-ui/svelte';

  // Read current profile via store subscription
  {$profile}

  // Set directly
  profile.set('earth');

  // Subscribe manually
  const unsubscribe = profile.subscribe(value => {
    console.log('Profile changed to:', value);
  });
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  mode
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Writable store for light/dark mode. Valid values: <code style={{ fontFamily: "var(--font-mono, monospace)" }}>light | dark</code>.
                </p>
                <CodeBlock code={`<script>
  import { mode } from '@renge-ui/svelte';

  // Read current mode
  {$mode === 'dark' ? '🌙' : '☀️'}

  // Update
  mode.set('dark');

  // Or toggle
  mode.update(m => m === 'dark' ? 'light' : 'dark');
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  initializeTheme()
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Call during app startup to sync stores with current DOM state (data-profile and data-mode attributes).
                </p>
                <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { initializeTheme } from '@renge-ui/svelte';

  onMount(() => {
    // Sync stores with DOM state
    initializeTheme();
  });
</script>`} />
              </div>

              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-2)", letterSpacing: "-0.01em" }}>
                  🔜 Coming Soon: scale
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>
                  Runtime base unit scaling (0.5–16 range). Requires calc-based token regeneration to maintain mathematical integrity.
                </p>
              </div>
            </Stack>
          </DocSection>

          {/* Helper Functions */}
          <DocSection
            id="functions"
            label="Functions"
            title="Helper functions"
            description="Update stores and synchronize DOM. These functions handle both store updates and data attribute synchronization."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  switchProfile(name: string)
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Set the color profile and update the document root's <code style={{ fontFamily: "var(--font-mono, monospace)" }}>data-profile</code> attribute.
                </p>
                <CodeBlock code={`<script>
  import { switchProfile } from '@renge-ui/svelte';

  const handleProfileChange = (newProfile) => {
    // Updates store AND DOM
    switchProfile(newProfile);
  };
</script>

<button on:click={() => switchProfile('twilight')}>
  Switch to Twilight
</button>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  switchMode(mode: 'light' | 'dark')
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Set light/dark mode and update the document root's <code style={{ fontFamily: "var(--font-mono, monospace)" }}>data-mode</code> attribute.
                </p>
                <CodeBlock code={`<script>
  import { mode, switchMode } from '@renge-ui/svelte';
</script>

<button on:click={() => switchMode($mode === 'dark' ? 'light' : 'dark')}>
  {$mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
</button>`} />
              </div>
            </Stack>
          </DocSection>

          {/* Token Exports */}
          <DocSection
            id="tokens"
            label="Tokens"
            title="Exported tokens"
            description="Direct access to Renge tokens for programmatic use."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  rengeVars
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Complete token object with type definitions. Includes colors, spacing, typography, radius, duration, easing, and animation tokens.
                </p>
                <CodeBlock code={`<script>
  import { rengeVars } from '@renge-ui/svelte';

  // Access any token programmatically
  const spacing = rengeVars.space['4'];  // "16px"
  const color = rengeVars.color.fg;      // "oklch(...)"
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  PHI, FIBONACCI, GOLDEN_ANGLE
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Mathematical constants used in the design system.
                </p>
                <CodeBlock code={`<script>
  import { PHI, FIBONACCI, GOLDEN_ANGLE } from '@renge-ui/svelte';

  // PHI = 1.618033988749895
  // FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...]
  // GOLDEN_ANGLE = 137.50776...
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
                  <strong>localStorage contract:</strong> Helper functions update the store and DOM. To survive page reload, save to localStorage and load on startup.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Persist Theme
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Auto-save theme changes to localStorage and restore on mount.
                </p>
                <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { profile, mode } from '@renge-ui/svelte';

  onMount(() => {
    // Restore from localStorage
    const savedProfile = localStorage.getItem('renge-profile');
    const savedMode = localStorage.getItem('renge-mode');
    if (savedProfile) profile.set(savedProfile);
    if (savedMode) mode.set(savedMode);
  });

  // Auto-save on change
  $: localStorage.setItem('renge-profile', $profile);
  $: localStorage.setItem('renge-mode', $mode);
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  System Preference
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Detect and respect system dark mode preference.
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
                  Profile Switcher Component
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Complete theme switcher with all profiles.
                </p>
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
  button {
    padding: var(--renge-space-2) var(--renge-space-3);
    border: 1px solid var(--renge-color-border);
    border-radius: var(--renge-radius-2);
    background: var(--renge-color-bg-subtle);
    color: var(--renge-color-fg);
    cursor: pointer;
    transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
  }

  button:hover {
    border-color: var(--renge-color-accent);
  }

  button.active {
    background: var(--renge-color-accent);
    color: var(--renge-color-bg);
    border-color: var(--renge-color-accent);
  }
</style>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Subscription-based Updates
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Use store subscriptions for side effects without reactive statements.
                </p>
                <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { profile, mode } from '@renge-ui/svelte';

  onMount(() => {
    // Listen for profile changes
    const unsubProfile = profile.subscribe(newProfile => {
      console.log('Profile changed to:', newProfile);
      // Send analytics, update app state, etc.
    });

    // Listen for mode changes
    const unsubMode = mode.subscribe(newMode => {
      console.log('Mode changed to:', newMode);
    });

    // Cleanup on unmount
    return () => {
      unsubProfile();
      unsubMode();
    };
  });
</script>`} />
              </div>
            </Stack>
          </DocSection>

          {/* Framework Integration */}
          <DocSection
            id="integration"
            label="Integration"
            title="Framework patterns"
            description="Integrate Renge theme management with SvelteKit and other frameworks."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  SvelteKit +layout.svelte
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Root layout with theme persistence and initialization.
                </p>
                <CodeBlock code={`<script>
  import '@renge-ui/tokens/renge.css';
  import { onMount } from 'svelte';
  import { initializeTheme, profile, mode } from '@renge-ui/svelte';

  onMount(() => {
    // Initialize from DOM/localStorage
    initializeTheme();

    // Restore custom theme if saved
    const savedProfile = localStorage.getItem('renge-profile');
    const savedMode = localStorage.getItem('renge-mode');
    if (savedProfile) profile.set(savedProfile);
    if (savedMode) mode.set(savedMode);
  });

  // Auto-persist
  $: localStorage.setItem('renge-profile', $profile);
  $: localStorage.setItem('renge-mode', $mode);
</script>

<slot />`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  SSR/Hydration
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Use server load to read user preferences before rendering.
                </p>
                <CodeBlock code={`// src/routes/+layout.server.ts
export async function load({ cookies }) {
  return {
    profile: cookies.get('renge-profile') || 'ocean',
    mode: cookies.get('renge-mode') || 'light',
  };
}

// src/routes/+layout.svelte
<script>
  import { profile, mode, switchProfile, switchMode } from '@renge-ui/svelte';

  export let data;

  // Set initial values from server
  $: switchProfile(data.profile);
  $: switchMode(data.mode);

  // Persist to cookies
  $: fetch('/api/theme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile: $profile, mode: $mode }),
  });
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Shared Module
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Create a reusable theme module for consistency.
                </p>
                <CodeBlock code={`// src/lib/theme.ts
import { onMount } from 'svelte';
import { profile, mode, switchProfile, switchMode } from '@renge-ui/svelte';

export function useTheme() {
  onMount(() => {
    const saved = {
      profile: localStorage.getItem('renge-profile'),
      mode: localStorage.getItem('renge-mode'),
    };
    if (saved.profile) switchProfile(saved.profile);
    if (saved.mode) switchMode(saved.mode as 'light' | 'dark');
  });

  return { profile, mode, switchProfile, switchMode };
}

// Usage in components
<script>
  import { useTheme } from '$lib/theme';
  const { profile, switchProfile } = useTheme();
</script>`} />
              </div>
            </Stack>
          </DocSection>

          {/* Best Practices */}
          <DocSection
            id="best-practices"
            label="Best Practices"
            title="Svelte-specific patterns"
            description="Recommended approaches for using Renge in Svelte applications."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Use reactive statements for derived state
                </h3>
                <CodeBlock code={`<script>
  import { profile } from '@renge-ui/svelte';

  // Good: reactive statement
  \$: isDark = \$profile === 'twilight' || \$profile === 'void';

  // Avoid: manual subscription
  // let isDark = false;
  // profile.subscribe(p => { isDark = p === 'twilight'; });
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Prefer CSS variables over store values in styles
                </h3>
                <CodeBlock code={`<script>
  import { rengeVars } from '@renge-ui/svelte';
</script>

<!-- Good: CSS variables are always in sync -->
<div style="background: var(--renge-color-bg);">Content</div>

<!-- Acceptable: use rengeVars for computed values -->
<div style="padding: {rengeVars.space['4']};">Content</div>

<!-- Avoid: store values in inline styles (stale) -->
<!-- <div style="background: {$profile};">Content</div> -->`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Initialize theme synchronously
                </h3>
                <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { profile, mode } from '@renge-ui/svelte';

  // Call ASAP to prevent flash
  const savedProfile = localStorage.getItem('renge-profile');
  if (savedProfile) profile.set(savedProfile);

  onMount(() => {
    // Confirm DOM is synced
    initializeTheme();
  });
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Clean up subscriptions
                </h3>
                <CodeBlock code={`<script>
  import { onMount } from 'svelte';
  import { profile } from '@renge-ui/svelte';

  onMount(() => {
    const unsub = profile.subscribe(value => {
      console.log(value);
    });

    return unsub; // Return cleanup function
  });
</script>`} />
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
                ✨ WCAG 2.1 Level AA
              </Heading>
              <Text size="base" style={{ margin: 0, color: "var(--renge-color-fg-subtle)" }}>
                All color profiles meet WCAG 2.1 Level AA accessibility standards. Theme switching via Svelte stores maintains full compliance.
              </Text>
            </Stack>
          </div>
    </DocPageLayout>
  );
}
