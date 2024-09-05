<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/SideBar.svelte';
	import TopBar from '$lib/components/TopBar.svelte';
</script>

<div class="flex h-full w-full flex-col">
	<Sidebar />
	<TopBar />

	<div class="flex h-full w-full">
		<div class="w-[15%]">teste</div>
		<div class="w-[85%]">
			<slot></slot>
		</div>
	</div>
</div>
