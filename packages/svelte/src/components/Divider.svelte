<script lang="ts">
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let spacing: '0' | '1' | '2' | '3' | '4' | '5' | '6' = '3';
  export let color: 'border' | 'border-subtle' = 'border-subtle';
  export let style = '';

  const isHorizontal = orientation === 'horizontal';

  const baseStyles = `
    border: none;
    background-color: var(--renge-color-${color});
    ${isHorizontal
      ? `
        height: 1px;
        width: 100%;
        margin-block: var(--renge-space-${spacing});
      `
      : `
        width: 1px;
        height: 100%;
        margin-inline: var(--renge-space-${spacing});
      `}
  `;
</script>

<hr style="{baseStyles} {style}" {...$$restProps} />
