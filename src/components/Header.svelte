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

	// Sluit het mobiele menu wanneer er buiten geklikt wordt
	function closeMenu(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('nav') && !target.closest('.mobile-menu')) {
			isMenuOpen = false;
		}
	}

	// Sluit het mobiele menu wanneer een link wordt aangeklikt
	function handleLinkClick() {
		isMenuOpen = false;
	}
</script>

<header class="w-full bg-transparent">
	<nav class="wrapper flex items-center justify-between py-3">
		<!-- Logo en hoofdnavigatie -->
		<div class="flex flex-col items-center gap-x-6 sm:flex-row md:gap-x-10 lg:gap-x-14">
			<a
				href="/"
				class="font-grotesk text-secondary-50 flex items-center gap-x-2 px-4 text-lg font-medium"
			>
				<img src="/tandemIT.svg" alt="Tandem IT logo" width="32" height="32" />
				Tandem
			</a>

			<!-- Desktop navigatie -->
			<div class="hidden gap-x-6 md:flex lg:gap-x-8">
				{#each links as link}
					<a
						href={link.href}
						class="hover:text-secondary-50 font-medium duration-300"
						aria-current={link.href === '/' ? 'page' : undefined}
					>
						{link.name}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center">
			<!-- CTA Button -->
			<a href="/contact" class="button button-primary ml-4"> Contact </a>

			<!-- Mobiel menu knop -->
			<button
				onclick={() => (isMenuOpen = !isMenuOpen)}
				class="text-secondary-50 hover:bg-secondary-900/10 ml-4 rounded-sm p-2 md:hidden"
				aria-label="Toggle menu"
				aria-expanded={isMenuOpen}
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
		<button
			transition:fade={{ duration: 200 }}
			class="bg-secondary-900/50 fixed inset-0 z-50 backdrop-blur-xs md:hidden"
			onclick={closeMenu}
		>
			<div class="wrapper mobile-menu bg-secondary-800 mt-16 rounded-lg p-4">
				<ul class="space-y-4">
					{#each links as link (link.href)}
						<li>
							<a
								href={link.href}
								class="hover:text-secondary-50 block font-medium duration-300"
								onclick={handleLinkClick}
							>
								{link.name}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</button>
	{/if}
</header>
