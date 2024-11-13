<script lang="ts">
	import { ShoppingCart, Star } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { onMount } from 'svelte';

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
</script>

<div class="mx-auto grid w-4/5 grid-cols-1 gap-x-28 gap-y-10 md:grid-cols-4 lg:grid-cols-4">
	{#each cookie as produto}
		<div
			class="relative flex h-96 w-60 flex-col items-center justify-center gap-4 rounded-xl bg-seashell py-3 shadow-2xl"
		>
			<div class="relative h-[75%] w-[90%] overflow-hidden rounded-xl">
				<img class="h-full w-full object-cover" src={produto.arquivo} alt="" />

				<div class="absolute right-3 top-3 flex items-center rounded-full bg-[#00000099] px-2 py-1">
					<Star fill="#A35A32" color="transparent" size="14" />
					<span class="ml-1 text-xs font-semibold text-white">4.5</span>
				</div>
			</div>

			<div class="flex w-full flex-col px-4">
				<div class="flex items-center justify-between">
					<h1 class="text-lg font-semibold">{produto.nome}</h1>
				</div>
				<div class="mt-2 flex items-center justify-between">
					<h1 class="text-lg font-semibold">R$ {produto.valor}</h1>
					<Button
						variant="ghost"
						class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose"
					>
						<ShoppingCart size={18} color="white" />
					</Button>
				</div>
			</div>
		</div>
	{/each}
</div>
