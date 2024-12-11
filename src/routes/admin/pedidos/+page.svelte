<script lang="ts">
	import { Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import SelectStatus from '$lib/components/SelectStatus.svelte';

	let pedidos: Array<any> = [];
	let showModal = false; // Para controlar a visibilidade do modal
	let pedidoParaExcluir: number | null = null; // Para armazenar o pedido a ser excluído

	onMount(async () => {
		try {
			// Busca pedidos via API
			const resPedidos = await fetch('/api/listarPedidos');
			if (resPedidos.ok) {
				pedidos = await resPedidos.json();
			}
		} catch (error) {
			console.error('Erro ao carregar dados:', error);
		}
	});

	// Função para abrir o modal e definir o pedido a ser excluído
	function confirmarExclusao(pedidoId: number) {
		pedidoParaExcluir = pedidoId;
		showModal = true;
	}

	// Função para excluir o pedido
	async function excluirPedido() {
		if (pedidoParaExcluir) {
			try {
				const res = await fetch(`/api/excluirPedido/${pedidoParaExcluir}`, {
					method: 'DELETE',
				});
				if (res.ok) {
					// Atualizar a lista de pedidos após exclusão
					pedidos = pedidos.filter(pedido => pedido.pedidoId !== pedidoParaExcluir);
					showModal = false; // Fechar o modal
					console.log(`Pedido ${pedidoParaExcluir} excluído com sucesso!`);
				} else {
					console.error('Erro ao excluir o pedido');
				}
			} catch (error) {
				console.error('Erro ao excluir o pedido:', error);
			}
		}
	}
</script>

<section class="container mx-auto w-[95%] px-4 pt-10">
	<div class="flex flex-col">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 md:rounded-lg">
					{#if pedidos.length === 0}
						<!-- Mensagem de nenhum pedido localizado -->
						<p class="text-center text-gray-500 py-4">Nenhum pedido localizado</p>
					{:else}
						<!-- Tabela de pedidos -->
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										<div class="flex items-center gap-x-3">
											<button class="flex items-center gap-x-2">
												<span> Nº pedido</span>
											</button>
										</div>
									</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										Data
									</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										Nome do Cliente
									</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										Itens do pedido
									</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										Valor
									</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right">
										
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								{#each pedidos as pedido}
									<tr>
										<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
											{pedido.pedidoId}
										</td>
										<td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
											{new Date(pedido.pedidoData).toLocaleDateString()}
										</td>
										<td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
											{pedido.clienteNome}
										</td>
										<td class="flex flex-col px-4 py-4 text-sm text-gray-500">
											{#each pedido.itens as item}
												<p>{item.quantidade}x {item.nomeProduto}</p>
											{/each}
										</td>
										<td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
											R$ {pedido.pedidoValorTotal.toFixed(2)}
										</td>
										<td class="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
											<button
												class="text-red-600 hover:text-red-800"
												on:click={() => confirmarExclusao(pedido.pedidoId)}
											>
												Excluir
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Modal de Confirmação de Exclusão -->
	{#if showModal}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div class="bg-white p-6 rounded-lg shadow-lg w-96">
				<h2 class="text-lg font-semibold text-gray-700">Confirmar Exclusão</h2>
				<p class="text-sm text-gray-500">Tem certeza que deseja excluir este pedido?</p>
				<div class="mt-4 flex justify-between">
					<button
						class="px-4 py-2 bg-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-400"
						on:click={() => showModal = false}
					>
						Cancelar
					</button>
					<button
						class="px-4 py-2 bg-red-600 rounded-md text-sm text-white hover:bg-red-700"
						on:click={excluirPedido}
					>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	{/if}
</section>
