import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { promocao } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
	const listarPromocoes = await db
		.select({
			codigo: promocao.codigo,
			nomePromo: promocao.nome,
			arquivoPromo: promocao.arquivo,
			estoquePromo: promocao.estoque,
			valorPromo: promocao.valor,
			descricaoPromo: promocao.descricao,
			dataInicio: promocao.dataInicio,
			dataFim: promocao.dataFim
		})
		.from(promocao)
		.orderBy(asc(promocao.codigo));

	return new Response(JSON.stringify(listarPromocoes));
};
