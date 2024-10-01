<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { onMount } from 'svelte';

	let cookie: Array<any> = [];

	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			if (res.ok) {
				cookie = await res.json();
			} else {
				console.error('Erro ao carregar os produtos');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="Selecione o cookie" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Sabores</Select.Label>
			{#each cookie as produto}
				<Select.Item value={produto.nome} label={produto.nome}>{produto.nome}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="nomePromo" />
</Select.Root>
