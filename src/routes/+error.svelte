<script lang="ts">
	import { browser } from '$app/environment';
	import { goto, refreshAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
	import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-svelte';

	// Get error details from the page store
	let errorCode = $derived(page.status || 404);
	let errorMessage = $derived(page.error?.message || m['error.not_found_title']());

	// Error type detection
	let errorType = $derived(() => {
		if (errorCode >= 500) return 'server';
		if (errorCode === 404) return 'notFound';
		if (errorCode >= 400) return 'client';
		return 'unknown';
	});

	let currentConfig = $derived(() => {
		if (errorType() === 'notFound') {
			return {
				title: m['error.not_found_title'](),
				description: m['error.not_found_description'](),
				icon: '🔍',
				suggestion: m['error.not_found_suggestion']()
			};
		}

		if (errorType() === 'server') {
			return {
				title: m['error.server_title'](),
				description: m['error.server_description'](),
				icon: '⚡',
				suggestion: m['error.server_suggestion']()
			};
		}

		if (errorType() === 'client') {
			return {
				title: m['error.client_title'](),
				description: m['error.client_description'](),
				icon: '⚠️',
				suggestion: m['error.client_suggestion']()
			};
		}

		return {
			title: m['error.unknown_title'](),
			description: m['error.unknown_description'](),
			icon: '❓',
			suggestion: m['error.unknown_suggestion']()
		};
	});

	// Navigation functions
	function goBack() {
		if (browser && window.history.length > 1) {
			window.history.back();
		} else {
			goto(resolve('/'));
		}
	}

	function refreshPage() {
		if (browser) refreshAll();
	}

	function goHome() {
		goto(resolve('/'));
	}
</script>

<svelte:head>
	<title>{errorCode} - {currentConfig().title} | Tandem IT</title>
	<meta name="description" content={currentConfig().description} />
</svelte:head>

<div
	class="from-secondary-800 via-secondary-700 to-secondary-900 flex min-h-screen items-center justify-center bg-linear-to-br px-4"
>
	<div class="w-full max-w-2xl text-center">
		<!-- Error Icon and Code -->
		<div class="mb-8">
			<div
				class="bg-secondary-600 mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full text-4xl"
			>
				{currentConfig().icon}
			</div>
			<div class="font-grotesk text-primary-300 mb-2 text-8xl font-bold">
				{errorCode}
			</div>
		</div>

		<!-- Error Content -->
		<div class="mb-12">
			<h1 class="font-grotesk text-secondary-50 mb-4 text-4xl font-bold">
				{currentConfig().title}
			</h1>
			<p class="text-secondary-200 mb-6 text-xl leading-relaxed">
				{currentConfig().description}
			</p>
			<p class="text-secondary-300 text-lg">
				{currentConfig().suggestion}
			</p>

			{#if errorMessage && errorMessage !== currentConfig().description}
				<div class="bg-secondary-600/50 border-secondary-500 mt-6 rounded-lg border p-4">
					<div class="text-accent-300 flex items-center justify-center gap-2">
						<AlertTriangle class="h-5 w-5" />
						<span class="font-medium">{m['error.technical_details']()}</span>
					</div>
					<p class="text-secondary-200 mt-2 font-mono text-sm">
						{errorMessage}
					</p>
				</div>
			{/if}
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<button
				onclick={goBack}
				class="group bg-secondary-600 hover:bg-secondary-500 text-secondary-50 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				<ArrowLeft class="h-5 w-5 transition-transform group-hover:-translate-x-1" />
				{m['error.go_back']()}
			</button>

			<button
				onclick={goHome}
				class="group bg-primary-500 hover:bg-primary-400 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
			>
				<Home class="h-5 w-5" />
				{m['error.homepage']()}
			</button>

			{#if errorType() === 'server' || errorType() === 'unknown'}
				<button
					onclick={refreshPage}
					class="group bg-accent-500 hover:bg-accent-400 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					<RefreshCw class="h-5 w-5 transition-transform group-hover:rotate-180" />
					{m['error.refresh']()}
				</button>
			{/if}
		</div>

		<!-- Additional Help -->
		<div class="mt-12 text-center">
			<p class="text-secondary-400 mb-4">
				{m['error.still_having_issues']()}
			</p>
			<a
				href={resolve('/contact')}
				class="text-primary-300 hover:text-primary-200 inline-flex items-center gap-2 font-medium transition-colors duration-300"
			>
				{m['error.contact_us']()}
				<ArrowLeft class="h-4 w-4 rotate-180" />
			</a>
		</div>

		<!-- Decorative Elements -->
		<div class="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
			<div
				class="decorative-circle-1 bg-primary-500/5 absolute h-64 w-64 rounded-full blur-3xl"
			></div>
			<div
				class="decorative-circle-2 bg-accent-500/5 absolute h-96 w-96 rounded-full blur-3xl"
			></div>
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
		0%,
		100% {
			opacity: 0.05;
			transform: scale(1);
		}
		50% {
			opacity: 0.1;
			transform: scale(1.1);
		}
	}
</style>
