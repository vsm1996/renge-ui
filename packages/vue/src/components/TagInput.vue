<script setup lang="ts">
import { ref } from 'vue'

export interface TagInputProps {
  tags?: string[]
  placeholder?: string
}

const props = withDefaults(defineProps<TagInputProps>(), {
  placeholder: 'Add tags...',
})

const emit = defineEmits<{
  change: [tags: string[]]
}>()

const input = ref('')

const handleAddTag = (tag: string) => {
  if (tag.trim() && !props.tags?.includes(tag)) {
    emit('change', [...(props.tags ?? []), tag])
    input.value = ''
  }
}

const handleRemoveTag = (tag: string) => {
  emit('change', props.tags?.filter((t) => t !== tag) ?? [])
}

const handleKeyDown = (e: KeyboardEvent) => {
  const currentInput = (e.target as HTMLInputElement).value
  if ((e.key === 'Enter' || e.key === ',') && currentInput.trim()) {
    e.preventDefault()
    handleAddTag(currentInput.trim())
  } else if (e.key === 'Backspace' && !currentInput && (props.tags?.length ?? 0) > 0) {
    handleRemoveTag(props.tags![props.tags!.length - 1])
  }
}
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--renge-space-2)',
      padding: 'var(--renge-space-2)',
      border: '1px solid var(--renge-color-border)',
      borderRadius: 'var(--renge-radius-2)',
      backgroundColor: 'var(--renge-color-bg)',
    }"
    v-bind="$attrs"
  >
    <span
      v-for="tag in tags"
      :key="tag"
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--renge-space-1)',
        background: 'var(--renge-color-accent)',
        color: 'var(--renge-color-bg)',
        padding: 'var(--renge-space-1) var(--renge-space-2)',
        borderRadius: 'var(--renge-radius-1)',
        fontSize: 'var(--renge-font-size-sm)',
      }"
    >
      {{ tag }}
      <button
        type="button"
        :style="{
          background: 'transparent',
          border: 'none',
          color: 'inherit',
          cursor: 'pointer',
          padding: 0,
          fontSize: 'var(--renge-font-size-sm)',
        }"
        @click="handleRemoveTag(tag)"
      >
        ×
      </button>
    </span>
    <input
      v-model="input"
      type="text"
      :placeholder="placeholder"
      :style="{
        flex: 1,
        minWidth: '100px',
        border: 'none',
        background: 'transparent',
        color: 'var(--renge-color-fg)',
        fontSize: 'var(--renge-font-size-base)',
        outline: 'none',
      }"
      @keydown="handleKeyDown"
    />
  </div>
</template>
