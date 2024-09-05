<script lang="ts">
	import produto from '$lib/img/produtosadmin.jpg';
	import CounterInput from '$lib/components/CounterInput.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Pencil, Trash2 } from 'lucide-svelte';
	let cookie = [
		{
			nome: 'Cookie de chocolate',
			preco: 8.0
		},
		{
			nome: 'Cookie de morango',
			preco: 10.0
		},
		{
			nome: 'Cookie de limão',
			preco: 12.0
		},
		{
			nome: 'Cookie de maracujá',
			preco: 14.0
		},
		{
			nome: 'Cookie de abacaxi',
			preco: 16.0
		},
		{
			nome: 'Cookie de banana',
			preco: 18.0
		},
		{
			nome: 'Cookie de uva',
			preco: 20.0
		}
	];
</script>

<div class="grid grid-cols-1 gap-7 py-24 md:grid-cols-2 lg:grid-cols-3">
	{#each cookie as item}
		<div class="mx-auto flex w-full max-w-xs flex-col items-center justify-center">
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url({produto})"
			></div>

			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{item.nome}</h3>

				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="text-sm font-semibold text-gray-800">Quant.</span>
					<CounterInput />
					<button
						class="transform rounded bg-brownNose px-2 py-1 text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
						>Salvar</button
					>
				</div>
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="font-semibold text-gray-800">R$ {item.preco.toFixed(2)}</span>
					<div class="flex gap-4">
						<Button
							variant="ghost"
							class="px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
							><Pencil size="20" /></Button
						>
						<Button
							variant="ghost"
							class=" px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
							><Trash2 size="20" /></Button
						>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
