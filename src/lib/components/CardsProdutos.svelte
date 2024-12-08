<script lang="ts">
	import { ShoppingCart, Star } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import SheetCarrinho from './SheetCarrinho.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cookie: Array<any> = [];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let promocoes: Array<any> = [];
	let activeProduct: number | null = null;

	onMount(async () => {
		try {
			// Busca produtos normais
			const resProdutos = await fetch('/api/listarProdutos');
			if (resProdutos.ok) {
				cookie = await resProdutos.json();
			}

			// Busca promoções
			const resPromocoes = await fetch('/api/listarPromocoes');
			if (resPromocoes.ok) {
				const todasPromocoes = await resPromocoes.json();

				// Filtra apenas promoções válidas
				const hoje = new Date();
				hoje.setHours(0, 0, 0, 0);

				promocoes = todasPromocoes.filter((promo: any) => {
					const dataInicio = new Date(promo.dataInicio);
					const dataFim = new Date(promo.dataFim);

					dataInicio.setHours(0, 0, 0, 0);
					dataFim.setHours(0, 0, 0, 0);

					return dataInicio <= hoje && dataFim >= hoje;
				});
			}
		} catch (error) {
			console.error('Erro ao carregar dados:', error);
		}
	});

	async function addItem(item: any, isPromocao = false) {
		try {
			const storageProduto = {
				id: crypto.randomUUID(),
				codigo: item.codigo,
				nome: isPromocao ? item.nomePromo : item.nome,
				valor: isPromocao ? item.valorPromo : item.valor,
				estoque: isPromocao ? item.estoquePromo : item.estoque,
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
		}
	}
</script>

<div class="mx-auto grid w-4/5 grid-cols-1 gap-x-28 gap-y-10 md:grid-cols-4 lg:grid-cols-4">
	{#if promocoes.length > 0}
		{#each promocoes as promocao}
			<div
				class="relative flex h-96 w-60 flex-col items-center justify-center gap-4 rounded-xl bg-seashell py-3 shadow-2xl transition-all duration-300"
			>
				<div
					class="absolute right-5 top-6 z-10 flex items-center rounded-full px-2 py-1 {promocao.nomePromo
						.toLowerCase()
						.includes('combo')
						? 'bg-blue-500/80'
						: 'bg-red-500/80'}"
				>
					<span class="text-xs font-semibold text-white">
						{promocao.nomePromo.toLowerCase().includes('combo') ? 'Combo' : 'Promoção'}
					</span>
				</div>
				<div class="relative h-[75%] w-[90%] overflow-hidden rounded-xl">
					<img
						class="h-full w-full object-cover"
						src={promocao.arquivoPromo}
						alt={promocao.nomePromo}
					/>
				</div>
				<div class="flex w-full flex-col px-4">
					<div class="flex items-center justify-between">
						<h1 class="text-lg font-semibold text-brownNose">{promocao.nomePromo}</h1>
					</div>
					<div class="mt-2 flex items-center justify-between">
						<h1 class="text-lg font-semibold text-brownNose">R$ {promocao.valorPromo}</h1>
						<Button
							variant="ghost"
							class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose"
							onclick={() => addItem(promocao, true)}
						>
							<ShoppingCart size={18} color="white" />
						</Button>
					</div>
				</div>
			</div>
		{/each}
	{/if}

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
