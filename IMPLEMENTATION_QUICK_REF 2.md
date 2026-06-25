# Renge Implementation Plan: Quick Reference for Claude Code

## TL;DR

Renge needs **3 weeks of focused work** across **two phases + deferred nice-to-haves**.

**This file:** Fast lookup. Refer to `IMPLEMENTATION_PLAN.md` for full details.

---

## Phase 1: Quick Wins (Week 1, ~20 hours)

| Task | Time | What | Why | Done When |
|------|------|------|-----|-----------|
| 1.1 | 2–3h | Z-Index tokens | Semantic layer ordering (dropdown=100, modal=400, etc.) | CSS vars generated, TypeScript types exported |
| 1.2 | 3–4h | Dimension scale | Width/height/min/max tokens for responsive design | `--renge-w-*`, `--renge-h-*`, `--renge-min-*`, `--renge-max-*` work |
| 1.3 | 4–5h | Test utils pkg | Validators for spacing/type/contrast scales | `validateSpacingScale()`, `validateTypeScale()` pass tests |
| 1.4 | 4–6h | Site vibe check | Fix site against CLAUDE.md checklist (7 criteria) | All 7 vibe checks ✅ |

**Total:** ~22 hours | **By end of Week 1**

---

## Phase 2: Medium Effort (Weeks 2–3, ~40 hours)

| Task | Time | What | Why | Done When |
|------|------|------|-----|-----------|
| 2.1 | 3–4h | Shadow tokens | Layered shadows + focus ring (Fibonacci-based) | `--renge-shadow-layer-*`, `--renge-shadow-focus` |
| 2.2 | 5–6h | React hooks | `useRengeTheme()`, `useRengeVar()` for runtime switching | Hooks work in provider + theme toggling works |
| 2.3 | 8–10h | Token explorer | Interactive UI showing all tokens, searchable, preview on toggle | Component renders, search filters, copy works |
| 2.4 | 12–16h | Framework adapters | Vue + Svelte composables/stores mirroring React | Both Vue and Svelte have working examples |

**Total:** ~38 hours | **By end of Week 3**

---

## Phase 3: Deferred (Future)

| Task | Time | Status | 
|------|------|--------|
| 3.1 | 12–15h | Form components (Input, Select, Checkbox, etc.) | 
| 3.2 | 20–30h | Figma plugin for token sync |
| 3.3 | 4–6h | Bundle size CI checks |

---

## File Map

### Create These

```
packages/
  tokens/src/scales/
    ├── z-index.ts          ← NEW (Task 1.1)
    ├── dimensions.ts       ← NEW (Task 1.2)
    └── shadows.ts          ← NEW (Task 2.1)
  
  test-utils/             ← NEW DIR (Task 1.3)
    ├── package.json
    ├── src/
    │   ├── validators.ts
    │   ├── snapshots.ts
    │   └── __tests__/validators.test.ts
    └── tsconfig.json

  react/src/hooks/        ← NEW (Task 2.2)
    ├── useRengeTheme.ts
    ├── useRengeVar.ts
    └── index.ts

  vue/                    ← NEW DIR (Task 2.4)
    ├── package.json
    ├── src/composables/useRengeTheme.ts
    ├── src/components/RengeProvider.vue
    └── tsconfig.json

  svelte/                 ← NEW DIR (Task 2.4)
    ├── package.json
    ├── src/stores/theme.ts
    ├── src/components/RengeProvider.svelte
    └── tsconfig.json

apps/app/
  ├── components/
  │   ├── TokenExplorer.tsx        ← NEW (Task 2.3)
  │   ├── TokenExplorerCard.tsx    ← NEW
  │   └── sections/
  │       └── [check completeness against CLAUDE.md]
  ├── lib/tokenHelpers.ts          ← NEW (Task 2.3)
  └── app/explorer/page.tsx        ← NEW (Task 2.3, optional)
```

### Modify These

```
packages/
  tokens/src/
    ├── scales/index.ts    ← add exports from 1.1, 1.2, 2.1
    ├── theme.ts           ← generate new vars
    ├── vars.ts            ← export rengeVars.zIndex, .dimension, .shadow
    └── types.ts           ← add types if needed

  react/src/
    ├── index.ts           ← export new hooks
    └── __tests__/hooks.test.tsx ← tests for 2.2

apps/app/
  └── [sections per CLAUDE.md vibe check]
```

---

## Key Code Patterns

### Z-Index (Task 1.1)
```ts
// scales/z-index.ts
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

**Result:** `--renge-zindex-modal: 400`

### Dimensions (Task 1.2)
```ts
// scales/dimensions.ts
export function createDimensionScale(baseUnit: number = 4) {
  return {
    width: { auto, full, screen, ...containers },
    height: { auto, full, screen, ...fibonacci },
    minWidth: { 0, auto, ...fibonacci },
    maxWidth: { none, full, ...fibonacci },
  };
}
```

**Result:** `--renge-w-full: 100%`, `--renge-min-w-fib3: 12px`

### Test Validators (Task 1.3)
```ts
// test-utils/src/validators.ts
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateSpacingScale(scale: Record<string, string>): ValidationResult {
  // Assert monotonically increasing
  // Return { valid: true/false, errors: [...] }
}
```

### React Hooks (Task 2.2)
```ts
// react/src/hooks/useRengeTheme.ts
export function useRengeTheme() {
  const ctx = useContext(RengeThemeContext);
  return { profile, mode, switchProfile, switchMode };
}

// Usage:
const { profile, switchProfile } = useRengeTheme();
```

### Framework Adapters
```ts
// vue/src/composables/useRengeTheme.ts
export function useRengeTheme() {
  const state = reactive({ profile: 'ocean', mode: 'light' });
  const switchProfile = (name) => { state.profile = name; /* update DOM */ };
  return { state, switchProfile };
}
```

---

## Testing Requirements

### After Each Task
```bash
pnpm lint
pnpm typecheck
pnpm test

# Per package
cd packages/<name>
pnpm build
pnpm test
```

### Site Tasks (Visual Verification)
- Desktop: 1440px screenshot
- Tablet: 768px screenshot
- Mobile: 375px screenshot
- Compare to baseline or manual QA

---

## Vibe Check Checklist (Task 1.4)

```
☐ PHI spiral visible within 3 seconds (hero section)
☐ Ratio 1:1.618 displayed prominently
☐ Color profile toggle switches all colors live (no reload)
☐ Typography scale (xs–4xl) visible with math
☐ Motion uses 1300–5500ms durations (slow, deliberate)
☐ Non-designer finds it beautiful (subjective taste)
☐ Engineer finds code credible (uses var(--renge-*), no hardcodes)
```

All 7 must be ✅ before marking complete.

---

## Git Workflow

**Per task:**
```bash
git checkout -b feat/task-1-1-z-index
# ... implement
pnpm lint && pnpm typecheck && pnpm test
git add -A
git commit -m "feat(tokens): add z-index scale (task 1.1)"
git push origin feat/task-1-1-z-index
```

**Commit message format:**
```
feat(package): short description (task X.Y)

Longer explanation if needed.

Closes: (if applicable)
```

---

## Common Pitfalls

❌ **Don't:** Hardcode spacing/colors until tokens exist  
✅ **Do:** Create token first, then use it

❌ **Don't:** Build components before tokens are complete  
✅ **Do:** Tokens → hooks → components (bottom-up)

❌ **Don't:** Skip tests to move faster  
✅ **Do:** Tests catch scaling errors early

❌ **Don't:** Use arbitrary CSS in site  
✅ **Do:** Use only `var(--renge-*)`

---

## Checkpoints

| Week | Checkpoint | Owner | Status |
|------|-----------|-------|--------|
| 1 | Tasks 1.1, 1.2, 1.3 done + tests pass | Claude Code | TODO |
| 1 | Task 1.4 (site vibe check) passes | Claude Code | TODO |
| 2 | Task 2.1 (shadows) complete | Claude Code | TODO |
| 2 | Task 2.2 (hooks) and 2.3 (explorer) in progress | Claude Code | TODO |
| 3 | Task 2.3 complete, 2.4 in progress | Claude Code | TODO |
| 3 | All Phase 2 tasks done, tests pass, site deployed | Claude Code | TODO |

---

## Escalate If

- ✋ Token math seems wrong (verify with `PHI = 1.618033...`)
- ✋ UI/UX decision needed (colors, component shapes, animations)
- ✋ New dependency required (ask before installing)
- ✋ Breaking API change unavoidable (needs owner approval)
- ✋ Timeline slipping more than 1 day per task

---

## Success Looks Like

- **Week 1 end:** Phase 1 complete, site vibe-checked ✅
- **Week 3 end:** Phase 2 complete, all tests green, site + frameworks ready ✅
- **Bonus:** Framework adapters used by real projects 🚀

---

**Start with Task 1.1. Only ask clarifications if requirements are genuinely ambiguous. You've got this!**
