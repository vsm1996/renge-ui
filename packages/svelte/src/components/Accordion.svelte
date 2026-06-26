<script lang="ts">
  import { setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  export let multiple: boolean = false;
  export let value: string | string[] | undefined = undefined;

  let className = '';
  export { className as class };

  const openIds: Writable<Set<string>> = writable(
    new Set(Array.isArray(value) ? value : value ? [value] : [])
  );

  function toggle(id: string) {
    openIds.update((ids) => {
      const newIds = new Set(ids);
      if (newIds.has(id)) {
        newIds.delete(id);
      } else {
        if (!multiple) {
          newIds.clear();
        }
        newIds.add(id);
      }
      return newIds;
    });
  }

  setContext('accordion', { openIds, toggle });
</script>

<div class={className} style="border: 1px solid var(--renge-color-border-subtle); border-radius: var(--renge-radius-2);" {...$$restProps}>
  <slot />
</div>
