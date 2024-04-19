<template>
	<section class="py-8 lg:py-20" id="pricing">
		<div id="pricing" class="container">
			<div class="text-center">
				<h2 class="text-4xl font-semibold">Pricing Plans</h2>
				<p class="mt-2 text-lg">Explore flexible pricing that scales with your needs. No hidden fees, just transparent options for your success.</p>
			</div>

			<main class="grid bg-base-100 lg:aspect-[2/1] lg:grid-cols-2">
				<!-- image -->
				<figure class="pointer-events-none bg-base-300 object-cover max-lg:hidden">
					<img src="https://picsum.photos/id/283/1200/1200" alt="Login" class="h-full" />
				</figure>
				<!-- /image -->
				<div class="card border border-base-content/10 bg-base-100 p-3 shadow-sm">
					<div class="card bg-base-200 p-6 text-base-content">
						<div class="flex justify-between">
							<h3 class="text-xl font-semibold text-primary">Product Name</h3>
							<div class="badge badge-outline text-sm font-medium">Best Offer</div>
						</div>

						<p class="mt-4 flex items-baseline">
							<span class="text-5xl font-bold tracking-tight">19</span>
							<span class="ml-1 text-xl font-semibold">/Year</span>
						</p>
						<p class="mt-6">Description</p>
					</div>
					<div class="p-6">
						<ul class="list-inside list-disc space-y-3 text-base-content" role="list">
							<li>
								<span class="ms-3">Browse the map</span>
							</li>
							<li>
								<span class="ms-3">Access to 100+ daycares, nurseries, and drop-off programs</span>
							</li>
							<li>
								<span class="ms-3">Map view</span>
							</li>
							<li>
								<span class="ms-3">Limited search</span>
							</li>
							<li>
								<span class="ms-3">See contact information and short-term details</span>
							</li>
							<li>
								<span class="ms-3">Save your favorite skills</span>
							</li>
							<li>
								<span class="ms-3">Newsletter</span>
							</li>
						</ul>
					</div>
					<button class="btn btn-secondary btn-block mt-auto" @click="checkout()">Get It Today!checkout</button>
				</div>
			</main>
		</div>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				period: 'annual',
				pricing: {
					regular: '$100',
					earlyBird: '$25'
				},
				plan: null
			};
		},
		methods: {
			async checkout() {
				try {
					const response = await $fetch('/api/checkout', {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify('price_1OSMhrGA1jUPdVjNIWjekLK3')
					});

					if (!response.body) {
						navigateTo('/login?redirect=pricing');
						return;
					}

					if (response.body.success) {
						navigateTo(response.body.url, {external: true});
					}
				} catch (error) {
					console.log('🚀 ~ file: Pricing.vue:80 ~ checkout ~ error:', error);
				}
			}
		},
		async mounted() {}
	};
</script>

<style></style>
