<script lang="ts">
  export let value = 0;
  export let max = 5;
  export let readonly = false;
  let className = '';
  export { className as class };

  function handleStarClick(idx: number) {
    if (!readonly) {
      value = idx;
    }
  }
</script>

<div
  class={className}
  style="display: inline-flex; gap: var(--renge-space-2);"
  {...$$restProps}
>
  {#each Array.from({ length: max }) as _, idx}
    <button
      type="button"
      disabled={readonly}
      style="
        background: transparent;
        border: none;
        cursor: {readonly ? 'default' : 'pointer'};
        font-size: var(--renge-font-size-2xl);
      "
      on:click={() => handleStarClick(idx)}
    >
      {idx < value ? '★' : '☆'}
    </button>
  {/each}
</div>
