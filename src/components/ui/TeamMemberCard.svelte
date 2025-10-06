<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Heading from '../ui/Heading.svelte';
	import Image from '../ui/Image.svelte';
	import type { TeamMember } from '$lib/types';

	interface Props {
		member: TeamMember;
	}

	let { member }: Props = $props();

	// Decode encoded blog URLs client-side to avoid scrapers
	let decodedBlog = $derived(member.blog ? (member.blog.startsWith('http') ? member.blog : `https://${member.blog}`) : null);
</script>

<div
	class="group flex w-full max-w-sm flex-col items-center rounded-2xl border border-secondary-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
>
	<div class="relative mb-6">
		<Image
			src={member.image}
			alt={`${member.name}`}
			class="h-32 w-32 rounded-full border-4 border-secondary-100 transition-transform duration-300 group-hover:scale-110"
			width={128}
			height={128}
		/>
		<div class="absolute -bottom-2 -right-2 rounded-full bg-primary-500 p-2">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
			</svg>
		</div>
	</div>

	<div class="space-y-2 text-center">
		<Heading level={3} variant="card">
			{member.name}
		</Heading>
		{#if member.company}
			<p class="text-secondary-700 text-lg font-medium">{member.company}</p>
		{/if}
		{#if member.location}
			<p class="text-secondary-600 flex items-center justify-center gap-2 text-base">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
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

	<div class="mt-6 flex flex-wrap justify-center gap-3">
		{#if decodedBlog}
			<a
				href={decodedBlog}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
				</svg>
				Website
			</a>
		{/if}
		<a
			href={member.html_url}
			target="_blank"
			rel="noopener noreferrer"
			class="bg-secondary-600 hover:bg-secondary-700 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
			</svg>
			GitHub
		</a>
	</div>

	<div class="mt-6 flex items-center justify-center gap-6 text-sm text-secondary-500">
		<div class="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
			</svg>
			<span class="font-medium">{member.public_repos}</span>
			<span class="text-xs">repos</span>
		</div>
		<div class="flex items-center gap-2">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
				<path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63c-.34-1.02-1.28-1.74-2.34-1.74-.38 0-.74.1-1.06.28L13.5 8.5c-.5.5-.5 1.29 0 1.79l2.32 2.32c.39.39.9.59 1.41.59H18v8h2z"/>
			</svg>
			<span class="font-medium">{member.followers}</span>
			<span class="text-xs">followers</span>
		</div>
	</div>
</div>