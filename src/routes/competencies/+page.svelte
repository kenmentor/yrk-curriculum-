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
	const LEVEL_STYLE: Record<string, string> = {
		Introduced: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
		Reinforced: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
		Mastered: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30'
	};
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]">School: 1School Lagos · Competencies per class</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">What each class should be able to do</h1>
		<select class="ml-auto h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}
				<optgroup label={band}>
					{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}
				</optgroup>
			{/each}
		</select>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Same fashion as the week table — one class at a time, no clutter. <a href={`/curriculum/${classId}`} class="text-[var(--brand)] hover:underline">Open {classId} scheme →</a></p>

	<div class="mt-4 overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)]">
		<table class="w-full min-w-[680px] text-left text-sm">
			<thead class="bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
				<tr><th class="px-4 py-2">Competency</th><th class="px-4 py-2">Subjects</th><th class="px-4 py-2">Level</th></tr>
			</thead>
			<tbody>
				{#each list as c}
					<tr class="border-t border-[var(--border)] align-top">
						<td class="px-4 py-3"><p class="font-medium">{c.title}</p><p class="text-[var(--text-muted)]">{c.desc}</p></td>
						<td class="px-4 py-3 text-[var(--text-muted)]">{c.subjects.join(' · ')}</td>
						<td class="px-4 py-3"><span class="rounded-md border px-2 py-0.5 text-[11px] font-bold {LEVEL_STYLE[c.level]}">{c.level}</span></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
