import db from '$lib/database/connectdb';
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
					message: 'Erro, código da promocão Inválida'
				}
			};
		}

		try {
			await db.query('DELETE FROM promocao WHERE codigo = $1', [codigo]);
			return {
				status: 200,
				body: {
					message: 'Promocao excluído com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao excluir promocao:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao excluir promocao. Por favor, tente novamente.'
				}
			};
		}
	},

	editarPromocao: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const nomePromo = data.get('nomePromo');
		const valorPromo = data.get('valorPromo');
		const dataInicio = data.get('dataInicio');
		const dataFim = data.get('dataFim');
		const descricaoPromo = data.get('descricaoPromo');
		const arquivoPromo = data.get('arquivoPromo') as File;

		console.log('Recebido para edição:', {
			codigo,
			nomePromo,
			valorPromo,
			descricaoPromo,
			dataInicio,
			dataFim
		});

		if (!nomePromo || !valorPromo || !descricaoPromo) {
			return {
				status: 400,
				body: {
					message: 'Campos obrigatórios não preenchidos'
				}
			};
		}

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

			// Monta o caminho do arquivo
			const fileExtension = arquivoPromo.name.split('.').pop();
			fileBase64 = `data:image/${fileExtension};base64,${base64Image}`;
		} else {
			// Se o arquivo não foi enviado, busca a imagem existente
			const existingImage = await db.query('SELECT arquivo FROM promocao WHERE codigo = $1', [
				codigo
			]);
			if (existingImage.rows.length > 0) {
				fileBase64 = existingImage.rows[0].arquivo;
			} else {
				return {
					status: 404,
					body: {
						message: 'Promocao não encontrada'
					}
				};
			}
		}

		try {
			await db.query(
				'UPDATE produto SET nome = $1, valor = $2, descricao = $3, data_inicio = $4, data_Fim = $5 arquivo = $6 WHERE codigo = $7',
				[nomePromo, valorPromo, descricaoPromo, dataInicio, dataFim, fileBase64, codigo]
			);

			return {
				status: 200,
				body: {
					message: 'Promocao editada com sucesso!'
				}
			};
		} catch (error) {
			console.error('Erro ao editar Promocao:', error);
			return {
				status: 500,
				body: {
					error: 'Erro ao editar promocao. Por favor, tente novamente.'
				}
			};
		}
	},

	editarQuantPromo: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get('codigo');
		const estoque = data.get('estoque');
		console.log('Codigo recebido:', codigo);
		console.log('Estoque recebido:', estoque);

		if (!codigo || !estoque) {
			return {
				status: 400,
				body: {
					message: 'Dados inválidos'
				}
			};
		}

		try {
			await db.query('UPDATE promocao SET estoque = $1 WHERE codigo = $2', [estoque, codigo]);
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
