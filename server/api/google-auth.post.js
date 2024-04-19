import {OAuth2Client} from 'google-auth-library';
import getUserByEmail from '../utils/getUserByEmail';
import {useServerStripe} from '#stripe/server';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
	const nitro = useNitroApp();
	const client = new OAuth2Client();
	const {googleToken} = await readBody(event);

	try {
		const ticket = await client.verifyIdToken({
			idToken: googleToken,
			audience: process.env.GOOGLE_CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend'
		});
		const payload = ticket.getPayload();
		const user = await getUserByEmail(payload.email);
		if (user) {
			if (user.auth_provider !== 'google') {
				console.log('🚀 ~ user:', user);
				const res = await nitro.db.update(
					'roammies_users',
					{
						auth_provider: 'google',
						first_name: payload.given_name,
						last_name: payload.family_name
					},
					{
						email: payload.email
					}
				);
				if (res.affectedRows === 1) {
					// create refresh token
					const userInfo = {
						email: user.email,
						role: user.role,
						paid: user.paid,
						payment_id: user.payment_id
					};
					const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
					setCookie(event, 'Authorization', refreshToken, {
						httpOnly: process.env.NODE_ENV === 'production',
						secure: process.env.NODE_ENV === 'production'
					});
					return {
						body: {success: true, message: 'Successfully updated user'},
						status: 200
					};
				}
			} else {
				console.log('I am running inside the google auth else');
				const userInfo = {
					email: user.email,
					role: user.role,
					paid: user.paid,
					payment_id: user.payment_id
				};
				const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

				setCookie(event, 'Authorization', refreshToken, {
					httpOnly: process.env.NODE_ENV === 'production',
					secure: process.env.NODE_ENV === 'production'
				});
				return {
					body: {success: true, message: 'Successfully created user'},
					status: 200
				};
			}
		}

		const stripe = await useServerStripe(event);
		const customer = await stripe.customers.create({
			email: payload.email
		});

		const userInfo = {
			email: payload.email,
			role: 'user',
			paid: '0',
			payment_id: customer.id,
			auth_provider: 'google',
			first_name: payload.given_name,
			last_name: payload.family_name
		};

		const res = await nitro.db.insert('users', {...userInfo});
		if (res.affectedRows === 1) {
			// create refresh token
			const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

			setCookie(event, 'Authorization', refreshToken, {
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production'
			});

			return {
				body: {success: true, message: 'Successfully created user'},
				status: 200
			};
		}
		// return true;
	} catch (error) {
		console.log('🚀 ~ error:', error);
		return {
			body: {success: false, message: 'Error creating user'},
			status: 500
		};
	}
});
