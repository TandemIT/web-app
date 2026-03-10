<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		width?: number;
		height?: number;
		loading?: 'lazy' | 'eager';
		placeholder?: string;
	}

	let {
		src,
		alt,
		class: className = '',
		width,
		height,
		loading = 'lazy',
		placeholder
	}: Props = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);
</script>

<div class="relative overflow-hidden {className}">
	{#if !isLoaded && !hasError}
		<div
			class="bg-secondary-200 absolute inset-0 flex animate-pulse items-center justify-center"
		>
			{#if placeholder}
				<img src={placeholder} alt="" class="h-full w-full object-cover opacity-50" />
			{:else}
				<svg class="text-secondary-400 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 7v10h16V7H4zm8 2l5 4H7l5-4z"
					/>
				</svg>
			{/if}
		</div>
	{/if}

	{#if hasError}
		<div class="bg-secondary-200 absolute inset-0 flex items-center justify-center">
			<svg class="text-secondary-400 h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
				/>
			</svg>
		</div>
	{/if}

	<img
		{src}
		{alt}
		{width}
		{height}
		{loading}
		onload={() => {
			isLoaded = true;
			hasError = false;
		}}
		onerror={() => {
			hasError = true;
			isLoaded = false;
		}}
		class="h-full w-full object-cover transition-opacity duration-300 {isLoaded
			? 'opacity-100'
			: 'opacity-0'}"
		style={width && height ? `aspect-ratio: ${width}/${height}` : undefined}
	/>
</div>
