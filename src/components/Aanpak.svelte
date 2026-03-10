<script lang="ts">
	import { scrollTo } from '$lib/actions/scroll-to';
	import * as m from '$lib/paraglide/messages';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import { Map, MessageSquareText, Rocket } from 'lucide-svelte';

	interface Process {
		icon: any;
		title: string;
		description: string;
	}

	// Process Steps
	const processes = $derived<Process[]>([
		{
			icon: MessageSquareText,
			title: m['home.aanpak_process_1_title'](),
			description: m['home.aanpak_process_1_desc']()
		},
		{
			icon: Map,
			title: m['home.aanpak_process_2_title'](),
			description: m['home.aanpak_process_2_desc']()
		},
		{
			icon: Rocket,
			title: m['home.aanpak_process_3_title'](),
			description: m['home.aanpak_process_3_desc']()
		}
	]);

</script>

<!-- Hero Section -->
<section class="relative mb-20 min-h-screen pt-20">
	<div class="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
		<div class="relative z-10">
			<button
				class="subtitle text-primary-500 mb-6 inline-block rounded-full px-4 py-1 text-sm font-semibold"
				use:scrollTo={'aanpak'}
			>
				{m['home.aanpak_button']()}
			</button>
			<div class="relative">
				<h1
					class="font-grotesk text-secondary-50 mb-6 max-w-3xl text-5xl leading-tight font-medium lg:text-6xl"
				>
					{m['home.aanpak_title']()}
				</h1>
				<p class="text-secondary-200 max-w-lg text-lg">
					{m['home.aanpak_intro']()}
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
				{#each processes as process (process.title)}
					{@const ProcessIcon = process.icon}
					<div class="border-secondary-50 relative flex rounded-xl border-2 bg-transparent p-6">
						<!-- Icon -->
						<div class="text-secondary-50 mr-6 shrink-0">
							<ProcessIcon size={40} />
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
						use:scrollTo={'aanpak'}
					>
						{m['home.aanpak_button']()}
					</button>
					<h2 class="text-secondary-50 mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
						{m['home.aanpak_secondary_title']()}
					</h2>
					<p class="text-secondary-200 mb-8 text-lg">
						{m['home.aanpak_secondary_desc']()}
					</p>
					<a href="/contact" class=" group inline-flex items-center underline">
						{m['home.aanpak_contact']()}
						<ArrowRight class="transition group-hover:translate-x-0.5" aria-hidden="true" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
