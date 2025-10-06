<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		children: any;
		fallback?: any;
	}

	let { children, fallback }: Props = $props();

	let error: Error | null = $state(null);
	let errorId: string | null = $state(null);

	// Generate unique error ID for debugging
	function generateErrorId(): string {
		return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	// Handle errors in child components
	function handleError(err: Error) {
		error = err;
		errorId = generateErrorId();

		// Log error in development
		if (!browser) {
			console.error('ErrorBoundary caught error:', err);
		}
	}

	// Reset error state
	function resetError() {
		error = null;
		errorId = null;
	}
</script>

{#if error}
	<div class="error-boundary min-h-screen flex items-center justify-center bg-secondary-800">
		<div class="text-center max-w-md mx-auto px-4">
			<div class="mb-6">
				<svg class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
				</svg>
			</div>

			<h1 class="text-2xl font-bold text-white mb-4">
				Oeps! Er is iets misgegaan
			</h1>

			<p class="text-secondary-300 mb-6">
				Er is een onverwachte fout opgetreden. Probeer de pagina te vernieuwen of neem contact met ons op als het probleem aanhoudt.
			</p>

			{#if browser}
				<div class="space-y-3">
					<button
						onclick={resetError}
						class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 mr-3"
					>
						Probeer opnieuw
					</button>

					<button
						onclick={() => window.location.reload()}
						class="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
					>
						Pagina vernieuwen
					</button>
				</div>

				{#if errorId}
					<p class="text-xs text-secondary-500 mt-4">
						Fout ID: {errorId}
					</p>
				{/if}
			{/if}
		</div>
	</div>
{:else}
	<!-- Error boundary wrapper that catches errors in children -->
	<div class="error-boundary-wrapper">
		{@render children()}
	</div>
{/if}

<style>
	.error-boundary-wrapper {
		/* Ensure errors in child components are caught */
		isolation: isolate;
	}
</style>