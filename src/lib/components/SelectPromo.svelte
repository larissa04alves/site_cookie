<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	const fruits = [
		{ value: 'apple', label: 'Cookie de Chocolate' },
		{ value: 'banana', label: 'Cookie de nutella' },
		{ value: 'blueberry', label: 'Cookie de Chocolate Branco' },
		{ value: 'grapes', label: 'Cookie de Prestígio' },
		{ value: 'pineapple', label: 'Cookie de M&M' }
	];
</script>

<Select.Root portal={null}>
	<Select.Trigger class="w-full">
		<Select.Value placeholder="Selecione o cookie" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Sabores</Select.Label>
			{#each fruits as fruit}
				<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="favoriteFruit" />
</Select.Root>
