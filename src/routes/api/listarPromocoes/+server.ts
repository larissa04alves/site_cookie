import type { RequestHandler } from './$types';
import db from '$lib/database/connectdb';

export const GET: RequestHandler = async () => {
	const listarPromocoes = await db.query('SELECT * FROM promocao order by codigo');
	return new Response(JSON.stringify(listarPromocoes.rows), {
		headers: {
			'content-type': 'application/json'
		}
	});
	console.log(listarPromocoes.rows);
};
