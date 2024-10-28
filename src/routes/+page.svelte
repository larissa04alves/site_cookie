<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import hero from '$lib/img/hero.png';
	import { ArrowRight } from 'lucide-svelte';
</script>

<div
	class="bg- flex h-[84vh] w-full flex-col justify-center bg-cover bg-center"
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
