<script lang="ts">
	import TeamAvatar from '$lib/components/TeamAvatar.svelte';
	import { INSTITUTION } from '$lib/data/institution';
	import { CLASSES } from '$lib/data/classes';
	import DataStrip from '$lib/components/public/DataStrip.svelte';
</script>

<header class="max-w-2xl">
	<p class="eyebrow text-[var(--brand-soft)]">About</p>
	<h1 class="display mt-3">The people behind the curriculum.</h1>
	<p class="lede mt-4">{INSTITUTION.about}</p>
	<p class="mt-2 text-sm text-[var(--text-muted)]">{INSTITUTION.framework}</p>
</header>

<div class="mt-8">
	<DataStrip
		items={[
			[String(CLASSES.length), 'classes, Nursery to SSS'],
			['3', 'terms per class'],
			['12', 'weeks per term'],
			[String(INSTITUTION.builders.length), 'people building']
		]}
	/>
</div>

<section class="section" aria-label="About us">
<p class="eyebrow text-[var(--brand-soft)]">About us</p>
<h2 class="title mt-3 max-w-3xl">{INSTITUTION.aboutLong[0]}</h2>
<div class="mt-6 grid max-w-5xl gap-8 text-[17px] leading-[1.75] text-[var(--text-strong)] md:grid-cols-2">
	<div class="space-y-5">
		{#each INSTITUTION.aboutLong.slice(1, 3) as para}<p>{para}</p>{/each}
	</div>
	<div class="space-y-5">
		<figure class="rounded-2xl bg-[var(--surface)] p-7">
			<p class="select-none text-5xl font-bold leading-none text-[var(--brand)]" aria-hidden="true">“</p>
			<blockquote class="-mt-3 text-xl font-medium leading-relaxed text-[var(--text-strong)]">A calm, honest curriculum, free for every classroom we serve.</blockquote>
		</figure>
		{#each INSTITUTION.aboutLong.slice(3) as para}<p>{para}</p>{/each}
		<ul class="grid gap-0 border-t border-[var(--border)]">
			{#each [['01', 'One scheme per class', 'Fifteen schemes, each with three terms and twelve weeks.'], ['02', 'Plain language, always', 'If a parent can’t understand it, we rewrite it.'], ['03', 'Never a silent change', 'Every fix lands in a new release with a full trail.']] as [n, t, d]}
				<li class="grid grid-cols-[44px_1fr] gap-3 border-b border-[var(--border)] py-4">
					<span class="tnum text-sm font-bold text-[var(--brand)]">{n}</span>
					<span><b class="font-semibold text-[var(--text)]">{t}.</b> <span class="text-[var(--text-muted)]">{d}</span></span>
				</li>
			{/each}
		</ul>
	</div>
</div>
</section>

<section class="section" aria-label="Team">
<h2 class="eyebrow text-[var(--text-muted)]">Team</h2>
<ul class="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
	{#each INSTITUTION.builders as b}
		<li class="flex items-center gap-4 py-4">
			<TeamAvatar name={b.name} size="lg" />
			<div class="min-w-0">
				<h3 class="truncate text-base font-semibold">{b.name}</h3>
				<p class="text-sm font-medium text-[var(--brand-soft)]">{b.role}</p>
				<p class="mt-0.5 truncate text-sm text-[var(--text-muted)] sm:whitespace-normal">{b.focus}</p>
			</div>
		</li>
	{/each}
</ul>
</section>

<section class="section" aria-label="Supported by">
<h2 class="eyebrow text-[var(--text-muted)]">Supported by</h2>
<ul class="mt-4 grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
	{#each INSTITUTION.funders as f}
		<li class="flex items-center gap-4 bg-[var(--surface)] px-5 py-4">
			<TeamAvatar name={f} size="md" />
			<div>
				<h3 class="font-semibold">{f}</h3>
				<p class="text-sm text-[var(--text-muted)]">Funding partner</p>
			</div>
		</li>
	{/each}
</ul>

<div class="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-[var(--surface)] p-8 sm:flex-row sm:items-center">
	<div>
		<h2 class="title">See what they built.</h2>
		<p class="lede mt-1">Fifteen schemes. Three terms each. Twelve weeks a term.</p>
	</div>
	<a href="/s" class="rounded-md bg-[var(--brand)] px-6 py-2.5 text-sm font-medium text-white">Explore the curriculum →</a>
</div>
</section>
