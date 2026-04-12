<script lang="ts">
	import Aanpak from '$components/Aanpak.svelte';
	import Bewijs from '$components/Bewijs.svelte';
	import Enthousiast from '$components/Enthousiast.svelte';
	import Goals from '$components/Goals.svelte';
	import Button from '$components/ui/Button.svelte';
	import Heading from '$components/ui/Heading.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<main>
	<section
		class="relative flex min-h-[calc(100vh-4.35rem)] items-center"
		aria-label="Homepage hero"
	>
		<div class="wrapper grid-cols-12 lg:grid">
			<div class="col-span-7">
				<Heading level={1} variant="hero" class="mb-4">
					{m['home.hero_title']()}
				</Heading>
				<p class="max-w-lg text-lg">
					{m['home.hero_description']()}
				</p>
				<div class="mt-7 flex items-center gap-x-3">
					<Button variant="primary" href="/contact">{m['home.cta_contact']()}</Button>
					<Button variant="secondary" href="/#cases" scrollTarget="cases">
						{m['home.cta_cases']()}
					</Button>
				</div>
			</div>
		</div>
		<img
			src="/Heading.svg"
			alt="Tandem IT logo"
			width="1542"
			height="914"
			class=" overflow-invisible absolute inset-y-0 right-0 bottom-0 -z-10 h-auto w-3/4 origin-bottom-right object-contain"
		/>
	</section>

	<!-- Other section, this will make sense for the routing in sveltekit -->
	<Enthousiast />
	<div class="wrapper">
		<img
			src="/Team.png"
			alt="Tandem IT Team"
			width="1640"
			height="688"
			class="relative -mt-20"
		/>
	</div>

	<Aanpak />
	<Goals />
	<Bewijs />
</main>
