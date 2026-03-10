/**
 * Renge Types
 */

// ============================================================================
// Theme Configuration
// ============================================================================

export interface RengeThemeConfig {
  /** Base spacing unit in px. Default: 4 */
  baseUnit?: number;
  /** Base font size in px. Default: 16 */
  typeBase?: number;
  /** Typography scale ratio. Default: φ = (1 + √5) / 2 */
  scaleRatio?: number;
  /** Color profile. Default: 'clear' */
  profile?: ProfileName;
  /** Tolerance variance (0 = disabled). Default: 0 */
  variance?: number;
  /** Deterministic seed for variance. Default: 'renge' */
  varianceSeed?: string;
  /** Include minimal CSS reset. Default: false */
  includeReset?: boolean;
  /** CSS selector for variables. Default: ':root' */
  selector?: string;
}

export interface RengeTheme {
  config: Required<RengeThemeConfig>;
  vars: Record<string, string>;
  css: string;
}

// ============================================================================
// Color System
// ============================================================================

export interface OklchColor {
  /** Lightness: 0–100 */
  l: number;
  /** Chroma: 0–0.7 */
  c: number;
  /** Hue: 0–360 */
  h: number;
}

export type PaletteColor = keyof typeof import("./colors/palette.ts").palette;

export interface SemanticColorMap {
  bg: string;
  bgSubtle: string;
  bgMuted: string;
  bgInverse: string;
  fg: string;
  fgSubtle: string;
  fgMuted: string;
  fgInverse: string;
  border: string;
  borderSubtle: string;
  borderFocus: string;
  accent: string;
  accentHover: string;
  accentSubtle: string;
  success: string;
  successSubtle: string;
  warning: string;
  warningSubtle: string;
  danger: string;
  dangerSubtle: string;
  info: string;
  infoSubtle: string;
}

export type SemanticColor = keyof SemanticColorMap;

export const semanticColorKeys: SemanticColor[] = [
  "bg",
  "bgSubtle",
  "bgMuted",
  "bgInverse",
  "fg",
  "fgSubtle",
  "fgMuted",
  "fgInverse",
  "border",
  "borderSubtle",
  "borderFocus",
  "accent",
  "accentHover",
  "accentSubtle",
  "success",
  "successSubtle",
  "warning",
  "warningSubtle",
  "danger",
  "dangerSubtle",
  "info",
  "infoSubtle",
];

// ============================================================================
// Profiles
// ============================================================================

export type ProfileName = "clear" | "earth" | "twilight";

// ============================================================================
// Phyllotaxis
// ============================================================================

export interface PhyllotaxisPoint {
  x: number;
  y: number;
  index: number;
  angle: number;
  radius: number;
}

export interface PhyllotaxisConfig {
  /** Number of points to generate */
  count: number;
  /** Spread factor. Default: 10 */
  spread?: number;
  /** Angle offset in degrees. Default: GOLDEN_ANGLE (137.5°) */
  angleOffset?: number;
  /** Growth scale factor. Default: 1 */
  scale?: number;
}
