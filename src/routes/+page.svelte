<script lang="ts">
	import { browser } from '$app/environment';
	import Enthousiast from '../components/Enthousiast.svelte';
	import Goals from '../components/Goals.svelte';
	import Aanpak from '../components/Aanpak.svelte';
	import Bewijs from '../components/Bewijs.svelte';
	import Button from '../components/ui/Button.svelte';
	import Heading from '../components/ui/Heading.svelte';

	// Handle smooth scrolling for anchor links
	function handleScrollToSection(event: MouseEvent, sectionId: string) {
		if (!browser) return;

		event.preventDefault();
		const element = document.getElementById(sectionId);

		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
</script>

<!-- +page.svelte -->
<div class="relative flex min-h-[calc(100vh-4.35rem)] items-center">
	<div class="wrapper grid-cols-12 lg:grid">
		<div class="col-span-7">
			<Heading level={1} variant="hero" class="mb-4">
				De partner voor infra- en security services door studenten.
			</Heading>
			<p class="max-w-lg text-lg">
				Bij Tandem IT werken studenten aan uitdagende projecten in netwerkinfrastructuur en
				cyberbeveiliging. We ondersteunen scholen en organisaties zonder expertise of budget voor
				professionele diensten.
			</p>
			<div class="mt-7 flex items-center gap-x-3">
				<Button variant="primary" href="/contact">Contacteer ons</Button>
				<Button
					variant="secondary"
					onclick={(e: MouseEvent) => handleScrollToSection(e, 'cases')}
				>
					Bekijk onze cases
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
</div>

<!-- Other section, this will make sense for the routing in sveltekit -->
<Enthousiast />
<div class="wrapper">
	<img src="/Team.png" alt="Tandem IT Team" width="1640" height="688" class="relative -mt-20" />
</div>

	<Aanpak />
	<!-- <div class="h-1 min-w-full bg-secondary-50"></div> -->
	<Goals />
	<!-- <div class="h-1 min-w-full bg-secondary-50"></div> -->
	<Bewijs />
	<!-- Devider for better viewing of the sections -->
