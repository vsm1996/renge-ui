# Renge Math — Implementation Patterns & Code Examples

This document shows **exact code patterns** for using Renge's mathematical scales in real projects.

---

## 📦 Importing Renge Tokens

### From TypeScript/JavaScript
```typescript
import {
  PHI,
  FIBONACCI,
  GOLDEN_ANGLE,
  rengeVars,
  createTheme,
} from '@renge/tokens';

console.log(PHI);       // 1.618033988749895
console.log(FIBONACCI); // [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
console.log(GOLDEN_ANGLE); // 137.5077640500378
```

### From CSS (CSS Custom Properties)
```css
/* Root theme variables are automatically injected */
:root {
  --renge-space-4: 20px;
  --renge-fontSize-lg: 25.9px;
  --renge-container-md: 848px;
  --renge-easing-spring: cubic-bezier(0.382, 0.618, 0.618, 1.382);
  /* ... hundreds more ... */
}
```

---

## 🎨 Spacing Examples

### Padding (All Directions)
```css
/* Single value */
.button {
  padding: var(--renge-space-3);  /* 12px all sides */
}

/* Shorthand (top/bottom, left/right) */
.card {
  padding: var(--renge-space-4) var(--renge-space-5);  /* 20px vert, 32px horiz */
}

/* Responsive padding */
.section {
  padding: var(--renge-space-4);  /* 20px mobile */
}

@media (min-width: 768px) {
  .section {
    padding: var(--renge-space-6);  /* 52px tablet */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--renge-space-7);  /* 84px desktop */
  }
}
```

### Margin
```css
/* Margin between sections */
.section + .section {
  margin-top: var(--renge-space-6);  /* 52px */
}

/* Vertical flow spacing */
.article h2 {
  margin-top: var(--renge-space-8);      /* 136px */
  margin-bottom: var(--renge-space-4);   /* 20px */
}

.article p {
  margin-bottom: var(--renge-space-5);   /* 32px */
}
```

### Gap (Flexbox/Grid)
```css
/* Gap between flex items */
.flex-row {
  display: flex;
  gap: var(--renge-space-4);  /* 20px between items */
}

/* Gap in grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--renge-space-6);  /* 52px between cells */
}

/* Different gaps for rows vs columns */
.grid-asymmetric {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--renge-col-md), 1fr));
  row-gap: var(--renge-space-6);     /* 52px between rows */
  column-gap: var(--renge-space-5);  /* 32px between columns */
}
```

---

## 📐 Layout Examples

### Container with Gutters
```css
.container {
  /* Max width as specified breakpoint */
  max-width: var(--renge-container-md);
  
  /* Horizontal padding (gutters) — scaled by breakpoint */
  padding-left: calc(1.5 * var(--renge-space-5));   /* 48px */
  padding-right: calc(1.5 * var(--renge-space-5));  /* 48px */
  
  /* Center the container */
  margin-left: auto;
  margin-right: auto;
  
  /* Default: md breakpoint styling */
}

/* Scale gutters up at tablet */
@media (min-width: 768px) {
  .container {
    max-width: var(--renge-container-lg);
    padding-left: calc(2 * var(--renge-space-6));   /* 104px */
    padding-right: calc(2 * var(--renge-space-6));  /* 104px */
  }
}

/* Scale gutters up at desktop */
@media (min-width: 1024px) {
  .container {
    max-width: var(--renge-container-xl);
    padding-left: calc(2.5 * var(--renge-space-6));  /* 130px */
    padding-right: calc(2.5 * var(--renge-space-6)); /* 130px */
  }
}
```

### Hero Section with PHI Aspect Ratio
```css
.hero {
  /* Use golden rectangle proportion */
  aspect-ratio: var(--renge-aspect-golden);  /* 1.618:1 */
  
  /* Full width container */
  width: 100%;
  
  /* Generous padding */
  padding: var(--renge-space-8);
  
  /* Centered content */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
```

### Multi-Column Grid (Auto-Fit + Min-Width)
```css
.card-grid {
  display: grid;
  
  /* Auto-reflow based on container width and column min-size */
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--renge-col-md), 1fr)
  );
  
  /* Consistent spacing */
  gap: var(--renge-space-6);
  
  /* Responsive: mobile (1 col) → tablet (2 col) → desktop (3 col) auto */
}

/* Optional: Force specific column counts at different breakpoints */
@media (max-width: 440px) {
  .card-grid {
    grid-template-columns: 1fr;  /* 1 column below col-md threshold */
  }
}

@media (min-width: 881px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
  }
}

@media (min-width: 1321px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
  }
}
```

---

## 🔤 Typography Examples

### Display Heading
```css
h1 {
  /* Largest type size */
  font-size: var(--renge-fontSize-4xl);     /* 177.4px */
  
  /* Tight line-height for display */
  line-height: var(--renge-lineHeight-display);  /* 1.236 */
  
  /* Add breathing room */
  margin-bottom: var(--renge-space-5);  /* 32px */
}
```

### Subheading
```css
h2 {
  font-size: var(--renge-fontSize-2xl);      /* 67.8px */
  line-height: var(--renge-lineHeight-heading); /* 1.382 */
  margin-bottom: var(--renge-space-4);  /* 20px */
}
```

### Article Body Text
```css
article p {
  font-size: var(--renge-fontSize-base);    /* 16px */
  line-height: var(--renge-lineHeight-body);  /* 1.618 */
  margin-bottom: var(--renge-space-5);  /* 32px */
  
  /* Good line length for readability */
  max-width: var(--renge-container-md);  /* 848px */
}
```

### Type Scale Showcase
```css
.type-scale {
  display: flex;
  flex-direction: column;
  gap: var(--renge-space-5);  /* Breathing room between sizes */
}

.type-xs { font-size: var(--renge-fontSize-xs); }    /* 9.9px */
.type-sm { font-size: var(--renge-fontSize-sm); }    /* 12.6px */
.type-base { font-size: var(--renge-fontSize-base); } /* 16px */
.type-lg { font-size: var(--renge-fontSize-lg); }    /* 25.9px */
.type-xl { font-size: var(--renge-fontSize-xl); }    /* 41.9px */
.type-2xl { font-size: var(--renge-fontSize-2xl); }  /* 67.8px */
.type-3xl { font-size: var(--renge-fontSize-3xl); }  /* 109.7px */
.type-4xl { font-size: var(--renge-fontSize-4xl); }  /* 177.4px */
```

---

## 🎬 Motion Examples

### Smooth Entrance Animation
```css
.fade-in {
  opacity: 0;
  animation: fadeIn var(--renge-duration-4) var(--renge-easing-ease-out) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(var(--renge-space-4));  /* 20px down */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Playful Button Hover
```css
.button {
  transition: transform var(--renge-duration-2) var(--renge-easing-spring);
  /* 200ms with overshoot for playful feel */
}

.button:hover {
  transform: scale(1.05);
}
```

### Modal Transition
```css
.modal {
  opacity: 0;
  transform: scale(0.95);
  
  /* Slow, deliberate entrance */
  transition: opacity var(--renge-duration-5) var(--renge-easing-ease-in-out),
              transform var(--renge-duration-5) var(--renge-easing-ease-in-out);
}

.modal.open {
  opacity: 1;
  transform: scale(1);
}
```

### Page Exit Animation
```css
.page-exit {
  opacity: 1;
  
  /* Fast exit, snap toward end */
  animation: exitDown var(--renge-duration-3) var(--renge-easing-ease-out) forwards;
}

@keyframes exitDown {
  to {
    opacity: 0;
    transform: translateY(var(--renge-space-8));  /* 136px */
  }
}
```

### Scroll-Triggered Reveal
```css
.reveal {
  opacity: 0;
  transform: translateY(var(--renge-space-6));  /* 52px down */
}

.reveal.in-view {
  animation: revealUp var(--renge-duration-6) var(--renge-easing-ease-out) forwards;
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 🔘 Component Styling Examples

### Button with Fibonacci Radius
```css
.button {
  /* Typography */
  font-size: var(--renge-fontSize-base);      /* 16px */
  line-height: var(--renge-lineHeight-body);  /* 1.618 */
  
  /* Spacing (padding is part of component's internal spacing) */
  padding: var(--renge-space-3) var(--renge-space-4);  /* 12px 20px */
  
  /* Border radius */
  border-radius: var(--renge-radius-2);  /* 8px */
  
  /* Hover animation */
  transition: all var(--renge-duration-2) var(--renge-easing-ease-out);
}
```

### Card Component
```css
.card {
  /* Container max-width awareness */
  max-width: var(--renge-container-md);
  
  /* Internal padding */
  padding: var(--renge-space-6);  /* 52px */
  
  /* Rounded corners */
  border-radius: var(--renge-radius-3);  /* 12px */
  
  /* Light shadow (semantic) */
  box-shadow: 0 var(--renge-space-1) var(--renge-space-3) 
              rgba(0, 0, 0, 0.1);
  
  /* Hover effect */
  transition: transform var(--renge-duration-2) var(--renge-easing-spring);
}

.card:hover {
  transform: translateY(calc(-1 * var(--renge-space-2)));  /* 8px up */
}
```

### Input Field
```css
input, textarea, select {
  /* Typography */
  font-size: var(--renge-fontSize-base);        /* 16px */
  line-height: var(--renge-lineHeight-body);    /* 1.618 */
  
  /* Padding */
  padding: var(--renge-space-3) var(--renge-space-4);  /* 12px 20px */
  
  /* Border */
  border: 2px solid var(--renge-color-border-default);
  border-radius: var(--renge-radius-2);  /* 8px */
  
  /* Transition for focus state */
  transition: border-color var(--renge-duration-2) var(--renge-easing-ease-out);
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--renge-color-border-focus);
  box-shadow: 0 0 0 3px var(--renge-color-focus-ring);
}
```

---

## 🌀 Phyllotaxis Examples

### Avatar Cluster (Spiral Arrangement)
```typescript
import { phyllotaxis, GOLDEN_ANGLE } from '@renge/tokens';

const avatars = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
  // ... 20 users
];

// Generate positions
const positions = phyllotaxis({
  count: avatars.length,
  spread: 30,        // How fast the spiral expands
  angleOffset: GOLDEN_ANGLE,  // Golden angle
  scale: 1,
});

// Position avatars in SVG or div overlay
positions.forEach((pos, i) => {
  const avatar = document.createElement('img');
  avatar.style.left = `calc(50% + ${pos.x}px)`;
  avatar.style.top = `calc(50% + ${pos.y}px)`;
  avatar.style.position = 'absolute';
  avatar.src = avatars[i].avatar;
  container.appendChild(avatar);
});
```

### Tag Cloud (Radial Pattern)
```typescript
const tags = [
  { label: 'React', usage: 100 },
  { label: 'TypeScript', usage: 95 },
  { label: 'Design Systems', usage: 80 },
  // ...
];

// Size each tag by usage/frequency
const sizeByUsage = (usage) => {
  const min = 12; // fontSize-sm
  const max = 42; // fontSize-xl
  return min + (max - min) * (usage / 100);
};

// Arrange spirally
const positions = phyllotaxis({
  count: tags.length,
  spread: 20,
  scale: 1,
});

positions.forEach((pos, i) => {
  const tag = document.createElement('span');
  tag.textContent = tags[i].label;
  tag.style.position = 'absolute';
  tag.style.left = `${pos.x}px`;
  tag.style.top = `${pos.y}px`;
  tag.style.fontSize = `${sizeByUsage(tags[i].usage)}px`;
  container.appendChild(tag);
});
```

---

## 🧮 TypeScript Utilities

### Type-Safe Token Access
```typescript
import { rengeVars } from '@renge/tokens';

// Auto-complete available tokens
const padding = rengeVars.space[4];      // "var(--renge-space-4)"
const fontSize = rengeVars.fontSize.lg;  // "var(--renge-fontSize-lg)"
const containerWidth = rengeVars.container.md;  // "var(--renge-container-md)"

// Use in template literals
const styles = `
  padding: ${rengeVars.space[4]};
  font-size: ${rengeVars.fontSize.lg};
  max-width: ${rengeVars.container.md};
`;
```

### React Hook Example
```typescript
import React from 'react';
import { useRengeTheme } from '@renge/react';

export function ComponentWithThemeSwitching() {
  const { profile, switchProfile } = useRengeTheme();

  return (
    <div>
      <p>Current profile: {profile}</p>
      <button onClick={() => switchProfile('earth')}>
        Use Earth Profile
      </button>
      <button onClick={() => switchProfile('ocean')}>
        Use Ocean Profile
      </button>
    </div>
  );
}
```

### Validation Utility
```typescript
import { validateSpacingScale, validateTypeScale } from '@renge/test-utils';
import { rengeVars } from '@renge/tokens';

// Ensure spacing is monotonically increasing
const spacingValidation = validateSpacingScale({
  '0': '0px',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '20px',
  // ... etc
});

if (!spacingValidation.valid) {
  console.error('Spacing scale broken:', spacingValidation.errors);
}

// Ensure typography maintains φ ratio
const typeValidation = validateTypeScale({
  xs: { fontSize: '9.9px', lineHeight: '1.618' },
  base: { fontSize: '16px', lineHeight: '1.618' },
  lg: { fontSize: '25.9px', lineHeight: '1.618' },
  // ... etc
});

if (!typeValidation.valid) {
  console.error('Type scale broken:', typeValidation.errors);
}
```

---

## 🎯 Pattern: "Doing It Wrong vs. Right"

### ❌ WRONG: Hardcoded spacingz
```css
.section {
  padding: 20px;
  margin-bottom: 35px;
  gap: 18px;
}
```
→ No proportional relationship. Numbers picked arbitrarily.

### ✅ RIGHT: Using tokens
```css
.section {
  padding: var(--renge-space-4);      /* 20px — consistent */
  margin-bottom: var(--renge-space-6); /* 52px — proportional */
  gap: var(--renge-space-5);          /* 32px — part of system */
}
```
→ Every value is mathematically related through Fibonacci.

---

### ❌ WRONG: Arbitrary type sizes
```css
p { font-size: 15px; line-height: 1.5; }
h2 { font-size: 28px; line-height: 1.3; }
h1 { font-size: 48px; line-height: 1.1; }
```
→ Ratios are accidental. No visual hierarchy principle.

### ✅ RIGHT: Using type scale
```css
p { 
  font-size: var(--renge-fontSize-base);        /* 16px */
  line-height: var(--renge-lineHeight-body);    /* 1.618 */
}
h2 { 
  font-size: var(--renge-fontSize-2xl);         /* 67.8px = base × φ³ */
  line-height: var(--renge-lineHeight-heading); /* 1.382 = 1 + 1/φ² */
}
h1 { 
  font-size: var(--renge-fontSize-4xl);         /* 177.4px = base × φ⁵ */
  line-height: var(--renge-lineHeight-display); /* 1.236 = 1 + 1/φ³ */
}
```
→ Every step is exactly φ times the previous. Mathematically inevitable.

---

### ❌ WRONG: Container width feels random
```css
.container {
  max-width: 960px;  /* Why 960? Why not 1000? */
  padding: 20px 40px;
}
```
→ Choice unmotivated.

### ✅ RIGHT: Container widths scale by φ
```css
.container-md {
  max-width: var(--renge-container-md);  /* 848px = 200 × φ³ */
  padding: calc(1.5 * var(--renge-space-5));  /* 48px */
}

.container-lg {
  max-width: var(--renge-container-lg);  /* 1372px = 848 × φ */
  padding: calc(2 * var(--renge-space-6));    /* 104px */
}
```
→ Each breakpoint's container is exactly φ times the previous.

---

## 📚 Summary

Every line of code should reference a token. The tokens encode mathematics:

- **Spacing:** Fibonacci × 4px
- **Layout:** 200 × φⁿ
- **Type:** 16 × φⁿ
- **Motion:** Fibonacci × 100ms, φ-split easing curves
- **Everything else:** Renge tokens

No hardcoded numbers. The math is the beauty.

---

**Reference:** RENGE_MATH_SPECIFICATION.md | RENGE_MATH_VISUAL_SUMMARY.md
