<script lang="ts">
	import CounterInput from '$lib/components/CounterInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Trash2, Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import SheetPromocoes from '$lib/components/SheetPromocoes.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cookie: Array<any> = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/listarPromocoes');
			if (res.ok) {
				cookie = await res.json();
			} else {
				console.error('Erro ao carregar as promoções');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});
</script>

<div class="container mx-auto px-4 pt-20">
	{#if cookie.length === 0}
		<div class="flex h-[60vh] flex-col items-center justify-center gap-4">
			<p class="text-lg font-medium text-gray-600">Nenhuma promoção cadastrada</p>
			<Button
				href="/admin/novoproduto"
				class="flex items-center gap-2 bg-brownNose hover:bg-brownCrayola"
			>
				<Plus class="h-5 w-5" />
				Criar nova promoção
			</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-7 py-10 md:grid-cols-2 lg:grid-cols-3">
			{#each cookie as produto}
				<div class="mx-auto flex w-full max-w-xs flex-col items-center justify-center">
					<div
						class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
						style="background-image: url({produto.arquivoPromo});"
					></div>
					<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
						<h3 class="py-2 text-center font-bold uppercase text-gray-800">{produto.nomePromo}</h3>

						<!-- Formulário para editar a quantidade -->
						<form
							method="post"
							action="?/editarQuantidade"
							use:enhance={({ formData }) => {
								const quantidadeAtualizada = Number(formData.get('estoque'));

								return async ({ result }) => {
									if (result.status === 200) {
										toast.success('Estoque atualizado!', {
											description: 'O estoque foi atualizado com sucesso.'
										});
										produto.estoquePromo = quantidadeAtualizada;
									} else {
										toast.error('Erro ao atualizar estoque!', {
											description: 'O estoque não foi atualizado com sucesso.'
										});
									}
								};
							}}
						>
							<div class="flex items-center justify-between bg-seashell px-3 py-2">
								<span class="text-sm font-semibold text-gray-800">Quant.</span>
								<CounterInput bind:count={produto.estoquePromo} />
								<Button
									type="submit"
									formaction="?/editarQuantidade"
									variant="ghost"
									class="h-8 transform rounded bg-brownNose text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
								>
									Salvar
								</Button>
							</div>
							<input type="hidden" name="codigo" value={produto.codigo} />
							<input type="hidden" name="estoque" value={produto.estoquePromo} />
						</form>

						<!-- Formulário para excluir o produto -->
						<div class="flex items-center justify-between bg-seashell px-3 py-2">
							<span class="font-semibold text-gray-800">R$ {produto.valorPromo}</span>
							<form
								class="flex gap-4"
								method="post"
								action="?/excluirPromocao"
								use:enhance={() => {
									return async ({ result }) => {
										if (result.status === 200) {
											toast.error('Promoção deletada!', {
												description: 'A promoção foi deletada com sucesso.'
											});
											cookie = cookie.filter((prod) => prod.codigo !== produto.codigo);
										} else {
											toast.error('Erro ao deletar promoção!', {
												description: 'Não foi possível deletar a promoção.'
											});
										}
									};
								}}
							>
								<div>
									<Button variant="ghost" class="px-0 py-0 hover:bg-transparent">
										<SheetPromocoes
											promocao={{
												codigo: produto.codigo,
												nome: produto.nomePromo,
												valor: produto.valorPromo,
												descricao: produto.descricaoPromo,
												arquivo: produto.arquivoPromo,
												estoque: produto.estoquePromo
											}}
											onUpdate={async (updatedPromocao) => {
												try {
													const res = await fetch('/api/listarPromocoes');
													if (res.ok) {
														cookie = await res.json();
													}
												} catch (error) {
													console.error('Erro ao atualizar lista:', error);
												}
											}}
										/>
									</Button>
									<Button
										variant="ghost"
										formaction="?/excluirPromocao"
										type="submit"
										class="px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
									>
										<Trash2 size="20" />
									</Button>
								</div>

								<input type="hidden" name="codigo" value={produto.codigo} />
							</form>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
