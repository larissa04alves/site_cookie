import { db } from '$lib/server/db/index';
import { promocao } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const actions: Actions = {
	excluirPromocao: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');

		console.log('codigo', codigo);

		if (!codigo || codigo == '0') {
			return {
				status: 400,
				body: {
					message: 'Erro, código de promoção Inválido'
				}
			};
		}

		const codigoInt = parseInt(codigo as string, 10);

		try {
			await db.delete(promocao).where(eq(promocao.codigo, codigoInt));

			return {
				status: 200,
				body: {
					message: 'promoção excluído com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao excluir promoção:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao excluir promoção. Por favor, tente novamente.'
				}
			};
		}
	},

	editarPromocao: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const nomePromo = data.get('nome');
		const valorPromo = data.get('valor');
		const descricaoPromo = data.get('descricao');
		const arquivoPromo = data.get('arquivo') as File;

		console.log('Recebido para edição:', { codigo, nomePromo, valorPromo, descricaoPromo });

		if (!nomePromo || !valorPromo || !descricaoPromo) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}

		const codigoInt = parseInt(codigo as string, 10);
		const valor = parseFloat(valorPromo as string).toFixed(2); // Converte para string com duas casas decimais

		let fileBase64 = null;

		// Verifica se o arquivo foi enviado
		if (arquivoPromo && arquivoPromo.size > 0) {
			const maxSize = 1 * 1024 * 1024;
			if (arquivoPromo.size > maxSize) {
				return {
					status: 400,
					body: {
						message: 'Imagem excede o tamanho máximo de 1 MB'
					}
				};
			}

			// Converte a imagem para base64
			const arrayBuffer = await arquivoPromo.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const base64Image = buffer.toString('base64');

			// Monta o caminho do arquivoPromo
			const fileExtension = arquivoPromo.name.split('.').pop();
			fileBase64 = `data:image/${fileExtension};base64,${base64Image}`;
		} else {
			// Se o arquivo não foi enviado, busca a imagem existente
			try {
				const existingImage = await db
					.select()
					.from(promocao)
					.where(eq(promocao.codigo, codigoInt));

				if (existingImage.length > 0) {
					fileBase64 = existingImage[0].arquivo;
				} else {
					return {
						status: 404,
						body: {
							message: 'promoção não encontrado'
						}
					};
				}
			} catch (error) {
				console.error('Erro ao buscar promoção:', error);
				return {
					status: 500,
					body: {
						error: 'Erro ao buscar promoção. Por favor, tente novamente.'
					}
				};
			}
		}

		try {
			await db
				.update(promocao)
				.set({
					nome: nomePromo as string,
					valor: valor, // Agora 'valor' é uma string
					descricao: descricaoPromo as string,
					arquivo: fileBase64
				})
				.where(eq(promocao.codigo, codigoInt));

			return {
				status: 200,
				body: {
					message: 'Promocao editada com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao editar promoção:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao editar promoção. Por favor, tente novamente.'
				}
			};
		}
	},

	editarQuantidade: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const estoquePromo = data.get('estoque');

		if (!codigo || !estoquePromo) {
			return {
				status: 400,
				body: {
					message: 'Dados inválidos'
				}
			};
		}

		const codigoInt = parseInt(codigo as string, 10);
		const estoqueInt = parseInt(estoquePromo as string, 10);

		try {
			await db.update(promocao).set({ estoque: estoqueInt }).where(eq(promocao.codigo, codigoInt));

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
