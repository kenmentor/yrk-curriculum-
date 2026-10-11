<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Comments from '$lib/components/Comments.svelte';
	import { CLASSES, subjectsFor, type Term } from '$lib/data/classes';
	import { loadWeeks } from '$lib/curriculum/weeks-store';

	const classId = $derived($page.params.classId ?? '');
	const info = $derived(CLASSES.find((c) => c.id === classId));
	let term = $state<Term>('1st');
	let subject = $state('');
	let q = $state('');

	$effect(() => {
		const list = subjectsFor(classId ?? '');
		if (!list.includes(subject)) subject = list[0] ?? '';
	});

	let subjects = $derived(subjectsFor(classId ?? '').filter((s) => s.toLowerCase().includes(q.toLowerCase())));
	let weeks = $derived(subject ? loadWeeks(classId ?? '', subject, term) : []);
	let edited = $derived.by(() => {
		if (!browser) return false;
		try {
			return !!localStorage.getItem(`curriculumiq-weeks-${classId}-${subject.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${term}`);
		} catch { return false; }
	});

	function exportCSV() {
		const csv = [['week', 'topic', 'content', 'outcome'], ...weeks.map((w) => [w.week, `"${w.topic}"`, `"${w.content}"`, `"${w.outcome}"`])].join('\n');
		const a = document.createElement('a');
		a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
		a.download = `${classId}-${subject}-${term}-scheme.csv`;
		a.click();
	}
</script>

{#if !info}
	<div class="mx-auto max-w-2xl p-8 text-center">
		<h1 class="text-lg font-semibold">Class not found</h1>
		<a href="/curriculum" class="text-sm text-[var(--brand)] hover:underline">← All classes</a>
	</div>
{:else}
	<div class="mx-auto max-w-[1440px]">
		<p class="text-xs text-[var(--text-muted)]"><a href="/curriculum" class="hover:underline">Curriculum</a> / {info.label} · {info.framework}</p>
		<div class="mt-1 flex flex-wrap items-center gap-3">
			<h1 class="text-xl font-semibold">{info.label} Curriculum</h1>
			<span class="text-sm text-[var(--text-muted)]">{info.band}</span>
			<div class="ml-auto flex items-center gap-2">
				<label class="text-sm text-[var(--text-muted)]" for="term">Term</label>
				<select id="term" class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" bind:value={term}>
					<option value="1st">1st Term</option>
					<option value="2nd">2nd Term</option>
					<option value="3rd">3rd Term</option>
				</select>
				<button class="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm" onclick={exportCSV}>Export</button>
				<a href={`/curriculum/builder?class=${classId}&subject=${encodeURIComponent(subject)}&term=${term}`} class="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white">Edit in Builder</a>
			</div>
		</div>
		<div class="mt-3 flex flex-wrap gap-2 text-sm">
			<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)]" href={`/competencies?class=${classId}`}>Competencies →</a>
			<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)]" href={`/experiences?class=${classId}`}>Experiences →</a>
			<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)]" href={`/badges?class=${classId}`}>Badges →</a>
			<a class="rounded-md border border-[var(--border)] px-3 py-1.5 hover:bg-[var(--surface-muted)]" href={`/outcomes?class=${classId}`}>Outcomes →</a>
		</div>

		<div class="mt-4 grid gap-3 lg:grid-cols-[280px_1fr]">
			<aside class="h-fit rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-3">
				<input class="h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm" bind:value={q} placeholder="Search subjects…" aria-label="Search subjects" />
				<ul class="mt-2 grid gap-1">
					{#each subjectsFor(classId).filter((s) => s.toLowerCase().includes(q.toLowerCase())) as s}
						<li>
							<button
								onclick={() => (subject = s)}
								aria-current={subject === s ? 'true' : undefined}
								class="w-full rounded-md px-3 py-2 text-left text-sm {subject === s ? 'bg-[var(--brand)] text-white' : 'hover:bg-[var(--surface-muted)]'}"
							>{s}</button>
						</li>
					{/each}
				</ul>
			</aside>

			<section class="overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)]">
				<div class="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
					<h2 class="font-semibold">{subject} <span class="text-sm font-normal text-[var(--text-muted)]">· {term} Term · Weeks 1–{weeks.length}</span>{#if edited} <span class="ml-1 rounded-md border border-[var(--brand)]/40 px-1.5 py-0.5 text-[10px] font-bold text-[var(--brand)]">EDITED</span>{/if}</h2>
					<span class="tnum text-xs text-[var(--text-muted)]">{weeks.length} weeks</span>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full min-w-[720px] text-left text-sm">
						<thead class="bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
							<tr><th class="w-16 px-4 py-2">Week</th><th class="w-64 px-4 py-2">Topic</th><th class="px-4 py-2">Content</th></tr>
						</thead>
						<tbody>
							{#each weeks as w}
								<tr class="border-t border-[var(--border)] align-top hover:bg-[var(--surface-muted)]">
									<td class="tnum px-4 py-3 font-bold">W{w.week}</td>
									<td class="px-4 py-3 font-medium">{w.topic}</td>
									<td class="px-4 py-3 text-[var(--text-muted)]">{w.content}<span class="mt-1 block text-xs">Outcome: {w.outcome}</span></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		</div>
		<div class="mt-3"><Comments thread={`${classId}-${subject}-${term}`} /></div>
	</div>
{/if}
