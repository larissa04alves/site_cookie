<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Textarea from './ui/textarea/textarea.svelte';
	import { Pencil } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { enhance } from '$app/forms';

	// Definindo interface para o produto
	interface Produto {
		codigo: number;
		nome: string;
		valor: string;
		descricao: string;
		arquivo?: string;
		estoque: number;
	}

	export let produto: Produto;
	export let onUpdate: (updatedProduto: Produto) => void;

	let isSheetOpen = false;
	let nomeProduto = produto.nome || '';
	let valorProduto = produto.valor || '';
	let descricao = produto.descricao || '';
	let arquivoPreview = produto.arquivo || '';
	let novoArquivo: File | null = null;

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			novoArquivo = input.files[0];
			// Criar preview da imagem
			const reader = new FileReader();
			reader.onload = (e) => {
				arquivoPreview = e.target?.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	};
</script>

<Sheet.Root bind:open={isSheetOpen}>
	<Sheet.Trigger
		class="{buttonVariants({
			variant: 'ghost'
		})} border-transparent text-brownCrayola hover:bg-transparent hover:text-brownNose"
	>
		<Pencil size="20" />
	</Sheet.Trigger>
	<Sheet.Content side="right" class="flex flex-col items-start gap-6 bg-seashell">
		<Sheet.Header>
			<Sheet.Title>Editar produto</Sheet.Title>
		</Sheet.Header>
		<form
			method="post"
			action="?/editarProduto"
			enctype="multipart/form-data"
			use:enhance={({ formData }) => {
				return async ({ result }) => {
					if (result.status === 200) {
						toast.success('Produto atualizado!', {
							description: 'As alterações foram salvas com sucesso.'
						});
						
						const updatedProduto = {
							...produto,
							nome: formData.get('nome') as string,
							valor: formData.get('valor') as string,
							descricao: formData.get('descricao') as string,
							arquivo: arquivoPreview || produto.arquivo
						};
						
						onUpdate(updatedProduto);
						isSheetOpen = false;
					} else {
						toast.error('Erro ao salvar alterações!', {
							description: 'Não foi possível salvar as alterações.'
						});
					}
				};
			}}
		>
			<div class="flex w-full flex-col items-start justify-start gap-3">
				<div class="flex w-5/6 flex-col items-start gap-2">
					<Label for="nome">Nome:</Label>
					<Input
						name="nome"
						class="border-brownNose"
						placeholder="Nome do Produto"
						bind:value={nomeProduto}
					/>
				</div>
				<div class="flex w-5/6 flex-col items-start gap-3">
					<Label for="valor">Valor:</Label>
					<Input
						name="valor"
						class="border-brownNose"
						placeholder="Valor do Produto"
						bind:value={valorProduto}
					/>
				</div>
				<div class="flex w-5/6 flex-col items-start gap-3">
					<Label for="descricao">Descrição:</Label>
					<Textarea
						name="descricao"
						class="border-brownNose"
						placeholder="Descrição do Produto"
						bind:value={descricao}
					/>
				</div>
				<div class="w-5/6">
					<Label for="arquivo">Adicionar Imagem</Label>
					<input
						type="file"
						name="arquivo"
						id="arquivo"
						accept=".jpg, .jpeg, .png, .webp"
						on:change={handleFileChange}
						class="mt-2 block w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-600 placeholder-gray-400/70 file:rounded-full file:border-none file:bg-gray-200 file:px-4 file:py-1 file:text-sm file:text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
					/>
					{#if arquivoPreview}
						<img src={arquivoPreview} alt="Preview" class="mt-2 h-32 w-32 object-cover" />
					{/if}
				</div>
			</div>
			<Sheet.Footer>
				<Button
					type="submit"
					class="{buttonVariants({ variant: 'outline' })} bg-brownCrayola hover:bg-brownNose"
				>
					Salvar
				</Button>
			</Sheet.Footer>
			<input type="hidden" name="codigo" value={produto.codigo} />
		</form>
	</Sheet.Content>
</Sheet.Root>
