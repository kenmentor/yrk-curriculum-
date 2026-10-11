<script lang="ts">
	import { page } from '$app/stores';
	import { BANDS, CLASSES } from '$lib/data/classes';
	import { competenciesFor } from '$lib/data/growth';
	import PageHeader from '$lib/components/public/PageHeader.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let classId = $state($page.url.searchParams.get('class') ?? 'basic-1');
	let list = $derived(competenciesFor(classId));
	function pick(id: string) {
		classId = id;
		const url = new URL(window.location.href);
		url.searchParams.set('class', id);
		history.replaceState(null, '', url);
	}
	const LEVEL_TONE: Record<string, 'sky' | 'amber' | 'emerald'> = {
		Introduced: 'sky',
		Reinforced: 'amber',
		Mastered: 'emerald'
	};
</script>

<PageHeader eyebrow="Learning" title="Competencies" lede="What each class should be able to do — and how far each skill goes.">
	{#snippet controls()}
		<select class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 text-sm" value={classId} onchange={(e) => pick((e.target as HTMLSelectElement).value)} aria-label="Class">
			{#each BANDS as band}<optgroup label={band}>{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}</optgroup>{/each}
		</select>
	{/snippet}
</PageHeader>
<div class="mt-6 overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)]">
	<table class="w-full min-w-[640px] text-left text-sm">
		<thead class="bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]"><tr><th class="px-4 py-2">Competency</th><th class="px-4 py-2">Subjects</th><th class="px-4 py-2">Level</th></tr></thead>
		<tbody>
			{#each list as c}
				<tr class="border-t border-[var(--border)] align-top">
					<td class="px-4 py-3"><p class="font-medium">{c.title}</p><p class="text-[var(--text-muted)]">{c.desc}</p></td>
					<td class="px-4 py-3 text-[var(--text-muted)]">{c.subjects.join(' · ')}</td>
					<td class="px-4 py-3"><Badge tone={LEVEL_TONE[c.level] ?? 'muted'}>{c.level}</Badge></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<p class="mt-3 text-sm"><a class="link-soft" href={`/s/c/${classId}`}>Open {classId} scheme →</a></p>
