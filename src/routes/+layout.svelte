<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	let linkAtual = $state($page.url.pathname);
</script>

<Toaster richColors />

<ModeWatcher />

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
