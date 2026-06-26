<script setup lang="ts">
</script>

<template>
  <div
    role="tablist"
    :style="{
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      overflowX: 'auto',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
