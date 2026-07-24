import { petals } from "@renge-ui/petals";
import * as reactPrimitives from "@renge-ui/react";

/**
 * Single source of truth for the counts quoted in page copy and SEO metadata.
 *
 * Everything here is derived from the actual packages at build time, so the
 * numbers can never drift out of sync: add a component or a petal composition
 * and every "N+ components" string on the site updates itself. This exists
 * because hardcoded counts (44 components, 100 compositions) had already gone
 * stale in the metadata while the page bodies said otherwise.
 */

const isHook = (name: string) => /^use[A-Z]/.test(name);

// Real React components are functions (function components / forwardRef fns) or
// objects carrying a React `$$typeof` (forwardRef / memo). This filter keeps
// primitives like Button and ModalBody while excluding constants (ANIMATION_NAMES),
// hooks (useRengeTheme), and the createRengeTheme helper.
const isReactComponent = (value: unknown): boolean =>
  typeof value === "function" ||
  (typeof value === "object" && value !== null && "$$typeof" in value);

/** Exported React component primitives in @renge-ui/react (incl. sub-components). */
export const COMPONENT_COUNT = Object.entries(reactPrimitives).filter(
  ([name, value]) =>
    /^[A-Z]/.test(name) && !isHook(name) && isReactComponent(value),
).length;

/** Top-level petal categories in @renge-ui/petals. */
export const PETAL_CATEGORIES = Object.keys(petals).length;

/** Total semantic token compositions across every category. */
export const PETAL_COMPOSITIONS = Object.values(petals).reduce(
  (total, category) =>
    total + Object.keys(category as Record<string, unknown>).length,
  0,
);

// Rounded-down floors for marketing copy that reads better as "80+" than "81".
const floorTo = (n: number, step: number) => Math.floor(n / step) * step;

/** e.g. 81 -> "80+" */
export const COMPONENT_COUNT_FLOOR = floorTo(COMPONENT_COUNT, 10);

/** e.g. 129 -> "125+" */
export const PETAL_COMPOSITIONS_FLOOR = floorTo(PETAL_COMPOSITIONS, 25);
