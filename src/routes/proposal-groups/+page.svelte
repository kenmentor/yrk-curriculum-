<script lang="ts">
	import { PROPOSAL_GROUPS } from '$lib/data/support';
	let votes = $state<Record<string, number>>({});
	function vote(id: string, needed: number, base: number) {
		const cur = votes[id] ?? base;
		if (cur < needed) votes[id] = cur + 1;
	}
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Supporting tools · Batched approvals</p>
	<h1 class="mt-1 text-xl font-semibold">Proposal Groups</h1>
	<div class="mt-4 grid gap-3">
		{#each PROPOSAL_GROUPS as g}
			{@const count = votes[g.id] ?? g.approvals}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
				<div class="flex items-center justify-between gap-2">
					<h2 class="font-semibold">{g.title}</h2>
					<span class="tnum text-xs text-[var(--text-muted)]">{count}/{g.needed} approvals</span>
				</div>
				<ul class="mt-2 grid gap-1 text-sm">{#each g.items as it}<li>· {it}</li>{/each}</ul>
				<div class="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]"><div class="h-full bg-[var(--brand)]" style={`width:${Math.round((count / g.needed) * 100)}%`}></div></div>
				{#if count >= g.needed}
					<p class="mt-2 text-sm font-medium text-emerald-300">Approved — ready to publish.</p>
				{:else}
					<button class="mt-3 rounded-md bg-[var(--brand)] px-3 py-1.5 text-sm text-white" onclick={() => vote(g.id, g.needed, g.approvals)}>Approve ({count}/{g.needed})</button>
				{/if}
			</article>
		{/each}
	</div>
</div>
