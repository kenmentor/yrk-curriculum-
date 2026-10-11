<script lang="ts">
	import TeamAvatar from '$lib/components/TeamAvatar.svelte';
	import { INSTITUTION } from '$lib/data/institution';
	import { validatePhone } from '$lib/identity/phone';

	let phone = $state('');
	let role = $state('builder');
	let message = $state('');
	let isError = $state(false);
	let tab = $state<'people' | 'invite'>('people');

	function invite(e: SubmitEvent) {
		e.preventDefault();
		const res = validatePhone(phone);
		if (!res.ok) { isError = true; message = res.reason; return; }
		isError = false;
		message = `${res.e164} invited as ${role}.`;
		phone = '';
	}
</script>

<div class="mx-auto max-w-3xl">
	<p class="text-xs text-[var(--text-muted)]">{INSTITUTION.name} · Who builds this</p>
	<h1 class="mt-1 text-xl font-semibold">Teams</h1>
	<div class="mt-3 flex gap-1 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-1 text-sm w-fit">
		<button onclick={() => (tab = 'people')} class="rounded-md px-3 py-1.5 {tab === 'people' ? 'bg-[var(--brand)] text-white' : ''}">People</button>
		<button onclick={() => (tab = 'invite')} class="rounded-md px-3 py-1.5 {tab === 'invite' ? 'bg-[var(--brand)] text-white' : ''}">Invite by phone</button>
	</div>

	{#if tab === 'people'}
		<div class="mt-3 grid gap-3 sm:grid-cols-2">
			<section class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4">
				<h2 class="text-sm font-semibold text-[var(--text-muted)]">Builders</h2>
				<ul class="mt-2 grid gap-2">
					{#each INSTITUTION.builders as b}
						<li class="flex items-center gap-3">
							<TeamAvatar name={b.name} size="md" />
							<span class="flex-1 text-sm"><b>{b.name}</b><br /><span class="text-[var(--text-muted)]">{b.role}</span></span>
						</li>
					{/each}
				</ul>
			</section>
			<section class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4">
				<h2 class="text-sm font-semibold text-[var(--text-muted)]">Funders</h2>
				<ul class="mt-2 grid gap-1 text-sm">{#each INSTITUTION.funders as f}<li>{f}</li>{/each}</ul>
				<h2 class="mt-4 text-sm font-semibold text-[var(--text-muted)]">About</h2>
				<p class="mt-1 text-sm text-[var(--text-muted)]">{INSTITUTION.about}</p>
			</section>
		</div>
	{:else}
		<form class="mt-3 grid gap-3 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4" onsubmit={invite}>
			<div class="grid gap-1.5">
				<label class="text-sm font-medium" for="phone">Phone</label>
				<input id="phone" class="h-9 rounded-md border border-[var(--border)] bg-transparent px-3 text-sm" bind:value={phone} placeholder="+234 …" inputmode="tel" />
			</div>
			<div class="grid gap-1.5">
				<label class="text-sm font-medium" for="role">Role</label>
				<select id="role" class="h-9 rounded-md border border-[var(--border)] bg-transparent px-2 text-sm" bind:value={role}>
					<option value="builder">Builder</option><option value="reviewer">Reviewer</option><option value="approver">Approver</option><option value="inspector">Inspector</option>
				</select>
			</div>
			<button class="rounded-md bg-[var(--brand)] px-3 py-2 text-sm text-white" type="submit">Send invite</button>
			{#if message}<p class="rounded-md border border-[var(--border)] px-3 py-2 text-sm">{message}</p>{/if}
		</form>
	{/if}
</div>
