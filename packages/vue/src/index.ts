/**
 * @renge-ui/vue
 *
 * Vue 3 composables and components for the Renge design system.
 * Provides theme context and token consumption patterns for Vue applications.
 *
 * Components can be imported directly:
 * - import RengeProvider from '@renge-ui/vue/dist/components/RengeProvider.vue'
 */

// Composables
export { useRengeTheme, useRengeInject } from "./composables/useRengeTheme";
export type { RengeThemeState, RengeThemeContext } from "./composables/useRengeTheme";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
