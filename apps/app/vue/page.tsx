"use client";

import { Stack, Text, Heading, Badge } from "@renge-ui/react";
import { ProfileProvider } from "@/components/ui/ProfileToggle";
import { Nav } from "@/components/ui/Nav";
import { CodeBlock, DocSection } from "@/components/ui/DocPrimitives";
import { useBreakpoint } from "@/lib/useBreakpoint";

export default function VuePage() {
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
            Reactive theme management.
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
            Vue 3 composables for dynamic theme switching. Switch color profiles, light/dark mode, or base unit at runtime with reactive state.
          </p>
          <Stack direction="horizontal" gap="3" style={{ flexWrap: "wrap" }}>
            <CodeBlock code={`pnpm add @renge-ui/vue @renge-ui/tokens`} />
            <Badge variant="neutral">v1.0.0</Badge>
            <Badge variant="neutral">Vue 3+</Badge>
          </Stack>
        </header>

        {/* Installation */}
        <DocSection
          id="setup"
          label="Getting Started"
          title="Setup in two steps."
          description="Import tokens into your global scope, then use the useRengeTheme() composable in any component."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--renge-space-6)" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Step 1: Import Tokens
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Add the CSS tokens to your main.js or a global stylesheet.
              </p>
              <CodeBlock code={`// main.js
import '@renge-ui/tokens/renge.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Step 2: Use Composable
              </h3>
              <p style={{ fontSize: "var(--renge-font-size-sm)", color: "var(--renge-color-fg-subtle)", margin: 0, marginBottom: "var(--renge-space-4)" }}>
                Call <code style={{ fontFamily: "var(--font-mono, monospace)" }}>useRengeTheme()</code> in any component to get/set theme values.
              </p>
              <CodeBlock code={`<template>
  <div :style="{ background: 'var(--renge-color-bg)', color: 'var(--renge-color-fg)' }">
    <p>Current Profile: {{ profile }}</p>
    <p>Current Mode: {{ mode }}</p>

    <button @click="switchProfile('twilight')">Switch to Twilight</button>
    <button @click="switchMode('dark')">Dark Mode</button>
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
          description="Access and control the theme at runtime."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Reactive Refs
              </h3>
              <CodeBlock code={`const {
  profile,  // ref<'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'>
  mode,     // ref<'light' | 'dark'>
  scale,    // ref<number> — base unit scale (4px–8px)
} = useRengeTheme();`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Methods
              </h3>
              <CodeBlock code={`const {
  switchProfile(newProfile: string),  // Set color profile
  switchMode(newMode: 'light' | 'dark'),  // Set light/dark mode
  switchScale(newScale: number),  // Set base unit scale
} = useRengeTheme();`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Example: Theme Switcher
              </h3>
              <CodeBlock code={`<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <button
      v-for="p in ['ocean', 'earth', 'twilight', 'fire', 'void', 'leaf']"
      :key="p"
      :class="{ active: profile === p }"
      @click="switchProfile(p)"
    >
      {{ p.charAt(0).toUpperCase() + p.slice(1) }}
    </button>
  </div>
</template>

<script setup>
import { useRengeTheme } from '@renge-ui/vue';

const { profile, switchProfile } = useRengeTheme();
</script>

<style scoped>
button.active {
  background: var(--renge-color-accent);
  color: var(--renge-color-bg);
}
</style>`} />
            </div>
          </Stack>
        </DocSection>

        {/* Common Patterns */}
        <DocSection
          id="patterns"
          label="Patterns"
          title="Common use cases"
          description="Real-world examples of theme switching in Vue apps."
        >
          <Stack gap="6">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Persist Theme to LocalStorage
              </h3>
              <CodeBlock code={`import { useRengeTheme } from '@renge-ui/vue';
import { watch } from 'vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();

// Load from localStorage on mount
onMounted(() => {
  const savedProfile = localStorage.getItem('renge-profile');
  const savedMode = localStorage.getItem('renge-mode');
  if (savedProfile) switchProfile(savedProfile);
  if (savedMode) switchMode(savedMode);
});

// Save changes to localStorage
watch(profile, (newProfile) => {
  localStorage.setItem('renge-profile', newProfile);
});

watch(mode, (newMode) => {
  localStorage.setItem('renge-mode', newMode);
});`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Respect System Preference
              </h3>
              <CodeBlock code={`import { useRengeTheme } from '@renge-ui/vue';
import { onMounted } from 'vue';

const { switchMode } = useRengeTheme();

onMounted(() => {
  // Check system preference for dark mode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    switchMode('dark');
  }
});`} />
            </div>

            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--renge-font-size-lg)", color: "var(--renge-color-fg)", fontWeight: 400, margin: 0, marginBottom: "var(--renge-space-3)", letterSpacing: "-0.01em" }}>
                Global Provide/Inject
              </h3>
              <CodeBlock code={`// main.js
import { createApp } from 'vue';
import { useRengeTheme } from '@renge-ui/vue';

const app = createApp(App);
const { profile, mode, switchProfile, switchMode } = useRengeTheme();

app.provide('rengeTheme', {
  profile, mode, switchProfile, switchMode
});

// In any child component:
import { inject } from 'vue';

const { profile, switchProfile } = inject('rengeTheme');`} />
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
              All color profiles meet WCAG 2.1 Level AA contrast requirements. Theme switching maintains accessibility regardless of which profile is active.
            </Text>
          </Stack>
        </div>
      </div>
    </ProfileProvider>
  );
}
