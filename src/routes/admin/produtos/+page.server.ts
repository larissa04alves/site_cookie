import { db } from '$lib/server/db/index';
import { produto } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
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

		const codigoInt = parseInt(codigo as string, 10);

		try {
			await db.delete(produto).where(eq(produto.codigo, codigoInt));

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
		const descricao = data.get('descricao');
		const arquivo = data.get('arquivo') as File;

		console.log('Recebido para edição:', { codigo, nomeProduto, valorProduto, descricao });

		if (!nomeProduto || !valorProduto || !descricao) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}

		const codigoInt = parseInt(codigo as string, 10);
		const valor = parseFloat(valorProduto as string).toFixed(2); // Converte para string com duas casas decimais

		let fileBase64 = null;

		// Verifica se o arquivo foi enviado
		if (arquivo && arquivo.size > 0) {
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
			fileBase64 = `data:image/${fileExtension};base64,${base64Image}`;
		} else {
			// Se o arquivo não foi enviado, busca a imagem existente
			try {
				const existingImage = await db.select().from(produto).where(eq(produto.codigo, codigoInt));

				if (existingImage.length > 0) {
					fileBase64 = existingImage[0].arquivo;
				} else {
					return {
						status: 404,
						body: {
							message: 'Produto não encontrado'
						}
					};
				}
			} catch (error) {
				console.error('Erro ao buscar produto:', error);
				return {
					status: 500,
					body: {
						error: 'Erro ao buscar produto. Por favor, tente novamente.'
					}
				};
			}
		}

		try {
			await db
				.update(produto)
				.set({
					nome: nomeProduto as string,
					valor: valor, // Agora 'valor' é uma string
					descricao: descricao as string,
					arquivo: fileBase64
				})
				.where(eq(produto.codigo, codigoInt));

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

		if (!codigo || !estoque) {
			return {
				status: 400,
				body: {
					message: 'Dados inválidos'
				}
			};
		}

		const codigoInt = parseInt(codigo as string, 10);
		const estoqueInt = parseInt(estoque as string, 10);

		try {
			await db.update(produto).set({ estoque: estoqueInt }).where(eq(produto.codigo, codigoInt));

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
