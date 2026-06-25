'use client';

import { useContext, useState, useCallback, useEffect } from 'react';
import { RengeContext } from '../context';
import type { ProfileName } from '@renge-ui/tokens';

export type Mode = 'light' | 'dark';

export interface RengeThemeHookReturn {
  profile: ProfileName;
  mode: Mode;
  switchProfile: (profile: ProfileName) => void;
  switchMode: (mode: Mode) => void;
}

/**
 * Hook to access and control the Renge theme at runtime.
 *
 * Provides methods to switch between profiles (ocean, leaf, sand) and modes (light, dark).
 * Changes update the data-profile and data-mode attributes on <html>, which the
 * Tailwind plugin uses to apply the correct color scheme.
 *
 * Works with or without <RengeProvider> — if outside provider, uses DOM attributes directly.
 *
 * @example
 * ```tsx
 * const { profile, mode, switchProfile, switchMode } = useRengeTheme();
 *
 * return (
 *   <>
 *     <p>Current profile: {profile}</p>
 *     <button onClick={() => switchProfile('leaf')}>Switch to Leaf</button>
 *   </>
 * );
 * ```
 */
export function useRengeTheme(): RengeThemeHookReturn {
  const context = useContext(RengeContext);
  const [profile, setProfile] = useState<ProfileName>('ocean');
  const [mode, setMode] = useState<Mode>('light');
  const [mounted, setMounted] = useState(false);

  // Hydrate from DOM attributes on mount
  useEffect(() => {
    const root = document.documentElement;
    const currentProfile = (root.getAttribute('data-profile') || 'ocean') as ProfileName;
    const currentMode = (root.getAttribute('data-mode') || 'light') as Mode;

    setProfile(currentProfile);
    setMode(currentMode);
    setMounted(true);
  }, []);

  // Use context values if available, otherwise use local state
  const activeProfile = context?.profile || profile;
  const activeMode = context?.mode || mode;

  const switchProfile = useCallback((newProfile: ProfileName) => {
    setProfile(newProfile);
    document.documentElement.setAttribute('data-profile', newProfile);
  }, []);

  const switchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    document.documentElement.setAttribute('data-mode', newMode);
  }, []);

  return {
    profile: (mounted ? activeProfile : profile) as ProfileName,
    mode: (mounted ? activeMode : mode) as Mode,
    switchProfile,
    switchMode,
  };
}
