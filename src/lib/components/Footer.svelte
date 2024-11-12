<script>
	import logoMo from '$lib/img/logoCookiesMo.png';
	import { Instagram } from 'lucide-svelte';
	import whatsapp from '$lib/img/whatsapp.svg';
	import Button from './ui/button/button.svelte';
</script>

<div class="bg-brownNose flex h-1/2 w-full items-start justify-evenly py-5">
	<div class="flex flex-col justify-center gap-2">
		<img class="w-24" src={logoMo} alt="" />
		<div class="flex flex-col gap-1">
			<p class="text-seashell text-xs font-semibold">Pronta entrega e encomendas</p>
			<p class="text-seashell text-xs font-semibold">Lajeado - RS</p>
			<p class="text-seashell text-xs font-semibold">(51) 99999-9999</p>
		</div>
	</div>
	<div class="flex flex-col justify-center gap-2">
		<p class="text-seashell pb-1 text-sm font-bold">MENU</p>
		<a class="text-seashell text-xs hover:font-bold" href="/">Home</a>
		<a class="text-seashell text-xs hover:font-bold" href="/">Produtos</a>
		<a class="text-seashell text-xs hover:font-bold" href="/">Best Sellers</a>
		<a class="text-seashell text-xs hover:font-bold" href="/">Sobre nós</a>
	</div>
	<div class="flex flex-col justify-center">
		<p class="text-seashell flex justify-center pb-1 text-sm font-bold">REDES SOCIAIS</p>
		<div>
			<Button class="text-seashell p-0 hover:bg-transparent hover:text-white" variant="ghost"
				><Instagram /></Button
			>
			<Button class="hover:bg-transparent" variant="ghost"><img src={whatsapp} alt="" /></Button>
		</div>
	</div>
</div>
