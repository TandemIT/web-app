<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		children: any;
		[key: string]: any; // Allow additional props
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		disabled = false,
		type = 'button',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

{#if href}
	<a
		{href}
		class="button button-{variant} {className}"
		class:disabled
		{...rest}
	>
		{@render children()}
	</a>
{:else}
	<button
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