<script lang="ts">
	// import type { PageData } from './$types';

	// let { data }: { data: PageData } = $props();

	import Makecenter from '$components/projects/Makecenter.svelte';
	import Makerspace from '$components/projects/Makerspace.svelte';
</script>

<main>
	<h1 class="sr-only">Projects</h1>
	<section
		class="relative flex min-h-[calc(100vh-4.35rem)] flex-col overflow-hidden"
		aria-labelledby="makerspace-title"
	>
		<Makerspace />
	</section>
	<section
		class="relative flex min-h-[calc(100vh-4.35rem)] flex-col overflow-hidden"
		aria-labelledby="makecenter-title"
	>
		<Makecenter />
	</section>
</main>
