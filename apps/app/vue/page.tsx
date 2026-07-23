"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { DocPageLayout } from "@/components/ui/DocPageLayout";
import { DocSidebar, type SidebarSection } from "@/components/ui/DocSidebar";

const VUE_NAV: SidebarSection[] = [
  { label: "Overview", items: [
    { id: "overview", label: "About" },
    { id: "setup", label: "Setup" },
  ]},
  { label: "API Reference", items: [
    { id: "api", label: "useRengeTheme()" },
    { id: "tokens", label: "Tokens" },
  ]},
  { label: "Patterns", items: [
    { id: "patterns", label: "Real-World Examples" },
  ]},
];

export default function VuePage() {
  return (
    <DocPageLayout sidebar={<DocSidebar sections={VUE_NAV} footerLinks={[
      { href: "/svelte", label: "Svelte Stores" },
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
              @renge-ui/vue
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
              Composables for theme management.
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
              Vue 3 composables for Renge theme management. Reactive state, provide/inject pattern, full token integration via CSS custom properties.
            </p>
            <Stack gap="4">
              <CodeBlock code={`pnpm add @renge-ui/vue @renge-ui/tokens`} />
              <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap", alignItems: "center" }}>
                <Badge variant="neutral">v1.2.0</Badge>
                <Badge variant="neutral">Vue 3+</Badge>
                <a href="https://github.com/vsm1996/renge-ui/tree/main/packages/vue" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>GitHub →</a>
                <a href="https://npmjs.com/package/@renge-ui/vue" style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-accent)", textDecoration: "none" }}>npm →</a>
              </Stack>
            </Stack>
          </header>

          {/* Overview */}
          <DocSection
            id="overview"
            label="Overview"
            title="What is @renge-ui/vue?"
            description="A Vue 3-first adapter for Renge tokens."
          >
            <Stack gap="6">
              <div>
                <p style={{ fontSize: "var(--renge-font-size-base)", color: "var(--renge-color-fg)", margin: 0, marginBottom: "var(--renge-space-4)", lineHeight: "var(--renge-line-height-lg)" }}>
                  @renge-ui/vue provides Vue 3 composables and provide/inject utilities for Renge theme management. It uses reactive refs and the Vue 3 Composition API to provide a clean, modern interface for consuming Renge tokens.
                </p>
              </div>
              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", margin: 0 }}>
                  <strong>Key features:</strong> useRengeTheme() composable with reactive state, useRengeInject() for child component access, provide/inject pattern for component tree sharing, export of all Renge tokens and constants (PHI, FIBONACCI, GOLDEN_ANGLE).
                </p>
              </div>
            </Stack>
          </DocSection>

          {/* Installation */}
          <DocSection
            id="setup"
            label="Getting Started"
            title="Setup in three steps."
            description="Install, import tokens, and use the composable."
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  1. Install Packages
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Add both @renge-ui/vue and @renge-ui/tokens to your project.
                </p>
                <CodeBlock code={`pnpm add @renge-ui/vue @renge-ui/tokens`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  2. Import Tokens
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Add CSS tokens to your main.js or global stylesheet.
                </p>
                <CodeBlock code={`// main.js
import '@renge-ui/tokens/renge.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  3. Use Composable
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Call <code style={{ fontFamily: "var(--font-mono, monospace)" }}>useRengeTheme()</code> in your root component to provide theme state to the component tree.
                </p>
                <CodeBlock code={`<template>
  <div :style="{ background: 'var(--renge-color-bg)', color: 'var(--renge-color-fg)' }">
    <p>Current Profile: {{ profile }}</p>
    <p>Current Mode: {{ mode }}</p>

    <button @click="switchProfile('earth')">Switch to Earth</button>
    <button @click="switchMode(mode === 'dark' ? 'light' : 'dark')">Toggle Mode</button>
  </div>
</template>

<script setup>
import { useRengeTheme } from '@renge-ui/vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();
</script>`} />
              </div>
            </div>
          </DocSection>

          {/* API Reference */}
          <DocSection
            id="api"
            label="API Reference"
            title="useRengeTheme() composable"
            description="Complete composable reference with types and examples."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  useRengeTheme()
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Root composable that provides theme state and methods. Call this in your root component or layout.
                </p>
                <CodeBlock code={`<script setup>
import { useRengeTheme } from '@renge-ui/vue';

const {
  profile,        // ref<string> current profile
  mode,           // ref<'light' | 'dark'> current mode
  switchProfile,  // (name: string) => void
  switchMode,     // (m: 'light' | 'dark') => void
} = useRengeTheme();
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  useRengeInject()
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Child component composable that accesses the provided theme context. Must be called inside a component tree that has called useRengeTheme().
                </p>
                <CodeBlock code={`<script setup>
import { useRengeInject } from '@renge-ui/vue';

const { profile, mode, switchProfile, switchMode } = useRengeInject();

// Will throw if useRengeTheme() was not called in parent
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Type Definitions
                </h3>
                <CodeBlock code={`export interface RengeThemeState {
  profile: string;
  mode: 'light' | 'dark';
}

export interface RengeThemeContext extends RengeThemeState {
  switchProfile: (name: string) => void;
  switchMode: (mode: 'light' | 'dark') => void;
}`} />
              </div>

              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-2)", letterSpacing: "-0.01em" }}>
                  🔜 Coming Soon: switchScale
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0 }}>
                  Runtime base unit scaling with reactive updates across all spacing, radius, and dimension tokens.
                </p>
              </div>
            </Stack>
          </DocSection>

          {/* Patterns */}
          <DocSection
            id="patterns"
            label="Patterns"
            title="Common use cases"
            description="Real-world examples of theme switching in Vue applications."
          >
            <Stack gap="6">
              <div style={{ padding: "var(--renge-space-4)", backgroundColor: "color-mix(in oklch, var(--renge-color-accent) 5%, transparent)", borderRadius: "var(--renge-radius-1)", border: "1px solid var(--renge-color-border-subtle)" }}>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg)", margin: 0 }}>
                  <strong>localStorage contract:</strong> <code>switchProfile</code> and <code>switchMode</code> update the reactive ref and apply CSS to the DOM immediately. They do <em>not</em> automatically persist to localStorage or read from it on mount. You are responsible for calling them with stored values in <code>onMounted</code> and writing back in a <code>watch</code>. The examples below show the full pattern.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Persist Theme to localStorage
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Save and restore theme from localStorage.
                </p>
                <CodeBlock code={`<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import { onMounted, watch } from 'vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();

// Load from localStorage on mount
onMounted(() => {
  const savedProfile = localStorage.getItem('renge-profile');
  const savedMode = localStorage.getItem('renge-mode');
  if (savedProfile) switchProfile(savedProfile);
  if (savedMode) switchMode(savedMode as 'light' | 'dark');
});

// Save changes to localStorage
watch(profile, (newProfile) => {
  localStorage.setItem('renge-profile', newProfile);
});

watch(mode, (newMode) => {
  localStorage.setItem('renge-mode', newMode);
});
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Respect System Preference
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Detect system dark mode and switch automatically on mount.
                </p>
                <CodeBlock code={`<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import { onMounted } from 'vue';

const { switchMode } = useRengeTheme();

onMounted(() => {
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
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Complete profile switcher with all available profiles.
                </p>
                <CodeBlock code={`<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <button
      v-for="p in profiles"
      :key="p"
      :class="{ active: profile === p }"
      @click="switchProfile(p)"
    >
      {{ p.charAt(0).toUpperCase() + p.slice(1) }}
    </button>
  </div>
</template>

<script setup>
import { useRengeInject } from '@renge-ui/vue';

const { profile, switchProfile } = useRengeInject();
const profiles = ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf'];
</script>

<style scoped>
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
                  Watched Reactive Changes
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  React to theme changes with watchers for side effects.
                </p>
                <CodeBlock code={`<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import { watch } from 'vue';

const { profile, mode } = useRengeTheme();

// Watch profile changes
watch(profile, (newProfile) => {
  console.log('Profile changed to:', newProfile);
  // Send analytics, update app state, etc.
});

// Watch mode changes
watch(mode, (newMode) => {
  console.log('Mode changed to:', newMode);
  // Update UI, theme provider, etc.
});

// Watch multiple
watch([profile, mode], ([newProfile, newMode]) => {
  console.log('Theme updated:', { profile: newProfile, mode: newMode });
});
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Global Provide/Inject Setup
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Provide theme globally from root component or App.vue.
                </p>
                <CodeBlock code={`<!-- App.vue -->
<template>
  <div>
    <ThemedContent />
  </div>
</template>

<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import ThemedContent from './components/ThemedContent.vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();
</script>

<!-- Any child component -->
<template>
  <button @click="switchProfile('twilight')">
    Current: {{ profile }}
  </button>
</template>

<script setup>
import { useRengeInject } from '@renge-ui/vue';

const { profile, switchProfile } = useRengeInject();
</script>`} />
              </div>
            </Stack>
          </DocSection>

          {/* Framework Integration */}
          <DocSection
            id="integration"
            label="Integration"
            title="Framework patterns"
            description="Integrate Renge with Vue ecosystem tools and frameworks."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Nuxt 3 Setup
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Use middleware or composable for SSR-safe theme initialization.
                </p>
                <CodeBlock code={`// composables/useTheme.ts
import { useRengeTheme } from '@renge-ui/vue';

export function useAppTheme() {
  const theme = useRengeTheme();

  if (process.client) {
    // Load from localStorage on client only
    const saved = {
      profile: localStorage.getItem('renge-profile'),
      mode: localStorage.getItem('renge-mode'),
    };
    if (saved.profile) theme.switchProfile(saved.profile);
    if (saved.mode) theme.switchMode(saved.mode as 'light' | 'dark');
  }

  return theme;
}

// app.vue
<script setup>
import { useAppTheme } from '~/composables/useTheme';
useAppTheme();
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Vite + Vue 3 Setup
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Standard Vite + Vue 3 project configuration.
                </p>
                <CodeBlock code={`// main.ts
import '@renge-ui/tokens/renge.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');

// App.vue
<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { useRengeTheme } from '@renge-ui/vue';
useRengeTheme();
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Shared Composable Module
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Create a reusable theme composable for consistency.
                </p>
                <CodeBlock code={`// composables/theme.ts
import { useRengeTheme } from '@renge-ui/vue';
import { onMounted } from 'vue';

export function useTheme() {
  const theme = useRengeTheme();

  onMounted(() => {
    // Restore from localStorage
    const saved = {
      profile: localStorage.getItem('renge-profile'),
      mode: localStorage.getItem('renge-mode'),
    };
    if (saved.profile) theme.switchProfile(saved.profile);
    if (saved.mode) theme.switchMode(saved.mode as 'light' | 'dark');
  });

  return theme;
}

// Usage in any component
<script setup>
import { useTheme } from '@/composables/theme';
const { profile, switchProfile } = useTheme();
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Server-Side Rendering (SSR)
                </h3>
                <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                  Handle theme initialization safely in SSR environments.
                </p>
                <CodeBlock code={`// app.vue
<template>
  <div :data-profile="profile" :data-mode="mode">
    <RouterView />
  </div>
</template>

<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import { onBeforeMount, onMounted } from 'vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();

// SSR: set from cookie or header
if (import.meta.env.SSR) {
  // Get theme from server context
  // switchProfile(serverTheme.profile);
  // switchMode(serverTheme.mode);
}

// Client: restore from localStorage
onMounted(() => {
  const saved = {
    profile: localStorage.getItem('renge-profile'),
    mode: localStorage.getItem('renge-mode'),
  };
  if (saved.profile) switchProfile(saved.profile);
  if (saved.mode) switchMode(saved.mode as 'light' | 'dark');
});
</script>`} />
              </div>
            </Stack>
          </DocSection>

          {/* Best Practices */}
          <DocSection
            id="best-practices"
            label="Best Practices"
            title="Vue-specific patterns"
            description="Recommended approaches for using Renge in Vue applications."
          >
            <Stack gap="6">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Use computed for derived state
                </h3>
                <CodeBlock code={`<script setup>
import { useRengeInject } from '@renge-ui/vue';
import { computed } from 'vue';

const { profile } = useRengeInject();

// Good: computed derived state
const isDarkProfile = computed(() =>
  ['twilight', 'void'].includes(profile.value)
);

// Avoid: manual reactive updates
// let isDarkProfile = ref(false);
// watch(profile, p => { isDarkProfile.value = ['twilight', 'void'].includes(p); });
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Prefer CSS variables in styles
                </h3>
                <CodeBlock code={`<template>
  <!-- Good: CSS variables always in sync -->
  <div :style="{ background: 'var(--renge-color-bg)' }">
    Content
  </div>

  <!-- Acceptable: use rengeVars for computed values -->
  <div :style="{ padding: rengeVars.space['4'] }">
    Content
  </div>
</template>

<script setup>
import { rengeVars } from '@renge-ui/vue';
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Watch changes with debouncing
                </h3>
                <CodeBlock code={`<script setup>
import { useRengeTheme } from '@renge-ui/vue';
import { watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

const { profile } = useRengeTheme();

const saveTheme = useDebounceFn((newProfile) => {
  localStorage.setItem('renge-profile', newProfile);
}, 500);

watch(profile, saveTheme);
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Error handling for useRengeInject
                </h3>
                <CodeBlock code={`<script setup>
import { useRengeInject } from '@renge-ui/vue';

let theme;
try {
  theme = useRengeInject();
} catch (error) {
  // Handle case where provider is not available
  console.warn('useRengeTheme() was not called in parent');
  // Use fallback or default values
}
</script>`} />
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
                  Complete token object with type definitions.
                </p>
                <CodeBlock code={`<script setup>
import { rengeVars } from '@renge-ui/vue';

// Access any token
const spacing = rengeVars.space['4'];
const color = rengeVars.color.fg;
const radius = rengeVars.radius['2'];
</script>`} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                  Mathematical Constants
                </h3>
                <CodeBlock code={`<script setup>
import { PHI, FIBONACCI, GOLDEN_ANGLE } from '@renge-ui/vue';

// PHI = 1.618033988749895
// FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...]
// GOLDEN_ANGLE = 137.50776...
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
                All color profiles meet WCAG 2.1 Level AA contrast requirements. Theme switching maintains accessibility regardless of which profile is active.
              </Text>
            </Stack>
          </div>
    </DocPageLayout>
  );
}
