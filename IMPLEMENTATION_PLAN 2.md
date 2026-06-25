# Renge: Implementation Plan for Claude Code

**Prepared for:** Claude Code autonomous agent  
**Project:** Renge UI Design System  
**Owner:** Vanessa Martin  
**Date:** June 24, 2026

---

## Overview

This plan prioritizes enhancements to Renge across three phases. Each task includes:
- **Acceptance Criteria** — how you'll know it's done
- **Files to Create/Modify** — exact paths
- **Dependencies** — what must be done first
- **Time Estimate** — for planning
- **Code Patterns** — examples to follow

**Success Metrics:**
- ✅ All phase 1 tasks complete by end of sprint 1
- ✅ All phase 2 tasks complete by end of sprint 2
- ✅ Site vibe-check passes all criteria in CLAUDE.md

---

## Phase 1: Quick Wins (High Impact, Low Effort)
**Target: 1–2 weeks | ~20–25 hours total**

### Task 1.1: Add Z-Index Token System

**Description:** Create a semantic z-index scale to prevent z-index wars. No mathematical derivation needed—this is a design convention.

**Files to Create:**
- `packages/tokens/src/scales/z-index.ts` (new)
- Update `packages/tokens/src/scales/index.ts` to export it
- Update `packages/tokens/src/theme.ts` to generate z-index vars
- Update `packages/tokens/src/vars.ts` to export `rengeVars.zIndex`
- Update `packages/tokens/src/types.ts` if needed for types

**Acceptance Criteria:**
- ✅ `--renge-zindex-*` CSS variables generated in `:root`
- ✅ Variables named: `dropdown` (100), `sticky` (200), `fixed` (300), `modal` (400), `toast` (500)
- ✅ `rengeVars.zIndex.dropdown` returns `"var(--renge-zindex-dropdown)"`
- ✅ TypeScript types exported: `ZIndexToken`
- ✅ Tests pass: `vitest run` in tokens package
- ✅ README.md updated with z-index table (after color system section)

**Code Pattern:**
```typescript
// packages/tokens/src/scales/z-index.ts
export function createZIndexScale(): Record<string, string> {
  return {
    "dropdown": "100",
    "sticky": "200",
    "fixed": "300",
    "modal": "400",
    "toast": "500",
  };
}
```

**In theme.ts:**
```typescript
const zIndex = createZIndexScale();
for (const [key, value] of Object.entries(zIndex)) {
  vars[`--renge-zindex-${key}`] = value;
}
```

**In vars.ts:**
```typescript
zIndex: {
  dropdown: "var(--renge-zindex-dropdown)",
  sticky: "var(--renge-zindex-sticky)",
  fixed: "var(--renge-zindex-fixed)",
  modal: "var(--renge-zindex-modal)",
  toast: "var(--renge-zindex-toast)",
}
```

**Time Estimate:** 2-3 hours  
**Dependencies:** None

---

### Task 1.2: Add Dimension Token Scale

**Description:** Create width, height, min-width, max-width tokens for sizing constraints. Derive from container widths and Fibonacci.

**Files to Create:**
- `packages/tokens/src/scales/dimensions.ts` (new)
- Update `packages/tokens/src/scales/index.ts`
- Update `packages/tokens/src/theme.ts`
- Update `packages/tokens/src/vars.ts`

**Acceptance Criteria:**
- ✅ `--renge-w-*` variables (width scale): `auto`, `full`, `screen`, + container widths
- ✅ `--renge-h-*` variables (height scale): `auto`, `full`, `screen`, + container widths
- ✅ `--renge-min-*` variables: `0`, `auto`, + Fibonacci scaled
- ✅ `--renge-max-*` variables: `none`, `full`, + Fibonacci scaled
- ✅ All vars return correct values in generated CSS
- ✅ `rengeVars.dimension` exported with nested structure
- ✅ Tests verify monotonic increase

**Code Pattern:**
```typescript
// packages/tokens/src/scales/dimensions.ts
import { FIBONACCI } from "../constants";

const fibonacciScaled = (unit: number) => {
  const scale: Record<string, string> = { "0": "0px" };
  FIBONACCI.forEach((fib, i) => {
    scale[`fib${i + 1}`] = `${fib * unit}px`;
  });
  return scale;
};

export function createDimensionScale(baseUnit: number = 4) {
  return {
    width: {
      "auto": "auto",
      "full": "100%",
      "screen": "100vw",
      "sm": "var(--renge-container-sm)",
      "md": "var(--renge-container-md)",
      "lg": "var(--renge-container-lg)",
      "xl": "var(--renge-container-xl)",
      "full": "var(--renge-container-full)",
    },
    height: {
      "auto": "auto",
      "full": "100%",
      "screen": "100vh",
      ...fibonacciScaled(baseUnit),
    },
    minWidth: {
      "0": "0px",
      "auto": "auto",
      ...fibonacciScaled(baseUnit),
    },
    maxWidth: {
      "none": "none",
      "full": "100%",
      ...fibonacciScaled(baseUnit),
    },
  };
}
```

**Time Estimate:** 3-4 hours  
**Dependencies:** Task 1.1 (no hard dep, but same pattern)

---

### Task 1.3: Add Testing & Validation Package

**Description:** Create `@renge-ui/test-utils` with validators for token correctness and scale properties.

**Files to Create:**
- `packages/test-utils/package.json` (new)
- `packages/test-utils/src/index.ts`
- `packages/test-utils/src/validators.ts`
- `packages/test-utils/src/snapshots.ts`
- `packages/test-utils/tsconfig.json` (copy from tokens)
- Update root `pnpm-workspace.yaml` if needed

**Acceptance Criteria:**
- ✅ Package exports: `validateSpacingScale`, `validateTypeScale`, `validateContrastRatio`
- ✅ Each validator returns `{ valid: boolean, errors: string[] }`
- ✅ Test file `packages/test-utils/src/__tests__/validators.test.ts` with 100% coverage
- ✅ Can be imported: `import { validateSpacingScale } from '@renge-ui/test-utils'`
- ✅ README in packages/test-utils/ explains usage

**Code Pattern:**
```typescript
// packages/test-utils/src/validators.ts
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSpacingScale(
  scale: Record<string, string>
): ValidationResult {
  const errors: string[] = [];
  const values = Object.entries(scale)
    .map(([key, val]) => ({ key, px: parseFloat(val) }))
    .sort((a, b) => a.px - b.px);

  for (let i = 1; i < values.length; i++) {
    if (values[i].px <= values[i - 1].px) {
      errors.push(
        `Scale not monotonic: ${values[i - 1].key} (${values[i - 1].px}px) ` +
        `>= ${values[i].key} (${values[i].px}px)`
      );
    }
  }

  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateTypeScale(
  scale: Record<string, { fontSize: string; lineHeight: string }>,
  expectedRatio: number = 1.618
): ValidationResult {
  const errors: string[] = [];
  const sizes = Object.entries(scale)
    .map(([key, { fontSize }]) => ({
      key,
      px: parseFloat(fontSize),
    }))
    .sort((a, b) => a.px - b.px);

  for (let i = 1; i < sizes.length; i++) {
    const ratio = sizes[i].px / sizes[i - 1].px;
    const tolerance = 0.05; // ±5%
    if (Math.abs(ratio - expectedRatio) > tolerance) {
      errors.push(
        `Typography ratio ${ratio.toFixed(3)} ` +
        `(expected ~${expectedRatio.toFixed(3)}) ` +
        `between ${sizes[i - 1].key} and ${sizes[i].key}`
      );
    }
  }

  return { valid: errors.length === 0, errors, warnings: [] };
}

export function validateContrastRatio(
  foreground: string,
  background: string,
  minRatio: number = 4.5
): ValidationResult {
  // Parse OKLCH to RGB, calculate luminance, compute contrast
  // This is complex—use a library or stub for now
  return { valid: true, errors: [], warnings: [] };
}
```

**Time Estimate:** 4-5 hours  
**Dependencies:** Tasks 1.1, 1.2 should be complete first

---

### Task 1.4: Vibe Check & Fix Site Against CLAUDE.md

**Description:** Review the deployed site (or test build at `/apps/out`) against the "Vibe Check" criteria from CLAUDE.md. Fix any gaps.

**Files to Modify:**
- May affect: `apps/app/app/page.tsx`, `apps/app/components/sections/*`, etc.
- May need new components if missing

**Acceptance Criteria:**
1. ✅ **PHI Spiral visible within 3 seconds of landing**
   - Hero section shows animated φ spiral (SVG or canvas)
   - Opacity ~20%, subtle but present
   - Accept: screenshot or video proof

2. ✅ **Ratio 1:1.618 displayed prominently**
   - Hero or Philosophy section shows "1 : 1.618" as a label
   - Accept: text + proportional rectangle visible

3. ✅ **Color profile toggle works**
   - Toggle/button switches between ocean, earth, twilight
   - Page repaints live (not page reload)
   - All text, backgrounds, accents change colors
   - Accept: tested in browser

4. ✅ **Typography scale feels mathematically inevitable**
   - Render all 8 sizes (xs–4xl) on page
   - Show the size in px + ratio to previous
   - Ex: `lg (25.9px) = base × φ^1`
   - Accept: visible with math shown

5. ✅ **Motion is slow + deliberate**
   - Scroll reveals (Philosophy, Token sections) use 1.3–5.5s durations
   - Easing is `ease-out` or `spring`, not snappy
   - Accept: Devtools shows transitions in 1000+ms range

6. ✅ **Non-designer finds it beautiful**
   - Visual hierarchy is clear
   - Color profiles feel like different "worlds"
   - Accept: subjective—use taste judgment

7. ✅ **Engineer finds it credible**
   - Code is well-organized in components
   - Token consumption is visible (no hardcoded colors)
   - Accept: audit components for `var(--renge-*)` usage

**Subtasks (if needed):**
- Add `PhiSpiral.tsx` component if missing
- Add `ProfileToggle.tsx` component if missing
- Add `TypeScaleShowcase.tsx` if typography section incomplete
- Add `MotionDemonstrator.tsx` for easing/duration demos
- Ensure Hero section has φ rectangle as visual element

**Time Estimate:** 4-6 hours (depends on current completeness)  
**Dependencies:** Site structure in place (already exists)

---

## Phase 2: Medium Effort (High Impact)
**Target: 2–3 weeks | ~35–40 hours total**

### Task 2.1: Add Shadow Token System

**Description:** Create a semantic shadow scale derived from spacing + motion easing principles.

**Files to Create:**
- `packages/tokens/src/scales/shadows.ts` (new)
- Update `packages/tokens/src/scales/index.ts`
- Update `packages/tokens/src/theme.ts`
- Update `packages/tokens/src/vars.ts`
- Update README.md with shadow table

**Acceptance Criteria:**
- ✅ `--renge-shadow-layer-*` variables for elevation (1–3 layers)
- ✅ `--renge-shadow-focus` for focus rings
- ✅ `--renge-shadow-inset` for inset borders
- ✅ Shadows use spacing scale for offset/blur
- ✅ Shadows use palette colors for color (black with varying opacity)
- ✅ Generated CSS is valid (test rendering)
- ✅ `rengeVars.shadow` exported

**Code Pattern:**
```typescript
// packages/tokens/src/scales/shadows.ts
import { FIBONACCI } from "../constants";

export function createShadowScale(): Record<string, string> {
  return {
    "layer-1": `0 ${FIBONACCI[0] * 4}px ${FIBONACCI[1] * 4}px
                  rgba(var(--renge-palette-black-rgb), 0.05)`,
    "layer-2": `0 ${FIBONACCI[1] * 4}px ${FIBONACCI[2] * 4}px
                  rgba(var(--renge-palette-black-rgb), 0.1)`,
    "layer-3": `0 ${FIBONACCI[2] * 4}px ${FIBONACCI[3] * 4}px
                  rgba(var(--renge-palette-black-rgb), 0.15)`,
    "focus": `0 0 0 3px var(--renge-color-border-focus)`,
    "inset": `inset 0 1px 2px rgba(var(--renge-palette-black-rgb), 0.05)`,
  };
}
```

**Time Estimate:** 3-4 hours  
**Dependencies:** Task 1.1–1.3 (should be done first)

---

### Task 2.2: Add React Hooks for Theme Switching

**Description:** Create hooks to consume Renge theme context and switch profiles/modes at runtime.

**Files to Create/Modify:**
- `packages/react/src/hooks/useRengeTheme.ts` (new)
- `packages/react/src/hooks/useRengeVar.ts` (new)
- `packages/react/src/hooks/index.ts` (update)
- `packages/react/src/index.ts` (export new hooks)
- `packages/react/src/__tests__/hooks.test.tsx` (new)

**Acceptance Criteria:**
- ✅ `useRengeTheme()` hook returns `{ profile, mode, switchProfile, switchMode }`
- ✅ Switching profile/mode updates CSS variable context
- ✅ `useRengeVar(varName, fallback?)` safely reads `var(--renge-*)`
- ✅ Both hooks work in provider + non-provider scenarios
- ✅ TypeScript types exported: `RengeThemeContext`, `RengeThemeHookReturn`
- ✅ Tests verify context updates propagate to DOM
- ✅ README in react package documents usage

**Code Pattern:**
```typescript
// packages/react/src/hooks/useRengeTheme.ts
import { useContext } from 'react';
import { RengeThemeContext } from '../context';

export interface RengeThemeHookReturn {
  profile: string;
  mode: 'light' | 'dark';
  switchProfile: (name: string) => void;
  switchMode: (mode: 'light' | 'dark') => void;
}

export function useRengeTheme(): RengeThemeHookReturn {
  const ctx = useContext(RengeThemeContext);
  if (!ctx) {
    throw new Error('useRengeTheme must be used within <RengeProvider>');
  }
  return ctx;
}

// packages/react/src/hooks/useRengeVar.ts
export function useRengeVar(
  varName: string,
  fallback: string = 'inherit'
): string {
  const [value, setValue] = useState<string>(fallback);

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    setValue(computed || fallback);
  }, [varName, fallback]);

  return `var(${varName}, ${fallback})`;
}
```

**Time Estimate:** 5-6 hours  
**Dependencies:** Task 1.4 (site needs these)

---

### Task 2.3: Add Interactive Token Explorer Component

**Description:** Build an interactive explorer that shows token values, derivations, and live previews as profiles switch.

**Files to Create:**
- `apps/app/components/TokenExplorer.tsx` (new)
- `apps/app/components/TokenExplorerCard.tsx` (new)
- `apps/app/app/explorer/page.tsx` (new route, optional)
- `apps/app/lib/tokenHelpers.ts` (utilities to parse + display tokens)

**Acceptance Criteria:**
- ✅ Explorer shows all spacing tokens with derivations
  - Example: "space-4: 20px (5 × 4px, Fibonacci[3])"
- ✅ Show typography scale with ratio explanations
  - Example: "lg: 25.9px (base × φ^1 ≈ 16 × 1.618)"
- ✅ Show color swatches for all semantic colors per profile
- ✅ Profile toggle switches all colors live
- ✅ Search/filter by token name
- ✅ Copy token name or CSS variable value on click
- ✅ Responsive grid layout
- ✅ Live on site (embed in Token Showcase section or separate page)

**UI Structure:**
```
┌─ Token Explorer ─────────────────────────┐
│ ┌─ Search ─────────────────────────────┐ │
│ │ [Filter tokens...                   ] │ │
│ └─────────────────────────────────────┘ │
│                                          │
│ ┌─ Tabs ──────────────────────────────┐ │
│ │ Spacing │ Typography │ Color │ Motion│ │
│ └─────────────────────────────────────┘ │
│                                          │
│ ┌─ Grid ──────────────────────────────┐ │
│ │ ┌──────────────┐ ┌──────────────┐   │ │
│ │ │ space-4      │ │ space-5      │   │ │
│ │ │ 20px         │ │ 32px         │   │ │
│ │ │ 5 × 4px      │ │ 8 × 4px      │   │ │
│ │ │ Fib[3]       │ │ Fib[4]       │   │ │
│ │ └──────────────┘ └──────────────┘   │ │
│ │ ...                                   │ │
│ └─────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

**Time Estimate:** 8-10 hours  
**Dependencies:** Task 2.2 (needs hooks)

---

### Task 2.4: Add Framework Adapters (Vue & Svelte)

**Description:** Create minimal adapters for Vue/Svelte so non-React teams can consume Renge tokens.

**Files to Create:**

**For Vue (`@renge-ui/vue`):**
- `packages/vue/package.json`
- `packages/vue/src/composables/useRengeTheme.ts`
- `packages/vue/src/components/RengeProvider.vue`
- `packages/vue/src/index.ts`
- `packages/vue/tsconfig.json`

**For Svelte (`@renge-ui/svelte`):**
- `packages/svelte/package.json`
- `packages/svelte/src/stores/theme.ts`
- `packages/svelte/src/components/RengeProvider.svelte`
- `packages/svelte/src/index.ts`
- `packages/svelte/tsconfig.json`

**Acceptance Criteria:**
- ✅ Vue composable: `const { profile, switchProfile, switchMode } = useRengeTheme()`
- ✅ Vue provider component works SSR-safe
- ✅ Svelte store: `profile`, `mode`, `switchProfile()`, `switchMode()`
- ✅ Both export token references (similar to `rengeVars` in React)
- ✅ Documentation in each package README
- ✅ Example component in each showing usage
- ✅ Both share `@renge-ui/tokens` dependency (one source of truth)

**Vue Code Pattern:**
```typescript
// packages/vue/src/composables/useRengeTheme.ts
import { provide, inject, reactive } from 'vue';

export function useRengeTheme() {
  const state = reactive({
    profile: 'ocean',
    mode: 'light',
  });

  const switchProfile = (name: string) => {
    state.profile = name;
    document.documentElement.setAttribute('data-profile', name);
  };

  const switchMode = (mode: 'light' | 'dark') => {
    state.mode = mode;
    document.documentElement.setAttribute('data-mode', mode);
  };

  provide('renge', { state, switchProfile, switchMode });
  return { ...state, switchProfile, switchMode };
}

export function useRengeInject() {
  const renge = inject('renge');
  if (!renge) throw new Error('useRenge must be inside RengeProvider');
  return renge;
}
```

**Svelte Code Pattern:**
```typescript
// packages/svelte/src/stores/theme.ts
import { writable } from 'svelte/store';

export const profile = writable('ocean');
export const mode = writable('light');

export function switchProfile(name: string) {
  profile.set(name);
  document.documentElement.setAttribute('data-profile', name);
}

export function switchMode(m: 'light' | 'dark') {
  mode.set(m);
  document.documentElement.setAttribute('data-mode', m);
}
```

**Time Estimate:** 6-8 hours per framework (12-16 total)  
**Dependencies:** Task 2.2 (same patterns)

---

## Phase 3: Nice-to-Have (Deferred)
**Target: Future sprints | Lower priority**

### Task 3.1: Add Form Components to React

**Status:** DEFERRED  
**Rationale:** Already have 21 primitives; forms are next-level

**Components Needed:**
- `Input` — text, email, password, number, etc.
- `Select` — dropdown with arrow
- `Textarea` — multi-line text
- `Checkbox` — boolean toggle
- `Radio` — single choice from group
- `FormGroup` — layout helper for label + input + error

**Time Estimate:** 12-15 hours  
**Dependencies:** None, but Phase 2 should complete first

---

### Task 3.2: Figma Token Sync Plugin

**Status:** DEFERRED  
**Rationale:** Design tool integration for larger orgs

**Scope:**
- Figma plugin fetches Renge JSON tokens
- Syncs to Figma design file on demand
- One-way sync (Renge → Figma, not vice versa)

**Time Estimate:** 20-30 hours  
**Dependencies:** Published `@renge-ui/tokens` package

---

### Task 3.3: Bundle Size Budgets & CI Integration

**Status:** DEFERRED  
**Rationale:** Nice-to-have for monitoring, not blocking

**Scope:**
- Add `bundlebudget.json` config
- GitHub Actions workflow to check on PR
- Report in PR comments

**Time Estimate:** 4-6 hours  
**Dependencies:** None

---

## Testing Strategy

### For Each Task

Before marking complete, verify:

```bash
# Global
pnpm lint
pnpm typecheck
pnpm test

# Per package
cd packages/<name>
pnpm build
pnpm test
pnpm typecheck

# For site
cd apps/app
pnpm build
# Test /out in browser
```

### Visual Regression

For site tasks, take screenshots:
- Desktop (1440px)
- Tablet (768px)
- Mobile (375px)

Compare to baseline if available.

---

## Implementation Order

### Week 1 (Phase 1)
1. **Monday:** Task 1.1 (Z-Index) + Task 1.2 (Dimensions)
2. **Tuesday–Wednesday:** Task 1.3 (Test Utils)
3. **Thursday–Friday:** Task 1.4 (Site Vibe Check)

### Week 2 (Phase 2, Part 1)
1. **Monday:** Task 2.1 (Shadows)
2. **Tuesday–Wednesday:** Task 2.2 (React Hooks)
3. **Thursday–Friday:** Start Task 2.3 (Token Explorer)

### Week 3 (Phase 2, Part 2)
1. **Monday–Tuesday:** Finish Task 2.3
2. **Wednesday–Friday:** Task 2.4 (Framework Adapters)

---

## Handoff to Claude Code

Use this command to feed Claude Code the plan:

```bash
# Start Claude Code with context
claude code --file IMPLEMENTATION_PLAN.md --cwd ~/Desktop/code/_priv/renge

# Or start manually and paste:
# "I have this implementation plan. Start with Task 1.1. Only ask clarifications for ambiguous requirements."
```

---

## Acceptance Checklist (Final)

- [ ] All Phase 1 tasks complete + tests passing
- [ ] All Phase 2 tasks complete + tests passing
- [ ] Site vibe check: 7/7 criteria met
- [ ] README.md updated with new features
- [ ] No breaking changes to existing API
- [ ] Bundle sizes within budget (if set)
- [ ] TypeScript strict mode passes
- [ ] Git history is clean (good commit messages)

---

## Success Criteria

**Go/No-Go for 1.0:**

✅ Token system is complete (spacing, type, color, motion, shadow, z-index, dimensions)  
✅ Testing framework validates all scales  
✅ React hooks enable dynamic theme switching  
✅ Site showcases all features beautifully  
✅ Framework adapters (Vue/Svelte) available  
✅ Documentation is comprehensive  
✅ Bundle sizes are optimized  

**Expected result:** Renge is ready for production use across teams, frameworks, and design tools.

---

## Notes for Claude Code

1. **Ask before installing dependencies** — if new libraries are needed, list them first
2. **Keep git history clean** — one commit per logical task
3. **Run tests after each task** — catch issues early
4. **Ask for clarification if:**
   - Token derivation seems wrong (verify with original specs)
   - UI/UX decisions needed (color choices, component APIs)
   - Breaking API changes required
5. **Prioritize Phase 1** — these are the foundations everything else builds on
6. **Test in browser** for site tasks — visual verification matters

---

**Ready to begin. Good luck!**
