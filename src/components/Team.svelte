<script lang="ts">
	import rawMembers from '$lib/api/listMembers.json';

	interface Member {
		login: string;
		id: number;
		avatar_url: string;
		html_url: string;
		name: string | null;
		company: string | null;
		blog: string | null;
		location: string | null;
		public_repos: number;
		followers: number;
		following: number;
	}

	function validateMember(member: any): member is Member {
		return (
			typeof member.login === 'string' &&
			typeof member.id === 'number' &&
			typeof member.avatar_url === 'string' &&
			typeof member.html_url === 'string' &&
			(typeof member.name === 'string' || member.name === null) &&
			(typeof member.company === 'string' || member.company === null) &&
			(typeof member.blog === 'string' || member.blog === null) &&
			(typeof member.location === 'string' || member.location === null) &&
			typeof member.public_repos === 'number' &&
			typeof member.followers === 'number' &&
			typeof member.following === 'number'
		);
	}

	const members: Member[] = rawMembers
		.map((member: any) => ({
			login: member.login,
			id: member.id,
			avatar_url: member.avatar_url,
			html_url: member.html_url,
			name: member.name || null,
			company: member.company || null,
			blog: member.blog || null,
			location: member.location || null,
			public_repos: member.public_repos || 0,
			followers: member.followers || 0,
			following: member.following || 0
		}))
		.filter(validateMember);
</script>

{#snippet memberCard(member: Member)}
	<div
		class="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 shadow-xs transition-shadow duration-300 hover:shadow-md"
	>
		<img
			src={member.avatar_url}
			alt={`${member.name || member.login}`}
			class="mb-4 h-32 w-32 rounded-full border-2 border-gray-50 object-cover"
			loading="lazy"
		/>
		<div class="space-y-1 text-center">
			<h2 class="text-secondary-900 text-xl font-medium">
				{member.name || member.login}
			</h2>
			{#if member.company}
				<p class="text-secondary-600 text-base font-medium">{member.company}</p>
			{/if}
			{#if member.location}
				<p class="text-secondary-500 flex items-center justify-center gap-1 text-base">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							d="M12 21s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 7.2c0 7.3-8 11.8-8 11.8z"
						/>
						<circle cx="12" cy="9" r="3" />
					</svg>
					{member.location}
				</p>
			{/if}
		</div>

		<div class="mt-4 flex gap-2">
			{#if member.blog}
				<a
					href={member.blog.startsWith('http') ? member.blog : `https://${member.blog}`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary-600 hover:text-primary-800 bg-secondary-50 hover:bg-secondary-300 rounded-full px-3 py-1 text-base transition-colors"
				>
					Website
				</a>
			{/if}
			<a
				href={member.html_url}
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary-600 hover:text-primary-800 bg-secondary-50 hover:bg-secondary-300 rounded-full px-3 py-1 text-base transition-colors"
			>
				GitHub
			</a>
		</div>

		<div class="mt-3 flex items-center gap-4 text-sm text-gray-500">
			<span class="flex items-center gap-1">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
				</svg>
				{member.public_repos}
			</span>
			<span class="flex items-center gap-1">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.28-1.74-2.34-1.74-.38 0-.74.1-1.06.28L13.5 8.5c-.5.5-.5 1.29 0 1.79l2.32 2.32c.39.39.9.59 1.41.59H18v8h2z"/>
				</svg>
				{member.followers}
			</span>
		</div>
	</div>
{/snippet}

<div class="container px-4 py-12">
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each members as member (member.id)}
			{@render memberCard(member)}
		{/each}
	</div>
</div>
