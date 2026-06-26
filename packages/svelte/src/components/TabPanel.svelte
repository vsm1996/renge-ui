<script lang="ts">
  import { getContext } from 'svelte';

  export let value: string;
  let className = '';
  export { className as class };

  const ctx = getContext<any>('tabs') || { activeTab: { subscribe: () => {} } };
  let isActive = false;

  ctx.activeTab.subscribe((v: string) => {
    isActive = v === value;
  });
</script>

{#if isActive}
  <div
    role="tabpanel"
    id="tabpanel-{value}"
    aria-labelledby="tab-{value}"
    class={className}
    style="padding-top: var(--renge-space-4);"
    {...$$restProps}
  >
    <slot />
  </div>
{/if}
