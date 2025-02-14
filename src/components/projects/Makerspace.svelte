<script lang="ts">
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
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.',
			href: 'https://makecenter.nl',
			tags: ['Netwerk', 'Beheer', 'Infrastructuur'],
			date: '2023 - heden',
			icon: '🌐'
		},
		{
			title: 'Bookstack',
			description:
				'Documentatie website opgezet voor de projecten van de studenten van het Veenlanden College.',
			href: 'https://bookstack.makerspace-vlc.nl',
			tags: ['Documentatie', 'Web', 'Knowledge Base'],
			date: '2023',
			icon: '📚'
		},
		{
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.',
			tags: ['Netwerk', 'Support', 'Maintenance'],
			date: '2022 - 2023',
			icon: '🔧'
		},
		{
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.',
			tags: ['Netwerk', 'Planning', 'Security'],
			date: '2021 - 2022',
			icon: '🛡️'
		}
	];

	function goHref(href: string | undefined, event: MouseEvent) {
		event.preventDefault();
		if (!href) return;

		window.open(href, '_blank', 'noopener,noreferrer');
	}

	let hoveredIndex: number | null = null;

	function handleMouseEnter(index: number) {
		hoveredIndex = index;
	}

	function handleMouseLeave() {
		hoveredIndex = null;
	}

	function handleKeyPress(event: KeyboardEvent, href: string | undefined) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (href) {
				window.open(href, '_blank', 'noopener,noreferrer');
			}
		}
	}
</script>

<section class="bg-secondary-700 py-16">
	<div class="mx-auto max-w-4xl space-y-8 px-4">
		<header class="space-y-4 text-center">
			<h1
				class="font-grotesk text-primary-300 hover:text-primary-200 transform
						   text-5xl font-semibold transition-all duration-300"
			>
				Makecenter
			</h1>

			<h2 class="font-grotesk text-secondary-100 text-2xl font-medium">
				Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.
			</h2>

			<p class="text-secondary-200 text-lg">De volgende werken zijn uitgevoerd:</p>
		</header>

		<ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each jobs as job, index}
				<li
					class="group relative"
					on:mouseenter={() => handleMouseEnter(index)}
					on:mouseleave={handleMouseLeave}
				>
					<button
						class="bg-secondary-600 hover:bg-secondary-500 focus-visible:ring-primary-300 block w-full transform
								   cursor-pointer rounded-xl p-6
								   text-left transition-all
								   duration-300 hover:shadow-xl
								   focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
						on:click={(e) => goHref(job.href, e)}
						on:keydown={(e) => handleKeyPress(e, job.href)}
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
									<p class="text-secondary-300 text-sm">{job.date}</p>
								{/if}
							</div>

							{#if job.href}
								<span
									class="text-primary-300 translate-x-2 transform opacity-0
											   transition-all duration-300 group-hover:translate-x-0
											   group-hover:opacity-100"
								>
									→
								</span>
							{/if}
						</div>

						<p class="text-secondary-100 mb-4">{job.description}</p>

						{#if job.tags}
							<div class="flex flex-wrap gap-2">
								{#each job.tags as tag}
									<span
										class="bg-secondary-700 text-secondary-100 rounded-full px-3
												   py-1 text-sm"
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
				</li>
			{/each}
		</ul>
	</div>
</section>
