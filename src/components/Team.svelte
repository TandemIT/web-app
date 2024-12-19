<script lang="ts">
    import rawMembers from '../lib/api/summaryReport.json';

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
        return typeof member.login === 'string' &&
               typeof member.id === 'number' &&
               typeof member.avatar_url === 'string' &&
               typeof member.html_url === 'string' &&
               (typeof member.name === 'string' || member.name === null) &&
               (typeof member.company === 'string' || member.company === null) &&
               (typeof member.blog === 'string' || member.blog === null) &&
               (typeof member.location === 'string' || member.location === null) &&
               typeof member.public_repos === 'number' &&
               typeof member.followers === 'number' &&
               typeof member.following === 'number';
    }

    let members: Member[] = rawMembers.filter(validateMember);
</script>

<div class="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
    {#each members as member}
        <div class="flex flex-col items-center rounded-lg border bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <a href={member.html_url} target="_blank" class="flex flex-col max-h-fit items-center">
                <img src={member.avatar_url} alt={member.login} class="mb-2 h-24 w-24 rounded-full border-2 border-gray-300" />
                <div class="text-center">
                    <h2 class="text-lg font-semibold font-grotesk">{member.name || member.login}</h2>
                    <p class="text-sm text-secondary-500">{member.company}</p>
                    <p class="text-sm text-secondary-500">{member.location}</p>
                </div>
            </a>
            <div class="mt-2 text-center">
                <p class="text-sm text-secondary-600">Repos: {member.public_repos}</p>
                <p class="text-sm text-secondary-600">Followers: {member.followers}</p>
                <p class="text-sm text-secondary-600">Following: {member.following}</p>
            </div>
        </div>
    {/each}
</div>