<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface KBDProps {
  keys?: string[];
}

const props = withDefaults(defineProps<KBDProps>(), {
  keys: () => [],
});

const kbdStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontFamily: 'monospace',
};

const keyStyle: CSSProperties = {
  display: 'inline-block',
  minWidth: '24px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  background: 'var(--renge-color-bg-subtle)',
  border: '1px solid var(--renge-color-border)',
  borderRadius: 'var(--renge-radius-1)',
  padding: '0 var(--renge-space-1)',
  fontSize: 'var(--renge-font-size-xs)',
  fontWeight: 600,
};

const separatorStyle: CSSProperties = {
  margin: '0 4px',
};
</script>

<template>
  <kbd :style="kbdStyle" v-bind="$attrs">
    <span v-for="(key, idx) in keys" :key="idx">
      <span v-if="idx > 0" :style="separatorStyle">+</span>
      <span :style="keyStyle">{{ key.trim() }}</span>
    </span>
  </kbd>
</template>
