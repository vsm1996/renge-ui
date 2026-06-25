# @renge-ui/vue

Vue 3 composables and components for the Renge design system.

## Installation

```bash
pnpm add @renge-ui/vue @renge-ui/tokens
```

## Usage

### Setup with RengeProvider

Wrap your app with `RengeProvider` to enable theme context:

```vue
<script setup lang="ts">
import RengeProvider from '@renge-ui/vue/dist/components/RengeProvider.vue';
</script>

<template>
  <RengeProvider profile="clear" mode="light">
    <YourApp />
  </RengeProvider>
</template>
```

### useRengeTheme Composable

Access theme state and switching functions in any component:

```vue
<script setup lang="ts">
import { useRengeTheme } from '@renge-ui/vue';

const { profile, mode, switchProfile, switchMode } = useRengeTheme();

const handleProfileChange = (newProfile: string) => {
  switchProfile(newProfile);
};

const toggleMode = () => {
  switchMode(mode === 'light' ? 'dark' : 'light');
};
</script>

<template>
  <div>
    <p>Current profile: {{ profile }}</p>
    <p>Current mode: {{ mode }}</p>
    
    <button @click="handleProfileChange('clear')">Clear</button>
    <button @click="handleProfileChange('earth')">Earth</button>
    <button @click="handleProfileChange('twilight')">Twilight</button>
    
    <button @click="toggleMode">Toggle {{ mode === 'light' ? 'Dark' : 'Light' }}</button>
  </div>
</template>
```

### useRengeInject Composable

Inject theme context without providing it (useful in deeply nested components):

```vue
<script setup lang="ts">
import { useRengeInject } from '@renge-ui/vue';

const { profile, mode } = useRengeInject();
</script>

<template>
  <p>Theme: {{ profile }} / {{ mode }}</p>
</template>
```

### Token References

Use `rengeVars` to reference design tokens in your components:

```vue
<script setup lang="ts">
import { rengeVars } from '@renge-ui/vue';

const spacingToken = rengeVars.spacing.md;
const colorToken = rengeVars.colors.surface;
</script>

<template>
  <div :style="{ padding: `var(${spacingToken})` }">
    Styled with Renge tokens
  </div>
</template>
```

## API

### RengeProvider

A Vue component that provides theme context to child components.

**Props:**
- `profile` (string, default: `"clear"`) — The color profile to use
- `mode` ("light" | "dark", default: `"light"`) — The color mode

### useRengeTheme()

A composable that creates and provides theme context.

**Returns:**
- `profile` (string) — Current profile
- `mode` ("light" | "dark") — Current mode
- `switchProfile(name: string)` — Change the profile
- `switchMode(mode: "light" | "dark")` — Change the mode

### useRengeInject()

A composable that injects an existing theme context.

**Returns:**
- Same interface as `useRengeTheme()`

**Throws:** Error if not used inside a component with theme context

## Theme Switching

When you call `switchProfile()` or `switchMode()`, the composable updates the `data-profile` and `data-mode` attributes on the document root. Your Renge tokens use CSS custom properties scoped by these attributes.

## License

MIT
