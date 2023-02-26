<script lang="ts">
	import Date from './filters/Date.svelte';
	import Rating from './filters/Rating.svelte';
</script>

<div class="relative col-span-4">
	<section
		id="filter"
		class="bg-base-100 bg-opacity-75 rounded-md xl:shadow-md xl:p-8 p-4 sticky top-20"
	>
		<h2 class="text-4xl mb-4">Filtrování</h2>
		<div class="flex flex-col xl:items-center gap-8">
			<Date />
			<Rating />
		</div>
	</section>
</div>
