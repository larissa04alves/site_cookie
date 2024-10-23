<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import hero from '$lib/img/hero1.png';
</script>

<div class="flex flex-col">
	<Header />
	<img class="h-[80%] w-[100%]" src={hero} alt="" />
</div>
