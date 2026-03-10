<script lang="ts">
	import { scrollTo } from '$lib/actions/scroll-to';
	import * as m from '$lib/paraglide/messages';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import Globe from '@tabler/icons-svelte/icons/globe';
	import IconRosetteDiscountCheck from '@tabler/icons-svelte/icons/rosette-discount-check';

	interface Objective {
		icon: typeof Globe; // Een van de iconen als type
		title: string;
		description: string;
	}

	const Objectives = $derived<Objective[]>([
		{
			icon: IconRosetteDiscountCheck,
			title: m['home.goals_goal_1'](),
			description: m['home.goals_goal_desc']()
		},
		{
			icon: IconRosetteDiscountCheck,
			title: m['home.goals_goal_2'](),
			description: m['home.goals_goal_desc']()
		},
		{
			icon: IconRosetteDiscountCheck,
			title: m['home.goals_goal_3'](),
			description: m['home.goals_goal_desc']()
		}
	]);
</script>

<section class="py-16">
	<div class="mx-auto min-h-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-12">
			<div class="relative lg:col-span-5">
				<div
					class="h-full w-full rounded-2xl bg-cover bg-center shadow-lg"
					style="background-image: url('/pattern.png');"
				></div>
			</div>

			<div class="lg:col-span-7">
				<button
					use:scrollTo={'mission'}
					class="subtitle text-primary-600 mb-3 inline-block rounded-full px-4 text-base font-semibold"
					aria-label={m['home.goals_scroll_mission_aria']()}
				>
					{m['home.goals_button']()}
				</button>
				<h2 class="mb-6 text-4xl font-bold lg:text-5xl dark:text-white">
					{m['home.goals_title']()}
				</h2>
				<h2 class="mb-6 text-xl font-bold lg:text-2xl">{m['home.goals_description']()}</h2>

				<div class="mb-10 grid gap-8 sm:grid-cols-2">
					{#each Objectives as { icon: Icon, title, description } (title)}
						<div class="bg-secondary-600 flex flex-col gap-x-4 rounded-2xl p-4">
							<div class="mt-1 flex shrink-0 gap-2">
								<Icon class="text-primary-600 h-7 w-7" aria-hidden="true" />
								<h3 class="text-xl font-semibold dark:text-white">{title}</h3>
							</div>
							<div>
								<p class="mt-2 text-base">{description}</p>
							</div>
						</div>
					{/each}
					<a class="bg-primary-300 flex flex-col justify-between rounded-2xl p-4" href="/contact">
						<h3 class="text-xl font-bold dark:text-black">{m['home.goals_cta_title']()}</h3>

						<p
							class="group inline-flex items-center p-2 text-xl underline transition dark:text-black"
							aria-label={m['home.goals_contact_aria']()}
						>
							{m['home.goals_cta_action']()}
							<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
						</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
