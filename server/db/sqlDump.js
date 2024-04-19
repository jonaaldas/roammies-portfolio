import mysqldump from 'mysqldump';
import mysql from 'mysql';
import util from 'util';
import {exec} from 'child_process';

// production credentials
const productionDbConfig = {
	database: 'roammies',
	host: 'aws.connect.psdb.cloud',
	user: '0vtwcykjr35wdtzj5h4y',
	password: '',
	ssl: {rejectUnauthorized: true}
};
// staging credentials
const stagingDbConfig = {
	database: 'roammies',
	host: 'aws.connect.psdb.cloud',
	user: 'o3jv3zfyppwporcxrqqo',
	password: '',
	ssl: {rejectUnauthorized: true},
	multipleStatements: true
};

// Dump production database
async function dumpProductionDatabase() {
	let dump = await mysqldump({
		connection: productionDbConfig,
		dumpToFile: './database_schema.sql'
	});
	if (dump) {
		return true;
	} else {
		return false;
	}
}

// Clear staging database
async function clearStagingDatabase() {
	try {
		const connection = mysql.createConnection(stagingDbConfig);
		connection.connect();

		const query = util.promisify(connection.query).bind(connection);

		// Get list of all tables
		const tables = await query('SHOW TABLES');
		const tableDeletionQueries = tables.map(row => `DROP TABLE IF EXISTS ${Object.values(row)[0]}`);

		// Drop all tables
		await query(tableDeletionQueries.join(';'));

		connection.end();
		return true;
	} catch (error) {
		console.log('🚀 ~ file: sqlDump.js:47 ~ clearStagingDatabase ~ error:', error);
		return false;
	}
}

// Import production data into staging
async function importProductionData() {
	try {
		await exec(
			`mysql -h ${stagingDbConfig.host} -u ${stagingDbConfig.user} --password=${stagingDbConfig.password} ${stagingDbConfig.database} < /Users/incruisesja/Documents/GitHub/rormmies-nuxt/database_schema.sql`
		);
		return true;
	} catch (error) {
		console.log('🚀 ~ file: sqlDump.js:70 ~ importProductionData ~ error:', error);
		return false;
	}
}

async function start() {
	try {
		console.log('Dumping production database...');
		const dumpResult = await dumpProductionDatabase();

		if (!dumpResult) {
			throw new Error('Failed to dump production database.');
		}

		console.log('Clearing staging database...');
		const clearResults = await clearStagingDatabase();
		if (!clearResults) {
			throw new Error('Failed to clear staging database.');
		}

		console.log('Importing production data into staging...');
		let importProductionRes = await importProductionData();
		if (!importProductionRes) {
			throw new Error('Failed to import production data into staging.');
		}

		console.log('Staging database successfully updated with production data.');
	} catch (err) {
		console.error('An error occurred:', err.message);
	}
}

start();
