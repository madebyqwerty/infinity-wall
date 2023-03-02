<script lang="ts">
	export let number: number;
</script>

<div class="flex items-center">
	<div class="mr-2">{number}</div>
	{#each Array(number) as start}
		<div class="bg-orange-400 w-3 h-3 mask-star-2 mask" />
	{/each}
</div>
