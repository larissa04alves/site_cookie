<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Pencil } from 'lucide-svelte';
	import Combobox from '$lib/components/Combobox.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost"><Pencil /></Button>
	</Sheet.Trigger>
	<Sheet.Content side="right" class="flex flex-col items-start gap-6 bg-seashell">
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
				<p>João Carlos Oliverias Santos Cabral</p>
			</div>
			<div class="flex flex-col items-start justify-start gap-1">
				<Label for="name" class="text-right">Itens do pedido:</Label>
				<p>1x Cookie chocolate</p>
				<p>2x Cookie nutela</p>
				<p>1x Cookie doce de leite</p>
			</div>
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">valor:</Label>
				<p>R$ 28,90</p>
			</div>
			<div class="flex items-center gap-2">
				<Label for="name" class="text-right">Status:</Label>
				<Combobox />
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit" class="bg-brownCrayola hover:bg-brownNose"
					>Salvar</Button
				>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
