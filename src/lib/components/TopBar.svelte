<script lang="ts">
	import { Input } from './ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Button from './ui/button/button.svelte';
	import { LogOut, Search } from 'lucide-svelte';
	import cookieUser from '$lib/img/cookieUser.png';
	import { onMount } from 'svelte';

	interface Produto {
		codigo: number;
		nome: string;
		valor: number;
		arquivo: string;
		estoque: number;
	}

	let searchTerm = '';
	let searchResults: Produto[] = [];
	let showResults = false;

	async function handleSearch() {
		if (searchTerm.length < 2) {
			searchResults = [];
			showResults = false;
			return;
		}

		try {
			const response = await fetch(`/api/buscarProdutos?q=${encodeURIComponent(searchTerm)}`);
			if (response.ok) {
				searchResults = await response.json();
				showResults = true;
			}
		} catch (error) {
			console.error('Erro na busca:', error);
			searchResults = [];
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const searchContainer = document.querySelector('.search-container');
		const target = event.target as Node;
		if (searchContainer && !searchContainer.contains(target)) {
			showResults = false;
		}
	}

	async function scrollToProduto(codigo: number) {
		showResults = false;
		// Pequeno delay para garantir que os produtos foram renderizados
		setTimeout(() => {
			const element = document.getElementById(`produto-admin-${codigo}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' });
				element.classList.add('scale-105', 'shadow-2xl', 'border-2', 'border-brownCrayola');
				setTimeout(() => {
					element.classList.remove('scale-105', 'shadow-2xl', 'border-2', 'border-brownCrayola');
				}, 2000);
			}
		}, 100);
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<nav
	class="fixed z-10 flex h-16 w-full items-center justify-between border-b-[1.5px] bg-seashell px-20"
>
	<h1 class="font-semibold">Produtos</h1>

	<div class="search-container relative w-full max-w-lg">
		<span class="absolute inset-y-0 left-0 flex items-center pl-3">
			<Search class="h-5 w-5 text-gray-500" />
		</span>
		<Input
			type="search"
			placeholder="Pesquisar"
			bind:value={searchTerm}
			oninput={handleSearch}
			class="max-w-lg border-black pl-10"
		/>

		{#if showResults && searchResults.length > 0}
			<div
				class="absolute mt-1 w-full rounded-md bg-white p-2 shadow-lg"
				style="max-height: 300px; overflow-y: auto;"
			>
				{#each searchResults as produto}
					<button
						class="block w-full rounded-lg p-2 text-left hover:bg-ghostWhite"
						on:click={() => scrollToProduto(produto.codigo)}
					>
						<div class="flex items-center gap-2">
							<img
								src={produto.arquivo}
								alt={produto.nome}
								class="h-10 w-10 rounded-md object-cover"
							/>
							<div class="flex-1">
								<p class="text-sm font-medium text-brownNose">{produto.nome}</p>
								<div class="flex justify-between">
									<p class="text-xs text-brownCrayola">R$ {produto.valor}</p>
									<p class="text-xs text-gray-500">Estoque: {produto.estoque}</p>
								</div>
							</div>
						</div>
					</button>
				{/each}
			</div>
		{/if}
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
