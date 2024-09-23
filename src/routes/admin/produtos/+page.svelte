<script lang="ts">
	import CounterInput from '$lib/components/CounterInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import SheetPedidos from '$lib/components/SheetPedidos.svelte';

	let cookie: Array<any> = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			console.log(res);

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
		>
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url('https://picsum.photos/330/200?random=1')"
			></div>
			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{produto.nome}</h3>
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="text-sm font-semibold text-gray-800">Quant.</span>
					<CounterInput count={produto.estoque} />
					<button
						type="submit"
						formaction="?/editarQuantidade"
						class="transform rounded bg-brownNose px-2 py-1 text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
						>Salvar</button
					>
				</div>

				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="font-semibold text-gray-800">R$ {produto.valor}</span>
					<div class="flex gap-4">
						<SheetPedidos />
						<Button
							variant="ghost"
							formaction="?/excluirProduto"
							type="submit"
							class=" px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
							><Trash2 size="20" /></Button
						>
					</div>
				</div>
			</div>
			<input type="number" name="codigo" value={produto.codigo} class="hidden" />
		</form>
	{/each}
</div>
