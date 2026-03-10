<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { fade } from 'svelte/transition';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		message?: string;
		showMessage?: boolean;
		overlay?: boolean;
	}

	let {
		size = 'md',
		message = m['loading.default'](),
		showMessage = true,
		overlay = false
	}: Props = $props();

	// Size configurations
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-8 w-8',
		lg: 'h-12 w-12'
	};

	const spinnerSize = $derived(sizeClasses[size]);
</script>

{#if overlay}
	<!-- Full overlay loading -->
	<div
		class="bg-secondary-900/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
		transition:fade={{ duration: 200 }}
	>
		<div class="text-center">
			<div
				class="border-secondary-600 border-t-primary-500 inline-block animate-spin rounded-full border-4 {spinnerSize} mb-4"
			></div>
			{#if showMessage}
				<p class="text-lg font-medium text-white">{message}</p>
			{/if}
		</div>
	</div>
{:else}
	<!-- Inline loading -->
	<div class="flex flex-col items-center justify-center py-8">
		<div
			class="border-secondary-300 border-t-primary-500 inline-block animate-spin rounded-full border-4 {spinnerSize}"
		></div>
		{#if showMessage}
			<p class="text-secondary-600 mt-3 text-sm">{message}</p>
		{/if}
	</div>
{/if}
