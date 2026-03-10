export interface ShowcaseProject {
	title: string;
	description: string;
	link: string;
	image: string;
}

// Placeholder showcase content until dynamic projects/insights data is wired in.
export const showcaseProjects: ShowcaseProject[] = [
	{
		title: 'Project 1',
		description: 'Een geavanceerd project met moderne technologieen.',
		link: '/projects',
		image: 'https://placehold.co/600x400'
	},
	{
		title: 'Project 2',
		description: 'Een innovatief project gericht op schaalbare oplossingen.',
		link: '/projects',
		image: 'https://placehold.co/600x400'
	},
	{
		title: 'Project 3',
		description: 'Een creatief project met een focus op gebruiksvriendelijkheid.',
		link: '/projects',
		image: 'https://placehold.co/600x400'
	}
];
