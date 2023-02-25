<script>
	import { language_names } from '@utils/languages';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import Sidebar from '@components/Sidebar.svelte';

	let rating = 5;
	let dateString = "";
	let date=new Date();
	$: dateString = `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()}`
;

	$:console.log(dateString)
</script>

<Sidebar route="/" title="Vytvořit nový záznam">
	<form use:enhance method="POST" class="flex flex-col items-center justify-center">
		<input type="text" class="displaynone" bind:value={dateString} name="date">
		<DateInput closeOnSelection={true} bind:value={date}/>
		<input type="number" name="length" placeholder="Délka" class="input input-bordered w-full max-w-xs" />
		<div class="ratink">
			<div style="transition:250ms ease-in-out;opacity:{(6-rating)/4-1/4}">
				<iconify-icon
								icon="fluent:emoji-angry-24-regular"

								class="down iconlmao"
								inline={true}
								width={30} />
			</div>
			
			<div class="rating rating-lg">
				<input type="radio" name="rating" bind:group={rating} value={1} class="mask mask-star-2" />
				<input type="radio" name="rating" bind:group={rating} value={2} class="mask mask-star-2" />
				<input type="radio" name="rating" bind:group={rating} value={3} class="mask mask-star-2" checked/>
				<input type="radio" name="rating" bind:group={rating} value={4} class="mask mask-star-2" />
				<input type="radio" name="rating" bind:group={rating} value={5} class="mask mask-star-2" />
			</div>
			<div style="transition:250ms ease-in-out;opacity:{rating/4-1/4}">
				<iconify-icon
								icon="fluent:emoji-laugh-20-regular"
								class="down iconlmao"
								inline={true}
								width={30} />
			</div>
			
		</div>
		<select class="select select-bordered w-full max-w-xs" name="language">
			<option disabled selected>Vyberte Jazyk</option>
			{#each Object.entries(language_names) as l}
				<option value={l[0]}>{l[1]}</option>
			{/each}
		</select>

		<textarea class="textarea textarea-bordered" name="description" placeholder="Popis" />

		<button class="btn btn-primary" type="submit"> Přidat záznam </button>
	</form>
</Sidebar>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap:1rem;
	}

	form > * {
		width:100% !important;
		max-width:20rem;
	}
	.ratink{
		display:flex;
		flex-direction:row;
		justify-content:space-around;
		align-items:center;
	}
	.iconlmao{
		color:white;
	}
	.displaynone{
		display:none;
	}
</style>
