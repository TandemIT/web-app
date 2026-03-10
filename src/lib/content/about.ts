import type * as Messages from '$lib/paraglide/messages';

export type AboutSectionId = 'mission' | 'approach' | 'goals' | 'vision' | 'history' | 'team';

type MessageModule = typeof Messages;

export function getAboutSectionTitle(messages: MessageModule, sectionId: string): string {
	switch (sectionId as AboutSectionId) {
		case 'mission':
			return messages['about.section_mission_title']();
		case 'approach':
			return messages['about.section_approach_title']();
		case 'goals':
			return messages['about.section_goals_title']();
		case 'vision':
			return messages['about.section_vision_title']();
		case 'history':
			return messages['about.section_history_title']();
		default:
			return messages['about.section_team_title']();
	}
}

export function getAboutSectionContent(messages: MessageModule, sectionId: string): string {
	switch (sectionId as AboutSectionId) {
		case 'mission':
			return messages['about.section_mission_content']();
		case 'approach':
			return messages['about.section_approach_content']();
		case 'goals':
			return messages['about.section_goals_content']();
		case 'vision':
			return messages['about.section_vision_content']();
		case 'history':
			return messages['about.section_history_content']();
		default:
			return messages['about.section_team_content']();
	}
}
