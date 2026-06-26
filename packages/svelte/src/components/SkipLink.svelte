<script lang="ts">
  export let href: string = '#main';
  export let label: string = 'Skip to main content';
  export let style = '';

  let topPosition = '-40px';

  const baseStyles = `
    position: absolute;
    top: ${topPosition};
    left: 0;
    background: var(--renge-color-accent);
    color: var(--renge-color-bg);
    padding: var(--renge-space-2) var(--renge-space-3);
    text-decoration: none;
    border-radius: var(--renge-radius-2);
    z-index: 100;
  `;

  const handleFocus = () => {
    topPosition = '0';
  };

  const handleBlur = () => {
    topPosition = '-40px';
  };
</script>

<a
  {href}
  style="{baseStyles} {style}"
  on:focus={handleFocus}
  on:blur={handleBlur}
  {...$$restProps}
>
  {label}
</a>
