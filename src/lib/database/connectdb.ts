import { URL_DATABASE } from '$env/static/private';
import pkg from 'pg';
const { Pool } = pkg;

const config = {
	connectionString: URL_DATABASE
};

const db = new Pool(config);

export const connectDB = async () => {
	const client = await db.connect();
	return client;
};

export default db;
