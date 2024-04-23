import {useServerStripe} from '#stripe/server';
import jwt from 'jsonwebtoken';
export default defineEventHandler(async event => {
	const body = await readBody(event);
	console.log('🚀 ~ hasPaid:', body);
	if (body) {
		return {
			success: true,
			body: {
				url: '/login'
			}
		};
	}
	const defineUrl = () => {
		if (process.env.NODE_ENV === 'development') {
			return 'http://localhost:3000';
		} else {
			return 'https://cute-kataifi-536829.netlify.app';
		}
	};

	const cookie = getCookie(event, 'Authorization');

	if (cookie) {
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
		if (res.success) {
			const user = res.body.email;
			return {
				success: true,
				body: {
					url: '/dashboard'
				}
			};
		}
	}

	try {
		const stripe = await useServerStripe(event);
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: 'price_1OSMhrGA1jUPdVjNIWjekLK3',
					quantity: 1
				}
			],
			mode: 'subscription',
			success_url: `${defineUrl()}/success`,
			cancel_url: `${defineUrl()}/cancel`
		});

		return {
			status: 200,
			body: {success: true, url: session.url, session}
		};
	} catch (error) {
		console.log('🚀 ~ file: checkout.post.js:21 ~ error:', error);
		return {status: 500, body: {success: false, message: 'An error occurred '}};
	}
});
