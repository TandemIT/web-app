<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	function createErrorId() {
		return `error_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
	}
</script>

<svelte:boundary>
	{@render children()}

	{#snippet failed(error, reset)}
		<div class="error-boundary bg-secondary-800 flex min-h-screen items-center justify-center">
			<div class="mx-auto max-w-md px-4 text-center">
				<div class="mb-6">
					<svg
						class="mx-auto h-16 w-16 text-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>

				<h1 class="mb-4 text-2xl font-bold text-white">
					{m['error.boundary_title']()}
				</h1>

				<p class="text-secondary-300 mb-6">
					{m['error.boundary_description']()}
				</p>

				{#if error && typeof error === 'object' && 'message' in error}
					<p class="text-secondary-400 mb-4 text-sm">{String(error.message)}</p>
				{/if}

				<div class="space-y-3">
					<button
						onclick={reset}
						class="bg-primary-500 hover:bg-primary-600 mr-3 rounded-lg px-6 py-2 font-medium text-white transition-colors duration-200"
					>
						{m['error.boundary_try_again']()}
					</button>

					<button
						onclick={() => window.location.reload()}
						class="bg-secondary-600 hover:bg-secondary-700 rounded-lg px-6 py-2 font-medium text-white transition-colors duration-200"
					>
						{m['error.boundary_reload']()}
					</button>
				</div>

				<p class="text-secondary-500 mt-4 text-xs">
					{m['error.boundary_id_label']()}: {createErrorId()}
				</p>
			</div>
		</div>
	{/snippet}
</svelte:boundary>
