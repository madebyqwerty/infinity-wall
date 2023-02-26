<script>
	import Graph from './Graph.svelte';
	import { page } from '$app/stores';
</script>

<div>
	<h1 class="text-6xl font-bold text-white text-opacity-90 mb-4">Vítejte v UpShop Track</h1>
	<p class="text-stone-800">
		V období od <span class="highlighted"
			>{new Date($page.data.date_past).toLocaleDateString('cs')}</span
		>
		do <span class="highlighted">{new Date($page.data.date_end).toLocaleDateString('cs')}</span>
		jste si přidal/a <span class="highlighted">{$page.data.records.length} záznamů</span>. Váše
		průměrna doba tréninku byla
		<span class="highlighted">
			{Math.round(Math.random() * 100)} minut.
		</span>
	</p>
</div>

<style>
	.highlighted {
		@apply font-bold;
	}
</style>
