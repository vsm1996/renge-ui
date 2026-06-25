# Renge: Handoff Script for Claude Code

**Copy everything below and paste into Claude Code to begin.**

---

## HANDOFF MESSAGE

I have a design system called Renge that needs enhancements across token system, React hooks, and the marketing site. I'm handing off an implementation plan with 8 tasks across 2 phases.

**Start with Phase 1 (4 tasks, ~20–25 hours of work). Only ask clarifications if the requirements are genuinely ambiguous.**

Here's what I need:

### Understanding the Mission

Renge is a proportional design system rooted in φ (golden ratio) and Fibonacci. The philosophy is: **Interfaces should feel mathematically correct before users understand why intellectually.**

Current state:
- ✅ Core token system exists (spacing, typography, color, motion via @renge-ui/tokens)
- ✅ React component layer exists (@renge-ui/react)
- ✅ Tailwind integration exists (@renge-ui/tailwind)
- ✅ Marketing site exists (Next.js, self-consuming tokens)

Gaps:
- Missing tokens: z-index, dimensions, shadows
- Missing testing framework for token scales
- Missing React hooks for theme switching
- Site doesn't fully implement the design spec (CLAUDE.md)
- Missing framework adapters (Vue, Svelte)

### Phase 1: Quick Wins (Week 1, ~22 hours)

#### Task 1.1: Add Z-Index Scale (2–3 hours)

Create semantic z-index tokens. No math involved—just layering convention.

**Location:** Create `packages/tokens/src/scales/z-index.ts`

**Deliverable:**
```
--renge-zindex-dropdown: 100
--renge-zindex-sticky: 200
--renge-zindex-fixed: 300
--renge-zindex-modal: 400
--renge-zindex-toast: 500
```

**Also:**
- Export from `scales/index.ts`
- Generate vars in `theme.ts`
- Add `rengeVars.zIndex` in `vars.ts`
- Add types in `types.ts`
- Test: `pnpm test` in tokens package passes

**Success:** `rengeVars.zIndex.modal` returns `"var(--renge-zindex-modal)"` and CSS is generated.

---

#### Task 1.2: Add Dimension Scale (3–4 hours)

Create width, height, min-width, max-width tokens for responsive design.

**Location:** Create `packages/tokens/src/scales/dimensions.ts`

**Deliverable:**
```
--renge-w-auto: auto
--renge-w-full: 100%
--renge-w-screen: 100vw
--renge-w-sm/md/lg/xl: (from container widths)

--renge-h-auto: auto
--renge-h-full: 100%
--renge-h-screen: 100vh
--renge-h-fib*: (Fibonacci × baseUnit)

--renge-min-*: (0, auto, + Fibonacci)
--renge-max-*: (none, full, + Fibonacci)
```

**Key:** Fibonacci values scale naturally for responsive grids.

**Also:**
- Export from `scales/index.ts`
- Generate vars in `theme.ts`
- Add `rengeVars.dimension` in `vars.ts`
- Test: assert monotonic increase

**Success:** `rengeVars.dimension.width.full` works and CSS vars are consistent.

---

#### Task 1.3: Add Test Utils Package (4–5 hours)

Create `@renge-ui/test-utils` with validators for token correctness.

**Location:** Create `packages/test-utils/`

**Structure:**
```
packages/test-utils/
├── package.json
├── src/
│   ├── index.ts
│   ├── validators.ts
│   └── __tests__/validators.test.ts
└── tsconfig.json
```

**Validators to implement:**
1. `validateSpacingScale(scale)` — assert monotonically increasing
2. `validateTypeScale(scale, expectedRatio)` — assert φ ratio between steps
3. `validateContrastRatio(fg, bg, minRatio)` — check WCAG contrast (can stub for now)

**Each returns:**
```ts
{ valid: boolean, errors: string[], warnings: string[] }
```

**Also:**
- Update `pnpm-workspace.yaml` if needed
- Add to root `package.json` if monorepo doesn't auto-detect
- Document in package README

**Success:** `validateSpacingScale(createSpacingScale(4))` returns `{ valid: true, errors: [] }`

---

#### Task 1.4: Vibe Check Site Against CLAUDE.md (4–6 hours)

The site has a design spec in CLAUDE.md. Go through this checklist and fix any gaps.

**Vibe Check Criteria (all must be ✅):**

1. **PHI visible within 3 seconds of landing**
   - Hero section has animated golden spiral (SVG)
   - Opacity ~20%, subtle
   - Component: Create `PhiSpiral.tsx` if it doesn't exist
   
2. **Ratio 1:1.618 visibly displayed**
   - Hero or Philosophy section shows "1 : 1.618" label
   - Accompanied by a proportional rectangle
   
3. **Color profile toggle works**
   - Toggle switches between ocean, earth, twilight
   - Page repaints instantly (not reload)
   - All sections change color in real-time
   
4. **Typography scale is visible with math**
   - Show all 8 sizes (xs–4xl)
   - Display size in px and derivation
   - Ex: "lg: 25.9px = base × φ^1"
   
5. **Motion is slow + deliberate**
   - Scroll reveals use 1000–5500ms durations
   - Easing is `ease-out` or `spring`, not snappy
   - Motion feels inevitable, not flashy
   
6. **Non-designer finds it beautiful**
   - Visual hierarchy is clear
   - Color profiles feel like different "worlds"
   - Subjective—use your taste judgment
   
7. **Engineer finds it credible**
   - Components use `var(--renge-*)`, no hardcoded colors
   - Code is readable and organized
   - Audit a few components; all should consume tokens

**If components are missing, create them:**
- `PhiSpiral.tsx` — animated SVG spiral
- `ProfileToggle.tsx` — buttons to switch profiles
- `TypeScaleShowcase.tsx` — show all 8 sizes with derivations
- `MotionDemonstrator.tsx` — hover to trigger easing demos

**Success:** Take screenshots (desktop, tablet, mobile) and verify all 7 checks pass.

---

### Phase 2: Medium Effort (Weeks 2–3, ~38 hours)

I'll include these in the document, but focus on Phase 1 first.

---

## Additional Context

**Project structure:**
```
renge/
├── packages/
│   ├── tokens/          (core: spacing, type, color, motion)
│   ├── react/           (React primitives)
│   ├── tailwind/        (Tailwind integration)
│   └── test-utils/      (← new in 1.3)
├── apps/
│   └── app/             (Next.js marketing site)
├── IMPLEMENTATION_PLAN.md    (full details)
├── IMPLEMENTATION_QUICK_REF.md (cheat sheet)
└── tsconfig.base.json
```

**Key files:**
- `packages/tokens/src/theme.ts` — where vars are generated
- `packages/tokens/src/vars.ts` — static TypeScript variable references
- `packages/tokens/src/scales/index.ts` — barrel export
- `apps/app/app/page.tsx` — main site page (if it's route-based)

**Commands:**
```bash
pnpm lint              # Check all
pnpm typecheck         # TypeScript
pnpm test              # Run tests
cd packages/tokens && pnpm build  # Build one package
cd apps/app && pnpm dev           # Dev site on localhost:3000
```

**Important conventions:**
- Keep git history clean (one logical commit per task)
- All tokens must derive from φ, Fibonacci, or clear semantic logic
- Site must use ONLY `var(--renge-*)` for colors/spacing/motion—no hardcodes
- Before marking done: tests pass, TypeScript strict, site builds

---

## Your Mission

1. **Start with Task 1.1** (z-index, ~2–3h)
2. **Then Task 1.2** (dimensions, ~3–4h)
3. **Then Task 1.3** (test-utils, ~4–5h)
4. **Then Task 1.4** (site vibe-check, ~4–6h)

After each task:
```bash
pnpm lint && pnpm typecheck && pnpm test
git commit -m "feat(package): description (task X.Y)"
```

**Only ask me questions if:**
- Requirement is genuinely ambiguous
- You need clarification on design intent
- You discover a blocker or missing dependency

**Assume:**
- Monorepo is healthy and `pnpm install` has been run
- TypeScript/Vitest/ESLint are configured
- You can run `pnpm build` and `pnpm test` freely
- Git history is clean (use rebasing if needed)

---

## Done Criteria

**Phase 1 is complete when:**
- ✅ All 4 tasks have PRs or commits
- ✅ `pnpm lint`, `pnpm typecheck`, `pnpm test` all pass
- ✅ Site vibe-check: all 7 criteria ✅
- ✅ No breaking changes to public APIs

---

## Let's Go

Read the full `IMPLEMENTATION_PLAN.md` for detailed specs. Read `IMPLEMENTATION_QUICK_REF.md` for a cheat sheet.

**Ready to start. Begin with Task 1.1. Ask only if truly stuck.**

---
