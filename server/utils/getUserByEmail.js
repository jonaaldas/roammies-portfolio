const getUserByEmail = async email => {
	const nitro = useNitroApp();
	const query = 'SELECT * FROM roammies_users WHERE email = ?';
	const user = await nitro.db.queryOne(query, [email]);
	console.log('🚀 ~ getUserByEmail ~ user12:', user);
	return user;
};
export default getUserByEmail;
