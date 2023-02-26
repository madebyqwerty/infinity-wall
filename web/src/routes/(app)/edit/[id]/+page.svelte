<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { language_names } from '@utils/languages';
	import type { PageData } from './$types';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	let dateString = "";
	let date=new Date(data.record.date);
	$: dateString = date.toISOString();
</script>

<Sidebar
	route="/record/{data.record.id}"
	title="Upravit záznam <br/> {date.toLocaleDateString('cs')}"
	size="md"
>
<form use:enhance method="POST" class="flex flex-col items-center justify-center">
	<input type="text" class="displaynone" bind:value={dateString} name="date">
	<input type="text" class="displaynone" bind:value={data.record.id} name="id">
	<DateInput closeOnSelection={true} bind:value={date}/>
	<input type="number" min={1} max={1440} step={1} bind:value={data.record.time} name="time" placeholder="Délka" class="input input-bordered w-full max-w-s" />
	<div class="ratink">
		<div style="transition:250ms ease-in-out;opacity:{(6-data.record.rating)/4-1/4}">
			<iconify-icon
							icon="fluent:emoji-angry-24-regular"

							class="down iconlmao"
							inline={true}
							width={30} />
		</div>
		
		<div class="rating rating-lg">
			<input type="radio" name="rating" bind:group={data.record.rating} value={1} class="mask mask-star-2" />
			<input type="radio" name="rating" bind:group={data.record.rating} value={2} class="mask mask-star-2" />
			<input type="radio" name="rating" bind:group={data.record.rating} value={3} class="mask mask-star-2" checked/>
			<input type="radio" name="rating" bind:group={data.record.rating} value={4} class="mask mask-star-2" />
			<input type="radio" name="rating" bind:group={data.record.rating} value={5} class="mask mask-star-2" />
		</div>
		<div style="transition:250ms ease-in-out;opacity:{data.record.rating/4-1/4}">
			<iconify-icon
							icon="fluent:emoji-laugh-20-regular"
							class="down iconlmao"
							inline={true}
							width={30} />
		</div>
		
	</div>
	<select class="select select-bordered w-full max-w-s" bind:value={data.record.language} name="language">
		<option disabled selected>Vyberte Jazyk</option>
		{#each Object.entries(language_names) as l}
			<option value={l[0]}>{l[1]}</option>
		{/each}
	</select>

	<textarea class="textarea textarea-bordered" bind:value={data.record.description} name="description" placeholder="Popis" />

	<button class="btn btn-primary" type="submit"> Upravit záznam </button>
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

	form > *, :global(.date-time-field), :global(.date-time-field>input) {
		width:100% !important;
		min-width:20rem;
	}
	.ratink{
		display:flex;
		flex-direction:row;
		justify-content:space-around;
		align-items:center;
	}
	.iconlmao{
		color:black;
	}
	.displaynone{
		display:none;
	}
</style>