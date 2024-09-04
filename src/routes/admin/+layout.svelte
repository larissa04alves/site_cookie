<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/SideBar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="h-full w-full">
	<div class="flex">
		<Sidebar />
		<TopBar />
	</div>

	<slot></slot>
</div>
