<script lang="ts">
	import CardsProdutos from '$lib/components/CardsProdutos.svelte';
	import { Button } from '$lib/components/ui/button';
	import hero from '$lib/img/hero.png';
	import { ArrowRight, ChevronRight } from 'lucide-svelte';
	import cookiePage from '$lib/img/cookiePage.png';
	import cookieIcon from '$lib/img/cookieIcon.png';
	import motoboyIcon from '$lib/img/motoboyIcon.png';
	import happyIcon from '$lib/img/happyIcon.png';
	import avatar from '$lib/img/avatarSobre.jpeg';
</script>

<div class="flex h-full w-full flex-col pt-20">
	<div
		class="flex h-[89vh] w-full flex-col justify-center bg-cover bg-center"
		style="background-image:url({hero});"
	>
		<div class="flex flex-col gap-6 pl-32">
			<h1 class="font-cormorant text-brownNose text-7xl font-bold">
				Cookies artesanais, <br /> feitos para adoçar <br /> cada momento especial
			</h1>
			<p class="font-montserrat text-brownCrayola">
				Em nossa loja, cada cookie é um momento de puro sabor, feito com <br /> ingredientes especiais
				e um toque de carinho
			</p>
			<div>
				<Button
					variant="ghost"
					href="#produtos"
					class="bg-brownCrayola font-montserrat hover:bg-brownNose flex w-[12%] gap-2 rounded-3xl py-5 text-xs font-semibold text-white hover:text-white"
					>COMPRE AGORA <ArrowRight size={15} strokeWidth={3} /></Button
				>
			</div>
			<div class="font-montserrat flex gap-5 pt-10">
				<div class="text-brownCrayola flex flex-col items-center justify-center">
					<h1 class="text-2xl font-bold">100%</h1>
					<p class="text-xs">Ingredientes naturais</p>
				</div>
				<div class="text-brownCrayola flex flex-col items-center justify-center">
					<h1 class="text-2xl font-bold">600+</h1>
					<p class="text-xs">Cookies vendidos</p>
				</div>
				<div>
					<div class="text-brownCrayola flex flex-col items-center justify-center">
						<h1 class="text-2xl font-bold">100+</h1>
						<p class="text-xs">Clientes satisfeitos</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		id="produtos"
		class="mb-10 flex h-full w-full flex-col items-center justify-center gap-6 py-12"
	>
		<div class="flex w-full items-center justify-evenly px-32">
			<h1 class="font-cormorant text-brownNose w-full text-4xl font-bold">• Nossos Cookies •</h1>
			<div class="flex gap-2">
				<Button
					variant="ghost"
					class="border-brownNose font-montserrat text-brownNose hover:bg-brownNose flex w-1/3 rounded-3xl border py-2 text-[0.65rem] font-semibold hover:text-white"
					>Mais recentes</Button
				>
				<Button
					variant="ghost"
					class="border-brownNose font-montserrat text-brownNose hover:bg-brownNose flex w-1/3 rounded-3xl border py-2 text-[0.65rem] font-semibold hover:text-white"
					>Populares</Button
				>
				<Button
					variant="ghost"
					class="border-brownNose font-montserrat text-brownNose hover:bg-brownNose flex w-1/3 rounded-3xl border py-2 text-[0.65rem] font-semibold hover:text-white"
					>Promoções</Button
				>
			</div>
		</div>
		<div class="flex">
			<CardsProdutos />
		</div>
	</div>

	<div class="bg-seashell relative flex h-2/3 w-full justify-center gap-20">
		<img class="relative z-10 -mb-10 -mt-10 w-[30rem]" src={cookiePage} alt="" />
		<div class="flex flex-col justify-center gap-5">
			<div>
				<h1 class="font-cormorant text-brownNose text-4xl font-bold">VAI UM COOKIE AÍ?</h1>
				<p class="font-montserrat text-brownNose text-sm">
					Delicie-se com nossos cookies artesanais, feitos para tornar seu dia especial. <br /> Peça
					e receba em casa o sabor que você merece!
				</p>
			</div>

			<div class="flex items-center gap-8">
				<div class="flex flex-col items-center justify-center">
					<img class="w-16" src={cookieIcon} alt="" />
					<p class="text-brownNose text-start text-sm font-semibold">Escolha Seus <br />cookies</p>
				</div>
				<ChevronRight class="text-brownNose" />
				<div class="flex flex-col items-center justify-center">
					<img class="w-16" src={motoboyIcon} alt="" />
					<p class="text-brownNose text-start text-sm font-semibold">Faça seu <br />pedido</p>
				</div>
				<ChevronRight class="text-brownNose" />
				<div class="flex flex-col items-center justify-center">
					<img class="w-[3rem]" src={happyIcon} alt="" />
					<p class="text-brownNose text-start text-sm font-semibold">Receba & <br />Delicie-se!</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex items-start justify-center gap-20 pt-20">
		<div
			class="relative w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
		>
			<img class="h-1/4 w-full object-cover" src={avatar} alt="avatar" />

			<div
				class="absolute left-0 right-0 top-3/4 flex h-1/4 flex-col justify-end bg-gradient-to-t from-[#753f21]/70 to-transparent p-4 backdrop-blur-[0.05rem]"
			>
				<h2 class="text-xl font-bold text-white">Monique Oliveira</h2>
			</div>
		</div>
		<div id="sobrenos" class="flex w-1/3 flex-col gap-8">
			<div class="text-brownNose flex flex-col gap-5 text-sm font-bold">
				<p>Cookie da Mo</p>
				<h1 class="font-cormorant text-brownNose text-5xl font-bold">QUEM SOMOS</h1>
			</div>
			<div class="flex flex-col gap-5">
				<p class="text-brownNose font-medium">
					Nossa jornada começou com uma profissional de TI que, além da paixão pela tecnologia,
					encontrou nos cookies uma forma de espalhar carinho. Ao preparar receitas para a família,
					descobriu que fazer cookies podia ser mais que um hobby — uma atividade cheia de
					significado.
				</p>
				<p class="text-brownNose font-medium">
					Assim, nasceu nosso propósito: levar até você cookies artesanais feitos com cuidado, desde
					a escolha dos ingredientes até a entrega, para que cada mordida seja uma experiência
					especial.
				</p>
			</div>
		</div>
	</div>

	<div id="bestsellers" class="flex h-full w-full flex-col items-center justify-center pt-20">
		<h1 class="font-cormorant text-brownNose text-4xl font-bold">• Mais Vendidos •</h1>
		<h1>AQUI ERA CARD HOVER DIRECIONAL</h1>
	</div>

	<!-- <div id="avaliacoes" class="flex flex-col items-center justify-center pt-10">
		<h1 class="font-cormorant text-4xl font-bold text-brownNose">• Avaliações •</h1>
	</div> -->
</div>
