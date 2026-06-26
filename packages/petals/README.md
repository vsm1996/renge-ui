# @renge-ui/petals

**Semantic composition patterns for Renge** — pre-made combinations of tokens for typography, spacing, cards, and UI patterns.

A **petal** is a named group of Renge token values that form a cohesive pattern. Instead of manually composing tokens, petals apply proven combinations that maintain design consistency.

## Why Petals?

Renge tokens are orthogonal — each scale (spacing, color, typography) stands alone. This is powerful for fine-grained control, but it means consumers often compose the same token combinations repeatedly.

Petals bridge that gap:

```js
// Without petals — manual composition
const styles = {
  fontSize: 'var(--renge-font-size-lg)',
  lineHeight: 'var(--renge-line-height-lg)',
};

// With petals — semantic pattern
const styles = petals.typography.bodyLarge.tokens;
```

## Installation

```bash
npm install @renge-ui/petals @renge-ui/tokens
```

Petals depend on `@renge-ui/tokens` for CSS custom property definitions.

## Usage

### Apply a typography petal

```js
import { petals } from '@renge-ui/petals';

const heading = petals.typography.displayLarge;
console.log(heading.tokens);
// {
//   fontSize: 'var(--renge-font-size-4xl)',
//   lineHeight: 'var(--renge-line-height-4xl)',
// }
```

### Use petals in CSS-in-JS

```js
import { petals } from '@renge-ui/petals';

const styles = {
  ...petals.typography.headingMedium.tokens,
  ...petals.spacing.comfortable.tokens,
  color: 'var(--renge-color-fg)',
};
```

### Use petals in Tailwind

```js
// tailwind.config.js
import { petals } from '@renge-ui/petals';

// Reference petals in Tailwind utilities
export default {
  theme: {
    extend: {
      spacing: {
        petal_comfortable: petals.spacing.comfortable.tokens.padding,
      },
    },
  },
};
```

## Petal Categories

### Typography

Eight levels of text styling, each combining font size with line-height:

- **displayLarge** — Hero headline (4xl)
- **displayMedium** — Page title (3xl)
- **headingLarge** — Section heading (2xl)
- **headingMedium** — Subsection (xl)
- **bodyLarge** — Emphasis text (lg)
- **bodyRegular** — Default prose (base)
- **bodySm** — Secondary text (sm)
- **labelXs** — UI labels (xs)

### Spacing

Four levels of internal spacing following the Fibonacci scale:

- **generous** — Maximum breathing room (space-5 + gap-4)
- **comfortable** — Natural spacing (space-4 + gap-3)
- **compact** — Tight spacing (space-3 + gap-2)
- **condensed** — Minimal spacing (space-2 + gap-1)

### Cards

Four surface levels with padding, radius, and shadow hierarchy:

- **surfaceGenerous** — Full-featured (space-5, radius-5, shadow-layer-2)
- **surfaceComfortable** — Standard (space-4, radius-4, shadow-layer-1)
- **surfaceCompact** — Tight (space-3, radius-3, shadow-layer-1)
- **surfaceMinimal** — Subtle (space-2, radius-2, no shadow)

### Interactive

Button and focus patterns with padding, radius, and transitions:

- **buttonLarge** — Primary action
- **buttonMedium** — Standard button
- **buttonSmall** — Compact button
- **focus** — Focus state indicator

### Compositions

Higher-level patterns for complete component styling:

- **textField** — Input field (padding, radius, border, transition)
- **badge** — Compact label (tight padding, full radius, xs text)
- **chip** — Dismissible tag (small padding, full radius, sm text)

## Accessing Petals

### Direct import

```js
import { petals } from '@renge-ui/petals';

petals.typography.displayLarge.tokens;
petals.spacing.comfortable.tokens;
petals.cards.surfaceComfortable.tokens;
```

### Category imports

```js
import { typography, spacing, cards, interactive, compositions } from '@renge-ui/petals';

typography.bodyRegular.tokens;
spacing.compact.tokens;
```

### Full petal structure

Each petal has:

```ts
{
  label: string;           // Display name
  description: string;     // Use case explanation
  tokens: CSSProperties;   // CSS custom property references
}
```

## TypeScript

Petals are fully typed:

```ts
import type { AllPetals, PetalCategory } from '@renge-ui/petals';

// Type-safe petal access
const category: PetalCategory = 'typography';
const petal: AllPetals['typography'] = petals.typography;
```

## Philosophy

Petals are **not** components. They:

- ✅ Compose tokens into semantic patterns
- ✅ Stay framework-agnostic (CSS custom properties)
- ✅ Enable consistent token combinations
- ✅ Document common patterns

They do **not**:

- ❌ Include component logic or markup
- ❌ Prescribe HTML structure
- ❌ Create new colors or spacing values
- ❌ Replace design tokens

Use petals with `@renge-ui/react`, `@renge-ui/svelte`, `@renge-ui/vue`, or any other framework — they're just CSS custom properties.

## License

MIT — see LICENSE in the repository.
