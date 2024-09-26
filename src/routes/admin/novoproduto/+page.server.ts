import db from '$lib/database/connectdb';
import type { Actions } from './$types';

export const actions: Actions = {
	criarProduto: async ({ request }) => {
		const data = await request.formData();

		const nomeProduto = data.get('nomeProduto');
		const valorProduto = data.get('valorProduto');
		const estoque = data.get('estoque');
		const descricao = data.get('descricao');
		const arquivo = data.get('arquivo') as File; // Captura o arquivo de imagem

		if (!nomeProduto || !valorProduto || !estoque || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}

		// Limite de tamanho para a imagem (por exemplo, 1 MB)
		const maxSize = 1 * 1024 * 1024;
		if (arquivo.size > maxSize) {
			return {
				status: 400,
				body: {
					message: 'Imagem excede o tamanho máximo de 1 MB'
				}
			};
		}

		// Converte a imagem para base64
		const arrayBuffer = await arquivo.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const base64Image = buffer.toString('base64');

		// Monta o caminho do arquivo
		const fileExtension = arquivo.name.split('.').pop();
		const fileBase64 = `data:image/${fileExtension};base64,${base64Image}`;

		// Inserir o produto no banco de dados junto com a imagem
		await db.query(
			'INSERT INTO produto (nome, valor, estoque, descricao, arquivo) VALUES ($1, $2, $3, $4, $5)',
			[nomeProduto, valorProduto, estoque, descricao, fileBase64]
		);

		return {
			status: 200,
			body: {
				message: 'Produto criado com sucesso'
			}
		};
	}
};
