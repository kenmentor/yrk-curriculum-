<script lang="ts">
	/** Guaranteed-legibility gradient scrim for hero imagery. No brightness filters or text-shadows needed. */
	let {
		dim = 72,
		accent = '#7853da'
	}: {
		dim?: number;
		accent?: string;
	} = $props();

	const top = $derived(Math.round(dim));
	const mid = $derived(Math.round(dim * 0.62));
	const low = $derived(Math.round(Math.min(94, dim + 16)));
</script>

<div
	class="absolute inset-0"
	aria-hidden="true"
	style={`background: linear-gradient(180deg, rgba(5,5,8,${top}%) 0%, rgba(5,5,8,${mid}%) 38%, rgba(5,5,8,${low}%) 100%);`}
></div>
<div
	class="absolute inset-0"
	aria-hidden="true"
	style={`background: radial-gradient(80% 90% at 50% 110%, ${accent}59, transparent 65%);`}
></div>
