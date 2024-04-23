export default defineEventHandler(async event => {
	try {
		const nitro = useNitroApp();
		const locations = await nitro.db.execute('select country from locations');

		return {
			status: 200,
			body: {
				success: true,
				locations: locations.rows
			}
		};
	} catch (error) {
		return {status: 500, body: {success: false, message: 'An error occurred getting locations!'}};
	}
});
