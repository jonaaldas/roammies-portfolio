import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses';
import loginEmailTemplate from './loginEmailTemplate';

const client = new SESClient({
	region: process.env.SES_REGION,
	credentials: {
		accessKeyId: process.env.SES_ACCESS_KEY,
		secretAccessKey: process.env.SES_SECRET_KEY
	}
});
const buildParams = (email, token) => {
	return {
		Destination: {
			ToAddresses: [email]
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: loginEmailTemplate(token)
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: 'Login to Roammies'
			}
		},
		Source: 'noreply@roammies.com',
		ReplyToAddresses: ['roammies@gmail.com']
	};
};

const sendEmail = async (type, email, token = null) => {
	switch (type) {
		case 'login':
			// send login email
			try {
				const params = buildParams(email, token);
				const command = new SendEmailCommand(params);
				const {$metadata} = await client.send(command);

				if ($metadata.httpStatusCode == 200) {
					return {success: true, message: 'Successfully sent email'};
				} else {
					return {success: false, message: 'Failed to send email'};
				}
			} catch (error) {
				console.log('🚀 ~ sendEmail= ~ error:', error);
			}
			break;
	}
};

export default sendEmail;
