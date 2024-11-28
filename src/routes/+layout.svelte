<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<Header />
<div class="min-h-height">
	{@render children()}
</div>
<Footer />
