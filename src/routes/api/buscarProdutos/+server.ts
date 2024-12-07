import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { produto } from '$lib/server/db/schema';
import { like } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const termo = url.searchParams.get('q') || '';

	const produtosEncontrados = await db
		.select()
		.from(produto)
		.where(like(produto.nome, `%${termo}%`));

	return new Response(JSON.stringify(produtosEncontrados), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
