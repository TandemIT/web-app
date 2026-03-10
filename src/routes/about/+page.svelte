<script lang="ts">
	import { getAboutSectionContent, getAboutSectionTitle } from '$lib/content/about';
	import * as m from '$lib/paraglide/messages';
	import type { Component } from 'svelte';
	import { onMount } from 'svelte';
	import Loading from '$components/ui/Loading.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let Team = $state<Component<{ teamMembers: PageData['teamMembers'] }> | null>(null);
	let isTeamLoaded = $state(false);

	// Lazy load Team component
	onMount(async () => {
		try {
			const module = await import('$components/Team.svelte');
			Team = module.default;
			isTeamLoaded = true;
		} catch (error) {
			console.error('Failed to load Team component:', error);
		}
	});

	let activeSection = $state<number | null>(null);

	function getSectionTitle(sectionId: string) {
		return getAboutSectionTitle(m, sectionId);
	}

	function getSectionContent(sectionId: string) {
		return getAboutSectionContent(m, sectionId);
	}

	function handleMouseEnter(index: number) {
		activeSection = index;
	}

	function handleMouseLeave() {
		activeSection = null;
	}
</script>

<section class="bg-secondary-700 px-4 py-16">
	<div class="mx-auto max-w-7xl">
		<h1
			class="font-grotesk text-primary-300 hover:text-primary-200 mb-12 transform text-center
                       text-5xl font-semibold transition-all duration-500"
		>
			{m['about.page_title']()}
		</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each data.sections as section, index (section.id)}
				<article
					class="group bg-secondary-600 hover:bg-secondary-500 relative transform overflow-hidden
                               rounded-xl p-6 transition-all duration-300
                               hover:scale-[1.02] hover:shadow-xl"
					onmouseenter={() => handleMouseEnter(index)}
					onmouseleave={handleMouseLeave}
				>
					<div
						class="absolute top-4 right-4 transform text-2xl
                                   opacity-70 transition-all duration-300
                                   group-hover:scale-125 group-hover:opacity-100"
					>
						{section.icon}
					</div>

					<h2
						class="text-primary-300 font-grotesk group-hover:text-primary-200 mb-4 transform
                                  text-2xl font-medium transition-all
                                  duration-300"
					>
						{getSectionTitle(section.id)}
					</h2>

					<p
						class="text-secondary-100 group-hover:text-secondary-50
                                 transform leading-relaxed transition-all
                                 duration-300"
					>
						{getSectionContent(section.id)}
					</p>

					{#if activeSection === index}
						<div
							class="bg-primary-300 absolute bottom-0 left-0 h-1 w-full
                                      transform transition-all duration-300"
						></div>
					{/if}
				</article>
			{/each}
		</div>
	</div>
</section>

{#if isTeamLoaded && Team}
	<Team teamMembers={data.teamMembers} />
{:else}
	<Loading message={m['about.team_loading']()} />
{/if}
