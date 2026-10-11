<script lang="ts">
	import { page } from '$app/stores';
	import { loadPreview, DEFAULT_PREVIEW, type PreviewSettings } from '$lib/preview';

	let { children } = $props();
	let s = $state<PreviewSettings>(DEFAULT_PREVIEW);
	if (typeof window !== 'undefined') s = loadPreview();

	const nav = [
		{ label: 'Home', href: '/s' },
		{ label: 'Competencies', href: '/s/competencies' },
		{ label: 'Experiences', href: '/s/experiences' },
		{ label: 'Badges', href: '/s/badges' },
		{ label: 'Policies', href: '/s/policies' },
		{ label: 'Team', href: '/s/team' }
	];
</script>

<div class="min-h-screen bg-[var(--bg-app)] text-[var(--text)]">
	<header class="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-app)]/95 backdrop-blur">
		<div class="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4">
			<a href="/s" class="flex items-center gap-2">
				<span class="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-white" style={`background: ${s.accent}`}>1S</span>
				<span class="text-sm font-semibold">{s.school}</span>
			</a>
			<nav class="ml-4 hidden items-center gap-1 md:flex" aria-label="School">
				{#each nav as item}
					<a href={item.href} aria-current={$page.url.pathname === item.href ? 'page' : undefined} class="rounded-md px-2.5 py-1.5 text-sm {$page.url.pathname === item.href ? 'bg-[var(--surface-muted)] font-medium' : 'text-[var(--text-muted)] hover:bg-[var(--surface-muted)]'}">{item.label}</a>
				{/each}
			</nav>
			<a href="/curriculum" class="ml-auto hidden rounded-md border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)] sm:block">Staff sign in →</a>
		</div>
		<nav class="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden" aria-label="School mobile">
			{#each nav as item}
				<a href={item.href} class="whitespace-nowrap rounded-md px-2.5 py-1.5 text-sm {$page.url.pathname === item.href ? 'bg-[var(--surface-muted)] font-medium' : 'text-[var(--text-muted)]'}">{item.label}</a>
			{/each}
		</nav>
	</header>
	<main class="mx-auto w-full max-w-5xl px-4 py-8">{@render children()}</main>
	<footer class="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--text-muted)]">
		{s.school} Curriculum · NERDC-aligned · Built with 1School CaaS
	</footer>
</div>
