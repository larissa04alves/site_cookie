<script>
	import logoMo from '$lib/img/logoCookiesMo.png';
	import { Instagram } from 'lucide-svelte';
	import { Button } from './ui/button';
	import whatsapp from '$lib/img/whatsapp.svg';
</script>

<div class="flex h-1/4 w-full items-start justify-evenly bg-brownNose py-8">
	<div class="flex flex-col justify-center gap-2">
		<img class="w-24" src={logoMo} alt="" />
		<div class="flex flex-col gap-1">
			<p class="text-xs font-semibold text-seashell">Pronta entrega e encomendas</p>
			<p class="text-xs font-semibold text-seashell">Lajeado - RS</p>
			<p class="text-xs font-semibold text-seashell">(51) 99999-9999</p>
		</div>
	</div>
	<div class="flex flex-col justify-center gap-2">
		<p class="pb-5 text-sm font-bold text-seashell">MENU</p>
		<a class="text-xs text-seashell hover:font-bold" href="/">Home</a>
		<a class="text-xs text-seashell hover:font-bold" href="/">Produtos</a>
		<a class="text-xs text-seashell hover:font-bold" href="/">Best Sellers</a>
		<a class="text-xs text-seashell hover:font-bold" href="/">Sobre nós</a>
	</div>
	<div class="flex flex-col justify-center">
		<p class="flex justify-center pb-5 text-sm font-bold text-seashell">REDES SOCIAIS</p>
		<div>
			<Button class="p-0 text-seashell" variant="ghost"><Instagram /></Button>
			<Button variant="ghost"><img src={whatsapp} alt="" /></Button>
		</div>
	</div>
</div>
