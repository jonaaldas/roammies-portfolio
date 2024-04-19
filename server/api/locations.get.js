export default defineEventHandler(async event => {
	try {
		const nitro = useNitroApp();
		const query = `select country from locations`;
		const locations = await nitro.db.query(query);

		return {
			status: 200,
			body: {
				success: true,
				locations
			}
		};
	} catch (error) {
		return {status: 500, body: {success: false, message: 'An error occurred getting locations!'}};
	}
});
