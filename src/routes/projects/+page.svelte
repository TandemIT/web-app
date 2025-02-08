<script lang="ts">
	// import type { PageData } from './$types';

	// let { data }: { data: PageData } = $props();

	import Makecenter from '../../components/projects/Makecenter.svelte';
	import Makerspace from '../../components/projects/Makerspace.svelte';
</script>

<section class="relative flex min-h-[calc(100vh-4.35rem)] flex-col overflow-hidden">
	<Makerspace />
</section>
<section class="relative flex min-h-[calc(100vh-4.35rem)] flex-col overflow-hidden">
	<Makecenter />
</section>
