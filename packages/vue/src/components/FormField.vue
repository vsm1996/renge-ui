<script setup lang="ts">
import { computed } from 'vue'

export interface FormFieldProps {
  label: string
  htmlFor?: string
  helperText?: string
  errorText?: string
  required?: boolean
}

const props = defineProps<FormFieldProps>()

const subText = computed(() => props.errorText ?? props.helperText)
const subColor = computed(() =>
  props.errorText ? 'var(--renge-color-danger)' : 'var(--renge-color-fg-muted)'
)
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--renge-space-2)',
    }"
    v-bind="$attrs"
  >
    <label
      :for="htmlFor"
      :style="{
        fontSize: 'var(--renge-font-size-sm)',
        fontWeight: 500,
        color: 'var(--renge-color-fg)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--renge-space-1)',
      }"
    >
      {{ label }}
      <span v-if="required" aria-hidden="true" :style="{ color: 'var(--renge-color-danger)' }">
        *
      </span>
    </label>
    <slot />
    <span
      v-if="subText"
      :style="{
        fontSize: 'var(--renge-font-size-xs)',
        color: subColor,
      }"
    >
      {{ subText }}
    </span>
  </div>
</template>
