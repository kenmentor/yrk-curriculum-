<script lang="ts">
	import { onMount } from 'svelte';
	import { POLICIES } from '$lib/data/support';

	let active = $state(POLICIES[0]?.id ?? '');
	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = (e.target as HTMLElement).id;
				}
			},
			{ rootMargin: '-30% 0px -60% 0px' }
		);
		const els = Array.from(document.querySelectorAll('[data-policy]'));
		els.forEach((el) => obs.observe(el));
		return () => obs.disconnect();
	});
</script>

<header class="max-w-2xl">
	<p class="eyebrow text-[var(--brand-soft)]">Policy handbook · 1School Lagos</p>
	<h1 class="display mt-3">How we teach.</h1>
	<p class="lede mt-4 max-w-xl">Three short rules govern every scheme from Nursery 1 to SSS 3. Written for parents first, precise enough for inspectors.</p>
	<p class="tnum mt-4 text-xs text-[var(--text-muted)]">{POLICIES.length} rules · updated October 2026 · 2 min read</p>
</header>

<div class="mt-12 grid gap-10 lg:grid-cols-[230px_1fr]">
	<nav class="hidden lg:block" aria-label="On this page">
		<div class="sticky top-20 grid gap-1 text-sm">
			<p class="eyebrow px-3 pb-2 text-[var(--text-muted)]">Contents</p>
			{#each POLICIES as p, i}
				<a
					href={`#${p.id}`}
					aria-current={active === p.id ? 'true' : undefined}
					class="flex items-baseline gap-2.5 rounded-md px-3 py-2 {active === p.id ? 'bg-[var(--surface-muted)] font-semibold' : 'text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--text)]'}"
				><span class="tnum text-[11px] font-bold text-[var(--brand)]">0{i + 1}</span>{p.title}</a>
			{/each}
			<a href="/s/team" class="link-soft rounded-md px-3 py-2">Who enforces this →</a>
		</div>
	</nav>

	<div class="grid gap-16">
		{#each POLICIES as p, i}
			<article id={p.id} data-policy class="scroll-mt-24">
				<div class="flex items-baseline gap-4">
					<p class="tnum select-none text-5xl font-bold leading-none text-[var(--surface-muted)]" aria-hidden="true">0{i + 1}</p>
					<h2 class="title">{p.title}</h2>
				</div>
				<blockquote class="mt-5 max-w-2xl rounded-r-xl border-l-4 bg-[var(--surface)] px-5 py-4 text-[19px] font-medium leading-relaxed text-[var(--text-strong)]" style="border-color: var(--brand);">
					{p.tldr}
				</blockquote>
				<p class="mt-4 max-w-2xl text-[17px] leading-[1.75] text-[var(--text-strong)]">{p.body}</p>
			</article>
		{/each}

		<section class="rounded-2xl bg-[var(--surface)] p-8 sm:p-10">
			<p class="eyebrow text-[var(--text-muted)]">Still curious?</p>
			<h2 class="title mt-2">Questions about a rule?</h2>
			<p class="lede mt-2 max-w-xl">Talk to the Curriculum Owner, or raise it at the next senate sitting — agendas are published before every meeting.</p>
			<div class="mt-5 flex flex-wrap gap-2">
				<a href="/s/team" class="rounded-md bg-[var(--brand)] px-5 py-2.5 text-sm font-medium text-white">Meet the team →</a>
				<a href="/s" class="rounded-md border border-[var(--border)] px-5 py-2.5 text-sm">Back to classes</a>
			</div>
		</section>
	</div>
</div>
