<script>
	let email = '7d9Mw@example.com';
</script>


<div class="wrapper mt-10 grid gap-4 lg:grid-cols-12">
	<div class="col-span-4">
		<div class="flex h-fit flex-col gap-6 rounded-xl bg-secondary-600 p-10">
			<h2 class="text-xl font-medium">Contact &amp; info</h2>
			<div>
				<p class="mb-2 text-lg font-medium">Mail ons</p>
				<p>Mail met ons.</p>
				<a class="font-medium" href="mailto:{email}"> {email}</a>
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
				<p class="font-medium">Nederland</p>
			</div>
		</div>
	</div>
	<div class="col-span-1"></div>
	<div class="col-span-7">
		<form class="flex flex-col gap-5 rounded-xl bg-secondary-600 p-10">
			<div class="grid gap-x-5 lg:grid-cols-2">
				<div class="mb-5">
					<label for="firstName" class="mb-1 block text-sm font-medium">Voornaam</label><input
						id="firstName"
						type="text"
						class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
						required
						name="firstName"
						value=""
					/>
				</div>
				<div class="mb-5">
					<label for="lastName" class="mb-1 block text-sm font-medium">Achternaam</label><input
						id="lastName"
						type="text"
						class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
						required
						name="lastName"
						value=""
					/>
				</div>
			</div>
			<div class="mb-5">
				<label for="company" class="mb-1 block text-sm font-medium">Bedrijfsnaam</label><input
					id="company"
					type="text"
					class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
					required
					name="company"
					value=""
				/>
			</div>
			<div class="mb-5">
				<label for="email" class="mb-1 block text-sm font-medium">E-mailadres</label><input
					id="email"
					type="text"
					class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
					required
					name="email"
					value=""
				/>
			</div>
			<div class="mb-5">
				<label for="phoneNumber" class="mb-1 block text-sm font-medium">Telefoonnummer</label><input
					id="phoneNumber"
					type="text"
					class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
					required
					name="phoneNumber"
					value=""
				/>
			</div>
			<div class="mb-5">
				<label for="message" class="mb-1 block text-sm font-medium"
					>Bericht, vraag of opmerking</label
				><textarea
					name="message"
					id="message"
					class="w-full rounded-lg border-2 border-secondary-400 bg-transparent px-3 py-3 outline-hidden duration-300 focus:bg-secondary-50/5"
					rows="4"
					required
				></textarea>
			</div>
			<div class="mb-5">
				<label for="agree" class="relative flex gap-x-3 text-sm font-medium"
					><input
						id="agree"
						type="checkbox"
						class="peer absolute opacity-0"
						required
						name="agree"
						value=""
					/><span
						class="outline-primary/50 flex h-5 w-5 items-center justify-center rounded-sm border-2 border-secondary-400 text-transparent outline-2 outline-offset-1 peer-checked:border-secondary-50/50 peer-checked:bg-secondary-50/50 peer-checked:text-white peer-focus:outline"
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
			<button type="submit" class="bg-primary rounded-lg px-4 py-3 font-medium text-white"
				><span>Verstuur bericht</span></button
			>
		</form>
	</div>
</div>
