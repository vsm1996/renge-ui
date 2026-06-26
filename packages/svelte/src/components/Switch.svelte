<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let label: string | undefined = undefined;
  export let labelPosition: 'left' | 'right' = 'right';
  export let checked = false;
  export let disabled = false;
  export let style = '';

  const TRACK = {
    sm: { h: 20, w: 32, thumb: 14, padding: 3 },
    md: { h: 24, w: 40, thumb: 18, padding: 3 },
    lg: { h: 28, w: 48, thumb: 22, padding: 3 },
  };

  const FONT = {
    sm: 'var(--renge-font-size-sm)',
    md: 'var(--renge-font-size-base)',
    lg: 'var(--renge-font-size-base)',
  };

  const { h, w, thumb, padding } = TRACK[size];
  const thumbOffset = checked ? w - thumb - padding : padding;

  const trackStyle = `
    position: relative;
    display: inline-block;
    width: ${w}px;
    height: ${h}px;
    border-radius: var(--renge-radius-full);
    background: ${checked ? 'var(--renge-color-accent)' : 'var(--renge-color-border)'};
    transition: background var(--renge-duration-2) var(--renge-easing-ease-out);
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    flex-shrink: 0;
  `;

  const thumbStyle = `
    position: absolute;
    top: ${padding}px;
    left: ${thumbOffset}px;
    width: ${thumb}px;
    height: ${thumb}px;
    border-radius: var(--renge-radius-full);
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: left var(--renge-duration-2) var(--renge-easing-spring);
  `;

  const labelEl = label && `
    font-size: ${FONT[size]};
    color: ${disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)'};
    user-select: none;
    line-height: var(--renge-line-height-base);
  `;

  const labelStyle = `
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-2);
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? '0.5' : '1'};
    ${style}
  `;
</script>

<label style={labelStyle}>
  {#if labelPosition === 'left' && label}
    <span style={labelEl}>{label}</span>
  {/if}
  <input
    type="checkbox"
    role="switch"
    bind:checked
    {disabled}
    style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0;"
    on:change
  />
  <span style={trackStyle} aria-hidden="true">
    <span style={thumbStyle} />
  </span>
  {#if labelPosition === 'right' && label}
    <span style={labelEl}>{label}</span>
  {/if}
</label>
