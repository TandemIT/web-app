import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		contactInfo: {
			email: 'info.t&#97;ndemit&#64;hu.nl',
			visitAddress: ['Heidelberglaan 15', 'Science park, Utrecht', 'Nederland']
		}
	};
};
