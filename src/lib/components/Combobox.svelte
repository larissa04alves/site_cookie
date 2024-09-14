<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { Clock, X } from 'lucide-svelte';

	const status = [
		{
			value: 'aguardando',
			label: 'Aguardando'
		},
		{
			value: 'finalizado',
			label: 'Finalizado'
		},
		{
			value: 'cancelado',
			label: 'Cancelado'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue = status.find((f) => f.value === value)?.label ?? 'Selecione o status';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between bg-transparent"
		>
			{#if value === 'finalizado'}
				<div
					class="inline-flex items-center gap-x-2 rounded-full bg-green-100/60 px-3 py-1 text-green-500"
				>
					<Check class="h-4 w-4" />
					<h2 class="text-sm font-normal">Finalizado</h2>
				</div>
			{:else if value === 'cancelado'}
				<div
					class="inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500"
				>
					<X class="h-4 w-4" />
					<h2 class="text-sm font-normal">Cancelado</h2>
				</div>
			{:else if value === 'aguardando'}
				<div
					class="inline-flex items-center gap-x-2 rounded-full bg-blue-100/60 px-3 py-1 text-blue-500"
				>
					<Clock class="h-4 w-4" />
					<h2 class="text-sm font-normal">Aguardando</h2>
				</div>
			{:else}
				{selectedValue}
			{/if}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Selecione o status" />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each status as estado}
					<Command.Item
						value={estado.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{#if estado.value === 'finalizado'}
							<div
								class="inline-flex items-center gap-x-2 rounded-full bg-green-100/60 px-3 py-1 text-green-500"
							>
								<Check class="h-4 w-4" />
								<h2 class="text-sm font-normal">{estado.label}</h2>
							</div>
						{:else if estado.value === 'cancelado'}
							<div
								class="inline-flex items-center gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-red-500"
							>
								<X class="h-4 w-4" />
								<h2 class="text-sm font-normal">{estado.label}</h2>
							</div>
						{:else if estado.value === 'aguardando'}
							<div
								class="inline-flex items-center gap-x-2 rounded-full bg-blue-100/60 px-3 py-1 text-blue-500"
							>
								<Clock class="h-4 w-4" />
								<h2 class="text-sm font-normal">{estado.label}</h2>
							</div>
						{/if}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
