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
		console.log('Data:', data);

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

		console.log('Data:', data);
		// Validação dos campos
		if (
			!nomePromo ||
			!valorPromoStr ||
			!estoquePromoStr ||
			!descricaoPromo ||
			!dataInicioStr ||
			!dataFimStr ||
			!arquivoPromo
		) {
			return fail(400, {
				message: 'Campos obrigatórios não preenchidos',
				error: true
			});
		}

		// Conversão dos valores
		const valorPromoNum = parseFloat(valorPromoStr);
		const estoquePromo = parseInt(estoquePromoStr, 10);

		if (isNaN(valorPromoNum) || isNaN(estoquePromo)) {
			return fail(400, {
				message: 'Valor ou estoque inválido',
				error: true
			});
		}

		// Processamento da imagem
		const maxSize = 1 * 1024 * 1024; // 1MB
		if (arquivoPromo.size > maxSize) {
			return fail(400, {
				message: 'Imagem excede o tamanho máximo de 1 MB',
				error: true
			});
		}

		try {
			const arrayBuffer = await arquivoPromo.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const base64Image = buffer.toString('base64');
			const fileExtension = arquivoPromo.name.split('.').pop();
			const arquivoBase64 = `data:image/${fileExtension};base64,${base64Image}`;

			const promocaoData: PromocaoInsert = {
				nome: nomePromo,
				valor: valorPromoNum.toFixed(2),
				estoque: estoquePromo,
				descricao: descricaoPromo,
				dataInicio: new Date(dataInicioStr).toISOString().split('T')[0],
				dataFim: new Date(dataFimStr).toISOString().split('T')[0],
				arquivo: arquivoBase64
			};

			await db.insert(promocao).values(promocaoData);

			return {
				success: true,
				message: 'Promoção criada com sucesso'
			};
		} catch (error) {
			console.error('Erro ao criar promoção:', error);
			return fail(500, {
				message: 'Erro ao criar promoção',
				error: true
			});
		}
	}
};
