<script setup lang="ts">
</script>

<template>
  <thead
    :style="{
      background: 'var(--renge-color-bg-subtle)',
      borderBottom: '2px solid var(--renge-color-border)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </thead>
</template>
