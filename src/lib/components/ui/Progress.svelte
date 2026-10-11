<script lang="ts">
	import { cn } from '$lib/utils';
	let { class: klass = '', value = 0, max = 100 }: { class?: string; value?: number; max?: number } = $props();
	let pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div class={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', klass)} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
	<div class="h-full bg-primary transition-all" style={`width: ${pct}%`}></div>
</div>
