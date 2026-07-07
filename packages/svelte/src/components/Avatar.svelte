<script lang="ts">
  export let src: string | undefined = undefined;
  export let alt: string | undefined = undefined;
  export let initials: string | undefined = undefined;
  export let size: '1' | '2' | '3' | '4' | '5' = '3';
  export let shape: 'circle' | 'square' = 'circle';
  export let style = '';

  const sizePx = {
    '1': 20,
    '2': 32,
    '3': 52,
    '4': 84,
    '5': 136,
  };

  const fontSizeFor = {
    '1': 'var(--renge-font-size-xs)',
    '2': 'var(--renge-font-size-sm)',
    '3': 'var(--renge-font-size-base)',
    '4': 'var(--renge-font-size-lg)',
    '5': 'var(--renge-font-size-xl)',
  };

  const px = sizePx[size];
  const radius = shape === 'circle' ? 'var(--renge-radius-full)' : 'var(--renge-radius-3)';
  const label = initials ? initials.slice(0, 2).toUpperCase() : undefined;

  const baseStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${px}px;
    height: ${px}px;
    border-radius: ${radius};
    overflow: hidden;
    flex-shrink: 0;
    background: ${src ? 'none' : 'var(--renge-color-bg-muted)'};
    color: var(--renge-color-fg-inverse);
    font-size: ${fontSizeFor[size]};
    font-weight: 600;
    user-select: none;
  `;

  const imgStyle = 'width: 100%; height: 100%; object-fit: cover; display: block;';
</script>

<div
  aria-label={alt}
  role={alt ? 'img' : undefined}
  style="{baseStyles} {style}"
  {...$$restProps}
>
  {#if src}
    <img {src} alt={alt ?? ''} style={imgStyle} />
  {:else}
    {label}
  {/if}
</div>
