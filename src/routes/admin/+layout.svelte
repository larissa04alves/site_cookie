<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/SideBar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex h-full w-full flex-col">
	<Sidebar />
	<TopBar />

	<div class="flex h-full w-full pt-[4.5rem]">
		<div class="w-[16%]">Espaco sidebar</div>
		<div class="w-[85%]">
			{@render children?.()}
		</div>
	</div>
</div>
