<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	let linkAtual = $page.url.pathname;

	console.log(linkAtual);
</script>

<Toaster richColors />

<ModeWatcher defaultMode="light" />
{#if linkAtual === '/admin' || linkAtual === '/login' || linkAtual === '/admin/produtos' || linkAtual === '/admin/novoproduto' || linkAtual === '/admin/pedidos' || linkAtual === '/admin/promocoes'}
	<div class="hidden">teste</div>
{:else}
	<Header />
{/if}

<div class="flex h-full w-full flex-col items-center justify-center">
	<slot></slot>
</div>
