import { provide, inject, reactive } from "vue";

export interface RengeThemeState {
  profile: string;
  mode: "light" | "dark";
  scale: number;
}

export interface RengeThemeContext extends RengeThemeState {
  switchProfile: (name: string) => void;
  switchMode: (mode: "light" | "dark") => void;
  switchScale: (newScale: number) => void;
}

const DEFAULT_PROFILE = "clear";
const DEFAULT_MODE = "light";
const DEFAULT_SCALE = 4;
const MIN_SCALE = 0.5;
const MAX_SCALE = 16;
const RENGE_INJECTION_KEY = Symbol("renge-theme");

/**
 * Provide Renge theme context to child components.
 * Updates document root attributes for CSS variable scoping.
 */
export function useRengeTheme() {
  const state = reactive<RengeThemeState>({
    profile: DEFAULT_PROFILE,
    mode: DEFAULT_MODE,
    scale: DEFAULT_SCALE,
  });

  const switchProfile = (name: string) => {
    state.profile = name;
    document.documentElement.setAttribute("data-profile", name);
  };

  const switchMode = (mode: "light" | "dark") => {
    state.mode = mode;
    document.documentElement.setAttribute("data-mode", mode);
  };

  const switchScale = (newScale: number) => {
    if (newScale < MIN_SCALE || newScale > MAX_SCALE) {
      throw new Error(
        `Renge: switchScale received ${newScale}. ` +
        `Base unit must be between ${MIN_SCALE} and ${MAX_SCALE}. ` +
        `The proportional system derives all spacing from this value — ` +
        `values outside this range break mathematical integrity.`
      );
    }
    state.scale = newScale;
    document.documentElement.style.setProperty("--renge-base-scale", String(newScale));
  };

  const context: RengeThemeContext = {
    ...state,
    switchProfile,
    switchMode,
    switchScale,
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
