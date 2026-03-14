"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { profiles, createSemanticColorVars } from "@renge/tokens";
import type { ProfileName } from "@renge/tokens";

// ============================================================================
// Context
// ============================================================================

interface ProfileContextValue {
  profile: ProfileName;
  setProfile: (p: ProfileName) => void;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: "ocean",
  setProfile: () => {},
});

export function useProfile() {
  return useContext(ProfileContext);
}

// ============================================================================
// Provider — applies profile CSS vars to document root
// ============================================================================

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<ProfileName>("ocean");

  const setProfile = useCallback((p: ProfileName) => {
    setProfileState(p);
    // Apply semantic color vars to :root
    const vars = createSemanticColorVars(profiles[p]);
    const root = document.documentElement;
    root.setAttribute("data-profile", p);
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, []);

  // Sync on mount to ensure correct state
  useEffect(() => {
    setProfile("ocean");
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
  { id: "ocean", label: "Ocean", description: "Sky blue. Light. Airy." },
  { id: "earth", label: "Earth", description: "Ochre. Warm. Grounded." },
  { id: "twilight", label: "Twilight", description: "Indigo. Deep. Nocturnal." },
];

export function ProfileToggle() {
  const { profile, setProfile } = useProfile();

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--renge-space-2)",
        alignItems: "center",
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
