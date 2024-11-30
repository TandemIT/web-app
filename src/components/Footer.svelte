<script lang="ts">
	import { ChevronUp, Facebook, Twitter, Instagram, Linkedin } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();
	const socialLinks = [
		{ icon: Facebook, url: '#' },
		{ icon: Twitter, url: '#' },
		{ icon: Instagram, url: '#' },
		{ icon: Linkedin, url: '#' }
	];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<footer class="bg-secondary-700 px-4 py-12 font-sans text-secondary-100 sm:px-6 lg:px-8">
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
		<!-- Company Info -->
		<div>
			<h3 class="mb-4 font-grotesk text-xl font-bold text-primary-300">Company Name</h3>
			<p class="mb-4 text-secondary-200">
				A brief description of your company's mission or value proposition.
			</p>
			<button
				on:click={scrollToTop}
				class="flex items-center text-primary-300 transition-colors hover:text-primary-200"
			>
				<ChevronUp class="mr-2" />
				Back to Top
			</button>
		</div>

		<!-- Quick Links -->
		<div>
			<h4 class="mb-4 font-grotesk font-semibold text-primary-300">Quick Links</h4>
			<nav>
				<ul class="space-y-2">
					<li>
						<a href="/" class="text-secondary-100 transition-colors hover:text-primary-300">
							Home
						</a>
					</li>
					<li>
						<a href="/#about" class="text-secondary-100 transition-colors hover:text-primary-300">
							About
						</a>
					</li>
					<li>
						<a
							href="/#services"
							class="text-secondary-100 transition-colors hover:text-primary-300"
						>
							Services
						</a>
					</li>
					<li>
						<a
							href="/#contact#contact"
							class="text-secondary-100 transition-colors hover:text-primary-300"
						>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</div>

		<!-- Contact Info -->
		<div>
			<h4 class="mb-4 font-grotesk font-semibold text-primary-300">Contact</h4>
			<div class="space-y-2">
				<p class="text-secondary-200">Heidelberglaan 15, Science park</p>
				<p class="text-secondary-200">Utrecht, Netherlands</p>
				<p class="text-secondary-200">Email: info.tandemit@hu.nl</p>
				<!-- <p class="text-secondary-200">Phone: (555) 123-4567</p> -->
			</div>
		</div>

		<!-- Newsletter Signup -->
		<div>
			<h4 class="mb-4 font-grotesk font-semibold text-primary-300">Stay Updated</h4>
			<form class="space-y-2">
				<input
					type="email"
					placeholder="Enter your email"
					class="w-full rounded border border-secondary-600 bg-secondary-700 p-2 text-secondary-100
					       focus:outline-none focus:ring-2 focus:ring-primary-300"
				/>
				<button
					type="submit"
					class="w-full rounded bg-primary-300 p-2
					       font-grotesk font-semibold text-secondary-900 transition-colors hover:bg-primary-400"
				>
					Subscribe
				</button>
			</form>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div
		class="mt-8 flex flex-col items-center justify-between border-t border-secondary-700 pt-6 md:flex-row"
	>
		<p class="mb-4 text-secondary-300 md:mb-0">
			© {currentYear} Tandem IT. All rights reserved.
		</p>
		<div class="flex space-x-4">
			{#each socialLinks as { icon: Icon, url }}
				<a
					href={url}
					class="text-secondary-200 transition-colors hover:text-primary-300"
					aria-label="Social Media Link"
				>
					<Icon size={24} />
				</a>
			{/each}
		</div>
	</div>
</footer>
