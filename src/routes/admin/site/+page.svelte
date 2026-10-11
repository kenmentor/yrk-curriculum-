<script lang="ts">
	import { browser } from '$app/environment';
	import { DEFAULT_PREVIEW, loadPreview, savePreview, type PreviewSettings } from '$lib/preview';

	let s = $state<PreviewSettings>(DEFAULT_PREVIEW);
	let notice = $state('');
	if (browser) s = loadPreview();

	function save() {
		savePreview(s);
		notice = 'Saved — open View site to see it live.';
	}
	function reset() {
		s = { ...DEFAULT_PREVIEW, why: DEFAULT_PREVIEW.why.map((w) => ({ ...w })) };
		savePreview(s);
		notice = 'Reset to defaults.';
	}
	function onFiles(e: Event) {
		const files = Array.from((e.target as HTMLInputElement).files ?? []).slice(0, 6 - s.bannerImages.length);
		if (!files.length) return;
		for (const f of files) {
			if (f.size > 1500000) { notice = `${f.name} too large — keep each under 1.5MB.`; continue; }
			const r = new FileReader();
			r.onload = () => {
				s.bannerImages = [...s.bannerImages, String(r.result ?? '')];
				notice = `${s.bannerImages.length} banner(s) attached (stored locally). They rotate every 6s.`;
			};
			r.readAsDataURL(f);
		}
		(e.target as HTMLInputElement).value = '';
	}
	let urlInput = $state('');
	function addUrl() {
		const u = urlInput.trim();
		if (!u) return;
		if (!/^https?:\/\//.test(u)) { notice = 'URL must start with http(s).'; return; }
		if (s.bannerImages.length >= 6) { notice = 'Maximum 6 banners.'; return; }
		s.bannerImages = [...s.bannerImages, u];
		urlInput = '';
		notice = '';
	}
	function move(i: number, dir: -1 | 1) {
		const j = i + dir;
		if (j < 0 || j >= s.bannerImages.length) return;
		const arr = [...s.bannerImages];
		[arr[i], arr[j]] = [arr[j], arr[i]];
		s.bannerImages = arr;
	}
	const ACCENTS = ['#7853da', '#1F9D55', '#2F6FDE', '#B45309', '#BE123C'];
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">Staff only · never shown on the public site</p>
	<div class="mt-1 flex items-center gap-3">
		<h1 class="text-xl font-semibold">Site settings</h1>
		<a href="/s" class="ml-auto rounded-md border border-[var(--border)] px-3 py-1.5 text-sm">View site →</a>
	</div>
	<p class="mt-1 text-sm text-[var(--text-muted)]">Everything on <b>/s</b> is edited here — banner, colours, copy, sections.</p>

	{#if notice}<p class="mt-3 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">{notice}</p>{/if}

	<section class="mt-4 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
		<h2 class="font-semibold">Banner</h2>
		<div class="mt-3 grid gap-3">
			<label class="grid gap-1 text-sm">School name<input class="h-9 rounded-md border border-[var(--border)] bg-transparent px-3" bind:value={s.school} /></label>
			<label class="grid gap-1 text-sm">Headline<input class="h-9 rounded-md border border-[var(--border)] bg-transparent px-3" bind:value={s.headline} /></label>
			<label class="grid gap-1 text-sm">Sub-headline<input class="h-9 rounded-md border border-[var(--border)] bg-transparent px-3" bind:value={s.sub} /></label>
			<div class="grid gap-1 text-sm">Banners ({s.bannerImages.length}/6 — rotate every 6s)
				<div class="flex flex-wrap items-center gap-2">
					<input type="file" accept="image/*" multiple onchange={onFiles} class="text-sm" aria-label="Upload banners" />
				</div>
				<form class="flex gap-1.5" onsubmit={(e) => { e.preventDefault(); addUrl(); }}>
					<input class="h-9 flex-1 rounded-md border border-[var(--border)] bg-transparent px-3" bind:value={urlInput} placeholder="…or paste image URL, then Add" aria-label="Image URL" />
					<button class="rounded-md border border-[var(--border)] px-3 text-sm" type="submit">Add</button>
				</form>
				{#if s.bannerImages.length}
					<ul class="grid grid-cols-3 gap-2">
						{#each s.bannerImages as img, i}
							<li class="relative overflow-hidden rounded-md border border-[var(--border)]">
								<img src={img} alt={`Banner ${i + 1}`} class="h-20 w-full object-cover" />
								<span class="tnum absolute left-1 top-1 rounded bg-black/60 px-1.5 text-[11px] text-white">{i + 1}</span>
								<div class="absolute bottom-1 right-1 flex gap-1">
									<button class="rounded bg-black/60 px-1.5 text-xs text-white" onclick={() => move(i, -1)} aria-label="Move left">‹</button>
									<button class="rounded bg-black/60 px-1.5 text-xs text-white" onclick={() => move(i, 1)} aria-label="Move right">›</button>
									<button class="rounded bg-black/60 px-1.5 text-xs text-white" onclick={() => (s.bannerImages = s.bannerImages.filter((_, j) => j !== i))} aria-label="Remove">×</button>
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-xs text-[var(--text-muted)]">No banners — hero shows the accent gradient.</p>
				{/if}
			</div>
			<label class="grid gap-1 text-sm">Overlay darkness ({s.bannerDim}%) — higher tames bright photos
				<input type="range" min="30" max="90" bind:value={s.bannerDim} class="accent-[#7853da]" />
			</label>
			<div class="flex items-center gap-2 text-sm">Accent
				{#each ACCENTS as a}
					<button onclick={() => (s.accent = a)} aria-label={`Accent ${a}`} class="h-7 w-7 rounded-full border-2 {s.accent === a ? 'border-white' : 'border-transparent'}" style={`background: ${a}`}></button>
				{/each}
			</div>
		</div>
	</section>

	<section class="mt-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
		<h2 class="font-semibold">Sections</h2>
		<div class="mt-2 grid gap-1.5 text-sm">
			{#each [['showStats', 'Numbers'], ['showClasses', 'Classes'], ['showWhy', 'Why us'], ['showPolicy', 'Policy + team']] as [k, label]}
				<label class="flex cursor-pointer items-center gap-2"><input type="checkbox" class="h-4 w-4 accent-[#7853da]" bind:checked={s[k as 'showStats' | 'showClasses' | 'showWhy' | 'showPolicy']} /> {label}</label>
			{/each}
		</div>
	</section>

	<section class="mt-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-5">
		<h2 class="font-semibold">Why-us cards</h2>
		<div class="mt-2 grid gap-3">
			{#each s.why as w, i}
				<div class="grid gap-1 rounded-md border border-[var(--border)] p-3 text-sm">
					<input class="h-9 rounded-md border border-[var(--border)] bg-transparent px-3 font-medium" bind:value={s.why[i].title} aria-label={`Card ${i + 1} title`} />
					<textarea rows="2" class="rounded-md border border-[var(--border)] bg-transparent px-3 py-2" bind:value={s.why[i].desc} aria-label={`Card ${i + 1} text`}></textarea>
				</div>
			{/each}
		</div>
	</section>

	<div class="mt-4 flex gap-2">
		<button class="rounded-md bg-[var(--brand)] px-4 py-2 text-sm text-white" onclick={save}>Save site</button>
		<button class="rounded-md border border-[var(--border)] px-4 py-2 text-sm" onclick={reset}>Reset</button>
	</div>
</div>
