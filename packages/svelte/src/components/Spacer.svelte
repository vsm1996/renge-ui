<script lang="ts">
  export let size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' = '4';
  export let axis: 'vertical' | 'horizontal' = 'vertical';
  export let style = '';

  const token = `var(--renge-space-${size})`;

  const baseStyles = `
    display: block;
    flex-shrink: 0;
    width: ${axis === 'horizontal' ? token : '100%'};
    ${axis === 'vertical' ? `height: ${token};` : ''}
    ${axis === 'horizontal' ? `min-width: ${token};` : ''}
    ${axis === 'vertical' ? `min-height: ${token};` : ''}
  `;
</script>

<div aria-hidden="true" style="{baseStyles} {style}" {...$$restProps} />
