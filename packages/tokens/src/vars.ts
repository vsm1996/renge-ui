/**
 * Static CSS variable references for @renge-ui/tokens.
 *
 * Use these instead of constructing variable name strings manually.
 * Every reference is typed, discoverable via IDE autocomplete, and guaranteed
 * to match the names emitted by createRengeTheme().
 *
 * @example
 * import { rengeVars } from "@renge-ui/tokens";
 *
 * const styles = {
 *   background: rengeVars.color.bg,          // "var(--renge-color-bg)"
 *   padding: rengeVars.space[4],             // "var(--renge-space-4)"
 *   fontSize: rengeVars.fontSize.lg,         // "var(--renge-font-size-lg)"
 * };
 *
 * // Mapping to another system's var names — no resolveVar() guessing needed:
 * const aliases: [string, string][] = [
 *   ["--color-bg-primary",   rengeVars.color.bg],
 *   ["--color-bg-secondary", rengeVars.color.bgSubtle],
 *   ["--color-accent",       rengeVars.color.accent],
 * ];
 */

export const rengeVars = {
  /** Semantic color references — profile-aware, change with data-profile */
  color: {
    bg:            "var(--renge-color-bg)",
    bgSubtle:      "var(--renge-color-bg-subtle)",
    bgMuted:       "var(--renge-color-bg-muted)",
    bgInverse:     "var(--renge-color-bg-inverse)",
    fg:            "var(--renge-color-fg)",
    fgSubtle:      "var(--renge-color-fg-subtle)",
    fgMuted:       "var(--renge-color-fg-muted)",
    fgInverse:     "var(--renge-color-fg-inverse)",
    border:        "var(--renge-color-border)",
    borderSubtle:  "var(--renge-color-border-subtle)",
    borderFocus:   "var(--renge-color-border-focus)",
    accent:        "var(--renge-color-accent)",
    accentHover:   "var(--renge-color-accent-hover)",
    accentSubtle:  "var(--renge-color-accent-subtle)",
    success:       "var(--renge-color-success)",
    successSubtle: "var(--renge-color-success-subtle)",
    warning:       "var(--renge-color-warning)",
    warningSubtle: "var(--renge-color-warning-subtle)",
    danger:        "var(--renge-color-danger)",
    dangerSubtle:  "var(--renge-color-danger-subtle)",
    info:          "var(--renge-color-info)",
    infoSubtle:    "var(--renge-color-info-subtle)",
  },

  /** Fibonacci-based spacing scale */
  space: {
    0:  "var(--renge-space-0)",
    1:  "var(--renge-space-1)",
    2:  "var(--renge-space-2)",
    3:  "var(--renge-space-3)",
    4:  "var(--renge-space-4)",
    5:  "var(--renge-space-5)",
    6:  "var(--renge-space-6)",
    7:  "var(--renge-space-7)",
    8:  "var(--renge-space-8)",
    9:  "var(--renge-space-9)",
    10: "var(--renge-space-10)",
  },

  /** PHI-derived typography scale */
  fontSize: {
    xs:   "var(--renge-font-size-xs)",
    sm:   "var(--renge-font-size-sm)",
    base: "var(--renge-font-size-base)",
    lg:   "var(--renge-font-size-lg)",
    xl:   "var(--renge-font-size-xl)",
    "2xl": "var(--renge-font-size-2xl)",
    "3xl": "var(--renge-font-size-3xl)",
    "4xl": "var(--renge-font-size-4xl)",
  },

  /** Companion line-height scale */
  lineHeight: {
    xs:   "var(--renge-line-height-xs)",
    sm:   "var(--renge-line-height-sm)",
    base: "var(--renge-line-height-base)",
    lg:   "var(--renge-line-height-lg)",
    xl:   "var(--renge-line-height-xl)",
    "2xl": "var(--renge-line-height-2xl)",
    "3xl": "var(--renge-line-height-3xl)",
    "4xl": "var(--renge-line-height-4xl)",
  },

  /** Motion duration scale (Fibonacci × 100ms) */
  duration: {
    0: "var(--renge-duration-0)",
    1: "var(--renge-duration-1)",
    2: "var(--renge-duration-2)",
    3: "var(--renge-duration-3)",
    4: "var(--renge-duration-4)",
    5: "var(--renge-duration-5)",
    6: "var(--renge-duration-6)",
    7: "var(--renge-duration-7)",
    8: "var(--renge-duration-8)",
    9: "var(--renge-duration-9)",
  },

  /** Easing curves */
  easing: {
    linear:  "var(--renge-easing-linear)",
    out:     "var(--renge-easing-ease-out)",
    in:      "var(--renge-easing-ease-in)",
    inOut:   "var(--renge-easing-ease-in-out)",
    spring:  "var(--renge-easing-spring)",
  },

  /** PHI-derived border radius scale */
  radius: {
    none: "var(--renge-radius-none)",
    1:    "var(--renge-radius-1)",
    2:    "var(--renge-radius-2)",
    3:    "var(--renge-radius-3)",
    4:    "var(--renge-radius-4)",
    5:    "var(--renge-radius-5)",
    full: "var(--renge-radius-full)",
  },
} as const;

export type RengeVars = typeof rengeVars;
