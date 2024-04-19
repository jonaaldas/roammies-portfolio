import jwt from 'jsonwebtoken';
import getUserByEmail from '../utils/getUserByEmail';
export default defineEventHandler(async event => {
	try {
		// TODO: add error handling
		const nitro = useNitroApp();
		const {token} = getQuery(event, 'token');
		console.log('🚀 ~ token:', token);

		if (!token) {
			return {status: 400, body: {error: 'Token is required', success: false}};
		}

		const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
		console.log('🚀 ~ decoded:', decoded);

		if (!decoded) {
			return {status: 400, body: {error: 'Invalid token', success: false, error: decoded}};
		}
		console.log('jey');

		const user = await getUserByEmail(decoded.email);
		console.log('🚀 ~ user:', user);
		if (!user) {
			await nitro.db.insert('roammies_users', {
				email: decoded.email,
				payment_id: decoded.stripe_customer_id,
				paid: 1,
				role: 'user'
			});
		}

		const userInfo = {
			email: decoded.email,
			role: user ? user.role : 'user',
			paid: user ? user.paid : 1
		};

		const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

		setCookie(event, 'Authorization', refreshToken, {
			httpOnly: process.env.NODE_ENV === 'production',
			secure: process.env.NODE_ENV === 'production'
		});

		return {
			body: {success: true, message: 'Successfully logged in', user: decoded}
		};
	} catch (error) {
		console.log('🚀 ~ error:', error);
		return {
			body: {success: false, message: 'Error has occurred', error: error.message}
		};
	}
});
