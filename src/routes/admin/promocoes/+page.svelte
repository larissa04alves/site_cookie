<script lang="ts">
	import CounterInput from '$lib/components/CounterInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';
	import SheetProdutos from '$lib/components/SheetProdutos.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	console.log(cookie);
</script>

<div class="grid grid-cols-1 gap-7 py-10 md:grid-cols-2 lg:grid-cols-3">
	{#each cookie as produto}
		<div class="mx-auto flex w-full max-w-xs flex-col items-center justify-center">
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url({produto.arquivo});"
			></div>
			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{produto.nome}</h3>

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
								produto.estoque = quantidadeAtualizada;
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
					<input type="hidden" name="codigo" value={produto.codigo} />
				</form>

				<!-- Formulário para excluir o produto -->
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="font-semibold text-gray-800">R$ {produto.valor}</span>
					<form
						class="flex gap-4"
						method="post"
						action="?/excluirProduto"
						use:enhance={() => {
							return async ({ result }) => {
								console.log('deletado', result);

								if (result.status === 200) {
									toast.error('Produto deletado!', {
										description: 'O produto foi deletado com sucesso.'
									});
									cookie = cookie.filter((prod) => prod.codigo !== produto.codigo);
								} else {
									toast.error('Erro ao deletar produto!', {
										description: 'Não foi possível deletar o produto.'
									});
								}
							};
						}}
					>
						<div>
							<Button variant="ghost" class="px-0 py-0 hover:bg-transparent">
								<SheetProdutos {produto} />
							</Button>
							<Button
								variant="ghost"
								formaction="?/excluirProduto"
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

<!-- <script lang="ts">
	// import CounterInput from '$lib/components/CounterInput2.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	// import SheetPromocao from '$lib/components/SheetPromocao.svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	let promo: Array<any> = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/listarPromocoes');
			if (res.ok) {
				promo = await res.json();
			} else {
				console.error('Erro ao carregar as promocoes');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});
</script>

<div class="grid grid-cols-1 gap-7 py-24 md:grid-cols-2 lg:grid-cols-3">
	{#each promo as item}
		<form
			method="post"
			action="?/editarQuantPromo"
			class="mx-auto flex w-full max-w-xs flex-col items-center justify-center"
			use:enhance={({ formData }) => {
				const quantidadeAtualizada = Number(formData.get('estoque'));
				const codigoProduto = formData.get('codigo');

				return async ({ result }) => {
					if (result.status === 200) {
						toast.success('Promoção atualizada!', {
							description: 'A promoção foi atualizada com sucesso.'
						});
						item.estoque = quantidadeAtualizada;
					} else {
						toast.error('Erro ao atualizar promoção!', {
							description: 'A promoção não foi atualizado com sucesso.'
						});
					}
				};
			}}
		>
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url({item.arquivo});"
			></div>
			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{item.nome}</h3>
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="text-sm font-semibold text-gray-800">Quant.</span>
					<input type="number" name="codigo" value={item.codigo} class="hidden" />
					<CounterInput bind:count={item.estoque} />
					<Button
						type="submit"
						formaction="?/editarQuantPromo"
						variant="ghost"
						class="h-8 transform rounded bg-brownNose text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
					>
						Salvar
					</Button>
				</div>
			</div>

			<div class="flex w-[80%] items-center justify-between bg-seashell px-3 py-2">
				<span class="font-semibold text-gray-800">R$ {item.valor}</span>
				<form
					class="flex gap-4"
					method="post"
					action="?/excluirPromocao"
					use:enhance={() => {
						return async ({ result, update }) => {
							console.log('deletado', result);

							if (result.status === 200) {
								toast.success('Promoção deletada!', {
									description: 'A promoção foi deletada com sucesso.'
								});
								promo = promo.filter((prod) => prod.codigo !== item.codigo);
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
							<SheetPromocao {promo} />
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
				</form>
			</div>
		</form>
	{/each}
</div> -->
