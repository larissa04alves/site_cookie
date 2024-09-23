import db from '$lib/database/connectdb';
import type { Actions } from './$types';

export const actions: Actions = {
	excluirProduto: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');

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

		if (!nomeProduto || !valorProduto || !estoque || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}
		try {
			await db.query(
				'UPDATE finance SET nome = $1, valor = $2, estoque = $4, descricao = $5 WHERE codigo = $7',
				[nomeProduto, valorProduto, estoque, descricao, codigo]
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
		console.log(estoque);
		console.log(codigo);

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
