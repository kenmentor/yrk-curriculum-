<script lang="ts">
	import { page } from '$app/stores';
	import { Calculator, BookOpen, FlaskConical, Star } from '@lucide/svelte';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { badgesFor } from '$lib/data/growth';

	const ICONS = { numbers: Calculator, book: BookOpen, flask: FlaskConical, star: Star } as const;

	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let term = $state<'All' | '1st' | '2nd' | '3rd' | 'Any term'>('All');
	let openId = $state<string | null>(null);
	let list = $derived(
		badgesFor(classId).filter((b) => term === 'All' || b.term === term)
	);
	let detail = $derived(list.find((b) => b.id === openId));
	function pick(id: string) {
		classId = id;
		openId = null;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]">School: 1School Lagos · Earned, not given</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">Badges</h1>
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}
				<optgroup label={band}>
					{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}
				</optgroup>
			{/each}
		</select>
		<div class="flex gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm" role="tablist" aria-label="Term availability">
			{#each ['All', '1st', '2nd', '3rd', 'Any term'] as t}
				<button role="tab" aria-selected={term === t} onclick={() => (term = t as typeof term)} class="rounded-md px-2.5 py-1 {term === t ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}">{t === 'All' ? 'All' : t}</button>
			{/each}
		</div>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Each badge names its term and subject. Open one to see exactly how to win it.</p>

	<div class="mt-4 grid gap-3 lg:grid-cols-[1fr_340px]">
		<div class="grid content-start gap-3 sm:grid-cols-2">
			{#each list as b}
				{@const Icon = ICONS[b.icon]}
				<button
					onclick={() => (openId = openId === b.id ? null : b.id)}
					aria-expanded={openId === b.id}
					class="rounded-[10px] border p-4 text-left transition hover:border-[var(--brand)] {openId === b.id ? 'border-[var(--brand)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)]'}"
				>
					<div class="flex items-center justify-between">
						<span class="grid h-10 w-10 place-items-center rounded-lg bg-[var(--brand)]/15 text-[var(--brand)]"><Icon size={20} /></span>
						<span class="tnum rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">{b.term} Term</span>
					</div>
					<h2 class="mt-2 font-semibold">{b.name}</h2>
					<p class="mt-1 text-xs text-[var(--text-muted)]">{b.subject} · {b.earners} earners</p>
					<span class="mt-2 inline-block text-sm text-[var(--brand)]">{openId === b.id ? 'Hide how to win ↑' : 'How to win →'}</span>
				</button>
			{/each}
			{#if !list.length}<p class="text-sm text-[var(--text-muted)]">No badges in {term}. Try All.</p>{/if}
		</div>
		<aside class="h-fit rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5 lg:sticky lg:top-20" aria-label="Badge detail">
			{#if detail}
				{@const DIcon = ICONS[detail.icon]}
				<span class="grid h-12 w-12 place-items-center rounded-xl bg-[var(--brand)]/15 text-[var(--brand)]"><DIcon size={24} /></span>
				<h2 class="mt-2 text-lg font-semibold">{detail.name}</h2>
				<p class="tnum mt-1 text-xs text-[var(--text-muted)]">{detail.term} Term · {detail.subject} · {detail.earners} earners</p>
				<p class="mt-2 text-sm">{detail.criteria}</p>
				<ol class="mt-3 grid gap-2">
					{#each detail.steps as s, i}
						<li class="flex gap-2 text-sm"><span class="tnum grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[11px] text-white">{i + 1}</span>{s}</li>
					{/each}
				</ol>
				<a class="mt-4 inline-block rounded-md bg-[var(--brand)] px-4 py-2 text-sm text-white" href={`/curriculum/${classId}`}>Start winning →</a>
			{:else}
				<h2 class="font-semibold">How badges work</h2>
				<p class="mt-1 text-sm text-[var(--text-muted)]">Pick a badge to see its term, subject, and the exact steps. Finish the steps with your teacher to earn it.</p>
			{/if}
		</aside>
	</div>
</div>
