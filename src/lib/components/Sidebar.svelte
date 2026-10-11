<script lang="ts">
	import { page } from '$app/stores';
	import {
		LayoutDashboard, BookOpen, Briefcase, Target, Award,
		ScrollText, CalendarDays, FolderKanban, ClipboardCheck, Flag, ChevronsLeft, Eye,
		Archive, Bell, Users, Settings
	} from '@lucide/svelte';

	let { collapsed = false, onToggle }: { collapsed?: boolean; onToggle?: () => void } = $props();
	// Classes ARE courses/programs. No separate Courses/Programs/Specializations.
	const primary = [
		{ label: 'Preview', href: '/s', icon: Eye, badge: '' },
		{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: '' },
		{ label: 'Curriculum', href: '/curriculum', icon: BookOpen, badge: '' },
		{ label: 'Competencies', href: '/competencies', icon: Target, badge: '' },
		{ label: 'Experiences', href: '/experiences', icon: Briefcase, badge: '' },
		{ label: 'Badges', href: '/badges', icon: Award, badge: '' }
	];
	const secondary = [
		{ label: 'My Bank', href: '/curriculum/bank', icon: Archive },
		{ label: 'Inbox', href: '/inbox', icon: Bell },
		{ label: 'Teams', href: '/curriculum/teams', icon: Users },
		{ label: 'Site settings', href: '/admin/site', icon: Settings },
		{ label: 'Policies', href: '/policies', icon: ScrollText },
		{ label: 'Agendas', href: '/agendas', icon: CalendarDays },
		{ label: 'Proposal Groups', href: '/proposal-groups', icon: FolderKanban },
		{ label: 'Program Review', href: '/program-review', icon: ClipboardCheck },
		{ label: 'Outcomes', href: '/outcomes', icon: Flag }
	];
</script>

<aside
	class="flex h-full flex-col overflow-y-auto text-[var(--sidebar-text)]"
	style="background: var(--sidebar-bg); width: {collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)'}"
	aria-label="Primary"
>
	<div class="flex h-11 items-center gap-2 px-3">
		<span class="grid h-7 w-7 place-items-center rounded-md bg-[var(--brand)] text-sm font-bold text-white">1S</span>
		{#if !collapsed}<span class="text-sm font-medium">1School</span>{/if}
	</div>
	{#if !collapsed}<p class="px-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.08em] opacity-50">Learn</p>{/if}
	<nav class="grid gap-0.5 px-2 py-2">
		{#each primary as item}
			{@const Icon = item.icon}
			{@const active = $page.url.pathname === item.href || ($page.url.pathname.startsWith('/curriculum/') && item.href === '/curriculum')}
			<a
				href={item.href}
				title={item.label}
				aria-current={active ? 'page' : undefined}
				class="flex h-9 items-center gap-2 rounded-md px-3 text-sm {active ? 'bg-[var(--sidebar-active-bg)] font-medium' : 'opacity-90 hover:bg-[var(--sidebar-active-bg)]'}"
			>
				<span class="relative"><Icon size={16} />{#if active}<span class="absolute -left-3 top-0 h-full w-0.5 rounded bg-[var(--brand)]"></span>{/if}</span>
				{#if !collapsed}<span class="flex-1">{item.label}</span>{#if item.badge}<span class="rounded-full bg-white/20 px-1.5 text-[11px] tnum">{item.badge}</span>{/if}{/if}
			</a>
		{/each}
	</nav>
	{#if !collapsed}<p class="px-4 pt-2 text-[10px] font-semibold uppercase tracking-[0.08em] opacity-50">Supporting tools</p>{/if}
	<nav class="grid gap-0.5 px-2 py-2">
		{#each secondary as item}
			{@const Icon2 = item.icon}
			{@const active2 = $page.url.pathname === item.href}
			<a href={item.href} title={item.label} aria-current={active2 ? 'page' : undefined} class="flex h-9 items-center gap-2 rounded-md px-3 text-sm {active2 ? 'bg-[var(--sidebar-active-bg)] font-medium' : 'opacity-90 hover:bg-[var(--sidebar-active-bg)]'}">
				<Icon2 size={16} />{#if !collapsed}<span>{item.label}</span>{/if}
			</a>
		{/each}
	</nav>
	<div class="mt-auto border-t border-white/10 p-2">
		<button class="flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm hover:bg-[var(--sidebar-active-bg)]" onclick={onToggle} aria-label="Toggle sidebar">
			<ChevronsLeft size={16} />{#if !collapsed}<span>Hide</span>{/if}
		</button>
	</div>
</aside>
