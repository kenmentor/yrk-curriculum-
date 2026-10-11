<script lang="ts">
	import { assistantSeeds } from '$lib/data/seed';
	import Button from './ui/Button.svelte';
	let { open = true, onClose }: { open?: boolean; onClose?: () => void } = $props();
	let input = $state('');
	let log = $state<string[]>([]);
	function confirm(action: string) {
		log = [...log, `${new Date().toISOString()} confirmed: ${action}`];
		alert(`${action} confirmed (audit logged).`);
	}
</script>

{#if open}
	<aside class="fixed right-4 top-20 z-40 w-[380px] max-w-[calc(100vw-2rem)] rounded-[14px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-[0_12px_32px_rgba(0,0,0,0.4)]" aria-label="AI assistant" data-testid="ai-panel">
		<div class="flex h-9 items-center gap-2 border-b px-3">
			<span class="h-2 w-2 rounded-full bg-[#FF5F57]"></span><span class="h-2 w-2 rounded-full bg-[#FEBC2E]"></span><span class="h-2 w-2 rounded-full bg-[#28C840]"></span>
			<span class="mx-auto text-sm font-semibold">AI That Understands Your Work</span>
			<button class="text-xs text-emerald-700" onclick={onClose} aria-label="Minimize">—</button>
		</div>
		<div class="grid gap-3 p-4">
			{#each assistantSeeds as m}
				{#if m.from === 'user'}
					<div class="flex justify-end gap-2">
						<p class="max-w-[70%] rounded-[10px] bg-[#E9EAEC] px-3 py-2 text-sm">{m.text}</p>
						<span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-300 text-xs">🧑</span>
					</div>
				{:else}
					<div class="flex gap-2">
						<span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1F9D55] text-[10px] font-bold text-white">AI</span>
						<div class="max-w-[70%] rounded-[10px] border px-3 py-2 text-sm">
							<p>{m.text}</p>
							{#if 'action' in m && m.action}
								<button class="mt-2 inline-flex h-7 items-center gap-1 rounded-md border border-emerald-600 px-2 text-xs font-medium text-emerald-700" onclick={() => confirm(m.action!)}>{m.action} ↗</button>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
			<p class="text-[11px] text-slate-500">Context: <span class="rounded bg-slate-100 px-1.5 py-0.5">Course: Microeconomics</span></p>
			<form class="flex gap-2" onsubmit={(e) => { e.preventDefault(); if (input.trim()) { alert('Sent (demo). Confirmation required before any change.'); input = ''; } }}>
				<input class="h-9 flex-1 rounded-md border px-3 text-sm" bind:value={input} placeholder="Ask about curriculum…" aria-label="Ask assistant" />
				<Button type="submit" size="sm">Send</Button>
			</form>
			{#if log.length}<details class="text-[11px] text-slate-500"><summary>Audit ({log.length})</summary>{#each log as l}<p>{l}</p>{/each}</details>{/if}
		</div>
	</aside>
{/if}
