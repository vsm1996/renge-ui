<script setup lang="ts">
</script>

<template>
  <div
    :style="{
      padding: 'var(--renge-space-5)',
      color: 'var(--renge-color-fg)',
      fontSize: 'var(--renge-font-size-base)',
      lineHeight: 'var(--renge-line-height-relaxed)',
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
