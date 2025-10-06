<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import ErrorBoundary from '../components/ui/ErrorBoundary.svelte';
	import Loading from '../components/ui/Loading.svelte';
	import { navigating } from '$app/stores';

	import '@fontsource/poppins';
	import '@fontsource-variable/space-grotesk';
</script>

<svelte:head>
	<!-- Preload critical images that are above the fold -->
	<link rel="preload" href="/tandemIT.svg" as="image" type="image/svg+xml">
	<link rel="preload" href="/Heading.svg" as="image" type="image/svg+xml">

	<!-- Resource hints for better performance -->
	<link rel="dns-prefetch" href="//githubusercontent.com">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
</svelte:head>

<ErrorBoundary>
	<div class="flex min-h-screen flex-col justify-between ">
		<Header />
		{#if $navigating}
			<div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
				<Loading size="lg" />
			</div>
		{/if}
		<div class="min-h-height">
			{@render children()}
		</div>
		<!-- For svelte routing to work correctly, add the pages you want to the page.svelte -->

		<Footer />
	</div>
</ErrorBoundary>

<!-- min-h-screen bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-900 flex items-center justify-center px-4 -->
