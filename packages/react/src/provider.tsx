import { useMemo, useInsertionEffect, useEffect, type ReactNode } from 'react';
import { createRengeTheme } from '@renge-ui/tokens';
import type { RengeThemeConfig, RengeTheme } from '@renge-ui/tokens';
import { RengeContext } from './context';
export { useRenge } from './hooks';

export interface RengeProviderProps {
  children: ReactNode;
  config?: RengeThemeConfig;
  /**
   * Inject theme CSS into document <head> at runtime. Default: false.
   *
   * false (default) — Syncs profile and mode to data-profile/data-mode
   *   attributes on <html>. Use with @plugin "@renge-ui/tailwind/plugin" in
   *   your CSS — the plugin's [data-profile] selectors pick up the attribute
   *   and apply the correct colors with no runtime injection.
   *
   * true — Injects the full theme CSS string via useInsertionEffect. Use for
   *   projects without the Tailwind plugin (CSR only; causes SSR mismatch).
   *   Prefer <RengeStylesheet /> for SSR-safe injection without the plugin.
   */
  injectCSS?: boolean;
}

export function RengeProvider({
  children,
  config: {
    baseUnit,
    typeBase,
    scaleRatio,
    profile,
    mode,
    variance,
    varianceSeed,
    includeReset,
    selector,
  } = {},
  injectCSS = false,
}: RengeProviderProps) {
  const theme = useMemo(
    () => createRengeTheme({ baseUnit, typeBase, scaleRatio, profile, mode, variance, varianceSeed, includeReset, selector }),
    [baseUnit, typeBase, scaleRatio, profile, mode, variance, varianceSeed, includeReset, selector]
  );

  // ── CSS injection (opt-in, for non-Tailwind users) ──────────────────────────
  useInsertionEffect(() => {
    if (!injectCSS || typeof document === 'undefined') return;
    const styleId = 'renge-theme';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = theme.css;
  }, [theme.css, injectCSS]);

  // ── Attribute sync (for @renge-ui/tailwind plugin users) ───────────────────
  // When injectCSS=false, drive the active colors via data-profile/data-mode
  // so the plugin's [data-profile="X"] CSS selectors activate automatically.
  useEffect(() => {
    if (injectCSS || typeof document === 'undefined') return;
    const root = document.documentElement;
    if (profile) root.setAttribute('data-profile', profile);
    if (mode) {
      root.setAttribute('data-mode', mode);
    } else {
      // No explicit mode — remove so system prefers-color-scheme applies.
      root.removeAttribute('data-mode');
    }
  }, [profile, mode, injectCSS]);

  const value = useMemo(() => ({
    theme,
    profile: profile ?? 'ocean',
    mode: mode ?? 'light',
  }), [theme, profile, mode]);

  return (
    <RengeContext.Provider value={value}>
      {children}
    </RengeContext.Provider>
  );
}

/** Access raw theme without a provider — for SSR or static export. */
export function useRengeTheme(config?: RengeThemeConfig): RengeTheme {
  return useMemo(() => createRengeTheme(config), [config]);
}
