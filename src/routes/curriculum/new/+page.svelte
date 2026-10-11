<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Progress from '$lib/components/ui/Progress.svelte';
	import {
		CREATABLE_BANDS,
		FRAMEWORKS,
		LEVEL_BAND_LABELS,
		ADOPTION_PATH_LABELS
	} from '$lib/curriculum/constants';
	import { EMPTY_INTAKE, validateGovernance, validateProvenance, type IntakeDraft } from '$lib/curriculum/intake';
	import { addCustom } from '$lib/curriculum/bank';

	const KEY = 'curriculumiq-intake-v2';
	let step = $state(1);
	let draft = $state<IntakeDraft>(EMPTY_INTAKE);
	let error = $state('');

	if (browser) {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) draft = { ...EMPTY_INTAKE, ...JSON.parse(raw) };
		} catch {}
	}

	function persist() {
		if (browser) localStorage.setItem(KEY, JSON.stringify(draft));
	}

	function next() {
		error = '';
		if (step === 1) {
			const e = validateGovernance(draft);
			if (e) { error = e; return; }
			step = 2;
		} else if (step === 2) {
			const e = validateProvenance(draft);
			if (e) { error = e; return; }
			step = 3;
		}
		persist();
		window.scrollTo({ top: 0 });
	}

	function back() {
		error = '';
		step = Math.max(1, step - 1);
	}

	function create() {
		persist();
		if (browser) {
			localStorage.setItem('curriculumiq-builder-seed', JSON.stringify(draft));
			addCustom({ title: draft.title, band: draft.band, country: draft.country, framework: draft.framework, version: draft.version, year: draft.year });
		}
		goto('/curriculum/bank');
	}
</script>

<div class="mx-auto max-w-2xl">
	<p class="text-sm text-muted-foreground">Curriculum · New intake</p>
	<h1 class="mt-1 text-2xl font-semibold tracking-tight">Step {step} of 3</h1>
	<Progress value={step} max={3} class="mt-3" />
	<p class="mt-2 text-sm text-muted-foreground">
		{#if step === 1}Governance — what is this?{/if}
		{#if step === 2}Provenance — where from, which version? One framework only in v1.{/if}
		{#if step === 3}Review — calm check before building.{/if}
	</p>

	<Card class="mt-5 p-5">
		{#if step === 1}
			<div class="grid gap-4">
				<div class="grid gap-1.5">
					<Label>Level band</Label>
					<Select bind:value={draft.band}>
						<option value="">Select band…</option>
						{#each CREATABLE_BANDS as b}<option value={b}>{LEVEL_BAND_LABELS[b]}</option>{/each}
					</Select>
				</div>
				<div class="grid gap-1.5">
					<Label>Title (program)</Label>
					<Input bind:value={draft.title} placeholder="e.g. Lower Basic Mathematics" />
				</div>
				<div class="grid gap-1.5">
					<Label>Country (ISO)</Label>
					<Input bind:value={draft.country} maxlength={2} placeholder="NG" />
				</div>
			</div>
		{:else if step === 2}
			<div class="grid gap-4">
				<div class="grid gap-1.5">
					<Label>Framework (single)</Label>
					<Select bind:value={draft.framework}>
						<option value="">Select one…</option>
						{#each FRAMEWORKS as f}<option value={f}>{f}</option>{/each}
					</Select>
					<p class="text-xs text-muted-foreground">v1 allows exactly one. Multi-framework returns post-v1.</p>
				</div>
				<div class="grid gap-1.5">
					<Label>Adoption path</Label>
					<Select bind:value={draft.adoptionPath}>
						<option value="">Select…</option>
						{#each Object.entries(ADOPTION_PATH_LABELS) as [v, l]}<option value={v}>{l}</option>{/each}
					</Select>
				</div>
				<div class="grid gap-1.5 sm:grid-cols-2">
					<div class="grid gap-1.5">
						<Label>Guideline doc</Label>
						<Input bind:value={draft.guidelineDoc} placeholder="e.g. National Curriculum" />
					</div>
					<div class="grid gap-1.5">
						<Label>Ref / page</Label>
						<Input bind:value={draft.guidelineRef} placeholder="e.g. 2023 p.45" />
					</div>
				</div>
				<div class="grid gap-1.5">
					<Label>Guideline URL (optional)</Label>
					<Input bind:value={draft.guidelineUrl} placeholder="https://…" inputmode="url" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="grid gap-1.5">
						<Label>Version</Label>
						<Input bind:value={draft.version} placeholder="v1.0" />
					</div>
					<div class="grid gap-1.5">
						<Label>Year</Label>
						<Input bind:value={draft.year} inputmode="numeric" />
					</div>
				</div>
			</div>
		{:else}
			<dl class="grid gap-2 text-sm">
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Band</dt><dd>{draft.band || '—'}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Title</dt><dd class="text-right">{draft.title || '—'}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Country</dt><dd>{draft.country}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Framework</dt><dd>{draft.framework || '—'}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Path</dt><dd>{draft.adoptionPath || '—'}</dd></div>
				<div class="flex justify-between gap-4"><dt class="text-muted-foreground">Version · Year</dt><dd>{draft.version} · {draft.year}</dd></div>
			</dl>
		{/if}

		{#if error}<p class="mt-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm">{error}</p>{/if}

		<div class="mt-5 flex items-center justify-between">
			<Button variant="ghost" onclick={back} disabled={step === 1}>Back</Button>
			{#if step < 3}
				<Button onclick={next}>Continue</Button>
			{:else}
				<Button onclick={create}>Create & open builder</Button>
			{/if}
		</div>
	</Card>
</div>
