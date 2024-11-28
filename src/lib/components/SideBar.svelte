<script lang="ts">
	import logo from '$lib/img/logoCookiesMo.png';
	import Button from './ui/button/button.svelte';
	import { ClipboardList, Plus, ShoppingBasket, ShoppingCart, Percent } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<div
	class="fixed left-0 z-20 flex h-full w-[15%] flex-col items-center justify-between gap-6 border-r-[1.5px] bg-seashell py-8"
>
	<div class="flex flex-col items-center justify-center gap-10">
		<img class="w-28 select-none" src={logo} alt="Logo da loja" />

		<div class="flex w-[95%] flex-col gap-4">
			<Button
				href="/admin/novoproduto"
				variant="ghost"
				class="flex justify-start gap-2 rounded-xl py-6 hover:bg-brownCrayola hover:text-white {$page
					.url.pathname === '/admin/novoproduto'
					? 'bg-brownCrayola text-white'
					: ''}"><Plus size="45" />Novo Produto</Button
			>
			<Button
				href="/admin/produtos"
				variant="ghost"
				class="flex justify-start gap-2 rounded-xl py-6 hover:bg-brownCrayola hover:text-white {$page
					.url.pathname === '/admin/produtos'
					? 'bg-brownCrayola text-white'
					: ''}"><ClipboardList />Produtos</Button
			>
			<Button
				href="/admin/pedidos"
				variant="ghost"
				class="flex justify-start gap-2 rounded-xl py-6 hover:bg-brownCrayola hover:text-white {$page
					.url.pathname === '/admin/pedidos'
					? 'bg-brownCrayola text-white'
					: ''}"><ShoppingCart />Pedidos</Button
			>
			<Button
				href="/admin/promocoes"
				variant="ghost"
				class="flex justify-start gap-2 rounded-xl py-6 hover:bg-brownCrayola hover:text-white {$page
					.url.pathname === '/admin/promocoes'
					? 'bg-brownCrayola text-white'
					: ''}"><Percent />Promoções</Button
			>
		</div>
	</div>

	<div class="flex w-[90%] flex-col py-2">
		<Button
			href="/"
			variant="ghost"
			class="flex gap-2 rounded-xl py-6 hover:bg-brownCrayola hover:text-white {$page.url
				.pathname === '/loja'
				? 'bg-brownCrayola text-white'
				: ''}"><ShoppingBasket /> Voltar a Loja</Button
		>
	</div>
</div>
