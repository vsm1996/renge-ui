<script lang="ts">
  export let status: 'info' | 'success' | 'warning' | 'danger' = 'info';
  export let title: string | undefined = undefined;
  export let style = '';

  const baseStyles = `
    display: flex;
    flex-direction: column;
    gap: ${title ? 'var(--renge-space-1)' : 'undefined'};
    padding: var(--renge-space-3) var(--renge-space-4);
    border-radius: var(--renge-radius-2);
    border-left: 3px solid var(--renge-color-${status});
    background: var(--renge-color-${status}-subtle);
    color: var(--renge-color-fg);
  `;

  const titleStyle = 'font-size: var(--renge-font-size-sm); font-weight: 600; color: var(--renge-color-fg);';
  const contentStyle = 'font-size: var(--renge-font-size-sm); color: var(--renge-color-fg);';
</script>

<div role="alert" style="{baseStyles} {style}" {...$$restProps}>
  {#if title}
    <strong style={titleStyle}>
      {title}
    </strong>
  {/if}
  {#if $$slots.default}
    <span style={contentStyle}>
      <slot />
    </span>
  {/if}
</div>
