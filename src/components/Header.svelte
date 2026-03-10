<script lang="ts">
	import { page } from '$app/state';
	import { scrollTo } from '$lib/actions/scroll-to';
	import * as m from '$lib/paraglide/messages';
	import { navigation } from '$lib/stores/navigation';
	import { Menu, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from './ui/Button.svelte';

	const isMenuOpen = navigation.isMenuOpen;
	const isActiveLink = navigation.isActiveLink;

	function closeMenu() {
		navigation.closeMenu();
	}

	function handleNavClick() {
		navigation.closeMenu();
	}

	$effect(() => {
		navigation.setCurrentPath(page.url.pathname);

		if (page.url.pathname !== '/') {
			navigation.setActiveSection(null);
		}
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				let hasActiveSection = false;

				for (const entry of entries) {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						navigation.setActiveSection(entry.target.id);
						hasActiveSection = true;
					}
				}

				if (!hasActiveSection) {
					navigation.setActiveSection(null);
				}
			},
			{ threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
		);

		for (const section of document.querySelectorAll('#aanpak, #missie, #cases')) {
			observer.observe(section);
		}

		return () => observer.disconnect();
	});

	function getLinkLabel(link: { href: string; id: string | null }) {
		if (link.id === 'aanpak') return m['nav.approach']();
		if (link.id === 'missie') return m['nav.mission']();
		if (link.id === 'cases') return m['nav.cases']();
		if (link.href === '/about') return m['nav.about']();
		return m['nav.home']();
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
				<img src="/tandemIT.svg" alt={m['nav.logo_alt']()} width="32" height="32" />
				{m['common.tandem']()}
			</a>

			<!-- Desktop navigatie -->
			<div class="hidden gap-x-6 md:flex lg:gap-x-8">
				{#each navigation.links as link (link.href)}
					<a
						href={link.href}
						data-sveltekit-preload-data="hover"
						class="font-medium duration-300 {$isActiveLink(link)
							? 'text-primary-300 border-primary-300 border-b-2'
							: 'hover:text-secondary-50'}"
						aria-current={$isActiveLink(link) ? 'page' : undefined}
						use:scrollTo={link.id}
						onclick={handleNavClick}
					>
						{getLinkLabel(link)}
					</a>
				{/each}
			</div>
		</div>

		<div class="flex items-center">
			<!-- CTA Button -->
			<Button variant="primary" href="/contact" data-sveltekit-preload-data="hover" class="ml-4"
				>{m['nav.cta_contact']()}</Button
			>
			<!-- Mobiel menu knop -->
			<button
				onclick={() => navigation.toggleMenu()}
				class="text-secondary-50 hover:bg-secondary-900/10 ml-4 rounded-sm p-2 md:hidden"
				aria-label={m['nav.menu_toggle_aria']()}
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
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 md:hidden"
		>
			<button
				type="button"
				class="bg-secondary-900/50 absolute inset-0 backdrop-blur-xs"
				onclick={closeMenu}
				aria-label={m['nav.menu_toggle_aria']()}
			></button>
			<div class="wrapper mobile-menu bg-secondary-800 relative mt-16 rounded-lg p-4">
				<ul class="space-y-4">
					{#each navigation.links as link (link.href)}
						<li>
							<a
								href={link.href}
								data-sveltekit-preload-data="hover"
								class="block font-medium duration-300 {$isActiveLink(link)
									? 'text-primary-300'
									: 'hover:text-secondary-50'}"
								use:scrollTo={link.id}
								onclick={handleNavClick}
							>
								{getLinkLabel(link)}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</header>
