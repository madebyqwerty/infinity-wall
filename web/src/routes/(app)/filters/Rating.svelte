<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';

	$: stars = (JSON.parse($page.url.searchParams.get('stars') as string) as number[]) || [
		0, 1, 2, 3, 4, 5
	];

	$: console.log(stars);

	async function update_stars(number: number) {
		if (stars.includes(number)) {
			stars = stars.filter((star) => star !== number);
		} else {
			stars = [...stars, number];
		}

		const url = $page.url;

		url.searchParams.set('stars', JSON.stringify(stars));

		await goto(url.toString(), { noScroll: true });
		await invalidate('home');
	}
</script>

<section id="rating">
	<label for="rating">
		<span class="label-text">Hodnocení</span>
	</label>

	<ul class="bg-base-100 menu">
		{#each [0, 1, 2, 3, 4, 5] as number}
			<li class="form-control">
				<label class="label cursor-pointer justify-start">
					<input
						type="checkbox"
						checked={stars.includes(number)}
						class="checkbox checkbox-xs"
						on:change={() => update_stars(number)}
					/>
					<span class="label-text flex items-center">
						<div class="mr-2">{number}</div>
						{#each Array(number) as start}
							<div class="bg-orange-400 w-3 h-3 mask-star-2 mask" />
						{/each}
					</span>
				</label>
			</li>
		{/each}
	</ul>
</section>
