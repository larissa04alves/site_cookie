<script>
	import logo from '$lib/img/logoCookiesMo.png';
	import { Search, ShoppingCart, User } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
</script>

<div class="flex w-full items-center justify-between px-16 py-5">
	<img class="w-[6%]" src={logo} alt="logo da loja" />
	<div class="font-montserrat text-brownNose">
		<Button
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">HOME</Button
		>
		<Button
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">PRODUTOS</Button
		>
		<Button
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">BEST SELLERS</Button
		>
		<Button
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">SOBRE NÓS</Button
		>
		<Button
			class="text-xs font-medium hover:bg-transparent hover:font-bold hover:text-brownNose"
			variant="ghost">CONTATO</Button
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
				class=" bg-ghostWhite max-w-lg rounded-2xl border-none pl-10 placeholder:text-xs placeholder:text-brownNose"
			/>
		</div>
		<Button
			class="bg-ghostWhite flex h-10 w-10 items-center justify-center rounded-full p-0"
			variant="ghost"
		>
			<ShoppingCart class="w-4 text-brownNose" />
		</Button>
		<Button
			class="bg-ghostWhite flex h-10 w-10 items-center justify-center rounded-full p-0"
			variant="ghost"><User class="w-4 text-brownNose" /></Button
		>
	</div>
</div>
