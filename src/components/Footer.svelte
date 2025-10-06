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
		{ icon: Facebook, url: 'https://www.f&#97;cebook.com/t&#97;ndem-it', name: 'Facebook' },
		{ icon: Twitter, url: 'https://www.twitter.com/t&#97;ndem-it', name: 'Twitter' },
		{ icon: Instagram, url: 'https://www.inst&#97;gr&#97;m.com/t&#97;ndem-it', name: 'Instagram' },
		{ icon: Linkedin, url: 'https://www.linkedin.com/comp&#97;ny/t&#97;ndem-it', name: 'LinkedIn' }
	];

	interface QuickLink {
		href: string;
		label: string;
	}

	const quickLinks: QuickLink[] = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'Over ons' },
		{ href: '/projects', label: 'Diensten' },
		{ href: '/contact', label: 'Stageplekken' },
		{ href: '/contact', label: 'Contact' }
	];

	const contactInfo = {
		visitAddress: ['plaats in', 'Utrecht'],
		postAddress: ['Postbus', 'Utrecht'],
		email: 'info.t&#97;ndemit&#64;hu.nl', // Obfuscated
		phone: '06 &#49;23&#52;5&#54;7&#56;' // Obfuscated with HTML entities
	};

	// Decode contact info client-side to avoid scrapers
	let decodedContact = $derived({
		email: contactInfo.email.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)),
		phone: contactInfo.phone.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
	});

	// Decode social media URLs client-side to avoid scrapers
	let decodedSocialLinks = $derived(socialLinks.map(link => ({
		...link,
		url: link.url.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
	})));

	const openingHours = [
		{ day: 'Maandag', time: '09:30 - 16:30' },
		{ day: 'Dinsdag', time: '09:30 - 16:30' },
		{ day: 'Woensdag', time: '09:30 - 16:30' },
		{ day: 'Donderdag', time: '09:30 - 16:30' },
		{ day: 'Vrijdag', time: '09:30 - 16:30' },
		{ day: 'Zaterdag', time: 'Gesloten' },
		{ day: 'Zondag', time: 'Gesloten' }
	];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class=" bg-secondary-700 text-secondary-100 px-4 py-12 pb-4 font-sans">
	<div class="mx-auto max-w-7xl">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Bedrijfsinformatie -->
			<div>
				<h3 class="text-primary-400 mb-4 font-bold">Tandem IT</h3>
				<p class=" mb-4">
					Tandem IT is een fictief IT-bedrijf dat zich richt op het ontwikkelen van
					toekomstbestendige softwareoplossingen. In samenwerking met studenten van de Hogeschool
					Utrecht werken we aan uitdagende projecten voor echte klanten.
				</p>
				<button
					onclick={scrollToTop}
					class="text-primary-400 hover:text-primary-300 flex items-center transition-colors"
					aria-label="Scroll naar bovenkant pagina"
				>
					<ChevronUp class="mr-2" />
					Terug naar boven
				</button>
			</div>

			<!-- Snelle links -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">Snelle links</h4>
				<nav>
					<ul class="space-y-2">
						{#each quickLinks as { href, label }}
							<li>
								<a {href} class="hover:text-primary-400 transition-colors">
									{label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- Contactinformatie -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">Contact</h4>
				<div class="space-y-2">
					<p>Bezoekadres:</p>
					{#each contactInfo.visitAddress as line}
						<p>{line}</p>
					{/each}
					<p class="mt-4">Postadres:</p>
					{#each contactInfo.postAddress as line}
						<p>{line}</p>
					{/each}
					<p class="mt-4">Email: {decodedContact.email}</p>
					<p>Tel: {decodedContact.phone}</p>
				</div>
			</div>

			<!-- Openingstijden -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">Openingstijden</h4>
				<div class="space-y-2">
					{#each openingHours as { day, time }}
						<p>{day}: {time}</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Onderste balk -->
		<div
			class="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-6 md:flex-row"
		>
			<p class="text-secondary-400 mb-4 md:mb-0">
				{#if startYear === currentYear}
					&copy; {currentYear} Tandem IT. Alle rechten voorbehouden.
				{:else}
					&copy; {startYear}-{currentYear} Tandem IT. Alle rechten voorbehouden.
				{/if}
			</p>
			<div class="flex space-x-4">
				{#each decodedSocialLinks as { icon: Icon, url, name }}
					<a
						href={url}
						class="text-secondary-400 hover:text-primary-400 transition-colors"
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
