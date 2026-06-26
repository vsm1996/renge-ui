<script lang="ts">
  export let variant: 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
  export let onDismiss: (() => void) | undefined = undefined;
  export let style = '';

  const colorVars = (v: string) => {
    if (v === 'neutral') {
      return {
        background: 'var(--renge-color-bg-subtle)',
        color: 'var(--renge-color-fg-muted)',
        borderColor: 'var(--renge-color-border-subtle)',
      };
    }
    return {
      background: `var(--renge-color-${v}-subtle)`,
      color: `var(--renge-color-${v})`,
      borderColor: `var(--renge-color-${v})`,
    };
  };

  const colors = colorVars(variant);

  const baseStyles = `
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-2);
    padding: var(--renge-space-2) var(--renge-space-3);
    font-size: var(--renge-font-size-sm);
    font-weight: 500;
    line-height: 1;
    border-radius: var(--renge-radius-full);
    border: 1px solid ${colors.borderColor};
    background: ${colors.background};
    color: ${colors.color};
  `;

  const dismissButtonStyle = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font-size: var(--renge-font-size-sm);
    line-height: 1;
    opacity: 0.7;
  `;
</script>

<span style="{baseStyles} {style}" {...$$restProps}>
  <slot />
  {#if onDismiss}
    <button
      aria-label="Dismiss"
      style={dismissButtonStyle}
      on:click={onDismiss}
    >
      ×
    </button>
  {/if}
</span>
