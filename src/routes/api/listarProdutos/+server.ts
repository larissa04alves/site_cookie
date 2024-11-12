import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { produto } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const listarProdutos = await db.select().from(produto).orderBy(asc(produto.codigo));
	return new Response(JSON.stringify(listarProdutos), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
