<script lang="ts">
	import { MinusCircle, PlusCircle } from 'lucide-svelte';
	interface Props {
		count?: number; // Agora count é uma prop recebida
	}

	let { count = $bindable(0) }: Props = $props();

	function increment() {
		count++;
	}

	function decrement() {
		if (count > 0) {
			count--;
		}
	}
</script>

<div class="relative flex items-center">
	<button
		type="button"
		id="decrement-button"
		onclick={decrement}
		class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
		<MinusCircle class=" text-gray-900" />
	</button>
	<input
		type="text"
		id="counter-input"
		name="estoque"
		bind:value={count}
		class="max-w-[2.5rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
		required
		readonly
	/>
	<button
		type="button"
		id="increment-button"
		onclick={increment}
		class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
		<PlusCircle class=" text-gray-900" />
	</button>
</div>
