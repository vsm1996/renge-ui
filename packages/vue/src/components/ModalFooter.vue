<script setup lang="ts">
</script>

<template>
  <div
    :style="{
      padding: 'var(--renge-space-5)',
      borderTop: '1px solid var(--renge-color-border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 'var(--renge-space-3)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
