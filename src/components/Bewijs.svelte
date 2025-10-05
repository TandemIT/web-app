<script lang="ts">
	// Nu wat echte data invullen
	const projects = [
		{
			title: 'Project 1',
			description: 'Een geavanceerd project met moderne technologieën.',
			link: '/projects',
			image: 'https://placehold.co/600x400'
		},
		{
			title: 'Project 2',
			description: 'Een innovatief project gericht op schaalbare oplossingen.',
			link: '/projects',
			image: 'https://placehold.co/600x400'
		},
		{
			title: 'Project 3',
			description: 'Een creatief project met een focus op gebruiksvriendelijkheid.',
			link: '/projects',
			image: 'https://placehold.co/600x400'
		}
	];
</script>

<!-- Bewijs van Excellence -->
<section id="cases" class="mx-auto flex max-w-[calc(100vw-4rem)] flex-col justify-center py-12">
	<!-- Titel -->
	<p
		class="subtitle text-primary-500 mb-6 inline-block -translate-x-4 translate-y-6 rounded-full px-4 py-1 text-base font-semibold"
	>
		Cases
	</p>
	<h1 class="font-grotesk text-4xl font-medium">Bewijs van Excellence</h1>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-16 sm:grid-cols-2">
		{#each projects as project}
			<div class="flex flex-col gap-2">
				<h2 class="bg-secondary-300 font-grotesk w-fit translate-y-12 rounded-xl p-1 text-2xl">
					{project.title}
				</h2>
				<a href={project.link} target="_blank" rel="noopener noreferrer">
					<img
						class="h-full w-full rounded-xl object-cover"
						src={project.image}
						alt={project.title}
						loading="lazy"
					/>
				</a>

				<p class=" bg-secondary-300 w-[75%] -translate-y-6 rounded-xl p-2">{project.description}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Meest recente Blogs -->
<section class="mx-auto flex max-w-[calc(100vw-4rem)] flex-col justify-center py-12">
	<!-- Titel -->
	<p
		class="subtitle text-primary-500 mb-6 inline-block -translate-x-4 translate-y-6 rounded-full px-4 py-1 text-base font-semibold"
	>
		Insights
	</p>
	<h1 class="font-grotesk text-4xl font-medium">Meest recente Blogs</h1>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project}
			<div class="flex flex-col gap-2">
				<h2 class="bg-secondary-300 font-grotesk w-fit translate-y-12 rounded-xl p-1 text-2xl">
					{project.title}
				</h2>
				<a href={project.link} target="_blank" rel="noopener noreferrer">
					<img
						class="h-full w-full rounded-xl object-cover"
						src={project.image}
						alt={project.title}
						loading="lazy"
					/>
				</a>

				<p class=" bg-secondary-300 w-[75%] -translate-y-8 rounded-xl p-2">{project.description}</p>
			</div>
		{/each}
	</div>
	<button class="font-grotesk mx-auto w-fit rounded-xl p-1 underline">Alle insights</button>
</section>
