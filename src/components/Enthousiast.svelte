<script lang="ts">
	import { resolve } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import BrandGithub from '@tabler/icons-svelte/icons/brand-github';
	import Code from '@tabler/icons-svelte/icons/code';
	import Rocket from '@tabler/icons-svelte/icons/rocket';
	import Users from '@tabler/icons-svelte/icons/users';

	interface Feature {
		icon: typeof Users; // Gebruik een van de iconen als type
		title: string;
		description: string;
	}

	const features = $derived<Feature[]>([
		{
			icon: Users,
			title: m['home.enthousiast_feature_student'](),
			description: m['home.enthousiast_feature_student_desc']()
		},
		{
			icon: Code,
			title: m['home.enthousiast_feature_technical'](),
			description: m['home.enthousiast_feature_technical_desc']()
		},
		{
			icon: Rocket,
			title: m['home.enthousiast_feature_innovative'](),
			description: m['home.enthousiast_feature_innovative_desc']()
		},
		{
			icon: BrandGithub,
			title: m['home.enthousiast_feature_open_source'](),
			description: m['home.enthousiast_feature_open_source_desc']()
		}
	]);
</script>

<section id="missie" class="bg-secondary-50 text-secondary-700 pt-16 pb-36">
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
				<a
					href={resolve('/about')}
					class="subtitle text-primary-500 hover:bg-primary-50 mb-2 inline-block rounded-full px-4 py-1 text-sm font-semibold transition"
					aria-label={m['home.enthousiast_go_about_aria']()}
				>
					{m['home.enthousiast_button']()}
				</a>
				<h2 class="text-secondary-800 mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
					{m['home.enthousiast_title']()}
				</h2>
				<p class="text-secondary-600 mb-8 text-lg">
					{m['home.enthousiast_intro']()}
				</p>

				<!-- Features grid -->
				<div class="mb-12 grid gap-8 sm:grid-cols-2">
					{#each features as { icon: Icon, title, description } (title)}
						<div class="flex gap-x-3">
							<div class="mt-1 shrink-0">
								<Icon class="text-primary-600 h-6 w-6" aria-hidden="true" />
							</div>
							<div>
								<h3 class="text-secondary-800 text-lg font-semibold">{title}</h3>
								<p class="text-secondary-600 mt-2 text-base">{description}</p>
							</div>
						</div>
					{/each}
				</div>

				<p class="text-secondary-600 mb-8">
					{m['home.enthousiast_mission']()}
				</p>

				<!-- Call-to-action -->
				<a
					href={resolve('/about')}
					class="group text-secondary-600 inline-flex items-center rounded-lg text-base font-semibold underline transition"
					aria-label={m['home.enthousiast_read_more_aria']()}
				>
					{m['home.enthousiast_read_more']()}
					<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</section>
