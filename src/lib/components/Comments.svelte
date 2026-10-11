<script lang="ts">
	import { browser } from '$app/environment';

	let { thread }: { thread: string } = $props();
	interface Comment { id: string; author: string; text: string; at: string; resolved: boolean; }
	let items = $state<Comment[]>([]);
	let draft = $state('');

	function key(t: string): string {
		return `curriculumiq-comments-${t}`;
	}
	function load(t: string): void {
		if (!browser) return;
		try {
			const raw = localStorage.getItem(key(t));
			items = raw ? (JSON.parse(raw) as Comment[]) : [];
		} catch { items = []; }
	}
	$effect(() => { load(thread); });

	function persist() {
		if (browser) localStorage.setItem(key(thread), JSON.stringify(items));
	}
	function add(e: SubmitEvent) {
		e.preventDefault();
		if (!draft.trim()) return;
		items = [...items, { id: `c${Date.now()}`, author: 'You', text: draft.trim(), at: new Date().toLocaleString(), resolved: false }];
		draft = '';
		persist();
	}
</script>

<div class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4">
	<h3 class="text-sm font-semibold">Discussion <span class="tnum text-[var(--text-muted)]">({items.filter((c) => !c.resolved).length} open)</span></h3>
	<ul class="mt-2 grid gap-2">
		{#each items as c}
			<li class="rounded-md border border-[var(--border)] px-3 py-2 text-sm {c.resolved ? 'opacity-50' : ''}">
				<p><b>{c.author}</b> <span class="text-[11px] text-[var(--text-muted)]">{c.at}</span></p>
				<p class="mt-0.5">{c.text}</p>
				<button class="mt-1 text-xs text-[var(--brand)] hover:underline" onclick={() => { c.resolved = !c.resolved; persist(); }}>{c.resolved ? 'Reopen' : 'Resolve'}</button>
			</li>
		{/each}
		{#if !items.length}<li class="text-sm text-[var(--text-muted)]">No comments yet. Ask about a week — builders get notified.</li>{/if}
	</ul>
	<form class="mt-3 flex gap-2" onsubmit={add}>
		<input class="h-9 flex-1 rounded-md border border-[var(--border)] bg-transparent px-3 text-sm" bind:value={draft} placeholder="Comment on Week… (e.g. W7 needs simpler words)" aria-label="Add comment" />
		<button class="rounded-md bg-[var(--brand)] px-3 text-sm text-white" type="submit">Post</button>
	</form>
</div>
