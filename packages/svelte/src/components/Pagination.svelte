<script lang="ts">
  export let total = 10;
  export let page = 1;
  export let siblings = 1;
  export let showEdges = true;
  let className = '';
  export { className as class };

  function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  function getPages(total: number, page: number, siblings: number): (number | string)[] {
    const totalDisplayed = siblings * 2 + 5;
    if (total <= totalDisplayed) return range(1, total);

    const leftSib = Math.max(page - siblings, 2);
    const rightSib = Math.min(page + siblings, total - 1);
    const showLeft = leftSib > 2;
    const showRight = rightSib < total - 1;

    const middle = range(leftSib, rightSib);

    return [
      1,
      ...(showLeft ? ['...'] : []),
      ...middle,
      ...(showRight ? ['...'] : []),
      total,
    ];
  }

  $: pages = getPages(total, page, siblings);

  function handlePageClick(p: number | string) {
    if (typeof p === 'number') {
      page = p;
    }
  }
</script>

<nav
  aria-label="Pagination"
  class={className}
  style="
    display: inline-flex;
    align-items: center;
    gap: var(--renge-space-1);
  "
  {...$$restProps}
>
  <button
    disabled={page <= 1}
    style="
      min-width: var(--renge-space-5);
      height: var(--renge-space-5);
      padding: 0 var(--renge-space-2);
      border-radius: var(--renge-radius-1);
      border: 1px solid transparent;
      background: transparent;
      color: var(--renge-color-fg-subtle);
      font-size: var(--renge-font-size-sm);
      font-family: inherit;
      cursor: {page <= 1 ? 'default' : 'pointer'};
      opacity: {page <= 1 ? 0.4 : 1};
      transition: all var(--renge-duration-1) var(--renge-easing-ease-out);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    "
    on:click={() => handlePageClick(page - 1)}
  >
    ←
  </button>

  {#each pages as p, i}
    {#if p === '...'}
      <span
        style="
          width: var(--renge-space-4);
          text-align: center;
          color: var(--renge-color-fg-muted);
          font-size: var(--renge-font-size-sm);
          user-select: none;
        "
        aria-hidden="true"
      >
        …
      </span>
    {:else}
      <button
        aria-current={p === page ? 'page' : undefined}
        style="
          min-width: var(--renge-space-5);
          height: var(--renge-space-5);
          padding: 0 var(--renge-space-2);
          border-radius: var(--renge-radius-1);
          border: {p === page
          ? '1px solid var(--renge-color-accent)'
          : '1px solid transparent'};
          background: {p === page ? 'var(--renge-color-accent)' : 'transparent'};
          color: {p === page
          ? 'var(--renge-color-fg-inverse)'
          : 'var(--renge-color-fg-subtle)'};
          font-size: var(--renge-font-size-sm);
          font-family: inherit;
          cursor: pointer;
          opacity: 1;
          transition: all var(--renge-duration-1) var(--renge-easing-ease-out);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-variant-numeric: tabular-nums;
        "
        on:click={() => handlePageClick(p)}
      >
        {p}
      </button>
    {/if}
  {/each}

  <button
    disabled={page >= total}
    style="
      min-width: var(--renge-space-5);
      height: var(--renge-space-5);
      padding: 0 var(--renge-space-2);
      border-radius: var(--renge-radius-1);
      border: 1px solid transparent;
      background: transparent;
      color: var(--renge-color-fg-subtle);
      font-size: var(--renge-font-size-sm);
      font-family: inherit;
      cursor: {page >= total ? 'default' : 'pointer'};
      opacity: {page >= total ? 0.4 : 1};
      transition: all var(--renge-duration-1) var(--renge-easing-ease-out);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    "
    on:click={() => handlePageClick(page + 1)}
  >
    →
  </button>
</nav>
