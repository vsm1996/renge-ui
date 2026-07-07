<script setup lang="ts">
import { ref, type CSSProperties } from 'vue'

export interface ModalProps {
  open?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  size: 'md',
})

const emit = defineEmits<{
  close: []
}>()

const exiting = ref(false)

const sizeMap: Record<'sm' | 'md' | 'lg', CSSProperties> = {
  sm: { maxWidth: '400px' },
  md: { maxWidth: '600px' },
  lg: { maxWidth: '800px' },
}

const handleClose = () => {
  exiting.value = true
  setTimeout(() => {
    emit('close')
  }, 200)
}

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).getAttribute('role') === 'presentation') {
    handleClose()
  }
}
</script>

<template>
  <Teleport to="body" v-if="open">
    <div
      role="presentation"
      :style="{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `rgba(0, 0, 0, ${exiting ? 0 : 0.5})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transition: 'background var(--renge-duration-3)',
      }"
      @click="handleBackdropClick"
    >
      <div
        role="dialog"
        aria-modal="true"
        :style="{
          ...sizeMap[props.size],
          width: '90%',
          background: 'var(--renge-color-bg)',
          borderRadius: 'var(--renge-radius-2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          opacity: exiting ? 0 : 1,
          transform: `scale(${exiting ? 0.95 : 1})`,
          transition: `opacity var(--renge-duration-2) var(--renge-easing-spring), transform var(--renge-duration-2) var(--renge-easing-spring)`,
          maxHeight: '90vh',
          overflowY: 'auto',
          outline: 'none',
        }"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
