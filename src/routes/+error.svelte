<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { ArrowLeft, Home, RefreshCw, AlertTriangle } from 'lucide-svelte';

	// Get error details from the page store
	let errorCode = $derived($page.status || 404);
	let errorMessage = $derived($page.error?.message || 'Pagina niet gevonden');

	// Error type detection
	let errorType = $derived(() => {
		if (errorCode >= 500) return 'server';
		if (errorCode === 404) return 'notFound';
		if (errorCode >= 400) return 'client';
		return 'unknown';
	});

	// Error configuration based on type
	const errorConfig = {
		notFound: {
			title: 'Pagina niet gevonden',
			description: 'De pagina die je zoekt bestaat niet of is verplaatst.',
			icon: '🔍',
			suggestion: 'Controleer de URL of ga terug naar de homepage.'
		},
		server: {
			title: 'Server probleem',
			description: 'Er is een probleem opgetreden op onze servers.',
			icon: '⚡',
			suggestion: 'Probeer de pagina te vernieuwen of kom later terug.'
		},
		client: {
			title: 'Aanvraag probleem',
			description: 'Er is iets misgegaan met je aanvraag.',
			icon: '⚠️',
			suggestion: 'Controleer je invoer en probeer het opnieuw.'
		},
		unknown: {
			title: 'Onbekende fout',
			description: 'Er is een onverwachte fout opgetreden.',
			icon: '❓',
			suggestion: 'Probeer de pagina te vernieuwen.'
		}
	};

	let currentConfig = $derived(errorConfig[errorType()]);

	// Navigation functions
	function goBack() {
		if (browser && window.history.length > 1) {
			window.history.back();
		} else {
			window.location.href = '/';
		}
	}

	function refreshPage() {
		if (browser) {
			window.location.reload();
		}
	}

	function goHome() {
		if (browser) {
			window.location.href = '/';
		}
	}
</script>

<svelte:head>
	<title>{errorCode} - {currentConfig.title} | Tandem IT</title>
	<meta name="description" content={currentConfig.description} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-secondary-800 via-secondary-700 to-secondary-900 flex items-center justify-center px-4">
	<div class="max-w-2xl w-full text-center">
		<!-- Error Icon and Code -->
		<div class="mb-8">
			<div class="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-secondary-600 text-4xl">
				{currentConfig.icon}
			</div>
			<div class="text-8xl font-grotesk font-bold text-primary-300 mb-2">
				{errorCode}
			</div>
		</div>

		<!-- Error Content -->
		<div class="mb-12">
			<h1 class="text-4xl font-grotesk font-bold text-secondary-50 mb-4">
				{currentConfig.title}
			</h1>
			<p class="text-xl text-secondary-200 mb-6 leading-relaxed">
				{currentConfig.description}
			</p>
			<p class="text-lg text-secondary-300">
				{currentConfig.suggestion}
			</p>
			
			{#if errorMessage && errorMessage !== currentConfig.description}
				<div class="mt-6 p-4 bg-secondary-600/50 rounded-lg border border-secondary-500">
					<div class="flex items-center justify-center gap-2 text-accent-300">
						<AlertTriangle class="w-5 h-5" />
						<span class="font-medium">Technische details:</span>
					</div>
					<p class="text-secondary-200 mt-2 text-sm font-mono">
						{errorMessage}
					</p>
				</div>
			{/if}
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<button
				onclick={goBack}
				class="group inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-500 text-secondary-50 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				<ArrowLeft class="w-5 h-5 transition-transform group-hover:-translate-x-1" />
				Ga terug
			</button>

			<button
				onclick={goHome}
				class="group inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				<Home class="w-5 h-5" />
				Homepage
			</button>

			{#if errorType() === 'server' || errorType() === 'unknown'}
				<button
					onclick={refreshPage}
					class="group inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-400 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					<RefreshCw class="w-5 h-5 transition-transform group-hover:rotate-180" />
					Vernieuwen
				</button>
			{/if}
		</div>

		<!-- Additional Help -->
		<div class="mt-12 text-center">
			<p class="text-secondary-400 mb-4">
				Nog steeds problemen? Neem contact met ons op.
			</p>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-medium transition-colors duration-300"
			>
				Contacteer ons
				<ArrowLeft class="w-4 h-4 rotate-180" />
			</a>
		</div>

		<!-- Decorative Elements -->
		<div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
			<div class="decorative-circle-1 absolute w-64 h-64 rounded-full bg-primary-500/5 blur-3xl"></div>
			<div class="decorative-circle-2 absolute w-96 h-96 rounded-full bg-accent-500/5 blur-3xl"></div>
		</div>
	</div>
</div>

<style>
	/* Custom animation for error code */
	@keyframes bounce-in {
		0% {
			transform: scale(0.3);
			opacity: 0;
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.text-8xl {
		animation: bounce-in 0.6s ease-out;
	}

	/* Hover effect for buttons */
	button:hover {
		transform: translateY(-2px);
	}

	/* Decorative elements positioning and animation */
	.decorative-circle-1 {
		top: 25%;
		left: 25%;
		animation: pulse 4s ease-in-out infinite;
	}

	.decorative-circle-2 {
		bottom: 25%;
		right: 25%;
		animation: pulse 4s ease-in-out infinite 2s;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 0.05;
			transform: scale(1);
		}
		50% {
			opacity: 0.1;
			transform: scale(1.1);
		}
	}
</style>
