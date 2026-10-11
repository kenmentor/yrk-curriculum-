<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => goto('/s', { replaceState: true }));
</script>
<div class="p-8 text-sm opacity-70">Opening school page…</div>
