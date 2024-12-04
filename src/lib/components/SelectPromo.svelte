<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	let cookies = writable<Array<any>>([]);
	let value = writable('');
	let triggerContent = writable('Selecione o produto');

	// Fetch cookies on mount
	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			if (res.ok) {
				const data = await res.json();
				cookies.set(data);
			} else {
				console.error('Erro ao carregar os produtos');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});

	// Update the trigger content when the value changes
	value.subscribe((val) => {
		cookies.subscribe((cookieList) => {
			const selected = cookieList.find((f) => f.nome === val);
			triggerContent.set(selected?.nome ?? 'Selecione o produto');
		});
	});
</script>

<Select.Root bind:value={$value} type="single" name="cookieEscolhido">
	<Select.Trigger class="w-[180px]">
		<span>{$triggerContent}</span>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each $cookies as produto}
				<Select.Item value={produto.nome} label={produto.nome}>
					{produto.nome}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
