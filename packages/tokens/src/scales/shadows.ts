/**
 * Shadow Scale
 *
 * Semantic elevation shadows derived from spacing + color opacity.
 * Each layer uses Fibonacci spacing for offset/blur to maintain mathematical consistency.
 * Opacity varies to create depth perception.
 *
 * layer-1  (subtle):  cards, dropdown borders
 * layer-2  (medium):  modals, floating panels
 * layer-3  (strong):  z-top, tooltips, popovers
 * focus    (ring):    keyboard focus indicator (non-shadow)
 * inset    (border):  embossed/sunken text fields
 */

import { FIBONACCI } from '../constants';

export function createShadowScale(): Record<string, string> {
  // Fibonacci × 4px: [4, 8, 12, 20, ...]
  const y1 = FIBONACCI[0] * 4; // 4px
  const blur1 = FIBONACCI[1] * 4; // 8px

  const y2 = FIBONACCI[1] * 4; // 8px
  const blur2 = FIBONACCI[2] * 4; // 12px

  const y3 = FIBONACCI[2] * 4; // 12px
  const blur3 = FIBONACCI[3] * 4; // 20px

  return {
    'layer-1': `0 ${y1}px ${blur1}px rgb(0 0 0 / 0.05)`,
    'layer-2': `0 ${y2}px ${blur2}px rgb(0 0 0 / 0.1)`,
    'layer-3': `0 ${y3}px ${blur3}px rgb(0 0 0 / 0.15)`,
    'focus': `0 0 0 3px rgb(var(--renge-color-accent-rgb) / 0.5)`,
    'inset': `inset 0 1px 2px rgb(0 0 0 / 0.05)`,
  };
}
