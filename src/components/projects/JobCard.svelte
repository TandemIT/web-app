<script lang="ts">
	export interface JobCardData {
		title: string;
		description: string;
		href?: string;
		tags?: string[];
		date?: string;
		icon?: string;
	}

	interface Props {
		job: JobCardData;
	}

	let { job }: Props = $props();
</script>

{#if job.href}
	<form action={job.href} method="GET" target="_blank" rel="noopener noreferrer">
		<button
			type="submit"
			class="group bg-secondary-600 hover:bg-secondary-500 focus-visible:ring-primary-300 block w-full rounded-xl p-6 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		>
			<div class="mb-4 flex items-start justify-between gap-3">
				<div class="flex-1">
					<h3
						class="font-grotesk text-primary-300 mb-1 flex items-center gap-2 text-2xl font-medium"
					>
						{#if job.icon}
							<span>{job.icon}</span>
						{/if}
						{job.title}
					</h3>
					{#if job.date}
						<p class="text-secondary-300 text-base">{job.date}</p>
					{/if}
				</div>
				<span
					class="text-primary-300 text-lg transition-transform duration-300 group-hover:translate-x-0.5"
				>
					->
				</span>
			</div>

			<p class="text-secondary-100 mb-4">{job.description}</p>

			{#if job.tags?.length}
				<div class="flex flex-wrap gap-2">
					{#each job.tags as tag (tag)}
						<span
							class="bg-secondary-700 text-secondary-100 rounded-full px-3 py-1 text-base"
						>
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</button>
	</form>
{:else}
	<article class="bg-secondary-600 rounded-xl p-6 text-left">
		<div class="mb-4">
			<h3
				class="font-grotesk text-primary-300 mb-1 flex items-center gap-2 text-2xl font-medium"
			>
				{#if job.icon}
					<span>{job.icon}</span>
				{/if}
				{job.title}
			</h3>
			{#if job.date}
				<p class="text-secondary-300 text-base">{job.date}</p>
			{/if}
		</div>

		<p class="text-secondary-100 mb-4">{job.description}</p>

		{#if job.tags?.length}
			<div class="flex flex-wrap gap-2">
				{#each job.tags as tag (tag)}
					<span
						class="bg-secondary-700 text-secondary-100 rounded-full px-3 py-1 text-base"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</article>
{/if}
