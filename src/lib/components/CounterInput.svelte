<script lang="ts">
	import { MinusCircle, PlusCircle } from 'lucide-svelte';
	export let count = 0;
	export let minimum = 0;
	export let onChangeValue = (value: number) => {};

	function increment() {
		count++;
		onChangeValue(count);
	}

	function decrement() {
		if (count > minimum) {
			count--;
			onChangeValue(count);
		}
	}
</script>

<div class="relative flex items-center">
	<button
		type="button"
		id="decrement-button"
		on:click={decrement}
		class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
		<MinusCircle class="text-gray-900" />
	</button>
	<input
		type="number"
		id="counter-input"
		name="estoque"
		bind:value={count}
		class="max-w-[2.5rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
		required
	/>
	<button
		type="button"
		id="increment-button"
		on:click={increment}
		class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
		<PlusCircle class="text-gray-900" />
	</button>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
