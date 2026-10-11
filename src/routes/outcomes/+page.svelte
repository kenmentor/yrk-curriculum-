<script lang="ts">
	import { page } from '$app/stores';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { competenciesFor } from '$lib/data/growth';
	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let list = $derived(competenciesFor(classId));
	function pick(id: string) {
		classId = id;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Supporting tools · What mastery looks like</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">Outcomes</h1>
		<select class="ml-auto h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}<optgroup label={band}>{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}</optgroup>{/each}
		</select>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Same competencies, auditor's lens — each row names its evidence week. <a class="text-[var(--brand)] hover:underline" href="/competencies">Competencies →</a></p>
	<div class="mt-4 grid gap-2">
		{#each list as c, i}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm">
				<p class="font-semibold">{c.title} <span class="text-xs font-normal text-[var(--text-muted)]">· {c.level}</span></p>
				<p class="mt-1 text-[var(--text-muted)]">Evidence: {c.subjects[0]} · Week {(i * 3 + 2) % 12 + 1} exercise + {c.level === 'Mastered' ? 'term assessment' : 'class task'}.</p>
			</article>
		{/each}
	</div>
</div>
