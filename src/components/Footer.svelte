<!-- Footer -->
<script lang="ts">
	import { resolve } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import { ChevronUp, Facebook, Instagram, Linkedin, Twitter } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();
	const startYear = 2024;

	interface SocialLink {
		icon: typeof Facebook;
		url: string;
		name: string;
	}

	const socialLinks: SocialLink[] = [
		{ icon: Facebook, url: 'https://www.f&#97;cebook.com/t&#97;ndem-it', name: 'Facebook' },
		{ icon: Twitter, url: 'https://www.twitter.com/t&#97;ndem-it', name: 'Twitter' },
		{
			icon: Instagram,
			url: 'https://www.inst&#97;gr&#97;m.com/t&#97;ndem-it',
			name: 'Instagram'
		},
		{
			icon: Linkedin,
			url: 'https://www.linkedin.com/comp&#97;ny/t&#97;ndem-it',
			name: 'LinkedIn'
		}
	];

	interface QuickLink {
		href: string;
		label: string;
	}

	const quickLinks = $derived<QuickLink[]>([
		{ href: '/', label: m['nav.home']() },
		{ href: '/about', label: m['nav.about']() },
		{ href: '/projects', label: m['footer.link_services']() },
		{ href: '/contact', label: m['footer.link_internships']() },
		{ href: '/contact', label: m['footer.contact']() }
	]);

	const contactInfo = $derived({
		visitAddress: [m['footer.visit_city_label'](), m['footer.visit_city_value']()],
		postAddress: [m['footer.post_box_label'](), m['footer.post_city_value']()],
		email: 'info.t&#97;ndemit&#64;hu.nl', // Obfuscated
		phone: '06 &#49;23&#52;5&#54;7&#56;' // Obfuscated with HTML entities
	});

	// Decode contact info client-side to avoid scrapers
	let decodedContact = $derived({
		email: contactInfo.email.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)),
		phone: contactInfo.phone.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
	});

	// Decode social media URLs client-side to avoid scrapers
	let decodedSocialLinks = $derived(
		socialLinks.map((link) => ({
			...link,
			url: link.url.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
		}))
	);

	const openingHours = $derived([
		{ day: m['footer.day_monday'](), time: '09:30 - 16:30' },
		{ day: m['footer.day_tuesday'](), time: '09:30 - 16:30' },
		{ day: m['footer.day_wednesday'](), time: '09:30 - 16:30' },
		{ day: m['footer.day_thursday'](), time: '09:30 - 16:30' },
		{ day: m['footer.day_friday'](), time: '09:30 - 16:30' },
		{ day: m['footer.day_saturday'](), time: m['footer.closed']() },
		{ day: m['footer.day_sunday'](), time: m['footer.closed']() }
	]);

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
					{m['footer.description']()}
				</p>
				<button
					onclick={scrollToTop}
					class="text-primary-400 hover:text-primary-300 inline-flex min-h-11 items-center rounded-md px-3 transition-colors"
					aria-label={m['footer.back_to_top']()}
				>
					<ChevronUp class="mr-2" />
					{m['footer.back_to_top']()}
				</button>
			</div>

			<!-- Snelle links -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">{m['footer.quick_links']()}</h4>
				<nav>
					<ul class="space-y-2">
						{#each quickLinks as { href, label } (href + label)}
							<li>
								<a
									href={resolve(href as `/${string}`)}
									class="hover:text-primary-400 focus-visible:ring-primary-300 rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
								>
									{label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- Contactinformatie -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">{m['footer.contact']()}</h4>
				<div class="space-y-2">
					<p>{m['footer.visit_address']()}</p>
					{#each contactInfo.visitAddress as line (line)}
						<p>{line}</p>
					{/each}
					<p class="mt-4">{m['footer.post_address']()}</p>
					{#each contactInfo.postAddress as line (line)}
						<p>{line}</p>
					{/each}
					<p class="mt-4">{m['footer.email_label']()}: {decodedContact.email}</p>
					<p>{m['footer.phone_label']()}: {decodedContact.phone}</p>
				</div>
			</div>

			<!-- Openingstijden -->
			<div>
				<h4 class="text-primary-400 mb-4 font-semibold">{m['footer.opening_hours']()}</h4>
				<div class="space-y-2">
					{#each openingHours as { day, time } (day)}
						<p>{day}: {time}</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Onderste balk -->
		<div
			class="border-secondary-600 mt-8 flex flex-col items-center justify-between border-t pt-6 md:flex-row"
		>
			<p class="text-secondary-400 mb-4 md:mb-0">
				{#if startYear === currentYear}
					&copy; {m['footer.rights_single_year']({ year: `${currentYear}` })}
				{:else}
					&copy; {m['footer.rights_year_range']({
						startYear: `${startYear}`,
						endYear: `${currentYear}`
					})}
				{/if}
			</p>
			<div class="flex gap-2">
				{#each decodedSocialLinks as { icon: Icon, url, name } (name)}
					<form action={url} method="GET" target="_blank" rel="noopener noreferrer">
						<button
							type="submit"
							class="text-secondary-400 hover:text-primary-400 focus-visible:ring-primary-300 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 transition-colors focus-visible:ring-2 focus-visible:outline-none"
							aria-label={m['footer.social_visit_aria']({ name })}
						>
							<Icon size={24} />
						</button>
					</form>
				{/each}
			</div>
		</div>
	</div>
</footer>
