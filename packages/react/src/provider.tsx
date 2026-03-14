import { useMemo, useInsertionEffect, type ReactNode } from 'react';
import { createRengeTheme } from '@renge/tokens';
import type { RengeThemeConfig, RengeTheme } from '@renge/tokens';
import { RengeContext } from './context';
export { useRenge } from './hooks';

export interface RengeProviderProps {
  children: ReactNode;
  config?: RengeThemeConfig;
  /** Inject theme CSS into document <head>. Default: true */
  injectCSS?: boolean;
}

export function RengeProvider({
  children,
  config: {
    baseUnit,
    typeBase,
    scaleRatio,
    profile,
    variance,
    varianceSeed,
    includeReset,
    selector,
  } = {},
  injectCSS = true,
}: RengeProviderProps) {
  const theme = useMemo(
    () => createRengeTheme({ baseUnit, typeBase, scaleRatio, profile, variance, varianceSeed, includeReset, selector }),
    [baseUnit, typeBase, scaleRatio, profile, variance, varianceSeed, includeReset, selector]
  );

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

  const value = useMemo(() => ({
    theme,
    profile: profile ?? 'ocean',
  }), [theme, profile]);

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
