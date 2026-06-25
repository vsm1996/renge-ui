/**
 * @renge-ui/svelte
 *
 * Svelte stores and components for the Renge design system.
 * Provides theme management and token consumption patterns for Svelte applications.
 */

// Stores
export { profile, mode, switchProfile, switchMode, initializeTheme } from "./stores/theme";

// Components
export { default as RengeProvider } from "./components/RengeProvider.svelte";

// Re-export tokens for convenience
export { rengeVars } from "@renge-ui/tokens";
export type { RengeVars } from "@renge-ui/tokens";
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "@renge-ui/tokens";
