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

export function createShadowScale(baseUnit: number = 4): Record<string, string> {
  // Fibonacci × baseUnit, calc-based so the base unit is a runtime variable:
  //   calc(<fib> * var(--renge-base-unit, <baseUnit>px))
  // Default (baseUnit: 4) offsets/blurs: [4, 8, 12, 20]px.
  const len = (mult: number) => `calc(${mult} * var(--renge-base-unit, ${baseUnit}px))`;

  const y1 = len(FIBONACCI[0]); // 1× → 4px @ base 4
  const blur1 = len(FIBONACCI[1]); // 2× → 8px

  const y2 = len(FIBONACCI[1]); // 2× → 8px
  const blur2 = len(FIBONACCI[2]); // 3× → 12px

  const y3 = len(FIBONACCI[2]); // 3× → 12px
  const blur3 = len(FIBONACCI[3]); // 5× → 20px

  return {
    'layer-1': `0 ${y1} ${blur1} rgb(0 0 0 / 0.05)`,
    'layer-2': `0 ${y2} ${blur2} rgb(0 0 0 / 0.1)`,
    'layer-3': `0 ${y3} ${blur3} rgb(0 0 0 / 0.15)`,
    'focus': `0 0 0 3px rgb(var(--renge-color-accent-rgb) / 0.5)`,
    'inset': `inset 0 1px 2px rgb(0 0 0 / 0.05)`,
  };
}
