import type { RequestHandler } from './$types';
import db from '$lib/database/connectdb';

export const GET: RequestHandler = async () => {
	const listarProdutos = await db.query('SELECT * FROM produto order by codigo');
	return new Response(JSON.stringify(listarProdutos.rows), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
