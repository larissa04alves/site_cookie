import db from '$lib/database/connectdb';
import type { Actions } from './$types';

export const actions: Actions = {
	criarProduto: async ({ request }) => {
		const data = await request.formData();
		console.log(data);

		const nomeProduto = data.get('nomeProduto');
		console.log('nome produto', nomeProduto);

		const valorProduto = data.get('valorProduto');
		const estoque = data.get('estoque');
		const descricao = data.get('descricao');
		// const inativo = data.get('inativo') === 'on' ? true : false;

		if (!nomeProduto || !valorProduto || !estoque || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}
		await db.query(
			'INSERT INTO produto (nome, valor, estoque, descricao) VALUES ($1, $2, $3, $4)',
			[nomeProduto, valorProduto, estoque, descricao]
		);
		return {
			status: 200,
			body: {
				message: 'Produto criado com sucesso'
			}
		};
	}
};
