<template>
	<div>Success Please check your email</div>
</template>

<script setup>
	onMounted(() => {
		localStorage.setItem('paid', true);
	});
</script>

<style scoped></style>
