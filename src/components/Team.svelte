<script lang="ts">
	import listMembers from '../components/listmembers.json';

	interface Member {
		login: string;
		avatar_url: string;
		html_url: string;
	}
	
	let members: Member[] = listMembers;
</script>

<div class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
	{#each members as member}
		<div
			class="flex flex-col items-center rounded-lg border bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg"
		>
			<a href={member.html_url} target="_blank" class="flex flex-col max-h-fit items-center">
				<img
					src={member.avatar_url}
					alt={member.login}
					class="mb-2 h-24 w-24 rounded-full border-2 border-gray-300"
				/>
				<span class="text-lg font-semibold text-gray-800">{member.login}</span>
			</a>
		</div>
	{/each}
</div>
