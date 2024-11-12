<script lang="ts">
	import type { PageData } from './$types';
	import logo from '$lib/img/logoCookiesMo.png';
	let { data }: { data: PageData } = $props();
</script>

<div>
	<div>
		<img src={logo} alt="" />
	</div>
</div>
