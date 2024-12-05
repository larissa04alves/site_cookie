<script lang="ts">
	import { Calendar } from 'lucide-svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Calendar2 from '$lib/components/ui/calendar/calendar.svelte';
	import { DateFormatter } from '@internationalized/date';
	import { getLocalTimeZone } from '@internationalized/date';

	export let value: any;

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'medium'
	});

	$: dataFormatada = value ? value.toDate(getLocalTimeZone()).toISOString().split('T')[0] : '';
</script>

<div>
	<Popover.Root>
		<Popover.Trigger
			class={cn(
				buttonVariants({
					variant: 'outline',
					class: 'w-full justify-start text-left font-normal'
				}),
				!value && 'text-muted-foreground'
			)}
		>
			<Calendar class="mr-2 size-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Selecione uma data'}
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar2 type="single" bind:value />
		</Popover.Content>
	</Popover.Root>
	<input type="hidden" name="dataFim" value={dataFormatada} />
</div>
