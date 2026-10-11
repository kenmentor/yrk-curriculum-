<script lang="ts">
	import { cn } from '$lib/utils';
	const TONES: Record<string, string> = {
		sky: 'border-sky-400/30 bg-sky-400/15 text-sky-300',
		amber: 'border-amber-400/30 bg-amber-400/15 text-amber-300',
		emerald: 'border-emerald-400/30 bg-emerald-400/15 text-emerald-300',
		violet: 'border-violet-400/30 bg-violet-400/15 text-violet-300',
		brand: 'border-[var(--brand)]/40 bg-[var(--brand)]/15 text-[var(--brand-soft)]',
		muted: 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-muted)]'
	};
	let {
		class: klass = '',
		children,
		variant = 'secondary',
		tone
	}: {
		class?: string;
		children?: import('svelte').Snippet;
		variant?: 'default' | 'secondary' | 'outline';
		tone?: keyof typeof TONES;
	} = $props();
</script>

<span
	class={cn(
		'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold transition-colors',
		!tone && variant === 'default' && 'border-transparent bg-primary text-primary-foreground',
		!tone && variant === 'secondary' && 'border-transparent bg-secondary text-secondary-foreground',
		!tone && variant === 'outline' && 'text-foreground',
		tone && TONES[tone],
		klass
	)}
>
	{@render children?.()}
</span>
