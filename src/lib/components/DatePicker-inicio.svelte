<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	const df = new DateFormatter('pt-BR', {
		dateStyle: 'long'
	});

	let value = $state<DateValue | undefined>(undefined);

	const formatDate = (date: DateValue | undefined) => {
		return date ? date.toDate(getLocalTimeZone()).toISOString().split('T')[0] : '';
	};

	let dataInicio = $derived(() => formatDate(value));
</script>

<div class="flex max-w-[50%] flex-col gap-2">
	<Label for="dataInicio">Data de início da promoção</Label>
	<Popover.Root>
		<Popover.Trigger>
			<Button
				variant="outline"
				class={cn(
					'w-[280px] justify-start text-left font-normal',
					!value && 'text-muted-foreground'
				)}
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{value ? df.format(value.toDate(getLocalTimeZone())) : 'Selecione uma data'}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar bind:value initialFocus />
		</Popover.Content>
	</Popover.Root>
	<input type="hidden" name="dataInicio" value={dataInicio} />
</div>
