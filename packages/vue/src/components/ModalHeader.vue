<script setup lang="ts">
</script>

<template>
  <div
    :style="{
      padding: 'var(--renge-space-5)',
      borderBottom: '1px solid var(--renge-color-border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
