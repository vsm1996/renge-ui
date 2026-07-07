<script setup lang="ts">
// Inject pulse keyframe once (scoped <style> keyframes get hash-renamed and
// can't be referenced from inline animation bindings)
if (typeof document !== 'undefined' && !document.getElementById('__renge-vue-skeleton-kf__')) {
  const s = document.createElement('style')
  s.id = '__renge-vue-skeleton-kf__'
  s.textContent = `
@keyframes renge-skeleton-pulse {
  0%   { opacity: 1; }
  50%  { opacity: 0.5; }
  100% { opacity: 1; }
}`
  document.head.appendChild(s)
}

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
      animation: 'renge-skeleton-pulse 1.5s var(--renge-easing-ease-in-out) infinite',
    }"
    v-bind="$attrs"
  />
</template>
