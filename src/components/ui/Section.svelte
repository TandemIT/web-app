<script lang="ts">
	interface Props {
		id?: string;
		class?: string;
		variant?: 'default' | 'hero' | 'content';
		children: any;
	}

	let {
		id,
		class: className = '',
		variant = 'default',
		children
	}: Props = $props();
</script>

<section
	{id}
	class="py-16 lg:py-24 {variant === 'hero' ? 'min-h-screen flex items-center' : ''} {variant === 'content' ? 'bg-secondary-800' : ''} {className}"
>
	<div class="wrapper">
		{@render children()}
	</div>
</section>