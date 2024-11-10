<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let linkAtual = $derived($page.url.pathname);
</script>

<Toaster richColors />

<ModeWatcher defaultMode="light" />
{#if linkAtual === '/'}
	<Header />
{/if}

<div class="flex h-full w-full flex-col items-center justify-center">
	{@render children()}

	{#if linkAtual === '/'}
		<Footer />
	{/if}
</div>
