import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, it, expect } from 'vitest';
import {
  petals,
  typography, spacing, cards, interactive, compositions,
  alerts, navigation, overlay, forms, feedback, dataDisplay, layout, decoration,
} from '../index';

// ─── Token integrity ──────────────────────────────────────────────────────────
// A petal is only real if every --renge-* var it references is actually SHIPPED
// by the standard integration. This guards the gap where petals referenced
// tokens (shadow/z-index/w/h/min/max) that the injection allowlists silently
// dropped — the box-shadow, z-index, or size just wouldn't render. The check is
// against the generated renge.css (the plain-CSS path); the Tailwind v4 plugin
// injects the same "everything but color" base set.

describe('petals — token integrity (every referenced var actually ships)', () => {
  // The built stylesheet is the source of truth for what's injected. Requires
  // @renge-ui/tokens to be built (dist/renge.css); if this throws, run its build.
  const require = createRequire(import.meta.url);
  const css = readFileSync(require.resolve('@renge-ui/tokens/renge.css'), 'utf8');
  const defined = new Set(
    [...css.matchAll(/(--renge-[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
  );

  const categories: Record<string, Record<string, { tokens: Record<string, string> }>> = {
    typography, spacing, cards, interactive, compositions,
    alerts, navigation, overlay, forms, feedback, dataDisplay, layout, decoration,
  };

  it('every --renge-* var referenced by any petal is defined in renge.css', () => {
    const missing: string[] = [];
    for (const [cat, group] of Object.entries(categories)) {
      for (const [name, petal] of Object.entries(group)) {
        for (const value of Object.values(petal.tokens)) {
          for (const m of String(value).matchAll(/var\((--renge-[a-z0-9-]+)/g)) {
            if (!defined.has(m[1])) missing.push(`${cat}.${name} → ${m[1]}`);
          }
        }
      }
    }
    expect(missing, `petals reference tokens not shipped in renge.css:\n${missing.join('\n')}`).toEqual([]);
  });

  it('the shipped stylesheet actually defines the once-missing categories', () => {
    // Regression anchor for the specific gap: shadow / z-index / sizing tokens.
    for (const v of ['--renge-shadow-layer-1', '--renge-zindex-modal', '--renge-w-full', '--renge-h-4']) {
      expect(defined.has(v), `${v} should be shipped in renge.css`).toBe(true);
    }
  });
});

// ─── Structure & Exports ──────────────────────────────────────────────────────

describe('petals — structure and exports', () => {
  it('petals object contains all 13 categories', () => {
    const expected = [
      'typography', 'spacing', 'cards', 'interactive', 'compositions',
      'alerts', 'navigation', 'overlay', 'forms', 'feedback',
      'dataDisplay', 'layout', 'decoration',
    ];
    for (const cat of expected) {
      expect(petals).toHaveProperty(cat);
    }
  });

  it('typography petals are defined', () => {
    expect(typography).toHaveProperty('displayLarge');
    expect(typography).toHaveProperty('bodyRegular');
    expect(typography).toHaveProperty('labelXs');
  });

  it('spacing petals are defined', () => {
    expect(spacing).toHaveProperty('generous');
    expect(spacing).toHaveProperty('comfortable');
    expect(spacing).toHaveProperty('compact');
    expect(spacing).toHaveProperty('condensed');
  });

  it('cards petals are defined', () => {
    expect(cards).toHaveProperty('surfaceGenerous');
    expect(cards).toHaveProperty('surfaceComfortable');
    expect(cards).toHaveProperty('surfaceCompact');
    expect(cards).toHaveProperty('surfaceMinimal');
  });

  it('interactive petals are defined', () => {
    expect(interactive).toHaveProperty('buttonLarge');
    expect(interactive).toHaveProperty('buttonMedium');
    expect(interactive).toHaveProperty('buttonSmall');
    expect(interactive).toHaveProperty('focus');
  });

  it('compositions petals are defined', () => {
    expect(compositions).toHaveProperty('textField');
    expect(compositions).toHaveProperty('badge');
    expect(compositions).toHaveProperty('chip');
  });

  it('alerts petals are defined', () => {
    expect(alerts).toHaveProperty('success');
    expect(alerts).toHaveProperty('warning');
    expect(alerts).toHaveProperty('danger');
    expect(alerts).toHaveProperty('info');
    expect(alerts).toHaveProperty('neutral');
  });

  it('navigation petals are defined', () => {
    expect(navigation).toHaveProperty('navbarRoot');
    expect(navigation).toHaveProperty('navItem');
    expect(navigation).toHaveProperty('navItemActive');
    expect(navigation).toHaveProperty('menuItem');
    expect(navigation).toHaveProperty('tabItem');
    expect(navigation).toHaveProperty('tabItemActive');
    expect(navigation).toHaveProperty('breadcrumbItem');
    expect(navigation).toHaveProperty('paginationItem');
    expect(navigation).toHaveProperty('bottomNavItem');
    expect(navigation).toHaveProperty('stepsItem');
  });

  it('overlay petals are defined', () => {
    expect(overlay).toHaveProperty('modalBackdrop');
    expect(overlay).toHaveProperty('modalContainer');
    expect(overlay).toHaveProperty('modalHeader');
    expect(overlay).toHaveProperty('modalFooter');
    expect(overlay).toHaveProperty('drawerPanel');
    expect(overlay).toHaveProperty('dropdownMenu');
    expect(overlay).toHaveProperty('dropdownItem');
    expect(overlay).toHaveProperty('tooltip');
    expect(overlay).toHaveProperty('popover');
  });

  it('forms petals are defined', () => {
    expect(forms).toHaveProperty('checkbox');
    expect(forms).toHaveProperty('checkboxChecked');
    expect(forms).toHaveProperty('radio');
    expect(forms).toHaveProperty('radioChecked');
    expect(forms).toHaveProperty('toggle');
    expect(forms).toHaveProperty('toggleActive');
    expect(forms).toHaveProperty('toggleThumb');
    expect(forms).toHaveProperty('rangeTrack');
    expect(forms).toHaveProperty('rangeFill');
    expect(forms).toHaveProperty('rangeThumb');
    expect(forms).toHaveProperty('select');
    expect(forms).toHaveProperty('textarea');
    expect(forms).toHaveProperty('fileInput');
    expect(forms).toHaveProperty('rating');
  });

  it('feedback petals are defined', () => {
    expect(feedback).toHaveProperty('skeleton');
    expect(feedback).toHaveProperty('skeletonText');
    expect(feedback).toHaveProperty('skeletonAvatar');
    expect(feedback).toHaveProperty('progressTrack');
    expect(feedback).toHaveProperty('progressFill');
    expect(feedback).toHaveProperty('toast');
    expect(feedback).toHaveProperty('toastSuccess');
    expect(feedback).toHaveProperty('toastWarning');
    expect(feedback).toHaveProperty('toastDanger');
  });

  it('dataDisplay petals are defined', () => {
    expect(dataDisplay).toHaveProperty('tableRoot');
    expect(dataDisplay).toHaveProperty('tableHeader');
    expect(dataDisplay).toHaveProperty('tableCell');
    expect(dataDisplay).toHaveProperty('statValue');
    expect(dataDisplay).toHaveProperty('statLabel');
    expect(dataDisplay).toHaveProperty('avatarSm');
    expect(dataDisplay).toHaveProperty('avatarMd');
    expect(dataDisplay).toHaveProperty('avatarLg');
    expect(dataDisplay).toHaveProperty('chatBubble');
    expect(dataDisplay).toHaveProperty('chatBubbleOwn');
    expect(dataDisplay).toHaveProperty('timelineDot');
    expect(dataDisplay).toHaveProperty('accordionTrigger');
    expect(dataDisplay).toHaveProperty('accordionContent');
  });

  it('layout petals are defined', () => {
    expect(layout).toHaveProperty('heroRoot');
    expect(layout).toHaveProperty('heroContent');
    expect(layout).toHaveProperty('footerRoot');
    expect(layout).toHaveProperty('divider');
    expect(layout).toHaveProperty('dividerVertical');
    expect(layout).toHaveProperty('indicator');
    expect(layout).toHaveProperty('joinGroup');
    expect(layout).toHaveProperty('sectionRoot');
    expect(layout).toHaveProperty('containerLg');
  });

  it('decoration petals are defined', () => {
    expect(decoration).toHaveProperty('badgeSolid');
    expect(decoration).toHaveProperty('badgeOutline');
    expect(decoration).toHaveProperty('badgeSubtle');
    expect(decoration).toHaveProperty('badgeSuccess');
    expect(decoration).toHaveProperty('badgeWarning');
    expect(decoration).toHaveProperty('badgeDanger');
    expect(decoration).toHaveProperty('badgeNeutral');
    expect(decoration).toHaveProperty('kbd');
    expect(decoration).toHaveProperty('countdownValue');
    expect(decoration).toHaveProperty('diffAdded');
    expect(decoration).toHaveProperty('diffRemoved');
    expect(decoration).toHaveProperty('maskCircle');
  });
});

// ─── Token Composition ────────────────────────────────────────────────────────

describe('petals — token composition', () => {
  it('each petal has label, description, and tokens', () => {
    const petal = typography.displayLarge;
    expect(typeof petal.label).toBe('string');
    expect(typeof petal.description).toBe('string');
    expect(typeof petal.tokens).toBe('object');
  });

  it('tokens reference CSS custom properties', () => {
    const headingTokens = typography.headingLarge.tokens;
    expect(headingTokens.fontSize).toMatch(/var\(--renge-/);
    expect(headingTokens.lineHeight).toMatch(/var\(--renge-/);
  });

  it('card surface petals include padding, radius, and shadow', () => {
    const surface = cards.surfaceComfortable.tokens;
    expect(surface).toHaveProperty('padding');
    expect(surface).toHaveProperty('borderRadius');
    expect(surface).toHaveProperty('boxShadow');
  });

  it('button petals include padding, radius, and transition', () => {
    const button = interactive.buttonMedium.tokens;
    expect(button).toHaveProperty('padding');
    expect(button).toHaveProperty('borderRadius');
    expect(button).toHaveProperty('transition');
  });

  it('composition petals combine multiple token types', () => {
    const textField = compositions.textField.tokens;
    expect(Object.keys(textField).length).toBeGreaterThan(2);
    expect(textField).toHaveProperty('padding');
    expect(textField).toHaveProperty('borderRadius');
    expect(textField).toHaveProperty('border');
    expect(textField).toHaveProperty('transition');
  });

  it('alert petals include padding, border, and backgroundColor', () => {
    for (const petal of Object.values(alerts)) {
      expect(petal.tokens).toHaveProperty('padding');
      expect(petal.tokens).toHaveProperty('border');
      expect(petal.tokens).toHaveProperty('backgroundColor');
      expect(petal.tokens).toHaveProperty('color');
    }
  });

  it('overlay petals that are containers include backgroundColor', () => {
    expect(overlay.modalContainer.tokens).toHaveProperty('backgroundColor');
    expect(overlay.dropdownMenu.tokens).toHaveProperty('backgroundColor');
    expect(overlay.tooltip.tokens).toHaveProperty('backgroundColor');
    expect(overlay.popover.tokens).toHaveProperty('backgroundColor');
  });

  it('overlay petals include z-index tokens', () => {
    expect(overlay.modalContainer.tokens.zIndex).toMatch(/var\(--renge-zindex-/);
    expect(overlay.dropdownMenu.tokens.zIndex).toMatch(/var\(--renge-zindex-/);
    expect(overlay.tooltip.tokens.zIndex).toMatch(/var\(--renge-zindex-/);
  });

  it('form control petals include sizing tokens', () => {
    expect(forms.checkbox.tokens).toHaveProperty('width');
    expect(forms.checkbox.tokens).toHaveProperty('height');
    expect(forms.radio.tokens).toHaveProperty('width');
    expect(forms.radio.tokens).toHaveProperty('height');
    expect(forms.toggle.tokens).toHaveProperty('width');
    expect(forms.toggle.tokens).toHaveProperty('height');
  });

  it('progress petals include height and borderRadius', () => {
    expect(feedback.progressTrack.tokens).toHaveProperty('height');
    expect(feedback.progressTrack.tokens).toHaveProperty('borderRadius');
    expect(feedback.progressFill.tokens).toHaveProperty('height');
    expect(feedback.progressFill.tokens).toHaveProperty('borderRadius');
  });

  it('toast petals include zIndex and boxShadow', () => {
    expect(feedback.toast.tokens.zIndex).toMatch(/var\(--renge-zindex-/);
    expect(feedback.toast.tokens).toHaveProperty('boxShadow');
    expect(feedback.toastSuccess.tokens).toHaveProperty('borderLeft');
    expect(feedback.toastDanger.tokens).toHaveProperty('borderLeft');
  });

  it('table petals include correct cell properties', () => {
    expect(dataDisplay.tableHeader.tokens).toHaveProperty('padding');
    expect(dataDisplay.tableHeader.tokens).toHaveProperty('borderBottom');
    expect(dataDisplay.tableCell.tokens).toHaveProperty('padding');
    expect(dataDisplay.tableCell.tokens).toHaveProperty('borderBottom');
  });

  it('stat petals include typography scale', () => {
    expect(dataDisplay.statValue.tokens.fontSize).toMatch(/var\(--renge-font-size-/);
    expect(dataDisplay.statLabel.tokens.fontSize).toMatch(/var\(--renge-font-size-/);
    expect(dataDisplay.statDesc.tokens.color).toMatch(/var\(--renge-color-/);
  });

  it('avatar petals include width, height, and full radius', () => {
    for (const petal of [dataDisplay.avatarSm, dataDisplay.avatarMd, dataDisplay.avatarLg]) {
      expect(petal.tokens).toHaveProperty('width');
      expect(petal.tokens).toHaveProperty('height');
      expect(petal.tokens.borderRadius).toMatch(/radius-full/);
    }
  });

  it('chat bubbles include padding, borderRadius, and color', () => {
    expect(dataDisplay.chatBubble.tokens).toHaveProperty('padding');
    expect(dataDisplay.chatBubble.tokens).toHaveProperty('borderRadius');
    expect(dataDisplay.chatBubble.tokens).toHaveProperty('backgroundColor');
    expect(dataDisplay.chatBubbleOwn.tokens.backgroundColor).toMatch(/var\(--renge-color-accent\)/);
    expect(dataDisplay.chatBubbleOwn.tokens.color).toMatch(/inverse/);
  });

  it('badge decoration petals share consistent shape', () => {
    const badgePetals = [
      decoration.badgeSolid, decoration.badgeOutline, decoration.badgeSubtle,
      decoration.badgeSuccess, decoration.badgeWarning, decoration.badgeDanger, decoration.badgeNeutral,
    ];
    for (const petal of badgePetals) {
      expect(petal.tokens).toHaveProperty('padding');
      expect(petal.tokens.borderRadius).toMatch(/radius-full/);
      expect(petal.tokens).toHaveProperty('fontSize');
    }
  });

  it('kbd petal includes border and inset shadow', () => {
    expect(decoration.kbd.tokens).toHaveProperty('border');
    expect(decoration.kbd.tokens).toHaveProperty('boxShadow');
    expect(decoration.kbd.tokens.fontSize).toMatch(/var\(--renge-font-size-xs\)/);
  });

  it('diff petals use semantic colors', () => {
    expect(decoration.diffAdded.tokens.backgroundColor).toMatch(/success/);
    expect(decoration.diffRemoved.tokens.backgroundColor).toMatch(/danger/);
  });

  it('mask petals include overflow hidden', () => {
    expect(decoration.maskCircle.tokens.overflow).toBe('hidden');
    expect(decoration.maskSquircle.tokens.overflow).toBe('hidden');
    expect(decoration.maskCircle.tokens.borderRadius).toMatch(/radius-full/);
  });
});

// ─── Consistency ──────────────────────────────────────────────────────────────

describe('petals — consistency', () => {
  it('all spacing petals have padding and gap', () => {
    for (const petal of Object.values(spacing)) {
      expect(petal.tokens).toHaveProperty('padding');
      expect(petal.tokens).toHaveProperty('gap');
    }
  });

  it('all typography petals have fontSize and lineHeight', () => {
    for (const petal of Object.values(typography)) {
      expect(petal.tokens).toHaveProperty('fontSize');
      expect(petal.tokens).toHaveProperty('lineHeight');
    }
  });

  it('all button petals have consistent token structure', () => {
    for (const petal of [interactive.buttonLarge, interactive.buttonMedium, interactive.buttonSmall]) {
      expect(petal.tokens).toHaveProperty('padding');
      expect(petal.tokens).toHaveProperty('borderRadius');
      expect(petal.tokens).toHaveProperty('transition');
    }
  });

  it('all alert variants have the same token shape', () => {
    const keys = ['padding', 'borderRadius', 'border', 'backgroundColor', 'color'];
    for (const petal of Object.values(alerts)) {
      for (const key of keys) {
        expect(petal.tokens).toHaveProperty(key);
      }
    }
  });

  it('all toast variants include zIndex', () => {
    for (const key of ['toast', 'toastSuccess', 'toastWarning', 'toastDanger'] as const) {
      expect(feedback[key].tokens).toHaveProperty('zIndex');
    }
  });

  it('all avatar sizes use borderRadius-full', () => {
    for (const petal of [dataDisplay.avatarSm, dataDisplay.avatarMd, dataDisplay.avatarLg]) {
      expect(petal.tokens.borderRadius).toBe('var(--renge-radius-full)');
    }
  });

  it('every petal has a non-empty label and description', () => {
    for (const group of Object.values(petals)) {
      for (const petal of Object.values(group)) {
        expect(petal.label.length).toBeGreaterThan(0);
        expect(petal.description.length).toBeGreaterThan(0);
      }
    }
  });

  it('all token values reference renge CSS custom properties or plain values', () => {
    const plainValues = new Set([
      'none', 'transparent', 'hidden', '1px', '0', 'auto', 'inherit', 'initial',
      // CSS layout keywords — valid as petal property values
      'flex', 'grid', 'block', 'inline', 'inline-flex', 'inline-grid',
      'row', 'column', 'row-reverse', 'column-reverse',
      'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch',
      'baseline', 'normal', 'wrap', 'nowrap',
    ]);
    const containsTransparent = (v: string) => v.includes('transparent');
    for (const group of Object.values(petals)) {
      for (const petal of Object.values(group)) {
        for (const [, value] of Object.entries(petal.tokens)) {
          const isVar = (value as string).startsWith('var(--renge-');
          const isPlain = plainValues.has(value as string);
          const isComposite = (value as string).includes('var(--renge-');
          expect(isVar || isPlain || isComposite || containsTransparent(value as string)).toBe(true);
        }
      }
    }
  });
});
