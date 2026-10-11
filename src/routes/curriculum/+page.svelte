<script lang="ts">
	import { BANDS, CLASSES, subjectsFor } from '$lib/data/classes';

	let q = $state('');
	let rows = $derived(CLASSES.filter((c) => (c.label + c.band).toLowerCase().includes(q.toLowerCase())));
	const BAND_COLOR: Record<string, string> = {
		Nursery: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
		Primary: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
		'Junior Secondary': 'bg-sky-400/15 text-sky-300 border-sky-400/30',
		'Senior Secondary': 'bg-violet-400/15 text-violet-300 border-violet-400/30'
	};
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]">School: 1School Lagos · Basic education focus</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">Curriculum</h1>
		<span class="tnum text-sm text-[var(--text-muted)]">{rows.length} classes</span>
		<input class="ml-auto h-9 w-64 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" bind:value={q} placeholder="Search Nursery 1 … SSS 3" aria-label="Search classes" />
		<a href="/curriculum/bank" class="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white">My Bank →</a>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Pick a class card to open its term scheme — weeks 1 to 12 with topics and content.</p>

	{#each BANDS as band}
		{@const list = rows.filter((c) => c.band === band)}
		{#if list.length}
			<h2 class="mb-2 mt-6 text-sm font-semibold text-[var(--text-muted)]">{band}</h2>
			<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{#each list as c}
					<a
						href={`/curriculum/${c.id}`}
						class="group rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-px hover:border-[var(--brand)]"
					>
						<div class="flex items-center justify-between">
							<span class="rounded-md border px-2 py-0.5 text-[11px] font-bold {BAND_COLOR[band]}">{c.short}</span>
							<span class="text-[11px] text-[var(--text-muted)]">{c.framework}</span>
						</div>
						<h3 class="mt-2 font-semibold group-hover:underline">{c.label} Curriculum</h3>
						<p class="tnum mt-1 text-xs text-[var(--text-muted)]">{subjectsFor(c.id).length} subjects · 3 terms · 12 weeks</p>
						<p class="mt-2 text-xs text-[var(--text-muted)]">{subjectsFor(c.id).slice(0, 3).join(' · ')}{subjectsFor(c.id).length > 3 ? '…' : ''}</p>
					</a>
				{/each}
			</div>
		{/if}
	{/each}
</div>
