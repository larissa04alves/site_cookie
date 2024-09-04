<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher defaultMode="light" />
<div class="h-full w-full">
	<slot></slot>
</div>
