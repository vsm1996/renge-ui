/**
 * @renge-ui/petals
 *
 * Semantic composition patterns for Renge — pre-made combinations of tokens
 * for typography, spacing, cards, and UI patterns.
 *
 * A petal is a named group of token values that form a cohesive pattern.
 * Rather than composing tokens manually, use petals to apply proven combinations.
 *
 * @example
 * import { petals } from '@renge-ui/petals';
 *
 * // Apply typography petal
 * const heading = petals.typography.displayLarge.tokens;
 * // { fontSize: 'var(--renge-font-size-4xl)', lineHeight: 'var(--renge-line-height-4xl)' }
 *
 * // Apply surface petal
 * const card = petals.cards.surfaceComfortable.tokens;
 * // { padding: 'var(--renge-space-4)', borderRadius: 'var(--renge-radius-4)', ... }
 */

export type { CSSProperties, PetalComposition, PetalGroup, PetalCategory } from './types';
export { petals, typography, spacing, cards, interactive, compositions } from './petals';
export type { AllPetals } from './petals';
