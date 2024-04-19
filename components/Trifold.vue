<template>
	<div class="container">
		<div class="flex flex-col items-center">
			<h2 class="inline text-4xl font-semibold">Additional Tech Use</h2>
		</div>

		<div class="relative z-[2] mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
			<div class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
				<img alt="saas img" class="overflow-hidden rounded-ss-lg" src="../assets/img/jessica-rockowitz-5NLCaz2wJXE-unsplash.jpg" />
			</div>

			<div class="lg:mt-8">
				<div class="badge badge-primary">Cloud Integration</div>
				<h3 class="mt-2 text-3xl font-semibold">AWS S3, Cloudflare & SES</h3>
				<p class="mt-2 text-base font-medium">
					In my project, I've strategically integrated AWS S3, Cloudflare, and SES to build a robust, secure, and efficient digital platform for our school. This combination of services
					enhances our platform's performance, security, and communication capabilities.
				</p>

				<ul class="mt-4 list-inside list-disc text-base">
					<li>
						<b>Image Storage with AWS S3:</b>
						I use AWS S3 to securely store and manage our school's images, ensuring they are safely stored and easily accessible. This scalable storage solution supports our growing
						digital assets efficiently.
					</li>
					<li>
						<b>Performance and Security with Cloudflare:</b>
						Leveraging Cloudflare's infrastructure, I've enhanced our platform's performance and security. Cloudflare helps in speeding up content delivery through its CDN and protects the
						platform from DDoS attacks, ensuring a safe and fast user experience.
					</li>
					<li>
						<b>Email and Login via SES:</b>
						AWS SES is employed for all email communications, including sending newsletters and alerts. Additionally, I've implemented a secure magic link login system using SES,
						streamlining the authentication process for users with a single click.
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
			<div>
				<div class="badge badge-primary">Database Scalability</div>
				<h3 class="mt-2 text-3xl font-semibold">Powered by PlanetScale</h3>
				<p class="mt-2 text-base">
					I leveraged PlanetScale's serverless database for its unmatched scalability, reliability, and speed. It's designed to support dynamic workloads, enabling seamless handling of data
					with zero downtime migrations and automatic sharding.
				</p>

				<ul class="mt-4 list-inside list-disc text-base">
					<li>Seamless Scalability: Automatically adjusts to demand, supporting my project's growth without manual scaling.</li>
					<li>Branching Workflows: Allows for non-disruptive schema changes and feature testing, enhancing development agility.</li>
					<li>Global Reliability: Ensures high availability with distributed SQL and geo-replication, keeping data accessible from anywhere.</li>
					<li>Instant Maintenance: Offers zero downtime for schema migrations, ensuring my project remains operational and user-friendly at all times.</li>
				</ul>
			</div>

			<div class="order-first lg:order-last">
				<div class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
					<img alt="SaaS platform image" class="overflow-hidden rounded-ss-lg" src="../assets/img/jessica-rockowitz-5NLCaz2wJXE-unsplash.jpg" />
				</div>
			</div>
		</div>

		<div class="mt-8 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-12">
			<div class="overflow-hidden rounded-lg bg-base-200 shadow-md transition-all hover:shadow-xl">
				<img alt="saas img" class="overflow-hidden rounded-ss-lg" src="../assets/img/jessica-rockowitz-5NLCaz2wJXE-unsplash.jpg" />
			</div>

			<div class="lg:mt-8">
				<div class="badge badge-primary">Authentication</div>
				<h3 class="mt-2 text-3xl font-semibold">Seamless Access</h3>
				<p class="mt-2 text-base">I've simplified access to the platform by implementing two secure and user-friendly login options.</p>

				<ul class="mt-4 list-inside list-disc text-base">
					<li>Magic Link Login: Utilizing AWS SES, I crafted a secure, one-click login process that sends a magic link directly to the user's email.</li>
					<li>Google OAuth: For those preferring to use existing credentials, I integrated Google OAuth to provide a fast and secure sign-in option.</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref} from 'vue';
	const showStory = ref(false);

	const showStoryHandler = () => {
		showStory.value = !showStory.value;
	};
</script>

<style></style>
