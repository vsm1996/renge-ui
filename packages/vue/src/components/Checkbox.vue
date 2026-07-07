<script setup lang="ts">
import { computed, onMounted, type CSSProperties } from 'vue'

export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps {
  modelValue?: boolean
  size?: CheckboxSize
  label?: string
  indeterminate?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  size: 'md',
  indeterminate: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const SIZE_PX: Record<CheckboxSize, number> = { sm: 16, md: 20, lg: 24 }
const FONT: Record<CheckboxSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
}

const px = computed(() => SIZE_PX[props.size])
const isChecked = computed(() => props.modelValue ?? false)

const boxStyle = computed<CSSProperties>(() => ({
  width: `${px.value}px`,
  height: `${px.value}px`,
  minWidth: `${px.value}px`,
  borderRadius: 'var(--renge-radius-1)',
  border: isChecked.value || props.indeterminate
    ? '2px solid var(--renge-color-accent)'
    : '2px solid var(--renge-color-border)',
  background: isChecked.value || props.indeterminate
    ? 'var(--renge-color-accent)'
    : 'var(--renge-color-bg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all var(--renge-duration-2) var(--renge-easing-spring)',
  flexShrink: 0,
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  opacity: props.disabled ? 0.5 : 1,
}))

const labelStyle = computed<CSSProperties>(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--renge-space-2)',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
}))

const textStyle = computed<CSSProperties>(() => ({
  fontSize: FONT[props.size],
  color: props.disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
  lineHeight: 'var(--renge-line-height-base)',
  userSelect: 'none',
}))

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', e)
}

const checkmarkWidth = computed(() => `${px.value * 0.618}px`)
const checkmarkHeight = computed(() => `${px.value * 0.618}px`)

onMounted(() => {
  if (typeof document !== 'undefined') {
    const id = '__renge-checkbox-kf__'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id
      s.textContent = `
@keyframes rengeCheckDraw {
  from { stroke-dashoffset: 14; }
  to   { stroke-dashoffset: 0; }
}`
      document.head.appendChild(s)
    }
  }
})
</script>

<template>
  <label :style="labelStyle">
    <input
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0"
      v-bind="$attrs"
      @change="handleChange"
    />
    <span :style="boxStyle" aria-hidden="true">
      <svg
        v-if="isChecked && !indeterminate"
        :width="checkmarkWidth"
        :height="checkmarkHeight"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4l2.5 2.5L9 1"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="14"
          stroke-dashoffset="0"
          style="animation: rengeCheckDraw var(--renge-duration-2) var(--renge-easing-spring) forwards"
        />
      </svg>
      <svg v-if="indeterminate" :width="`${px * 0.5}px`" height="2" viewBox="0 0 8 2">
        <line
          x1="0"
          y1="1"
          x2="8"
          y2="1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span v-if="label" :style="textStyle">
      {{ label }}
    </span>
  </label>
</template>
