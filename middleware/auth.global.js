export default defineNuxtRouteMiddleware(async (to, from) => {
	const {body} = await $fetch('/api/session-user');
	const privateRoutes = ['/dashboard', '/profile'];
	if (privateRoutes.includes(to.path) && body && !body.success) {
		return navigateTo('/');
	}
});
