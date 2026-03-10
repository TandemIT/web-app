<script lang="ts">
	import { resolve } from '$app/paths';
	import { scrollTo } from '$lib/actions/scroll-to';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary';
		href?: string;
		scrollTarget?: string | null;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		variant = 'primary',
		href,
		scrollTarget = null,
		disabled = false,
		type = 'button',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

{#if href}
	<a
		href={resolve(href as `/${string}`)}
		use:scrollTo={scrollTarget}
		class="button button-{variant} {className}"
		class:disabled
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button
		use:scrollTo={scrollTarget}
		class="button button-{variant} {className}"
		{disabled}
		{type}
		{...rest}
	>
		{@render children()}
	</button>
{/if}

<style>
	/* Button styles are defined in app.css */
</style>
