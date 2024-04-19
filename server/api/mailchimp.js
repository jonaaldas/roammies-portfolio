import mailchimp from '@mailchimp/mailchimp_marketing';

export default defineEventHandler(async event => {
	const {email, firstName} = await readBody(event);

	if (!email || !firstName) {
		return new Response('Please provide all required fields', {status: 400});
	}

	try {
		mailchimp.setConfig({
			apiKey: process.env.MAILCHIMP_API_KEY,
			server: 'us21'
		});

		const listId = '34d0cd1bc6';

		const subscribingUser = {
			firstName: firstName,
			email: email
		};

		const response = await mailchimp.lists.addListMember(listId, {
			email_address: subscribingUser.email,
			status: 'subscribed',
			merge_fields: {
				FNAME: subscribingUser.firstName,
				LNAME: subscribingUser.lastName
			}
		});

		console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);

		return {
			statusCode: 200,
			body: {
				success: true,
				message: 'Success! Please check your email!'
			}
		};
	} catch (error) {
		if (error && error.response && error.response.body && error.response.body.title) {
			return {
				statusCode: 500,
				body: {
					success: false,
					message: error.response.body.title
				}
			};
		}
	}
});
