export default defineEventHandler(async event => {
	console.log('Test');
	console.log(process.env.NODE_ENV);

	return {
		status: 200,
		body: {
			success: true,
			message: 'Test'
		}
	};
});
