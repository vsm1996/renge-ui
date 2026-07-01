import { writable } from "svelte/store";

const DEFAULT_PROFILE = "ocean";
const DEFAULT_MODE = "light";

/**
 * Writable store for the current color profile.
 * Updates the `data-profile` attribute on the document root.
 */
export const profile = writable<string>(DEFAULT_PROFILE);

/**
 * Writable store for the current color mode.
 * Updates the `data-mode` attribute on the document root.
 */
export const mode = writable<"light" | "dark">(DEFAULT_MODE);

/**
 * Switch the color profile and update the DOM.
 *
 * @param name - The profile name (e.g., "ocean", "earth", "twilight")
 */
export function switchProfile(name: string) {
  profile.set(name);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-profile", name);
  }
}

/**
 * Switch the color mode and update the DOM.
 *
 * @param m - The mode ("light" or "dark")
 */
export function switchMode(m: "light" | "dark") {
  mode.set(m);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-mode", m);
  }
}

/**
 * Initialize theme from DOM attributes.
 * Call this during app startup to sync store with current DOM state.
 */
export function initializeTheme() {
  if (typeof document !== "undefined") {
    const currentProfile =
      document.documentElement.getAttribute("data-profile") || DEFAULT_PROFILE;
    const currentMode =
      (document.documentElement.getAttribute("data-mode") as "light" | "dark") ||
      DEFAULT_MODE;

    profile.set(currentProfile);
    mode.set(currentMode);
  }
}
