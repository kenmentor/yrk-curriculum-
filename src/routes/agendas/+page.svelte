<script lang="ts">
	import { AGENDAS } from '$lib/data/support';
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Supporting tools · Meetings that decide</p>
	<h1 class="mt-1 text-xl font-semibold">Agendas</h1>
	<div class="mt-4 grid gap-3">
		{#each AGENDAS as a}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
				<div class="flex items-center justify-between gap-2">
					<h2 class="font-semibold">{a.title}</h2>
					<span class="tnum rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px]">{a.date} · {a.status}</span>
				</div>
				<ul class="mt-2 grid gap-1 text-sm">
					{#each a.items as it}<li>· {it}</li>{/each}
				</ul>
				{#if a.minutes}<p class="mt-2 rounded-md bg-[var(--surface-muted)] px-3 py-2 text-sm">Minutes: {a.minutes}</p>
				{:else}<p class="mt-2 text-sm text-[var(--text-muted)]">Minutes pending — added after the sitting.</p>{/if}
			</article>
		{/each}
	</div>
</div>
