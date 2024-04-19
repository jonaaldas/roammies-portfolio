import {useServerStripe} from '#stripe/server';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
	let stripeEvent;
	try {
		const nitro = useNitroApp();
		const body = await readRawBody(event);
		const headers = event.node.req.headers;
		const signature = headers['stripe-signature'];
		// const endpointSecret = 'whsec_9eb341b1845d7708a593a48cd3d769d492455c26c6bad61bdfd705ffef9b948f'; //cli
		const endpointSecret = 'whsec_2ms54OJPqaqweNREyXlQUEIrGVahEcMD'; //dev ngrok
		// const endpointSecret = 'whsec_9P0WNkn8tkywb1Gi94qOmpLIT1cuUCrt'; // stripe and netlify
		const stripe = await useServerStripe(event);
		try {
			stripeEvent = stripe.webhooks.constructEvent(body, signature, endpointSecret);
			if (stripeEvent.type == 'payment_intent.succeeded') {
				let customer = await stripe.customers.retrieve(stripeEvent.data.object.customer);
				const accessToken = jwt.sign(
					{
						email: customer.email,
						stripe_customer_id: stripeEvent.data.object.customer
					},
					process.env.JWT_ACCESS_TOKEN,
					{expiresIn: '1h'}
				);
				await sendEmail('login', customer.email, accessToken);
				await nitro.db.insert('roammies_customers', {
					stripe_customer_id: stripeEvent.data.object.customer,
					stripe_subscription: stripeEvent
				});
			}
		} catch (err) {
			console.log('🚀 ~ err:', err);
			return {
				status: 200,
				body: {
					message: 'Success'
					// You can include additional data in the body if needed
				}
			};
		}
		return {
			status: 200
		};
	} catch (error) {
		console.log(error);
		return {status: 500, body: {success: false, message: 'An error occurred getting locations!'}};
	}
});
