<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Inject TransitionGroup classes + keyframe once (scoped <style> keyframes get
// hash-renamed and can't be referenced from inline animation bindings)
if (typeof document !== 'undefined' && !document.getElementById('__renge-vue-toast-css__')) {
  const s = document.createElement('style')
  s.id = '__renge-vue-toast-css__'
  s.textContent = `
@keyframes renge-toast-slide-in {
  from { opacity: 0; transform: translateX(100px); }
  to   { opacity: 1; transform: translateX(0); }
}
.renge-toast-move,
.renge-toast-enter-active,
.renge-toast-leave-active {
  transition: all 0.3s var(--renge-easing-spring);
}
.renge-toast-enter-from,
.renge-toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}`
  document.head.appendChild(s)
}

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const toasts = ref<ToastItem[]>([])

let counter = 0

function addToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration?: number) {
  const id = String(++counter)
  toasts.value.push({ id, message, type, duration })
  if (duration === undefined) duration = 4000
  setTimeout(() => removeToast(id), duration)
}

function removeToast(id: string) {
  toasts.value = toasts.value.filter((item) => item.id !== id)
}

if (typeof window !== 'undefined') {
  ;(window as any).toast = { add: addToast, remove: removeToast }
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    delete (window as any).toast
  }
})
</script>

<template>
  <div
    :style="{
      position: 'fixed',
      bottom: 'var(--renge-space-4)',
      right: 'var(--renge-space-4)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--renge-space-2)',
      pointerEvents: 'none',
    }"
  >
    <TransitionGroup name="renge-toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :style="{
          pointerEvents: 'auto',
          padding: 'var(--renge-space-3) var(--renge-space-4)',
          borderRadius: 'var(--renge-radius-2)',
          background:
            toast.type === 'success'
              ? 'var(--renge-color-success-subtle)'
              : toast.type === 'error'
                ? 'var(--renge-color-danger-subtle)'
                : toast.type === 'warning'
                  ? 'var(--renge-color-warning-subtle)'
                  : 'var(--renge-color-accent-subtle)',
          color:
            toast.type === 'success'
              ? 'var(--renge-color-success)'
              : toast.type === 'error'
                ? 'var(--renge-color-danger)'
                : toast.type === 'warning'
                  ? 'var(--renge-color-warning)'
                  : 'var(--renge-color-accent)',
          border: '1px solid',
          fontSize: 'var(--renge-font-size-sm)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          animation: 'renge-toast-slide-in 0.3s var(--renge-easing-spring)',
        }"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
  <slot />
</template>
