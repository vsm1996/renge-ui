# @renge-ui/react

[![npm version](https://img.shields.io/npm/v/@renge-ui/react)](https://www.npmjs.com/package/@renge-ui/react)
[![license](https://img.shields.io/npm/l/@renge-ui/react)](https://github.com/vsm1996/renge-ui/blob/main/LICENSE.md)

60+ React component primitives for the Renge design system. Components consume `@renge-ui/tokens` CSS custom properties via inline styles — no CSS-in-JS runtime, no class names, no specificity battles.

---

## Install

```bash
pnpm add @renge-ui/react
```

---

## Setup

### Static stylesheet (recommended)

Import the pre-built CSS file once in your root layout. Works with SSR, static export, and any framework.

```tsx
// app/layout.tsx
import '@renge-ui/tokens/renge.css';
import { RengeProvider } from '@renge-ui/react';

export default function Layout({ children }) {
  return (
    <html data-profile="ocean">
      <body>
        <RengeProvider config={{ profile: 'ocean', mode: 'light' }}>
          {children}
        </RengeProvider>
      </body>
    </html>
  );
}
```

### With `@renge-ui/tailwind` plugin (recommended for Tailwind users)

The plugin injects all token CSS at build time — equivalent to the static stylesheet but with Tailwind utility classes included.

```css
/* globals.css */
@import "tailwindcss";
@plugin "@renge-ui/tailwind/plugin";
```

```tsx
// app/layout.tsx
import { RengeProvider } from '@renge-ui/react';

export default function Layout({ children }) {
  return (
    <html data-profile="ocean">
      <body>
        <RengeProvider config={{ profile: 'ocean', mode: 'light' }}>
          {children}
        </RengeProvider>
      </body>
    </html>
  );
}
```

### CSR only (no SSR)

Set `injectCSS` to inject the full CSS string into `<head>` at runtime. Not SSR-safe.

```tsx
import { RengeProvider } from '@renge-ui/react';

function App() {
  return (
    <RengeProvider config={{ profile: 'ocean' }} injectCSS>
      <YourApp />
    </RengeProvider>
  );
}
```

---

## `RengeProvider`

Provides theme context and drives color profile/mode via `data-profile`/`data-mode` attributes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `RengeThemeConfig` | `{}` | Theme configuration — see `@renge-ui/tokens` for all options |
| `injectCSS` | `boolean` | `false` | Inject full theme CSS at runtime. Use for CSR-only apps. `false` syncs `data-profile`/`data-mode` attributes on `<html>` instead |

---

## `RengeStylesheet`

SSR-safe `<style>` tag injection. Use in `<head>` when you want server-generated token CSS without the Tailwind plugin.

```tsx
import { RengeStylesheet } from '@renge-ui/react';

export default function Layout({ children }) {
  return (
    <html>
      <head>
        <RengeStylesheet config={{ profile: 'ocean', mode: 'light' }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `RengeThemeConfig` | `{}` | Passed to `createRengeTheme()` |

---

## Hooks

### `useRenge()`

Returns the current theme, profile, and mode from context. Must be inside `RengeProvider`.

```tsx
const { theme, profile, mode } = useRenge();
// theme.vars['--renge-color-accent']
// theme.css  → full CSS string
// profile    → 'ocean' | 'earth' | 'twilight' | 'fire' | 'void' | 'leaf'
// mode       → 'light' | 'dark'
```

### `useRengeTheme(config?)`

Creates a theme without a provider — useful for SSR or static export.

```tsx
const theme = useRengeTheme({ profile: 'twilight', mode: 'dark' });
// Inject theme.css server-side, or pass to a <style> tag
```

---

## Components

All components:
- Use `forwardRef` and accept all standard HTML props for their underlying element
- Apply `style` last — the `style` prop always wins over component defaults
- Accept a polymorphic `as` prop where noted

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

#### `Container`

Max-width wrapper for centering content.

```tsx
<Container size="lg" px="5">
  {children}
</Container>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` |
| `px` | `'0'–'8'` | `'4'` |

Max widths: `sm` → 640px, `md` → 768px, `lg` → 1024px, `xl` → 1280px, `full` → 100%.

#### `Spacer`

Empty spacer that occupies a token-sized gap in a flex/grid layout.

```tsx
<Stack direction="horizontal">
  <Logo />
  <Spacer />
  <NavLinks />
</Stack>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'1'–'10'` | — (fills available space) |
| `axis` | `'horizontal' \| 'vertical'` | auto-detected from flex context |

#### `AspectRatio`

Constrains children to a fixed aspect ratio.

```tsx
<AspectRatio ratio={16 / 9}>
  <img src="..." />
</AspectRatio>
```

Default `ratio` is PHI (1.618). Pass any number.

| Prop | Type | Default |
|------|------|---------|
| `ratio` | `number` | `1.618` (φ) |

---

### Typography

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

Default sizes: h1 → 3xl · h2 → 2xl · h3 → xl · h4–h6 → lg.

#### `Anchor`

Styled link with underline and color variants.

```tsx
<Anchor href="/docs" variant="default">Read the docs</Anchor>
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'default' \| 'subtle' \| 'plain'` | `'default'` |

`default` — underline on hover, accent color · `subtle` — muted color, underline on hover · `plain` — no decoration, inherits color.

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
<Button variant="outline" colorScheme="danger" size="sm">Delete</Button>
<Button fullWidth loading>Saving...</Button>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` |
| `colorScheme` | `'accent' \| 'danger' \| 'success'` | `'accent'` |
| `fullWidth` | `boolean` | `false` |

#### `IconButton`

Square button for icon-only actions. Requires an accessible `aria-label`.

```tsx
<IconButton aria-label="Close" size="sm" variant="ghost">
  <XIcon />
</IconButton>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'ghost'` |
| `colorScheme` | `'accent' \| 'danger' \| 'success' \| 'neutral'` | `'neutral'` |

#### `ButtonGroup` / `ButtonGroupItem`

Groups related buttons with flush borders between them.

```tsx
<ButtonGroup>
  <ButtonGroupItem>
    <Button variant="outline">Day</Button>
  </ButtonGroupItem>
  <ButtonGroupItem>
    <Button variant="outline">Week</Button>
  </ButtonGroupItem>
</ButtonGroup>
```

| Prop | Type | Default |
|------|------|---------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` |

#### `CopyButton`

Button that copies a value to the clipboard and shows a confirmation state.

```tsx
<CopyButton value="pnpm add @renge-ui/tokens" label="Copy" timeout={2000} />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | required |
| `label` | `string` | `'Copy'` |
| `timeout` | `number` (ms) | `2000` |
| `onCopy` | `(value: string) => void` | — |

#### `Input`

```tsx
<Input size="md" state="error" fullWidth placeholder="Enter email..." />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `fullWidth` | `boolean` | `false` |

Note: uses `Omit<ComponentPropsWithoutRef<'input'>, 'size'>` — the native `size` attribute is replaced by the semantic size prop.

#### `Select`

Styled native `<select>` element.

```tsx
<Select size="md" state="default" fullWidth>
  <option value="ocean">Ocean</option>
  <option value="earth">Earth</option>
</Select>
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `fullWidth` | `boolean` | `false` |

#### `Textarea`

Multi-line text input.

```tsx
<Textarea size="md" state="default" fullWidth placeholder="Notes..." />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `fullWidth` | `boolean` | `false` |

Min heights: `sm` → 80px · `md` → 120px · `lg` → 200px.

#### `Checkbox`

```tsx
<Checkbox label="Accept terms" size="md" />
<Checkbox indeterminate />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `label` | `string` | — |
| `indeterminate` | `boolean` | `false` |

Injects `@keyframes` for the check animation once at module load.

#### `Radio` / `RadioGroup`

```tsx
<RadioGroup value={plan} onChange={setPlan} defaultValue="pro">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>
```

**`RadioGroup` props:**

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | — |
| `defaultValue` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled` | `boolean` | `false` |

**`Radio` props:**

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | required |
| `label` | `string` | — |
| `size` | `'sm' \| 'md' \| 'lg'` | inherited from group |

The inner dot is sized at `outer / φ` — the golden proportion is visible in every instance.

#### `Switch`

Toggle switch. Track width:height ratio ≈ φ:1.

```tsx
<Switch label="Dark mode" labelPosition="right" />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `label` | `string` | — |
| `labelPosition` | `'left' \| 'right'` | `'right'` |

#### `Slider`

Range input with optional φ-marker lines and value display.

```tsx
<Slider min={0} max={100} defaultValue={61.8} showPhiMarkers showValue label="Scale" />
```

| Prop | Type | Default |
|------|------|---------|
| `showPhiMarkers` | `boolean` | `false` |
| `showValue` | `boolean` | `false` |
| `label` | `string` | — |
| `min` | `number` | `0` |
| `max` | `number` | `100` |

`showPhiMarkers` draws marker lines at 0.382 and 0.618 of the range.

---

### Forms

#### `FormField`

Label + input wrapper with consistent spacing and error state.

```tsx
<FormField label="Email" required>
  <Input placeholder="you@example.com" />
</FormField>
```

---

### Navigation

#### `Navbar`

Navigation bar primitive with sticky positioning and border.

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

#### `Tabs` / `TabList` / `Tab` / `TabPanel`

Accessible tab interface using controlled or uncontrolled value.

```tsx
<Tabs value={activeTab} onChange={setActiveTab}>
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="tokens">Tokens</Tab>
  </TabList>
  <TabPanel value="overview">Overview content</TabPanel>
  <TabPanel value="tokens">Token content</TabPanel>
</Tabs>
```

**`Tabs` props:**

| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | — (uncontrolled) |
| `defaultValue` | `string` | — |
| `onChange` | `(id: string) => void` | — |

#### `Breadcrumb` / `BreadcrumbItem`

```tsx
<Breadcrumb separator="/">
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem>Tokens</BreadcrumbItem>
</Breadcrumb>
```

**`Breadcrumb` props:**

| Prop | Type | Default |
|------|------|---------|
| `separator` | `ReactNode` | `'/'` |

#### `Pagination`

Page number controls.

```tsx
<Pagination total={120} page={currentPage} onChange={setPage} />
```

| Prop | Type | Default |
|------|------|---------|
| `total` | `number` | required |
| `page` | `number` | required |
| `onChange` | `(page: number) => void` | required |
| `pageSize` | `number` | `10` |

---

### Data Display

#### `Table` / `TableHead` / `TableBody` / `TableFoot` / `TableRow` / `TableHeader` / `TableCell`

```tsx
<Table striped hoverable>
  <TableHead>
    <TableRow>
      <TableHeader>Token</TableHeader>
      <TableHeader>Value</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>--renge-space-4</TableCell>
      <TableCell>20px</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**`Table` props:**

| Prop | Type | Default |
|------|------|---------|
| `striped` | `boolean` | `false` |
| `hoverable` | `boolean` | `false` |

#### `Tooltip`

Floating label shown on hover/focus.

```tsx
<Tooltip content="Copy to clipboard" placement="top">
  <Button>Copy</Button>
</Tooltip>
```

| Prop | Type | Default |
|------|------|---------|
| `content` | `ReactNode` | required |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

Note: uses `Omit<ComponentPropsWithoutRef<'div'>, 'content'>` — the native `content` attribute is replaced.

#### `Accordion` / `AccordionItem`

Collapsible sections. Supports single or multiple open items.

```tsx
<Accordion multiple defaultOpen={['setup']}>
  <AccordionItem id="setup" title="Setup">
    Installation details...
  </AccordionItem>
  <AccordionItem id="usage" title="Usage" disabled>
    Coming soon
  </AccordionItem>
</Accordion>
```

**`Accordion` props:**

| Prop | Type | Default |
|------|------|---------|
| `multiple` | `boolean` | `false` |
| `defaultOpen` | `string \| string[]` | — |

**`AccordionItem` props:**

| Prop | Type | Default |
|------|------|---------|
| `id` | `string` | required |
| `title` | `ReactNode` | required |
| `disabled` | `boolean` | `false` |

#### `Timeline` / `TimelineItem`

Vertical sequence of events.

```tsx
<Timeline>
  <TimelineItem status="completed" icon={<CheckIcon />}>First step done</TimelineItem>
  <TimelineItem status="active">In progress</TimelineItem>
  <TimelineItem status="pending">Upcoming</TimelineItem>
</Timeline>
```

**`TimelineItem` props:**

| Prop | Type | Default |
|------|------|---------|
| `status` | `'completed' \| 'active' \| 'pending'` | `'pending'` |
| `icon` | `ReactNode` | — |

#### `Skeleton`

Loading placeholder with three shape variants.

```tsx
<Skeleton variant="text" style={{ width: 200 }} />
<Skeleton variant="circular" style={{ width: 40, height: 40 }} />
<Skeleton variant="rectangular" style={{ width: '100%', height: 120 }} />
```

| Prop | Type | Default |
|------|------|---------|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` |

Injects the shimmer `@keyframes` once at module load.

#### `Stat`

Metric display with optional trend direction.

```tsx
<Stat label="Active users" value="1,284" trend="up" delta="+12%" />
```

| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | required |
| `value` | `string \| number` | required |
| `trend` | `'up' \| 'down' \| 'neutral'` | — |
| `delta` | `string` | — |

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

#### `Avatar`

User avatar with fallback initials.

```tsx
<Avatar src="/photo.jpg" alt="Vanessa" size="lg" shape="circle" />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `shape` | `'circle' \| 'square'` | `'circle'` |

#### `Chip`

Small inline tag — dismissible or selectable.

```tsx
<Chip>Design systems</Chip>
<Chip onRemove={() => {}}>Removable</Chip>
```

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

Loading indicator.

```tsx
<Spinner size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

Injects `@keyframes rengeSpinnerSpin` once at module load.

#### `Progress`

Progress bar.

```tsx
<Progress value={65} size="md" />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` (0–100) | `0` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |

---

### Feedback

#### `Modal` / `ModalHeader` / `ModalBody` / `ModalFooter`

Accessible dialog rendered via `createPortal`. Requires `'use client'`.

```tsx
<Modal open={isOpen} onClose={() => setOpen(false)} size="md">
  <ModalHeader>Confirm action</ModalHeader>
  <ModalBody>Are you sure you want to delete this?</ModalBody>
  <ModalFooter>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button colorScheme="danger">Delete</Button>
  </ModalFooter>
</Modal>
```

**`Modal` props:**

| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` |
| `closeOnOverlayClick` | `boolean` | `true` |

#### `ToastProvider` / `useToast`

Global toast notification system rendered via `createPortal`. Wrap your app in `ToastProvider`, then call `useToast()` anywhere inside.

```tsx
// layout.tsx
import { ToastProvider } from '@renge-ui/react';

export default function Layout({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}
```

```tsx
// anywhere inside ToastProvider
import { useToast } from '@renge-ui/react';

function SaveButton() {
  const toast = useToast();

  return (
    <Button onClick={() => toast({ title: 'Saved', status: 'success', duration: 3000 })}>
      Save
    </Button>
  );
}
```

**`useToast()` returns a function** with signature:

```ts
toast(options: ToastOptions): void
```

**`ToastOptions`:**

| Field | Type | Default |
|-------|------|---------|
| `title` | `string` | required |
| `description` | `string` | — |
| `status` | `'default' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| `duration` | `number` (ms) | `5000` |
| `id` | `string` | auto-generated |

Pass `duration: null` to make the toast persist until dismissed.

---

### Input & Selection

#### `Combobox`

Searchable dropdown with filtering, richer than a native select.

```tsx
<Combobox 
  options={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Search frameworks..."
/>
```

| Prop | Type | Default |
|------|------|---------|
| `options` | `Array<{ label: string; value: string }>` | `[]` |
| `value` | `string` | — |
| `onChange` | `(value: string) => void` | — |
| `placeholder` | `string` | — |
| `isOpen` | `boolean` | — |
| `onOpenChange` | `(open: boolean) => void` | — |

#### `MultiSelect`

Select multiple values from a list. Renders selected values as removable tags.

```tsx
<MultiSelect
  options={[{ label: 'Option 1', value: '1' }]}
  values={selected}
  onChange={setSelected}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `options` | `Array<{ label: string; value: string }>` | `[]` |
| `values` | `string[]` | `[]` |
| `onChange` | `(values: string[]) => void` | — |

#### `TagInput`

Controlled tag input for adding/removing tags. Press Enter or comma to add.

```tsx
<TagInput
  tags={tags}
  onChange={setTags}
  placeholder="Add tags..."
/>
```

| Prop | Type | Default |
|------|------|---------|
| `tags` | `string[]` | `[]` |
| `onChange` | `(tags: string[]) => void` | — |
| `placeholder` | `string` | `'Add tags...'` |

#### `NumberInput`

Controlled number input with increment/decrement buttons.

```tsx
<NumberInput
  value={count}
  onChange={setCount}
  min={0}
  max={100}
  step={1}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | — |
| `onChange` | `(value: number) => void` | — |
| `min` | `number` | — |
| `max` | `number` | — |
| `step` | `number` | `1` |

#### `DatePicker`

Calendar-based date picker with month/year navigation.

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  min="2024-01-01"
  max="2025-12-31"
/>
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `string (YYYY-MM-DD)` | — |
| `onChange` | `(value: string) => void` | — |
| `min` | `string` | — |
| `max` | `string` | — |

---

### Popovers & Menus

#### `Popover`

Positioned floating content — richer than Tooltip, appears on click. Supports all four sides.

```tsx
<Popover
  trigger={<Button>Open</Button>}
  content={<div>Popover content</div>}
  side="bottom"
/>
```

| Prop | Type | Default |
|------|------|---------|
| `trigger` | `ReactNode` | — |
| `content` | `ReactNode` | — |
| `isOpen` | `boolean` | — |
| `onOpenChange` | `(open: boolean) => void` | — |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'` |

#### `DropdownMenu`

Dropdown menu with trigger + list of items. Closes on selection.

```tsx
<DropdownMenu
  trigger={<Button>Menu</Button>}
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `trigger` | `ReactNode` | — |
| `items` | `Array<{ label: string; onClick?: () => void }>` | `[]` |
| `isOpen` | `boolean` | — |
| `onOpenChange` | `(open: boolean) => void` | — |

#### `ContextMenu`

Right-click menu. Returns menu items on context event.

```tsx
<ContextMenu items={[{ label: 'Copy', onClick: handleCopy }]}>
  <div>Right-click me</div>
</ContextMenu>
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `Array<{ label: string; onClick?: () => void }>` | `[]` |
| `children` | `ReactNode` | — |

#### `CommandPalette`

Keyboard-first command menu. Arrow keys navigate, Enter selects, Escape closes.

```tsx
<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  items={[
    { id: '1', label: 'Save', description: 'Ctrl+S', onSelect: save },
    { id: '2', label: 'Open', description: 'Ctrl+O', onSelect: open },
  ]}
  placeholder="Type a command..."
/>
```

| Prop | Type | Default |
|------|------|---------|
| `items` | `CommandItem[]` | `[]` |
| `isOpen` | `boolean` | — |
| `onClose` | `() => void` | — |
| `placeholder` | `string` | `'Type a command...'` |

#### `HoverCard`

Similar to Popover but triggers on hover instead of click. Non-interactive content only.

```tsx
<HoverCard
  trigger={<Button>Hover me</Button>}
  content={<div>Card content</div>}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `trigger` | `ReactNode` | — |
| `content` | `ReactNode` | — |

---

### Drawers & Overlays

#### `Drawer`

Slide-in panel from any edge. Locks scroll on body.

```tsx
<Drawer
  isOpen={open}
  onClose={() => setOpen(false)}
  side="right"
>
  Drawer content
</Drawer>
```

| Prop | Type | Default |
|------|------|---------|
| `isOpen` | `boolean` | — |
| `onClose` | `() => void` | — |
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| `children` | `ReactNode` | — |

---

### Progress & Steps

#### `Stepper`

Multi-step process indicator with optional descriptions.

```tsx
<Stepper
  steps={[
    { label: 'Details', description: 'Enter your info' },
    { label: 'Payment', description: 'Add payment method' },
    { label: 'Confirm', description: 'Review and submit' },
  ]}
  currentStep={current}
  onStepChange={setCurrent}
/>
```

| Prop | Type | Default |
|------|------|---------|
| `steps` | `Array<{ label: string; description?: string }>` | required |
| `currentStep` | `number` | `0` |
| `onStepChange` | `(step: number) => void` | — |

---

### Display & Content

#### `CodeBlock`

Displays code in a styled pre/code block. Supports inline mode.

```tsx
<CodeBlock code={`const x = 1;`} language="typescript" />
<CodeBlock code="npm install" inline />
```

| Prop | Type | Default |
|------|------|---------|
| `code` | `string` | — |
| `language` | `string` | — |
| `inline` | `boolean` | `false` |

#### `ScrollArea`

Custom scrollbar styling with smooth scroll behavior.

```tsx
<ScrollArea style={{ height: 300 }}>
  {/* Long content here */}
</ScrollArea>
```

Styled scrollbar with Renge colors. Full CSS custom property support.

#### `KBD`

Displays keyboard shortcuts in a styled kbd element.

```tsx
<KBD keys={['Ctrl', 'K']} />
// or
<KBD>Ctrl+K</KBD>
```

| Prop | Type | Default |
|------|------|---------|
| `keys` | `string[]` | — |

#### `Rating`

Star rating input. Displays filled/empty stars.

```tsx
<Rating value={rating} onChange={setRating} max={5} />
<Rating value={3} readonly />
```

| Prop | Type | Default |
|------|------|---------|
| `value` | `number` | `0` |
| `onChange` | `(value: number) => void` | — |
| `max` | `number` | `5` |
| `readonly` | `boolean` | `false` |

---

### Accessibility Utilities

#### `VisuallyHidden`

Screen reader-only content. Hidden from visual display but available to assistive tech.

```tsx
<VisuallyHidden>Skip to main content</VisuallyHidden>
```

No props. Standard HTML attributes apply.

#### `SkipLink`

Keyboard-accessible skip-to-main-content link. Appears on focus.

```tsx
<SkipLink href="#main" label="Skip to main content" />
```

| Prop | Type | Default |
|------|------|---------|
| `href` | `string` | `'#main'` |
| `label` | `string` | `'Skip to main content'` |

---

### Experimental

These components are functional but not yet stabilized — APIs may change before v1.

#### `EnergyRing`

Animated pulsing ring useful for loading states or ambient indicators.

```tsx
<EnergyRing size={48} rate="slow" color="accent" />
```

#### `Pulse`

Pulsing animation wrapper.

```tsx
<Pulse rate="medium" color="success"><StatusDot /></Pulse>
```

#### `FlowField`

Animated flow-field canvas visualization.

---

## Architecture

Components have no opinions about class names or external stylesheets. Every visual decision is an inline `style` referencing a `--renge-*` CSS custom property.

- Components work anywhere the token CSS is injected — Next.js, Remix, Vite, plain HTML.
- Overrides via `style` prop always win. No specificity battles.
- Zero CSS in the bundle. No style conflicts with your existing stylesheet.

```
createRengeTheme() → theme.css → injected into <head>
       ↓
--renge-* CSS custom properties on :root / [data-profile]
       ↓
Components read var(--renge-*) via inline styles
```

---

## Trade-offs

**No pseudo-class support.** Inline styles cannot target `:hover`, `:focus-visible`, `:disabled`. Focus rings use `onFocus`/`onBlur` JS handlers. Hover states must be added via the `style` prop + event handlers in your application layer, or via a parent CSS selector.

**No CSS-level overrides.** You cannot write `.my-button { ... }` in a stylesheet to target a Renge component. Use the `style` prop or a wrapper element.

**`Spinner`, `Checkbox`, `Skeleton`, `Tooltip`, `Slider` inject `@keyframes`** at module load via a module-level DOM insertion — once per import, not once per instance.

**`Toast` and `Modal` require `'use client'`** (they use `createPortal`, `useState`, and browser APIs).

**Experimental components** (`EnergyRing`, `Pulse`, `FlowField`) are not covered by the stability guarantee.

---

## Development

```bash
pnpm build       # compile to dist/ (CJS + ESM + .d.ts)
pnpm dev         # watch mode
pnpm typecheck   # tsc --noEmit
```

---

*Part of the [Renge design system](https://renge-ui.vercel.app). Built by Soka Labs. Proportion as a first principle.*
