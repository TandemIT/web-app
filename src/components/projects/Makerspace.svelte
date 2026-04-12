<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import JobCard from './JobCard.svelte';
	import type { JobCardData } from './JobCard.svelte';

	const jobs: JobCardData[] = [
		{
			title: m['projects.makerspace_job_2_title'](),
			description: m['projects.makerspace_job_2_description'](),
			href: 'https://bookstack.makerspace-vlc.nl',
			tags: [
				m['projects.makerspace_tag_documentation'](),
				m['projects.makerspace_tag_web'](),
				m['projects.makerspace_tag_knowledge_base']()
			],
			date: m['projects.makerspace_date_2023'](),
			icon: '📚'
		}
	];
</script>

<section class="bg-secondary-700 py-16">
	<div class="mx-auto max-w-4xl space-y-8 px-4">
		<header class="space-y-4 text-center">
			<h2
				id="makerspace-title"
				class="font-grotesk text-primary-300 hover:text-primary-200 transform
						   text-5xl font-semibold transition-all duration-300"
			>
				Makerspace
			</h2>

			<p class="font-grotesk text-secondary-100 text-2xl font-medium">
				{m['projects.makerspace_subtitle']()}
			</p>

			<p class="text-secondary-200 text-lg">{m['projects.makerspace_intro']()}</p>
		</header>

		<ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each jobs as job, index (job.title + String(index))}
				<li>
					<JobCard {job} />
				</li>
			{/each}
		</ul>
	</div>
</section>
