'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to safely read CSS variable values from the root element.
 *
 * Handles SSR scenarios where document is not available and returns a var() reference
 * that CSS will resolve. Returns the actual computed value only in the browser.
 *
 * @param varName - The CSS variable name, with or without '--' prefix
 * @param fallback - Default value if the variable is not found (default: 'inherit')
 * @returns A CSS var() function string that always works; the actual value is computed in CSS
 *
 * @example
 * ```tsx
 * const padding = useRengeVar('--renge-space-4');  // Returns "var(--renge-space-4, ...fallback...)"
 * const color = useRengeVar('--renge-color-accent', 'blue');
 *
 * return <div style={{ padding }}>Content</div>;
 * ```
 */
export function useRengeVar(varName: string, fallback: string = 'inherit'): string {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize var name to include '--' prefix
  const normalizedVarName = varName.startsWith('--') ? varName : `--${varName}`;

  // Always return a valid CSS var() reference; CSS resolves the actual value
  return `var(${normalizedVarName}, ${fallback})`;
}

/**
 * Hook to read the actual computed value of a CSS variable.
 *
 * This is a lower-level hook for cases where you need the actual value (not a CSS var reference).
 * Note: This only works in the browser and will return the fallback during SSR.
 *
 * @param varName - The CSS variable name
 * @param fallback - Default value if not found
 * @returns The actual computed value of the CSS variable
 *
 * @example
 * ```tsx
 * const spacingValue = useRengeVarValue('--renge-space-4');  // "20px"
 * console.log(spacingValue);  // "20px"
 * ```
 */
export function useRengeVarValue(
  varName: string,
  fallback: string = 'inherit'
): string {
  const [value, setValue] = useState<string>(fallback);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const normalizedVarName = varName.startsWith('--') ? varName : `--${varName}`;
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue(normalizedVarName)
      .trim();

    setValue(computed || fallback);
  }, [varName, fallback]);

  // Return fallback during SSR/before hydration
  return mounted ? value : fallback;
}
