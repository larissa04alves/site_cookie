import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RequestHandler } from '@sveltejs/kit';
import db from '$lib/database/connectdb';

// A função load é executada automaticamente quando a página é carregada
export const load: PageServerLoad = async () => {
	// Pega os Produtos no banco de dados
	const produtos = await db.query('SELECT * FROM Produto ORDER BY Nome').then((res) => res.rows);

    // console.log(produtos);
	// Retorna os dados para o frontend
	return { produtos };
};

export const actions: Actions = {  
  updateEstoque: async ({ request }) => {
    try {
      // Obtendo os dados do corpo da requisição
      const data = await request.formData();
      const codigo = data.get('codigo');
      const estoque = data.get('estoque');

      // Validando os dados recebidos
      if (!codigo || !estoque) {
        return { message: 'Dados inválidos' };
      }

      // Atualizando o banco de dados
      await db.query('UPDATE produto SET estoque = $1 WHERE codigo = $2', [estoque, codigo]);

      return { message: 'Estoque atualizado com sucesso' };
    } catch (error) {
      return { message: 'Erro atualizando o estoque' };
    }
  },
  delete: async ({request}) => {
    try{
      const data = await request.formData();
      const codigo = data.get('codigo');

      if(!codigo){
        return {message: 'Dados inválidos'};
      }

      await db.query('DELETE FROM Produto WHERE codigo = $1', [codigo]);

      return {message: 'Produto deletado com sucesso!'};
    }
    catch(error){
      return { message: 'Erro deletando o produto' };
    }
  }
};