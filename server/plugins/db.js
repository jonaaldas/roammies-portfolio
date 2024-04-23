import {client} from '../db/turso.js';

export default defineNitroPlugin(async nitroApp => {
	nitroApp.db = client;
});
