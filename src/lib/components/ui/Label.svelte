<script lang="ts">
	import { cn } from '$lib/utils';
	let { class: klass = '', children, ...rest }: { class?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>

<label class={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', klass)} {...rest}>
	{@render children?.()}
</label>
