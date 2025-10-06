<script lang="ts">
	import { onMount } from 'svelte';
	import { X } from 'lucide-svelte';

	let { message = "🚧 This website is under development and not ready for production use. Features may not work as expected.", dismissible = false } = $props();

	let isVisible = $state(true);
	let isClient = $state(false);

	onMount(() => {
		isClient = true;
		// Check if user has dismissed the banner before
		const dismissed = localStorage.getItem('dev-banner-dismissed');
		if (dismissed) {
			isVisible = false;
		}
	});

	function dismiss() {
		isVisible = false;
		if (isClient) {
			localStorage.setItem('dev-banner-dismissed', 'true');
		}
	}
</script>

{#if isVisible}
	<div class="fixed text-center top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white shadow-lg border-b-4 border-red-800">
		<div class="container mx-auto px-4 py-3">
			<div class="flex items-center justify-center relative">
				<div class="flex items-center space-x-3">
					<div class="flex-shrink-0">
						<svg class="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
						</svg>
					</div>
					<p class="font-medium text-sm md:text-base">
						{message}
					</p>
				</div>
				{#if dismissible}
					<button
						onclick={dismiss}
						class="absolute right-0 p-1 rounded-md hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
						aria-label="Dismiss banner"
					>
						<X size={20} />
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Ensure banner appears above other content */
	:global(.fixed.top-0) {
		margin-top: 0 !important;
	}
</style>