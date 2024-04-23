<template>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
					<li><span @click="goTo('/dashboard')">Dashboard</span></li>
					<li><span @click="() => navigateTo('/admin/dashboard')">Admin Dashboard</span></li>
					<li><span @click="navigateTo('/profile')">Profile Page</span></li>
					<li>
						<span
							@click="
								navigateTo('www.google.com', {
									external: true
								})
							"
						>
							Live Site
						</span>
					</li>
					<li><span>Repo</span></li>
				</ul>
			</div>
			<div class="cursor-pointer">
				<img class="w-[300px]" src="../assets/img/R_transparentcrop.png" alt="" />
			</div>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li><span @click="() => navigateTo('/dashboard')">Dashboard</span></li>
				<li><span @click="() => navigateTo('/admin/dashboard')">Admin Dashboard</span></li>
				<li><span @click="navigateTo('/profile')">Profile Page</span></li>
				<li>
					<span
						@click="
							navigateTo('https://www.google.com', {
								external: true
							})
						"
					>
						Live Site
					</span>
				</li>
				<li><span>Repo</span></li>
			</ul>
		</div>
		<div class="navbar-end space-x-4">
			<button class="btn btn-sm btn-primary" @click="loginAsAdmin">Log in Admin</button>
			<button class="btn btn-sm btn-secondary" @click="loginAsUser">Log in User</button>
			<button class="btn btn-sm" @click="checkout">Log in</button>
		</div>
	</div>
</template>
<script setup>
	import {ref, watch} from 'vue';
	const loading = ref(false);
	const loggedAsDummyUser = ref(true);

	const logOut = () => {
		// remove cookie

		navigateTo('/login');
	};

	const goTo = async url => {
		await navigateTo(url);
	};

	const checkout = async () => {
		const hasPaid = localStorage.getItem('paid');
		console.log('🚀 ~ checkout ~ hasPaid:', hasPaid);

		try {
			loading.value = true;
			const {body} = await $fetch('api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(hasPaid)
			});
			if (!body) {
				console.log('error');
				return;
			}
			navigateTo(body.url, {external: true});
		} catch (error) {
			console.log('🚀 ~ checkout ~ error:', error);
		} finally {
			loading.value = false;
		}
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
</script>
<style></style>
