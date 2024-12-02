<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { onMount } from 'svelte';

	// const fruits = [
	// 	{ value: 'apple', label: 'Apple' },
	// 	{ value: 'banana', label: 'Banana' },
	// 	{ value: 'blueberry', label: 'Blueberry' },
	// 	{ value: 'grapes', label: 'Grapes' },
	// 	{ value: 'pineapple', label: 'Pineapple' }
	// ];

	//

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

	let value = $state('');

	const triggerContent = $derived(
		cookie.find((f) => f.value === value)?.label ?? 'Selecione o produto'
	);
</script>

<Select.Root type="single" name="cookieEscolhido" bind:value>
	<Select.Trigger class="w-[180px]">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each cookie as produto}
				<Select.Item value={produto.nome} label={produto.nome}>{produto.nome}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
