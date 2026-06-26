<script lang="ts">
  export let position: 'first' | 'middle' | 'last' | 'only' = 'only';
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
  export let radius: 'none' | '1' | '2' | '3' | 'full' = '2';
  let className = '';
  export { className as class };
</script>

<div style="display: contents" {...$$restProps}>
  <slot />
</div>
