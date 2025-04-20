<script lang="ts">
	import {
		MessageSquareText,
		Map,
		Construction,
		Cog,
		Settings,
		Rocket,
		Puzzle,
		Code2,
		Milestone
	} from 'lucide-svelte';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';

	interface Process {
		icon: any;
		title: string;
		description: string;
	}

	// Process Steps
	const processes: Process[] = [
		{
			icon: MessageSquareText,
			title: 'De hoofdvraag begrijpen',
			description:
				'We beginnen met een grondige analyse van uw vraagstuk. Door goed te luisteren en de juiste vragen te stellen, krijgen we een helder beeld van uw behoeften en doelstellingen.'
		},
		{
			icon: Map,
			title: 'De oplossing in kaart brengen',
			description:
				'Op basis van onze analyse ontwikkelen we een plan van aanpak. We maken gebruik van moderne technologieën en methodieken om tot de beste oplossing te komen.'
		},
		{
			icon: Rocket,
			title: 'De oplossing implementeren',
			description:
				'Met ons scrum-team werken we iteratief aan de implementatie. Door korte sprints en regelmatige feedback zorgen we voor een resultaat dat perfect aansluit bij uw wensen.'
		}
	];

	// Icons Array (currently unused but kept for potential future use)
	const icons = [
		Milestone,
		Cog,
		Settings,
		Rocket,
		Puzzle,
		Code2,
		Construction,
		Map,
		MessageSquareText
	];

	// Smooth scroll to a section
	function scrollToSection(id: string) {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- Hero Section -->
<section class="relative mb-20 min-h-screen pt-20">
	<div class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
		<div class="relative z-10">
			<button
				class="subtitle text-primary-500 mb-6 inline-block rounded-full px-4 py-1 text-sm font-semibold"
				onclick={() => scrollToSection('aanpak')}
			>
				Onze aanpak
			</button>
			<div class="relative">
				<h1
					class="font-grotesk text-secondary-50 mb-6 max-w-3xl text-5xl leading-tight font-medium lg:text-6xl"
				>
					Een effectieve organisatie dankzij onze scrum-aanpak.
				</h1>
				<p class="text-secondary-200 max-w-lg text-lg">
					Bij Tandem IT geloven we in de kracht van agile ontwikkeling. Door onze scrum-aanpak
					kunnen we flexibel inspelen op veranderende behoeften en leveren we consequent
					hoogwaardige resultaten die aansluiten bij uw doelstellingen.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Process Section -->
<section class="relative min-h-screen" id="aanpak">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col gap-20 lg:flex-row lg:gap-24">
			<!-- Left Column: Process Steps -->
			<div class="relative flex flex-col gap-16 lg:w-1/2">
				{#each processes as process}
					<div class="border-secondary-50 relative flex rounded-xl border-2 bg-transparent p-6">
						<!-- Icon -->
						<div class="text-secondary-50 mr-6 shrink-0">
							<svelte:component this={process.icon} size={40} />
						</div>

						<!-- Content -->
						<div>
							<h2 class="text-secondary-50 mb-3 text-xl font-bold lg:text-2xl">
								{process.title}
							</h2>
							<p class="text-secondary-200">
								{process.description}
							</p>
						</div>
					</div>
				{/each}
			</div>

			<!-- Right Column: Content -->
			<div class="lg:w-1/2">
				<div class="top-24">
					<button
						class="subtitle text-primary-500 mb-2 inline-block rounded-full px-4 py-1 text-sm font-semibold"
						onclick={() => scrollToSection('aanpak')}
					>
						Onze aanpak
					</button>
					<h2 class="text-secondary-50 mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
						Van een vraag naar een doordachte oplossing.
					</h2>
					<p class="text-secondary-200 mb-8 text-lg">
						Onze aanpak is gebaseerd op jaren ervaring in software ontwikkeling en
						projectmanagement. We combineren de flexibiliteit van scrum met de stabiliteit van
						bewezen ontwikkelmethoden. Dit stelt ons in staat om complexe vraagstukken te vertalen
						naar effectieve oplossingen die direct waarde toevoegen aan uw organisatie.
					</p>
					<a href="/contact" class=" group inline-flex items-center underline">
						Neem contact op
						<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
