<script lang="ts">
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import Check from '@tabler/icons-svelte/icons/check';
	import Users from '@tabler/icons-svelte/icons/users';
	import Code from '@tabler/icons-svelte/icons/code';
	import Rocket from '@tabler/icons-svelte/icons/rocket';
	import BrandGithub from '@tabler/icons-svelte/icons/brand-github';

	interface Feature {
		icon: typeof Check;
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

	// const stats = [
	// 	{ number: '20+', label: 'Actieve studenten' },
	// 	{ number: '15+', label: 'Afgeronde projecten' },
	// 	{ number: '8+', label: 'Tevreden klanten' },
	// 	{ number: '4.9', label: 'Gemiddelde waardering' }
	// ];
</script>

<section class="bg-neutral-50 pb-36 pt-16 text-neutral-800">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-12">
			<!-- Linker kolom met afbeelding en statistieken -->
			<div class="relative min-h-full lg:col-span-4">
				<div class=" top-8 h-full w-full rounded-2xl bg-cover bg-center">
					<!-- We kunnen met cijfers werken XD -->
					<!-- <h3 class="mb-6 text-lg font-semibold text-blue-900">Onze impact in cijfers</h3> -->
					<div class="relative mb-8 h-full w-full rounded-2xl p-6">
						<div
							class="absolute inset-0 h-full w-full rounded"
							style="
								background-image: url('/pattern.png');
								background-size: cover;
								background-position: center;
								background-repeat: no-repeat;"
						></div>
						<!-- <div class="relative z-10">
							<div class="grid grid-cols-2 gap-4">
								{#each stats as { number, label }}
									<div class="rounded-lg bg-white p-4 shadow-sm">
										<p class="text-2xl font-bold text-blue-600">{number}</p>
										<p class="text-sm text-neutral-600">{label}</p>
									</div>
								{/each}
							</div>
						</div> -->
					</div>
				</div>
			</div>

			<!-- Rechter kolom met content -->
			<div class="lg:col-span-7 lg:col-start-6">
				<div
					class="mb-2 inline-block rounded-full subtitle  bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800"
				>
					Over ons
				</div>
				<h2 class="mb-6 text-4xl font-bold tracking-tight text-neutral-900 lg:text-5xl">
					Een hecht team van enthousiaste HBO-ICT studenten
				</h2>
				<p class="mb-8 text-lg text-neutral-600">
					Bij Tandem IT combineren we theoretische kennis met praktische ervaring. Als
					studentbedrijf van de Hogeschool Utrecht werken we aan real-world projecten onder
					begeleiding van ervaren professionals. Onze unieke positie stelt ons in staat om
					innovatieve oplossingen te bieden tegen studentvriendelijke tarieven.
				</p>

				<div class="mb-12 grid gap-8 sm:grid-cols-2">
					{#each features as { icon: Icon, title, description }}
						<div class="flex gap-x-3">
							<div class="mt-1 flex-shrink-0">
								<Icon class="h-6 w-6 text-blue-600" />
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
					klanten, terwijl we studenten de kans geven om praktijkervaring op te doen in een
					professionele omgeving. We geloven in de kracht van jong talent en innovatie, ondersteund
					door gedegen begeleiding en moderne ontwikkelmethoden.
				</p>

				<div class="flex gap-4">
					<a
						href="/contact"
						class="group inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
					>
						Neem contact op
						<ArrowRight class="transition group-hover:translate-x-0.5" />
					</a>
					<a
						href="/projecten"
						class="inline-flex items-center gap-x-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
					>
						Bekijk projecten
						<ArrowRight />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
