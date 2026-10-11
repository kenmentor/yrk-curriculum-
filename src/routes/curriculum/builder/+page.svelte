<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Save, RotateCcw, Eye, ArrowLeft, Target, CircleCheck, TriangleAlert } from '@lucide/svelte';
	import { BANDS, CLASSES, subjectsFor, type Term, type WeekRow } from '$lib/data/classes';
	import { loadWeeks, saveWeeks, resetWeeks, loadEntryWeeks, saveEntryWeeks, resetEntryWeeks, keyFor, entryKeyFor } from '$lib/curriculum/weeks-store';
	import { getCustom, updateCustom, seedVisibility, setSeedVisibility } from '$lib/curriculum/bank';
	import { EyeOff } from '@lucide/svelte';

	const sp = $page.url.searchParams;
	const entryParam = sp.get('entry');
	let entry = $state(browser ? (entryParam ? getCustom(entryParam) : undefined) : undefined);
	const isEntry = $derived(!!entry);

	let classId = $state(sp.get('class') ?? 'basic-1');
	let subject = $state(sp.get('subject') ?? '');
	let term = $state<Term>((sp.get('term') as Term) ?? '1st');
	let visibility = $state<'public' | 'private'>('private');
	let visMap = $state<Record<string, 'public' | 'private'>>({});
	let notice = $state('');
	let rows = $state<WeekRow[]>([]);
	let savedSnapshot = $state('[]');
	let lastSavedAt = $state('');

	const info = $derived(CLASSES.find((c) => c.id === classId));
	const subjectList = $derived(isEntry && entry ? entry.subjects : subjectsFor(classId));
	const heading = $derived(isEntry && entry ? entry.title : (info?.label ? `${info.label} Builder` : 'Builder'));
	const sub = $derived(isEntry && entry ? `${entry.band} · ${entry.framework} ${entry.version}` : `${info?.band ?? ''} · ${info?.framework ?? ''}`);

	// Unsaved work stashed per context — switching never destroys typing, never asks.
	const stash = new Map<string, WeekRow[]>();
	function ctx(): string {
		return isEntry && entry ? `e:${entry.id}|${subject}|${term}` : `c:${classId}|${subject}|${term}`;
	}
	function storeLoad(): WeekRow[] {
		return (isEntry && entry ? loadEntryWeeks(entry.id, subject, term) : loadWeeks(classId, subject, term)).map((w) => ({ ...w }));
	}
	function openContext() {
		const list = isEntry && entry ? entry.subjects : subjectsFor(classId);
		if (!subject || !list.includes(subject)) subject = list[0] ?? '';
		if (isEntry && entry) visibility = entry.visibility;
		else visMap = seedVisibility();
		if (!subject) {
			rows = [];
			savedSnapshot = '[]';
			return;
		}
		const key = ctx();
		if (stash.has(key)) {
			rows = stash.get(key)!.map((w) => ({ ...w }));
		} else {
			rows = storeLoad();
		}
		savedSnapshot = JSON.stringify(storeLoad());
		syncUrl();
	}
	function stashCurrent() {
		if (subject) stash.set(ctx(), rows.map((w) => ({ ...w })));
	}

	onMount(() => {
		openContext();
	});

	let dirtyCount = $derived.by(() => {
		try {
			if (JSON.stringify(rows) === savedSnapshot) return 0;
			const saved: WeekRow[] = JSON.parse(savedSnapshot || '[]');
			let n = 0;
			for (let i = 0; i < rows.length; i++) {
				if (JSON.stringify(rows[i]) !== JSON.stringify(saved[i])) n++;
			}
			return n;
		} catch { return 0; }
	});

	let issues = $derived.by(() => {
		const out: string[] = [];
		rows.forEach((w) => {
			if (!w.topic.trim()) out.push(`W${w.week}: topic missing.`);
			else if (!w.content.trim()) out.push(`W${w.week}: content missing.`);
		});
		return out.slice(0, 5);
	});

	function switchSubject(s: string) {
		stashCurrent();
		subject = s;
		notice = '';
		openContext();
	}
	function switchTerm(t: Term) {
		stashCurrent();
		term = t;
		notice = '';
		openContext();
	}
	function switchClass(id: string) {
		stashCurrent();
		classId = id;
		notice = '';
		openContext();
	}

	function flipVisibility() {
		if (isEntry && entry) {
			const v = visibility === 'public' ? 'private' : 'public';
			entry = updateCustom(entry.id, { visibility: v }) ?? entry;
			visibility = v;
			notice = v === 'public' ? 'Public — visible on the school site.' : 'Private — hidden from the school site.';
		} else {
			const v = (visMap[classId] ?? 'public') === 'public' ? 'private' : 'public';
			setSeedVisibility(classId, v);
			visMap = seedVisibility();
			notice = v === 'public' ? 'Public — visible on the school site.' : 'Private — hidden from the school site.';
		}
	}
	function save() {
		notice = '';
		if (!subject) { notice = 'Pick a subject.'; return; }
		if (issues.length) { notice = issues[0]; return; }
		if (isEntry && entry) {
			saveEntryWeeks(entry.id, subject, term, rows);
			entry = updateCustom(entry.id, {}) ?? entry;
		} else {
			saveWeeks(classId, subject, term, rows);
		}
		savedSnapshot = JSON.stringify(rows);
		stash.delete(ctx());
		lastSavedAt = new Date().toLocaleTimeString();
		notice = `Saved ${rows.length} weeks — ${subject} · ${term} Term.`;
	}
	function reset() {
		if (isEntry && entry) resetEntryWeeks(entry.id, subject, term);
		else resetWeeks(classId, subject, term);
		stash.delete(ctx());
		rows = storeLoad();
		savedSnapshot = JSON.stringify(rows);
		notice = 'Reset to seed scheme.';
	}
	function addSubject() {
		if (!isEntry || !entry) return;
		const input = document.getElementById('new-subject') as HTMLInputElement | null;
		const name = (input?.value ?? '').trim();
		if (!name) return;
		if (entry.subjects.includes(name)) { notice = 'That subject already exists.'; return; }
		stashCurrent();
		entry = updateCustom(entry.id, { subjects: [...entry.subjects, name] }) ?? entry;
		if (input) input.value = '';
		subject = name;
		notice = '';
		openContext();
	}
	function removeSubject() {
		if (!isEntry || !entry) return;
		if (entry.subjects.length <= 1) { notice = 'Keep at least one subject.'; return; }
		stashCurrent();
		entry = updateCustom(entry.id, { subjects: entry.subjects.filter((s) => s !== subject) }) ?? entry;
		subject = '';
		notice = '';
		openContext();
	}
	function syncUrl() {
		if (!browser) return;
		const url = new URL(window.location.href);
		if (isEntry && entry) {
			url.searchParams.set('entry', entry.id);
			url.searchParams.delete('class');
		} else {
			url.searchParams.set('class', classId);
			url.searchParams.delete('entry');
		}
		url.searchParams.set('subject', subject);
		url.searchParams.set('term', term);
		history.replaceState(null, '', url);
	}
	function editedRow(i: number): boolean {
		try {
			const saved: WeekRow[] = JSON.parse(savedSnapshot || '[]');
			return JSON.stringify(rows[i]) !== JSON.stringify(saved[i]);
		} catch { return false; }
	}
	const storeKey = $derived(
		subject
			? isEntry && entry
				? entryKeyFor(entry.id, subject, term)
				: keyFor(classId, subject, term)
			: ''
	);
</script>

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]"><a href="/curriculum/bank" class="hover:underline">Bank</a> / Builder{isEntry ? ' · custom' : ''}</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">{heading}</h1>
		<span class="text-sm text-[var(--text-muted)]">{sub}</span>
		<div class="ml-auto flex items-center gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm" role="tablist" aria-label="Term">
			{#each ['1st', '2nd', '3rd'] as t}
				<button type="button" role="tab" aria-selected={term === t} onclick={() => switchTerm(t as Term)} class="rounded-md px-3 py-1 {term === t ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}">{t} Term</button>
			{/each}
		</div>
	</div>
	<div class="mt-2 flex flex-wrap items-center gap-2 text-sm">
		{#if !isEntry}
			<label class="text-[var(--text-muted)]" for="cls">Class</label>
			<select id="cls" class="h-9 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2" value={classId} onchange={(e) => switchClass((e.target as HTMLSelectElement).value)}>
				{#each BANDS as band}<optgroup label={band}>{#each CLASSES.filter((c) => c.band === band) as c}<option value={c.id}>{c.label}</option>{/each}</optgroup>{/each}
			</select>
			<span class="text-[var(--text-muted)]">·</span>
		{/if}
		<a class="inline-flex items-center gap-1.5 text-[var(--brand)] hover:underline" href={isEntry && entry ? `/curriculum/bank` : `/competencies?class=${classId}`}><Target size={14} />Competencies</a>
		<a class="inline-flex items-center gap-1.5 text-[var(--brand)] hover:underline" href={isEntry ? `/curriculum/bank` : `/curriculum/${classId}`}>{#if isEntry}<ArrowLeft size={14} />Back to Bank{:else}<Eye size={14} />View scheme{/if}</a>
		<button type="button" onclick={flipVisibility} title="Who can see this on the school site?" class="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1 text-xs">
			{#if isEntry ? visibility === 'public' : (visMap[classId] ?? 'public') === 'public'}<Eye size={13} />Public{:else}<EyeOff size={13} />Private{/if}
		</button>
		{#if dirtyCount}<span class="tnum rounded-md border border-amber-400/40 px-2 py-0.5 text-[11px] font-bold text-amber-300">{dirtyCount} unsaved</span>
		{:else if lastSavedAt}<span class="text-[11px] text-[var(--text-muted)]">Saved {lastSavedAt}</span>{/if}
	</div>

	{#if isEntry && !entry}
		<div class="mt-4 rounded-[10px] border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--text-muted)]">
			This bank entry no longer exists (it may have been deleted). <a href="/curriculum/bank" class="text-[var(--brand)] hover:underline">Back to Bank →</a>
		</div>
	{:else}
		{#if notice}<p class="mt-3 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">{notice}</p>{/if}

		<div class="mt-3 grid gap-3 lg:grid-cols-[280px_1fr]">
			<aside class="h-fit rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-3">
				<p class="px-1 pb-2 text-xs font-semibold text-[var(--text-muted)]">SUBJECTS</p>
				<ul class="grid gap-1">
					{#each (isEntry && entry ? entry.subjects : subjectsFor(classId)) as s}
						<li>
							<button
								type="button"
								onclick={() => switchSubject(s)}
								aria-current={subject === s ? 'true' : undefined}
								class="w-full rounded-md px-3 py-2 text-left text-sm {subject === s ? 'bg-[var(--brand)] text-white' : 'hover:bg-[var(--surface-muted)]'}"
							>{s}</button>
						</li>
					{/each}
				</ul>
				{#if isEntry}
					<form class="mt-3 flex gap-1.5" onsubmit={(e) => { e.preventDefault(); addSubject(); }}>
						<input id="new-subject" class="h-9 min-w-0 flex-1 rounded-md border border-[var(--border)] bg-transparent px-2 text-sm" placeholder="New subject…" aria-label="New subject" />
						<button class="rounded-md border border-[var(--border)] px-2.5 text-sm" type="submit">Add</button>
					</form>
					{#if subject}<button type="button" class="mt-2 text-xs text-red-300 hover:underline" onclick={removeSubject}>Remove {subject}</button>{/if}
				{/if}
			</aside>

			<section class="overflow-hidden rounded-[10px] border border-[var(--border)] bg-[var(--surface)]">
				<div class="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
					<h2 class="font-semibold">{subject || 'Pick a subject'} <span class="text-sm font-normal text-[var(--text-muted)]">· {term} Term · Weeks 1–{rows.length}</span></h2>
					<div class="flex gap-2">
						<button type="button" class="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm" onclick={reset} title="Discard edits, restore seed"><RotateCcw size={14} />Reset</button>
						<button type="button" class="inline-flex items-center gap-1.5 rounded-md bg-[var(--brand)] px-4 py-1.5 text-sm text-white disabled:opacity-40" disabled={dirtyCount === 0} onclick={save} title="Save weeks to this browser"><Save size={14} />Save ({dirtyCount})</button>
					</div>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full min-w-[760px] text-left text-sm">
						<thead class="bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
							<tr><th class="w-14 px-3 py-2">Week</th><th class="w-56 px-3 py-2">Topic</th><th class="px-3 py-2">Content + Outcome</th></tr>
						</thead>
						<tbody>
							{#each rows as w, i (w.week)}
								<tr class="border-t border-[var(--border)] align-top {editedRow(i) ? 'bg-amber-400/[0.06]' : ''}">
									<td class="tnum px-3 py-2 font-bold">W{w.week}{#if editedRow(i)}<span class="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-400" title="Unsaved"></span>{/if}</td>
									<td class="px-3 py-2"><input class="h-9 w-full rounded-md border border-[var(--border)] bg-transparent px-2" bind:value={rows[i].topic} aria-label={`Week ${w.week} topic`} /></td>
									<td class="px-3 py-2">
										<textarea rows="2" class="w-full rounded-md border border-[var(--border)] bg-transparent px-2 py-1.5" bind:value={rows[i].content} aria-label={`Week ${w.week} content`}></textarea>
										<input class="mt-1 h-8 w-full rounded-md border border-[var(--border)] bg-transparent px-2 text-[13px] text-[var(--text-muted)]" bind:value={rows[i].outcome} aria-label={`Week ${w.week} outcome`} />
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div class="flex flex-wrap items-center gap-3 border-t border-[var(--border)] px-4 py-3">
					{#if issues.length}
						<ul class="grid gap-0.5 text-[13px] text-amber-300">{#each issues as is}<li class="flex items-center gap-1.5"><TriangleAlert size={13} />{is}</li>{/each}</ul>
					{:else}
						<p class="flex items-center gap-1.5 text-[13px] text-emerald-300"><CircleCheck size={14} />Ready — every week has a topic and content.</p>
					{/if}
					<span class="ml-auto text-xs text-[var(--text-muted)]">Saves to this browser</span>
				</div>
			</section>
		</div>
	{/if}
</div>
