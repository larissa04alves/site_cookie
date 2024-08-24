<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let form: ActionData;
	export let data: PageData;

	console.log('TESTE DO FRONTEND', form?.teste[0]);
	kjaskajsk;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form action="?/teste" method="post">
	<button type="submit">Teste consulta</button>
</form>
<h1>{form?.teste[0].name}</h1>
