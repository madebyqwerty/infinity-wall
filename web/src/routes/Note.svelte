<script>
	import { editing } from '@utils/editingstore';

	const colors = ['yellow', 'blue', 'green', 'red'];

	const color = colors[Math.floor(Math.random() * colors.length)];
</script>

<div class="card relative {color} overflow-hidden">
	<!-- <div class="grippable -translate-x-6 -translate-y-3 w-12 h-8 bg-yellow-900 mask mask-triangle-2 absolute">
		<slot name="grippable" />
	</div> -->

	<div class="grippable absolute w-full h-full mask mask-triangle-2 ">
		<slot name="grippable" />
	</div>
	<div class="text"><slot name="text" /></div>
	<div class="links"><slot name="linkStarter" /></div>
</div>

<style>
	.yellow {
		@apply bg-yellow-200 text-yellow-900 border-yellow-700 border-2;
	}

	.blue {
		@apply bg-blue-200 text-blue-900 border-blue-700 border-2;
	}
	.green {
		@apply bg-green-200 text-green-900 border-green-700 border-2;
	}
	.red {
		@apply bg-red-200 text-red-900 border-red-700 border-2;
	}
</style>
