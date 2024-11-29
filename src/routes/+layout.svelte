<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Enthousiast from '../components/Enthousiast.svelte';
	import '@fontsource/poppins';
	import '@fontsource-variable/space-grotesk';
</script>

<Header />
<div class="min-h-height">
	{@render children()}
</div>
<Enthousiast />
<Footer />
