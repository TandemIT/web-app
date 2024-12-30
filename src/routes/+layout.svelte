<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Enthousiast from '../components/Enthousiast.svelte';
	import Aanpak from '../components/Aanpak.svelte';
	import '@fontsource/poppins';
	import '@fontsource-variable/space-grotesk';
</script>

<Header />
<div class="min-h-height">
	{@render children()}
</div>
<Enthousiast />
<div class="wrapper">
	<img src="/Team.png" alt="Tandem IT Team" width="1640" height="688" class="relative -mt-20" />
</div>
<Aanpak />
<Footer />
