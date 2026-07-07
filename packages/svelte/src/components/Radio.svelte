<script lang="ts">
  import { getContext } from 'svelte';
  import { PHI } from '@renge-ui/tokens';

  export let value = '';
  export let label: string | undefined = undefined;
  export let size: 'sm' | 'md' | 'lg' | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
  export let style = '';

  type RadioSize = 'sm' | 'md' | 'lg';
  const ctx = getContext<any>('radio-group');

  const finalSize: RadioSize = size ?? ctx?.size ?? 'md';
  const finalDisabled = disabled ?? ctx?.disabled ?? false;
  const isChecked = ctx ? ctx.value === value : false;

  const OUTER_PX = { sm: 16, md: 20, lg: 24 };
  const FONT = {
    sm: 'var(--renge-font-size-sm)',
    md: 'var(--renge-font-size-base)',
    lg: 'var(--renge-font-size-base)',
  };

  const outer = OUTER_PX[finalSize];
  const inner = Math.round(outer / PHI);

  const handleChange = () => {
    if (finalDisabled) return;
    ctx?.onChange(value);
  };

  const labelStyle = `
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-2);
    cursor: ${finalDisabled ? 'not-allowed' : 'pointer'};
    opacity: ${finalDisabled ? '0.5' : '1'};
    ${style}
  `;

  const circleStyle = `
    width: ${outer}px;
    height: ${outer}px;
    min-width: ${outer}px;
    border-radius: var(--renge-radius-full);
    border: 2px solid ${isChecked ? 'var(--renge-color-accent)' : 'var(--renge-color-border)'};
    background: var(--renge-color-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--renge-duration-2) var(--renge-easing-spring);
    flex-shrink: 0;
  `;

  const dotStyle = `
    width: ${isChecked ? inner : 0}px;
    height: ${isChecked ? inner : 0}px;
    border-radius: var(--renge-radius-full);
    background: var(--renge-color-accent);
    transition: all var(--renge-duration-2) var(--renge-easing-spring);
  `;
</script>

<label style={labelStyle}>
  <input
    type="radio"
    {value}
    name={ctx?.name}
    checked={isChecked}
    disabled={finalDisabled}
    on:change={handleChange}
    style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0;"
  />
  <span style={circleStyle} aria-hidden="true">
    <span style={dotStyle} />
  </span>
  {#if label}
    <span
      style="
        font-size: {FONT[finalSize]};
        color: {finalDisabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)'};
        line-height: var(--renge-line-height-base);
        user-select: none;
      "
    >
      {label}
    </span>
  {/if}
</label>
