<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { onMount } from 'svelte';

	let cookies = $state([]);
	let selectedCookie = $state('');

	onMount(async () => {
		try {
			const res = await fetch('/api/listarProdutos');
			if (res.ok) {
				cookies = await res.json();
			} else {
				console.error('Erro ao carregar os produtos');
			}
		} catch (error) {
			console.error('Erro de rede:', error);
		}
	});

	const triggerContent = $derived(
		cookies.find((c) => c.nome === selectedCookie)?.nome ?? 'Selecione o cookie'
	);
</script>

{#await cookies}
	<p>Carregando...</p>
{:then loadedCookies}
	<Select.Root type="single" name="nomeCookie" bind:value={selectedCookie}>
		<Select.Trigger class="w-full">
			{triggerContent}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.GroupHeading>Sabores</Select.GroupHeading>
				{#each loadedCookies as produto}
					<Select.Item value={produto.nome} label={produto.nome} />
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{:catch error}
	<p>Erro ao carregar os produtos: {error.message}</p>
{/await}
