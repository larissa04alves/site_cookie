import { db } from '$lib/server/db/index';
import { promocao } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

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

		console.log('Dados recebidos:', { codigo, nomePromo, valorPromo, descricaoPromo });

		if (!codigo || !nomePromo || !valorPromo || !descricaoPromo) {
			return fail(400, {
				message: 'Campos obrigatórios não preenchidos'
			});
		}

		try {
			const codigoInt = parseInt(codigo as string, 10);
			const valor = parseFloat(valorPromo as string).toFixed(2);
			let fileBase64 = null;

			if (arquivoPromo && arquivoPromo.size > 0) {
				const maxSize = 1 * 1024 * 1024;
				if (arquivoPromo.size > maxSize) {
					return fail(400, {
						message: 'Imagem excede o tamanho máximo de 1 MB'
					});
				}

				const arrayBuffer = await arquivoPromo.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				const base64Image = buffer.toString('base64');
				const fileExtension = arquivoPromo.name.split('.').pop();
				fileBase64 = `data:image/${fileExtension};base64,${base64Image}`;
			} else {
				const existingImage = await db
					.select()
					.from(promocao)
					.where(eq(promocao.codigo, codigoInt));

				if (existingImage.length > 0) {
					fileBase64 = existingImage[0].arquivo;
				}
			}

			await db
				.update(promocao)
				.set({
					nome: nomePromo as string,
					valor: valor,
					descricao: descricaoPromo as string,
					arquivo: fileBase64 || undefined
				})
				.where(eq(promocao.codigo, codigoInt));

			return { success: true };
		} catch (error) {
			console.error('Erro ao editar promoção:', error);
			return fail(500, {
				message: 'Erro ao editar promoção'
			});
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
