<script lang="ts">
	import { ShoppingCart, Star } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { onMount } from 'svelte';

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

<div class="mx-auto grid w-4/5 grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-4">
	{#each cookie as produto}
		<div class="flex flex-col items-center justify-center gap-4 rounded-xl py-3 shadow-2xl">
			<img class="h-48 w-full rounded-lg object-cover px-2" src={produto.arquivo} alt="" />
			<div class="flex w-full flex-col px-4">
				<div class="flex items-center justify-between">
					<h1>{produto.nome}</h1>
					<p class="flex items-center gap-1 text-sm">
						<Star fill="#A35A32" color="transparent" size="18" /> 4.5
					</p>
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
