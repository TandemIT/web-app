<script lang="ts">
	import * as m from '$lib/paraglide/messages';

	interface Job {
		title: string;
		description: string;
		href?: string;
		tags?: string[];
		date?: string;
		icon?: string;
	}

	const jobs: Job[] = [
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
			<h1
				class="font-grotesk text-primary-300 hover:text-primary-200 transform
						   text-5xl font-semibold transition-all duration-300"
			>
				Makerspace
			</h1>

			<h2 class="font-grotesk text-secondary-100 text-2xl font-medium">
				{m['projects.makerspace_subtitle']()}
			</h2>

			<p class="text-secondary-200 text-lg">{m['projects.makerspace_intro']()}</p>
		</header>

		<ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each jobs as job, index (job.title + String(index))}
				<li class="group relative">
					{#if job.href}
						<form
							action={job.href}
							method="GET"
							target="_blank"
							rel="noopener noreferrer"
						>
							<button
								type="submit"
								class="bg-secondary-600 hover:bg-secondary-500 focus-visible:ring-primary-300 block w-full transform
								   cursor-pointer rounded-xl p-6
								   text-left transition-all
								   duration-300 hover:shadow-xl
								   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								<div class="mb-4 flex items-start justify-between">
									<div class="flex-1">
										<h3
											class="font-grotesk text-primary-300 group-hover:text-primary-200 mb-1
											  flex items-center gap-2 text-2xl font-medium"
										>
											<span>{job.icon}</span>
											{job.title}
										</h3>
										{#if job.date}
											<p class="text-secondary-300 text-base">{job.date}</p>
										{/if}
									</div>

									<span
										class="text-primary-300 translate-x-2 transform opacity-0
										   transition-all duration-300 group-hover:translate-x-0
										   group-hover:opacity-100"
									>
										→
									</span>
								</div>

								<p class="text-secondary-100 mb-4">{job.description}</p>

								{#if job.tags}
									<div class="flex flex-wrap gap-2">
										{#each job.tags as tag (tag)}
											<span
												class="bg-secondary-700 text-secondary-100 rounded-full px-3
												   py-1 text-base"
											>
												{tag}
											</span>
										{/each}
									</div>
								{/if}

								<div
									class="bg-primary-300 absolute bottom-0 left-0 h-1 w-full
								  scale-x-0 transform transition-transform duration-300
								  group-hover:scale-x-100"
								></div>
							</button>
						</form>
					{:else}
						<div class="bg-secondary-600 block w-full rounded-xl p-6 text-left">
							<div class="mb-4 flex items-start justify-between">
								<div class="flex-1">
									<h3
										class="font-grotesk text-primary-300 mb-1 flex items-center gap-2 text-2xl font-medium"
									>
										<span>{job.icon}</span>
										{job.title}
									</h3>
									{#if job.date}
										<p class="text-secondary-300 text-base">{job.date}</p>
									{/if}
								</div>
							</div>

							<p class="text-secondary-100 mb-4">{job.description}</p>

							{#if job.tags}
								<div class="flex flex-wrap gap-2">
									{#each job.tags as tag (tag)}
										<span
											class="bg-secondary-700 text-secondary-100 rounded-full px-3
											   py-1 text-base"
										>
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>
