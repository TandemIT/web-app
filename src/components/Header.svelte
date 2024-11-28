<script lang="ts">
	let links = [
		{ href: '#', name: 'Over' },
		{ href: '#about', name: 'Aanpak' },
		{ href: '#contact', name: 'Missie' },
		{ href: '#contact', name: 'Cases' },
		{ href: '#contact', name: 'Insights' }
	];
</script>

<nav class="wrapper flex items-center justify-between py-3">
	<div class="flex items-center gap-x-14">
		<a href="/" class="flex items-center gap-x-2 font-grotesk font-medium text-lg text-secondary-50">
			<img src="/tandemIT.svg" alt="Tandem IT logo" width="32" height="32" />
			Tandem
		</a>
		{#each links as link}
			<a href={link.href} class="font-medium hover:text-secondary-50 duration-300">
				{link.name}
			</a>
		{/each}
	</div>
	<a href="/contact" class="button button-primary">
		Contact
	</a>
</nav>