<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	let value = 'pendente';
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-[140px]">
		{#if value === 'sendo_preparado'}
			<span
				class="inline-flex items-center rounded-full bg-blue-100/60 px-2 py-1 text-xs text-blue-500"
				>Sendo preparado</span
			>
		{:else if value === 'pendente'}
			<span
				class="inline-flex items-center rounded-full bg-yellow-100/60 px-2 py-1 text-xs text-yellow-500"
				>Pendente</span
			>
		{:else if value === 'concluido'}
			<span
				class="inline-flex items-center rounded-full bg-green-100/60 px-2 py-1 text-xs text-green-500"
				>Concluido</span
			>
		{:else if value === 'cancelado'}
			<span
				class="inline-flex items-center rounded-full bg-red-100/60 px-2 py-1 text-xs text-red-500"
				>Cancelado</span
			>
		{/if}
	</Select.Trigger>
	<Select.Content>
		<Select.Item
			class="inline-flex items-center rounded-full bg-blue-100/60 px-2 py-1 text-xs text-blue-500 hover:bg-blue-100/60"
			value="sendo_preparado">Sendo preparado</Select.Item
		>
		<Select.Item
			class="inline-flex items-center rounded-full bg-yellow-100/60 px-2 py-1 text-xs text-yellow-500 hover:bg-yellow-100/60"
			value="pendente">Pendente</Select.Item
		>
		<Select.Item
			class="inline-flex items-center rounded-full bg-green-100/60 px-2 py-1 text-xs text-green-500 hover:bg-green-100/60"
			value="concluido">Concluido</Select.Item
		>
		<Select.Item
			class="inline-flex items-center rounded-full bg-red-100/60 px-2 py-1 text-xs text-red-500 hover:bg-red-100/60"
			value="cancelado">Cancelado</Select.Item
		>
	</Select.Content>
</Select.Root>
