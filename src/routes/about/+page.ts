import type { PageLoad } from './$types';
import { teamService } from '$lib/services/team';

export const load: PageLoad = async () => {
	// Preload team data on the server
	const teamMembers = teamService.getDecodedMembers();

	return {
		teamMembers
	};
};