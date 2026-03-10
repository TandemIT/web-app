<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import type { TeamMember } from '$lib/types';
	import Heading from './ui/Heading.svelte';
	import TeamMemberCard from './ui/TeamMemberCard.svelte';

	interface Props {
		teamMembers: TeamMember[];
	}

	let { teamMembers }: Props = $props();

	// Use the provided team members instead of fetching from service
	let decodedMembers = $derived(teamMembers);
</script>

<!-- Only show this section if there are team members -->
{#if decodedMembers.length > 0}
	<div class="bg-secondary-800 py-16">
		<div class="container mx-auto px-4">
			<div class="mb-12 text-center">
				<Heading level={2} variant="section" class="text-secondary-200 mb-4">
					{m['team.title']()}
				</Heading>
				<p class="text-secondary-300 mx-auto max-w-2xl text-lg">
					{m['team.subtitle']()}
				</p>
			</div>

			<div class="flex flex-wrap justify-center gap-6">
				{#each decodedMembers as member (member.id)}
					<TeamMemberCard {member} />
				{/each}
			</div>
		</div>
	</div>
{/if}
