<script lang="ts">
	import CounterInput from '$lib/components/CounterInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import SheetPedidos from '$lib/components/SheetPedidos.svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	let cookie: Array<any> = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			if (res.ok) {
				cookie = await res.json();
			} else {
				console.error('Erro ao carregar os produtos');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});
</script>

<div class="grid grid-cols-1 gap-7 py-24 md:grid-cols-2 lg:grid-cols-3">
	{#each cookie as produto}
		<form
			method="post"
			action="?/editarQuantidade"
			class="mx-auto flex w-full max-w-xs flex-col items-center justify-center"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				// Obtenha a quantidade atualizada do formData
				const quantidadeAtualizada = Number(formData.get('estoque'));

				return async ({ result, update }) => {
					if (result.status === 200) {
						toast.success('Estoque atualizado!', {
							description: 'O estoque foi atualizado com sucesso.'
						});
						// Atualize o estoque do produto com a quantidade atualizada
						produto.estoque = quantidadeAtualizada;
					} else {
						toast.error('Erro ao atualizar estoque!', {
							description: 'O estoque não foi atualizado com sucesso.'
						});
					}
				};
			}}
		>
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url('https://picsum.photos/330/200?random=1')"
			></div>
			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{produto.nome}</h3>
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="text-sm font-semibold text-gray-800">Quant.</span>
					<CounterInput bind:count={produto.estoque} />
					<Button
						type="submit"
						formaction="?/editarQuantidade"
						variant="ghost"
						class="h-8 transform rounded bg-brownNose text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
					>
						Salvar
					</Button>
				</div>

				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="font-semibold text-gray-800">R$ {produto.valor}</span>
					<form
						class="flex gap-4"
						method="post"
						action="?/excluirProduto"
						use:enhance={() => {
							return async ({ result, update }) => {
								// `result` is an `ActionResult` object
								console.log('deletado', result);

								if (result.status === 200) {
									toast.success('Produto deletado!', {
										description: 'O produto foi deletado com sucesso.'
									});
									// Remover o produto deletado da lista 'cookie'
									cookie = cookie.filter((prod) => prod.codigo !== produto.codigo);
								} else {
									toast.error('Erro ao deletar produto!', {
										description: 'Não foi possível deletar o produto.'
									});
								}
							};
						}}
					>
						<SheetPedidos />
						<Button
							variant="ghost"
							formaction="?/excluirProduto"
							type="submit"
							class="px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
						>
							<Trash2 size="20" />
						</Button>
						<input type="number" name="codigo" value={produto.codigo} class="hidden" />
					</form>
				</div>
			</div>
			<input type="number" name="codigo" value={produto.codigo} class="hidden" />
		</form>
	{/each}
</div>
