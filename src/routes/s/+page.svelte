<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { BANDS, CLASSES, subjectsFor } from '$lib/data/classes';
	import { INSTITUTION } from '$lib/data/institution';
	import { DEFAULT_PREVIEW, loadPreview, type PreviewSettings } from '$lib/preview';
	import { seedVisibility } from '$lib/curriculum/bank';
	import DataStrip from '$lib/components/public/DataStrip.svelte';
	import HeroScrim from '$lib/components/public/HeroScrim.svelte';

	let s = $state<PreviewSettings>(DEFAULT_PREVIEW);
	let pub = $state<Record<string, string>>({});
	let reduceMotion = $state(false);
	if (typeof window !== 'undefined') s = loadPreview();
	onMount(() => {
		pub = seedVisibility();
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	let visible = $derived(CLASSES.filter((c) => (pub[c.id] ?? 'public') === 'public'));

	let totalSubjects = $derived(CLASSES.reduce((a, c) => a + subjectsFor(c.id).length, 0));
	let slide = $state(0);
	let timer: ReturnType<typeof setInterval> | null = null;
	$effect(() => {
		if (timer) clearInterval(timer);
		if (s.bannerImages.length > 1 && typeof window !== 'undefined' && !reduceMotion) {
			timer = setInterval(() => (slide = (slide + 1) % s.bannerImages.length), 6000);
		}
	});
	onDestroy(() => { if (timer) clearInterval(timer); });
	function step(d: number) {
		slide = (slide + d + s.bannerImages.length) % s.bannerImages.length;
	}
</script>

<section class="relative overflow-hidden rounded-2xl border border-[var(--border)]" aria-roledescription="carousel" aria-label="School highlights">
	{#if s.bannerImages.length}
		{#each s.bannerImages as img, i}
			<img
				src={img} alt="" aria-hidden={i !== slide}
				class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 {i === slide % s.bannerImages.length ? 'opacity-100' : 'opacity-0'}"
			/>
		{/each}
		<HeroScrim dim={s.bannerDim} accent={s.accent} />
	{:else}
		<div class="absolute inset-0" style={`background: linear-gradient(135deg, ${s.accent}26, transparent 60%);`}></div>
	{/if}
	<div class="relative px-6 py-14 text-center sm:py-20">
		<p class="eyebrow {s.bannerImages.length ? 'text-white/70' : 'text-[var(--brand)]'}">Admissions open · 2026/2027</p>
		<h1 class="display mx-auto mt-3 max-w-2xl text-white">{s.headline}</h1>
		<p class="lede mx-auto mt-4 max-w-xl {s.bannerImages.length ? 'text-white/85' : ''}">{s.sub}</p>
		<div class="mt-6 flex justify-center gap-2">
			<a href="#classes" class="rounded-md px-5 py-2.5 text-sm font-medium text-white" style={`background: ${s.accent}`}>Find your class</a>
			<a href="/s/policies" class="rounded-md border border-white/40 px-5 py-2.5 text-sm text-white">How we teach</a>
		</div>
		{#if s.bannerImages.length > 1}
			<div class="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Banners">
				<button onclick={() => step(-1)} onkeydown={(e) => { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); }} aria-label="Previous banner" class="grid h-11 w-11 place-items-center rounded-full bg-black/40 text-lg text-white focus-visible:outline-2 focus-visible:outline-white">‹</button>
				{#each s.bannerImages as _, i}
					<button role="tab" aria-selected={i === slide % s.bannerImages.length} aria-label={`Banner ${i + 1}`} onclick={() => (slide = i)} class="h-2.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-white {i === slide % s.bannerImages.length ? 'w-7 bg-white' : 'w-2.5 bg-white/40'}"></button>
				{/each}
				<button onclick={() => step(1)} onkeydown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); }} aria-label="Next banner" class="grid h-11 w-11 place-items-center rounded-full bg-black/40 text-lg text-white focus-visible:outline-2 focus-visible:outline-white">›</button>
			</div>
		{/if}
	</div>
</section>

{#if s.showStats}
	<div class="mt-8">
		<DataStrip
			items={[
				[String(visible.length), 'classes, Nursery–SSS'],
				[String(totalSubjects), 'subject tracks'],
				['3', 'terms per class'],
				['12', 'weeks per term']
			]}
		/>
	</div>
{/if}

{#if s.showClasses}
	<section class="section" aria-label="Classes">
	<div class="flex items-baseline justify-between">
		<h2 id="classes" class="eyebrow scroll-mt-24 text-[var(--text-muted)]">Classes</h2>
		<span class="tnum text-xs text-[var(--text-muted)]">{visible.length} schemes</span>
	</div>
	{#each BANDS as band}
		{@const list = visible.filter((c) => c.band === band)}
		{#if list.length}
		<h3 class="mb-3 mt-8 text-sm font-semibold">{band} <span class="tnum font-normal text-[var(--text-muted)]">· {list.length}</span></h3>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each list as c}
				<a href={`/s/c/${c.id}`} class="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-px hover:border-[var(--brand)] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[var(--brand)]">
					<div class="flex items-center justify-between gap-2">
						<p class="eyebrow text-[var(--text-muted)]">{c.short}</p>
						<span class="rounded-full bg-[var(--surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">{c.framework}</span>
					</div>
					<h4 class="mt-2 font-semibold group-hover:underline">{c.label}</h4>
					<p class="tnum mt-1 text-xs text-[var(--text-muted)]">{subjectsFor(c.id).length} subjects · 3 terms · 12 weeks</p>
				</a>
			{/each}
		</div>
		{/if}
	{/each}
	</section>
{/if}

{#if s.showWhy}
	<section class="section" aria-label="Why families choose us">
	<h2 class="eyebrow mb-4 text-[var(--text-muted)]">Why families choose us</h2>
	<ol class="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
		{#each s.why as w, i}
			<li class="bg-[var(--surface)] p-6">
				<p class="tnum text-xs font-bold" style={`color: ${s.accent}`}>0{i + 1}</p>
				<h3 class="mt-2 font-semibold">{w.title}</h3>
				<p class="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{w.desc}</p>
			</li>
		{/each}
	</ol>
	</section>
{/if}

{#if s.showPolicy}
	<section class="section grid gap-4 md:grid-cols-2" aria-label="Policy and people">
		<div class="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
			<p class="eyebrow text-[var(--text-muted)]">Policy</p>
			<h2 class="mt-2 font-semibold">Plain words, kept promises</h2>
			<p class="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">Assessment every Week 12. Transfers placed within 2 weeks. Published weeks are immutable.</p>
			<a href="/s/policies" class="link-soft mt-3 inline-block text-sm font-medium">Read policy →</a>
		</div>
		<div class="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
			<p class="eyebrow text-[var(--text-muted)]">People</p>
			<h2 class="mt-2 font-semibold">Built by {INSTITUTION.name}</h2>
			<p class="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">Funded by {INSTITUTION.funders.join(' · ')}. Run by {INSTITUTION.builders.map((b) => b.name).join(', ')}.</p>
			<a href="/s/team" class="link-soft mt-3 inline-block text-sm font-medium">Meet the team →</a>
		</div>
	</section>
{/if}
