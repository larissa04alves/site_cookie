<script>
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import logo from '$lib/img/logo-cookiesMo.png';
	import { Dashboard } from 'svelte-radix';
	import Button from './ui/button/button.svelte';
	import { ClipboardList, Plus, ShoppingCart } from 'lucide-svelte';

	async function logout() {
		const res = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			window.location.href = '/login';
		}
	}
</script>

<div
	class="bg-seashell flex h-screen w-[15%] flex-col items-center justify-between gap-6 border-r-[1.5px] py-8"
>
	<div class="flex flex-col items-center justify-center gap-10">
		<img class="w-28 select-none" src={logo} alt="Logo da loja" />

		<div class="flex w-[90%] flex-col gap-4">
			<Button
				href="/admin/produtos"
				variant="ghost"
				class="hover:bg-brownCrayola flex justify-start gap-2 rounded-xl py-6 hover:text-white"
				><ClipboardList />Produtos</Button
			>
			<Button
				href="/admin/pedidos"
				variant="ghost"
				class="hover:bg-brownCrayola flex justify-start gap-2 rounded-xl py-6 hover:text-white"
				><ShoppingCart />Pedidos</Button
			>
			<Button
				href="/admin/novoproduto"
				variant="ghost"
				class="hover:bg-brownCrayola flex justify-start gap-2 rounded-xl py-6 hover:text-white"
				><Plus size="45" />Novo Produto</Button
			>
		</div>
	</div>

	<div class="flex w-[90%] flex-col gap-4 pl-8"></div>
</div>
