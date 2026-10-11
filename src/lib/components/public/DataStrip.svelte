<script lang="ts">
	let { items, label = 'At a glance' }: { items: Array<[string, string]>; label?: string } = $props();
</script>

<dl class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4" aria-label={label}>
	{#each items as [value, caption]}
		<div class="bg-[var(--surface)] px-5 py-4 text-center">
			<dt class="sr-only">{caption}</dt>
			<dd>
				<span class="tnum block text-2xl font-semibold">{value}</span>
				<span class="tnum mt-0.5 block text-xs text-[var(--text-muted)]">{caption}</span>
			</dd>
		</div>
	{/each}
</dl>
