import jwt from 'jsonwebtoken';
import {useServerStripe} from '#stripe/server';
import sendEmail from '../utils/sendEmail';

export default defineEventHandler(async event => {
	try {
		const {email} = await readBody(event);

		if (!email) {
			return {status: 400, body: {error: 'Email', success: false}};
		}

		const lowercasedEmail = email.toLowerCase();

		const nitro = useNitroApp();
		const query = 'SELECT * FROM users WHERE email = ?';
		let res = await nitro.db.execute({
			sql: query,
			args: [lowercasedEmail]
		});

		if (res.rows[0] && res.rows[0].auth_provider === 'google') {
			console.log('Google auth provider found');
			const userInfo = {
				email: res[0].email,
				role: res[0].role,
				paid: res[0].paid,
				payment_id: res[0].payment_id
			};

			const refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});

			setCookie(event, 'Authorization', refreshToken, {
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production'
			});
			return {status: 200, body: {message: 'Logged in', success: true, loggedIn: true}};
		}

		if (res.rows.length > 0) {
			const user = {
				email: res.rows[0].email,
				role: res.rows[0].role,
				paid: res.rows[0].paid,
				payment_id: res.rows[0].payment_id
			};
			const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {expiresIn: '1h'});
			const emailResponse = await sendEmail('login', lowercasedEmail, accessToken);
			if (emailResponse.success === false) {
				return {status: 500, body: {error: 'An error has occurred', success: false}};
			} else {
				return {
					body: {success: true, message: 'Please check your email to login'},
					status: 200
				};
			}
		}

		const stripe = await useServerStripe(event);
		const customer = await stripe.customers.create({
			email: lowercasedEmail
		});

		await nitro.db.execute({
			sql: 'INSERT INTO users (email, payment_id, role) VALUES (:email, :payment_id, :role)',
			args: {
				email: lowercasedEmail,
				payment_id: customer.id,
				role: 'user'
			}
		});

		const user = {email: lowercasedEmail};
		const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {expiresIn: '1h'});

		const emailResponse = await sendEmail('login', lowercasedEmail, accessToken);
		if (emailResponse.success === false) {
			return {status: 500, body: {error: 'Failed to send email', success: false}};
		} else {
			return {
				body: {success: true, message: 'Successfully sent email'},
				status: 200
			};
		}
	} catch (error) {
		console.error('Registration Error:', error);

		return {status: 500, body: {error: error || 'Something went wrong please try again. ', success: false}};
	}
});
