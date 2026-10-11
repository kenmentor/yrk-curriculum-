<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { CLASSES, subjectsFor, type Term } from '$lib/data/classes';
	import { loadWeeks } from '$lib/curriculum/weeks-store';
	import { isPublicClass } from '$lib/curriculum/bank';

	const classId = $derived($page.params.classId ?? '');
	const info = $derived(CLASSES.find((c) => c.id === classId));
	let pub = $state(true);
	onMount(() => { pub = isPublicClass(classId); });
	let term = $state<Term>('1st');
	let subject = $state('');
	let q = $state('');

	$effect(() => {
		const list = subjectsFor(classId);
		if (!list.includes(subject)) subject = list[0] ?? '';
	});

	let weeks = $derived(subject ? loadWeeks(classId, subject, term) : []);
	let subjects = $derived(subjectsFor(classId).filter((s) => s.toLowerCase().includes(q.toLowerCase())));
</script>

{#if !info}
	<div class="p-8 text-center">
		<h1 class="title">Class not found</h1>
		<a href="/s" class="link-soft mt-2 inline-block text-sm">← All classes</a>
	</div>
{:else if !pub}
	<div class="mx-auto max-w-md p-12 text-center">
		<p class="eyebrow text-[var(--text-muted)]">Private</p>
		<h1 class="title mt-2">{info.label} isn't public yet</h1>
		<p class="lede mt-2">Staff can flip it to Public from the Bank or Builder.</p>
		<a href="/s" class="link-soft mt-4 inline-block text-sm">← All classes</a>
	</div>
{:else}
	<p class="eyebrow text-[var(--text-muted)]"><a href="/s" class="hover:underline">Home</a> / {info.label} · {info.framework}</p>
	<h1 class="title mt-2">{info.label} Curriculum</h1>
	<p class="lede mt-1">{info.band} · Pick a subject and term — every week shows its topic, content, and outcome.</p>
	<div class="mt-4 flex flex-wrap gap-2 text-sm">
		<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--brand)]" href={`/s/competencies?class=${classId}`}>Competencies →</a>
		<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--brand)]" href={`/s/experiences?class=${classId}`}>Experiences →</a>
		<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--brand)]" href={`/s/badges?class=${classId}`}>Badges →</a>
	</div>

	<div class="sticky top-14 z-30 -mx-4 mt-6 border-y border-[var(--border)] bg-[var(--bg-app)]/95 px-4 py-2 backdrop-blur">
		<div class="flex flex-wrap items-center gap-2">
			<p class="text-sm font-semibold">{subject || 'Pick a subject'}</p>
			<span class="tnum text-xs text-[var(--text-muted)]">{term} Term · Weeks 1–{weeks.length}</span>
			<div class="ml-auto flex items-center gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm" role="tablist" aria-label="Term">
				{#each ['1st', '2nd', '3rd'] as t}
					<button role="tab" aria-selected={term === t} onclick={() => (term = t as Term)} class="rounded-md px-3 py-1 focus-visible:outline-2 focus-visible:outline-[var(--brand)] {term === t ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}">{t} Term</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
		<aside class="h-fit rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
			<input class="h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm" bind:value={q} placeholder="Search subjects…" aria-label="Search subjects" />
			<ul class="mt-2 grid gap-1">
				{#each subjects as s}
					<li>
						<button
							onclick={() => (subject = s)}
							aria-current={subject === s ? 'true' : undefined}
							class="w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline-2 focus-visible:outline-[var(--brand)] {subject === s ? 'bg-[var(--brand)] text-white' : 'hover:bg-[var(--surface-muted)]'}"
						>{s}</button>
					</li>
				{/each}
			</ul>
		</aside>

		<section class="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]" aria-label="Weekly scheme">
			<div class="hidden sm:block">
				<div class="overflow-x-auto">
					<table class="w-full min-w-[640px] text-left text-sm">
						<thead class="bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
							<tr><th class="w-16 px-4 py-2">Week</th><th class="w-56 px-4 py-2">Topic</th><th class="px-4 py-2">Content</th></tr>
						</thead>
						<tbody>
							{#each weeks as w}
								<tr class="border-t border-[var(--border)] align-top">
									<td class="tnum px-4 py-3 font-bold">W{w.week}</td>
									<td class="px-4 py-3 font-medium">{w.topic}</td>
									<td class="px-4 py-3">
										<p class="leading-relaxed text-[var(--text-strong)]">{w.content}</p>
										<p class="mt-1 text-xs text-[var(--text-muted)]">Outcome: {w.outcome}</p>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
			<ol class="grid gap-px bg-[var(--border)] sm:hidden">
				{#each weeks as w}
					<li class="bg-[var(--surface)] px-4 py-4">
						<p class="tnum text-[11px] font-bold text-[var(--brand-soft)]">Week {w.week} · {term} Term</p>
						<h3 class="mt-1 font-semibold leading-snug">{w.topic}</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-[var(--text-strong)]">{w.content}</p>
						<p class="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">Outcome: {w.outcome}</p>
					</li>
				{/each}
			</ol>
		</section>
	</div>
{/if}
