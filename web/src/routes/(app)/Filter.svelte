<script lang="ts">
	import Date from './filters/Date.svelte';
	import Rating from './filters/Rating.svelte';
</script>

<section id="filter" class="my-12">
	<h2 class="text-6xl text-primary mb-4">Filtrování</h2>
	<div class="lg:flex items-center gap-8">
		<Date />
		<Rating />
	</div>
</section>
