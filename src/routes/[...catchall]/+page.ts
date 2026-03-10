export const prerender = false;

import * as m from '$lib/paraglide/messages';
import { error } from '@sveltejs/kit';

export function load() {
	throw error(404, m['error.not_found_title']());
}
