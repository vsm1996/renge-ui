<script lang="ts">
  export let columns: number | string = 1;
  export let rows: number | string | undefined = undefined;
  export let gap: '0' | '1' | '2' | '3' | '4' | '5' | '6' = '3';
  export let gapX: '0' | '1' | '2' | '3' | '4' | '5' | '6' | undefined = undefined;
  export let gapY: '0' | '1' | '2' | '3' | '4' | '5' | '6' | undefined = undefined;
  export let align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  export let justify: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  export let style = '';

  const getTemplate = (value: number | string | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `repeat(${value}, 1fr)`;
    return value;
  };

  const columnGap = gapX ? `var(--renge-space-${gapX})` : `var(--renge-space-${gap})`;
  const rowGap = gapY ? `var(--renge-space-${gapY})` : `var(--renge-space-${gap})`;

  const baseStyles = `
    display: grid;
    grid-template-columns: ${getTemplate(columns) || ''};
    ${getTemplate(rows) ? `grid-template-rows: ${getTemplate(rows)};` : ''}
    column-gap: ${columnGap};
    row-gap: ${rowGap};
    align-items: ${align};
    justify-items: ${justify};
  `;
</script>

<div style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</div>
