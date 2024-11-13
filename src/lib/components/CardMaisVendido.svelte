<script>
	import cookie from '$lib/img/cookieRafaelo.png';
	import { Button } from './ui/button';
	import { Star } from 'lucide-svelte';
</script>

<div class="flex items-center justify-center gap-10 py-5">
	<div class="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
		<img class="h-64 w-72 rounded-xl object-cover" src={cookie} alt="avatar" />
		<div class="absolute right-3 top-3 flex items-center rounded-full bg-brownCrayola/50 px-2 py-1">
			<Star fill="yellow" color="transparent" size="14" />
			<span class="ml-1 text-xs font-semibold text-white">Top 2</span>
		</div>
		<div
			class="absolute left-0 right-0 top-3/4 flex h-1/4 flex-col justify-end gap-2 rounded-xl bg-gradient-to-t from-[#753f21]/80 to-transparent p-4 backdrop-blur-[0.06rem]"
		>
			<h2 class="text-xl font-bold text-white">Cookie Rafaelo</h2>
			<Button
				href="#produtos"
				variant="ghost"
				class="font-montserrat flex w-1/3 rounded-3xl bg-brownCrayola text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
				>Detalhes</Button
			>
		</div>
	</div>

	<div class="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
		<img class="h-72 w-80 rounded-xl object-cover" src={cookie} alt="avatar" />
		<div class="absolute right-3 top-3 flex items-center rounded-full bg-green-800/50 px-2 py-1">
			<Star fill="yellow" color="transparent" size="14" />
			<span class="ml-1 text-xs font-semibold text-white">Top 1</span>
		</div>
		<div
			class="absolute left-0 right-0 top-3/4 flex h-1/4 flex-col justify-end gap-2 rounded-xl bg-gradient-to-t from-[#753f21]/80 to-transparent p-4 backdrop-blur-[0.07rem]"
		>
			<h2 class="text-xl font-bold text-white">Cookie Rafaelo</h2>
			<Button
				variant="ghost"
				href="#produtos"
				class="font-montserrat flex w-1/3 rounded-3xl bg-brownCrayola text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
				>Detalhes</Button
			>
		</div>
	</div>
	<div class="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
		<img class="h-64 w-72 rounded-xl object-cover" src={cookie} alt="avatar" />
		<div class="absolute right-3 top-3 flex items-center rounded-full bg-yellow-600/50 px-2 py-1">
			<Star fill="yellow" color="transparent" size="14" />
			<span class="ml-1 text-xs font-semibold text-white">Top 3</span>
		</div>
		<div
			class="absolute left-0 right-0 top-3/4 flex h-1/4 flex-col justify-end gap-2 rounded-xl bg-gradient-to-t from-[#753f21]/80 to-transparent p-4 backdrop-blur-[0.07rem]"
		>
			<h2 class="text-xl font-bold text-white">Cookie Rafaelo</h2>
			<Button
				href="#produtos"
				variant="ghost"
				class="font-montserrat flex w-1/3 rounded-3xl bg-brownCrayola text-xs font-semibold text-white hover:bg-brownNose hover:text-white"
				>Detalhes</Button
			>
		</div>
	</div>
</div>
