<script>
	export let rating = 3;
</script>

<div class="flex flex-row gap-4 items-center">
	<div style="transition:250ms ease-in-out;opacity: {rating==0?0.5:(6 - rating) / 4 - 1 / 4}">
		<iconify-icon
			icon="fluent:emoji-angry-24-regular"
			class="translate-y-1 text-base-content"
			inline={true}
			width={30}
		/>
	</div>

	<div class="rating rating-lg">
		<input type="radio" name="rating" bind:group={rating} value={0} class="rating-hidden" />
		<input type="radio" name="rating" bind:group={rating} value={1} class="mask mask-star-2" />
		<input type="radio" name="rating" bind:group={rating} value={2} class="mask mask-star-2" />
		<input
			type="radio"
			name="rating"
			bind:group={rating}
			value={3}
			class="mask mask-star-2"
			checked
		/>
		<input type="radio" name="rating" bind:group={rating} value={4} class="mask mask-star-2" />
		<input type="radio" name="rating" bind:group={rating} value={5} class="mask mask-star-2" />
	</div>
	<div style="transition:250ms ease-in-out;opacity:{rating==0?0.5:rating / 4 - 1 / 4}">
		<iconify-icon
			icon="fluent:emoji-laugh-20-regular"
			class="translate-y-1 text-base-content"
			inline={true}
			width={30}
		/>
	</div>
</div>
