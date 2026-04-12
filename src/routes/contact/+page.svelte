<script lang="ts">
	import { enhance } from '$app/forms';
	import * as m from '$lib/paraglide/messages';
	import type { ActionData, PageData } from './$types';

	interface Props {
		data: PageData;
		form: ActionData;
	}

	let { data, form }: Props = $props();

	// Decode email client-side to avoid scrapers
	let decodedEmail = $derived(
		data.contactInfo.email.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
	);

	let firstLiveError = $derived.by(() => {
		if (!form?.errors) return '';

		return (
			form.errors.general ||
			form.errors.firstName ||
			form.errors.lastName ||
			form.errors.email ||
			form.errors.message ||
			form.errors.agree ||
			''
		);
	});
</script>

<div class="wrapper mt-10 grid gap-4 lg:grid-cols-12">
	<div class="col-span-4">
		<div class="bg-secondary-600 flex h-fit flex-col gap-6 rounded-xl p-10">
			<h2 class="text-xl font-medium">{m['contact.sidebar_title']()}</h2>
			<div>
				<p class="mb-2 text-lg font-medium">{m['contact.mail_us_title']()}</p>
				<p>{m['contact.mail_us_description']()}</p>
				<a class="font-medium" href="mailto:{decodedEmail}">{decodedEmail}</a>
			</div>
			<div>
				<p class="mb-2 text-lg font-medium">{m['contact.opening_hours_title']()}</p>
				<p>{m['contact.opening_hours_value']()}</p>
			</div>
			<div>
				<p class="mb-2 text-lg font-medium">{m['contact.address_details_title']()}</p>
				<p class="font-medium">{data.contactInfo.visitAddress[0]}</p>
				<p class="font-medium">{data.contactInfo.visitAddress[1]}</p>
				<p class="font-medium">
					<span class="text-transparent" style="text-shadow: 0 0 0 currentColor;"
						>{data.contactInfo.visitAddress[2]}</span
					>
				</p>
			</div>
		</div>
	</div>
	<div class="col-span-1"></div>
	<div class="col-span-7">
		<form
			class="bg-secondary-600 flex flex-col gap-5 rounded-xl p-10"
			method="POST"
			use:enhance
		>
			<div class="sr-only" aria-live="assertive" aria-atomic="true">
				{#if form?.error}
					{form.error}
				{:else if firstLiveError}
					{firstLiveError}
				{/if}
			</div>
			<div class="sr-only" aria-live="polite" aria-atomic="true">
				{#if form?.success}
					{form.message}
				{/if}
			</div>
			<div class="grid gap-x-5 lg:grid-cols-2">
				<div class="mb-5">
					<label for="firstName" class="mb-1 block text-base font-medium"
						>{m['contact.first_name']()}</label
					>
					<input
						id="firstName"
						type="text"
						class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
						aria-invalid={form?.errors?.firstName ? 'true' : undefined}
						aria-describedby={form?.errors?.firstName ? 'firstName-error' : undefined}
						required
						name="firstName"
						value={form?.data?.firstName || ''}
					/>
					{#if form?.errors?.firstName}
						<p id="firstName-error" class="mt-1 text-sm text-red-400">
							{form.errors.firstName}
						</p>
					{/if}
				</div>
				<div class="mb-5">
					<label for="lastName" class="mb-1 block text-base font-medium"
						>{m['contact.last_name']()}</label
					>
					<input
						id="lastName"
						type="text"
						class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
						aria-invalid={form?.errors?.lastName ? 'true' : undefined}
						aria-describedby={form?.errors?.lastName ? 'lastName-error' : undefined}
						required
						name="lastName"
						value={form?.data?.lastName || ''}
					/>
					{#if form?.errors?.lastName}
						<p id="lastName-error" class="mt-1 text-sm text-red-400">
							{form.errors.lastName}
						</p>
					{/if}
				</div>
			</div>
			<div class="mb-5">
				<label for="company" class="mb-1 block text-base font-medium"
					>{m['contact.company']()}</label
				>
				<input
					id="company"
					type="text"
					class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
					name="company"
					value={form?.data?.company || ''}
				/>
			</div>
			<div class="mb-5">
				<label for="email" class="mb-1 block text-base font-medium"
					>{m['contact.email']()}</label
				>
				<input
					id="email"
					type="email"
					class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
					aria-invalid={form?.errors?.email ? 'true' : undefined}
					aria-describedby={form?.errors?.email ? 'email-error' : undefined}
					required
					name="email"
					value={form?.data?.email || ''}
				/>
				{#if form?.errors?.email}
					<p id="email-error" class="mt-1 text-sm text-red-400">{form.errors.email}</p>
				{/if}
			</div>
			<div class="mb-5">
				<label for="phoneNumber" class="mb-1 block text-base font-medium"
					>{m['contact.phone_number']()}</label
				>
				<input
					id="phoneNumber"
					type="tel"
					class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
					name="phoneNumber"
					value={form?.data?.phoneNumber || ''}
				/>
			</div>
			<div class="mb-5">
				<label for="message" class="mb-1 block text-base font-medium"
					>{m['contact.message']()}</label
				>
				<textarea
					name="message"
					id="message"
					class="border-secondary-400 focus:bg-secondary-50/5 focus-visible:ring-primary-300 w-full rounded-lg border-2 bg-transparent px-3 py-3 duration-300 focus-visible:ring-2 focus-visible:outline-none"
					aria-invalid={form?.errors?.message ? 'true' : undefined}
					aria-describedby={form?.errors?.message ? 'message-error' : undefined}
					rows="4"
					required
					value={form?.data?.message || ''}
				></textarea>
				{#if form?.errors?.message}
					<p id="message-error" class="mt-1 text-sm text-red-400">
						{form.errors.message}
					</p>
				{/if}
			</div>
			<!-- Honeypot fields - hidden from humans but visible to bots -->
			<div class="hidden">
				<label for="website">{m['contact.honeypot_website']()}</label>
				<input id="website" type="text" name="website" tabindex="-1" autocomplete="off" />
			</div>
			<div class="hidden">
				<label for="phone">{m['contact.honeypot_phone']()}</label>
				<input id="phone" type="text" name="phone" tabindex="-1" autocomplete="off" />
			</div>
			<div class="mb-5">
				<label for="agree" class="relative flex gap-x-3 text-base font-medium">
					<input
						id="agree"
						type="checkbox"
						class="peer absolute opacity-0"
						aria-invalid={form?.errors?.agree ? 'true' : undefined}
						aria-describedby={form?.errors?.agree ? 'agree-error' : undefined}
						required
						name="agree"
						checked={form?.data?.agree || false}
					/>
					<span
						class="outline-primary/50 border-secondary-400 peer-checked:border-secondary-50/50 peer-checked:bg-secondary-50/50 peer-checked:text-secondary-50 flex h-5 w-5 items-center justify-center rounded border-2 text-transparent outline-2 outline-offset-1 peer-focus:outline"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							fill="currentColor"
							viewBox="0 0 256 256"
						>
							<path
								d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
							></path>
						</svg>
					</span>
					{m['contact.agree_text']()}
				</label>
				{#if form?.errors?.agree}
					<p id="agree-error" class="mt-1 text-sm text-red-400">{form.errors.agree}</p>
				{/if}
			</div>
			{#if form?.error}
				<div
					class="bg-accent-500 text-secondary-50 mb-5 rounded-lg p-4"
					role="alert"
					aria-live="assertive"
				>
					{form.error}
				</div>
			{/if}
			{#if form?.errors?.general}
				<div
					class="bg-accent-500 text-secondary-50 mb-5 rounded-lg p-4"
					role="alert"
					aria-live="assertive"
				>
					{form.errors.general}
				</div>
			{/if}
			{#if form?.success}
				<div
					class="bg-primary-500 text-secondary-50 mb-5 rounded-lg p-4"
					role="status"
					aria-live="polite"
				>
					{form.message}
				</div>
			{/if}
			<button
				type="submit"
				class="bg-primary-500 text-secondary-50 rounded-lg px-4 py-3 font-medium disabled:opacity-50"
			>
				<span>{m['contact.submit']()}</span>
			</button>
		</form>
	</div>
</div>
