<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { derived } from 'svelte/store';
	import type { LayoutData } from './$types';

	// Variável derivada que acompanha o caminho atual da URL
	const linkAtual = derived(page, ($page) => $page.url.pathname);

	setMode('light');
</script>

<svelte:head>
	<title>Nossa loja - Cookie da Mo</title>
</svelte:head>

<Toaster richColors />

<ModeWatcher defaultMode="light" />

{#if $linkAtual === '/'}
	<Header user={$page.data.user} />
{/if}

<div class="flex h-full w-full flex-col items-center justify-center">
	<slot />
	{#if $linkAtual === '/'}
		<Footer />
	{/if}
</div>
