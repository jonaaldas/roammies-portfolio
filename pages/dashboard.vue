<template>
	<div>
		<NavBar />
		<div class="container">
			<div v-if="schools.length === 0">No Schools</div>
			<div v-else class="flex flex-wrap gap-10 justify-center">
				<div class="card w-96 bg-base-100 shadow-xl p-6" v-for="(school, index) in schools" :key="index" :class="school.isFlipped ? 'flip-container flipped' : 'flip-container'">
					<div class="card">
						<span v-if="school.is_featured == 1" class="indicator-item badge badge-secondary">Featured</span>
						<div class="space-y-5 front" :key="index">
							<div class="card-title flex-col items-start">
								<div class="flex w-full">
									<div class="mr-auto">
										<span class="badge badge-secondary mr-3 text-xs">{{ school.type }}</span>
										<span class="badge badge-secondary text-xs">{{ school.availability }}</span>
									</div>

									<svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
										<path
											d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-24.9 7s-12.4-2.5-24.9-7z"
										/>
									</svg>
									<svg v-if="school.favorite" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
										<path
											fill="red"
											d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
										/>
									</svg>
								</div>
								<div class="flex flex-col w-full">
									<span class="mr-auto max-w-[80%]">{{ school.name }}</span>
									<span class="mr-3">{{ school.city }}, {{ school.country }}</span>
								</div>
							</div>
							<figure>
								<img :src="`https://roammies-bucket.s3.us-east-2.amazonaws.com/${school.image_name}`" alt="" />
							</figure>
							<div class="flex items-center">
								<div class="mr-1">
									<svg class="h-fit" xmlns="http://www.w3.org/2000/svg" height="20" width="22" viewBox="0 0 576 512">
										<path
											d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
										/>
									</svg>
								</div>
								<a :href="school.website_link" target="_blank">{{ school.website_link }}</a>
							</div>
							<div class="flex items-center">
								<div class="mr-1">
									<svg class="h-fit" xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 384 512">
										<path
											d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
										/>
									</svg>
								</div>
								<a :href="school.googleMapsLink" target="_blank">{{ school.address }}</a>
							</div>
							<div class="flex items-center">
								<div class="mr-1">
									<svg xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 448 512">
										<path
											d="M152 88a72 72 0 1 1 144 0A72 72 0 1 1 152 88zM39.7 144.5c13-17.9 38-21.8 55.9-8.8L131.8 162c26.8 19.5 59.1 30 92.2 30s65.4-10.5 92.2-30l36.2-26.4c17.9-13 42.9-9 55.9 8.8s9 42.9-8.8 55.9l-36.2 26.4c-13.6 9.9-28.1 18.2-43.3 25V288H128V251.7c-15.2-6.7-29.7-15.1-43.3-25L48.5 200.3c-17.9-13-21.8-38-8.8-55.9zm89.8 184.8l60.6 53-26 37.2 24.3 24.3c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0l-48-48C70 438.6 68.1 417 79.2 401.1l50.2-71.8zm128.5 53l60.6-53 50.2 71.8c11.1 15.9 9.2 37.5-4.5 51.2l-48 48c-15.6 15.6-40.9 15.6-56.6 0s-15.6-40.9 0-56.6L284 419.4l-26-37.2z"
										/>
									</svg>
								</div>
								<span>
									{{ school.min_age }} - {{ school.max_age }}
									years
								</span>
							</div>
							<div class="flex items-center">
								<div class="mr-1">
									<svg xmlns="http://www.w3.org/2000/svg" height="22" width="20" viewBox="0 0 448 512">
										<path
											d="M92.1 254.6c0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6L152 365.2l4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8c0-35.2-15.2-68.3-40.1-93.2c-25-25-58-38.7-93.2-38.7c-72.7 0-131.8 59.1-131.9 131.8zM274.8 330c-12.6 1.9-22.4 .9-47.5-9.9c-36.8-15.9-61.8-51.5-66.9-58.7c-.4-.6-.7-.9-.8-1.1c-2-2.6-16.2-21.5-16.2-41c0-18.4 9-27.9 13.2-32.3c.3-.3 .5-.5 .7-.8c3.6-4 7.9-5 10.6-5c2.6 0 5.3 0 7.6 .1c.3 0 .5 0 .8 0c2.3 0 5.2 0 8.1 6.8c1.2 2.9 3 7.3 4.9 11.8c3.3 8 6.7 16.3 7.3 17.6c1 2 1.7 4.3 .3 6.9c-3.4 6.8-6.9 10.4-9.3 13c-3.1 3.2-4.5 4.7-2.3 8.6c15.3 26.3 30.6 35.4 53.9 47.1c4 2 6.3 1.7 8.6-1c2.3-2.6 9.9-11.6 12.5-15.5c2.6-4 5.3-3.3 8.9-2s23.1 10.9 27.1 12.9c.8 .4 1.5 .7 2.1 1c2.8 1.4 4.7 2.3 5.5 3.6c.9 1.9 .9 9.9-2.4 19.1c-3.3 9.3-19.1 17.7-26.7 18.8zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM148.1 393.9L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5c29.9 30 47.9 69.8 47.9 112.2c0 87.4-72.7 158.5-160.1 158.5c-26.6 0-52.7-6.7-75.8-19.3z"
										/>
									</svg>
								</div>
								<a :href="`https://wa.me/${school.phone_number}?text=I'm%20interested%20in%20your%school`" target="_blank">{{ school.phone_number }}</a>
							</div>
							<div class="flex items-center">
								<div class="mr-1">
									<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
										<path
											d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
										/>
									</svg>
								</div>
								<a :href="`mailto:${school.email}`" target="_blank">{{ school.email }}</a>
							</div>
							<div class="flex justify-center">
								<a :href="school.facebook" class="mr-3" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 512 512">
										<path
											d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
										/>
									</svg>
								</a>
								<a :href="school.instagram" target="_blank">
									<svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 448 512">
										<path
											d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z"
										/>
									</svg>
								</a>
							</div>
							<div class="card-actions justify-end">
								<button @click="school.isFlipped = !school.isFlipped">See More</button>
							</div>
						</div>
						<!-- back -->
						<div class="back">
							<div class="card">
								<div class="card-body space-y-4">
									<div>
										<strong>About:</strong>
										{{ school.about }}
									</div>
									<div>
										<strong>Short Term Details:</strong>
										{{ school.short_term_details }}
									</div>
									<div>
										<strong>Sign Up Details:</strong>
										{{ school.sign_up_details }}
									</div>
									<div>
										<strong>Do they speak english?:</strong>
										{{ school.english ? 'Yes' : 'No' }}
									</div>
								</div>
							</div>
							<div class="card-actions justify-end mr-10">
								<button @click="school.isFlipped = !school.isFlipped">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	definePageMeta({
		middleware: 'dashboard'
	});

	const schools = ref([]);
	const loading = ref('');
	const error = ref(false);
	const stockImageName = 'dbe63d36ea9c21b7911ab2eda54380d35682258fc8a3e3d39d1d03c1272485fa';
	const isAuth = ref(false);

	const getSchools = async () => {
		loading.value = true;
		try {
			const {body} = await $fetch(`/api/schools`);

			if (body.success === false) {
				console.error('Error:', body.message);
				return [];
			}

			schools.value = body.schools.map(school => {
				if (!school.image_name) {
					school.image_name = stockImageName;
				}
				return school;
			});
		} catch (error) {
			console.log(error);
			error.value = true;
		} finally {
			loading.value = false;
		}
	};

	const logout = () => {
		const auth = useCookie('Authorization');
		if (auth.value) {
			auth.value = '';
			navigateTo('/');
		}
	};

	const copyToClipBoard = email => {
		navigator.clipboard.writeText(email).then(
			function () {
				console.log('Copy Successful');
			},
			function (err) {
				console.log(err);
			}
		);
	};

	const goToPage = page => {
		navigateTo(`/${page}`);
	};

	onMounted(async () => {
		await getSchools();
	});
</script>

<style>
	.flip-container {
		-webkit-perspective: 1000;
		-moz-perspective: 1000;
		-o-perspective: 1000;
		perspective: 1000;
	}
	.flip-container {
		min-height: 120px;
	}
	.flipper {
		-moz-transform: perspective(1000px);
		-moz-transform-style: preserve-3d;
		position: relative;
	}
	.front,
	.back {
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-o-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: 0.6s;
		-webkit-transform-style: preserve-3d;
		-moz-transition: 0.6s;
		-moz-transform-style: preserve-3d;
		-o-transition: 0.6s;
		-o-transform-style: preserve-3d;
		-ms-transition: 0.6s;
		-ms-transform-style: preserve-3d;
		transition: 0.6s;
		transform-style: preserve-3d;
		top: 0;
		left: 0;
		width: 100%;
	}
	.back {
		-webkit-transform: rotateY(-180deg);
		-moz-transform: rotateY(-180deg);
		-o-transform: rotateY(-180deg);
		-ms-transform: rotateY(-180deg);
		transform: rotateY(-180deg);
		position: absolute;
	}
	.flip-container.flipped .back {
		-webkit-transform: rotateY(0deg);
		-moz-transform: rotateY(0deg);
		-o-transform: rotateY(0deg);
		-ms-transform: rotateY(0deg);
		transform: rotateY(0deg);
	}
	.flip-container.flipped .front {
		-webkit-transform: rotateY(180deg);
		-moz-transform: rotateY(180deg);
		-o-transform: rotateY(180deg);
		-ms-transform: rotateY(180deg);
		transform: rotateY(180deg);
	}
	.front {
		z-index: 2;
	}
</style>
