"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { profiles } from "@renge/tokens";
import type { ProfileName, ProfileMode } from "@renge/tokens";

const PROFILE_KEY = "renge-profile";
const MODE_KEY = "renge-mode";
const DEFAULT_PROFILE: ProfileName = "ocean";

// ============================================================================
// Context
// ============================================================================

interface ProfileContextValue {
  profile: ProfileName;
  mode: ProfileMode;
  setProfile: (p: ProfileName) => void;
  setMode: (m: ProfileMode) => void;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: DEFAULT_PROFILE,
  mode: "light",
  setProfile: () => { },
  setMode: () => { },
});

export function useProfile() {
  return useContext(ProfileContext);
}

// ============================================================================
// Helpers — read persisted state
// ============================================================================

function readStoredProfile(fallback: ProfileName = DEFAULT_PROFILE): ProfileName {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(PROFILE_KEY) as ProfileName | null;
    if (stored && stored in profiles) return stored;
  } catch { }
  return fallback;
}

function readStoredMode(): ProfileMode {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    // Fall back to system preference if no explicit choice
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch { }
  return "light";
}

// CSS and localStorage both handled by attribute — just set the attribute
function applyProfile(p: ProfileName) {
  document.documentElement.setAttribute("data-profile", p);
  try { localStorage.setItem(PROFILE_KEY, p); } catch { }
}

function applyMode(m: ProfileMode) {
  document.documentElement.setAttribute("data-mode", m);
  try { localStorage.setItem(MODE_KEY, m); } catch { }
}

// ============================================================================
// Provider
// ============================================================================

export function ProfileProvider({ children, defaultProfile = DEFAULT_PROFILE }: { children: React.ReactNode; defaultProfile?: ProfileName }) {
  const [profile, setProfileState] = useState<ProfileName>(defaultProfile);
  const [mode, setModeState] = useState<ProfileMode>("light");

  const setProfile = useCallback((p: ProfileName) => {
    setProfileState(p);
    applyProfile(p);
  }, []);

  const setMode = useCallback((m: ProfileMode) => {
    setModeState(m);
    applyMode(m);
  }, []);

  useEffect(() => {
    setProfile(readStoredProfile(defaultProfile));
    setMode(readStoredMode());
  }, [setProfile, setMode, defaultProfile]);

  return (
    <ProfileContext.Provider value={{ profile, mode, setProfile, setMode }}>
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
  { id: "leaf", label: "Leaf", description: "Forest green. Alive. Light." },
  { id: "twilight", label: "Twilight", description: "Indigo. Deep. Nocturnal." },
  { id: "fire", label: "Fire", description: "Ember. Active. Burning." },
  { id: "void", label: "Void", description: "Dark. Minimal. Still." },
];

export function ProfileToggle() {
  const { profile, mode, setProfile, setMode } = useProfile();

  return (
    <div
      style={{ display: "flex", gap: "var(--renge-space-2)", alignItems: "center", flexWrap: "wrap" }}
      role="group"
      aria-label="Appearance"
    >
      {/* Profile buttons */}
      <div role="radiogroup" aria-label="Color profile" style={{ display: "flex", gap: "var(--renge-space-2)", flexWrap: "wrap" }}>
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

      {/* Divider */}
      <span style={{ width: 1, height: 16, background: "var(--renge-color-border-subtle)", flexShrink: 0 }} />

      {/* Mode toggle */}
      <button
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={mode === "light" ? "Dark mode" : "Light mode"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 32,
          height: 32,
          borderRadius: "var(--renge-radius-full)",
          border: "1px solid var(--renge-color-border)",
          background: "transparent",
          color: "var(--renge-color-fg-muted)",
          cursor: "pointer",
          transition: "all 200ms var(--renge-easing-ease-out)",
          flexShrink: 0,
          fontSize: 14,
          lineHeight: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--renge-color-accent)";
          e.currentTarget.style.color = "var(--renge-color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--renge-color-border)";
          e.currentTarget.style.color = "var(--renge-color-fg-muted)";
        }}
      >
        {mode === "light" ? "☽" : "○"}
      </button>
    </div>
  );
}
