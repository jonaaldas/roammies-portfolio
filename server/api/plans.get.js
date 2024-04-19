import {useServerStripe} from '#stripe/server';

export default defineEventHandler(async event => {
	try {
		const stripe = await useServerStripe(event);

		const prices = await stripe.prices.list({
			limit: 3
		});

		if (!prices) {
			return {
				status: 400,
				body: {success: false, message: 'There was an error getting prices'}
			};
		}

		let plan = [];
		if (prices) {
			for (const price of prices.data) {
				const product = await stripe.products.retrieve(price.product);
				plan.push({
					price_id: price.id,
					currency: price.currency,
					recurring: price.recurring.interval,
					product_name: product.name,
					product_description: product.description,
					unit_amount: price.unit_amount / 100
				});
			}
		}

		return {
			status: 200,
			body: {success: true, message: 'Success', plan: plan}
		};
	} catch (error) {
		console.error('Error:', error);
	}
});
