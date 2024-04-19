<template lang="">
	<section class="py-8 lg:py-20" id="home">
		<div class="container">
			<div class="grid gap-12 lg:grid-cols-2">
				<div>
					<h1 class="text-4xl font-black tracking-tighter lg:text-6xl lg:leading-none">A database for short term daycares around the world</h1>
					<div class="space-y-3 text-xl">
						<p class="mt-8 text-lg">This is a Nuxt 3 app built with different technologies</p>
						<ul class="list-disc ml-3">
							<li>Nuxt 3</li>
							<li>Tailwind CSS and Daisy UI</li>
							<li>Mysql DB</li>
							<li>TypeScript</li>
							<li>Payment Gatweway with stripe</li>
						</ul>
						<div>
							<button class="btn btn-lg" @click="checkout">Start Now</button>
						</div>
					</div>
				</div>

				<div>
					<div class="rounded-2xl bg-gradient-to-r from-indigo-200 via-red-200 to-purple-300 p-3" data-card3d="" data-card3d-perspective="1000" data-card3d-full-page-listening="true">
						<img src="../assets/img/jessica-rockowitz-5NLCaz2wJXE-unsplash.jpg" alt="" class="rounded-2xl" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	const checkout = async () => {
		const {body} = await $fetch('/api/checkout', {
			method: 'POST'
		});
		console.log(body);
		await navigateTo(body.url, {external: true});
	};
</script>
<style></style>
