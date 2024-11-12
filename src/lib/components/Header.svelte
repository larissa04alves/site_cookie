<script>
	import logo from '$lib/img/logoCookiesMo.png';
	import { Search, ShoppingCart, User } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import SheetCarrinho from './SheetCarrinho.svelte';

	let scrollY = 0;
</script>

<svelte:window bind:scrollY />

<nav
	class={`fixed z-50 flex w-full items-center justify-around bg-white py-4 transition-shadow duration-300 ${scrollY > 0 ? 'shadow-md' : ''}`}
>
	<img class="w-[4%]" src={logo} alt="logo da loja" />
	<div class="font-montserrat text-brownNose">
		<Button
			href="/"
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">HOME</Button
		>
		<Button
			href="#produtos"
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">PRODUTOS</Button
		>
		<Button
			href="#sobrenos"
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">SOBRE NÓS</Button
		>
		<Button
			href="#bestsellers"
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">MAIS VENDIDOS</Button
		>
	</div>

	<div class="flex gap-2">
		<div class="relative w-full max-w-[14rem]">
			<span class="absolute inset-y-0 left-0 flex items-center pl-3">
				<Search class="h-4 w-4 text-brownCrayola" />
			</span>
			<Input
				type="search"
				placeholder="Pesquisar"
				class=" max-w-lg rounded-2xl border-none bg-ghostWhite pl-10 placeholder:text-xs placeholder:text-brownNose"
			/>
		</div>

		<SheetCarrinho />
		<Button
			class="flex h-10 w-10 items-center justify-center rounded-full bg-ghostWhite p-0"
			href="/login"
			variant="ghost"><User class="w-4 text-brownNose" /></Button
		>
	</div>
</nav>
