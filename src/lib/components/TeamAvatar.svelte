<script lang="ts">
	let { name, size = 'lg' }: { name: string; size?: 'sm' | 'md' | 'lg' | 'xl' } = $props();
	const initials = $derived(
		name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join('')
	);
	const GRADS = [
		'#5b3fb8',
		'#177245',
		'#2456b8',
		'#8a4d0b',
		'#931237'
	];
	let hash = $derived.by(() => {
		let h = 0;
		for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 997;
		return h;
	});
	const bg = $derived(GRADS[hash % GRADS.length]);
	const dims = $derived({ sm: 'h-8 w-8 text-xs', md: 'h-12 w-12 text-sm', lg: 'h-16 w-16 text-lg', xl: 'h-24 w-24 text-2xl' }[size]);
</script>

<span class={`grid shrink-0 place-items-center rounded-full font-bold text-white ring-2 ring-white/20 ${dims}`} style={`background: ${bg}`} aria-hidden="true">
	{initials}
</span>
