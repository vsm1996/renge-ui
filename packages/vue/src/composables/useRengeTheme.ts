import { provide, inject, reactive, toRefs, type Ref } from "vue";

export interface RengeThemeState {
  profile: string;
  mode: "light" | "dark";
}

export interface RengeThemeContext {
  profile: Ref<string>;
  mode: Ref<"light" | "dark">;
  switchProfile: (name: string) => void;
  switchMode: (mode: "light" | "dark") => void;
}

const DEFAULT_PROFILE = "ocean";
const DEFAULT_MODE = "light";
// Symbol.for: the key must resolve identically even if this module is
// instantiated twice (bundled copy in index.mjs + raw copy under
// dist/composables imported by the shipped SFCs).
const RENGE_INJECTION_KEY = Symbol.for("renge-ui:theme");

/**
 * Provide Renge theme context to child components.
 * Updates document root attributes for CSS variable scoping.
 *
 * `initial` seeds the reactive state synchronously so SSR output and the
 * first client render already reflect the desired profile/mode; the document
 * attributes are still only stamped in the browser.
 */
export function useRengeTheme(initial?: Partial<RengeThemeState>) {
  const state = reactive<RengeThemeState>({
    profile: initial?.profile ?? DEFAULT_PROFILE,
    mode: initial?.mode ?? DEFAULT_MODE,
  });

  const switchProfile = (name: string) => {
    state.profile = name;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-profile", name);
    }
  };

  const switchMode = (mode: "light" | "dark") => {
    state.mode = mode;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-mode", mode);
    }
  };

  const context: RengeThemeContext = {
    ...toRefs(state),
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
