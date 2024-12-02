<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import SelectPromo from '$lib/components/SelectPromo.svelte';
	import { Plus } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import DatepickerInicio from '$lib/components/DatePicker-inicio2.svelte';
	import DatepickerFinal from '$lib/components/DatePicker-final2.svelte';

	let selectPromos = [''];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let cookie: Array<any> = [];

	function addCookie() {
		selectPromos = [...selectPromos, ''];
	}

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

<div class="flex h-full w-full gap-32 px-20 py-10">
	<div class="w-1/2">
		<Tabs.Root value="novoProduto">
			<Tabs.List class="flex w-full ">
				<Tabs.Trigger value="novoProduto" class="w-1/2">Novo Produto</Tabs.Trigger>
				<Tabs.Trigger value="promocao" class="w-1/2">Criar Promoção</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="novoProduto" class="h-full">
				<Card.Root>
					<form action="?/criarProduto" method="post" enctype="multipart/form-data">
						<Card.Header>
							<Card.Title>Adicionar novo produto</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="space-y-1">
								<Label for="nomeProduto">Nome do produto</Label>
								<Input
									name="nomeProduto"
									placeholder="Novo sabor"
									autocomplete="off"
									autocapitalize="none"
									autocorrect="off"
								/>
							</div>
							<div class="flex gap-6">
								<div class="w-1/2 space-y-1">
									<Label for="valorProduto">Valor</Label>
									<Input
										name="valorProduto"
										placeholder="0,00"
										autocapitalize="none"
										autocomplete="off"
										autocorrect="off"
									/>
								</div>
								<div class="w-1/2 space-y-1">
									<Label for="estoque">Estoque disponível</Label>
									<Input
										id="estoque"
										name="estoque"
										placeholder="0"
										autocapitalize="none"
										autocomplete="off"
										autocorrect="off"
									/>
								</div>
							</div>
							<div class="space-y-1">
								<Label for="descricao">Descrição</Label>
								<Textarea
									id="descricao"
									name="descricao"
									placeholder="Descrição do produto"
									autocapitalize="none"
									autocomplete="off"
								/>
							</div>
							<div>
								<label for="image" class=" text-sm font-medium">Adicionar Imagem</label>

								<input
									type="file"
									name="arquivo"
									accept=".jpg, .jpeg, .png, .webp"
									class="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 placeholder-gray-400/70 file:rounded-full file:border-none file:bg-gray-200 file:px-4 file:py-1 file:text-sm file:text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
									required
								/>
							</div>
						</Card.Content>
						<Card.Footer>
							<Button
								formaction="?/criarProduto"
								type="submit"
								class="bg-brownCrayola hover:bg-brownNose">Salvar Produto</Button
							>
						</Card.Footer>
					</form>
				</Card.Root>
				<!-- Criar promocão -->
			</Tabs.Content>
			<Tabs.Content value="promocao">
				<Card.Root>
					<form action="?/criarPromocao" method="post" enctype="multipart/form-data">
						<Card.Header>
							<Card.Title>Criar promoção</Card.Title>
						</Card.Header>
						<Card.Content class="space-y-2">
							<div class="w-full space-y-1">
								<Label for="valor">Nome da promoção</Label>
								<Input
									id="nomePromo"
									name="nomePromo"
									placeholder="2 cookies nutella + cookie chocolate"
									autocapitalize="none"
									autocomplete="off"
									autocorrect="off"
								/>
							</div>
							<Label for="current">Selecione o produto desejado</Label>
							<div class="flex h-full w-full justify-start gap-6">
								<div class="flex w-2/3 flex-col gap-2">
									<SelectPromo />
								</div>
								<Button
									class=" w-1/3 gap-2 bg-seashell text-xs text-black hover:bg-seashell"
									onclick={addCookie}
								>
									<Plus class="w-4" />Adicionar Cookie
								</Button>
							</div>
							<div class="flex gap-10">
								<div class="w-1/2 space-y-1">
									<Label for="valor">Valor promocional</Label>
									<Input
										id="valorPromo"
										name="valorPromo"
										placeholder="0,00"
										autocapitalize="none"
										autocomplete="off"
										autocorrect="off"
									/>
								</div>
								<div class="w-1/2 space-y-1">
									<Label for="estoque">Estoque disponível</Label>
									<Input
										id="estoquePromo"
										name="estoquePromo"
										placeholder="0"
										autocapitalize="none"
										autocomplete="off"
										autocorrect="off"
									/>
								</div>
							</div>
							<div class=" flex w-full gap-10">
								<div class="flex w-1/2 flex-col gap-1">
									<Label for="estoque">Data inicial</Label>
									<DatepickerInicio />
								</div>
								<div class="flex w-1/2 flex-col gap-1">
									<Label for="estoque">Data final</Label>
									<DatepickerFinal />
								</div>
							</div>
							<div class="space-y-1">
								<Label for="name">Descrição</Label>
								<Textarea
									id="descricaoPromo"
									name="descricaoPromo"
									placeholder="Descrição do produto"
								/>
							</div>
							<div>
								<label for="image" class=" text-sm font-medium">Adicionar Imagem</label>

								<input
									type="file"
									name="arquivoPromo"
									accept=".jpg, .jpeg, .png, .webp"
									class="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 placeholder-gray-400/70 file:rounded-full file:border-none file:bg-gray-200 file:px-4 file:py-1 file:text-sm file:text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:file:bg-gray-800 dark:file:text-gray-200 dark:focus:border-blue-300"
									required
								/>
							</div>
						</Card.Content>
						<Card.Footer>
							<Button
								formaction="?/criarPromocao"
								type="submit"
								class="bg-brownCrayola hover:bg-brownNose">Salvar promoção</Button
							>
						</Card.Footer>
					</form>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<form class="w-1/2">
		<Table.Root>
			<Table.Caption>Estoque disponível</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Produto</Table.Head>
					<Table.Head>Quantidade</Table.Head>
					<Table.Head>Valor</Table.Head>
				</Table.Row>
			</Table.Header>
			{#each cookie as produto}
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">{produto.nome}</Table.Cell>
						<Table.Cell>{produto.estoque}</Table.Cell>
						<Table.Cell>{produto.valor}</Table.Cell>
					</Table.Row>
				</Table.Body>
			{/each}
		</Table.Root>
	</form>
</div>
