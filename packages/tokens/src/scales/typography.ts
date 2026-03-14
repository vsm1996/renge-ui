/**
 * Typography Scale
 *
 * φ-based (1.618) by default. Each step is ratio^n from the base.
 *
 * Line heights derived from φ:
 *   body    (xs–lg):  φ         = 1.618  — open, readable
 *   heading (xl–2xl): 1 + 1/φ²  = 1.382  — tighter, still golden
 *   display (3xl–4xl):1 + 1/φ³  = 1.236  — tight, headline weight
 */

import { PHI } from "../constants";

// φ-derived line-height constants
const LH_BODY    = +PHI.toFixed(3);                        // 1.618
const LH_HEADING = +(1 + 1 / (PHI * PHI)).toFixed(3);     // 1.382
const LH_DISPLAY = +(1 + 1 / (PHI * PHI * PHI)).toFixed(3); // 1.236

export interface TypeToken {
  fontSize: string;
  lineHeight: string;
}

const TYPE_STEPS = [
  { key: "xs",  exp: -2, lh: String(LH_BODY) },
  { key: "sm",  exp: -1, lh: String(LH_BODY) },
  { key: "base",exp:  0, lh: String(LH_BODY) },
  { key: "lg",  exp:  1, lh: String(LH_BODY) },
  { key: "xl",  exp:  2, lh: String(LH_HEADING) },
  { key: "2xl", exp:  3, lh: String(LH_HEADING) },
  { key: "3xl", exp:  4, lh: String(LH_DISPLAY) },
  { key: "4xl", exp:  5, lh: String(LH_DISPLAY) },
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
