<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { language_names } from '@utils/languages';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import Dateinput from '@components/Dateinput.svelte';
	import FormControl from '@components/FormControl.svelte';
	import Rating from '@components/Rating.svelte';

	export let data: PageData;
	export let form: ActionData;

	let dateString = '';
	let date = new Date(data.record.date);
	$: dateString = date.toISOString();
</script>

<Sidebar
	route="/record/{data.record.id}"
	title="Upravit záznam <br/> {date.toLocaleDateString('cs')}"
>
	<form use:enhance method="POST" class="flex flex-col items-center justify-center">
		<input type="hidden" bind:value={data.record.id} name="id" />

		<Dateinput />

		<FormControl label="Délka záznamu" error={form?.errors?.time}
			><input
				type="number"
				name="time"
				placeholder="Délka"
				class="input input-bordered"
				min={0}
			/></FormControl
		>
		<Rating />

		<FormControl label="Programovací Jazyk" error={form?.errors?.language}>
			<select class="select select-bordered w-full" name="language">
				<option disabled selected>Vyberte Jazyk</option>
				{#each Object.entries(language_names) as l}
					<option value={l[0]}>{l[1]}</option>
				{/each}
			</select>
		</FormControl>

		<textarea
			class="textarea textarea-bordered"
			bind:value={data.record.description}
			name="description"
			placeholder="Popis"
		/>

		<button class="btn btn-primary" type="submit"> Upravit záznam </button>
	</form>
</Sidebar>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap: 1rem;
	}

	:global(.date-time-field),
	:global(.date-time-field > input) {
		width: 100% !important;
		min-width: 20rem;
	}
</style>
