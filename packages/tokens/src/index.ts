/**
 * @renge/tokens
 *
 * The proportional foundation.
 * φ-based typography, Fibonacci spacing, OKLCH colors, natural motion.
 */

// Theme
export { createRengeTheme } from "./theme";

// Constants
export { PHI, GOLDEN_ANGLE, FIBONACCI } from "./constants";

// Scales (for advanced usage)
export {
  createSpacingScale,
  createTypeScale,
  createDurationScale,
  createEasingTokens,
  createRadiusScale,
  createFractalScale,
  FRACTAL_STEPS,
  createAnimationVars,
  createAnimationKeyframesCSS,
  ANIMATION_NAMES,
} from "./scales";
export type { TypeToken, AnimationName } from "./scales";

// Colors
export { palette, oklch, createPaletteVars } from "./colors/palette";
export {
  profiles,
  getProfile,
  createSemanticColorVars,
} from "./colors/profiles";

// Phyllotaxis
export { phyllotaxis } from "./phyllotaxis";

// Types
export type {
  RengeThemeConfig,
  RengeTheme,
  OklchColor,
  PaletteColor,
  SemanticColorMap,
  semanticColorKeys,
  SemanticColor,
  ProfileName,
  ProfileMode,
  ProfileVariant,
  PhyllotaxisPoint,
  PhyllotaxisConfig,
} from "./types.ts";
