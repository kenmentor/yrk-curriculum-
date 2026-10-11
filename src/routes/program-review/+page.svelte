<script lang="ts">
	import { REVIEWS } from '$lib/data/support';
	let checks = $state<Record<string, boolean>>({});
	function pct(items: Array<{ label: string; done: boolean }>, id: string) {
		const v = items.map((c, i) => checks[`${id}-${i}`] ?? c.done);
		return Math.round((v.filter(Boolean).length / v.length) * 100);
	}
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Supporting tools · Quality gate</p>
	<h1 class="mt-1 text-xl font-semibold">Program Review</h1>
	<div class="mt-4 grid gap-3">
		{#each REVIEWS as r}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
				<div class="flex items-center justify-between"><h2 class="font-semibold">{r.title}</h2><span class="tnum text-xs text-[var(--text-muted)]">{pct(r.checklist, r.id)}%</span></div>
				<div class="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]"><div class="h-full bg-emerald-400" style={`width:${pct(r.checklist, r.id)}%`}></div></div>
				<ul class="mt-3 grid gap-2">
					{#each r.checklist as c, i}
						<li><label class="flex cursor-pointer items-center gap-2 text-sm">
							<input type="checkbox" class="h-4 w-4 accent-[#7853da]" checked={checks[`${r.id}-${i}`] ?? c.done} onchange={(e) => (checks[`${r.id}-${i}`] = (e.target as HTMLInputElement).checked)} />
							{c.label}
						</label></li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</div>
