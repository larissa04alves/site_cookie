import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { cliente, pedido, pedidoItem, produto } from '$lib/server/db/schema';
import { asc, eq } from 'drizzle-orm';

export const GET: RequestHandler = async () => {
  // Obtenha os pedidos, seus itens e dados do cliente
  const listarPedidosComItens = await db
    .select({
      pedidoId: pedido.id,
      nomeProduto: produto.nome,
      quantidade: pedidoItem.quantidade,
      pedidoValorTotal: pedido.valorTotal,
      clienteNome: cliente.nome,
      pedidoData: pedido.data,
    })
    .from(pedido)
    .leftJoin(pedidoItem, eq(pedido.id, pedidoItem.pedidoId)) // Join entre pedido e pedidoItem
    .leftJoin(produto, eq(pedidoItem.produtoId, produto.codigo)) // Join entre pedidoItem e produto
    .leftJoin(cliente, eq(pedido.clienteId, cliente.id))
    .orderBy(asc(pedido.id));

  // Agrupar os pedidos e itens
  const pedidosComItens = listarPedidosComItens.reduce((acc, row) => {
    const {
      pedidoId,
      nomeProduto,
      quantidade,
      pedidoValorTotal,
      clienteNome,
      pedidoData,
    } = row;

    // Garantir que pedidoValorTotal seja um número
    const valorTotal = parseFloat(pedidoValorTotal as string) || 0; // Convertendo para número

    // Garantir que pedidoData seja um Date
    const data = pedidoData ? new Date(pedidoData) : new Date(); // Convertendo para Date

    // Verifique se o pedido já está no acumulador
    if (!acc[pedidoId]) {
      acc[pedidoId] = {
        pedidoId,
        pedidoValorTotal: valorTotal,
        clienteNome: clienteNome || 'Desconhecido',
        pedidoData: data, // Agora é garantido que é um Date
        itens: [],
      };
    }

    // Adicionar o item ao pedido
    acc[pedidoId].itens.push({
      nomeProduto: nomeProduto || 'Produto Indefinido',
      quantidade: quantidade || 0,
    });

    return acc;
  }, {} as {
    [key: number]: {
      pedidoId: number;
      pedidoValorTotal: number;
      clienteNome: string;
      pedidoData: Date;
      itens: { nomeProduto: string; quantidade: number }[];
    };
  });

  // Converter os pedidos agrupados para uma lista
  const resposta = Object.values(pedidosComItens);

  return new Response(JSON.stringify(resposta), {
    headers: {
      'content-type': 'application/json',
    },
  });
};
