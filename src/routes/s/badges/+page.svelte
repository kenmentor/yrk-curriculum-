<script lang="ts">
	import { page } from '$app/stores';
	import { Calculator, BookOpen, FlaskConical, Star } from '@lucide/svelte';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { badgesFor } from '$lib/data/growth';
	import PageHeader from '$lib/components/public/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const ICONS = { numbers: Calculator, book: BookOpen, flask: FlaskConical, star: Star } as const;
	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let openId = $state<string | null>(null);
	let list = $derived(badgesFor(classId));
	function pick(id: string) {
		classId = id;
		openId = null;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
</script>

<PageHeader eyebrow="Winning" title="Badges" lede="Earned by doing real work. Open one for the exact steps.">
	{#snippet controls()}
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}<optgroup label={band}>{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}</optgroup>{/each}
		</select>
	{/snippet}
</PageHeader>
<div class="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
	<div class="grid content-start gap-4 sm:grid-cols-2">
		{#each list as b}
			{@const Icon = ICONS[b.icon]}
			<button onclick={() => (openId = openId === b.id ? null : b.id)} aria-expanded={openId === b.id} class="rounded-xl border p-5 text-left hover:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-[var(--brand)] {openId === b.id ? 'border-[var(--brand)] bg-[var(--surface)]' : 'border-[var(--border)] bg-[var(--surface)]'}">
				<div class="flex items-center justify-between">
					<span class="grid h-10 w-10 place-items-center rounded-lg bg-[var(--brand)]/15 text-[var(--brand)]"><Icon size={20} /></span>
					<Badge tone="muted">{b.term} Term</Badge>
				</div>
				<span class="mt-2 block font-semibold">{b.name}</span>
				<span class="mt-1 block text-xs text-[var(--text-muted)]">{b.subject} · {b.earners} earners</span>
			</button>
		{/each}
	</div>
	<aside class="h-fit rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5" aria-live="polite">
		{#if list.find((b) => b.id === openId)}
			{@const d = list.find((b) => b.id === openId)!}
			{@const DIcon = ICONS[d.icon]}
			<span class="grid h-12 w-12 place-items-center rounded-xl bg-[var(--brand)]/15 text-[var(--brand)]"><DIcon size={24} /></span>
			<h2 class="mt-2 text-lg font-semibold">{d.name}</h2>
			<p class="tnum mt-1 text-xs text-[var(--text-muted)]">{d.term} Term · {d.subject}</p>
			<p class="mt-2 text-sm">{d.criteria}</p>
			<ol class="mt-3 grid gap-2">
				{#each d.steps as s, i}<li class="flex gap-2 text-sm"><span class="tnum grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--brand)] text-[11px] text-white">{i + 1}</span>{s}</li>{/each}
			</ol>
		{:else}
			<h2 class="font-semibold">How badges work</h2>
			<p class="mt-1 text-sm text-[var(--text-muted)]">Pick a badge for its term, subject, and exact steps. Ask your teacher to record each step.</p>
		{/if}
	</aside>
</div>
