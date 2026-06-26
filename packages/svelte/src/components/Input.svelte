<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let state: 'default' | 'error' | 'success' = 'default';
  export let fullWidth = false;
  export let value = '';
  export let style = '';

  const sizeStyles = {
    sm: 'padding: var(--renge-space-1) var(--renge-space-2); font-size: var(--renge-font-size-sm);',
    md: 'padding: var(--renge-space-2) var(--renge-space-3); font-size: var(--renge-font-size-base);',
    lg: 'padding: var(--renge-space-2) var(--renge-space-4); font-size: var(--renge-font-size-base);',
  };

  const stateColor = {
    default: 'var(--renge-color-border)',
    error: 'var(--renge-color-danger)',
    success: 'var(--renge-color-success)',
  };

  const baseStyles = `
    ${sizeStyles[size]}
    display: block;
    ${fullWidth ? 'width: 100%;' : ''}
    background: var(--renge-color-bg);
    color: var(--renge-color-fg);
    border: 1px solid ${stateColor[state]};
    border-radius: var(--renge-radius-2);
    outline: none;
    transition: border-color var(--renge-duration-1) var(--renge-easing-ease-out);
    box-sizing: border-box;
    font-family: inherit;
  `;

  let isFocused = false;
</script>

<input
  type="text"
  bind:value
  on:focus={() => { isFocused = true; }}
  on:blur={() => { isFocused = false; }}
  style="{baseStyles} {isFocused ? 'outline: 2px solid var(--renge-color-border-focus); outline-offset: 2px;' : ''} {style}"
  {...$$restProps}
/>
