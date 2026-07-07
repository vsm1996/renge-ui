<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface VisuallyHiddenProps {}

defineProps<VisuallyHiddenProps>();

const style: CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
};
</script>

<template>
  <span :style="style" v-bind="$attrs">
    <slot />
  </span>
</template>
