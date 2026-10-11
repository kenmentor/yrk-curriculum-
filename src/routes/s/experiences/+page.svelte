<script lang="ts">
	import { page } from '$app/stores';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { experiencesFor } from '$lib/data/growth';
	import PageHeader from '$lib/components/public/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let term = $state<'All' | '1st' | '2nd' | '3rd'>('All');
	let list = $derived(experiencesFor(classId).filter((e) => term === 'All' || e.term === term));
	function pick(id: string) {
		classId = id;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
	const KIND_TONE: Record<string, 'violet' | 'sky' | 'emerald'> = {
		Practical: 'violet',
		Laboratory: 'sky',
		Fieldwork: 'emerald'
	};
</script>

<PageHeader eyebrow="Doing" title="Experiences" lede="Practical · Laboratory · Fieldwork, pinned to term and week.">
	{#snippet controls()}
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}<optgroup label={band}>{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}</optgroup>{/each}
		</select>
		<div class="flex gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm">
			{#each ['All', '1st', '2nd', '3rd'] as t}
				<button onclick={() => (term = t as typeof term)} aria-pressed={term === t} class="rounded-md px-3 py-1 {term === t ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}">{t === 'All' ? 'All terms' : `${t} Term`}</button>
			{/each}
		</div>
	{/snippet}
</PageHeader>
<div class="mt-6 grid gap-4 sm:grid-cols-2">
	{#each list as e}
		<article class="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
			<div class="flex items-center justify-between gap-2">
				<Badge tone={KIND_TONE[e.kind] ?? 'muted'}>{e.kind}</Badge>
				<span class="tnum text-[11px] text-[var(--text-muted)]">{e.term} · W{e.week}</span>
			</div>
			<h2 class="mt-2 font-semibold">{e.title}</h2>
			<p class="mt-1 text-xs text-[var(--text-muted)]">{e.subject}</p>
		</article>
	{/each}
	{#if !list.length}<p class="text-sm text-[var(--text-muted)]">Nothing in {term}. Try All terms.</p>{/if}
</div>
