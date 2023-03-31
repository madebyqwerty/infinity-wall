<script>
	import { editing } from '@utils/editingstore';
</script>

<div class="card relative yellow overflow-hidden">
	<div class="grippable -translate-x-6 -translate-y-3 w-12 h-12 bg-yellow-900 mask mask-triangle-2">
		<slot name="grippable" />
	</div>
	<div class="card-body">
		<div class="text"><slot name="text" /></div>
		<div class="links"><slot name="linkStarter" /></div>
	</div>
</div>

<style>
	.yellow {
		@apply bg-yellow-200 text-yellow-900 border-yellow-700 border-2;
	}
</style>
