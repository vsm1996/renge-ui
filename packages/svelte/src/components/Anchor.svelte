<script lang="ts">
  export let href: string = '';
  export let variant: 'default' | 'subtle' | 'plain' = 'default';
  export let underline: boolean = false;
  export let style = '';

  const colorMap = {
    default: 'var(--renge-color-accent)',
    subtle: 'var(--renge-color-fg-subtle)',
    plain: 'inherit',
  };

  let isHovered = false;

  const baseStyles = `
    color: ${isHovered ? 'var(--renge-color-accent-hover)' : colorMap[variant]};
    text-decoration: ${isHovered || underline ? 'underline' : 'none'};
    text-decoration-color: var(--renge-color-accent);
    text-underline-offset: 3px;
    transition: color var(--renge-duration-1) var(--renge-easing-ease-out), text-decoration-color var(--renge-duration-1) var(--renge-easing-ease-out);
    cursor: pointer;
  `;
</script>

<a
  {href}
  style="{baseStyles} {style}"
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  {...$$restProps}
>
  <slot />
</a>
