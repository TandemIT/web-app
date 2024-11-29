<script lang="ts">
	let links = [
		{ href: '/', name: 'Over' },
		{ href: '/#approach', name: 'Aanpak' },
		{ href: '/#mission', name: 'Missie' },
		{ href: '/#cases', name: 'Cases' },
		{ href: '/#insights', name: 'Insights' }
	];
</script>

<nav class="wrapper flex items-center justify-between py-3">
	<div class="flex items-center gap-x-14">
		<a
			href="/"
			class="flex items-center gap-x-2 font-grotesk text-lg font-medium text-secondary-50"
		>
			<img src="/tandemIT.svg" alt="Tandem IT logo" width="32" height="32" />
			Tandem
		</a>
		{#each links as link}
			<a href={link.href} class="font-medium duration-300 hover:text-secondary-50">
				{link.name}
			</a>
		{/each}
	</div>
	<a href="/contact" class="button button-primary"> Contact </a>
</nav>
