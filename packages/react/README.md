# @renge-ui/react

React component primitives for the Renge design system. Components consume `@renge-ui/tokens` CSS custom properties via inline styles — no CSS-in-JS runtime, no class names.

## Install

```bash
pnpm add @renge-ui/react
```

## Setup

Wrap your app in `RengeProvider`. It injects the generated CSS variables into `<head>` automatically via `useInsertionEffect`.

```tsx
import { RengeProvider } from '@renge-ui/react';

function App() {
  return (
    <RengeProvider config={{ profile: 'ocean', mode: 'light' }}>
      <YourApp />
    </RengeProvider>
  );
}
```

### Provider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `RengeThemeConfig` | `{}` | Theme configuration (see `@renge-ui/tokens`) |
| `injectCSS` | `boolean` | `true` | Inject CSS into `<head>`. Set `false` for SSR or manual injection. |

---

## Hooks

### `useRenge()`

Returns the current theme and profile from context. Must be inside `RengeProvider`.

```tsx
const { theme, profile } = useRenge();
// theme.vars['--renge-color-accent']
// theme.css  → full CSS string
// profile    → 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
```

### `useRengeTheme(config?)`

Creates a theme without a provider — useful for SSR or static export.

```tsx
const theme = useRengeTheme({ profile: 'twilight', mode: 'dark' });
// Inject theme.css server-side, or pass to a <style> tag
```

---

## Components

All components use `forwardRef`, accept all standard HTML props for their underlying element, and allow style overrides via the `style` prop (applied last — overrides always win). Most support a polymorphic `as` prop to change the rendered element.

---

### Layout

#### `Stack`

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

#### `Grid`

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

#### `Section`

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

### Text

#### `Text`

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

#### `Heading`

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

Default sizes: h1→3xl, h2→2xl, h3→xl, h4–h6→lg.

---

### Containers

#### `Card`

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

---

### Interactive

#### `Button`

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

#### `Input`

```tsx
<Input size="md" state="error" fullWidth placeholder="Enter email..." />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `fullWidth` | `boolean` | `false` |

Note: `Input` uses `Omit<ComponentPropsWithoutRef<'input'>, 'size'>` to shadow the native `size: number` attribute with the semantic size prop.

Focus ring is applied via `onFocus`/`onBlur` handlers (inline styles cannot target `:focus-visible`). The outline uses `--renge-color-border-focus`.

#### `Chip`

Small inline tag — dismissible or selectable.

```tsx
<Chip>Design systems</Chip>
```

---

### Status & Decoration

#### `Badge`

Label badge with semantic color variants.

```tsx
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="danger">Deprecated</Badge>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'accent' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral'` | `'neutral'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

#### `Alert`

Alert message with status-driven color.

```tsx
<Alert status="warning">Variance is enabled.</Alert>
```

| Prop | Type | Default |
|------|------|---------|
| `status` | `'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` |

#### `Divider`

```tsx
<Divider spacing="5" />
<Divider orientation="vertical" color="border" />
```

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `spacing` | `'0'–'6'` | `'3'` |
| `color` | `'border' \| 'border-subtle'` | `'border-subtle'` |

#### `Spinner`

Loading indicator. Injects `@keyframes rengeSpinnerSpin` once at module load.

```tsx
<Spinner size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

#### `Progress`

Progress bar.

```tsx
<Progress value={65} size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` (0–100) | `0` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

#### `Avatar`

User avatar with size and shape options.

```tsx
<Avatar src="/photo.jpg" alt="Vanessa" size="lg" shape="circle" />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `shape` | `'circle' \| 'square'` | `'circle'` |

---

### Forms

#### `FormField`

Label + input wrapper with consistent spacing.

```tsx
<FormField label="Email" required>
  <Input placeholder="you@example.com" />
</FormField>
```

#### `Stat`

Metric display with optional trend direction.

```tsx
<Stat label="Active users" value="1,284" trend="up" delta="+12%" />
```

---

### Navigation

#### `Navbar`

Navigation bar primitive. Handles sticky positioning and border.

```tsx
<Navbar sticky border paddingX="5">
  <Logo />
  <Stack direction="horizontal" gap="4">
    <a href="/docs">Docs</a>
  </Stack>
</Navbar>
```

| Prop | Type | Default |
|------|------|---------|
| `sticky` | `boolean` | `false` |
| `border` | `boolean` | `true` |
| `height` | `string` | `'56px'` |
| `paddingX` | `'0'–'8'` | `'5'` |

---

### Experimental

These components are functional but not yet stabilized — APIs may change.

#### `EnergyRing`

Animated pulsing ring. Useful for loading states or ambient indicators.

```tsx
<EnergyRing size={48} rate="slow" color="accent" />
```

#### `Pulse`

Pulsing animation wrapper.

```tsx
<Pulse rate="medium" color="success"><StatusDot /></Pulse>
```

#### `FlowField`

Animated flow-field canvas visualization. Accepts energy intensity and color profile.

---

## SSR / Static Export

Use `injectCSS={false}` and inject the CSS string server-side:

```tsx
import { createRengeTheme } from '@renge-ui/tokens';

// Server — generate CSS for all profiles you need
const theme = createRengeTheme({ profile: 'ocean', mode: 'light' });
// Embed theme.css in your HTML <head>

// Client — match profile to avoid re-injecting
<RengeProvider config={{ profile: 'ocean', mode: 'light' }} injectCSS={false}>
  <App />
</RengeProvider>
```

For multi-profile support (profile switcher), generate CSS for each profile using `data-profile` attribute selectors and inject all of them at build time. See `apps/lib/tokens.ts` in the monorepo for a reference implementation.

---

## Architecture

Components have no opinions about class names, CSS files, or external stylesheets. Every visual decision is an inline `style` referencing a `--renge-*` CSS custom property. This means:

- Components work anywhere the token CSS is injected — React, Remix, Next.js, plain HTML.
- Overrides are always via the `style` prop. No specificity battles.
- Bundle output contains no CSS. Zero style conflicts with your existing stylesheet.

The rendering chain is:

```
createRengeTheme() → theme.css → injected into <head>
       ↓
CSS custom properties on :root
       ↓
Components read var(--renge-*) via inline styles
```

---

## Trade-offs

**No pseudo-class support.** Inline styles cannot target `:hover`, `:focus-visible`, `:disabled`, etc. This is the main limitation of the inline-styles approach. Workarounds:

- Focus rings use `onFocus`/`onBlur` JS handlers (see `Input`).
- Hover states are not currently implemented in primitives — add them via the `style` prop + event handlers in your application layer, or override with a CSS class.

**No class names means no CSS-level overrides.** You can't write `.my-button { ... }` to target a Renge component in a stylesheet. Use the `style` prop or wrap the component and override via a parent selector.

**`Spinner` injects keyframes at module load** via a module-level DOM insertion. This happens once per import, regardless of how many `Spinner` instances are rendered. It is not part of the Renge theme CSS — it lives outside the token system because CSS custom properties cannot animate `transform`.

**Single provider scope.** `RengeProvider` sets one theme for the entire subtree. If you need different themes in different parts of the tree, nest multiple `RengeProvider` instances — but note that the outermost provider's `injectCSS` behavior will apply globally unless scoped via the `selector` config option.

**Experimental components have unstable APIs.** `EnergyRing`, `Pulse`, and `FlowField` are included but not covered by the stability guarantee. Their props will likely change before v1.

---

## Development

```bash
pnpm build       # compile to dist/
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
```
