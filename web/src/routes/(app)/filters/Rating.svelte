<script lang="ts">
	let group = 0;

	$: {
		if (group) {
			console.log(group);
		}
	}
</script>

<div class="">
	<label for="rating" class="mb-2">
		<span class="label-text">Hodnocení</span>
	</label>

	<div class="dropdown">
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<label tabindex="0" class="btn btn-ghost btn-sm text-left w-max" for="rating">
			Vybrat hodnocení
		</label>

		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul class="dropdown-content shadow bg-base-100 p-1 w-max menu" tabindex="0">
			{#each [1, 2, 3, 4, 5] as number}
				<li class="form-control">
					<label class="label cursor-pointer w-full justify-start">
						<input type="checkbox" checked={true} class="checkbox checkbox-xs" />
						<span class="label-text flex">
							{#each Array(number) as start, i}
								<div class="bg-orange-400 w-3 h-3 mask-star-2 mask" />
							{/each}
						</span>
					</label>
				</li>
			{/each}
		</ul>
	</div>
</div>
