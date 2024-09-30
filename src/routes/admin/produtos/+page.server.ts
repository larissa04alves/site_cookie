import db from '$lib/database/connectdb';
import type { Actions } from './$types';

export const actions: Actions = {
	excluirProduto: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');

		console.log('codigo', codigo);

		if (!codigo || codigo == '0') {
			return {
				status: 400,
				body: {
					message: 'Erro, código do produto Inválido'
				}
			};
		}

		try {
			await db.query('DELETE FROM produto WHERE codigo = $1', [codigo]);
			return {
				status: 200,
				body: {
					message: 'Produto excluído com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao excluir produto:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao excluir produto. Por favor, tente novamente.'
				}
			};
		}
	},

	editarProduto: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const nomeProduto = data.get('nomeProduto');
		const valorProduto = data.get('valorProduto');
		const estoque = data.get('estoque');
		const descricao = data.get('descricao');
		const arquivo = data.get('arquivo') as File;

		console.log(nomeProduto);

		if (!nomeProduto || !valorProduto || !estoque || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}

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

		try {
			await db.query(
				'UPDATE produto SET nome = $1, valor = $2, estoque = $3, descricao = $4, arquivo = $5 WHERE codigo = $6',
				[nomeProduto, valorProduto, estoque, descricao, fileBase64, codigo]
			);
			return {
				status: 200,
				body: {
					message: 'Produto editado com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao editar Produto:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao editar produto. Por favor, tente novamente.'
				}
			};
		}
	},

	editarQuantidade: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const estoque = data.get('estoque');
		// console.log(estoque);
		// console.log(codigo);

		if (!codigo || !estoque) {
			return {
				status: 400,
				body: {
					message: 'Dados inválidos'
				}
			};
		}

		try {
			await db.query('UPDATE produto SET estoque = $1 WHERE codigo = $2', [estoque, codigo]);
			return {
				status: 200,
				body: {
					message: 'Quantidade atualizada com sucesso'
				}
			};
		} catch (error) {
			console.error('Erro atualizando a quantidade:', error);
			return {
				status: 500,
				body: {
					message: 'Erro atualizando a quantidade'
				}
			};
		}
	}
};
