<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { ArrowRight, ShoppingCart, Trash, Truck } from 'lucide-svelte';
	import { Separator } from './ui/separator';
	import { Input } from '$lib/components/ui/input/index.js';
	import Button from './ui/button/button.svelte';
	import CounterInput from './CounterInput.svelte';
	import { toast } from 'svelte-sonner';

	let itens: Array<Item> = [];
	let isSheetOpen = false;

	type Item = {
		id: string;
		nome: string;
		valor: string;
		quantidade: number;
	};

	const carregarItens = () => {
		const storedItems = sessionStorage.getItem('listItens');
		try {
			itens = storedItems ? JSON.parse(storedItems) : [];
			if (!Array.isArray(itens)) {
				itens = [];
			}
		} catch (error) {
			console.error('Erro ao carregar itens:', error);
			itens = [];
		}
	};

	const formatarMoeda = (valor: number | string) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(typeof valor === 'string' ? parseFloat(valor) : valor);
	};

	const DeletarItem = (item:Item) =>{
		try {
			if (Array.isArray(itens)) {
				itens = itens.filter((i) => item !== i);

				sessionStorage.setItem('listItens', JSON.stringify(itens));

				toast.success('Item Deletado!', {
					description: 'O item foi deletado de seu carrinho.',
					duration: 1000,
				});
			}
		} catch (error) {
			toast.error('Erro!', {
				description: 'Não foi possível deletar o item do carrinho!'
			});
		}
	}

	const AtualizarItem = (item:Item, novaQuantidade:number) =>{
		try {
			if (Array.isArray(itens)) {
				itens = itens.map((i) => i === item ? {
					id: item.id,
					nome: item.nome,
					valor: item.valor,
					quantidade: novaQuantidade,
				}
				: i);
				
				sessionStorage.setItem('listItens', JSON.stringify(itens));
			}
		} catch (error) {
			toast.error('Erro!', {
				description: 'Não foi possível atualizar a quantidade do item!',
			});
		}
	}
</script>

<Sheet.Root bind:open={isSheetOpen} onOpenChange={(open) => open && carregarItens()}>
	<Sheet.Trigger
		class="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-ghostWhite"
	>
		<ShoppingCart class="w-4 text-brownNose" />
	</Sheet.Trigger>
	<Sheet.Content class="flex w-1/4 flex-col justify-between bg-ghostWhite" side="right">
		<div class="w-full overflow-auto">
			<Sheet.Title class="flex gap-2 text-sm text-brownNose">
				<ShoppingCart size={20} /> 
				Seu carrinho {itens.length > 0 ? `(${itens.length})` : ''}
			</Sheet.Title>

			{#if itens.length > 0}
				{#each itens as item}
					<div class="flex items-center gap-2 pt-10">
						<!-- <img class="w-1/4 rounded-md" src={item.imagem} alt={item.nome} /> -->
						<div class="flex w-full flex-col gap-3 text-xs text-brownNose">
							<div class="flex gap-5">
								<h1 class="font-semibold">{item.nome}</h1>
								<p class="flex text-sm">{formatarMoeda(item.valor)}</p>
							</div>
							<div class="flex gap-1">
								<CounterInput count={item.quantidade} minimum={1} onChangeValue={(quantidade) => AtualizarItem(item, quantidade)}/>
								<Button
									variant="link"
									onclick={() => DeletarItem(item)}
									class=" flex items-center justify-center rounded-full  text-xs text-brownCrayola"
								>
									Excluir
									<Trash />
								</Button>
							</div>
						</div>
					</div>
					<Separator class="my-5" />
				{/each}
			{:else}
				<Separator class="my-5" />
				<p class="text-center text-gray-500 text-md">Seu carrinho está vazio.</p>
			{/if}
		</div>

		<Sheet.Footer class="flex !flex-col justify-center gap-5">
			{#if itens.length > 0}
				<div class="flex justify-between text-sm">
					<h1 class="font-semibold">Subtotal</h1>
					<p class="pr-5">
						{formatarMoeda(itens.reduce((total, item) => total + (parseFloat(item.valor) * item.quantidade), 0).toFixed(2))}
					</p>
				</div>
			{/if}
			<div class="flex items-center gap-2">
				<h1 class="flex items-center gap-1 text-xs text-brownNose"><Truck />Calcular frete</h1>
				<div class="flex">
					<Input
						class=" border-brownNose focus-visible:ring-brownNose"
						placeholder="Digite seu CEP"
					/>
					<Button variant="ghost" class="flex hover:bg-transparent hover:text-brownCrayola">
						<ArrowRight class="text-brownNose" />
					</Button>
				</div>
			</div>
			<div class="flex items-center justify-start">
				<Sheet.Close class="{buttonVariants({ variant: 'link' })} text-xs">
					Continuar comprando
				</Sheet.Close>
				<Button
					variant="ghost"
					href="/checkout"
					class="flex bg-brownCrayola font-montserrat text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
					onclick={() => isSheetOpen = false}>
					Finalizar compra
				</Button>
			</div>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
