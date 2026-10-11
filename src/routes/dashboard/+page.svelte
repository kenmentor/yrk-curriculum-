<script lang="ts">
	import { kpis, coursesDonut, programsDonut, oldestCourses, OVERDUE_DAYS } from '$lib/data/seed';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import StatusPill from '$lib/components/ui/StatusPill.svelte';
</script>

<div class="mx-auto max-w-[1440px]">
	<h1 class="sr-only">Curriculum dashboard</h1>
	<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key metrics">
		{#each kpis as k}
			<a
				href="/curriculum"
				class="rounded-[10px] border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:-translate-y-px hover:border-[var(--brand)] focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
			>
				<p class="text-xs font-medium text-[var(--text-muted)]">{k.label}</p>
				<p class="tnum mt-1 text-4xl font-medium">{k.value}</p>
				<p class="mt-1 text-[11px] text-[var(--text-muted)]">{k.delta}</p>
			</a>
		{/each}
	</section>

	<section class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
		<DonutChart title="Classes By Status" total={coursesDonut.total} splits={coursesDonut.splits} href="/curriculum" />
		<DonutChart title="Subjects By Status" total={programsDonut.total} splits={programsDonut.splits} href="/curriculum" />
	</section>

	<section class="mt-4 rounded-[10px] border bg-[var(--surface)]" aria-label="Oldest in progress courses">
		<div class="flex items-center justify-between px-4 pt-3">
			<h2 class="text-sm font-semibold">Oldest In Progress Courses</h2>
			<a href="/curriculum" class="text-sm text-[var(--brand)] hover:underline">View all</a>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full min-w-[640px] text-left">
				<thead>
					<tr class="bg-[var(--surface-muted)] text-xs font-semibold text-[var(--text-muted)]">
						<th class="px-4 py-2">Title</th><th class="px-4 py-2">Workflow Status</th><th class="px-4 py-2">Time on Current Step</th>
					</tr>
				</thead>
				<tbody>
					{#each oldestCourses as r}
						<tr class="h-12 border-t hover:bg-[var(--surface-muted)]">
							<td class="px-4 text-sm"><a class="hover:underline" href="/curriculum">{r.title}</a></td>
							<td class="px-4"><StatusPill status={r.status} size="sm" /></td>
							<td class="px-4">
								<span class="flex items-center gap-1.5 text-sm font-semibold tnum">
									{#if r.days >= OVERDUE_DAYS}<span class="h-1.5 w-1.5 rounded-full bg-red-500" title="Overdue"></span>{/if}
									{r.label}
								</span>
								<span class="text-[10px] text-[var(--text-muted)]">{r.step}</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>
