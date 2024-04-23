const getUserByEmail = async email => {
	const nitro = useNitroApp();
	const query = 'SELECT * FROM users WHERE email = ?';
	const user = await nitro.db.execute({
		sql: query,
		args: [email]
	});
	return user.rows;
};
export default getUserByEmail;
