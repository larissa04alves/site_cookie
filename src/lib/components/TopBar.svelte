<script>
	import { Input } from './ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from './ui/button/button.svelte';
	import { LogOut, Search, UserCircle } from 'lucide-svelte';
	import Separator from './ui/separator/separator.svelte';
</script>

<nav class="bg-seashell flex h-20 w-full items-center justify-between border-b-[1.5px] px-16">
	<h1 class="font-semibold">Nome sessão</h1>

	<div class="relative w-full max-w-lg">
		<span class="absolute inset-y-0 left-0 flex items-center pl-3">
			<Search class="h-5 w-5 text-gray-500" />
		</span>
		<Input type="search" placeholder="Pesquisar" class="max-w-lg border-black pl-10" />
	</div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="flex gap-2 font-semibold"
			><UserCircle /> Admin</DropdownMenu.Trigger
		>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label class="flex items-center gap-2 p-0"
					><Button variant="ghost" class="hover:bg-brownCrayola w-full hover:text-white"
						><LogOut /> Sair</Button
					></DropdownMenu.Label
				>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</nav>
