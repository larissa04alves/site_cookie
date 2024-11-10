<script>
	import DirectionHover1 from './ui animations/DirectionHover1.svelte';
	import DirectionHover2 from './ui animations/DirectionHover2.svelte';
	import DirectionHover3 from './ui animations/DirectionHover3.svelte';
</script>

<div class="flex items-center justify-center gap-16">
	<div class="relative flex items-center justify-center">
		<DirectionHover2>
			<p class="text-xl font-bold">Cookie chocolate branco</p>
			<p class="text-sm font-normal">R$ 8.00</p>
		</DirectionHover2>
	</div>
	<div class="relative flex items-center justify-center">
		<DirectionHover1>
			<p class="text-xl font-bold">Cookie de chocolate com Nutella</p>
			<p class="text-sm font-normal">R$ 10.50</p>
		</DirectionHover1>
	</div>
	<div class="relative flex items-center justify-center">
		<DirectionHover3>
			<p class="text-xl font-bold">Cookie De Chocolate Com Raffaello</p>
			<p class="text-sm font-normal">R$ 8.00</p>
		</DirectionHover3>
	</div>
</div>
