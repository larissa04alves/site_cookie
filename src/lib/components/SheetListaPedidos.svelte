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
			currency: 'BRL'
		}).format(typeof valor === 'string' ? parseFloat(valor) : valor);
	};

	const DeletarItem = (item: Item) => {
		try {
			if (Array.isArray(itens)) {
				itens = itens.filter((i) => item !== i);

				sessionStorage.setItem('listItens', JSON.stringify(itens));

				toast.success('Item Deletado!', {
					description: 'O item foi deletado de seu carrinho.',
					duration: 1000
				});
			}
		} catch (error) {
			toast.error('Erro!', {
				description: 'Não foi possível deletar o item do carrinho!'
			});
		}
	};

	const AtualizarItem = (item: Item, novaQuantidade: number) => {
		try {
			if (Array.isArray(itens)) {
				itens = itens.map((i) =>
					i === item
						? {
								id: item.id,
								nome: item.nome,
								valor: item.valor,
								quantidade: novaQuantidade
							}
						: i
				);

				sessionStorage.setItem('listItens', JSON.stringify(itens));
			}
		} catch (error) {
			toast.error('Erro!', {
				description: 'Não foi possível atualizar a quantidade do item!'
			});
		}
	};
</script>

<Sheet.Root>
	<Sheet.Trigger>Open</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
