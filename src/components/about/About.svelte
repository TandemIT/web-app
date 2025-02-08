<script lang="ts">
	const sections = [
		{
			title: 'Onze missie',
			content:
				'Bij Tandem IT geloven we in de kracht van samenwerking en innovatie. Onze missie is om organisaties te ondersteunen met flexibele, schaalbare en veilige IT-oplossingen zodat zij zich volledig kunnen richten op groei en ontwikkeling.'
		},
		{
			title: 'Onze aanpak',
			content:
				'Wij combineren technische expertise met een persoonlijke benadering. Door nauw samen te werken met onze klanten, ontwikkelen we op maat gemaakte oplossingen die perfect aansluiten op de specifieke uitdagingen van elke organisatie.'
		},
		{
			title: 'Onze doelen',
			content:
				'Ons doel is om een betrouwbare partner te zijn in de digitale transformatie. Wij streven ernaar om bedrijfsprocessen te optimaliseren, de beveiliging te verbeteren en innovatie binnen organisaties te stimuleren.'
		},
		{
			title: 'Onze visie',
			content:
				'Wij zien een toekomst waarin technologie niet slechts een ondersteunende rol speelt, maar de drijvende kracht is achter groei en maatschappelijke vooruitgang. Bij Tandem IT werken we aan een duurzame digitale wereld waarin iedereen profiteert van technologische vernieuwing.'
		},
		{
			title: 'Onze geschiedenis',
			content:
				'Tandem IT is ontstaan uit een passie voor technologie en de ambitie om echte verandering teweeg te brengen. Sinds onze oprichting hebben we samengewerkt met diverse organisaties, waarbij we onze kennis en ervaring inzetten om complexe IT-uitdagingen op te lossen.'
		},
		{
			title: 'Ons team',
			content:
				'Ons team bestaat uit enthousiaste studenten met een passie voor IT. Samen werken we aan uitdagende projecten en innovatieve oplossingen. Door onze krachten te bundelen, kunnen we het maximale resultaat behalen voor onze klanten.'
		}
	];

</script>
    
<h1 class="font-grotesk text-primary-400 text-center text-4xl font-medium">Wie zijn wij?</h1>

<menu class="flex justify-center gap-6 p-6">
	<ul class="flex gap-6">
		{#each sections as section}
			<li class="bg-primary group p-4 rounded-lg">
				<button 
                    class="text-primary-400 group button-secondary button hover:text-primary-600"

                >
					{section.title}
				</button>
			</li>
		{/each}
	</ul>
</menu>


