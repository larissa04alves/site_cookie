<script lang="ts">
	import logo from '$lib/img/logoCookiesMo.png';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import RadioPix from '$lib/components/RadioPix.svelte';
	import RadioFrete from '$lib/components/RadioFrete.svelte';
	import { ArrowLeft } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type Item = {
		id: string;
		nome: string;
		valor: string;
		quantidade: number;
	};

	let itens: Array<Item> = [];
	let showQRCode = false;

	const carregarItens = () => {
		const storedItems = sessionStorage.getItem('listItens');
		try {
			itens = storedItems ? JSON.parse(storedItems) : [];
			if (!Array.isArray(itens)) {
				itens = [];
			}
		} catch (error) {
			console.error('Erro ao carregar itens:', error);
			itens = [];
		}
	};

	const formatarMoeda = (valor: number | string) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(typeof valor === 'string' ? parseFloat(valor) : valor);
	};

	onMount(() => {
		carregarItens();
	});

	const handlePagarAgora = () => {
		showQRCode = true;
	};
</script>

<div class="flex h-full w-full flex-col bg-seashell font-montserrat">
	<div class="flex h-full w-[53%] items-center justify-between">
		<Button href="/" variant="link" class="pl-10 text-xs"><ArrowLeft /> Voltar para a Loja</Button>
		<img class="flex w-24 p-2" src={logo} alt="" />
	</div>
	<Separator class="bg-brownNose" />
	<div class="flex h-full w-full">
		<div class="flex h-full w-1/2 flex-col gap-5 px-24 py-5">
			<div class="flex justify-between">
				<h1 class="font-montserrat text-xl font-semibold text-brownNose">Endereço</h1>
				<Button variant="link">Fazer Login</Button>
			</div>

			<div class="flex w-full flex-col gap-10">
				<div class="flex w-full gap-5">
					<div class="relative w-1/2">
						<Input
							id="name"
							name="name"
							type="text"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="name"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Nome
						</Label>
					</div>
					<div class="relative w-1/2">
						<Input
							id="lastname"
							name="lastname"
							type="text"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="name"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Sobrenome
						</Label>
					</div>
				</div>

				<div class="relative w-full">
					<Input
						id="cep"
						name="cep"
						type="text"
						class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
					/>
					<Label
						for="cep"
						class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
					>
						CEP
					</Label>
				</div>

				<div class="flex w-full gap-5">
					<div class="relative w-1/2">
						<Input
							id="adress"
							name="adress"
							type="text"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="adress"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Endereço
						</Label>
					</div>

					<div class="relative w-1/2">
						<Input
							id="number"
							name="number"
							type="number"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="number"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Número
						</Label>
					</div>
				</div>

				<div class="flex w-full gap-5">
					<div class="relative w-1/2">
						<Input
							id="bairro"
							name="bairro"
							type="text"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="number"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Bairro
						</Label>
					</div>
					<div class="relative w-1/2">
						<Input
							id="city"
							name="city"
							type="text"
							class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
						/>
						<Label
							for="city"
							class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
						>
							Cidade
						</Label>
					</div>
				</div>
				<div class="relative w-full">
					<Input
						id="phone"
						name="phone"
						type="tel"
						class="peer border-b border-brownCrayola bg-inherit py-1 transition-colors focus:border-b-0  focus:outline-none"
					/>
					<Label
						for="phone"
						class="absolute -top-5 left-1 cursor-text pt-1 text-xs transition-all peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm peer-focus:-top-7 peer-focus:text-xs peer-focus:text-brownNose"
					>
						Telefone
					</Label>
				</div>
			</div>
			<div class="flex flex-col gap-2 py-2">
				<h1 class="font-montserrat text-xl font-semibold text-brownNose">Forma de frete</h1>
				<RadioFrete />
			</div>
			<div class="flex h-full w-full flex-col gap-5 py-5">
				<h1 class="font-montserrat text-xl font-semibold text-brownNose">Pagamento</h1>
				<RadioPix {showQRCode} />
				<Button
					onclick={handlePagarAgora}
					class="my-5 bg-brownNose font-montserrat hover:bg-brownCrayola"
				>
					Pagar agora
				</Button>
			</div>
		</div>
		<!-- parte 2 -->
		<div class="h-min-[100%] flex w-1/2 flex-col bg-ghostWhite px-24">
			<div class="mt-10 flex flex-col gap-2">
				{#if itens.length > 0}
					{#each itens as item}
						<!-- <img class="w-[12%] rounded-md" src={cookie} alt="produto" /> -->
						<div class="flex w-[56%] justify-between text-xs">
							<h1 class="font-semibold">{item.quantidade} x {item.nome}</h1>
							<p class="flex text-sm font-semibold">
								{formatarMoeda(item.valor)}{item.quantidade > 1
									? ' = ' + formatarMoeda(parseFloat(item.valor) * item.quantidade)
									: ''}
							</p>
						</div>

						<Separator class="my-2  w-[56%]" />
					{/each}
				{:else}
					<p class="text-center text-lg text-gray-500">Seu carrinho está vazio.</p>
				{/if}
			</div>

			<div class="flex w-[56%] gap-2 py-2">
				<Input
					id="cupom"
					name="cupom"
					type="text"
					placeholder="Insira o cupom"
					class="border-brownNose"
				></Input>
				<Button
					variant="ghost"
					class="bg-brownNose text-white hover:bg-brownCrayola hover:text-white">Aplicar</Button
				>
			</div>

			<div class="flex flex-col gap-2">
				<div class="flex w-[56%] justify-between text-xs">
					<h1>Subtotal</h1>
					<Label
						>{formatarMoeda(
							itens
								.reduce((total, item) => total + parseFloat(item.valor) * item.quantidade, 0)
								.toFixed(2)
						)}</Label
					>
				</div>
				<div class="flex w-[56%] justify-between text-xs">
					<h1>Frete</h1>
					<Label>10.00</Label>
				</div>
				<div class="flex w-[56%] justify-between text-xs">
					<h1>Total</h1>
					<Label
						>{formatarMoeda(
							(
								itens.reduce((total, item) => total + parseFloat(item.valor) * item.quantidade, 0) +
								10
							).toFixed(2)
						)}</Label
					>
				</div>
			</div>
		</div>
	</div>
</div>
