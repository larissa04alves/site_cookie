<script lang="ts">
	import type { PageData } from './$types';
	import * as Table from '$lib/components/ui/table';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import SelectPromo from '$lib/components/SelectPromo.svelte';
	import { Plus } from 'lucide-svelte';

	let selectPromos = [''];

	function addCookie() {
		selectPromos = [...selectPromos, ''];
	}
</script>

<div class="flex h-full w-full gap-32 px-20 py-32">
	<div class="w-1/2">
		<Tabs.Root value="novoProduto">
			<Tabs.List class="flex w-full ">
				<Tabs.Trigger value="novoProduto" class="w-1/2">Novo Produto</Tabs.Trigger>
				<Tabs.Trigger value="promocao" class="w-1/2">Criar Promoção</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="novoProduto" class="h-screen">
				<Card.Root>
					<form action="?/criarProduto" method="post">
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
									<Label for="estoque">Estoque</Label>
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
									autocorrect="off"
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
			</Tabs.Content>
			<Tabs.Content value="promocao">
				<Card.Root>
					<Card.Header>
						<Card.Title>Criar promoção</Card.Title>
					</Card.Header>
					<Card.Content class="space-y-2">
						<Label for="current">Selecione o produto desejado</Label>
						<div class="flex h-full w-full justify-start gap-6">
							<div class="flex w-2/3 flex-col gap-2">
								{#each selectPromos as _, index}
									<SelectPromo />
								{/each}
							</div>
							<Button
								class=" w-1/3 gap-2 bg-seashell text-xs text-black hover:bg-seashell"
								on:click={addCookie}
							>
								<Plus class="w-4" />Adicionar Cookie
							</Button>
						</div>
						<div class="flex gap-8">
							<div class="w-1/2 space-y-1">
								<Label for="username">Valor promocional</Label>
								<Input id="username" placeholder="0,00" />
							</div>
							<div class="w-1/2 space-y-1">
								<Label for="username">Quantidade</Label>
								<Input id="username" placeholder="0" />
							</div>
						</div>
						<div class="space-y-1">
							<Label for="name">Descrição</Label>
							<Textarea id="name" placeholder="Descrição do produto" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button class="bg-brownCrayola hover:bg-brownNose">Salvar promoção</Button>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<div class="w-1/2">
		<Table.Root>
			<Table.Caption>Estoque disponível</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Produto</Table.Head>
					<Table.Head>Quantidade</Table.Head>
					<Table.Head>Valor</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="font-medium">Cookie de chocolate</Table.Cell>
					<Table.Cell>15 und</Table.Cell>
					<Table.Cell>R$ 8.90</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>
</div>
