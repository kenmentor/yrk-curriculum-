<script lang="ts">
	import { page } from '$app/stores';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { experiencesFor } from '$lib/data/growth';

	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let term = $state<'All' | '1st' | '2nd' | '3rd'>('All');
	let kind = $state<'All' | 'Practical' | 'Laboratory' | 'Fieldwork'>('All');
	let list = $derived(
		experiencesFor(classId).filter(
			(e) => (term === 'All' || e.term === term) && (kind === 'All' || e.kind === kind)
		)
	);
	function pick(id: string) {
		classId = id;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
	const KIND_STYLE: Record<string, string> = {
		Practical: 'bg-violet-400/15 text-violet-300 border-violet-400/30',
		Laboratory: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
		Fieldwork: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30'
	};
	const TERMS = ['All', '1st', '2nd', '3rd'] as const;
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]">School: 1School Lagos · Hands-on work per class</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">Experiences</h1>
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}
				<optgroup label={band}>
					{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}
				</optgroup>
			{/each}
		</select>
		<div class="flex gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm" role="tablist" aria-label="Term">
			{#each TERMS as t}
				<button role="tab" aria-selected={term === t} onclick={() => (term = t)} class="rounded-md px-3 py-1 {term === t ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}">{t === 'All' ? 'All terms' : `${t} Term`}</button>
			{/each}
		</div>
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" bind:value={kind} aria-label="Kind">
			<option value="All">All kinds</option><option value="Practical">Practical</option><option value="Laboratory">Laboratory</option><option value="Fieldwork">Fieldwork</option>
		</select>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]"><span class="tnum">{list.length}</span> experiences · {term === 'All' ? 'all terms' : `${term} Term`} · <a href={`/curriculum/${classId}`} class="text-[var(--brand)] hover:underline">Open scheme →</a></p>

	{#if !list.length}
		<p class="mt-4 rounded-[10px] border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]">Nothing in {term === 'All' ? 'any term' : `${term} Term`} for this filter. Try All terms.</p>
	{:else}
		<div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{#each list as e}
				<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4">
					<div class="flex items-center justify-between gap-2">
						<span class="rounded-md border px-2 py-0.5 text-[11px] font-bold {KIND_STYLE[e.kind]}">{e.kind}</span>
						<span class="tnum text-[11px] text-[var(--text-muted)]">{e.term} · W{e.week}</span>
					</div>
					<h2 class="mt-2 font-semibold">{e.title}</h2>
					<p class="mt-1 text-xs text-[var(--text-muted)]">{e.subject} · {classId.replace('-', ' ')}</p>
					<a class="mt-3 inline-block text-sm text-[var(--brand)] hover:underline" href={`/curriculum/${classId}`}>Open Week {e.week} →</a>
				</article>
			{/each}
		</div>
	{/if}
</div>
