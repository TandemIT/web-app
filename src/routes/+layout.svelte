<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	import '@fontsource/poppins';
	import '@fontsource-variable/space-grotesk';
</script>

<div class="flex min-h-screen flex-col justify-between ">
	<Header />
	<div class="min-h-height">
		{@render children()}
	</div>
	<!-- For svelte routing to work correctly, add the pages you want to the page.svelte -->

	<Footer />
</div>

<!-- min-h-screen bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-900 flex items-center justify-center px-4 -->
