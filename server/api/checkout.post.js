import {useServerStripe} from '#stripe/server';
export default defineEventHandler(async event => {
	const defineUrl = () => {
		if (process.env.NODE_ENV === 'development') {
			return 'http://localhost:3000';
		} else {
			return 'https://cute-kataifi-536829.netlify.app';
		}
	};

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
