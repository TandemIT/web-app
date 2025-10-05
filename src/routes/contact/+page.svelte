<script lang="ts">
	// Obfuscated email - will be decoded client-side
	let email = 'info.t&#97;ndemit&#64;hu.nl';

	let formData = $state({
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		phoneNumber: '',
		message: '',
		agree: false,
		// Honeypot fields (hidden from users but visible to bots)
		website: '',
		phone: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let formStartTime = $state(Date.now());

	// Decode email client-side to avoid scrapers
	let decodedEmail = $derived(email.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)));

	async function handleSubmit(event: Event) {
		event.preventDefault();
		isSubmitting = true;
		submitMessage = '';

		// Anti-bot checks
		const timeElapsed = Date.now() - formStartTime;
		if (timeElapsed < 3000) { // Form submitted too quickly (likely a bot)
			submitMessage = 'Formulier te snel ingediend. Probeer het over een paar seconden opnieuw.';
			isSubmitting = false;
			return;
		}

		if (formData.website || formData.phone) { // Honeypot fields filled
			submitMessage = 'Spam gedetecteerd. Probeer het opnieuw.';
			isSubmitting = false;
			return;
		}

		try {
			// Here you would typically send the form data to your backend
			// For now, we'll simulate a submission
			await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

			// Reset form
			formData = {
				firstName: '',
				lastName: '',
				company: '',
				email: '',
				phoneNumber: '',
				message: '',
				agree: false,
				website: '',
				phone: ''
			};

			// Reset timer
			formStartTime = Date.now();

			submitMessage = 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';
		} catch (error) {
			submitMessage = 'Er is iets misgegaan. Probeer het opnieuw.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="wrapper mt-10 grid gap-4 lg:grid-cols-12">
	<div class="col-span-4">
		<div class="bg-secondary-600 flex h-fit flex-col gap-6 rounded-xl p-10">
			<h2 class="text-xl font-medium">Contact &amp; info</h2>
			<div>
				<p class="mb-2 text-lg font-medium">Mail ons</p>
				<p>Mail met ons.</p>
				<a class="font-medium" href="mailto:{decodedEmail}">{decodedEmail}</a>
			</div>
			<div>
				<p class="mb-2 text-lg font-medium">Openingsuren</p>
				<p>Ma-vr van 9:00 tot 17:00</p>
			</div>
			<!-- <div>
				<p class="mb-2 text-lg font-medium">Bedrijfsgegevens</p>
				<p class="font-medium"></p>
				<p class="font-medium"></p>
			</div> -->
			<div>
				<p class="mb-2 text-lg font-medium">Adres gegevens</p>
				<p class="font-medium">Heidelberglaan 15</p>
				<p class="font-medium">Science park, Utrecht</p>
				<p class="font-medium">
					<span class="text-transparent" style="text-shadow: 0 0 0 currentColor;">Nederland</span>
				</p>
			</div>
		</div>
	</div>
	<div class="col-span-1"></div>
	<div class="col-span-7">
		<form class="bg-secondary-600 flex flex-col gap-5 rounded-xl p-10" onsubmit={handleSubmit}>
			<div class="grid gap-x-5 lg:grid-cols-2">
				<div class="mb-5">
					<label for="firstName" class="mb-1 block text-base font-medium">Voornaam</label><input
						id="firstName"
						type="text"
						class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
						required
						name="firstName"
						bind:value={formData.firstName}
					/>
				</div>
				<div class="mb-5">
					<label for="lastName" class="mb-1 block text-base font-medium">Achternaam</label><input
						id="lastName"
						type="text"
						class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
						required
						name="lastName"
						bind:value={formData.lastName}
					/>
				</div>
			</div>
			<div class="mb-5">
				<label for="company" class="mb-1 block text-base font-medium">Bedrijfsnaam</label><input
					id="company"
					type="text"
					class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
					required
					name="company"
					bind:value={formData.company}
				/>
			</div>
			<div class="mb-5">
				<label for="email" class="mb-1 block text-base font-medium">E-mailadres</label><input
					id="email"
					type="email"
					class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
					required
					name="email"
					bind:value={formData.email}
				/>
			</div>
			<div class="mb-5">
				<label for="phoneNumber" class="mb-1 block text-base font-medium">Telefoonnummer</label
				><input
					id="phoneNumber"
					type="tel"
					class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
					required
					name="phoneNumber"
					bind:value={formData.phoneNumber}
				/>
			</div>
			<div class="mb-5">
				<label for="message" class="mb-1 block text-base font-medium"
					>Bericht, vraag of opmerking</label
				><textarea
					name="message"
					id="message"
					class="border-secondary-400 focus:bg-secondary-50/5 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 outline-none"
					rows="4"
					required
					bind:value={formData.message}
				></textarea>
			</div>
			<!-- Honeypot fields - hidden from humans but visible to bots -->
			<div class="hidden">
				<label for="website">Website (leave blank)</label>
				<input
					id="website"
					type="text"
					name="website"
					bind:value={formData.website}
					tabindex="-1"
					autocomplete="off"
				/>
			</div>
			<div class="hidden">
				<label for="phone">Phone (leave blank)</label>
				<input
					id="phone"
					type="text"
					name="phone"
					bind:value={formData.phone}
					tabindex="-1"
					autocomplete="off"
				/>
			</div>
			<div class="mb-5">
				<label for="agree" class="relative flex gap-x-3 text-base font-medium"
					><input
						id="agree"
						type="checkbox"
						class="peer absolute opacity-0"
						required
						name="agree"
						bind:checked={formData.agree}
					/><span
						class="outline-primary/50 border-secondary-400 peer-checked:border-secondary-50/50 peer-checked:bg-secondary-50/50 flex h-5 w-5 items-center justify-center rounded border-2 text-transparent outline-2 outline-offset-1 peer-checked:text-white peer-focus:outline"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							fill="currentColor"
							viewBox="0 0 256 256"
							><path
								d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
							></path></svg
						></span
					>Ik heb kennis genomen van de privacyverklaring en ga hiermee akkoord.</label
				>
			</div>
			{#if submitMessage}
				<div class="mb-5 rounded-lg bg-green-600 p-4 text-white">
					{submitMessage}
				</div>
			{/if}
			<button 
				type="submit" 
				class="bg-primary rounded-lg px-4 py-3 font-medium text-white disabled:opacity-50"
				disabled={isSubmitting}
			>
				<span>{isSubmitting ? 'Bezig met verzenden...' : 'Verstuur bericht'}</span>
			</button>
		</form>
	</div>
</div>
