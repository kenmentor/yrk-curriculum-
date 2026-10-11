<script lang="ts">
	import { browser } from '$app/environment';
	interface Task { id: string; title: string; detail: string; done?: string; }
	const SEED: Task[] = [
		{ id: 't1', title: 'Approve Basic 1 Maths W7 fix', detail: 'Builder changed “Fractions (intro)” wording.' },
		{ id: 't2', title: 'Review JSS 1 Science practicals', detail: '2 lab notes need materials listed.' },
		{ id: 't3', title: 'Sign off US History → Basic History weeks', detail: 'Rename + outcome check.' }
	];
	const KEY = 'curriculumiq-inbox';
	let done = $state<Record<string, string>>({});
	if (browser) {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) done = JSON.parse(raw);
		} catch {}
	}
	function act(id: string, label: string) {
		done = { ...done, [id]: label };
		if (browser) localStorage.setItem(KEY, JSON.stringify(done));
	}
	let open = $derived(SEED.filter((t) => !done[t.id]));
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Your work · oldest first</p>
	<h1 class="mt-1 text-xl font-semibold">Inbox <span class="tnum text-sm font-normal text-[var(--text-muted)]">({open.length} open)</span></h1>
	<div class="mt-4 grid gap-2">
		{#each SEED as t}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm {done[t.id] ? 'opacity-60' : ''}">
				<div class="flex items-center justify-between gap-2">
					<h2 class="font-semibold">{t.title}</h2>
					{#if done[t.id]}<span class="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px]">{done[t.id]}</span>{/if}
				</div>
				<p class="mt-1 text-[var(--text-muted)]">{t.detail}</p>
				{#if !done[t.id]}
					<div class="mt-3 flex gap-2">
						<button class="rounded-md bg-[var(--brand)] px-3 py-1.5 text-white" onclick={() => act(t.id, 'Approved')}>Approve</button>
						<button class="rounded-md border border-[var(--border)] px-3 py-1.5" onclick={() => act(t.id, 'Returned')}>Return</button>
					</div>
				{/if}
			</article>
		{/each}
	</div>
</div>
