import db from '../db/planetscale.js';

export default defineEventHandler(async event => {
	const nitro = useNitroApp();

	try {
		const query = `
		SELECT
			roammies_schools.*,
			roammies_locations.flag,
			roammies_locations.country,
			CASE WHEN roammies_featured_schools.school_id IS NULL THEN
				0
			ELSE
				1
			END AS is_featured
		FROM
			roammies_schools
			INNER JOIN roammies_locations ON roammies_schools.country = roammies_locations.country
			LEFT JOIN roammies_featured_schools ON roammies_schools.id = roammies_featured_schools.school_id
		WHERE
			roammies_schools.website_link IS NOT NULL
			AND roammies_schools.phone_number IS NOT NULL
			AND roammies_schools.email IS NOT NULL
		ORDER BY
			is_featured DESC,
			roammies_schools.id;
		`;

		let res = await nitro.db.query(query);

		if (res.length === 0) {
			return {
				status: 200,
				body: {success: false, schools: []}
			};
		}

		res = res.map(school => {
			const min_age = school.min_age;
			const max_age = school.max_age / 12;
			const availability = school.availability.replace(/ /g, ' ');

			return {
				...school,
				max_age,
				min_age,
				isFlipped: false,
				availability,
				googleMapsLink: `https://maps.google.com/?q=${school.lat},${school.lng}`
			};
		});
		return {
			status: 200,
			body: {success: true, schools: res}
		};
	} catch (error) {
		console.log('🚀 ~ file: schools.get.js:26 ~ error:', error);
		return [];
	}
});
