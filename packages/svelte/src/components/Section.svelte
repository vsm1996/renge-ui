<script lang="ts">
  export let padding: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | undefined = undefined;
  export let paddingX: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' = '4';
  export let paddingY: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' = '6';
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none' = 'lg';
  export let center: boolean = true;
  export let animation: string | undefined = undefined;
  export let style = '';

  const maxWidthMap = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
    none: undefined,
  };

  const paddingInline = padding ? `var(--renge-space-${padding})` : `var(--renge-space-${paddingX})`;
  const paddingBlock = padding ? `var(--renge-space-${padding})` : `var(--renge-space-${paddingY})`;

  const baseStyles = `
    padding-inline: ${paddingInline};
    padding-block: ${paddingBlock};
    ${maxWidthMap[maxWidth] ? `max-width: ${maxWidthMap[maxWidth]};` : ''}
    ${center ? 'margin-inline: auto;' : ''}
    ${animation ? `animation: var(--renge-animation-${animation});` : ''}
  `;
</script>

<section style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</section>
