import jwt from 'jsonwebtoken';
export default defineEventHandler(async event => {
	const cookie = getCookie(event, 'Authorization');
	let res = await jwt.verify(cookie, process.env.JWT_REFRESH_TOKEN, async (err, user) => {
		if (err) {
			return {
				success: false,
				body: 'Invalid token'
			};
		} else {
			return {
				success: true,
				body: user
			};
		}
	});
	return {
		status: 200,
		body: res
	};
});
