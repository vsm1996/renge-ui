/**
 * @renge-ui/svelte
 *
 * Svelte stores and components for the Renge design system.
 * Provides theme management and token consumption patterns for Svelte applications.
 *
 * Components can be imported directly:
 * - import RengeProvider from '@renge-ui/svelte/dist/components/RengeProvider.svelte'
 */

// Stores
export { profile, mode, switchProfile, switchMode, initializeTheme } from "./stores/theme";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
