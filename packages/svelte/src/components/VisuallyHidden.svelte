<script lang="ts">
  export let style = '';

  const baseStyles = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `;
</script>

<span style="{baseStyles} {style}" {...$$restProps}>
  <slot />
</span>
