export default defineEventHandler(async event => {
	const cookie = getCookie(event, 'Authorization');
	// remove cookie
	setCookie(event, 'Authorization', '', {
		httpOnly: process.env.NODE_ENV === 'production',
		secure: process.env.NODE_ENV === 'production'
	});
	return {
		body: {success: true, message: 'Successfully logged out'}
	};
});
