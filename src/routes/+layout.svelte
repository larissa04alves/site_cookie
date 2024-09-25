<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<Toaster richColors />

<ModeWatcher defaultMode="light" />
<div class="h-full w-full">
	<slot></slot>
</div>
