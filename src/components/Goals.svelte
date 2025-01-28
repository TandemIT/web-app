<script lang="ts">
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import Globe from '@tabler/icons-svelte/icons/globe';
	import Lightbulb from '@tabler/icons-svelte/icons/bulb';
	import Tools from '@tabler/icons-svelte/icons/tools';
	import People from '@tabler/icons-svelte/icons/users';

	interface Objective {
		icon: typeof Globe; // Een van de iconen als type
		title: string;
		description: string;
	}

	const Objectives: Objective[] = [
		{
			icon: People,
			title: 'Samenwerking centraal',
			description:
				'Een team dat bouwt op sterke samenwerking, transparante communicatie en gezamenlijke groei.'
		},
		{
			icon: Tools,
			title: 'Praktische expertise',
			description:
				'We combineren technische vaardigheden met een hands-on aanpak voor effectieve oplossingen.'
		},
		{
			icon: Lightbulb,
			title: 'Innovatie in actie',
			description:
				'Wij omarmen nieuwe technologieën en creatieve ideeën om grenzen te verleggen en impact te maken.'
		},
		{
			icon: Globe,
			title: 'Duurzaam en toekomstgericht',
			description:
				'Onze projecten zijn gericht op duurzame, schaalbare oplossingen die waarde toevoegen aan de toekomst.'
		}
	];

	// Functie om soepel naar een sectie te scrollen
	function scrollToSection(id: string) {
		const section = document.getElementById(id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<section class="py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-full">
		<div class="grid gap-10 lg:grid-cols-12">
			<!-- Linker kolom met afbeelding -->
			<div class="relative lg:col-span-5">
				<div class="h-full w-full rounded-2xl bg-cover bg-center shadow-lg"
					style="background-image: url('/pattern.png');">
				</div>
			</div>

			<!-- Rechter kolom met content -->
			<div class="lg:col-span-7">
				<button
					onclick={() => scrollToSection('about')}
					class="subtitle mb-3 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-semibold text-primary-600 hover:bg-primary-100"
					aria-label="Scroll naar Over ons"
				>
					Over ons
				</button>
				<h2 class="mb-6 text-4xl font-bold  lg:text-5xl">
					Wat drijft ons
				</h2>

				<div class="mb-10 grid gap-8 sm:grid-cols-2">
					{#each Objectives as { icon: Icon, title, description }}
						<div class="flex gap-x-4">
							<div class="mt-1 flex-shrink-0">
								<Icon class="text-primary-600 h-7 w-7" aria-hidden="true" />
							</div>
							<div>
								<h3 class="text-lg font-semibold ">{title}</h3>
								<p class="mt-2 text-sm ">{description}</p>
							</div>
						</div>
					{/each}
				</div>

				<div class="flex gap-4">
					<a
						href="/contact"
						class="group inline-flex items-center gap-x-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold  shadow-md hover:bg-primary-700"
						aria-label="Neem contact op"
					>
						Neem contact op
						<ArrowRight class="transition group-hover:translate-x-1" aria-hidden="true" />
					</a>
					<a
						href="/projecten"
						class="inline-flex items-center gap-x-2 rounded-lg border  px-6 py-3 text-sm font-semibold  hover:"
						aria-label="Bekijk projecten"
					>
						Bekijk projecten
						<ArrowRight aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
