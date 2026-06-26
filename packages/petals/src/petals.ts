/**
 * Renge Petals — Semantic Token Compositions
 *
 * Petals are pre-made combinations of tokens that form common UI patterns.
 * They compose tokens into semantic units like "card padding" or "headline text"
 * without baking in component-specific logic.
 *
 * Use petals to:
 * - Apply consistent token combinations across projects
 * - Document common patterns (e.g., "compact card" vs "generous card")
 * - Reduce repetition when styling (instead of padding + radius, use compactCard)
 * - Bridge the gap between raw tokens and components
 */

import type { PetalGroup } from './types';

/**
 * Typography Petals
 *
 * Combine font sizes with natural line-height and letter-spacing rhythm.
 * These represent the typographic scale with semantic names.
 */
export const typography: PetalGroup = {
  displayLarge: {
    label: 'Display Large',
    description: 'Hero headline — 4xl size with generous line-height',
    tokens: {
      fontSize: 'var(--renge-font-size-4xl)',
      lineHeight: 'var(--renge-line-height-4xl)',
    },
  },
  displayMedium: {
    label: 'Display Medium',
    description: 'Page title — 3xl size with proportional line-height',
    tokens: {
      fontSize: 'var(--renge-font-size-3xl)',
      lineHeight: 'var(--renge-line-height-3xl)',
    },
  },
  headingLarge: {
    label: 'Heading Large',
    description: 'Section heading — 2xl with breathing room',
    tokens: {
      fontSize: 'var(--renge-font-size-2xl)',
      lineHeight: 'var(--renge-line-height-2xl)',
    },
  },
  headingMedium: {
    label: 'Heading Medium',
    description: 'Subsection — xl with natural rhythm',
    tokens: {
      fontSize: 'var(--renge-font-size-xl)',
      lineHeight: 'var(--renge-line-height-xl)',
    },
  },
  bodyLarge: {
    label: 'Body Large',
    description: 'Comfortable reading text — lg size for emphasis',
    tokens: {
      fontSize: 'var(--renge-font-size-lg)',
      lineHeight: 'var(--renge-line-height-lg)',
    },
  },
  bodyRegular: {
    label: 'Body Regular',
    description: 'Default body text — base size for prose',
    tokens: {
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-base)',
    },
  },
  bodySm: {
    label: 'Body Small',
    description: 'Secondary text — sm size for captions',
    tokens: {
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
  labelXs: {
    label: 'Label XS',
    description: 'UI label — xs size for forms and metadata',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
};

/**
 * Spacing Petals
 *
 * Predefined padding and gap combinations following the Fibonacci scale.
 * Use for consistent internal spacing within components.
 */
export const spacing: PetalGroup = {
  generous: {
    label: 'Generous',
    description: 'Maximum breathing room — space-5',
    tokens: {
      padding: 'var(--renge-space-5)',
      gap: 'var(--renge-space-4)',
    },
  },
  comfortable: {
    label: 'Comfortable',
    description: 'Natural spacing — space-4 with gap-3',
    tokens: {
      padding: 'var(--renge-space-4)',
      gap: 'var(--renge-space-3)',
    },
  },
  compact: {
    label: 'Compact',
    description: 'Tight spacing — space-3 with gap-2',
    tokens: {
      padding: 'var(--renge-space-3)',
      gap: 'var(--renge-space-2)',
    },
  },
  condensed: {
    label: 'Condensed',
    description: 'Minimal spacing — space-2 with gap-1',
    tokens: {
      padding: 'var(--renge-space-2)',
      gap: 'var(--renge-space-1)',
    },
  },
};

/**
 * Card & Surface Petals
 *
 * Complete styling for card surfaces with padding, radius, and shadows.
 * Each surface level has consistent visual hierarchy.
 */
export const cards: PetalGroup = {
  surfaceGenerous: {
    label: 'Surface Generous',
    description: 'Full-featured card — max padding, radius, and shadow',
    tokens: {
      padding: 'var(--renge-space-5)',
      borderRadius: 'var(--renge-radius-5)',
      boxShadow: 'var(--renge-shadow-layer-2)',
    },
  },
  surfaceComfortable: {
    label: 'Surface Comfortable',
    description: 'Standard card — balanced padding and elevation',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-4)',
      boxShadow: 'var(--renge-shadow-layer-1)',
    },
  },
  surfaceCompact: {
    label: 'Surface Compact',
    description: 'Tight card — reduced padding, softer corners',
    tokens: {
      padding: 'var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-3)',
      boxShadow: 'var(--renge-shadow-layer-1)',
    },
  },
  surfaceMinimal: {
    label: 'Surface Minimal',
    description: 'Subtle container — minimal padding, no shadow',
    tokens: {
      padding: 'var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-2)',
      boxShadow: 'none',
    },
  },
};

/**
 * Interactive Petals
 *
 * Styling for interactive elements — buttons, inputs, focus states.
 * Each includes padding, radius, and transition timing.
 */
export const interactive: PetalGroup = {
  buttonLarge: {
    label: 'Button Large',
    description: 'Primary action button — generous padding, prominent radius',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  buttonMedium: {
    label: 'Button Medium',
    description: 'Standard button — balanced padding and radius',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-2)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  buttonSmall: {
    label: 'Button Small',
    description: 'Compact button — minimal padding, subtle corners',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-1)',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  focus: {
    label: 'Focus State',
    description: 'Interactive focus indicator — using shadow and duration',
    tokens: {
      outline: 'none',
      boxShadow: 'var(--renge-shadow-focus)',
      transition: `box-shadow var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
};

/**
 * Composition Petals
 *
 * Higher-level patterns that combine multiple aspects.
 * Use these for entire component patterns.
 */
export const compositions: PetalGroup = {
  textField: {
    label: 'Text Field',
    description: 'Input field styling — padding, radius, border, transition',
    tokens: {
      padding: `var(--renge-space-2) var(--renge-space-3)`,
      borderRadius: 'var(--renge-radius-2)',
      border: '1px solid var(--renge-color-border)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  badge: {
    label: 'Badge',
    description: 'Compact label — tight padding with condensed spacing',
    tokens: {
      padding: `var(--renge-space-1) var(--renge-space-2)`,
      borderRadius: 'var(--renge-radius-full)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  chip: {
    label: 'Chip',
    description: 'Dismissible tag — small padding with focus support',
    tokens: {
      padding: `var(--renge-space-1) var(--renge-space-3)`,
      borderRadius: 'var(--renge-radius-full)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
};

/**
 * All petals — grouped by category for easy discovery
 */
export const petals = {
  typography,
  spacing,
  cards,
  interactive,
  compositions,
};

export type AllPetals = typeof petals;
export type PetalCategory = keyof AllPetals;
