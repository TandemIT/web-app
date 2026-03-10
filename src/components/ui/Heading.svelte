<script lang="ts">
	interface Props {
		level: 1 | 2 | 3 | 4 | 5 | 6;
		variant?: 'hero' | 'section' | 'card';
		class?: string;
		children: any;
	}

	let { level, variant = 'section', class: className = '', children }: Props = $props();
</script>

{#if level === 1}
	<h1
		class="font-grotesk text-4xl leading-tight font-semibold lg:text-6xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h1>
{:else if level === 2}
	<h2
		class="font-grotesk text-3xl leading-tight font-semibold lg:text-5xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h2>
{:else if level === 3}
	<h3
		class="font-grotesk text-2xl leading-tight font-semibold lg:text-4xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h3>
{:else if level === 4}
	<h4
		class="font-grotesk text-xl leading-tight font-semibold lg:text-3xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h4>
{:else if level === 5}
	<h5
		class="font-grotesk text-lg leading-tight font-semibold lg:text-2xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h5>
{:else}
	<h6
		class="font-grotesk text-base leading-tight font-semibold lg:text-xl {variant === 'hero'
			? 'text-white'
			: 'text-secondary-900'} {className}"
	>
		{@render children()}
	</h6>
{/if}
