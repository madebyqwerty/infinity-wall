<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import Dateinput from '@components/Dateinput.svelte';
	import FormControl from '@components/FormControl.svelte';
	import Rating from '@components/Rating.svelte';
	import Input from '@components/Input.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	export let form: ActionData;

	let date = new Date(data.record.date);
</script>

<Sidebar
	route="/record/{data.record.id}{$page.url.search}"
	title="Upravit záznam <br/> {date.toLocaleDateString('cs')}"
>
	<form use:enhance method="POST" class="flex flex-col justify-center gap-4">
		<Dateinput />

		<input type="hidden" bind:value={data.record.id} name="id" />

		<FormControl label="Délka záznamu" error={form?.errors?.time}
			><input
				type="number"
				name="time"
				placeholder="Délka"
				class="input input-bordered"
				min={1}
				bind:value={data.record.time}
			/></FormControl
		>
		<Rating value={data.record.rating} />

		<Input
			label="Programovací jazyk"
			name="language"
			placeholder="JavaScript"
			type="text"
			value={data.record.language}
			error={form?.errors?.language?.at(0) ?? ''}
		/>

		<textarea
			class="textarea textarea-bordered"
			value={data.record.description}
			name="description"
			placeholder="Popis"
		/>

		<button class="btn btn-primary" type="submit"> Upravit záznam </button>
	</form>
</Sidebar>
