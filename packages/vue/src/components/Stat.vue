<script setup lang="ts">
interface StatProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  caption?: string;
}

const props = defineProps<StatProps>();

const trendColor = {
  up: 'var(--renge-color-success)',
  down: 'var(--renge-color-danger)',
  neutral: 'var(--renge-color-fg-muted)',
};

const trendBg = {
  up: 'var(--renge-color-success-subtle)',
  down: 'var(--renge-color-danger-subtle)',
  neutral: 'var(--renge-color-bg-subtle)',
};

const trendBorder = {
  up: 'var(--renge-color-success)',
  down: 'var(--renge-color-danger)',
  neutral: 'var(--renge-color-border-subtle)',
};

const trendSymbol = {
  up: '↑',
  down: '↓',
  neutral: '—',
};

const statStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: 'var(--renge-space-4)',
};

const labelStyle = {
  fontSize: 'var(--renge-font-size-xs)',
  color: 'var(--renge-color-fg-muted)',
  marginBottom: 'var(--renge-space-1)',
  fontWeight: 500,
};

const valueContainerStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--renge-space-3)',
  flexWrap: 'wrap',
};

const valueStyle = {
  fontSize: 'var(--renge-font-size-3xl)',
  lineHeight: 1.2,
  fontWeight: 600,
  color: 'var(--renge-color-fg)',
};

const captionStyle = {
  fontSize: 'var(--renge-font-size-xs)',
  color: 'var(--renge-color-fg-muted)',
  marginTop: 'var(--renge-space-1)',
};

const getTrendStyle = () => props.trend && {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'var(--renge-space-1)',
  padding: 'var(--renge-space-1) var(--renge-space-2)',
  fontSize: 'var(--renge-font-size-xs)',
  fontWeight: 500,
  lineHeight: 1,
  borderRadius: 'var(--renge-radius-full)',
  border: `1px solid ${trendBorder[props.trend]}`,
  background: trendBg[props.trend],
  color: trendColor[props.trend],
};
</script>

<template>
  <div :style="statStyle" v-bind="$attrs">
    <span :style="labelStyle">{{ label }}</span>
    <div :style="valueContainerStyle">
      <span :style="valueStyle">{{ value }}</span>
      <span v-if="trend && trendValue" :style="getTrendStyle()">
        {{ trendSymbol[trend] }} {{ trendValue }}
      </span>
    </div>
    <span v-if="caption" :style="captionStyle">{{ caption }}</span>
  </div>
</template>
