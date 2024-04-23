export default defineEventHandler(async event => {
	const nitro = useNitroApp();
	try {
		const query = `
		SELECT
			schools.*,
			locations.flag,
			locations.country,
			CASE WHEN featured_schools.school_id IS NULL THEN
				0
			ELSE
				1
			END AS is_featured
		FROM
			schools
			INNER JOIN locations ON schools.country = locations.country
			LEFT JOIN featured_schools ON schools.id = featured_schools.school_id
		WHERE
			schools.website_link IS NOT NULL
			AND schools.phone_number IS NOT NULL
			AND schools.email IS NOT NULL
		ORDER BY
			is_featured DESC,
			schools.id;
		`;

		let {rows} = await nitro.db.execute(query);

		if (rows.length === 0) {
			return {
				status: 200,
				body: {success: false, schools: []}
			};
		}

		rows = rows.map(school => {
			const min_age = school.min_age;
			const max_age = school.max_age / 12;

			return {
				...school,
				max_age,
				min_age,
				isFlipped: false,
				googleMapsLink: `https://maps.google.com/?q=${school.lat},${school.lng}`
			};
		});
		return {
			status: 200,
			body: {success: true, schools: rows}
		};
	} catch (error) {
		console.log('🚀 ~ file: schools.get.js:26 ~ error:', error);
		return [];
	}
});
