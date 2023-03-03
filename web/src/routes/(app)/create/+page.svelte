<script lang="ts">
	import Dateinput from '@components/Dateinput.svelte';
	import { enhance } from '$app/forms';
	import Sidebar from '@components/Sidebar.svelte';
	import FormControl from '@components/FormControl.svelte';
	import Rating from '@components/Rating.svelte';
	import Input from '@components/Input.svelte';
	import { page } from '$app/stores';

	export let form: import('./$types').ActionData;

	let zero = 0;
</script>

<Sidebar route="/home{$page.url.search}" title="Nový záznam">
	{#if form?.error}
		<div class="text-error mb-4">
			{form?.error}
		</div>
	{/if}
	<form use:enhance method="POST" class="flex flex-col justify-center w-full gap-4">
		<Dateinput />

		<FormControl label="Délka záznamu" error={form?.errors?.time}
			><input
				type="number"
				name="time"
				placeholder="Délka"
				class="input input-bordered"
				min={1}
			/></FormControl
		>

		<Rating bind:value={zero} />
		<Input
			label="Programovací jazyk"
			name="language"
			placeholder="JavaScript"
			type="text"
			error={form?.errors?.language?.at(0) ?? ''}
		/>

		<FormControl label="Popis" error={form?.errors?.description}>
			<textarea
				class="textarea textarea-bordered w-full"
				rows={8}
				name="description"
				placeholder="Např: Optimalizoval jsem deployování docker containeru na server."
			/>
		</FormControl>

		<button class="btn btn-primary" type="submit"> Přidat záznam </button>
	</form>
</Sidebar>
