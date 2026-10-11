<script lang="ts">
	import { mapNodes, type MapNode } from '$lib/data/seed';
	import StatusPill from './ui/StatusPill.svelte';

	let { selected = $bindable<string | null>(null) }: { selected?: string | null } = $props();
	let expanded = $state<Set<string>>(new Set(['sci', 'cs-prog', 'y2', 't1']));
	let query = $state('');

	function childrenOf(id: string | null) {
		return mapNodes.filter((n) => n.parent === id && n.title.toLowerCase().includes(query.toLowerCase()));
	}
	function toggle(id: string) {
		expanded = new Set(expanded.has(id) ? [...expanded].filter((x) => x !== id) : [...expanded, id]);
	}
	function progress(id: string): number {
		const desc = mapNodes.filter((n) => n.id === id || n.parent === id);
		if (!desc.length) return 0;
		return Math.round((desc.filter((d) => d.status === 'complete').length / desc.length) * 100);
	}
</script>

<div class="rounded-[10px] border bg-[var(--surface)] p-3">
	<div class="mb-2 flex items-center gap-2">
		<input class="h-9 flex-1 rounded-md border px-3 text-sm" bind:value={query} placeholder="Filter tree…" aria-label="Filter tree" />
		<button class="rounded-md border px-2 py-1 text-xs" onclick={() => (expanded = new Set(mapNodes.map((n) => n.id)))}>Expand all</button>
		<button class="rounded-md border px-2 py-1 text-xs" onclick={() => (expanded = new Set())}>Collapse</button>
	</div>
	<ul role="tree" aria-label="Curriculum tree" class="grid gap-0.5">
		{#each childrenOf(null) as n}
			{@render row(n, 0)}
		{/each}
	</ul>
</div>

{#snippet row(n: MapNode, depth: number)}
	<li role="treeitem" aria-expanded={expanded.has(n.id)} aria-selected={selected === n.id}>
		<div
			class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-[var(--surface-muted)] {selected === n.id ? 'bg-[var(--surface-muted)] ring-1 ring-[var(--brand)]' : ''}"
			style={`padding-left: ${8 + depth * 20}px`}
		>
			<button class="w-5" onclick={() => toggle(n.id)} aria-label={expanded.has(n.id) ? 'Collapse' : 'Expand'}>{expanded.has(n.id) ? '▾' : '▸'}</button>
			<span class="text-xs text-[var(--text-muted)]">{n.type}</span>
			<button class="flex-1 text-left font-medium" onclick={() => (selected = n.id)} ondblclick={() => { const t = prompt('Rename', n.title); if (t) n.title = t; }}>{n.title}</button>
			<span class="h-1.5 w-1.5 rounded-full" style={`background: ${n.status === 'complete' ? '#8FD18A' : n.status === 'in-progress' ? '#F5E27A' : n.status === 'draft' ? '#F2A93B' : '#E4574E'}`}></span>
			{#if n.credits}<span class="tnum text-xs text-[var(--text-muted)]">{n.credits}cr</span>{/if}
			<span class="hidden w-16 items-center gap-1 sm:flex"><span class="h-1 flex-1 rounded bg-slate-200"><span class="block h-1 rounded bg-emerald-500" style={`width:${progress(n.id)}%`}></span></span><span class="tnum text-[10px]">{progress(n.id)}%</span></span>
		</div>
		{#if expanded.has(n.id)}
			<ul role="group">
				{#each childrenOf(n.id) as c}{@render row(c, depth + 1)}{/each}
			</ul>
		{/if}
	</li>
{/snippet}
