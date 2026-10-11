<script lang="ts">
	import StatusPill from './ui/StatusPill.svelte';
	import { ENTITY_META, ENTITY_SEED, type EntityKey } from '$lib/data/entities';

	let { entity }: { entity: EntityKey } = $props();
	const meta = $derived(ENTITY_META[entity]);
	let q = $state('');
	let status = $state('all');
	let selected = $state<string | null>(null);
	let density = $state<'comfortable' | 'compact'>('comfortable');

	let rows = $derived(
		ENTITY_SEED[entity]
			.filter((r) => status === 'all' || r.status === status)
			.filter((r) => (r.title + r.code + r.owner).toLowerCase().includes(q.toLowerCase()))
	);
	let detail = $derived(rows.find((r) => r.id === selected));

	function exportCSV() {
		const csv = [['code', 'title', 'status', 'owner', 'updated'], ...rows.map((r) => [r.code, `"${r.title}"`, r.status, `"${r.owner}"`, r.updated])].join('\n');
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
		a.download = `${entity}.csv`;
		a.click();
	}
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]">School: 1School Lagos · {meta.title}</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">{meta.title}</h1>
		<span class="tnum text-sm text-[var(--text-muted)]">{rows.length} records</span>
		<a href="/curriculum/builder" class="ml-auto rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm font-medium text-white">+ New</a>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">{meta.blurb}</p>

	<div class="mt-3 flex flex-wrap gap-2">
		<input class="h-9 w-64 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" bind:value={q} placeholder={`Search ${meta.title.toLowerCase()}…`} aria-label="Search" />
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" bind:value={status} aria-label="Status filter">
			<option value="all">All statuses</option>
			<option value="draft">Draft</option>
			<option value="in-progress">In Progress</option>
			<option value="complete">Complete</option>
			<option value="error">Error</option>
		</select>
		<button class="rounded-md border border-[var(--border)] px-3 text-sm" onclick={() => (density = density === 'comfortable' ? 'compact' : 'comfortable')}>Density: {density}</button>
		<button class="rounded-md border border-[var(--border)] px-3 text-sm" onclick={exportCSV}>Export CSV</button>
	</div>

	<div class="mt-3 grid gap-3 {selected ? 'lg:grid-cols-[1fr_320px]' : ''}">
		<div class="overflow-x-auto rounded-[10px] border border-[var(--border)] bg-[var(--surface)]">
			<table class="w-full min-w-[760px] text-left text-sm">
				<thead class="sticky top-0 bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
					<tr><th class="px-3 py-2">Code</th><th class="px-3 py-2">Title</th><th class="px-3 py-2">Status</th><th class="px-3 py-2">Owner</th><th class="px-3 py-2">Updated</th></tr>
				</thead>
				<tbody>
					{#each rows as r}
						<tr class="border-t border-[var(--border)] hover:bg-[var(--surface-muted)] {selected === r.id ? 'bg-[var(--surface-muted)]' : ''} {density === 'compact' ? 'h-9' : 'h-12'}" onclick={() => (selected = r.id)}>
							<td class="tnum px-3">{r.code}</td>
							<td class="px-3 font-medium">{r.title}{#if r.step}<span class="block text-[11px] font-normal text-[var(--text-muted)]">{r.step}</span>{/if}</td>
							<td class="px-3"><StatusPill status={r.status} size="sm" /></td>
							<td class="px-3 text-[var(--text-muted)]">{r.owner}</td>
							<td class="tnum px-3 text-[var(--text-muted)]">{r.updated}</td>
						</tr>
					{/each}
					{#if !rows.length}<tr><td colspan="5" class="px-3 py-8 text-center text-[var(--text-muted)]">Nothing matches. Clear search or create new.</td></tr>{/if}
				</tbody>
			</table>
		</div>
		{#if detail}
			<aside class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4" aria-label="Detail">
				<div class="flex items-start justify-between gap-2">
					<div><p class="tnum text-xs text-[var(--text-muted)]">{detail.code}</p><h2 class="font-semibold">{detail.title}</h2></div>
					<button class="text-lg" onclick={() => (selected = null)} aria-label="Close">×</button>
				</div>
				<div class="mt-2"><StatusPill status={detail.status} size="sm" /></div>
				<dl class="mt-3 grid gap-1.5 text-sm">
					<div class="flex justify-between"><dt class="text-[var(--text-muted)]">Owner</dt><dd>{detail.owner}</dd></div>
					<div class="flex justify-between"><dt class="text-[var(--text-muted)]">Updated</dt><dd class="tnum">{detail.updated}</dd></div>
					{#if detail.step}<div class="flex justify-between"><dt class="text-[var(--text-muted)]">Step</dt><dd>{detail.step}</dd></div>{/if}
				</dl>
				<div class="mt-4 flex gap-2">
					<a href="/curriculum/builder" class="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white">Open in Builder</a>
					<a href="/curriculum" class="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm">View in curriculum</a>
				</div>
			</aside>
		{/if}
	</div>
</div>
