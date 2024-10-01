<script>
	import { Input } from './ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from './ui/button/button.svelte';
	import { LogOut, Search } from 'lucide-svelte';
	import cookieUser from '$lib/img/cookieUser.png';
</script>

<nav
	class="fixed z-10 flex h-16 w-full items-center justify-between border-b-[1.5px] bg-seashell px-20"
>
	<h1 class="font-semibold">Produtos</h1>

	<div class="relative w-full max-w-lg">
		<span class="absolute inset-y-0 left-0 flex items-center pl-3">
			<Search class="h-5 w-5 text-gray-500" />
		</span>
		<Input type="search" placeholder="Pesquisar" class="max-w-lg border-black pl-10" />
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="flex items-center justify-center gap-2 "
			><img src={cookieUser} class="w-10" alt="Imagem do admin" /> Admin</DropdownMenu.Trigger
		>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label class="flex items-center gap-2 p-0"
					><Button
						href="/logout"
						variant="ghost"
						class="w-full hover:bg-brownCrayola hover:text-white"><LogOut /> Sair</Button
					></DropdownMenu.Label
				>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</nav>
