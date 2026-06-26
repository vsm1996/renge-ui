<script lang="ts">
  export let keys: string[] = [];
  export let style = '';

  let keyList = keys;

  const containerStyle = 'display: inline-flex; align-items: center; gap: 4px; font-family: monospace;';
  const keyStyle = 'display: inline-block; min-width: 24px; height: 24px; line-height: 24px; text-align: center; background: var(--renge-color-bg-subtle); border: 1px solid var(--renge-color-border); border-radius: var(--renge-radius-1); padding: 0 var(--renge-space-1); font-size: var(--renge-font-size-xs); font-weight: 600;';
  const separatorStyle = 'margin: 0 4px;';
</script>

<kbd style="{containerStyle} {style}" {...$$restProps}>
  {#each keyList as key, idx}
    <span>
      {#if idx > 0}
        <span style={separatorStyle}>+</span>
      {/if}
      <span style={keyStyle}>
        {key.trim()}
      </span>
    </span>
  {/each}
</kbd>
