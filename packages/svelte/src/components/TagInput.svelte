<script lang="ts">
  export let tags: string[] = [];
  export let placeholder = 'Add tags...';
  let className = '';
  export { className as class };

  let input = '';

  function handleAddTag(tag: string) {
    if (tag.trim() && !tags.includes(tag)) {
      tags = [...tags, tag];
      input = '';
    }
  }

  function handleRemoveTag(tag: string) {
    tags = tags.filter((t) => t !== tag);
  }

  function handleKeyDown(e: KeyboardEvent) {
    const currentInput = (e.target as HTMLInputElement).value;
    if ((e.key === 'Enter' || e.key === ',') && currentInput.trim()) {
      e.preventDefault();
      handleAddTag(currentInput.trim());
    } else if (e.key === 'Backspace' && !currentInput && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  }
</script>

<div
  class={className}
  style="
    display: flex;
    flex-wrap: wrap;
    gap: var(--renge-space-2);
    padding: var(--renge-space-2);
    border: 1px solid var(--renge-color-border);
    border-radius: var(--renge-radius-2);
    background-color: var(--renge-color-bg);
  "
  {...$$restProps}
>
  {#each tags as tag}
    <span
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--renge-space-1);
        background: var(--renge-color-accent);
        color: var(--renge-color-bg);
        padding: var(--renge-space-1) var(--renge-space-2);
        border-radius: var(--renge-radius-1);
        font-size: var(--renge-font-size-sm);
      "
    >
      {tag}
      <button
        type="button"
        style="
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0;
          font-size: var(--renge-font-size-sm);
        "
        on:click={() => handleRemoveTag(tag)}
      >
        ×
      </button>
    </span>
  {/each}
  <input
    bind:value={input}
    type="text"
    {placeholder}
    style="
      flex: 1;
      min-width: 100px;
      border: none;
      background: transparent;
      color: var(--renge-color-fg);
      font-size: var(--renge-font-size-base);
      outline: none;
    "
    on:keydown={handleKeyDown}
  />
</div>
