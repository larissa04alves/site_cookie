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

// Funções de validação
function validarNome(nome: string) {
	if (!nome) return 'Nome é obrigatório';
	if (nome.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
	if (nome.length > 100) return 'Nome deve ter no máximo 100 caracteres';
	return null;
}

function validarValor(valor: string) {
	if (!valor) return 'Valor é obrigatório';
	// Aceita tanto ponto quanto vírgula como separador decimal
	const valorLimpo = valor.replace(',', '.');
	const valorNumerico = parseFloat(valorLimpo);

	if (isNaN(valorNumerico)) return 'Valor inválido';
	if (valorNumerico <= 0) return 'Valor deve ser maior que zero';
	if (valorNumerico > 999999.99) return 'Valor máximo excedido';
	return null;
}

function validarEstoque(estoque: string) {
	if (!estoque) return 'Estoque é obrigatório';
	const estoqueNumerico = parseInt(estoque);
	if (isNaN(estoqueNumerico)) return 'Estoque inválido';
	if (estoqueNumerico < 0) return 'Estoque não pode ser negativo';
	if (estoqueNumerico > 99999) return 'Estoque máximo excedido';
	return null;
}

function validarDescricao(descricao: string) {
	if (!descricao) return 'Descrição é obrigatória';
	if (descricao.length < 10) return 'Descrição deve ter no mínimo 10 caracteres';
	if (descricao.length > 500) return 'Descrição deve ter no máximo 500 caracteres';
	return null;
}

function validarImagem(arquivo: File) {
	if (!arquivo) return 'Imagem é obrigatória';
	const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
	if (!tiposPermitidos.includes(arquivo.type)) return 'Formato de imagem inválido';
	const maxSize = 1 * 1024 * 1024; // 1MB
	if (arquivo.size > maxSize) return 'Imagem deve ter no máximo 1MB';
	return null;
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

		// Validações
		const erros: Record<string, string> = {};

		const erroNome = validarNome(nomeProduto);
		if (erroNome) erros.nome = erroNome;

		const erroValor = validarValor(valorProdutoStr);
		if (erroValor) erros.valor = erroValor;

		const erroEstoque = validarEstoque(estoqueStr);
		if (erroEstoque) erros.estoque = erroEstoque;

		const erroDescricao = validarDescricao(descricao);
		if (erroDescricao) erros.descricao = erroDescricao;

		const erroImagem = validarImagem(arquivo);
		if (erroImagem) erros.imagem = erroImagem;

		if (Object.keys(erros).length > 0) {
			return fail(400, {
				erros,
				values: { nomeProduto, valorProdutoStr, estoqueStr, descricao }
			});
		}

		// Processamento da imagem e inserção no banco
		try {
			const arquivoBase64 = await processarImagem(arquivo);
			if (!arquivoBase64) {
				return fail(400, { message: 'Erro ao processarimagem' });
			}

			await db.insert(produto).values({
				nome: nomeProduto,
				valor: parseFloat(valorProdutoStr.replace(',', '.')).toFixed(2),
				estoque: parseInt(estoqueStr),
				descricao: descricao,
				arquivo: arquivoBase64,
				status: true
			});

			return {
				success: true,
				message: 'Produto criado com sucesso'
			};
		} catch (error) {
			console.error('Erro ao criar produto:', error);
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
		// Validações
		const erros: Record<string, string> = {};

		const erroNome = validarNome(nomePromo);
		if (erroNome) erros.nome = erroNome;

		const erroValor = validarValor(valorPromoStr);
		if (erroValor) erros.valor = erroValor;

		const erroEstoque = validarEstoque(estoquePromoStr);
		if (erroEstoque) erros.estoque = erroEstoque;

		const erroDescricao = validarDescricao(descricaoPromo);
		if (erroDescricao) erros.descricao = erroDescricao;

		const erroImagem = validarImagem(arquivoPromo);
		if (erroImagem) erros.imagem = erroImagem;

		if (!dataInicioStr || !dataFimStr) {
			erros.datas = 'Datas são obrigatórias';
		}

		if (Object.keys(erros).length > 0) {
			return fail(400, {
				erros,
				values: { nomePromo, valorPromoStr, estoquePromoStr, descricaoPromo }
			});
		}

		// Processamento e inserção no banco
		try {
			const arquivoBase64 = await processarImagem(arquivoPromo);
			if (!arquivoBase64) {
				return fail(400, { message: 'Erro ao processarimagem' });
			}

			const promocaoData: PromocaoInsert = {
				nome: nomePromo,
				valor: parseFloat(valorPromoStr.replace(',', '.')).toFixed(2),
				estoque: parseInt(estoquePromoStr),
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
			return fail(500, { message: 'Erro ao criar promoção' });
		}
	}
};
