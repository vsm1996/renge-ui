# Renge Site — Claude Code Instructions
## From Storybook to Next.js Marketing Site

---

## THE VISION

Renge is not a component library. It is a design language built on natural mathematics — PHI, Fibonacci, phyllotaxis. The site must make visitors FEEL the proportion before they understand it intellectually.

The experience should produce one response: *"Something is different here. Something feels more correct than usual. Why does this feel like that?"*

THEN give them the language for why.

This is the DaisyUI approach applied to mathematical philosophy. Show first. Explain second.

---

## TECH STACK

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS
- @renge/tokens (consuming its own system — the site IS the proof of concept)
- Framer Motion for scroll-triggered reveals
- pnpm

---

## AESTHETIC DIRECTION

**Tone:** Refined mathematical minimalism. Not cold. Not sterile. ALIVE with precision.

Think: natural systems made visible. The spiral of a nautilus shell rendered as a design system. Organic but structured. Mathematical but warm.

**Color:** Use Renge's own color profiles — Clear, Earth, Twilight. The site should demonstrate all three with a toggle or scroll-based reveal.

**Typography:** 
- Display: Something with presence. DM Serif Display or Cormorant Garamond for headers — classical, mathematical, confident.
- Body: A geometric sans that breathes. Outfit or DM Sans. NOT Inter. NOT system fonts.
- The typography scale must visibly demonstrate PHI ratios. The headers should feel proportionally correct in a way the visitor cannot articulate but absolutely feels.

**Motion:**
- Scroll-triggered reveals. Staggered. Slow. Deliberate.
- Not flashy. The motion should feel like the proportion itself — inevitable, correct, natural.
- Numbers and ratios counting up on scroll entry.
- The PHI spiral as a subtle background element. SVG. Thin stroke. Barely there.

**Layout:**
- Generous negative space.
- Grid that visibly demonstrates mathematical proportion.
- The layout IS the argument. Every spacing decision uses Renge tokens.
- One grid-breaking hero element that demonstrates PHI golden ratio visually before any text explains it.

---

## SITE STRUCTURE

### 1. HERO

**The feeling:** You land and immediately something is *correct* about this page. You don't know why yet.

- Full viewport height
- PHI golden ratio rectangle visible as a geometric element — not decorated, just present
- The ratio 1:1.618 displayed somewhere subtle
- Headline: "Proportion as a first principle."
- Subheadline: "Renge is a design system built on natural mathematics. PHI. Fibonacci. The ratios that appear in every living thing."
- Single CTA: "Explore the system" → scrolls to tokens
- Renge logo mark (if exists) or a geometric PHI-based mark
- Subtle animated PHI spiral in background — SVG, very low opacity, slowly rotating or drawing itself in

---

### 2. PHILOSOPHY SECTION

**The feeling:** The mathematical argument made visceral.

- Section title: "Why natural mathematics?"
- Three columns, each demonstrating a principle:
  1. **PHI** — 1.618033... — "The golden ratio appears in nautilus shells, sunflower spirals, galaxy arms. We built the spacing scale from it."
  2. **Fibonacci** — 1, 1, 2, 3, 5, 8, 13... — "The sequence that generates PHI. Every Renge size step follows it."  
  3. **Phyllotaxis** — "The pattern of leaves on a stem. Nature's solution to optimal packing. The logic behind our grid."
- Each column has a subtle animated visualization — not decorative, mathematical
- Numbers count up on scroll entry
- The proportions of the columns themselves demonstrate the ratio

---

### 3. TOKEN SHOWCASE

**The feeling:** The system made visible.

#### 3a. COLOR PROFILES
- Three profiles: Clear, Earth, Twilight
- Toggle between them — the page repaints in real time
- Show the OKLCH values — don't hide the math
- Demonstrate the palette with actual swatches + hex/OKLCH values
- Show light and dark variants

#### 3b. SPACING SCALE
- Visual demonstration of the spacing scale
- Each step labeled with its PHI derivation
- Show the mathematical relationship between steps
- Not just boxes — make it feel like a musical scale

#### 3c. TYPOGRAPHY SCALE  
- All type sizes displayed
- The PHI ratio between each step visible
- Show the scale in use — actual sentences, not "lorem ipsum"
- The sentences should be about proportion, mathematics, natural systems

#### 3d. MOTION SCALE
- Demonstrate the easing curves
- Show the duration scale
- Make the demos interactive — hover to trigger

#### 3e. RADIUS SCALE
- Show the radius progression
- Mathematical derivation visible

---

### 4. GETTING STARTED

**The feeling:** Simple. Inevitable. Of course this is how you install it.

```bash
pnpm add @renge/tokens
```

Show the three setup options:
1. CSS custom properties
2. JavaScript/TypeScript tokens
3. Tailwind preset (when available)

Code blocks styled with Renge's own syntax theme.

---

### 5. COMING SOON — @renge/react

Single section. Clean.

"React components built on the token system. Coming soon."

Email capture for launch notification.

---

### 6. FOOTER

- GitHub link
- Part of the Soka Labs ecosystem
- "Built with Renge" — self-referential, intentional
- The PHI ratio displayed one more time. A closing argument.

---

## COMPONENT ARCHITECTURE

```
src/
  app/
    page.tsx          — main page, imports all sections
    layout.tsx        — root layout, Renge CSS variables applied here
    globals.css       — Renge token imports, base styles
  components/
    sections/
      Hero.tsx
      Philosophy.tsx
      TokenShowcase.tsx
      GettingStarted.tsx
      ComingSoon.tsx
      Footer.tsx
    ui/
      PhiSpiral.tsx         — SVG animated spiral
      TokenSwatch.tsx       — color swatch component
      SpacingDemo.tsx       — spacing scale visualization
      TypeScale.tsx         — typography scale demo
      MotionDemo.tsx        — easing curve demos
      CodeBlock.tsx         — syntax highlighted code
      ProfileToggle.tsx     — Clear/Earth/Twilight switcher
  lib/
    tokens.ts         — imported from @renge/tokens
    phi.ts            — PHI constant utilities
```

---

## IMPLEMENTATION PRIORITIES

**Day 1 (today):**
1. Next.js scaffold with @renge/tokens installed and consuming itself
2. Hero section complete — full viewport, PHI geometry visible, headline landed
3. Philosophy section complete
4. Basic routing and layout

**Day 2 (tomorrow):**
1. Token showcase sections — Color, Spacing, Typography
2. Getting Started section with code blocks
3. Coming Soon section
4. Footer
5. Polish — motion, scroll reveals, profile toggle
6. Deploy to Vercel

---

## THE NON-NEGOTIABLES

1. **The site must consume @renge/tokens exclusively for all design decisions.** No hardcoded colors. No arbitrary spacing values. If a token doesn't exist for it, create the token first.

2. **PHI must be visible before it's explained.** The geometry comes first. The label comes second.

3. **No Inter. No system fonts.** The typography must have presence.

4. **The color profile toggle must work.** Clear, Earth, Twilight — all three must be demonstrable.

5. **Mobile responsive.** The proportion must hold at every breakpoint.

6. **Performance.** This is a design system site. It must be fast. No excuses.

7. **The site must feel like Renge.** Not like a developer built a quick docs site. Like the system built its own home.

---

## THE VIBE CHECK

Before shipping, ask:

- Does landing on this page produce a feeling of *correctness* before any reading happens?
- Is PHI visible within 3 seconds of landing?
- Does the typography scale feel mathematically inevitable?
- Do the color profiles feel distinctly different — not just different hues but different *worlds*?
- Does the motion feel like the proportion — slow, deliberate, inevitable?
- Would someone who doesn't know what a design system is still find this beautiful?
- Would a senior engineer find this technically credible?

If yes to all — ship it.

---

## VOICE AND COPY DIRECTION

Renge's voice is:
- Confident without arrogance
- Mathematical without coldness  
- Philosophical without being inaccessible
- Short sentences. Precise words. No filler.

Example headline hierarchy:
- "Proportion as a first principle." ✓
- "A design system built on natural mathematics." ✓  
- "Because beautiful interfaces follow the same ratios as living things." ✓
- "Welcome to our comprehensive design system solution!" ✗

Every word on this site should feel like it was chosen the way a Renge token was chosen — because it is mathematically correct, not because it was convenient.

---

*Built by Soka Labs. Proportion as a first principle.*