<!-- Footer -->
<script lang="ts">
	import { ChevronUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	const startYear = 2024;

	interface SocialLink {
		icon: any;
		url: string;
		name: string;
	}

	const socialLinks: SocialLink[] = [
		{ icon: Facebook, url: 'https://www.facebook.com/tandemit', name: 'Facebook' },
		{ icon: Twitter, url: 'https://www.twitter.com/tandemit', name: 'Twitter' },
		{ icon: Instagram, url: 'https://www.instagram.com/tandemit', name: 'Instagram' },
		{ icon: Linkedin, url: 'https://www.linkedin.com/company/tandemit', name: 'LinkedIn' }
	];

	const quickLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'Over ons' },
		{ href: '/services', label: 'Diensten' },
		{ href: '/projects', label: 'Projecten' },
		{ href: '/stages', label: 'Stageplekken' },
		{ href: '/contact', label: 'Contact' }
	];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="mb-0 bg-secondary-900 px-4 py-12 pb-4 font-sans text-secondary-100">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Bedrijfsinformatie -->
			<div>
				<h3 class="mb-4 font-bold text-primary-400">Tandem IT</h3>
				<p class="mb-4 text-secondary-300">
					Tandem IT is een innovatief IT-bedrijf dat zich richt op het ontwikkelen van
					toekomstbestendige softwareoplossingen. In samenwerking met studenten van de Hogeschool
					Utrecht werken we aan uitdagende projecten voor echte klanten.
				</p>
				<button
					onclick={scrollToTop}
					class="flex items-center text-primary-400 transition-colors hover:text-primary-300"
					aria-label="Scroll naar bovenkant pagina"
				>
					<ChevronUp class="mr-2" />
					Terug naar boven
				</button>
			</div>

			<!-- Snelle links -->
			<div>
				<h4 class="mb-4 font-semibold text-primary-400">Snelle links</h4>
				<nav>
					<ul class="space-y-2">
						{#each quickLinks as { href, label }}
							<li>
								<a {href} class="text-secondary-300 transition-colors hover:text-primary-400">
									{label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- Contactinformatie -->
			<div>
				<h4 class="mb-4 font-semibold text-primary-400">Contact</h4>
				<div class="space-y-2 text-secondary-300">
					<p>Bezoekadres:</p>
					<p>Heidelberglaan 15</p>
					<p>3584 CS Utrecht</p>
					<p class="mt-4">Postadres:</p>
					<p>Postbus 182</p>
					<p>3500 AD Utrecht</p>
					<p class="mt-4">Email: info.tandemit@hu.nl</p>
					<p>Tel: 088-481 82 00</p>
				</div>
			</div>

			<!-- Openingstijden -->
			<div>
				<h4 class="mb-4 font-semibold text-primary-400">Openingstijden</h4>
				<div class="space-y-2 text-secondary-300">
					<p>Maandag: 09:00 - 17:00</p>
					<p>Dinsdag: 09:00 - 17:00</p>
					<p>Woensdag: 09:00 - 17:00</p>
					<p>Donderdag: 09:00 - 17:00</p>
					<p>Vrijdag: 09:00 - 16:30</p>
					<p>Weekend: Gesloten</p>
				</div>
			</div>
		</div>

		<!-- Onderste balk -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-6 md:flex-row"
		>
			<p class="mb-4 text-secondary-400 md:mb-0">
				{#if startYear === currentYear}
					&copy; {currentYear} Tandem IT. Alle rechten voorbehouden.
				{:else}
					&copy; {startYear}-{currentYear} Tandem IT. Alle rechten voorbehouden.
				{/if}
			</p>
			<div class="flex space-x-4">
				{#each socialLinks as { icon: Icon, url, name }}
					<a
						href={url}
						class="text-secondary-400 transition-colors hover:text-primary-400"
						aria-label="Bezoek onze {name} pagina"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon size={24} />
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
