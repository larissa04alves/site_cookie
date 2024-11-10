<script lang="ts">
	import type { UserDataFromCookies } from '$lib/database/typesUteis.js';

	let { data } = $props();
	const user: UserDataFromCookies = data.user;
</script>

{#if user}
	<p>Olá, {user.name}!</p>
{:else}
	<p>Você não está logado.</p>
{/if}
