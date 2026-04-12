<script lang="ts">
	import { resolve } from '$app/paths';
	import { showcaseProjects } from '$lib/content/home';
	import * as m from '$lib/paraglide/messages';
</script>

<!-- Bewijs van Excellence -->
<section
	id="cases"
	class="mx-auto flex max-w-[calc(100vw-4rem)] flex-col justify-center py-12"
	aria-labelledby="cases-title"
>
	<!-- Titel -->
	<p
		class="subtitle text-primary-500 mb-6 inline-block -translate-x-4 translate-y-6 rounded-full px-4 py-1 text-base font-semibold"
	>
		{m['home.bewijs_cases']()}
	</p>
	<h2 id="cases-title" class="font-grotesk text-4xl font-medium">{m['home.bewijs_title']()}</h2>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-16 sm:grid-cols-2">
		{#each showcaseProjects as project (project.title)}
			<div class="flex flex-col gap-3">
				<h3 class="font-grotesk text-secondary-50 text-2xl font-medium">
					{project.title}
				</h3>
				<a
					href={resolve(project.link as `/${string}`)}
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

				<p class="text-secondary-200 text-base">
					{project.description}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- Meest recente Blogs -->
<section
	class="mx-auto flex max-w-[calc(100vw-4rem)] flex-col justify-center py-12"
	aria-labelledby="insights-title"
>
	<!-- Titel -->
	<p
		class="subtitle text-primary-500 mb-6 inline-block -translate-x-4 translate-y-6 rounded-full px-4 py-1 text-base font-semibold"
	>
		{m['home.bewijs_insights']()}
	</p>
	<h2 id="insights-title" class="font-grotesk text-4xl font-medium">
		{m['home.bewijs_recent_blogs']()}
	</h2>

	<!-- Projecten grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each showcaseProjects as project (project.title)}
			<div class="flex flex-col gap-3">
				<h3 class="font-grotesk text-secondary-50 text-2xl font-medium">
					{project.title}
				</h3>
				<a
					href={resolve(project.link as `/${string}`)}
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

				<p class="text-secondary-200 text-base">
					{project.description}
				</p>
			</div>
		{/each}
	</div>
	<a
		href={resolve('/projects')}
		class="font-grotesk text-primary-300 hover:text-primary-200 mx-auto w-fit underline"
	>
		{m['home.bewijs_all_insights']()}
	</a>
</section>
