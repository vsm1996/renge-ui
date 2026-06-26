<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

export interface CopyButtonProps {
  value: string
  label?: string
  successLabel?: string
  timeout?: number
}

const props = withDefaults(defineProps<CopyButtonProps>(), {
  label: 'Copy',
  successLabel: 'Copied!',
  timeout: 2100,
})

const copied = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const handleClick = async () => {
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      copied.value = false
    }, props.timeout)
  } catch {
    const el = document.createElement('textarea')
    el.value = props.value
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      copied.value = false
    }, props.timeout)
  }
}

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <button
    :aria-label="copied ? successLabel : label"
    :style="{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--renge-space-1)',
      padding: 'var(--renge-space-1) var(--renge-space-3)',
      border: copied
        ? '1px solid var(--renge-color-success)'
        : '1px solid var(--renge-color-border)',
      borderRadius: 'var(--renge-radius-1)',
      background: copied
        ? 'var(--renge-color-success-subtle)'
        : 'var(--renge-color-bg-subtle)',
      color: copied
        ? 'var(--renge-color-success)'
        : 'var(--renge-color-fg-subtle)',
      fontSize: 'var(--renge-font-size-sm)',
      fontFamily: 'inherit',
      cursor: 'pointer',
      transition: 'all var(--renge-duration-2) var(--renge-easing-spring)',
    }"
    v-bind="$attrs"
    @click="handleClick"
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g v-if="copied">
        <path
          d="M2 6l2.5 2.5L10 3"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <g v-else>
        <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.2" />
        <path
          d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
        />
      </g>
    </svg>
    {{ copied ? successLabel : label }}
  </button>
</template>
