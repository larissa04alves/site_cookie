<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Pencil } from 'lucide-svelte';
	import { Input } from './ui/input';
	import Textarea from './ui/textarea/textarea.svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		produto: any;
	}

	let { produto }: Props = $props();

	let nomeProduto = $state(produto.nome);
	let valorProduto = $state(produto.valor);
	let descricao = $state(produto.descricao);
	let arquivo = $state(produto.arquivo);
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button class="text-brownCrayola hover:bg-transparent hover:text-brownNose" variant="ghost"
			><Pencil size="20" /></Button
		>
	</Sheet.Trigger>
	<Sheet.Content side="right" class="flex flex-col items-start gap-6 bg-seashell">
		<Sheet.Header>
			<Sheet.Title>Editar produto</Sheet.Title>
		</Sheet.Header>
		<form action="?/editarProduto" method="post" enctype="multipart/form-data">
			<div class="flex w-full flex-col items-start justify-start gap-3">
				<input type="number" name="codigo" value={produto.codigo} class="hidden" />
				<div class="flex w-5/6 flex-col items-start gap-2">
					<Label for="name" class="text-right">Nome:</Label>
					<Input
						id="nomeProduto"
						name="nomeProduto"
						autocapitalize="none"
						autocomplete="off"
						autocorrect="off"
						class="border-brownNose"
						bind:value={nomeProduto}
					/>
				</div>
				<div class="flex w-5/6 flex-col items-start justify-start gap-3">
					<Label for="name" class="text-right">Valor</Label>
					<Input
						id="valorProduto"
						name="valorProduto"
						autocapitalize="none"
						autocomplete="off"
						autocorrect="off"
						class="border-brownNose"
						bind:value={valorProduto}
					/>
				</div>
				<div class="flex w-5/6 flex-col items-start justify-start gap-3">
					<Label for="name" class="text-right">Descrição</Label>
					<Textarea name="descricao" class="border-brownNose" bind:value={descricao} />
				</div>
				<div class="w-5/6">
					<label for="image" class=" text-sm font-medium">Adicionar Imagem</label>

					<input
						type="file"
						name="arquivo"
						accept=".jpg, .jpeg, .png, .webp"
						class="mt-2 block w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-600 placeholder-gray-400/70 file:rounded-full file:border-none file:bg-gray-200 file:px-4 file:py-1 file:text-sm file:text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
						bind:value={arquivo}
					/>
				</div>
				<Sheet.Footer>
					<Sheet.Close>
						<Button type="submit" class="bg-brownCrayola hover:bg-brownNose">Salvar</Button>
					</Sheet.Close>
				</Sheet.Footer>
			</div>
		</form>
	</Sheet.Content>
</Sheet.Root>
