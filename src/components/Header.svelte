<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import Button from './ui/Button.svelte';
	import { navigation } from '$lib/stores/navigation';

	// Destructure the stores we need
	$: isMenuOpen = navigation.isMenuOpen;
	$: isActiveLink = navigation.isActiveLink;

	// Sluit het mobiele menu wanneer er buiten geklikt wordt
	function closeMenu(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('nav') && !target.closest('.mobile-menu')) {
			navigation.closeMenu();
		}
	}
</script>

<header class="w-full bg-transparent">
	<nav class="wrapper flex items-center justify-between py-3">
		<!-- Logo en hoofdnavigatie -->
		<div class="flex flex-col items-center gap-x-6 sm:flex-row md:gap-x-10 lg:gap-x-14">
			<a
				href="/"
				data-sveltekit-preload-data="hover"
				class="font-grotesk text-secondary-50 flex items-center gap-x-2 px-4 text-lg font-medium"
			>
				<img src="/tandemIT.svg" alt="Tandem IT logo" width="32" height="32" />
				Tandem
			</a>

			<!-- Desktop navigatie -->
			<div class="hidden gap-x-6 md:flex lg:gap-x-8">
				{#each navigation.links as link}
					<a
						href={link.href}
						data-sveltekit-preload-data="hover"
						class="font-medium duration-300 {$isActiveLink(link)
							? 'text-primary-300 border-b-2 border-primary-300'
							: 'hover:text-secondary-50'}"
						aria-current={$isActiveLink(link) ? 'page' : undefined}
						onclick={(e) => navigation.handleNavClick(e, link.href)}
					>
						{link.name}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center">
			<!-- CTA Button -->
			<Button variant="primary" href="/contact" data-sveltekit-preload-data="hover" class="ml-4">Contact</Button>
		<!-- Mobiel menu knop -->
		<button
			onclick={() => navigation.toggleMenu()}
			class="text-secondary-50 hover:bg-secondary-900/10 ml-4 rounded-sm p-2 md:hidden"
			aria-label="Toggle menu"
			aria-expanded={$isMenuOpen}
		>
			{#if $isMenuOpen}
				<X class="h-6 w-6" />
			{:else}
				<Menu class="h-6 w-6" />
			{/if}
		</button>
		</div>
	</nav>

	<!-- Mobiel menu -->
	{#if $isMenuOpen}
		<button
			transition:fade={{ duration: 200 }}
			class="bg-secondary-900/50 fixed inset-0 z-50 backdrop-blur-xs md:hidden"
			onclick={closeMenu}
		>
			<div class="wrapper mobile-menu bg-secondary-800 mt-16 rounded-lg p-4">
				<ul class="space-y-4">
					{#each navigation.links as link (link.href)}
						<li>
							<a
								href={link.href}
								data-sveltekit-preload-data="hover"
								class="block font-medium duration-300 {$isActiveLink(link)
									? 'text-primary-300'
									: 'hover:text-secondary-50'}"
								onclick={(e) => navigation.handleNavClick(e, link.href)}
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

