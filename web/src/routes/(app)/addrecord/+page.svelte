<script>
	import { language_names } from '@utils/languages';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import Sidebar from '@components/Sidebar.svelte';
</script>

<Sidebar route="/" title="Vytvořit nový záznam">
	<form use:enhance method="POST" class="flex flex-col items-center justify-center">
		<DateInput closeOnSelection={true} />
		<input type="number" placeholder="Délka" class="input input-bordered w-full max-w-xs" />
		<div class="rating rating-lg">
			<input type="radio" name="rating" value={1} class="mask mask-star-2" />
			<input type="radio" name="rating" value={2} class="mask mask-star-2" />
			<input type="radio" name="rating" value={3} class="mask mask-star-2" />
			<input type="radio" name="rating" value={4} class="mask mask-star-2" />
			<input type="radio" name="rating" value={5} class="mask mask-star-2" />
		</div>
		<select class="select select-bordered w-full max-w-xs">
			<option disabled selected>Vyberte Jazyk</option>
			{#each Object.entries(language_names) as l}
				<option value={l[0]}>{l[1]}</option>
			{/each}
		</select>

		<textarea class="textarea textarea-bordered" placeholder="Bio" />

		<button type="submit"> Přidat záznam </button>
	</form>
</Sidebar>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}
</style>
