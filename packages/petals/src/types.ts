/**
 * Petal type definitions
 *
 * A petal is a named composition of Renge tokens — a semantic pattern that combines
 * multiple token values (spacing, color, typography, etc.) into a reusable unit.
 *
 * Petals are pure token compositions with no component-specific logic.
 * They compose tokens into common patterns like "card padding" or "heading text".
 */

export interface CSSProperties {
  [key: string]: string;
}

export interface PetalComposition {
  label: string;
  description: string;
  tokens: CSSProperties;
}

export interface PetalGroup {
  [key: string]: PetalComposition;
}

