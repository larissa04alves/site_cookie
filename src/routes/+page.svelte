<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let form: ActionData;
	export let data: PageData;

	console.log('TESTE DO FRONTEND', form?.teste[0]);
</script>

<form action="?/teste" method="post">
	<button type="submit">Teste consulta</button>
</form>
<h1 class="font-cormorant">{form?.teste[0].name}</h1>
