import { describe, it, expect } from 'vitest';
import { petals, typography, spacing, cards, interactive, compositions } from '../index';

describe('petals — structure and exports', () => {
  it('petals object contains all categories', () => {
    expect(petals).toHaveProperty('typography');
    expect(petals).toHaveProperty('spacing');
    expect(petals).toHaveProperty('cards');
    expect(petals).toHaveProperty('interactive');
    expect(petals).toHaveProperty('compositions');
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
});

describe('petals — token composition', () => {
  it('each petal has required properties', () => {
    const petal = typography.displayLarge;
    expect(petal).toHaveProperty('label');
    expect(petal).toHaveProperty('description');
    expect(petal).toHaveProperty('tokens');
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
});

describe('petals — consistency', () => {
  it('all spacing petals have padding and gap', () => {
    for (const [name, petal] of Object.entries(spacing)) {
      expect(petal.tokens).toHaveProperty('padding');
      expect(petal.tokens).toHaveProperty('gap');
    }
  });

  it('all typography petals have fontSize and lineHeight', () => {
    for (const [name, petal] of Object.entries(typography)) {
      expect(petal.tokens).toHaveProperty('fontSize');
      expect(petal.tokens).toHaveProperty('lineHeight');
    }
  });

  it('all button petals have consistent token structure', () => {
    const buttons = [interactive.buttonLarge, interactive.buttonMedium, interactive.buttonSmall];
    buttons.forEach((button) => {
      expect(button.tokens).toHaveProperty('padding');
      expect(button.tokens).toHaveProperty('borderRadius');
      expect(button.tokens).toHaveProperty('transition');
    });
  });
});
