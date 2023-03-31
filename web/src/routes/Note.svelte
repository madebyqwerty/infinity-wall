<div class="card relative yellow">
	<div class="grippable absolute w-full h-full"><slot name="grippable" /></div>

	<div class="card-body">
		<div class="text"><slot name="text" /></div>
	</div>
</div>

<style>
	.yellow {
		@apply bg-yellow-200 text-yellow-900 border-yellow-700 border-2;
	}
</style>
