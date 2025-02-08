<script lang="ts">
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import Users from '@tabler/icons-svelte/icons/users';
	import Code from '@tabler/icons-svelte/icons/code';
	import Rocket from '@tabler/icons-svelte/icons/rocket';
	import BrandGithub from '@tabler/icons-svelte/icons/brand-github';

	interface Feature {
		icon: typeof Users; // Gebruik een van de iconen als type
		title: string;
		description: string;
	}

	const features: Feature[] = [
		{
			icon: Users,
			title: 'Student-gedreven',
			description:
				'Een jong en dynamisch team van HBO-ICT studenten met frisse ideeën en moderne technische kennis.'
		},
		{
			icon: Code,
			title: 'Technisch onderlegd',
			description:
				'Expertise in moderne frameworks zoals React, Svelte, Node.js en expertise in cloud-oplossingen.'
		},
		{
			icon: Rocket,
			title: 'Innovatief',
			description:
				'Focus op cutting-edge technologieën en moderne ontwikkelmethoden voor toekomstbestendige oplossingen.'
		},
		{
			icon: BrandGithub,
			title: 'Open source',
			description:
				'Actieve bijdrage aan open source projecten en gebruik van best practices in softwareontwikkeling.'
		}
	];

	// Smooth scroll naar de 'about' sectie
	function goAbout() {
		window.open('/about', '_self');
	}
</script>

<section class="pt-16 pb-36 dark:bg-neutral-50 dark:text-neutral-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-12">
			<!-- Linker kolom met afbeelding en statistieken -->
			<div class="relative min-h-full lg:col-span-4">
				<div class="top-8 h-full w-full rounded-2xl bg-cover bg-center">
					<div class="relative mb-8 h-full w-full rounded-2xl p-6">
						<div
							class="absolute inset-0 h-full w-full rounded-sm"
							style="
								background-image: url('/pattern.png');
								background-size: cover;
								background-position: center;
								background-repeat: no-repeat;"
						></div>
					</div>
				</div>
			</div>

			<!-- Rechter kolom met content -->
			<div class="lg:col-span-7 lg:col-start-6">
				<button
					on:click={goAbout}
					class="subtitle text-primary-500 hover:bg-primary-50 mb-2 inline-block rounded-full px-4 py-1 text-sm font-semibold transition"
					aria-label="Scroll naar de Over ons sectie"
				>
					Over ons
				</button>
				<h2 class="mb-6 text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl">
					Een hecht team van enthousiaste HBO-ICT studenten
				</h2>
				<p class="mb-8 text-lg text-neutral-600">
					Bij Tandem IT combineren we theoretische kennis met praktische ervaring. Als
					studentbedrijf van de Hogeschool Utrecht werken we aan real-world projecten onder
					begeleiding van ervaren professionals. Onze unieke positie stelt ons in staat om
					innovatieve oplossingen te bieden tegen studentvriendelijke tarieven.
				</p>

				<!-- Features grid -->
				<div class="mb-12 grid gap-8 sm:grid-cols-2">
					{#each features as { icon: Icon, title, description }}
						<div class="flex gap-x-3">
							<div class="mt-1 shrink-0">
								<Icon class="text-primary-600 h-6 w-6" aria-hidden="true" />
							</div>
							<div>
								<h3 class="font-semibold text-neutral-900">{title}</h3>
								<p class="mt-2 text-neutral-600">{description}</p>
							</div>
						</div>
					{/each}
				</div>

				<p class="mb-8 text-neutral-600">
					Onze missie is het bieden van hoogwaardige IT-oplossingen die het verschil maken voor onze
					klanten, terwijl wij als studenten de kans krijgen om praktijkervaring op te doen in een
					professionele omgeving.
				</p>

				<!-- Call-to-action knoppen -->
				<div class="flex justify-between">
					<a
						href="/about"
						class="group text-secondary-600 right-auto left-0 inline-flex items-center rounded-lg text-sm font-semibold underline transition"
						aria-label="Lees meer"
					>
						Lees meer
						<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
					</a>
					<a
						href="/contact"
						class="group text-secondary-600 right-0 left-auto inline-flex items-center rounded-lg text-sm font-semibold underline transition"
						aria-label="Neem contact op"
					>
						Neem contact op
						<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
