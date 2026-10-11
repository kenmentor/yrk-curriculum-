<script lang="ts">
	import { POLICIES } from '$lib/data/support';
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Supporting tools · Staff view</p>
	<h1 class="mt-1 text-xl font-semibold">Policies <span class="tnum text-sm font-normal text-[var(--text-muted)]">({POLICIES.length})</span></h1>
	<p class="mt-1 text-sm text-[var(--text-muted)]">What the public sees lives at <a class="text-[var(--brand)] hover:underline" href="/s/policies">/s/policies</a>. Content is versioned with releases.</p>
	<div class="mt-4 grid gap-3">
		{#each POLICIES as p, i}
			<article class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
				<div class="flex items-baseline gap-3">
					<span class="tnum text-xs font-bold text-[var(--brand)]">0{i + 1}</span>
					<h2 class="font-semibold">{p.title}</h2>
					<span class="tnum ml-auto text-xs text-[var(--text-muted)]">{p.effective}</span>
				</div>
				<p class="mt-2 rounded-md bg-[var(--surface-muted)] px-3 py-2 text-sm font-medium">{p.tldr}</p>
				<p class="mt-2 text-sm text-[var(--text-muted)]">{p.body}</p>
				<p class="mt-2 text-xs text-[var(--text-muted)]">Scope: {p.scope}</p>
			</article>
		{/each}
	</div>
</div>
