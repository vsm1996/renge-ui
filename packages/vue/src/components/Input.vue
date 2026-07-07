<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue'

export type InputSize = 'sm' | 'md' | 'lg'
export type InputState = 'default' | 'error' | 'success'

export interface InputProps {
  modelValue?: string
  size?: InputSize
  state?: InputState
  fullWidth?: boolean
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  size: 'md',
  state: 'default',
  fullWidth: false,
  type: 'text',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const sizeStyles: Record<InputSize, Record<string, string>> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
  },
}

const stateColor: Record<InputState, string> = {
  default: 'var(--renge-color-border)',
  error: 'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
}

const inputRef = ref<HTMLInputElement>()

const computedStyle = computed<CSSProperties>(() => ({
  ...sizeStyles[props.size],
  display: 'block',
  width: props.fullWidth ? '100%' : undefined,
  background: 'var(--renge-color-bg)',
  color: 'var(--renge-color-fg)',
  border: `1px solid ${stateColor[props.state]}`,
  borderRadius: 'var(--renge-radius-2)',
  outline: 'none',
  transition: 'border-color var(--renge-duration-1) var(--renge-easing-ease-out)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}))

const handleFocus = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLInputElement
  el.style.outline = '2px solid var(--renge-color-border-focus)'
  el.style.outlineOffset = '2px'
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLInputElement
  el.style.outline = 'none'
  emit('blur', e)
}
</script>

<template>
  <input
    ref="inputRef"
    :style="computedStyle"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :autofocus="autofocus"
    v-bind="$attrs"
    @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
