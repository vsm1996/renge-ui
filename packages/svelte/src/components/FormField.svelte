<script lang="ts">
  export let label: string;
  export let htmlFor: string | undefined = undefined;
  export let helperText: string | undefined = undefined;
  export let errorText: string | undefined = undefined;
  export let required: boolean = false;
  let className = '';
  export { className as class };

  const subText = errorText ?? helperText;
  const subColor = errorText
    ? 'var(--renge-color-danger)'
    : 'var(--renge-color-fg-muted)';
</script>

<div
  class={className}
  style="
    display: flex;
    flex-direction: column;
    gap: var(--renge-space-2);
  "
  {...$$restProps}
>
  <label
    for={htmlFor}
    style="
      font-size: var(--renge-font-size-sm);
      font-weight: 500;
      color: var(--renge-color-fg);
      display: flex;
      align-items: center;
      gap: var(--renge-space-1);
    "
  >
    {label}
    {#if required}
      <span aria-hidden="true" style="color: var(--renge-color-danger);">*</span>
    {/if}
  </label>
  <slot />
  {#if subText}
    <span
      style="
        font-size: var(--renge-font-size-xs);
        color: {subColor};
      "
    >
      {subText}
    </span>
  {/if}
</div>
