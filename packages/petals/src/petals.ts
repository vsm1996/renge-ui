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
    description: 'Keyboard focus ring — 3px accent glow via color-mix, WCAG-compliant',
    tokens: {
      outline: 'none',
      boxShadow: 'var(--renge-shadow-focus)',
      transition: `box-shadow var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  hoverSurface: {
    label: 'Hover Surface',
    description: 'Subtle background shift on pointer entry — bg-subtle with ease-out',
    tokens: {
      background: 'var(--renge-color-bg-subtle)',
      transition: `background var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  activeSurface: {
    label: 'Active Surface',
    description: 'Pressed/active state background — bg-muted, slightly deeper than hover',
    tokens: {
      background: 'var(--renge-color-bg-muted)',
      transition: `background var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  interactiveBase: {
    label: 'Interactive Base',
    description: 'Full set of interaction state transitions — background, box-shadow, and transform with Renge easing',
    tokens: {
      transition: `background var(--renge-duration-1) var(--renge-easing-ease-out), box-shadow var(--renge-duration-2) var(--renge-easing-ease-out), transform var(--renge-duration-1) var(--renge-easing-spring)`,
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
  heroSection: {
    label: 'Hero Layout',
    description: 'Large-viewport landing section — generous vertical padding with centered content max-width',
    tokens: {
      paddingTop: 'var(--renge-space-8)',
      paddingBottom: 'var(--renge-space-8)',
      paddingLeft: 'var(--renge-space-5)',
      paddingRight: 'var(--renge-space-5)',
      maxWidth: 'var(--renge-container-lg)',
    },
  },
  statGrid: {
    label: 'Stat Grid',
    description: '2–4 metric grid — gap derived from Fibonacci with comfortable card padding',
    tokens: {
      display: 'grid',
      gap: 'var(--renge-space-5)',
      padding: 'var(--renge-space-4)',
    },
  },
  formSection: {
    label: 'Form Section',
    description: 'Vertical-rhythm form layout — label group → inputs → submit with PHI-spaced gap',
    tokens: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--renge-space-5)',
      padding: 'var(--renge-space-5)',
    },
  },
  dataRow: {
    label: 'Data Row',
    description: 'Label + value pair for detail views — horizontal layout with tight vertical padding',
    tokens: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 'var(--renge-space-4)',
      paddingTop: 'var(--renge-space-3)',
      paddingBottom: 'var(--renge-space-3)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
    },
  },
};

/**
 * Alert Petals
 *
 * Semantic feedback containers. Each carries its own color, border,
 * and background — all from design tokens. Paste onto a container
 * for instant semantic meaning.
 */
export const alerts: PetalGroup = {
  success: {
    label: 'Alert — Success',
    description: 'Positive feedback container — success border with subtle fill',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1px solid var(--renge-color-success)',
      backgroundColor: 'var(--renge-color-success-subtle)',
      color: 'var(--renge-color-fg)',
    },
  },
  warning: {
    label: 'Alert — Warning',
    description: 'Caution container — warning border with subtle fill',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1px solid var(--renge-color-warning)',
      backgroundColor: 'var(--renge-color-warning-subtle)',
      color: 'var(--renge-color-fg)',
    },
  },
  danger: {
    label: 'Alert — Danger',
    description: 'Error container — danger border with subtle fill',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1px solid var(--renge-color-danger)',
      backgroundColor: 'var(--renge-color-danger-subtle)',
      color: 'var(--renge-color-fg)',
    },
  },
  info: {
    label: 'Alert — Info',
    description: 'Informational container — info border with subtle fill',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1px solid var(--renge-color-info)',
      backgroundColor: 'var(--renge-color-info-subtle)',
      color: 'var(--renge-color-fg)',
    },
  },
  neutral: {
    label: 'Alert — Neutral',
    description: 'Default notification container — subtle border and background',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1px solid var(--renge-color-border)',
      backgroundColor: 'var(--renge-color-bg-subtle)',
      color: 'var(--renge-color-fg)',
    },
  },
};

/**
 * Navigation Petals
 *
 * Token compositions for nav bars, menus, tabs, breadcrumbs, and pagination.
 * Each encodes the spacing, typography, and transition timing appropriate
 * for interactive navigation elements.
 */
export const navigation: PetalGroup = {
  navbarRoot: {
    label: 'Navbar Root',
    description: 'Top navigation bar — horizontal padding and bottom border',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-5)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      backgroundColor: 'var(--renge-color-bg)',
    },
  },
  navItem: {
    label: 'Nav Item',
    description: 'Navigation link — compact padding with transition',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-2)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  navItemActive: {
    label: 'Nav Item — Active',
    description: 'Active navigation state — accent background and color',
    tokens: {
      backgroundColor: 'var(--renge-color-accent-subtle)',
      color: 'var(--renge-color-accent)',
    },
  },
  menuItem: {
    label: 'Menu Item',
    description: 'Vertical menu entry — comfortable padding with hover transition',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-2)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
      color: 'var(--renge-color-fg)',
      transition: `background-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  menuItemActive: {
    label: 'Menu Item — Active',
    description: 'Selected menu entry — accent background and color',
    tokens: {
      backgroundColor: 'var(--renge-color-accent-subtle)',
      color: 'var(--renge-color-accent)',
    },
  },
  tabItem: {
    label: 'Tab Item',
    description: 'Tab trigger — bottom border indicator with transition',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-4)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
      borderBottom: '2px solid transparent',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  tabItemActive: {
    label: 'Tab Item — Active',
    description: 'Active tab — accent underline and color',
    tokens: {
      borderBottomColor: 'var(--renge-color-accent)',
      color: 'var(--renge-color-accent)',
    },
  },
  breadcrumbItem: {
    label: 'Breadcrumb Item',
    description: 'Path segment — condensed typography in subdued color',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
    },
  },
  paginationItem: {
    label: 'Pagination Item',
    description: 'Page number button — square minimum touch target with transition',
    tokens: {
      padding: 'var(--renge-space-2)',
      minWidth: 'var(--renge-min-w-4)',
      borderRadius: 'var(--renge-radius-2)',
      fontSize: 'var(--renge-font-size-sm)',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  paginationItemActive: {
    label: 'Pagination Item — Active',
    description: 'Current page — accent background with inverse text',
    tokens: {
      backgroundColor: 'var(--renge-color-accent)',
      color: 'var(--renge-color-fg-inverse)',
    },
  },
  bottomNavItem: {
    label: 'Bottom Nav Item',
    description: 'Mobile bottom tab — generous touch target, subdued color',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
      transition: `color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  stepsItem: {
    label: 'Steps Item',
    description: 'Step indicator label — condensed type beside progress node',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
      gap: 'var(--renge-space-2)',
    },
  },
};

/**
 * Overlay Petals
 *
 * Elements that float above the document flow — modals, drawers, dropdowns,
 * tooltips, and popovers. All include z-index tokens for predictable stacking.
 */
export const overlay: PetalGroup = {
  modalBackdrop: {
    label: 'Modal Backdrop',
    description: 'Dimming overlay behind modals — inverse surface color',
    tokens: {
      backgroundColor: 'var(--renge-color-bg-inverse)',
      zIndex: 'var(--renge-zindex-modal)',
    },
  },
  modalContainer: {
    label: 'Modal Container',
    description: 'Dialog surface — elevated card with generous padding',
    tokens: {
      padding: 'var(--renge-space-6)',
      borderRadius: 'var(--renge-radius-4)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-3)',
      zIndex: 'var(--renge-zindex-modal)',
    },
  },
  modalHeader: {
    label: 'Modal Header',
    description: 'Dialog title area — bottom border separating from body',
    tokens: {
      padding: 'var(--renge-space-4) var(--renge-space-6)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      fontSize: 'var(--renge-font-size-lg)',
      lineHeight: 'var(--renge-line-height-lg)',
    },
  },
  modalFooter: {
    label: 'Modal Footer',
    description: 'Dialog action area — top border separating from body',
    tokens: {
      padding: 'var(--renge-space-4) var(--renge-space-6)',
      borderTop: '1px solid var(--renge-color-border-subtle)',
      gap: 'var(--renge-space-3)',
    },
  },
  drawerPanel: {
    label: 'Drawer Panel',
    description: 'Slide-in panel — full-height surface with heavy elevation',
    tokens: {
      padding: 'var(--renge-space-5)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-3)',
      zIndex: 'var(--renge-zindex-modal)',
    },
  },
  dropdownMenu: {
    label: 'Dropdown Menu',
    description: 'Floating menu container — card surface with tight inner padding',
    tokens: {
      padding: 'var(--renge-space-1)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      border: '1px solid var(--renge-color-border-subtle)',
      zIndex: 'var(--renge-zindex-dropdown)',
    },
  },
  dropdownItem: {
    label: 'Dropdown Item',
    description: 'Menu list entry — compact padding with hover transition',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-2)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
      transition: `background-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  tooltip: {
    label: 'Tooltip',
    description: 'Small informational bubble — inverse surface, condensed type',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-1)',
      backgroundColor: 'var(--renge-color-bg-inverse)',
      color: 'var(--renge-color-fg-inverse)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      boxShadow: 'var(--renge-shadow-layer-1)',
      zIndex: 'var(--renge-zindex-toast)',
    },
  },
  popover: {
    label: 'Popover',
    description: 'Rich floating content — card surface with comfortable padding',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      border: '1px solid var(--renge-color-border-subtle)',
      zIndex: 'var(--renge-zindex-dropdown)',
    },
  },
};

/**
 * Form Petals
 *
 * Token compositions for form controls beyond text inputs — checkboxes,
 * radios, toggles, range sliders, selects, textareas, and file inputs.
 */
export const forms: PetalGroup = {
  checkbox: {
    label: 'Checkbox',
    description: 'Square form control — compact sizing with subtly rounded corners',
    tokens: {
      width: 'var(--renge-h-4)',
      height: 'var(--renge-h-4)',
      borderRadius: 'var(--renge-radius-1)',
      border: '1.5px solid var(--renge-color-border)',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  checkboxChecked: {
    label: 'Checkbox — Checked',
    description: 'Active checkbox state — accent fill and border',
    tokens: {
      backgroundColor: 'var(--renge-color-accent)',
      borderColor: 'var(--renge-color-accent)',
    },
  },
  radio: {
    label: 'Radio Button',
    description: 'Circular form control — compact sizing with full radius',
    tokens: {
      width: 'var(--renge-h-4)',
      height: 'var(--renge-h-4)',
      borderRadius: 'var(--renge-radius-full)',
      border: '1.5px solid var(--renge-color-border)',
      transition: `all var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  radioChecked: {
    label: 'Radio Button — Checked',
    description: 'Active radio state — accent outer ring with inset dot',
    tokens: {
      borderColor: 'var(--renge-color-accent)',
      boxShadow: 'inset 0 0 0 3px var(--renge-color-accent)',
    },
  },
  toggle: {
    label: 'Toggle Track',
    description: 'Switch track — pill wider than tall, PHI-proportioned',
    tokens: {
      width: 'var(--renge-h-8)',
      height: 'var(--renge-h-4)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
      transition: `background-color var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  toggleActive: {
    label: 'Toggle Track — Active',
    description: 'On state for the switch track — accent fill',
    tokens: {
      backgroundColor: 'var(--renge-color-accent)',
    },
  },
  toggleThumb: {
    label: 'Toggle Thumb',
    description: 'Switch handle — circle that slides within the track',
    tokens: {
      width: 'var(--renge-h-3)',
      height: 'var(--renge-h-3)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-1)',
      transition: `transform var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  rangeTrack: {
    label: 'Range Track',
    description: 'Slider rail — thin pill on muted background',
    tokens: {
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
    },
  },
  rangeFill: {
    label: 'Range Fill',
    description: 'Filled portion of slider track — accent color',
    tokens: {
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
    },
  },
  rangeThumb: {
    label: 'Range Thumb',
    description: 'Slider handle — elevated circle with focus shadow support',
    tokens: {
      width: 'var(--renge-h-5)',
      height: 'var(--renge-h-5)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
      boxShadow: 'var(--renge-shadow-layer-1)',
      transition: `box-shadow var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  select: {
    label: 'Select',
    description: 'Dropdown select — textField base with explicit background',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-2)',
      border: '1px solid var(--renge-color-border)',
      backgroundColor: 'var(--renge-color-bg)',
      fontSize: 'var(--renge-font-size-base)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  textarea: {
    label: 'Textarea',
    description: 'Multi-line text area — textField base with minimum height',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      borderRadius: 'var(--renge-radius-2)',
      border: '1px solid var(--renge-color-border)',
      minHeight: 'var(--renge-h-8)',
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-base)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  fileInput: {
    label: 'File Input',
    description: 'File upload target — dashed border drop zone',
    tokens: {
      padding: 'var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      border: '1.5px dashed var(--renge-color-border)',
      backgroundColor: 'var(--renge-color-bg-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      transition: `all var(--renge-duration-2) var(--renge-easing-ease-out)`,
    },
  },
  fileInputActive: {
    label: 'File Input — Drag Active',
    description: 'File drop zone while dragging — accent border and background',
    tokens: {
      border: '1.5px dashed var(--renge-color-accent)',
      backgroundColor: 'var(--renge-color-accent-subtle)',
    },
  },
  rating: {
    label: 'Rating',
    description: 'Filled star rating item — warning color',
    tokens: {
      color: 'var(--renge-color-warning)',
      fontSize: 'var(--renge-font-size-xl)',
      lineHeight: 'var(--renge-line-height-xl)',
      transition: `color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  ratingEmpty: {
    label: 'Rating — Empty',
    description: 'Unfilled star — muted color',
    tokens: {
      color: 'var(--renge-color-bg-muted)',
      fontSize: 'var(--renge-font-size-xl)',
      lineHeight: 'var(--renge-line-height-xl)',
    },
  },
};

/**
 * Feedback Petals
 *
 * Loading states, progress indicators, skeletons, and toast notifications.
 * These represent UI state rather than content.
 */
export const feedback: PetalGroup = {
  skeleton: {
    label: 'Skeleton',
    description: 'Block loading placeholder — muted background for shapes',
    tokens: {
      backgroundColor: 'var(--renge-color-bg-muted)',
      borderRadius: 'var(--renge-radius-2)',
    },
  },
  skeletonText: {
    label: 'Skeleton Text',
    description: 'Inline text placeholder — pill shape matching body line-height',
    tokens: {
      backgroundColor: 'var(--renge-color-bg-muted)',
      borderRadius: 'var(--renge-radius-full)',
      height: 'var(--renge-h-3)',
    },
  },
  skeletonAvatar: {
    label: 'Skeleton Avatar',
    description: 'Circular avatar placeholder',
    tokens: {
      width: 'var(--renge-h-8)',
      height: 'var(--renge-h-8)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
    },
  },
  progressTrack: {
    label: 'Progress Track',
    description: 'Progress bar rail — thin muted pill',
    tokens: {
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
    },
  },
  progressFill: {
    label: 'Progress Fill',
    description: 'Progress bar fill — accent color with smooth transition',
    tokens: {
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
      transition: `width var(--renge-duration-3) var(--renge-easing-ease-out)`,
    },
  },
  progressSuccess: {
    label: 'Progress Fill — Success',
    description: 'Completed progress — success color fill',
    tokens: {
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-success)',
      transition: `width var(--renge-duration-3) var(--renge-easing-ease-out)`,
    },
  },
  toast: {
    label: 'Toast',
    description: 'Notification message — elevated surface, compact padding',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      border: '1px solid var(--renge-color-border-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      zIndex: 'var(--renge-zindex-toast)',
    },
  },
  toastSuccess: {
    label: 'Toast — Success',
    description: 'Positive notification — left success accent border',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      borderLeft: '4px solid var(--renge-color-success)',
      fontSize: 'var(--renge-font-size-sm)',
      zIndex: 'var(--renge-zindex-toast)',
    },
  },
  toastWarning: {
    label: 'Toast — Warning',
    description: 'Caution notification — left warning accent border',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      borderLeft: '4px solid var(--renge-color-warning)',
      fontSize: 'var(--renge-font-size-sm)',
      zIndex: 'var(--renge-zindex-toast)',
    },
  },
  toastDanger: {
    label: 'Toast — Danger',
    description: 'Error notification — left danger accent border',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg)',
      boxShadow: 'var(--renge-shadow-layer-2)',
      borderLeft: '4px solid var(--renge-color-danger)',
      fontSize: 'var(--renge-font-size-sm)',
      zIndex: 'var(--renge-zindex-toast)',
    },
  },
};

/**
 * Data Display Petals
 *
 * Token compositions for tables, stats, avatars, chat bubbles,
 * timelines, and accordions. Focused on the visual rhythm of
 * structured information.
 */
export const dataDisplay: PetalGroup = {
  tableRoot: {
    label: 'Table',
    description: 'Table container — full width with body-size typography',
    tokens: {
      width: 'var(--renge-w-full)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
  tableHeader: {
    label: 'Table Header Cell',
    description: 'Column heading — condensed type, bottom border, muted color',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-3)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
      borderBottom: '1px solid var(--renge-color-border)',
    },
  },
  tableCell: {
    label: 'Table Cell',
    description: 'Data cell — comfortable padding with subtle row separator',
    tokens: {
      padding: 'var(--renge-space-3)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
  tableRowStripe: {
    label: 'Table Row — Stripe',
    description: 'Alternating row background for scan-ability',
    tokens: {
      backgroundColor: 'var(--renge-color-bg-subtle)',
    },
  },
  tableRowHover: {
    label: 'Table Row — Hover',
    description: 'Interactive row highlight on pointer entry',
    tokens: {
      backgroundColor: 'var(--renge-color-bg-subtle)',
      transition: `background-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  statRoot: {
    label: 'Stat',
    description: 'Metric container — comfortable padding, column layout gap',
    tokens: {
      padding: 'var(--renge-space-4)',
      gap: 'var(--renge-space-2)',
    },
  },
  statValue: {
    label: 'Stat Value',
    description: 'Primary metric — large, prominent number',
    tokens: {
      fontSize: 'var(--renge-font-size-3xl)',
      lineHeight: 'var(--renge-line-height-3xl)',
      color: 'var(--renge-color-fg)',
    },
  },
  statLabel: {
    label: 'Stat Label',
    description: 'Metric name — condensed, subdued',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
    },
  },
  statDesc: {
    label: 'Stat Description',
    description: 'Secondary context beneath the metric — muted',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-muted)',
    },
  },
  avatarSm: {
    label: 'Avatar — Small',
    description: 'Compact user avatar — small circle',
    tokens: {
      width: 'var(--renge-h-6)',
      height: 'var(--renge-h-6)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
      fontSize: 'var(--renge-font-size-xs)',
    },
  },
  avatarMd: {
    label: 'Avatar — Medium',
    description: 'Standard user avatar — comfortable circle',
    tokens: {
      width: 'var(--renge-h-8)',
      height: 'var(--renge-h-8)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
      fontSize: 'var(--renge-font-size-sm)',
    },
  },
  avatarLg: {
    label: 'Avatar — Large',
    description: 'Profile-size avatar — generous circle',
    tokens: {
      width: 'var(--renge-h-10)',
      height: 'var(--renge-h-10)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
      fontSize: 'var(--renge-font-size-lg)',
    },
  },
  chatBubble: {
    label: 'Chat Bubble',
    description: 'Incoming message — subtle background, readable padding',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-bg-subtle)',
      color: 'var(--renge-color-fg)',
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-base)',
    },
  },
  chatBubbleOwn: {
    label: 'Chat Bubble — Own',
    description: 'Outgoing message — accent background with inverse text',
    tokens: {
      padding: 'var(--renge-space-2) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-3)',
      backgroundColor: 'var(--renge-color-accent)',
      color: 'var(--renge-color-fg-inverse)',
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-base)',
    },
  },
  timelineConnector: {
    label: 'Timeline Connector',
    description: 'Vertical rule connecting timeline nodes',
    tokens: {
      width: '1px',
      backgroundColor: 'var(--renge-color-border)',
    },
  },
  timelineDot: {
    label: 'Timeline Dot',
    description: 'Node indicator — compact filled circle on connector',
    tokens: {
      width: 'var(--renge-h-3)',
      height: 'var(--renge-h-3)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
      border: '2px solid var(--renge-color-bg)',
    },
  },
  timelineLabel: {
    label: 'Timeline Label',
    description: 'Time or title beside a node — condensed, muted',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
    },
  },
  accordionTrigger: {
    label: 'Accordion Trigger',
    description: 'Expandable section header — standard interactive padding',
    tokens: {
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-base)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      transition: `background-color var(--renge-duration-1) var(--renge-easing-ease-out)`,
    },
  },
  accordionContent: {
    label: 'Accordion Content',
    description: 'Expandable section body — comfortable padding, subtle background',
    tokens: {
      padding: 'var(--renge-space-4)',
      backgroundColor: 'var(--renge-color-bg-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
};

/**
 * Layout Petals
 *
 * Structural token compositions for page-level sections — heroes, footers,
 * dividers, and element groupings that shape the document frame.
 */
export const layout: PetalGroup = {
  heroRoot: {
    label: 'Hero',
    description: 'Full-width banner section — generous vertical padding',
    tokens: {
      padding: 'var(--renge-space-8) var(--renge-space-5)',
    },
  },
  heroContent: {
    label: 'Hero Content',
    description: 'Hero inner container — constrained max-width',
    tokens: {
      maxWidth: 'var(--renge-container-lg)',
    },
  },
  footerRoot: {
    label: 'Footer',
    description: 'Page footer — inverse surface with generous padding',
    tokens: {
      padding: 'var(--renge-space-7) var(--renge-space-5)',
      backgroundColor: 'var(--renge-color-bg-inverse)',
      color: 'var(--renge-color-fg-inverse)',
    },
  },
  footerSection: {
    label: 'Footer Section',
    description: 'Footer link group — compact vertical gap',
    tokens: {
      gap: 'var(--renge-space-3)',
      fontSize: 'var(--renge-font-size-sm)',
      lineHeight: 'var(--renge-line-height-sm)',
    },
  },
  divider: {
    label: 'Divider',
    description: 'Horizontal separator — 1px rule with vertical margin',
    tokens: {
      height: '1px',
      backgroundColor: 'var(--renge-color-border-subtle)',
      margin: 'var(--renge-space-3) 0',
    },
  },
  dividerVertical: {
    label: 'Divider — Vertical',
    description: 'Vertical separator — 1px rule for inline separation',
    tokens: {
      width: '1px',
      backgroundColor: 'var(--renge-color-border-subtle)',
      margin: '0 var(--renge-space-3)',
    },
  },
  indicator: {
    label: 'Indicator',
    description: 'Status badge overlay — small accent circle',
    tokens: {
      width: 'var(--renge-h-2)',
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
      border: '2px solid var(--renge-color-bg)',
    },
  },
  indicatorDanger: {
    label: 'Indicator — Danger',
    description: 'Error or unread dot indicator — danger color',
    tokens: {
      width: 'var(--renge-h-2)',
      height: 'var(--renge-h-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-danger)',
      border: '2px solid var(--renge-color-bg)',
    },
  },
  joinGroup: {
    label: 'Join Group',
    description: 'Connected element group — zero gap, shared outer border-radius',
    tokens: {
      gap: 'var(--renge-space-0)',
      border: '1px solid var(--renge-color-border)',
      borderRadius: 'var(--renge-radius-2)',
    },
  },
  sectionRoot: {
    label: 'Section',
    description: 'Content section — vertical padding for page rhythm',
    tokens: {
      padding: 'var(--renge-space-6) var(--renge-space-5)',
    },
  },
  sectionHeader: {
    label: 'Section Header',
    description: 'Section heading block — bottom margin before content',
    tokens: {
      marginBottom: 'var(--renge-space-5)',
      gap: 'var(--renge-space-2)',
    },
  },
  containerSm: {
    label: 'Container — Small',
    description: 'Narrow constrained layout — small max-width',
    tokens: {
      maxWidth: 'var(--renge-container-sm)',
    },
  },
  containerMd: {
    label: 'Container — Medium',
    description: 'Standard constrained layout — medium max-width',
    tokens: {
      maxWidth: 'var(--renge-container-md)',
    },
  },
  containerLg: {
    label: 'Container — Large',
    description: 'Wide constrained layout — large max-width',
    tokens: {
      maxWidth: 'var(--renge-container-lg)',
    },
  },
};

/**
 * Decoration Petals
 *
 * Smaller adornments and utility patterns — badge color variants,
 * keyboard keys, countdowns, diffs, and clip masks.
 */
export const decoration: PetalGroup = {
  badgeSolid: {
    label: 'Badge — Solid',
    description: 'Filled badge — accent background with inverse text',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent)',
      color: 'var(--renge-color-fg-inverse)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeOutline: {
    label: 'Badge — Outline',
    description: 'Bordered badge — accent ring with transparent fill',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      border: '1px solid var(--renge-color-accent)',
      color: 'var(--renge-color-accent)',
      backgroundColor: 'transparent',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeSubtle: {
    label: 'Badge — Subtle',
    description: 'Soft badge — accent subtle background with accent text',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-accent-subtle)',
      color: 'var(--renge-color-accent)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeSuccess: {
    label: 'Badge — Success',
    description: 'Positive status badge — success colors',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-success-subtle)',
      color: 'var(--renge-color-success)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeWarning: {
    label: 'Badge — Warning',
    description: 'Caution status badge — warning colors',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-warning-subtle)',
      color: 'var(--renge-color-warning)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeDanger: {
    label: 'Badge — Danger',
    description: 'Error status badge — danger colors',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-danger-subtle)',
      color: 'var(--renge-color-danger)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  badgeNeutral: {
    label: 'Badge — Neutral',
    description: 'Default label — muted background, subtle text',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-full)',
      backgroundColor: 'var(--renge-color-bg-muted)',
      color: 'var(--renge-color-fg-subtle)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  kbd: {
    label: 'Kbd',
    description: 'Keyboard key — inset shadow, condensed label',
    tokens: {
      padding: 'var(--renge-space-1) var(--renge-space-2)',
      borderRadius: 'var(--renge-radius-1)',
      backgroundColor: 'var(--renge-color-bg-subtle)',
      border: '1px solid var(--renge-color-border)',
      boxShadow: 'var(--renge-shadow-inset)',
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
    },
  },
  countdownValue: {
    label: 'Countdown Value',
    description: 'Ticking numeric display — large tabular figures',
    tokens: {
      fontSize: 'var(--renge-font-size-3xl)',
      lineHeight: 'var(--renge-line-height-3xl)',
      color: 'var(--renge-color-fg)',
    },
  },
  countdownLabel: {
    label: 'Countdown Label',
    description: 'Unit label beneath countdown value — condensed, muted',
    tokens: {
      fontSize: 'var(--renge-font-size-xs)',
      lineHeight: 'var(--renge-line-height-xs)',
      color: 'var(--renge-color-fg-subtle)',
    },
  },
  diffAdded: {
    label: 'Diff — Added',
    description: 'Added line in a diff view — success subtle background',
    tokens: {
      backgroundColor: 'var(--renge-color-success-subtle)',
      color: 'var(--renge-color-success)',
      padding: '0 var(--renge-space-2)',
    },
  },
  diffRemoved: {
    label: 'Diff — Removed',
    description: 'Removed line in a diff view — danger subtle background',
    tokens: {
      backgroundColor: 'var(--renge-color-danger-subtle)',
      color: 'var(--renge-color-danger)',
      padding: '0 var(--renge-space-2)',
    },
  },
  maskCircle: {
    label: 'Mask — Circle',
    description: 'Circular clip mask — full radius, overflow hidden',
    tokens: {
      borderRadius: 'var(--renge-radius-full)',
      overflow: 'hidden',
    },
  },
  maskSquircle: {
    label: 'Mask — Squircle',
    description: 'Rounded-square clip mask — large radius, overflow hidden',
    tokens: {
      borderRadius: 'var(--renge-radius-4)',
      overflow: 'hidden',
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
  alerts,
  navigation,
  overlay,
  forms,
  feedback,
  dataDisplay,
  layout,
  decoration,
};

export type AllPetals = typeof petals;
export type PetalCategory = keyof AllPetals;
