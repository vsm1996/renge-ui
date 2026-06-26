<script setup lang="ts">
export interface BreadcrumbProps {
  separator?: any
}

withDefaults(defineProps<BreadcrumbProps>(), {})

const DefaultSeparator = `
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="flex-shrink: 0">
    <path d="M4 2.5l3.5 3.5L4 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
`
</script>

<template>
  <nav aria-label="Breadcrumb" v-bind="$attrs">
    <ol
      :style="{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--renge-space-1)',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: 'var(--renge-font-size-sm)',
        color: 'var(--renge-color-fg-subtle)',
      }"
    >
      <slot />
    </ol>
  </nav>
</template>

<style scoped>
:global(nav ol li) {
  display: flex;
  align-items: center;
  gap: var(--renge-space-1);
}

:global(nav ol li:not(:last-child)::after) {
  content: '';
  color: var(--renge-color-fg-muted);
  display: flex;
  align-items: center;
}
</style>
