<script lang="ts">
	import { onMount } from 'svelte';
	import Loading from '../../components/ui/Loading.svelte';

	interface Section {
		title: string;
		content: string;
		icon: string;
	}

	let Team: any = $state(null);
	let isTeamLoaded = $state(false);

	// Lazy load Team component
	onMount(async () => {
		try {
			const module = await import('../../components/Team.svelte') as any;
			Team = module.default;
			isTeamLoaded = true;
		} catch (error) {
			console.error('Failed to load Team component:', error);
		}
	});

	const sections: Section[] = [
		{
			title: 'Onze missie',
			content:
				'Bij Tandem IT geloven we in de kracht van samenwerking en innovatie. Onze missie is om organisaties te ondersteunen met flexibele, schaalbare en veilige IT-oplossingen zodat zij zich volledig kunnen richten op groei en ontwikkeling.',
			icon: '🎯'
		},
		{
			title: 'Onze aanpak',
			content:
				'Wij combineren technische expertise met een persoonlijke benadering. Door nauw samen te werken met onze klanten, ontwikkelen we op maat gemaakte oplossingen die perfect aansluiten op de specifieke uitdagingen van elke organisatie.',
			icon: '🤝'
		},
		{
			title: 'Onze doelen',
			content:
				'Ons doel is om een betrouwbare partner te zijn in de digitale transformatie. Wij streven ernaar om bedrijfsprocessen te optimaliseren, de beveiliging te verbeteren en innovatie binnen organisaties te stimuleren.',
			icon: '🎯'
		},
		{
			title: 'Onze visie',
			content:
				'Wij zien een toekomst waarin technologie niet slechts een ondersteunende rol speelt, maar de drijvende kracht is achter groei en maatschappelijke vooruitgang. Bij Tandem IT werken we aan een duurzame digitale wereld waarin iedereen profiteert van technologische vernieuwing.',
			icon: '🔭'
		},
		{
			title: 'Onze geschiedenis',
			content:
				'Tandem IT is ontstaan uit een passie voor technologie en de ambitie om echte verandering teweeg te brengen. Sinds onze oprichting hebben we samengewerkt met diverse organisaties, waarbij we onze kennis en ervaring inzetten om complexe IT-uitdagingen op te lossen.',
			icon: '📚'
		},
		{
			title: 'Ons team',
			content:
				'Ons team bestaat uit enthousiaste studenten met een passie voor IT. Samen werken we aan uitdagende projecten en innovatieve oplossingen. Door onze krachten te bundelen, kunnen we het maximale resultaat behalen voor onze klanten.',
			icon: '👥'
		}
	];

	let activeSection = $state<number | null>(null);
	let isAnimating = $state(false);

	function handleMouseEnter(index: number) {
		activeSection = index;
	}

	function handleMouseLeave() {
		activeSection = null;
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			activeSection = activeSection === index ? null : index;
		}
	}
</script>

<section class="bg-secondary-700 px-4 py-16">
	<div class="mx-auto max-w-7xl">
		<h1
			class="font-grotesk text-primary-300 hover:text-primary-200 mb-12 transform text-center
                       text-5xl font-semibold transition-all duration-500"
		>
			Wie zijn wij?
		</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each sections as section, index}
				<div
					class="group bg-secondary-600 hover:bg-secondary-500 relative transform overflow-hidden
                               rounded-xl p-6 transition-all duration-300
                               hover:scale-[1.02] hover:shadow-xl"
					onmouseenter={() => handleMouseEnter(index)}
					onmouseleave={handleMouseLeave}
					onkeydown={(e) => handleKeyDown(e, index)}
					role="button"
					tabindex="0"
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
						{section.title}
					</h2>

					<p
						class="text-secondary-100 group-hover:text-secondary-50
                                 transform leading-relaxed transition-all
                                 duration-300"
					>
						{section.content}
					</p>

					{#if activeSection === index}
						<div
							class="bg-primary-300 absolute bottom-0 left-0 h-1 w-full
                                      transform transition-all duration-300"
						></div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

{#if isTeamLoaded && Team}
	<Team />
{:else}
	<Loading message="Team laden..." />
{/if}
