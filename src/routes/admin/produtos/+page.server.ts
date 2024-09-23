import db from '$lib/database/connectdb';
import type { Actions, PageServerLoad } from './$types';

// A função load é executada automaticamente quando a página é carregada
export const load: PageServerLoad = async () => {
	// Pega os Produtos no banco de dados
	const produtos = await db.query('SELECT * FROM Produto').then((res) => res.rows);

	return { produtos };
};

export const actions: Actions = {
	criarProduto: async ({ request }) => {
		const data = await request.formData();
		const nomeProduto = data.get('nome');
		const valorProduto = data.get('valor');
		const valorPromocional = data.get('valorPromocional');
		const estoque = data.get('estoque');
		const descricao = data.get('descricao');
		const inativo = data.get('inativo') === 'on' ? true : false;

		if (!nomeProduto || !valorProduto || !estoque || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
			// Inserindo o novo produto no banco de dados
			try {
				await db.query(
					'INSERT INTO finance (nome, valor, valorPromocional, estoque,descricao,inativo) VALUES ($1, $2, $3, $4, $5, $6)',
					[nomeProduto, valorProduto, valorPromocional, estoque, descricao, inativo]
				);
				return {
					status: 200,
					body: {
						message: 'Produto criado com sucesso'
					}
				};
			} catch (error) {
				console.error('Erro ao criar produto:', error);
				return {
					status: 500,
					body: {
						error: 'Erro ao criar produto. Por favor, tente novamente.'
					}
				};
			}
		}
	},

	excluirProduto: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');

		if(!codigo || codigo == '0'){
			return {status: 400,
				body: {
					message: 'Erro, código do produto Inválido'
				}
			}
		}

		try {
			await db.query('DELETE FROM produto WHERE id = $1', [codigo]);
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
	editarEstoque: async ({ request }) => {
		try {
		  // Obtendo os dados do corpo da requisição
		  const data = await request.formData();
		  const codigo = data.get('codigo');
		  const estoque = data.get('estoque');

			console.log(codigo);
			console.log(estoque);

		  // Validando os dados recebidos
		  if (!codigo || !estoque) {
			return { status: 400,
				body: {
					message: 'Dados inválidos'
				} 
			};
		  }
	
		  // Atualizando o banco de dados
		  await db.query('UPDATE produto SET estoque = $1 WHERE codigo = $2', [estoque, codigo]);
	
		  return { status: 200,
			body: {
				message: 'Estoque atualizado com sucesso'
			} 
		};
		  
		} catch (error) {
		  	return { status: 500,
				body: {
					message: 'Erro atualizando o estoque'
				} 
			};
		}
	  },
	editarProduto: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const nomeProduto = data.get('nome');
		const valorProduto = data.get('valor');
		const valorPromocional = data.get('valorPromocional');
		const estoque = data.get('estoque');
		const descricao = data.get('descricao');
		const inativo = data.get('inativo') === 'on' ? true : false;

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
				'UPDATE finance SET nome = $1, valor = $2, valorPromocional = $3 estoque = $4, descricao = $5, inativo = $6 WHERE codigo = $7',
				[nomeProduto, valorProduto, valorPromocional, estoque, descricao, inativo, codigo]
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
	}
};
