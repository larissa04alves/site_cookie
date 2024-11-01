<script lang="ts">
	import CardsProdutos from '$lib/components/CardsProdutos.svelte';
	import { Button } from '$lib/components/ui/button';
	import hero from '$lib/img/hero.png';
	import { ArrowRight } from 'lucide-svelte';
	import cookiePage from '$lib/img/cookiePage.png';
</script>

<div class="flex h-full w-full flex-col">
	<div
		class="bg- flex h-[89vh] w-full flex-col justify-center bg-cover bg-center"
		style="background-image:url({hero});"
	>
		<div class="flex flex-col gap-6 pl-20">
			<h1 class="font-cormorant text-7xl font-bold text-brownNose">
				Cookies artesanais, <br /> feitos para adoçar <br /> cada momento especial
			</h1>
			<p class="font-montserrat text-brownCrayola">
				Em nossa loja, cada cookie é um momento de puro sabor, feito com <br /> ingredientes especiais
				e um toque de carinho
			</p>
			<div>
				<Button
					variant="ghost"
					class="flex gap-2 rounded-3xl bg-brownCrayola py-5 font-montserrat text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
					>COMPRE AGORA <ArrowRight size={15} strokeWidth={3} /></Button
				>
			</div>
			<div class="flex gap-5 pt-10 font-montserrat">
				<div class="flex flex-col items-center justify-center text-brownCrayola">
					<h1 class="text-2xl font-bold">100%</h1>
					<p class="text-xs">Ingredientes naturais</p>
				</div>
				<div class="flex flex-col items-center justify-center text-brownCrayola">
					<h1 class="text-2xl font-bold">600+</h1>
					<p class="text-xs">Cookies vendidos</p>
				</div>
				<div>
					<div class="flex flex-col items-center justify-center text-brownCrayola">
						<h1 class="text-2xl font-bold">100+</h1>
						<p class="text-xs">Clientes satisfeitos</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex h-full w-full flex-col items-center justify-center gap-6 py-12">
		<div class="flex w-full items-center justify-around px-14">
			<h1 class="font-cormorant text-3xl font-bold text-brownNose">• Nossos Cookies •</h1>
			<div class="flex gap-2">
				<Button
					variant="ghost"
					class="flex w-1/3 rounded-3xl border border-brownNose py-2 font-montserrat text-[0.65rem] font-semibold text-brownNose hover:bg-brownNose hover:text-white"
					>Mais recentes</Button
				>
				<Button
					variant="ghost"
					class="flex w-1/3 rounded-3xl border border-brownNose py-2 font-montserrat text-[0.65rem] font-semibold text-brownNose hover:bg-brownNose hover:text-white"
					>Populares</Button
				>
				<Button
					variant="ghost"
					class="flex w-1/3 rounded-3xl border border-brownNose py-2 font-montserrat text-[0.65rem] font-semibold text-brownNose hover:bg-brownNose hover:text-white"
					>Promoções</Button
				>
			</div>
		</div>
		<div class="flex">
			<CardsProdutos />
		</div>
	</div>

	<div class="relative flex h-2/3 w-full justify-center gap-10 bg-seashell">
		<img class="relative z-10 -mb-10 -mt-10 w-96" src={cookiePage} alt="" />
		<div class="flex flex-col justify-center">
			<h1 class="font-cormorant text-4xl font-bold text-brownNose">VAI UM COOKIE AÍ?</h1>
			<p class="font-montserrat text-sm text-brownNose">
				Delicie-se com nossos cookies artesanais, feitos para tornar seu dia especial. <br /> Peça e
				receba em casa o sabor que você merece!
			</p>
		</div>
	</div>
</div>
