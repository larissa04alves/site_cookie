<script lang="ts">
	import { ShoppingCart, Star } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import SheetCarrinho from './SheetCarrinho.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cookie: Array<any> = [];
	let activeProduct: number | null = null;

	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			if (res.ok) {
				cookie = await res.json();

				// Verifica se há um produto para destacar na URL
				const hash = window.location.hash;
				if (hash) {
					const productId = parseInt(hash.replace('#produto-', ''));
					activeProduct = productId;
					const element = document.getElementById(`produto-${productId}`);
					if (element) {
						element.scrollIntoView({ behavior: 'smooth' });
						// Adiciona e remove classe para highlight temporário
						element.classList.add('scale-105', 'shadow-2xl', 'border-2', 'border-brownCrayola');
						setTimeout(() => {
							element.classList.remove(
								'scale-105',
								'shadow-2xl',
								'border-2',
								'border-brownCrayola'
							);
						}, 2000);
					}
				}
			} else {
				console.error('Erro ao carregar os produtos');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});

	async function addItem(produto: any) {
		try {
			const storageProduto = {
				id: crypto.randomUUID(),
				codigo: produto.codigo,
				nome: produto.nome,
				valor: produto.valor,
				estoque: produto.estoque,
				//imagem: produto.arquivo,
				quantidade: 1
			};

			const listItensStorage = sessionStorage.getItem('listItens');
			const listItens = listItensStorage ? JSON.parse(listItensStorage) : [];

			listItens.push(storageProduto);

			sessionStorage.setItem('listItens', JSON.stringify(listItens));

			toast.success('Item adicionado!', {
				description: 'O item foi adicionado em seu carrinho.',
				duration: 1000
			});
		} catch (error) {
			toast.error('Erro ao adicionar o Item!', {
				description: 'Infelizmente não conseguimos adicionar o item em seu carrinho.'
			});
			console.error('Erro de rede:', error);
		}
	}
</script>

<div class="mx-auto grid w-4/5 grid-cols-1 gap-x-28 gap-y-10 md:grid-cols-4 lg:grid-cols-4">
	{#each cookie as produto}
		<div
			id="produto-{produto.codigo}"
			class="relative flex h-96 w-60 flex-col items-center justify-center gap-4 rounded-xl bg-seashell py-3 shadow-2xl transition-all duration-300"
			class:border-2={activeProduct === produto.codigo}
			class:border-brownCrayola={activeProduct === produto.codigo}
		>
			<div class="relative h-[75%] w-[90%] overflow-hidden rounded-xl">
				<img class="h-full w-full object-cover" src={produto.arquivo} alt={produto.nome} />

				<div class="absolute right-3 top-3 flex items-center rounded-full bg-[#00000099] px-2 py-1">
					<Star fill="#A35A32" color="transparent" size="14" />
					<span class="ml-1 text-xs font-semibold text-white">4.5</span>
				</div>
			</div>

			<div class="flex w-full flex-col px-4">
				<div class="flex items-center justify-between">
					<h1 class="text-lg font-semibold text-brownNose">{produto.nome}</h1>
				</div>
				<div class="mt-2 flex items-center justify-between">
					<h1 class="text-lg font-semibold text-brownNose">R$ {produto.valor}</h1>
					<Button
						variant="ghost"
						class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose"
						onclick={() => addItem(produto)}
					>
						<ShoppingCart size={18} color="white" />
					</Button>
				</div>
			</div>
		</div>
	{/each}
</div>
