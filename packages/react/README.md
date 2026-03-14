# @renge/react

React component primitives for the Renge design system. Components consume `@renge/tokens` CSS custom properties via inline styles — no CSS-in-JS runtime, no class names.

## Install

```bash
pnpm add @renge/react
```

## Setup

Wrap your app in `RengeProvider`. It injects the generated CSS variables into `<head>` automatically.

```tsx
import { RengeProvider } from '@renge/react';

function App() {
  return (
    <RengeProvider config={{ profile: 'ocean' }}>
      <YourApp />
    </RengeProvider>
  );
}
```

### Provider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `RengeThemeConfig` | `{}` | Theme configuration (see `@renge/tokens`) |
| `injectCSS` | `boolean` | `true` | Inject CSS into `<head>`. Set `false` for SSR or manual injection. |

---

## Hooks

### `useRenge()`

Returns the current theme and profile from context. Must be used inside `RengeProvider`.

```tsx
const { theme, profile } = useRenge();
// theme.vars['--renge-color-accent']
// theme.css  → full CSS string
// profile    → 'ocean' | 'earth' | 'twilight'
```

### `useRengeTheme(config?)`

Creates a theme without a provider — useful for SSR or static export.

```tsx
const theme = useRengeTheme({ profile: 'twilight' });
// Inject theme.css server-side, or pass to a <style> tag
```

---

## Components

All components use `forwardRef`, accept all standard HTML props for their underlying element, and allow style overrides via the `style` prop. Most support a polymorphic `as` prop to change the rendered element.

### `Stack`

Flexbox layout container.

```tsx
<Stack gap="4" direction="horizontal" align="center" justify="between">
  <Button>Left</Button>
  <Button>Right</Button>
</Stack>
```

| Prop | Type | Default |
|------|------|---------|
| `gap` | `'0'–'10'` | `'3'` |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around'` | `'start'` |
| `as` | `ElementType` | `'div'` |

### `Grid`

CSS Grid layout container.

```tsx
<Grid columns={3} gap="4">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</Grid>
```

| Prop | Type | Default |
|------|------|---------|
| `columns` | `number \| string` | `1` |
| `rows` | `number \| string` | — |
| `gap` | `'0'–'6'` | `'3'` |
| `gapX` | `'0'–'6'` | — |
| `gapY` | `'0'–'6'` | — |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| `justify` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |

### `Text`

Inline or block text with token-driven sizing.

```tsx
<Text size="lg" weight="medium" color="fg-subtle">
  Caption text
</Text>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'base'` |
| `color` | `'fg' \| 'fg-subtle' \| 'fg-muted' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'fg'` |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` | `'normal'` |
| `align` | `'left' \| 'center' \| 'right'` | — |
| `as` | `ElementType` | `'span'` |

### `Heading`

Semantic heading with automatic size defaults per level.

```tsx
<Heading level={1}>Page Title</Heading>
<Heading level={3} size="2xl">Override size</Heading>
```

| Prop | Type | Default |
|------|------|---------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `2` |
| `size` | `'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | auto (level-based) |
| `color` | `'fg' \| 'fg-subtle' \| 'accent'` | `'fg'` |

Default sizes by level: h1→3xl, h2→2xl, h3→xl, h4–h6→lg.

### `Card`

Content container with three visual variants.

```tsx
<Card variant="outlined" padding="5" radius="3">
  Content
</Card>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` |
| `padding` | `'0'–'6'` | `'4'` |
| `radius` | `'none' \| '1'–'5' \| 'full'` | `'3'` |

### `Button`

```tsx
<Button variant="outline" colorScheme="danger" size="sm">
  Delete
</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` |
| `colorScheme` | `'accent' \| 'danger' \| 'success'` | `'accent'` |
| `fullWidth` | `boolean` | `false` |

### `Divider`

```tsx
<Divider spacing="5" />
<Divider orientation="vertical" color="border" />
```

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | `'0'–'6'` | `'3'` |
| `color` | `'border' \| 'border-subtle'` | `'border-subtle'` |

### `Section`

Page section with max-width constraint and auto-centering.

```tsx
<Section maxWidth="lg" paddingY="8">
  <Heading>Welcome</Heading>
</Section>
```

| Prop | Type | Default |
|------|------|---------|
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| 'none'` | `'lg'` |
| `padding` | `'0'–'8'` | — |
| `paddingX` | `'0'–'8'` | `'4'` |
| `paddingY` | `'0'–'8'` | `'6'` |
| `center` | `boolean` | `true` |
| `as` | `ElementType` | `'section'` |

---

## SSR / Static Export

Use `injectCSS={false}` and inject the CSS string server-side:

```tsx
import { createRengeTheme } from '@renge/tokens';

// Server
const theme = createRengeTheme({ profile: 'ocean' });
// Embed theme.css in your HTML <head>

// Client
<RengeProvider config={{ profile: 'ocean' }} injectCSS={false}>
  <App />
</RengeProvider>
```

---

## Development

```bash
pnpm build       # compile to dist/
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
```
