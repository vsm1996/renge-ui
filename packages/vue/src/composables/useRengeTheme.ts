import { provide, inject, reactive } from "vue";

export interface RengeThemeState {
  profile: string;
  mode: "light" | "dark";
}

export interface RengeThemeContext extends RengeThemeState {
  switchProfile: (name: string) => void;
  switchMode: (mode: "light" | "dark") => void;
}

const DEFAULT_PROFILE = "ocean";
const DEFAULT_MODE = "light";
const RENGE_INJECTION_KEY = Symbol("renge-theme");

/**
 * Provide Renge theme context to child components.
 * Updates document root attributes for CSS variable scoping.
 */
export function useRengeTheme() {
  const state = reactive<RengeThemeState>({
    profile: DEFAULT_PROFILE,
    mode: DEFAULT_MODE,
  });

  const switchProfile = (name: string) => {
    state.profile = name;
    document.documentElement.setAttribute("data-profile", name);
  };

  const switchMode = (mode: "light" | "dark") => {
    state.mode = mode;
    document.documentElement.setAttribute("data-mode", mode);
  };

  const context: RengeThemeContext = {
    ...state,
    switchProfile,
    switchMode,
  };

  provide(RENGE_INJECTION_KEY, context);

  return context;
}

/**
 * Inject Renge theme context in child components.
 * Must be used inside a RengeProvider or useRengeTheme() call.
 */
export function useRengeInject() {
  const context = inject<RengeThemeContext>(RENGE_INJECTION_KEY);
  if (!context) {
    throw new Error(
      "useRengeInject must be used inside a component tree with RengeProvider"
    );
  }
  return context;
}
