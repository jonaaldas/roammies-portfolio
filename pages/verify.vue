<template>
	<div>
		<h1>Login in...</h1>
	</div>
</template>
<script>
	export default {
		methods: {
			async verify() {
				try {
					const {body} = await $fetch(`/api/verify?token=${this.$route.query.token}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					});

					console.log('🚀 ~ verify ~ body:', body);

					if (body.success) {
						console.log('🚀 ~ verify ~ body.success:', body.success);
						this.$router.push('/dashboard');
					} else {
						console.log('error ', body.error);
						this.$router.push('/login');
					}
				} catch (err) {
					console.log('error 123 ', err);
					this.$router.push('/login');
				}
			}
		},
		mounted() {
			this.verify();
		}
	};
</script>
<style></style>
