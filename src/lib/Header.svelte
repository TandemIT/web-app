<script lang="ts">
	let links = [
		{ href: '#', name: 'Home' },
		{ href: '#about', name: 'About' },
		{ href: '#contact', name: 'Contact' }
	];
</script>

<header class="container flex items-center justify-between px-6 py-4">
	<!-- Logo and Brand Name -->
	<div class="flex items-center gap-4">
		<img src="/tandemIT.png" alt="Tandem IT logo" class="h-16 w-16 rounded-full shadow-lg" />
		<span class="text-primary text-2xl font-bold">Tandem IT</span>
	</div>

	<!-- Navigation Links -->
	<nav>
		<ul class="flex items-center gap-6 text-lg font-medium">
			{#each links as link}
				<li>
					<a href={link.href} class="hover:text-primary transition duration-200 hover:underline">
						{link.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
