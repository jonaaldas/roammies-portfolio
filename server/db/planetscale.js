import mysql from 'mysql';
const disallowedKeys = ['created'];
const validOperators = ['=', '!=', '>', '>=', '<', '<=', 'IS', 'IN', 'LIKE'];

export default {
	pool: null,

	setup() {
		const pool = mysql.createPool({
			host: 'aws.connect.psdb.cloud',
			user: 'civlzznx5w8efejwaogk',
			password: 'pscale_pw_ICSeqL8Ks9XHtLHhUc1JRIsHTfTu2VOcX3IeKzBdYsQ',
			database: 'portfolio-db',
			ssl: {
				rejectUnauthorized: true
			}
		});

		pool.on('error', function (err) {
			console.error('MYSQL ERROR', err);
		});

		this.pool = pool;
	},

	runQuery: function (query, values, callback) {
		if (values) {
			this.pool.query(query, values, (error, results, fields) => {
				if (error) {
					return callback({
						success: false,
						error
					});
				}

				return callback({
					success: true,
					results
				});
			});
		} else {
			this.pool.query(query, (error, results, fields) => {
				if (error) {
					return callback({
						success: false,
						error
					});
				}

				return callback({
					success: true,
					results
				});
			});
		}
	},
	execute: function (query, values, errorCount = 0) {
		let _this = this;

		return new Promise((resolve, reject) => {
			this.runQuery(query, values, function ({success, results, error}) {
				if (success == true) {
					if (errorCount > 0) {
						console.log('MYSQL: Successfully finished a deadlocked query!');
					}

					resolve(results);
					return;
				}

				if (success == false) {
					if (error && error.code == 'ER_LOCK_DEADLOCK') {
						if (errorCount < 3) {
							return _this.execute(query, values, ++errorCount);
						} else {
							console.log('MYSQL: Deadlocked query failed too many times and will not be retried again.');
							reject(error);
							return;
						}
					} else {
						reject(error);
						return;
					}
				}
			});
		});
	},

	query: async function (query, values, timeInSeconds) {
		let results;

		results = await this.execute(query, values);

		return results;
	},

	queryOne: async function (query, values, timeInSeconds) {
		let results;

		results = await this.execute(query, values);

		return results[0];
	},

	insert: async function (table, value, update) {
		var i,
			j,
			keys = [],
			values = [],
			query = 'INSERT INTO `' + table + '` (';

		if (~table.indexOf('`')) {
			throw new Error('Table name cannot have the "`" character.');
		}

		if (!Array.isArray(value)) {
			value = [value];
		} else if (!value.length) {
			throw new Error('You must provide at least one row to insert.');
		}

		for (i in value[0]) {
			if (~disallowedKeys.indexOf(i)) {
				throw new Error('Field `' + i + '` not allowed in `db.insert(...)` method.');
			}

			if (~i.indexOf('`')) {
				throw new Error('Field names cannot have the "`" character.');
			}

			query += '`' + i + '`,';

			keys.push(i);
		}

		if (keys.length === 0) {
			throw new Error('You must insert at least one key.');
		}

		query = query.substr(0, query.length - 1) + ') VALUES ';

		for (i = 0; i < value.length; i++) {
			query += '(';

			for (j = 0; j < keys.length; j++) {
				query += '?,';

				if (value[i][keys[j]] && typeof value[i][keys[j]] === 'object' && !(value[i][keys[j]] instanceof Date)) {
					value[i][keys[j]] = JSON.stringify(value[i][keys[j]]);
				}

				if (value[i][keys[j]] === undefined) {
					value[i][keys[j]] = null;
				}

				values.push(value[i][keys[j]]);
			}

			query = query.substr(0, query.length - 1) + '),';
		}

		query = query.substr(0, query.length - 1);

		if (update && update.length) {
			if (!Array.isArray(update)) {
				throw new Error('The `update` parameter must be an array of keys to update.');
			}

			query += ' ON DUPLICATE KEY UPDATE ';

			for (i = 0; i < update.length; i++) {
				if (~update[i].indexOf('`')) {
					throw new Error('Field names cannot have the "`" character.');
				}

				if (~['created', 'modified'].indexOf(update[i])) {
					query += '`' + update[i] + '`=NOW(),';
				} else {
					query += '`' + update[i] + '`=VALUES(`' + update[i] + '`),';
				}
			}

			query = query.substr(0, query.length - 1);
		}

		query += ';';

		return await this.execute(query, values);
	},
	update: async function (table, values, where, limit, flags) {
		var i,
			update = [],
			query = 'UPDATE `' + table + '` SET ';

		if (~table.indexOf('`')) {
			throw new Error('Table name cannot have the "`" character.');
		}

		if (!values || typeof values !== 'object') {
			throw new Error('You must provide a valid object of key-values to update.');
		}

		for (i in values) {
			if (i === 'modified' && values[i] === false) {
				continue;
			} else if (~disallowedKeys.indexOf(i)) {
				if (i != 'created' || !flags || !flags.includes('allowCreated')) {
					throw new Error('Field `' + i + '` not allowed in `db.update(...)` method.');
				}
			}

			if (~i.indexOf('`')) {
				throw new Error('Field names cannot have the "`" character.');
			}

			query += '`' + i + '`=?,';

			if (values[i] && typeof values[i] === 'object' && !(values[i] instanceof Date)) {
				update.push(JSON.stringify(values[i]));
			} else if (values[i] === undefined) {
				update.push(null);
			} else {
				update.push(values[i]);
			}
		}

		if (values.modified) {
			query = query.substr(0, query.length - 1);
		} else {
			query += '`modified`=NOW()';
		}

		if (where) {
			if (typeof where !== 'object') {
				throw new Error('You must provide a valid object for the WHERE clause.');
			}

			query += ' WHERE';

			for (i in where) {
				if (~i.indexOf('`')) {
					throw new Error('Field names cannot have the "`" character.');
				}

				if (Array.isArray(where[i])) {
					if (!~validOperators.indexOf(where[i][0])) {
						throw new Error('Invalid operator used: ' + where[i][0]);
					}

					if (where[i][0] === 'IN' && Array.isArray(where[i][1])) {
						query += ' `' + i + '` IN (';
						query += new Array(where[i][1].length + 1).join('?,');

						query = query.substr(0, query.length - 1);
						query += ')';

						update.push.apply(update, where[i][1]);
					} else {
						query += ' `' + i + '`' + where[i][0] + ' ? ';
						update.push(where[i][1]);
					}
				} else if (where[i] === null || where[i] === undefined) {
					query += ' `' + i + '` IS NULL';
				} else if (typeof where[i] === 'object' && !(where[i] instanceof Date)) {
					query += ' `' + i + '`=?';
					update.push(JSON.stringify(where[i]));
				} else {
					query += ' `' + i + '`=?';
					update.push(where[i]);
				}

				query += ' AND';
			}

			query = query.substr(0, query.length - 4);
		}

		if (limit && !isNaN(limit)) {
			query += ' LIMIT ' + (limit | 0);
		}

		query += ';';

		return await this.execute(query, update);
	},

	getConnection() {
		return new Promise(resolve => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					resolve(false);
					return;
				}

				/**
				 * We update the query function to return a promise, so we can use async/await
				 */
				let improvedConnection = {
					query(query, values) {
						return new Promise((resolve, reject) => {
							connection.query(query, values, (err, results) => {
								if (err) {
									reject(err);
									return;
								}

								resolve(results);
							});
						});
					},
					release: () => {
						connection.release();
					}
				};

				resolve(improvedConnection);
			});
		});
	}
};
