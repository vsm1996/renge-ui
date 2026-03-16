"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { profiles } from "@renge/tokens";
import type { ProfileName } from "@renge/tokens";

const STORAGE_KEY = "renge-profile";
const DEFAULT_PROFILE: ProfileName = "ocean";

// ============================================================================
// Context
// ============================================================================

interface ProfileContextValue {
  profile: ProfileName;
  setProfile: (p: ProfileName) => void;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: DEFAULT_PROFILE,
  setProfile: () => {},
});

export function useProfile() {
  return useContext(ProfileContext);
}

// ============================================================================
// Helpers
// ============================================================================

function readStoredProfile(): ProfileName {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as ProfileName | null;
    if (stored && stored in profiles) return stored;
  } catch {}
  return DEFAULT_PROFILE;
}

function applyProfile(p: ProfileName) {
  // CSS handles the actual color vars via [data-profile] selectors in layout.
  // We only need to set the attribute — instant, no flash.
  document.documentElement.setAttribute("data-profile", p);
  try {
    localStorage.setItem(STORAGE_KEY, p);
  } catch {}
}

// ============================================================================
// Provider
// ============================================================================

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<ProfileName>(DEFAULT_PROFILE);

  const setProfile = useCallback((p: ProfileName) => {
    setProfileState(p);
    applyProfile(p);
  }, []);

  // On mount: restore persisted profile
  useEffect(() => {
    const stored = readStoredProfile();
    setProfile(stored);
  }, [setProfile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// ============================================================================
// Toggle UI
// ============================================================================

const PROFILES: { id: ProfileName; label: string; description: string }[] = [
  { id: "ocean",   label: "Ocean",   description: "Sky blue. Light. Airy." },
  { id: "earth",   label: "Earth",   description: "Ochre. Warm. Grounded." },
  { id: "twilight",label: "Twilight",description: "Indigo. Deep. Nocturnal." },
  { id: "fire",    label: "Fire",    description: "Ember. Active. Burning." },
  { id: "void",    label: "Void",    description: "Dark. Minimal. Still." },
  { id: "leaf",    label: "Leaf",    description: "Forest green. Alive. Light." },
];

export function ProfileToggle() {
  const { profile, setProfile } = useProfile();

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--renge-space-2)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
      role="radiogroup"
      aria-label="Color profile"
    >
      {PROFILES.map((p) => {
        const active = profile === p.id;
        return (
          <button
            key={p.id}
            role="radio"
            aria-checked={active}
            onClick={() => setProfile(p.id)}
            title={p.description}
            style={{
              padding: "var(--renge-space-2) var(--renge-space-4)",
              borderRadius: "var(--renge-radius-full)",
              border: `1px solid ${active ? "var(--renge-color-accent)" : "var(--renge-color-border)"}`,
              background: active ? "var(--renge-color-accent-subtle)" : "transparent",
              color: active ? "var(--renge-color-accent)" : "var(--renge-color-fg-muted)",
              fontSize: "var(--renge-font-size-sm)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 300ms var(--renge-easing-ease-out)",
            }}
          >
            {p.label}
          </button>
        );
      })}
    </div>
  );
}
