<script lang="ts">
	interface CardProps {
		title: string;
		description?: string;
		variant?: 'default' | 'primary' | 'secondary';
		loading?: boolean;
	}

	let { title, description, variant = 'default', loading = false, children }: CardProps & { children?: any } = $props();

	// Derived state using $derived
	const cardClasses = $derived(() => {
		const base = 'rounded-lg p-6 transition-all duration-300 shadow-sm hover:shadow-md';
		const variants = {
			default: 'bg-white border border-gray-200',
			primary: 'bg-primary-50 border border-primary-200',
			secondary: 'bg-secondary-600 text-white border border-secondary-700'
		};
		return `${base} ${variants[variant]}`;
	});

	// State management with runes
	let isHovered = $state(false);
	let isPressed = $state(false);

	// Effect for cleanup or side effects
	$effect(() => {
		console.log(`Card "${title}" hover state:`, isHovered);
	});
</script>

{#snippet loadingSpinner()}
	<div class="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
{/snippet}

{#snippet cardHeader()}
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-semibold">
			{title}
			{#if loading}
				{@render loadingSpinner()}
			{/if}
		</h3>
	</div>
{/snippet}

{#snippet cardContent()}
	{#if description}
		<p class="text-sm opacity-80 mb-4">{description}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
{/snippet}

<div
	class={cardClasses()}
	role="button"
	tabindex="0"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
	onmousedown={() => isPressed = true}
	onmouseup={() => isPressed = false}
	onkeydown={(e) => e.key === 'Enter' && (isPressed = !isPressed)}
	style:transform={isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)'}
>
	{@render cardHeader()}
	{@render cardContent()}
</div>
