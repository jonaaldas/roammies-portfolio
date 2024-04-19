// import db from '../db/newDB.js';
import db from '../db/planetscale.js';
// import db from '../db/postgres.js';

export default defineNitroPlugin(async nitroApp => {
	try {
		db.setup();
	} catch (error) {
		console.log('🚀 ~ file: db.js:7 ~ error:', error);
	}
	nitroApp.db = db;
});
