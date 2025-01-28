<script lang="ts">
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import Globe from '@tabler/icons-svelte/icons/globe';
	// import Lightbulb from '@tabler/icons-svelte/icons/bulb';
	// import Tools from '@tabler/icons-svelte/icons/tools';
	// import People from '@tabler/icons-svelte/icons/users';
	import IconRosetteDiscountCheck from '@tabler/icons-svelte/icons/rosette-discount-check';

	interface Objective {
		icon: typeof Globe; // Een van de iconen als type
		title: string;
		description: string;
	}

	const Objectives: Objective[] = [
		{
			icon: IconRosetteDiscountCheck,
			title: 'Personal Goal 1',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			icon: IconRosetteDiscountCheck,
			title: 'Personal Goal 2',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			icon: IconRosetteDiscountCheck,
			title: 'Personal Goal 3',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		}
		// {
		// 	icon: IconRosetteDiscountCheck,
		// 	title: 'Laten we kennis maken',
		// 	description:
		// 		'Onze projecten zijn gericht op duurzame, schaalbare oplossingen die waarde toevoegen aan de toekomst.'
		// }
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
	<div class="mx-auto min-h-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-12">
			<!-- Linker kolom met afbeelding -->
			<div class="relative lg:col-span-5">
				<div
					class="h-full w-full rounded-2xl bg-cover bg-center shadow-lg"
					style="background-image: url('/pattern.png');"
				></div>
			</div>

			<!-- Rechter kolom met content -->
			<div class="lg:col-span-7">
				<button
					onclick={() => scrollToSection('mission')}
					class="subtitle text-primary-600 mb-3 inline-block rounded-full px-4 text-sm font-semibold"
					aria-label="Scroll naar onze missie"
				>
					Onze missie
				</button>
				<h2 class="mb-6 text-4xl font-bold lg:text-5xl dark:text-white">Onze missie:</h2>
				<h2 class="mb-6 text-xl font-bold lg:text-2xl">Missie beschrijving</h2>

				<div class="mb-10 grid gap-8 sm:grid-cols-2">
					{#each Objectives as { icon: Icon, title, description }}
						<div class="flex flex-col gap-x-4 rounded-2xl bg-secondary-600 p-4">
							<div class="mt-1 flex flex-shrink-0 gap-2">
								<Icon class="text-primary-600 h-7 w-7" aria-hidden="true" />
								<h3 class="text-lg font-semibold dark:text-white">{title}</h3>
							</div>
							<div>
								<p class="mt-2 text-sm">{description}</p>
							</div>
						</div>
					{/each}
					<div class="flex flex-col justify-between rounded-2xl bg-primary-300 p-4">
						<h3 class="text-2xl font-bold dark:text-black">Laten we kennis maken</h3>

						<!-- Call-to-action knoppen -->
						<a
							href="/contact"
							class="group inline-flex items-center p-2 text-sm underline transition dark:text-black"
							aria-label="Neem contact op"
						>
							Neem contact op
							<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
