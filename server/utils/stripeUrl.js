import {useServerStripe} from '#stripe/server';

async function createStripeCheckoutSession(event) {
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
			success_url: `https://your-success-url`,
			cancel_url: `https://your-cancel-url`
		});

		return {success: true, url: session.url};
	} catch (error) {
		console.error('Stripe Checkout Error:', error);
		return {success: false, message: 'An error occurred'};
	}
}

export default createStripeCheckoutSession;
