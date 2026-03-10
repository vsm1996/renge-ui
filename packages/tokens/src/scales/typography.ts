/**
 * Typography Scale
 *
 * φ-based (1.618) by default. Each step is ratio^n from the base.
 * Line heights: tighter for display sizes, relaxed for body.
 */

import { PHI } from "../constants";

export interface TypeToken {
  fontSize: string;
  lineHeight: string;
}

const TYPE_STEPS = [
  { key: "xs", exp: -2, lh: "1.5" },
  { key: "sm", exp: -1, lh: "1.5" },
  { key: "base", exp: 0, lh: "1.6" },
  { key: "lg", exp: 1, lh: "1.4" },
  { key: "xl", exp: 2, lh: "1.3" },
  { key: "2xl", exp: 3, lh: "1.2" },
  { key: "3xl", exp: 4, lh: "1.2" },
  { key: "4xl", exp: 5, lh: "1.2" },
] as const;

export function createTypeScale(
  base: number,
  ratio: number = PHI
): Record<string, TypeToken> {
  const scale: Record<string, TypeToken> = {};

  for (const step of TYPE_STEPS) {
    const size = base * Math.pow(ratio, step.exp);
    scale[step.key] = {
      fontSize: `${size}px`,
      lineHeight: step.lh,
    };
  }

  return scale;
}
