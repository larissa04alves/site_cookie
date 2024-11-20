<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
</script>

<RadioGroup.Root value="option-one">
	<div class="flex h-12 items-center space-x-2 border border-teal-600 bg-ghostWhite pl-5">
		<RadioGroup.Item value="option-one" id="option-one" />
		<Label for="option-one">Pix</Label>
	</div>
</RadioGroup.Root>
