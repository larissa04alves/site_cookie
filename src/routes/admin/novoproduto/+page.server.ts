import { db } from '$lib/server/db/index';
import type { Actions } from './$types';
import { produto, promocao } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { PromocaoInsert } from '$lib/server/db/schema';

// Função utilitária para validar e processar imagens
async function processarImagem(arquivo: File): Promise<string | null> {
	const maxSize = 1 * 1024 * 1024;
	if (arquivo.size > maxSize) {
		return null;
	}
	const arrayBuffer = await arquivo.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const base64Image = buffer.toString('base64');
	const fileExtension = arquivo.name.split('.').pop();
	return `data:image/${fileExtension};base64,${base64Image}`;
}

export const actions: Actions = {
	criarProduto: async ({ request }) => {
		const data = await request.formData();

		const nomeProduto = data.get('nomeProduto') as string;
		const valorProdutoStr = (data.get('valorProduto') as string)?.replace(',', '.');
		const estoqueStr = data.get('estoque') as string;
		const descricao = data.get('descricao') as string;
		const arquivo = data.get('arquivo') as File;

		// Verificação dos campos obrigatórios
		if (!nomeProduto || !valorProdutoStr || !estoqueStr || !descricao || !arquivo) {
			return fail(400, { message: 'Campos obrigatórios não preenchidos' });
		}

		// Verificação se o valor é um número válido
		const valorProdutoNum = parseFloat(valorProdutoStr);
		const estoque = parseInt(estoqueStr, 10);

		if (isNaN(valorProdutoNum) || isNaN(estoque)) {
			return fail(400, { message: 'Valor ou estoque inválido' });
		}

		// Processamento da imagem
		const arquivoBase64 = await processarImagem(arquivo);
		if (!arquivoBase64) {
			return fail(400, { message: 'Imagem excede o tamanho máximo de 1 MB' });
		}

		// Inserir o produto no banco de dados junto com a imagem
		try {
			await db.insert(produto).values({
				nome: nomeProduto,
				valor: valorProdutoNum.toFixed(2),
				estoque: estoque,
				descricao: descricao,
				arquivo: arquivoBase64,
				status: true
			});

			return {
				status: 200,
				body: {
					message: 'Produto criado com sucesso'
				}
			};
		} catch (error) {
			console.error('Erro ao inserir produto:', error);
			return fail(500, { message: 'Erro ao criar produto' });
		}
	},
	criarPromocao: async ({ request }) => {
		const data = await request.formData();

		const nomePromo = data.get('nomePromo') as string;
		const valorPromoStr = (data.get('valorPromo') as string)?.replace(',', '.');
		const estoquePromoStr = data.get('estoquePromo') as string;
		const descricaoPromo = data.get('descricaoPromo') as string;
		const dataInicioStr = data.get('dataInicio') as string;
		const dataFimStr = data.get('dataFim') as string;
		const arquivoPromo = data.get('arquivoPromo') as File;

		// Verificação dos campos obrigatórios
		if (
			!nomePromo ||
			!valorPromoStr ||
			!estoquePromoStr ||
			!descricaoPromo ||
			!dataInicioStr ||
			!dataFimStr ||
			!arquivoPromo
		) {
			return fail(400, { message: 'Campos obrigatórios não preenchidos' });
		}

		// Conversão dos campos numéricos
		const valorPromoNum = parseFloat(valorPromoStr);
		const estoquePromo = parseInt(estoquePromoStr, 10);

		if (isNaN(valorPromoNum) || isNaN(estoquePromo)) {
			return fail(400, { message: 'Valor ou estoque inválido' });
		}

		// Conversão e validação das datas
		const dataInicio = new Date(dataInicioStr);
		const dataFim = new Date(dataFimStr);

		if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
			return fail(400, { message: 'Datas inválidas' });
		}

		const dataInicioFormatted = dataInicio.toISOString().split('T')[0];
		const dataFimFormatted = dataFim.toISOString().split('T')[0];

		// Processamento da imagem
		const arquivoPromoBase64 = await processarImagem(arquivoPromo);
		if (!arquivoPromoBase64) {
			return fail(400, { message: 'Imagem excede o tamanho máximo de 1 MB' });
		}

		// Preparar os dados para inserção

		const promocaoData: PromocaoInsert = {
			nome: nomePromo,
			valor: valorPromoNum.toFixed(2),
			estoque: estoquePromo,
			descricao: descricaoPromo,
			dataInicio: dataInicioFormatted,
			dataFim: dataFimFormatted,
			arquivo: arquivoPromoBase64
		};

		// Inserir a promoção no banco de dados junto com a imagem
		try {
			await db.insert(promocao).values(promocaoData);
			return {
				status: 200,
				body: {
					message: 'Promoção criada com sucesso'
				}
			};
		} catch (error) {
			console.error('Erro ao inserir promoção:', error);
			return fail(500, { message: 'Erro ao criar promoção' });
		}
	}
};
