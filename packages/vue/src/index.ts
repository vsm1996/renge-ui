/**
 * @renge-ui/vue
 *
 * Vue 3 composables and components for the Renge design system.
 * Provides theme context and token consumption patterns for Vue applications.
 */

// Composables
export { useRengeTheme, useRengeInject } from "./composables/useRengeTheme";
export type { RengeThemeState, RengeThemeContext } from "./composables/useRengeTheme";

// Components
export { default as RengeProvider } from "./components/RengeProvider.vue";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
