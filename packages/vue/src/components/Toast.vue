<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface ToastProps {
  type?: 'success' | 'error' | 'info' | 'warning'
  message?: string
  duration?: number
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  message: '',
})

const emit = defineEmits<{
  close: []
}>()

const exiting = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const colorMap = {
  success: 'var(--renge-color-success)',
  error: 'var(--renge-color-danger)',
  info: 'var(--renge-color-accent)',
  warning: 'var(--renge-color-warning)',
}

const bgColorMap = {
  success: 'var(--renge-color-success-subtle)',
  error: 'var(--renge-color-danger-subtle)',
  info: 'var(--renge-color-accent-subtle)',
  warning: 'var(--renge-color-warning-subtle)',
}

const handleClose = () => {
  exiting.value = true
  setTimeout(() => emit('close'), 200)
}

onMounted(() => {
  if (props.duration) {
    timeoutId = setTimeout(() => {
      exiting.value = true
      setTimeout(() => emit('close'), 200)
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div
    role="status"
    aria-live="polite"
    :style="{
      padding: 'var(--renge-space-3) var(--renge-space-4)',
      borderRadius: 'var(--renge-radius-2)',
      background: bgColorMap[type],
      color: colorMap[type],
      border: `1px solid ${colorMap[type]}`,
      fontSize: 'var(--renge-font-size-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--renge-space-3)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      opacity: exiting ? 0 : 1,
      transform: `translateY(${exiting ? '10px' : '0'})`,
      transition: 'opacity var(--renge-duration-2) var(--renge-easing-ease-out), transform var(--renge-duration-2) var(--renge-easing-ease-out)',
    }"
    v-bind="$attrs"
  >
    <span :style="{ flex: 1 }">{{ message }}</span>
    <button
      type="button"
      :style="{
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        padding: 0,
        fontSize: 'var(--renge-font-size-base)',
        opacity: 0.7,
        transition: 'opacity var(--renge-duration-1)',
      }"
      @click="handleClose"
      @mouseenter="(e) => ((e.target as HTMLButtonElement).style.opacity = '1')"
      @mouseleave="(e) => ((e.target as HTMLButtonElement).style.opacity = '0.7')"
    >
      ✕
    </button>
  </div>
</template>
