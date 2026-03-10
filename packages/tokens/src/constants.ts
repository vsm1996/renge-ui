/**
 * Renge Constants
 *
 * The mathematical foundation. These values derive everything else.
 */

export const PHI = (1 + Math.sqrt(5)) / 2;
export const GOLDEN_ANGLE = 360 / (PHI * PHI);
export const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89] as const;

/**
 * Deterministic seeded random generator.
 * Used for tolerance/variance — same seed always produces same drift.
 */
export function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return function () {
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    hash ^= hash >>> 16;
    return (hash >>> 0) / 4294967296;
  };
}

/**
 * Apply bounded variance to a numeric value.
 * Drift is deterministic and symmetric around the original value.
 */
export function applyVariance(
  value: number,
  variance: number,
  random: () => number
): number {
  if (variance === 0) return value;
  const drift = (random() - 0.5) * 2 * variance;
  return value * (1 + drift);
}
