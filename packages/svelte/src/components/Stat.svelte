<script lang="ts">
  export let value: string | number;
  export let label: string;
  export let trend: 'up' | 'down' | 'neutral' | undefined = undefined;
  export let trendValue: string | undefined = undefined;
  export let caption: string | undefined = undefined;
  export let style = '';

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

  const containerStyle = 'display: flex; flex-direction: column; padding: var(--renge-space-4);';
  const labelStyle = 'font-size: var(--renge-font-size-xs); color: var(--renge-color-fg-muted); margin-bottom: var(--renge-space-1); font-weight: 500;';
  const valueContainerStyle = 'display: flex; align-items: baseline; gap: var(--renge-space-3); flex-wrap: wrap;';
  const valueStyle = 'font-size: var(--renge-font-size-3xl); line-height: 1.2; font-weight: 600; color: var(--renge-color-fg);';
  const captionStyle = 'font-size: var(--renge-font-size-xs); color: var(--renge-color-fg-muted); margin-top: var(--renge-space-1);';
</script>

<div style="{containerStyle} {style}" {...$$restProps}>
  <span style={labelStyle}>
    {label}
  </span>

  <div style={valueContainerStyle}>
    <span style={valueStyle}>
      {value}
    </span>

    {#if trend && trendValue}
      <span
        style={`
          display: inline-flex;
          align-items: center;
          gap: var(--renge-space-1);
          padding: var(--renge-space-1) var(--renge-space-2);
          font-size: var(--renge-font-size-xs);
          font-weight: 500;
          line-height: 1;
          border-radius: var(--renge-radius-full);
          border: 1px solid ${trendBorder[trend]};
          background: ${trendBg[trend]};
          color: ${trendColor[trend]};
        `}
      >
        {trendSymbol[trend]} {trendValue}
      </span>
    {/if}
  </div>

  {#if caption}
    <span style={captionStyle}>
      {caption}
    </span>
  {/if}
</div>
