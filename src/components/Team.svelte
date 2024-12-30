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

<div class="container px-4 py-12">
	<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each members as member (member.id)}
			<div
				class="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
			>
				<img
					src={member.avatar_url}
					alt={`${member.name || member.login}`}
					class="mb-4 h-32 w-32 rounded-full border-2 border-gray-50 object-cover"
					loading="lazy"
				/>
				<div class="space-y-1 text-center">
					<h2 class="text-xl font-medium text-gray-900">
						{member.name || member.login}
					</h2>
					{#if member.company}
						<p class="text-sm font-medium text-gray-600">{member.company}</p>
					{/if}
					{#if member.location}
						<p class="flex items-center justify-center gap-1 text-sm text-gray-500">
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
							class="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
						>
							Website
						</a>
					{/if}
					<a
						href={member.html_url}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
					>
						Profile
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
