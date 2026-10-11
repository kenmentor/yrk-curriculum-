<script lang="ts">
	import StatusPill from './ui/StatusPill.svelte';
	export type Split = { key: 'complete' | 'in-progress' | 'draft' | 'error'; count: number; pct: number };
	let { title, total, splits, href }: { title: string; total: number; splits: Split[]; href: string } = $props();
	let hidden = $state<Set<string>>(new Set());
	let visible = $derived(splits.filter((s) => !hidden.has(s.key)));

	const R = 80; const C = 2 * Math.PI * R;
	function offsets() {
		let acc = 0;
		return visible.map((s) => {
			const frac = s.pct / 100;
			const dash = `${frac * C} ${C - frac * C}`;
			const rot = acc * 360 - 90;
			acc += frac;
			return { ...s, dash, rot };
		});
	}
	function toggle(k: string) {
		hidden = new Set(hidden.has(k) ? [...hidden].filter((x) => x !== k) : [...hidden, k]);
	}
	const COLORS: Record<string, string> = { complete: '#8FD18A', 'in-progress': '#F5E27A', draft: '#F2A93B', error: '#E4574E' };
</script>

<div class="rounded-[10px] border bg-[var(--surface)] p-4">
	<a href={href} class="text-sm font-semibold text-[var(--brand)] hover:underline">{title}</a>
	<div class="mt-2 flex items-center justify-center">
		<svg width="200" height="200" viewBox="0 0 200 200" role="img" aria-label={`${title}: ${total} submissions`}>
			<circle cx="100" cy="100" r={R} fill="none" stroke="var(--chart-track)" stroke-width="24" />
			{#each offsets() as s}
				<a href={`${href}?status=${s.key}`} aria-label={`${s.key}: ${s.count} of ${total}`}>
					<circle
						cx="100" cy="100" r={R} fill="none"
						stroke={COLORS[s.key]} stroke-width="24"
						stroke-dasharray={s.dash} transform={`rotate(${s.rot} 100 100)`}
						stroke-linecap="round" opacity="0.95"
					>
						<title>{s.key}: {s.count} of {total}, {s.pct}%</title>
					</circle>
				</a>
			{/each}
			<text x="100" y="96" text-anchor="middle" font-size="30" font-weight="500" fill="var(--text)" class="tnum">{total}</text>
			<text x="100" y="114" text-anchor="middle" font-size="11" fill="var(--text-muted)">Submissions</text>
		</svg>
	</div>
	<div class="mt-2 flex flex-wrap justify-center gap-1.5">
		{#each splits as s}
			<button onclick={() => toggle(s.key)} aria-pressed={!hidden.has(s.key)} title="Toggle segment">
				<StatusPill status={s.key} size="sm" />
			</button>
		{/each}
	</div>
	<details class="mt-2 text-xs text-[var(--text-muted)]"><summary class="cursor-pointer">View as table</summary>
		<table class="mt-1 w-full text-left"><tbody>
			{#each splits as s}<tr class="border-t"><td class="py-1">{s.key}</td><td class="tnum">{s.count}</td><td class="tnum">{s.pct}%</td></tr>{/each}
		</tbody></table>
	</details>
</div>
