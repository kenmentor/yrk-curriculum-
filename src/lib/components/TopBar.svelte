<script lang="ts">
	import { goto } from '$app/navigation';
	import { Bell, Search, Sparkles, CircleHelp } from '@lucide/svelte';
	let { onAiToggle }: { onAiToggle?: () => void } = $props();
	let q = $state('');
	function search(e: SubmitEvent) {
		e.preventDefault();
		if (q.trim()) goto(`/curriculum/bank?q=${encodeURIComponent(q.trim())}`);
	}
</script>

<header class="sticky top-0 z-30 flex h-[var(--topbar-h)] items-center gap-3 px-4 text-[var(--sidebar-text)]" style="background: var(--sidebar-bg);">
	<nav class="hidden text-sm opacity-80 md:block" aria-label="Breadcrumb">1School Lagos / Staff</nav>
	<form class="mx-auto hidden w-[360px] items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-sm md:flex" onsubmit={search} role="search">
		<Search size={14} />
		<input bind:value={q} placeholder="Search bank… (Enter)" aria-label="Search bank" class="w-full bg-transparent placeholder:text-white/50 focus:outline-none" />
	</form>
	<div class="ml-auto flex items-center gap-2">
		<a href="/inbox" class="relative rounded-md p-2 hover:bg-white/10" aria-label="Notifications — open inbox"><Bell size={16} /><span class="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400"></span></a>
		<a href="/policies" class="rounded-md p-2 hover:bg-white/10" aria-label="Help — open policies"><CircleHelp size={16} /></a>
		<button class="rounded-md p-2 hover:bg-white/10" onclick={onAiToggle} aria-label="Toggle AI assistant"><Sparkles size={16} /></button>
		<a href="/curriculum/teams" class="grid h-6 w-6 place-items-center rounded-full bg-violet-500 text-[10px] font-bold ring-2 ring-white/60" aria-label="Account — open teams">MP</a>
	</div>
</header>
