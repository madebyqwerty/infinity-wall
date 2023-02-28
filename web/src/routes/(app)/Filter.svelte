<script lang="ts">
	import type { PageData } from './$types';
	import Date from './filters/Date.svelte';
	import Languages from './filters/Languages.svelte';
	import Rating from './filters/Rating.svelte';

	export let data: PageData;
</script>

<div class="relative col-span-4">
	<section
		id="filter"
		class="bg-base-100 bg-opacity-90 rounded-md xl:shadow-md xl:p-8 p-4 sticky top-20"
	>
		<h2 class="text-4xl mb-4">Filtrování</h2>
		<div class="flex flex-col gap-8">
			<Date />
			<Rating />
			{#key data}
				<Languages />
			{/key}
		</div>
	</section>
</div>
