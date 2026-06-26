<script setup lang="ts">
</script>

<template>
  <th
    :style="{
      padding: 'var(--renge-space-2) var(--renge-space-4)',
      textAlign: 'left',
      fontSize: 'var(--renge-font-size-sm)',
      fontWeight: 600,
      color: 'var(--renge-color-fg-subtle)',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }"
    v-bind="$attrs"
  >
    <slot />
  </th>
</template>
