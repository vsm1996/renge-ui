<script setup lang="ts">
export interface TableCellProps {
  muted?: boolean
}

withDefaults(defineProps<TableCellProps>(), {
  muted: false,
})
</script>

<template>
  <td
    :style="{
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      color: muted ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
      fontSize: 'var(--renge-font-size-base)',
      verticalAlign: 'middle',
    }"
    v-bind="$attrs"
  >
    <slot />
  </td>
</template>
