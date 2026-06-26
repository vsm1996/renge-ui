<script lang="ts">
  export let gap: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' = '3';
  export let direction: 'vertical' | 'horizontal' = 'vertical';
  export let align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  export let justify: 'start' | 'center' | 'end' | 'between' | 'around' = 'start';
  export let style = '';

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };

  const baseStyles = `
    display: flex;
    flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
    gap: var(--renge-space-${gap});
    align-items: ${alignMap[align]};
    justify-content: ${justifyMap[justify]};
  `;
</script>

<div style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</div>
