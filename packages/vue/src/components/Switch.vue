<script setup lang="ts">
import { computed } from 'vue'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps {
  modelValue?: boolean
  size?: SwitchSize
  label?: string
  labelPosition?: 'left' | 'right'
  disabled?: boolean
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  size: 'md',
  labelPosition: 'right',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [event: Event]
}>()

const TRACK: Record<SwitchSize, { h: number; w: number; thumb: number; padding: number }> = {
  sm: { h: 20, w: 32, thumb: 14, padding: 3 },
  md: { h: 24, w: 40, thumb: 18, padding: 3 },
  lg: { h: 28, w: 48, thumb: 22, padding: 3 },
}

const FONT: Record<SwitchSize, string> = {
  sm: 'var(--renge-font-size-sm)',
  md: 'var(--renge-font-size-base)',
  lg: 'var(--renge-font-size-base)',
}

const isChecked = computed(() => props.modelValue ?? false)
const { h, w, thumb, padding } = TRACK[props.size]
const thumbOffset = computed(() =>
  isChecked.value ? w - thumb - padding : padding
)

const trackStyle = computed(() => ({
  position: 'relative',
  display: 'inline-block',
  width: `${w}px`,
  height: `${h}px`,
  borderRadius: 'var(--renge-radius-full)',
  background: isChecked.value
    ? 'var(--renge-color-accent)'
    : 'var(--renge-color-border)',
  transition: 'background var(--renge-duration-2) var(--renge-easing-ease-out)',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  flexShrink: 0,
}))

const thumbStyle = computed(() => ({
  position: 'absolute',
  top: `${padding}px`,
  left: `${thumbOffset.value}px`,
  width: `${thumb}px`,
  height: `${thumb}px`,
  borderRadius: 'var(--renge-radius-full)',
  background: 'white',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  transition: 'left var(--renge-duration-2) var(--renge-easing-spring)',
}))

const labelStyle = computed(() => ({
  fontSize: FONT[props.size],
  color: props.disabled ? 'var(--renge-color-fg-muted)' : 'var(--renge-color-fg)',
  userSelect: 'none',
  lineHeight: 'var(--renge-line-height-base)',
}))

const wrapperStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--renge-space-2)',
  cursor: props.disabled ? 'not-allowed' : 'pointer',
  opacity: props.disabled ? 0.5 : 1,
}))

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', e)
}
</script>

<template>
  <label :style="wrapperStyle" v-bind="$attrs">
    <span v-if="labelPosition === 'left' && label" :style="labelStyle">
      {{ label }}
    </span>
    <input
      type="checkbox"
      role="switch"
      :checked="isChecked"
      :disabled="disabled"
      :aria-checked="isChecked"
      style="position: absolute; opacity: 0; width: 0; height: 0; margin: 0"
      @change="handleChange"
    />
    <span :style="trackStyle" aria-hidden="true">
      <span :style="thumbStyle" />
    </span>
    <span v-if="labelPosition === 'right' && label" :style="labelStyle">
      {{ label }}
    </span>
  </label>
</template>
