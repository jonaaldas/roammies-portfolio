<template>
	<div class="flex flex-row">
		<nav class="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
			<div class="mx-4 flex items-center gap-2 font-black cursor-pointer" @click="navigateTo('/')">
				<img class="w-[300px]" src="../assets/img/R_transparentcrop.png" alt="" />
			</div>
			<ul class="menu space-y-7">
				<li>
					<div @click="changeTab('profile')" class="active">Profile</div>
				</li>
				<li>
					<div @click="navigateTo('/dashboard')">See all schools</div>
				</li>
				<li>
					<div @click="logout()">Log out</div>
				</li>
			</ul>
		</nav>
		<main class="w-full mt-11">
			<div v-if="tab === 'profile' && user">
				<form @submit.prevent="save()">
					<input type="email" placeholder="email" class="input input-bordered w-full max-w-xs" v-model="user.email" />
				</form>
				<span class="mt-5">User info</span>
				<pre class="mt-5">{{ user }}</pre>
			</div>
		</main>
	</div>
</template>
<script setup>
	import {ref} from 'vue';
	const tab = ref('profile');
	const user = ref();

	const changeTab = tab => {
		navigateTo('/' + tab);
	};

	const getUser = async () => {
		const {body} = await $fetch('/api/session-user');
		user.value = body.body;
	};

	const save = () => {
		console.log('save');
	};

	const logout = async () => {
		const {body} = await $fetch('/api/logout');
		if (body.success) {
			navigateTo('/login');
		}
	};

	onMounted(async () => {
		await getUser();
	});
</script>
<style></style>
