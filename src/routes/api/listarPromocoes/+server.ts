import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { promocao } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const listarPromocoes = await db.select().from(promocao).orderBy(asc(promocao.codigo));
	console.log(listarPromocoes);
	return new Response(JSON.stringify(listarPromocoes), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
