<script lang="ts">
  export let width: string = '100%';
  export let height: string = '1rem';
  export let circle: boolean = false;
  let className = '';
  export { className as class };

  const baseStyle = `
    background: var(--renge-color-bg-subtle);
    border-radius: ${circle ? '50%' : 'var(--renge-radius-1)'};
    width: ${width};
    height: ${height};
    animation: skeleton-pulse 1.5s var(--renge-easing-ease-in-out) infinite;
  `;
</script>

<div class={className} style={baseStyle} {...$$restProps} />

<style>
  @keyframes skeleton-pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
</style>
