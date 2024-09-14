<script lang="ts">
  import produto from '$lib/img/produtosadmin.jpg';
  import CounterInput from '$lib/components/CounterInput.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Pencil, Trash2 } from 'lucide-svelte';
  import Modal from '$lib/components/Modal.svelte';
  import type { PageData } from './$types';
	import { Dialog } from 'bits-ui';
  
  export let data: PageData;
  export let form;
  let produtos = data?.produtos || [];

  function formatarValor(valor: string | number) {
    const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;
    return valorNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
</script>


<div class="grid grid-cols-1 gap-7 py-24 md:grid-cols-2 lg:grid-cols-3">
	{#if form?.message != "" && form?.message != undefined}
	<!-- <Modal tipo={TipoModal.OK} showModal={form?.message != ""}> -->
	<Modal showModal={form?.message != ""}>
		<h2 slot="header">
			{form?.message}
		</h2>
	</Modal>
	{/if}
	{#each produtos as item}
	<form method="POST" action="?/updateEstoque">
		<input type="hidden" id="codigo" name="codigo" value={item.codigo}>
		<div class="mx-auto flex w-full max-w-xs flex-col items-center justify-center">
			<div
				class="h-52 w-full rounded-lg bg-gray-300 bg-cover bg-center object-fill shadow-md"
				style="background-image: url({produto})"
			></div>

			<div class="-mt-10 w-56 overflow-hidden rounded-lg bg-white shadow-lg md:w-64">
				<h3 class="py-2 text-center font-bold uppercase text-gray-800">{item.nome}</h3>

				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="text-sm font-semibold text-gray-800">Quant.</span>
					<CounterInput count={item.estoque} inputName="estoque" />
					<button
						type="submit"
						class="transform rounded bg-brownNose px-2 py-1 text-xs font-semibold uppercase text-white transition-colors duration-300 hover:bg-brownCrayola focus:bg-brownCrayola focus:outline-none"
						>Salvar</button
					>
				</div>
				<div class="flex items-center justify-between bg-seashell px-3 py-2">
					<span class="font-semibold text-gray-800">{formatarValor(item.valor)}</span>
					<div class="flex gap-4">
						<Button
							variant="ghost"
							class="px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose"
							><Pencil size="20" /></Button
						>
						<button class=" px-0 text-brownCrayola hover:bg-transparent hover:text-brownNose" formaction="?/delete"><Trash2 size="20" /></button>
					</div>
				</div>
			</div>
		</div>
		</form>
	{/each}
</div>
