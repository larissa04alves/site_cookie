<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { ShoppingCart } from 'lucide-svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import Button from './ui/button/button.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button
			variant="ghost"
			class="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
		>
			<ShoppingCart />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="right" class="z-50 flex flex-col items-start gap-6 bg-seashell">
		<Sheet.Header>
			<Sheet.Title>Editar pedido</Sheet.Title>
		</Sheet.Header>
		<div class="flex flex-col items-start justify-start gap-3">
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">Número do pedido:</Label>
				<p>3066</p>
			</div>
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">Data:</Label>
				<p>20/10/2024</p>
			</div>
			<div class="flex flex-col items-start justify-start gap-1">
				<Label for="name" class="text-right">Nome do Cliente:</Label>
				<p>João Carlos Oliveira Santos Cabral</p>
			</div>
			<div class="flex flex-col items-start justify-start gap-1">
				<Label for="name" class="text-right">Itens do pedido:</Label>
				<p>1x Cookie chocolate</p>
				<p>2x Cookie Nutella</p>
				<p>1x Cookie doce de leite</p>
			</div>
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">Valor:</Label>
				<p>R$ 28,90</p>
			</div>
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">Status:</Label>
				<Combobox />
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close>
				<div
					class="inline-flex items-center justify-center gap-2 rounded-md bg-brownCrayola text-white shadow hover:bg-brownNose focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					Salvar
				</div>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
