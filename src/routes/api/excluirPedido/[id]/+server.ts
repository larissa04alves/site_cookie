import { db } from '$lib/server/db/index.js';
import { pedido, pedidoItem } from '$lib/server/db/schema.js';
import { json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

// Rota DELETE para excluir o pedido e seus itens
export async function DELETE({ params }) {
	try {
		const pedidoId = parseInt(params.id);

		if (isNaN(pedidoId)) {
			return json({ error: 'ID do pedido inválido' }, { status: 400 });
		}

		await db.transaction(async (trx) => {
			await trx.delete(pedidoItem).where(eq(pedidoItem.pedidoId, pedidoId));

			await trx.delete(pedido).where(eq(pedido.id, pedidoId));
		});

		return json({ message: `Pedido ${pedidoId} excluído com sucesso!` });
	} catch (error) {
		console.error('Erro ao excluir o pedido:', error);
		return json({ error: 'Erro ao excluir o pedido' }, { status: 500 });
	}
}
