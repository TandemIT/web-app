import rawMembers from '$lib/api/summaryReport.json';
import type { TeamMember } from '$lib/types';

interface RawMember {
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

type TeamSummaryData = unknown[];

function validateMember(member: unknown): member is RawMember {
	if (typeof member !== 'object' || member === null) {
		return false;
	}

	const candidate = member as Partial<RawMember>;

	return (
		typeof candidate.login === 'string' &&
		typeof candidate.id === 'number' &&
		typeof candidate.avatar_url === 'string' &&
		typeof candidate.html_url === 'string' &&
		(typeof candidate.name === 'string' || candidate.name === null) &&
		(typeof candidate.company === 'string' || candidate.company === null) &&
		(typeof candidate.blog === 'string' || candidate.blog === null) &&
		(typeof candidate.location === 'string' || candidate.location === null) &&
		typeof candidate.public_repos === 'number' &&
		typeof candidate.followers === 'number' &&
		typeof candidate.following === 'number'
	);
}

class TeamService {
	private members: TeamMember[] = [];

	constructor() {
		this.loadMembers();
	}

	private loadMembers(): void {
		const processedMembers: TeamMember[] = (rawMembers as TeamSummaryData)
			.filter(validateMember)
			.map((member) => ({
				id: member.login,
				name: member.name || member.login,
				role: member.company || 'Developer',
				bio: `GitHub user with ${member.public_repos} repositories and ${member.followers} followers.`,
				image: member.avatar_url,
				skills: ['JavaScript', 'TypeScript', 'Web Development'], // Default skills, could be enhanced
				html_url: member.html_url,
				company: member.company,
				location: member.location,
				blog: member.blog,
				public_repos: member.public_repos,
				followers: member.followers,
				following: member.following
			}));

		this.members = processedMembers;
	}

	getMembers(): TeamMember[] {
		return this.members;
	}

	getMemberById(id: string): TeamMember | undefined {
		return this.members.find((member) => member.id === id);
	}

	// Decode encoded blog URLs client-side to avoid scrapers
	getDecodedMembers(): TeamMember[] {
		return this.members.map((member) => ({
			...member,
			blog: member.blog
				? member.blog.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
				: null
		}));
	}
}

export const teamService = new TeamService();
