<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	const links = [
		{ href: '/', name: 'Home' },
		{ href: '/#approach', name: 'Aanpak' },
		{ href: '/#mission', name: 'Missie' },
		{ href: '/#cases', name: 'Cases' },
		{ href: '/#insights', name: 'Insights' }
	];

	let isMenuOpen = false;
</script>

<header class="w-full">
	<nav class="wrapper flex items-center justify-between py-3">
		<!-- Logo en hoofdnavigatie -->
		<div class="flex flex-col items-center gap-x-6 sm:flex-row md:gap-x-10 lg:gap-x-14">
			<a
				href="/"
				class="flex items-center gap-x-2 px-4 font-grotesk text-lg font-medium text-secondary-50"
			>
				<img src="/tandemIT.svg" alt="Tandem IT logo" width="32" height="32" />
				Tandem
			</a>

			<!-- Desktop navigatie -->
			<div class="hidden gap-x-6 md:flex lg:gap-x-8">
				{#each links as link}
					<a href={link.href} class="font-medium duration-300 hover:text-secondary-50">
						{link.name}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center">
			<!-- CTA Button -->
			<a href="/#contact" class="button button-primary ml-4"> Contact </a>

			<!-- Mobiel menu knop -->
			<button
				onclick={() => (isMenuOpen = !isMenuOpen)}
				class="ml-4 rounded p-2 text-secondary-50 hover:bg-secondary-900/10 md:hidden"
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobiel menu -->
	{#if isMenuOpen}
		<div transition:fade={{ duration: 200 }} class="wrapper md:hidden">
			<ul class=" flex items-center justify-between gap-2 rounded-lg p-4">
				{#each links as link}
					<li>
						<a href={link.href} class="block font-medium duration-300 hover:text-secondary-50">
							{link.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</header>
