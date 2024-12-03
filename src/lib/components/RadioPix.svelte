<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import qrcode from '$lib/img/qrcode-pix.png';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Check, CopyIcon } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import whatsapp from '$lib/img/whatsapp.svg';

	export let showQRCode: boolean = false;
	const pixKey = '03187998046';

	let copied = false;

	function copyToClipboard() {
		navigator.clipboard.writeText(pixKey).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000); // Reseta o estado após 2 segundos
		});
	}
</script>

<RadioGroup.Root value="option-one">
	<div class="flex w-full flex-col items-start border border-teal-600 bg-ghostWhite p-5">
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value="option-one" id="option-one" />
			<Label for="option-one">Pix</Label>
		</div>
		{#if showQRCode}
			<div class="mt-5 flex w-full flex-col items-center gap-5">
				<img src={qrcode} alt="QR Code" class="h-32 w-32" />
				<div class="mt-4 flex flex-col items-center gap-2 space-x-2">
					<div class="flex items-center gap-2">
						<input
							type="text"
							value={pixKey}
							class="w-full max-w-sm rounded border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-teal-600"
							readonly
						/>
						<Button
							onclick={copyToClipboard}
							class="flex items-center space-x-2 rounded bg-brownNose px-3 py-2 text-white hover:bg-brownCrayola"
						>
							{#if copied}
								<Check class="h-4 w-4" />
							{:else}
								<CopyIcon class="h-4 w-4" />
							{/if}
						</Button>
					</div>
					<p class="text-center text-xs text-zinc-400">
						Após o pagamento envie o comprovante no whatsapp <br /> para confirmar a compra
					</p>
					<Button
						href="https://wa.me/5551981740691?text=Ol%C3%A1%2C%20finalizei%20o%20meu%20pedido%20no%20site!%20Segue%20o%20comprovante"
						class="bg-brownCrayola text-xs hover:bg-brownCrayola hover:font-semibold"
					>
						<img src={whatsapp} alt="WhatsApp" class="h-4 w-4" />
						Enviar comprovante</Button
					>
				</div>
			</div>
		{/if}
	</div>
</RadioGroup.Root>
