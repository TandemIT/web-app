<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		message?: string;
		showMessage?: boolean;
		overlay?: boolean;
	}

	let {
		size = 'md',
		message = 'Laden...',
		showMessage = true,
		overlay = false
	}: Props = $props();

	// Size configurations
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};

	const spinnerSize = sizeClasses[size];
</script>

{#if overlay}
	<!-- Full overlay loading -->
	<div
		class="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm z-50 flex items-center justify-center"
		transition:fade={{ duration: 200 }}
	>
		<div class="text-center">
			<div class="inline-block animate-spin rounded-full border-4 border-secondary-600 border-t-primary-500 {spinnerSize} mb-4"></div>
			{#if showMessage}
				<p class="text-white text-lg font-medium">{message}</p>
			{/if}
		</div>
	</div>
{:else}
	<!-- Inline loading -->
	<div class="flex flex-col items-center justify-center py-8">
		<div class="inline-block animate-spin rounded-full border-4 border-secondary-300 border-t-primary-500 {spinnerSize}"></div>
		{#if showMessage}
			<p class="text-secondary-600 mt-3 text-sm">{message}</p>
		{/if}
	</div>
{/if}