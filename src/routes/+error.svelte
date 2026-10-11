<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="mx-auto max-w-md px-4 py-20 text-center">
	<p class="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{$page.status}</p>
	<h1 class="mt-2 text-2xl font-semibold">{$page.status === 404 ? 'Page not found' : 'Something went wrong'}</h1>
	<p class="mt-2 text-sm text-[var(--text-muted)]">The school site lives at <a class="text-[var(--brand)] hover:underline" href="/s">/s</a> · staff start at <a class="text-[var(--brand)] hover:underline" href="/dashboard">/dashboard</a>.</p>
	<a href="/s" class="mt-5 inline-block rounded-md bg-[var(--brand)] px-5 py-2 text-sm text-white">Back to school site</a>
</div>
