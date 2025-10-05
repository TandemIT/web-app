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

function validateMember(member: any): member is RawMember {
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

class TeamService {
  private members: TeamMember[] = [];

  constructor() {
    this.loadMembers();
  }

  private loadMembers(): void {
    const processedMembers: TeamMember[] = rawMembers
      .map((member: any) => ({
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
      }))
      .filter((member: any) => validateMember(member as RawMember));

    this.members = processedMembers;
  }

  getMembers(): TeamMember[] {
    return this.members;
  }

  getMemberById(id: string): TeamMember | undefined {
    return this.members.find(member => member.id === id);
  }

  // Decode encoded blog URLs client-side to avoid scrapers
  getDecodedMembers(): TeamMember[] {
    return this.members.map(member => ({
      ...member,
      blog: member.blog ? member.blog.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)) : null
    }));
  }
}

export const teamService = new TeamService();