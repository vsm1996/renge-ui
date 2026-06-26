<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let state: 'default' | 'error' | 'success' = 'default';
  export let fullWidth = false;
  export let placeholder: string | undefined = undefined;
  export let value = '';
  export let style = '';

  const sizeStyles = {
    sm: 'padding: var(--renge-space-1) var(--renge-space-5) var(--renge-space-1) var(--renge-space-2); font-size: var(--renge-font-size-sm);',
    md: 'padding: var(--renge-space-2) var(--renge-space-5) var(--renge-space-2) var(--renge-space-3); font-size: var(--renge-font-size-base);',
    lg: 'padding: var(--renge-space-2) var(--renge-space-6) var(--renge-space-2) var(--renge-space-4); font-size: var(--renge-font-size-base);',
  };

  const stateColor = {
    default: 'var(--renge-color-border)',
    error: 'var(--renge-color-danger)',
    success: 'var(--renge-color-success)',
  };

  const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

  const baseStyles = `
    ${sizeStyles[size]}
    display: block;
    ${fullWidth ? 'width: 100%;' : ''}
    background: ${chevronSvg} no-repeat right var(--renge-space-2) center, var(--renge-color-bg);
    color: var(--renge-color-fg);
    border: 1px solid ${stateColor[state]};
    border-radius: var(--renge-radius-2);
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    transition: border-color var(--renge-duration-1) var(--renge-easing-ease-out);
    box-sizing: border-box;
    font-family: inherit;
  `;

  let isFocused = false;
</script>

<select
  bind:value
  on:focus={() => { isFocused = true; }}
  on:blur={() => { isFocused = false; }}
  style="{baseStyles} {isFocused ? 'outline: 2px solid var(--renge-color-border-focus); outline-offset: 2px;' : ''} {style}"
  {...$$restProps}
>
  {#if placeholder}
    <option value="" disabled hidden>{placeholder}</option>
  {/if}
  <slot />
</select>
