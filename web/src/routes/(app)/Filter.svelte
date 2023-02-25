<script lang="ts">
	import Date from './filters/Date.svelte';
	import Rating from './filters/Rating.svelte';
</script>

<h2 class="text-6xl text-white text-opacity-80 mb-4">Filtrování</h2>
<section id="filter" class="my-12 bg-base-100 rounded-md  shadow-md p-8">
	<div class="lg:flex items-center gap-8">
		<Date />
		<Rating />
	</div>
</section>
