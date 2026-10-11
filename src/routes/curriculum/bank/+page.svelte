<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { FolderOpen, MoreVertical, Pencil, Eye, EyeOff, Trash2, Globe } from '@lucide/svelte';
	import { listCustom, listSeedStatus, removeCustom, updateCustom, seedVisibility, setSeedVisibility, type BankEntry, type Visibility } from '$lib/curriculum/bank';
	import { subjectsFor } from '$lib/data/classes';

	let q = $state($page.url.searchParams.get('q') ?? '');
	let customs = $state<BankEntry[]>([]);
	let seeds = $state(listSeedStatus());
	let vis = $state<Record<string, Visibility>>({});
	let openMenu = $state<string | null>(null);

	function refresh() {
		customs = listCustom();
		seeds = listSeedStatus().map((s) => ({ ...s, subjects: subjectsFor(s.id).length }));
		vis = seedVisibility();
	}
	if (browser) refresh();
	$effect(() => { if (browser) refresh(); });

	let fCustoms = $derived(customs.filter((c) => (c.title + c.band + c.framework).toLowerCase().includes(q.toLowerCase())));
	let fSeeds = $derived(seeds.filter((s) => (s.label + s.band).toLowerCase().includes(q.toLowerCase())));
	let editedSeeds = $derived(fSeeds.filter((s) => s.edited));

	function del(id: string) {
		openMenu = null;
		removeCustom(id);
		refresh();
	}
	function flipCustom(c: BankEntry) {
		openMenu = null;
		updateCustom(c.id, { visibility: c.visibility === 'public' ? 'private' : 'public' });
		refresh();
	}
	function flipSeed(id: string) {
		openMenu = null;
		setSeedVisibility(id, (vis[id] ?? 'public') === 'public' ? 'private' : 'public');
		refresh();
	}
	function closeOnOutside(e: MouseEvent) {
		if (!(e.target as HTMLElement).closest('[data-menu]')) openMenu = null;
	}
</script>

<svelte:window onclick={closeOnOutside} />

<div class="mx-auto max-w-[1440px]">
	<p class="text-xs text-[var(--text-muted)]"><a href="/curriculum" class="hover:underline">Curriculum</a> / Bank</p>
	<div class="mt-1 flex flex-wrap items-center gap-3">
		<h1 class="text-xl font-semibold">My Bank</h1>
		<span class="tnum text-sm text-[var(--text-muted)]">{customs.length} created · {editedSeeds.length} edited</span>
		<input class="ml-auto h-9 w-64 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm" bind:value={q} placeholder="Search bank…" aria-label="Search bank" />
		<a href="/curriculum/new" class="rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white">+ New</a>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Everything you've worked on. Public items appear on the school site — decide here.</p>

	<h2 class="mb-2 mt-6 text-sm font-semibold text-[var(--text-muted)]">Created by you ({fCustoms.length})</h2>
	{#if !fCustoms.length}
		<div class="rounded-[10px] border border-dashed border-[var(--border)] p-6 text-center text-sm text-[var(--text-muted)]">
			Nothing here yet. <a href="/curriculum/new" class="text-[var(--brand)] hover:underline">Create your first curriculum →</a>
		</div>
	{:else}
		<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{#each fCustoms as c}
				<article class="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--brand)]">
					<div class="flex items-start justify-between gap-2">
						<span class="grid h-11 w-11 place-items-center rounded-lg bg-[var(--brand)]/12 text-[var(--brand)]"><FolderOpen size={22} /></span>
						<div class="flex items-center gap-1.5" data-menu>
							{#if c.visibility === 'public'}
								<span class="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300"><Globe size={10} />Public</span>
							{:else}
								<span class="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">Private</span>
							{/if}
							<button
								class="rounded-md p-1.5 opacity-100 hover:bg-[var(--surface-muted)] group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
								onclick={() => (openMenu = openMenu === c.id ? null : c.id)}
								aria-label={`Options for ${c.title}`} aria-haspopup="menu" aria-expanded={openMenu === c.id}
							><MoreVertical size={16} /></button>
						</div>
					</div>
					{#if openMenu === c.id}
						<div role="menu" class="absolute right-3 top-12 z-20 w-48 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-xl" data-menu>
							<a role="menuitem" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--surface-muted)]" href={`/curriculum/builder?entry=${c.id}`}><Pencil size={14} />Edit in Builder</a>
							<button role="menuitem" class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--surface-muted)]" onclick={() => flipCustom(c)}>
								{#if c.visibility === 'public'}<EyeOff size={14} />Make private{:else}<Eye size={14} />Make public{/if}
							</button>
							<button role="menuitem" class="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-300 hover:bg-[var(--surface-muted)]" onclick={() => del(c.id)}><Trash2 size={14} />Delete</button>
						</div>
					{/if}
					<h3 class="mt-2 font-semibold">{c.title}</h3>
					<p class="tnum mt-0.5 text-xs text-[var(--text-muted)]">{c.band} · {c.framework} {c.version}</p>
					<a href={`/curriculum/builder?entry=${c.id}`} class="mt-3 inline-block text-sm font-medium text-[var(--brand)] hover:underline">Edit →</a>
				</article>
			{/each}
		</div>
	{/if}

	<h2 class="mb-2 mt-8 text-sm font-semibold text-[var(--text-muted)]">Touched classes ({editedSeeds.length})</h2>
	{#if !editedSeeds.length}
		<p class="text-sm text-[var(--text-muted)]">No edits yet — open any class scheme, hit <b>Edit in Builder</b>, save, and it lands here.</p>
	{:else}
		<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{#each editedSeeds as s}
				<article class="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-[var(--brand)]">
					<div class="flex items-start justify-between gap-2">
						<span class="grid h-11 w-11 place-items-center rounded-lg bg-amber-400/10 text-amber-300"><FolderOpen size={22} /></span>
						<div class="flex items-center gap-1.5" data-menu>
							{#if (vis[s.id] ?? 'public') === 'public'}
								<span class="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold text-emerald-300"><Globe size={10} />Public</span>
							{:else}
								<span class="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">Private</span>
							{/if}
							<button
								class="rounded-md p-1.5 opacity-100 hover:bg-[var(--surface-muted)] sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
								onclick={() => (openMenu = openMenu === `seed-${s.id}` ? null : `seed-${s.id}`)}
								aria-label={`Options for ${s.label}`} aria-haspopup="menu" aria-expanded={openMenu === `seed-${s.id}`}
							><MoreVertical size={16} /></button>
						</div>
					</div>
					{#if openMenu === `seed-${s.id}`}
						<div role="menu" class="absolute right-3 top-12 z-20 w-48 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-xl" data-menu>
							<a role="menuitem" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--surface-muted)]" href={`/curriculum/${s.id}`}><Eye size={14} />Open scheme</a>
							<a role="menuitem" class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--surface-muted)]" href={`/curriculum/builder?class=${s.id}`}><Pencil size={14} />Edit in Builder</a>
							<button role="menuitem" class="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--surface-muted)]" onclick={() => flipSeed(s.id)}>
								{#if (vis[s.id] ?? 'public') === 'public'}<EyeOff size={14} />Make private{:else}<Eye size={14} />Make public{/if}
							</button>
						</div>
					{/if}
					<h3 class="mt-2 font-semibold">{s.label} <span class="ml-1 rounded border border-amber-400/40 px-1 text-[10px] font-bold text-amber-300">EDITED</span></h3>
					<p class="tnum mt-0.5 text-xs text-[var(--text-muted)]">{s.band}</p>
					<a href={`/curriculum/builder?class=${s.id}`} class="mt-3 inline-block text-sm font-medium text-[var(--brand)] hover:underline">Edit →</a>
				</article>
			{/each}
		</div>
	{/if}

	<h2 class="mb-2 mt-8 text-sm font-semibold text-[var(--text-muted)]">All classes</h2>
	<div class="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
		{#each fSeeds as s}
			<a href={`/curriculum/${s.id}`} class="flex items-center gap-2 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm hover:border-[var(--brand)]">
				<FolderOpen size={15} class="shrink-0 text-[var(--text-muted)]" />
				<span class="font-medium">{s.label}</span>
				{#if s.edited}<span class="text-[10px] font-bold text-amber-300">●</span>{/if}
				{#if (vis[s.id] ?? 'public') !== 'public'}<span class="ml-auto text-[10px] text-[var(--text-muted)]">Private</span>{/if}
			</a>
		{/each}
	</div>
</div>
