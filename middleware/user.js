export default defineNuxtRouteMiddleware(async (to, from) => {
	const {body} = await $fetch('/api/session-user');
	if (body.body.role !== 'user') {
		return navigateTo('/');
	}
});
