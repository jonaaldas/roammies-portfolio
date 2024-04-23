<template>
	<section class="bg-gray-100">
		<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 border">
			<div class="flex items-center mb-6 text-2xl font-semibold cursor-pointer" @click="navigateTo('/')">
				<img src="../assets/img/R_transparentcrop.png" alt="" class="w-[300px]" />
			</div>
			<div class="w-full card md:mt-0 sm:max-w-md xl:p-0">
				<div class="card bg-base-100">
					<div class="card-body">
						<h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl d">Register</h1>

						<div class="space-y-4 md:space-y-6" action="#">
							<GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" :auto-select="true"></GoogleSignInButton>
							<div>
								<label for="email" class="block mb-2 text-sm font-medium">Your email</label>
								<input
									type="email"
									name="email"
									id="email"
									class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="name@company.com"
									required=""
									v-model="email"
								/>
							</div>
							<span v-if="error" class="text-color-red">{{ message }}</span>
							<span v-if="!error" class="text-color-red">{{ message }}</span>
							<button class="w-full btn-active btn btn-secondary" @click="login">
								<span v-if="!loading">Log In</span>
								<span v-if="loading" class="loading loading-xs"></span>
							</button>
							<button class="w-full btn-active btn btn-secondary" @click="register">
								<span v-if="!loading">Register</span>
								<span v-if="loading" class="loading loading-xs"></span>
							</button>

							<button class="w-full btn-active btn btn-primary" @click="loginAsAdmin">
								<span v-if="!loading">Log in Admin</span>
								<span v-if="loading" class="loading loading-xs"></span>
							</button>

							<button class="w-full btn-active btn" @click="loginAsUser">
								<span v-if="!loading">Log in User</span>
								<span v-if="loading" class="loading loading-xs"></span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
	import {ref, onMounted} from 'vue';
	import {GoogleSignInButton} from 'vue3-google-signin';

	const email = ref('');
	const error = ref(false);
	const message = ref('');
	const loading = ref(false);
	const redirect = ref('');

	const loginGoogle = () => {
		const {data, error} = auth.signInWithOAuth({
			provider: 'google',
			options: {
				queryParams: {
					refi: 'offline',
					prompt: 'consent'
				}
			}
		});
		console.log('🚀 ~ loginGoogle ~ error:', error);
		console.log('🚀 ~ loginGoogle ~ data:', data);
	};

	const login = async () => {
		try {
			if (email.value === '') {
				error.value = true;
				errorMessage.value = 'Please enter your email';
			} else {
				loading.value = true;
				const {body} = await $fetch('/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email.value
					})
				});

				if (body.success && body.loggedIn) {
					await navigateTo('/dashboard');
					// const store = useAuthStore();
					// store.setUser(body.user);
				}

				if (body.success) {
					message.value = body.message;
				}

				if (body.error) {
					error.value = true;
					message.value = body.error;
				}
			}
		} catch (error) {
			console.error(error);
			error.value = true;
		} finally {
			loading.value = false;
		}
	};

	const handleLoginSuccess = async response => {
		const {credential} = response;
		try {
			const {body} = await $fetch('/api/google-auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					googleToken: credential
				})
			});
			if (body.success) {
				await navigateTo('/dashboard');
				// const store = useAuthStore();
				// store.setUser(body.user);
			}
		} catch (error) {
			console.log('🚀 ~ handleLoginSuccess ~ error:', error);
			this.$router.push('/');
		}

		console.log('Access Token', credential);
	};

	// handle an error event
	const handleLoginError = () => {
		console.error('Login failed');
	};

	const loginAsAdmin = async () => {
		const response = await $fetch('/api/set-dummy-user?type=admin', {
			method: 'POST'
		});
		if (response.status === 200) {
			navigateTo('/profile');
		}
		console.log('🚀 ~ loginAsAdmin ~ response:', response);
	};

	const loginAsUser = async () => {
		const response = await $fetch('/api/set-dummy-user?type=user', {
			method: 'POST'
		});
		if (response.status === 200) {
			navigateTo('/profile');
		}
	};

	onMounted(() => {
		// const store = useAuthStore();
		// console.log(store.user);
	});
</script>
<style lang=""></style>
