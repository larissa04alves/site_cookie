<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { ArrowRight, ShoppingCart, Truck } from 'lucide-svelte';
	import cookieBranco from '$lib/img/cookiebranco.png';
	import { Separator } from './ui/separator';
	import { Input } from '$lib/components/ui/input/index.js';
	import Button from './ui/button/button.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger
		class="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-ghostWhite"
	>
		<ShoppingCart class="w-4 text-brownNose" />
	</Sheet.Trigger>
	<Sheet.Content class="flex w-1/4 flex-col justify-between bg-ghostWhite" side="right">
		<div class="w-full">
			<Sheet.Title class="flex gap-2 text-sm text-brownNose"
				><ShoppingCart size={20} /> Seu carrinho</Sheet.Title
			>
			<div class="flex items-center gap-2 pt-10">
				<img class="w-1/4 rounded-md" src={cookieBranco} alt="produto" />
				<div class="w-full text-xs text-brownNose">
					<div class="flex gap-5">
						<h1 class="font-semibold">Cookie Chocolate Branco</h1>
						<p class="flex text-sm">R$ 10.90</p>
					</div>
					counter 1
				</div>
			</div>
			<Separator class="my-5" />
			<div class="flex justify-between text-sm">
				<h1 class="font-semibold">Subtotal</h1>
				<p class="pr-5">R$ 10.90</p>
			</div>
		</div>

		<Sheet.Footer class="flex !flex-col  items-center justify-center gap-5">
			<div class="flex items-center gap-2">
				<h1 class="flex items-center gap-1 text-xs text-brownNose"><Truck />Calcular frete</h1>
				<div class="flex">
					<Input
						class=" border-brownNose focus-visible:ring-brownNose"
						placeholder="Digite seu CEP"
					/>
					<Button variant="ghost" class="flex hover:bg-transparent hover:text-brownCrayola">
						<ArrowRight class="text-brownNose" />
					</Button>
				</div>
			</div>
			<div class="flex items-center justify-start">
				<Sheet.Close class="{buttonVariants({ variant: 'link' })} text-xs">
					Continuar comprando
				</Sheet.Close>
				<Button
					variant="ghost"
					href="/ckeckout"
					class="font-montserrat flex bg-brownCrayola text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
				>
					Finalizar compra
				</Button>
			</div>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
