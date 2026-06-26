<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let label: string | undefined = undefined;
  export let indeterminate = false;
  export let checked = false;
  export let disabled = false;
  export let style = '';

  const SIZE_PX = { sm: 16, md: 20, lg: 24 };
  const FONT = { sm: 'var(--renge-font-size-sm)', md: 'var(--renge-font-size-base)', lg: 'var(--renge-font-size-base)' };

  const px = SIZE_PX[size];

  const boxStyle = `
    width: ${px}px;
    height: ${px}px;
    min-width: ${px}px;
    border-radius: var(--renge-radius-1);
    border: 2px solid ${checked || indeterminate ? 'var(--renge-color-accent)' : 'var(--renge-color-border)'};
    background: ${checked || indeterminate ? 'var(--renge-color-accent)' : 'var(--renge-color-bg)'};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--renge-duration-2) var(--renge-easing-spring);
    flex-shrink: 0;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? '0.5' : '1'};
  `;

  const labelStyle = `
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-2);
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    ${style}
  `;
</script>

<style>
  :global(.__renge-checkbox-kf__) {
    @keyframes rengeCheckDraw {
      from { stroke-dashoffset: 14; }
      to { stroke-dashoffset: 0; }
    }
  }
</style>

<label style={labelStyle}>
  <input
    type="checkbox"
    bind:checked
    {disabled}
    style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0;"
    on:change
  />
  <span style={boxStyle} aria-hidden="true">
    {#if checked && !indeterminate}
      <svg
        width={px * 0.618}
        height={px * 0.618}
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4l2.5 2.5L9 1"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="14"
          stroke-dashoffset="0"
          style="animation: rengeCheckDraw var(--renge-duration-2) var(--renge-easing-spring) forwards;"
        />
      </svg>
    {/if}
    {#if indeterminate}
      <svg width={px * 0.5} height={2} viewBox="0 0 8 2">
        <line x1="0" y1="1" x2="8" y2="1" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
    {/if}
  </span>
  {#if label}
    <span
      style="
        font-size: {FONT[size]};
        color: {disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)'};
        line-height: var(--renge-line-height-base);
        user-select: none;
      "
    >
      {label}
    </span>
  {/if}
</label>
