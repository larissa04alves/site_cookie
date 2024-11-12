<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	import Sidebar from '$lib/components/SideBar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="flex h-full w-full flex-col">
	<Sidebar />
	<TopBar />

	<div class="flex h-full w-full pt-[4.5rem]">
		<div class="w-[16%]">Espaco sidebar</div>
		<div class="w-[85%]">{@render children()}</div>
	</div>
</div>
