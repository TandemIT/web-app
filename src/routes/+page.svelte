<script lang="ts">
	import Enthousiast from '../components/Enthousiast.svelte';
	import Goals from '../components/Goals.svelte';
	import Aanpak from '../components/Aanpak.svelte';
	import Bewijs from '../components/Bewijs.svelte';
</script>

<!-- +page.svelte -->
<div class="relative flex min-h-[calc(100vh-4.35rem)] items-center">
	<div class="wrapper grid-cols-12 lg:grid">
		<div class="col-span-7">
			<h1 class="font-grotesk text-secondary-50 mb-4 text-6xl leading-tight font-medium">
				De partner voor infra- en security services door studenten.
			</h1>
			<p class="max-w-lg text-lg">
				Bij Tandem IT werken studenten aan uitdagende projecten in netwerkinfrastructuur en
				cyberbeveiliging. We ondersteunen scholen en organisaties zonder expertise of budget voor
				professionele diensten.
			</p>
			<div class="mt-7 flex items-center gap-x-3">
				<a href="/contact" class="button button-primary">Contacteer ons</a>
				<a href="/#cases" class="button button-secondary">Bekijk onze cases</a>
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
<Goals />
<Bewijs />
<!-- Devider for better viewing of the sections -->
<!-- <div class="h-1 min-w-full bg-secondary-50"></div> -->
