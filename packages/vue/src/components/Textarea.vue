<script setup lang="ts">
import { computed, ref } from 'vue'

export type TextareaSize = 'sm' | 'md' | 'lg'
export type TextareaState = 'default' | 'error' | 'success'

export interface TextareaProps {
  modelValue?: string
  size?: TextareaSize
  state?: TextareaState
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autofocus?: boolean
}

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  state: 'default',
  fullWidth: false,
  resize: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const sizeStyles: Record<TextareaSize, Record<string, string>> = {
  sm: {
    padding: 'var(--renge-space-1) var(--renge-space-2)',
    fontSize: 'var(--renge-font-size-sm)',
    minHeight: '80px',
  },
  md: {
    padding: 'var(--renge-space-2) var(--renge-space-3)',
    fontSize: 'var(--renge-font-size-base)',
    minHeight: '120px',
  },
  lg: {
    padding: 'var(--renge-space-2) var(--renge-space-4)',
    fontSize: 'var(--renge-font-size-base)',
    minHeight: '200px',
  },
}

const stateColor: Record<TextareaState, string> = {
  default: 'var(--renge-color-border)',
  error: 'var(--renge-color-danger)',
  success: 'var(--renge-color-success)',
}

const textareaRef = ref<HTMLTextAreaElement>()

const computedStyle = computed(() => ({
  ...sizeStyles[props.size],
  display: 'block',
  width: props.fullWidth ? '100%' : undefined,
  background: 'var(--renge-color-bg)',
  color: 'var(--renge-color-fg)',
  border: `1px solid ${stateColor[props.state]}`,
  borderRadius: 'var(--renge-radius-2)',
  outline: 'none',
  resize: props.resize,
  transition: 'border-color var(--renge-duration-1) var(--renge-easing-ease-out)',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  lineHeight: 'var(--renge-line-height-base)',
}))

const handleFocus = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLTextAreaElement
  el.style.outline = '2px solid var(--renge-color-border-focus)'
  el.style.outlineOffset = '2px'
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  const el = e.currentTarget as HTMLTextAreaElement
  el.style.outline = 'none'
  emit('blur', e)
}
</script>

<template>
  <textarea
    ref="textareaRef"
    :style="computedStyle"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :autofocus="autofocus"
    v-bind="$attrs"
    @input="(e) => emit('update:modelValue', (e.target as HTMLTextAreaElement).value)"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
