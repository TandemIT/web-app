import { teamService } from '$lib/services/team';
import type { PageLoad } from './$types';

type AboutSectionId = 'mission' | 'approach' | 'goals' | 'vision' | 'history' | 'team';

interface AboutSection {
	id: AboutSectionId;
	icon: string;
}

export const load: PageLoad = async () => {
	// Preload team data on the server
	const teamMembers = teamService.getDecodedMembers();
	const sections: AboutSection[] = [
		{ id: 'mission', icon: '🎯' },
		{ id: 'approach', icon: '🤝' },
		{ id: 'goals', icon: '🎯' },
		{ id: 'vision', icon: '🔭' },
		{ id: 'history', icon: '📚' },
		{ id: 'team', icon: '👥' }
	];

	return {
		teamMembers,
		sections
	};
};
