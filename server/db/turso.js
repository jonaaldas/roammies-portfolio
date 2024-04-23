import {createClient} from '@libsql/client';

export const client = createClient({
	url: process.env.TURSO_LINK,
	authToken: process.env.TURSO_TOKEN
});
