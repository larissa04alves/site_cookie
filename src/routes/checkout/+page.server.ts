import { db } from '$lib/server/db/index';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { cliente, enderecoCliente, pedido, pedidoItem, type Pedido } from '$lib/server/db/schema';
import type { Cliente, ClienteInsert, EnderecoClienteInsert, PedidoInsert, PedidoItemInsert } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';


type Item = {
    codigo: number;
    nome: string;
    valor: string;
    quantidade: number;
};

export const actions: Actions = {
	gravarPedido: async ({ request }) => {
		const data = await request.formData();
		console.log('Data:', data);
        
        let itens: Item[] = [];
        const itensValue = data.get('itens') as string;

        console.log('Itens recebidos:', data.get('itens'));
        
        if (itensValue) {
            try {
                itens = JSON.parse(itensValue);
            } catch (error) {
                console.error('Erro ao parsear os itens:', error);
                return fail(400, { erros: { itens: 'Formato de itens inválido' } });
            }
        } else {
            return fail(400, { erros: { itens: 'Nenhum item encontrado' } });
        }
        console.log('Itens -> ' + itens);
		const nome = data.get('name') as string;
		const sobrenome = (data.get('lastname') as string);
		const cep = data.get('cep') as string;
		const endereco = data.get('adress') as string;
		const numero = data.get('number') as string;
        const bairro = data.get('bairro') as string;
        const cidade = data.get('city') as string;
        const telefone = data.get('phone') as string;

		// Validações
		const erros: Record<string, string> = {};

        if(itens.length == 0){
			erros.itens = 'Nenhum item no carrinho';
		}

		if (!nome) {
			erros.nome ='Nome deve ser informado';
		}

		if (!sobrenome) {
			erros.sobrenome = 'Sobrenome deve ser informado';
		}
		
		if (!cep || cep.length != 9) {
			erros.cep = 'Cep inválido';
		}

		if (!endereco) {
			erros.endereco = 'Endereço inválido';
		}
		if (!numero) {
			erros.numero = 'Número inválido';
		}

		if (!bairro) {
			erros.bairro = 'Bairro inválido';
		}

		if (!cidade) {
			erros.cidade = 'Cidade inválida';
		}

		if (!telefone) {
			erros.telefone = 'Telefone inválido';
		}

		if (Object.keys(erros).length > 0) {
			return fail(400, {
				erros,
				values: { itens, nome, sobrenome, cep, endereco, numero, bairro, cidade, telefone }
			});
		}

        const buscaCliente = await db.select().from(cliente).where(eq(cliente.nome,nome.toUpperCase() + ' ' + sobrenome.toUpperCase()));
        let mCLienteCodigo;
        let inserirEndereco = false;

        if(!buscaCliente || buscaCliente.length === 0){
            const clienteData:ClienteInsert = {
                nome: nome.toUpperCase() + ' ' + sobrenome.toUpperCase(),
                // documento: '',
                // email: '',
                senha: '',
                dataNascimento: '2002-01-01'
            };

            const clienteInserido = await db.insert(cliente).values(clienteData).returning();

            // console.log('Cliente inserto -> ' + clienteInserido[0].id);
            mCLienteCodigo = clienteInserido[0].id;

            inserirEndereco = true;
        }
        else{
            mCLienteCodigo = buscaCliente[0].id;

            const buscaEndereco = await db.select().from(enderecoCliente).where(eq(enderecoCliente.clienteId,mCLienteCodigo));

            if(!buscaEndereco || buscaEndereco.length === 0)
            {
                inserirEndereco = true;
            }
            else{
                await db.update(enderecoCliente).set({ bairro: bairro, cidade: cidade, endereco: endereco, numero: numero, cep: cep }).where(eq(enderecoCliente.id, buscaEndereco[0].id));
            }
        }
        
        if(inserirEndereco){
            const enderecoData: EnderecoClienteInsert = {
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cep: cep,
                clienteId: mCLienteCodigo,
            }

            await db.insert(enderecoCliente).values(enderecoData);
        }

		// Processamento da imagem e inserção no banco
		try {
            const pedidoData:PedidoInsert = {
                enderecoEntrega: endereco + ', ' + numero + ' - ' + bairro + ' - ' + cidade + ' - ' + cep,
				data: new Date(Date.now()).toISOString().split('T')[0],
                valor: itens.reduce((total, item) => total + parseFloat(item.valor) * item.quantidade, 0).toFixed(2),
                desconto: null,
                frete: null,
                valorTotal: itens.reduce((total, item) => total + parseFloat(item.valor) * item.quantidade, 0).toFixed(2),
                clienteId: mCLienteCodigo,
            }

			const pedidoInserido = await db.insert(pedido).values(pedidoData).returning();

            for (const item of itens) {
                const pedidoItemData: PedidoItemInsert = {
                    pedidoId: pedidoInserido[0].id, // ID do pedido que você já tem
                    produtoId: item.codigo, // ID do produto
                    valor: parseFloat(item.valor).toString(), // Valor unitário do item
                    desconto: '0', // Desconto se houver
                    quantidade: item.quantidade, // Quantidade do item
                    valorTotal: (parseFloat(item.valor) * item.quantidade).toString(), // Valor total do item
                };
            
                try {
                    // Insira o pedidoItem no banco
                    const novoPedidoItem = await db.insert(pedidoItem).values(pedidoItemData);
                    // console.log('Item inserido:', novoPedidoItem);
                } catch (error) {
                    console.error('Erro ao inserir item:', error);
                    return fail(500, { message: 'Erro ao inserir item' });
                }
            }
            
			return {
				success: true,
				message: 'Pedido criado com sucesso'
			};
		} catch (error) {
			console.error('Erro ao criar pedido:', error);
			return fail(500, { message: 'Erro ao criar pedido' });
		}
	}
};