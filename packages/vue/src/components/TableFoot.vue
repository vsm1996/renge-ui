<script setup lang="ts">
</script>

<template>
  <tfoot
    :style="{
      borderTop: '2px solid var(--renge-color-border)',
      background: 'var(--renge-color-bg-subtle)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </tfoot>
</template>
