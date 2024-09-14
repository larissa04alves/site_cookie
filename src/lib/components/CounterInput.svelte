<script lang="ts">
	import { MinusCircle, PlusCircle } from 'lucide-svelte';
  
	export let count: number = 0; // Adicionando o export para permitir a vinculação
	export let inputName: string = "";

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
	  on:click={decrement}
	  class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
	  <MinusCircle class="text-gray-900" />
	</button>
	<input
	  type="number"
	  id="{inputName}"
	  name="{inputName}"
	  bind:value={count}
	  class="max-w-[2.5rem] flex-shrink-0 border-0 bg-transparent text-center text-sm font-normal text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
	  placeholder=""
	  required
	  min="0">
	  
	<button
	  type="button"
	  id="increment-button"
	  on:click={increment}
	  class="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center focus:outline-none"
	>
	  <PlusCircle class="text-gray-900" />
	</button>
  </div>
  