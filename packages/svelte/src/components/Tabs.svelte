<script lang="ts">
  import { createEventDispatcher, setContext, getContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  export let defaultTab: string = '';
  export let value: string | undefined = undefined;
  export let onChange: ((id: string) => void) | undefined = undefined;

  let className = '';
  export { className as class };

  const activeTab: Writable<string> = writable(value ?? defaultTab);
  const setActive = (id: string) => {
    const isControlled = value !== undefined;
    if (!isControlled) {
      activeTab.set(id);
    }
    onChange?.(id);
  };

  setContext('tabs', { activeTab, setActive });

  let tabsElement: HTMLDivElement;

  $: if (value !== undefined) {
    activeTab.set(value);
  }
</script>

<div
  bind:this={tabsElement}
  class={className}
  style="display: flex; flex-direction: column;"
  {...$$restProps}
>
  <slot />
</div>
