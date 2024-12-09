<script lang="ts">
	import logo from '$lib/img/logoCookiesMo.png';
	import { Search, ShoppingCart, User, LogOut, Settings } from 'lucide-svelte';
	import { Button } from './ui/button';
	import { Input } from './ui/input';
	import SheetCarrinho from './SheetCarrinho.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';

	export let user: { admin: boolean } | null = null;

	interface Produto {
		codigo: number;
		nome: string;
		valor: number;
		arquivo: string;
	}

	let scrollY = 0;
	let searchTerm = '';
	let searchResults: Produto[] = [];
	let showResults = false;
	let quantidadeItens = 0;

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

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	onMount(() => {
		// Função para atualizar quantidade
		const atualizarQuantidade = () => {
			const listItens = sessionStorage.getItem('listItens');
			if (listItens) {
				const itens = JSON.parse(listItens);
				quantidadeItens = itens.length;
			} else {
				quantidadeItens = 0;
			}
		};

		// Atualiza inicialmente
		atualizarQuantidade();

		// Adiciona listener para mudanças no sessionStorage
		window.addEventListener('storage', atualizarQuantidade);

		// Observa mudanças no sessionStorage a cada 500ms
		const interval = setInterval(atualizarQuantidade, 500);

		return () => {
			window.removeEventListener('storage', atualizarQuantidade);
			clearInterval(interval);
		};
	});
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
		<div class="search-container relative w-full max-w-[14rem]">
			<span class="absolute inset-y-0 left-0 flex items-center pl-3">
				<Search class="h-4 w-4 text-brownCrayola" />
			</span>
			<Input
				type="search"
				placeholder="Pesquisar"
				bind:value={searchTerm}
				oninput={handleSearch}
				class="max-w-lg rounded-2xl border-none bg-ghostWhite pl-10 placeholder:text-xs placeholder:text-brownNose"
			/>

			{#if showResults && searchResults.length > 0}
				<div
					class="absolute mt-1 w-full rounded-md bg-white p-2 shadow-lg"
					style="max-height: 300px; overflow-y: auto;"
				>
					{#each searchResults as produto}
						<a
							href={`#produto-${produto.codigo}`}
							class="block rounded-lg p-2 hover:bg-ghostWhite"
							on:click={() => (showResults = false)}
						>
							<div class="flex items-center gap-2">
								<img
									src={produto.arquivo}
									alt={produto.nome}
									class="h-10 w-10 rounded-md object-cover"
								/>
								<div>
									<p class="text-sm font-medium text-brownNose">{produto.nome}</p>
									<p class="text-xs text-brownCrayola">R$ {produto.valor}</p>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>

		<div class="relative">
			<SheetCarrinho />
			{#if quantidadeItens > 0}
				<div
					class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
				>
					{quantidadeItens}
				</div>
			{/if}
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="{buttonVariants({
					variant: 'ghost',
					size: 'icon'
				})} flex h-10 w-10 items-center justify-center rounded-full  bg-ghostWhite p-0"
			>
				<User class="h-4 w-4 text-brownNose" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-48">
				{#if !user}
					<DropdownMenu.Item>
						<Button href="/login" variant="ghost" class="w-full justify-start">Fazer Login</Button>
					</DropdownMenu.Item>
				{:else}
					{#if user.admin}
						<DropdownMenu.Item>
							<Button href="/admin/produtos" variant="ghost" class="w-full justify-start gap-2">
								<Settings class="h-4 w-4" />
								Admin
							</Button>
						</DropdownMenu.Item>
					{/if}
					<DropdownMenu.Item>
						<Button href="/logout" variant="ghost" class="w-full justify-start gap-2">
							<LogOut class="h-4 w-4" />
							Sair
						</Button>
					</DropdownMenu.Item>
				{/if}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>

<style>
	.search-container {
		z-index: 1000;
	}
</style>
