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
			errors.firstName = 'Voornaam is verplicht en moet minimaal 2 karakters bevatten';
		}

		if (!lastName || lastName.length < 2) {
			errors.lastName = 'Achternaam is verplicht en moet minimaal 2 karakters bevatten';
		}

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Geldig e-mailadres is verplicht';
		}

		if (!message || message.length < 10) {
			errors.message = 'Bericht is verplicht en moet minimaal 10 karakters bevatten';
		}

		if (!agree) {
			errors.agree = 'U moet akkoord gaan met de voorwaarden';
		}

		// Honeypot check
		if (website || phone) {
			errors.general = 'Spam gedetecteerd. Probeer het opnieuw.';
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
			// For now, we'll simulate processing
			await new Promise(resolve => setTimeout(resolve, 1000));

			// In a real app, you might send an email here
			console.log('Contact form submitted:', {
				firstName,
				lastName,
				company,
				email,
				phoneNumber,
				message
			});

			return {
				success: true,
				message: 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.'
			};
		} catch (error) {
			console.error('Contact form error:', error);
			return fail(500, {
				error: 'Er is iets misgegaan bij het verzenden van uw bericht. Probeer het opnieuw.',
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