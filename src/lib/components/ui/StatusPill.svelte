<script lang="ts">
	import { cn } from '$lib/utils';
	export type Status = 'complete' | 'in-progress' | 'draft' | 'error';
	let { status, size = 'md', class: klass = '' }: { status: Status; size?: 'sm' | 'md'; class?: string } = $props();
	const label = $derived({ complete: 'Complete', 'in-progress': 'In Progress', draft: 'Draft', error: 'Error' }[status]);
</script>

<span
	data-testid={`status-${status}`}
	class={cn(
		'inline-flex items-center gap-1 rounded-md border px-2 font-semibold uppercase tracking-wide',
		size === 'sm' ? 'py-0.5 text-[10px]' : 'py-1 text-[11px]',
		status === 'complete' && 'border-[var(--status-complete-text)]/30 bg-[var(--status-complete-fill)] text-[var(--status-complete-text)]',
		status === 'in-progress' && 'border-[var(--status-progress-text)]/30 bg-[var(--status-progress-fill)] text-[var(--status-progress-text)]',
		status === 'draft' && 'border-[var(--status-draft-text)]/30 bg-[var(--status-draft-fill)] text-[var(--status-draft-text)]',
		status === 'error' && 'border-[var(--status-error-text)]/30 bg-[var(--status-error-fill)] text-[var(--status-error-text)]',
		klass
	)}
>
	{label}
</span>
