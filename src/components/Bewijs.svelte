<script lang="ts">
	import { showcaseProjects } from '$lib/content/home';
	import * as m from '$lib/paraglide/messages';
</script>

<!-- Bewijs van Excellence -->
<section id="cases" class="mx-auto flex max-w-[calc(100vw-4rem)] flex-col justify-center py-12">
	<!-- Titel -->
	<p
		class="subtitle text-primary-500 mb-6 inline-block -translate-x-4 translate-y-6 rounded-full px-4 py-1 text-base font-semibold"
	>
		{m['home.bewijs_cases']()}
	</p>
	<h1 class="font-grotesk text-4xl font-medium">{m['home.bewijs_title']()}</h1>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-16 sm:grid-cols-2">
		{#each showcaseProjects as project (project.title)}
			<div class="flex flex-col gap-2">
				<h2 class="bg-secondary-300 font-grotesk w-fit translate-y-12 rounded-xl p-1 text-2xl">
					{project.title}
				</h2>
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					class="text-left"
					aria-label={project.title}
				>
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
		{m['home.bewijs_insights']()}
	</p>
	<h1 class="font-grotesk text-4xl font-medium">{m['home.bewijs_recent_blogs']()}</h1>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each showcaseProjects as project (project.title)}
			<div class="flex flex-col gap-2">
				<h2 class="bg-secondary-300 font-grotesk w-fit translate-y-12 rounded-xl p-1 text-2xl">
					{project.title}
				</h2>
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					class="text-left"
					aria-label={project.title}
				>
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
	<button class="font-grotesk mx-auto w-fit rounded-xl p-1 underline"
		>{m['home.bewijs_all_insights']()}</button
	>
</section>
