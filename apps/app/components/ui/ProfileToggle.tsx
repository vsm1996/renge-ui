'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Stack, Text } from '@renge-ui/react';

type ProfileName = 'ocean' | 'leaf' | 'sand';

interface ProfileContextType {
  profile: ProfileName;
  setProfile: (profile: ProfileName) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children, defaultProfile = 'ocean' }: { children: ReactNode; defaultProfile?: ProfileName }) {
  const [profile, setProfile] = useState<ProfileName>(defaultProfile);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <div data-profile={profile}>
        {children}
      </div>
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used inside ProfileProvider');
  return context;
}

const PROFILES: { label: string; value: ProfileName; description: string }[] = [
  { label: 'Ocean', value: 'ocean', description: 'Cool, contemplative' },
  { label: 'Leaf', value: 'leaf', description: 'Warm, organic' },
  { label: 'Sand', value: 'sand', description: 'Earthy, grounded' },
];

export function ProfileToggle() {
  const { profile, setProfile } = useProfile();

  return (
    <Stack gap="2" direction="horizontal" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
      <Text size="xs" style={{ color: 'var(--renge-color-fg-muted)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Profile:
      </Text>
      <Stack gap="1" direction="horizontal">
        {PROFILES.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setProfile(value)}
            style={{
              padding: 'var(--renge-space-1) var(--renge-space-3)',
              borderRadius: 'var(--renge-radius-full)',
              border: `1px solid ${profile === value ? 'var(--renge-color-border-focus)' : 'var(--renge-color-border)'}`,
              background: profile === value ? 'var(--renge-color-bg-subtle)' : 'transparent',
              color: profile === value ? 'var(--renge-color-accent)' : 'var(--renge-color-fg-muted)',
              fontSize: 'var(--renge-font-size-xs)',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              transition: 'all var(--renge-duration-1) var(--renge-easing-ease-out)',
            }}
          >
            {label}
          </button>
        ))}
      </Stack>
    </Stack>
  );
}
