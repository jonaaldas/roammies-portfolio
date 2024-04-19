import jwt from 'jsonwebtoken';

const createToken = payload => {
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
	return refreshToken;
};
export default defineEventHandler(async event => {
	const {type} = getQuery(event, 'type');

	const adminPayload = {
		email: 'admin@gmail.com',
		role: 'admin',
		paid: 1,
		payment_id: 'cus_PbdBargunfD37e'
	};

	const userPayload = {
		email: 'user@gmail.com',
		role: 'user',
		paid: 1,
		payment_id: 'cus_PbdBargunfD37e'
	};

	let token;
	if (type === 'admin') {
		token = createToken(adminPayload);
	} else {
		token = createToken(userPayload);
	}

	setCookie(event, 'Authorization', token, {
		httpOnly: process.env.NODE_ENV === 'production',
		secure: process.env.NODE_ENV === 'production'
	});
	return {
		status: 200,
		body: {message: `Logged in as ${type}`}
	};
});
