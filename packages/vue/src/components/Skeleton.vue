<script setup lang="ts">
export interface SkeletonProps {
  width?: string
  height?: string
  circle?: boolean
}

withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  circle: false,
})
</script>

<template>
  <div
    :style="{
      background: 'var(--renge-color-bg-subtle)',
      borderRadius: circle ? '50%' : 'var(--renge-radius-1)',
      width,
      height,
      animation: 'skeleton-pulse 1.5s var(--renge-easing-ease-in-out) infinite',
    }"
    v-bind="$attrs"
  />
</template>

<style scoped>
@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
