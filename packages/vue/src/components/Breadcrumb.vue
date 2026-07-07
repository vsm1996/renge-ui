<script setup lang="ts">
export interface BreadcrumbProps {
  separator?: any
}

withDefaults(defineProps<BreadcrumbProps>(), {})
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
