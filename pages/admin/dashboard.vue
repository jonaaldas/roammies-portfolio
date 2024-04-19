<template lang="">
	<div class="flex flex-row">
		<nav class="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
			<div class="mx-4 flex items-center gap-2 font-black">Very Fancy Logo</div>
			<ul class="menu space-y-7">
				<li>
					<div @click="changeTab('upload-schools')" class="active">Upload Schools</div>
				</li>
				<li>
					<div @click="changeTab('users')">Users</div>
				</li>
				<li>
					<div @click="changeTab('sales')">Sales</div>
				</li>
			</ul>
		</nav>
		<main class="w-full">
			<Upload />
		</main>
	</div>
</template>
<script setup>
	import {ref} from 'vue';
	definePageMeta({
		middleware: 'admin'
	});

	const tab = ref('upload_schools');

	const changeTab = tab => {
		tab.value = tab;
	};
</script>
<style lang=""></style>
