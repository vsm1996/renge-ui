# @renge-ui/svelte

Svelte stores and components for the Renge design system.

## Installation

```bash
pnpm add @renge-ui/svelte @renge-ui/tokens
```

## Usage

### Setup with RengeProvider

Wrap your app with `RengeProvider` to enable theme management:

```svelte
<script>
  import { RengeProvider } from '@renge-ui/svelte';
</script>

<RengeProvider profile="clear" mode="light">
  <YourApp />
</RengeProvider>
```

### Using Theme Stores

Access theme state in any component via Svelte stores:

```svelte
<script>
  import { profile, mode, switchProfile, switchMode } from '@renge-ui/svelte';

  const handleProfileChange = (newProfile) => {
    switchProfile(newProfile);
  };

  const toggleMode = () => {
    switchMode($mode === 'light' ? 'dark' : 'light');
  };
</script>

<div>
  <p>Current profile: {$profile}</p>
  <p>Current mode: {$mode}</p>

  <button on:click={() => handleProfileChange('clear')}>Clear</button>
  <button on:click={() => handleProfileChange('earth')}>Earth</button>
  <button on:click={() => handleProfileChange('twilight')}>Twilight</button>

  <button on:click={toggleMode}>
    Toggle {$mode === 'light' ? 'Dark' : 'Light'}
  </button>
</div>
```

### Token References

Use `rengeVars` to reference design tokens in your components:

```svelte
<script>
  import { rengeVars } from '@renge-ui/svelte';

  const spacingToken = rengeVars.spacing.md;
  const colorToken = rengeVars.colors.surface;
</script>

<div style="padding: var({spacingToken})">
  Styled with Renge tokens
</div>
```

### Initialize Theme from DOM

If you need to sync the store state with existing DOM attributes at startup:

```svelte
<script>
  import { initializeTheme } from '@renge-ui/svelte';

  // Call during app initialization
  initializeTheme();
</script>
```

## API

### RengeProvider Component

A Svelte component that wraps your app and manages theme initialization.

**Props:**
- `profile` (string, default: `"clear"`) — The color profile to use
- `mode` ("light" | "dark", default: `"light"`) — The color mode

### profile Store

A writable store containing the current color profile name.

```svelte
<script>
  import { profile } from '@renge-ui/svelte';
</script>

<p>{$profile}</p>
```

### mode Store

A writable store containing the current color mode.

```svelte
<script>
  import { mode } from '@renge-ui/svelte';
</script>

<p>{$mode}</p>
```

### switchProfile(name: string)

Change the color profile and update the document root `data-profile` attribute.

```svelte
<script>
  import { switchProfile } from '@renge-ui/svelte';

  switchProfile('earth');
</script>
```

### switchMode(mode: 'light' | 'dark')

Change the color mode and update the document root `data-mode` attribute.

```svelte
<script>
  import { switchMode } from '@renge-ui/svelte';

  switchMode('dark');
</script>
```

### initializeTheme()

Read the current theme from DOM attributes and sync the stores. Useful if theme is set via server-side rendering.

```svelte
<script>
  import { initializeTheme } from '@renge-ui/svelte';

  initializeTheme();
</script>
```

## Theme Switching

When you call `switchProfile()` or `switchMode()`, the stores update and the `data-profile` and `data-mode` attributes are set on the document root. Your Renge tokens use CSS custom properties scoped by these attributes.

## License

MIT
