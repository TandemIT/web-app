<script>
	import ArrowRight from "@tabler/icons-svelte/icons/arrow-right";
	import Check from "@tabler/icons-svelte/icons/check";
</script>

<div class="bg-[#F8F3ED] text-secondary-800 pt-16 pb-36">
	<div class="wrapper grid lg:grid-cols-12 gap-10">
		<div class="relative lg:block hidden lg:col-span-4 pr-7 overflow-hidden">
			<img class="absolute" src="pattern.png" alt="Pattern banner" width="467" height="961" />
		</div>
		<div class="lg:col-span-7">
			<span class="subtitle !text-secondary-600">Over ons</span>
			<h2 class="header !text-secondary-900">
				Een hecht team van enthousiaste HBO-i studenten.
			</h2>
			<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
			<div class="grid lg:grid-cols-2 gap-8 my-6">
				<div class="flex gap-x-3">
					<Check class="text-secondary-600" />
					<div>
						<span class="font-semibold">Flexibel</span>
						<p>Stet clita kasd gubergren, no sea takimata sanctus voluptua</p>
					</div>
				</div>
				<div class="flex gap-x-3">
					<Check class="text-secondary-600" />
					<div>
						<span class="font-semibold">Flexibel</span>
						<p>Stet clita kasd gubergren, no sea takimata sanctus voluptua</p>
					</div>
				</div>
				<div class="flex gap-x-3">
					<Check class="text-secondary-600" />
					<div>
						<span class="font-semibold">Flexibel</span>
						<p>Stet clita kasd gubergren, no sea takimata sanctus voluptua</p>
					</div>
				</div>
				<div class="flex gap-x-3">
					<Check class="text-secondary-600" />
					<div>
						<span class="font-semibold">Flexibel</span>
						<p>Stet clita kasd gubergren, no sea takimata sanctus voluptua</p>
					</div>
				</div>
			</div>
			<p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
			<a href={'/contact'} class="flex items-center gap-x-1 font-semibold underline hover:gap-x-2 duration-300 mt-5">
				Neem contact op
				<ArrowRight />
			</a>
		</div>
	</div>
</div>
