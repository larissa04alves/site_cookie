<script>
	import { ShoppingCart, Star } from 'lucide-svelte';
	import { Button } from './ui/button';
	import cookieStikadinho from '$lib/img/cookieStikadinho.jpg';
</script>

<div class="flex gap-6">
	<div class="flex flex-col items-center justify-center gap-4 rounded-xl py-3 shadow-2xl">
		<img class="h-[28vh] w-11/12 rounded-lg" src={cookieStikadinho} alt="" />
		<div class="flex w-full flex-col px-4">
			<div class="flex items-center justify-between">
				<h1>Cookie Chocolate</h1>
				<p class="flex items-center gap-1 text-sm">
					<Star fill="#A35A32" color="transparent" size="18" /> 4.5
				</p>
			</div>
			<div class="mt-2 flex items-center justify-between">
				<h1 class="text-lg font-semibold">R$ 10</h1>
				<Button
					variant="ghost"
					class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose "
					><ShoppingCart size={18} color="white" /></Button
				>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center gap-4 rounded-xl py-3 shadow-lg">
		<img class="h-[28vh] w-11/12 rounded-lg" src={cookieStikadinho} alt="" />
		<div class="flex w-full flex-col px-4">
			<div class="flex items-center justify-between">
				<h1>Cookie Chocolate</h1>
				<p class="flex items-center gap-1 text-sm">
					<Star fill="#A35A32" color="transparent" size="18" /> 4.5
				</p>
			</div>
			<div class="mt-2 flex items-center justify-between">
				<h1 class="text-lg font-semibold">R$ 10</h1>
				<Button
					variant="ghost"
					class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose "
					><ShoppingCart size={18} color="white" /></Button
				>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center gap-4 rounded-xl py-3 shadow-lg">
		<img class="h-[28vh] w-11/12 rounded-lg" src={cookieStikadinho} alt="" />
		<div class="flex w-full flex-col px-4">
			<div class="flex items-center justify-between">
				<h1>Cookie Chocolate</h1>
				<p class="flex items-center gap-1 text-sm">
					<Star fill="#A35A32" color="transparent" size="18" /> 4.5
				</p>
			</div>
			<div class="mt-2 flex items-center justify-between">
				<h1 class="text-lg font-semibold">R$ 10</h1>
				<Button
					variant="ghost"
					class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose "
					><ShoppingCart size={18} color="white" /></Button
				>
			</div>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center gap-4 rounded-xl py-3 shadow-lg">
		<img class="h-[28vh] w-11/12 rounded-lg" src={cookieStikadinho} alt="" />
		<div class="flex w-full flex-col px-4">
			<div class="flex items-center justify-between">
				<h1>Cookie Chocolate</h1>
				<p class="flex items-center gap-1 text-sm">
					<Star fill="#A35A32" color="transparent" size="18" /> 4.5
				</p>
			</div>
			<div class="mt-2 flex items-center justify-between">
				<h1 class="text-lg font-semibold">R$ 10</h1>
				<Button
					variant="ghost"
					class="flex h-8 w-8 items-center justify-center rounded-full bg-brownCrayola p-0 hover:bg-brownNose "
					><ShoppingCart size={18} color="white" /></Button
				>
			</div>
		</div>
	</div>
</div>
