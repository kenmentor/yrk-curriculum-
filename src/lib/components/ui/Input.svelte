<script lang="ts">
	import { cn } from '$lib/utils';
	let { class: klass = '', value = $bindable(''), ...rest }: { class?: string; value?: string; [key: string]: unknown } = $props();
</script>

<input
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
		klass
	)}
	bind:value
	{...rest}
/>
