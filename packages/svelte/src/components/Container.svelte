<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg';
  export let px: '0' | '1' | '2' | '3' | '4' | '5' | '6' = '5';
  export let style = '';

  const maxWidthMap = {
    sm: 'var(--renge-container-sm)',
    md: 'var(--renge-container-md)',
    lg: 'var(--renge-container-lg)',
    xl: 'var(--renge-container-xl)',
    full: 'var(--renge-container-full)',
  };

  const baseStyles = `
    width: 100%;
    max-width: ${maxWidthMap[size]};
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--renge-space-${px});
    padding-right: var(--renge-space-${px});
  `;
</script>

<div style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</div>
