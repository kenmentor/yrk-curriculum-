<script lang="ts">
	import { cn } from '$lib/utils';
	let { class: klass = '', children, ...rest }: { class?: string; children?: import('svelte').Snippet; [key: string]: unknown } = $props();
</script>

<div class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', klass)} {...rest}>
	{@render children?.()}
</div>
