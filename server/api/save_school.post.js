const nitro = useNitroApp();

const sanitizeStrings = obj => {
	if (!obj) {
		return;
	}

	for (let [key, value] of Object.entries(obj)) {
		if (typeof value == 'string') {
			const string = value.trim();
			obj[key] = string;
		}
	}
	return obj;
};

const parseFormData = async data => {
	for (let [key, value] of Object.entries(data)) {
		if (value === '') {
			return {
				status: 400,
				body: {
					success: false,
					message: `Field ${key} is required`
				}
			};
		}
	}

	try {
		const lat = data.coordinates.split(',')[0];
		const lng = data.coordinates.split(',')[1];

		const arrayAge = data.ages.split('-');
		const max_age = arrayAge[1];
		const min_age = arrayAge[0];

		delete data.ages;
		delete data.coordinates;
		const sanitizeData = sanitizeStrings(data);

		if (lat[0] < -180 || lat[0] > 180 || lng[1] < -90 || lng[1] > 90) {
			return {
				status: 400,
				body: {
					success: false,
					message: `Invalid coordinates`
				}
			};
		}

		const newTypeOfSchool = data.availability
			.map(type => {
				delete type.id;
				return type.name;
			})
			.join(',');

		const cleanPhoneNumber = data.phone_number.replace(/[+\s()-]/g, '');

		const school = {
			...sanitizeData,
			lat: lat,
			lng: lng,
			max_age: max_age,
			min_age: min_age,
			availability: newTypeOfSchool,
			phone_number: cleanPhoneNumber
		};
		school.english = 1;

		const res = await nitro.db.execute({
			sql: `INSERT INTO schools (
                    name, 
                    phone_number, 
                    email, 
                    about, 
                    city, 
                    country, 
                    address, 
                    english, 
                    website_link, 
                    availability, 
                    image_name, 
                    type, 
                    facebook, 
                    instagram, 
                    lat, 
                    lng, 
                    min_age, 
                    max_age, 
                    sign_up_details, 
                    short_term_details
                ) VALUES (
                    :name, 
                    :phone_number, 
                    :email, 
                    :about, 
                    :city, 
                    :country, 
                    :address, 
                    :english, 
                    :website_link, 
                    :availability, 
                    :image_name, 
                    :type, 
                    :facebook, 
                    :instagram, 
                    :lat, 
                    :lng, 
                    :min_age, 
                    :max_age, 
                    :sign_up_details, 
                    :short_term_details
                )`,
			args: {
				name: school.name,
				phone_number: school.phone_number,
				email: school.email,
				about: school.about,
				city: school.city,
				country: school.country,
				address: school.address,
				english: school.english,
				website_link: school.website_link,
				availability: school.availability,
				image_name: school.image_name,
				type: school.type,
				facebook: school.facebook,
				instagram: school.instagram,
				lat: school.lat,
				lng: school.lng,
				min_age: school.min_age,
				max_age: school.max_age,
				sign_up_details: school.sign_up_details,
				short_term_details: school.short_term_details
			}
		});

		if (res.rowsAffected >= 1) {
			return {
				body: {success: true, message: 'School added successfully', schoolId: res.lastInsertRowid}
			};
		}
	} catch (error) {
		console.log(error);
	}
};

export default defineEventHandler(async event => {
	const {data, isFeatured} = await readBody(event);
	const schoolInsertRes = await parseFormData(data);

	if (schoolInsertRes.body.success) {
		if (isFeatured) {
			// const featuredRes = await nitro.db.insert('featured_schools', {
			// 	school_id: schoolInsertRes.body.schoolId
			// });

			const featuredRes = await nitro.db.execute({
				sql: 'INSERT INTO featured_schools (school_id) VALUES (:school_id)',
				args: {
					school_id: schoolInsertRes.body.schoolId
				}
			});

			if (featuredRes.rowsAffected >= 1) {
				return {
					body: {
						success: true,
						message: 'School added to both schools and featured_schools successfully',
						schoolId: schoolInsertRes.body.schoolId
					}
				};
			} else {
				return {
					body: {
						success: false,
						message: 'Failed to make school a featured school, please contact the developer. ',
						schoolId: schoolInsertRes.body.schoolId
					}
				};
			}
		} else {
			return schoolInsertRes;
		}
	} else {
		return schoolInsertRes;
	}
});
