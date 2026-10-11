<script lang="ts">
	import { buttonVariants, type ButtonVariant, type ButtonSize } from './button.js';
	import { cn } from '$lib/utils';

	let {
		variant = 'default' as ButtonVariant,
		size = 'default' as ButtonSize,
		class: klass = '',
		children,
		...rest
	}: {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<button class={cn(buttonVariants({ variant, size }), klass)} {...rest}>
	{@render children?.()}
</button>
