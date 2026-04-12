import * as m from '$lib/paraglide/messages';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

// Disable prerendering for pages with actions
export const prerender = false;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const firstName = formData.get('firstName')?.toString();
		const lastName = formData.get('lastName')?.toString();
		const company = formData.get('company')?.toString();
		const email = formData.get('email')?.toString();
		const phoneNumber = formData.get('phoneNumber')?.toString();
		const message = formData.get('message')?.toString();
		const agree = formData.has('agree');
		const website = formData.get('website')?.toString(); // Honeypot
		const phone = formData.get('phone')?.toString(); // Honeypot

		// Validation
		const errors: Record<string, string> = {};

		if (!firstName || firstName.length < 2) {
			errors.firstName = m['contact.error_first_name']();
		}

		if (!lastName || lastName.length < 2) {
			errors.lastName = m['contact.error_last_name']();
		}

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = m['contact.error_email']();
		}

		if (!message || message.length < 10) {
			errors.message = m['contact.error_message']();
		}

		if (!agree) {
			errors.agree = m['contact.error_agree']();
		}

		// Honeypot check
		if (website || phone) {
			errors.general = m['contact.error_spam']();
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, {
				errors,
				data: {
					firstName,
					lastName,
					company,
					email,
					phoneNumber,
					message,
					agree
				}
			});
		}

		try {
			// Here you would typically send the email or save to database
			// For now, we return immediately with a success response.

			return {
				success: true,
				message: m['contact.success']()
			};
		} catch (error) {
			console.error('Contact form error:', error);
			return fail(500, {
				error: m['contact.error_submit'](),
				data: {
					firstName,
					lastName,
					company,
					email,
					phoneNumber,
					message,
					agree
				}
			});
		}
	}
};
