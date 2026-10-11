<script lang="ts">
	import './layout.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	import AssistantPanel from '$lib/components/AssistantPanel.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
	let collapsed = $state(false);
	let aiOpen = $state(false);
	// Public school site (/s): fully isolated — its own layout, never admin chrome.
	let preview = $derived($page.url.pathname === '/s' || $page.url.pathname.startsWith('/s/'));
</script>

{#if preview}
	<div class="min-h-screen bg-[var(--bg-app)] text-[var(--text)]">{@render children()}</div>
{:else}
	<div class="grid min-h-screen" style="grid-template-columns: auto 1fr; grid-template-rows: var(--topbar-h) 1fr;">
		<div class="row-span-2"><Sidebar {collapsed} onToggle={() => (collapsed = !collapsed)} /></div>
		<TopBar onAiToggle={() => (aiOpen = !aiOpen)} />
		<main class="min-w-0 overflow-auto bg-[var(--bg-app)] p-6 text-[var(--text)]">{@render children()}</main>
	</div>
	<AssistantPanel open={aiOpen} onClose={() => (aiOpen = false)} />
{/if}
