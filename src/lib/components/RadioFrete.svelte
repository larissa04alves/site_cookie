<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
</script>

<RadioGroup.Root value="option-one">
	<div class="flex items-center space-x-2">
		<RadioGroup.Item value="option-one" id="option-one" />
		<Label class="font-montserrat font-normal" for="option-one"
			>Entrega normal - 40 a 50 minutos</Label
		>
	</div>
</RadioGroup.Root>
