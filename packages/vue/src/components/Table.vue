<script setup lang="ts">
export interface TableProps {
  striped?: boolean
  bordered?: boolean
}

withDefaults(defineProps<TableProps>(), {
  striped: false,
  bordered: false,
})
</script>

<template>
  <div
    :style="{
      overflowX: 'auto',
      borderRadius: 'var(--renge-radius-2)',
      border: bordered ? '1px solid var(--renge-color-border-subtle)' : undefined,
    }"
  >
    <table
      :data-striped="striped ? 'true' : undefined"
      :style="{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--renge-font-size-base)',
        color: 'var(--renge-color-fg)',
        fontFamily: 'inherit',
      }"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>
