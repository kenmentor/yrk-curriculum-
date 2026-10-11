<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		eyebrow,
		title,
		lede = '',
		accent = 'var(--brand)',
		controls
	}: {
		eyebrow: string;
		title: string;
		lede?: string;
		accent?: string;
		controls?: Snippet;
	} = $props();
</script>

<header class="max-w-2xl">
	<p class="eyebrow" style={`color: ${accent}`}>{eyebrow}</p>
	<h1 class="title mt-2">{title}</h1>
	{#if lede}<p class="lede mt-2">{lede}</p>{/if}
	{#if controls}
		<div class="mt-4 flex flex-wrap items-center gap-2">{@render controls()}</div>
	{/if}
</header>
