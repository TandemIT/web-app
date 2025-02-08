<script lang="ts">
	const jobs = [
		{
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.',
			href: 'https://makecenter.nl'
		},
		{
			title: 'Bookstack',
			description:
				'Documentatie website opgezet voor de projecten van de studenten van het Veenlanden College.',
			href: 'https://bookstack.makerspace-vlc.nl'
		},
		{
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.'
		},
		{
			title: 'Netwerkbeheerder',
			description: 'Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.'
		}
	];

	function goHref(href: string) {
		if (!href) return;
		window.open(href, '_blank');
	}
</script>

<!-- Klant Makecenter -->
<section class="mx-auto max-w-4xl space-y-6 p-6">
	<h1 class="font-grotesk text-primary-400 text-center text-4xl font-medium">Makecenter</h1>

	<h2 class="font-grotesk text-center text-2xl font-medium dark:text-white">
		Werk verricht onder Makecenter van het Veenlanden College uit Mijdrecht.
	</h2>

	<p class="text-center text-lg dark:text-gray-300">De volgende werken zijn uitgevoerd:</p>

	<ul class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each jobs as job}
			<li class="bg-secondary-500 card rounded-2xl text-primary-200">
				<button
					class="block h-full w-full transform rounded-lg p-5 transition-transform hover:scale-105"
					onclick={() => goHref(job.href || '')}
				>
					<h3 class="font-grotesk text-2xl font-medium">{job.title}</h3>
					<p class="mt-2">{job.description}</p>
				</button>
			</li>
		{/each}
	</ul>
</section>
