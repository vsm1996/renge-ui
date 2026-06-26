<script lang="ts">
  export let level: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  export let size: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | undefined = undefined;
  export let color: 'fg' | 'fg-subtle' | 'accent' = 'fg';
  export let animation: string | undefined = undefined;
  export let style = '';

  const defaultSizeForLevel = {
    1: '3xl' as const,
    2: '2xl' as const,
    3: 'xl' as const,
    4: 'lg' as const,
    5: 'lg' as const,
    6: 'lg' as const,
  };

  const resolvedSize = size ?? defaultSizeForLevel[level];
  const tag = `h${level}`;

  const baseStyles = `
    font-size: var(--renge-font-size-${resolvedSize});
    line-height: var(--renge-line-height-${resolvedSize});
    color: var(--renge-color-${color});
    font-weight: 600;
    margin: 0;
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;
</script>

<svelte:element this={tag} style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</svelte:element>
