<script lang="ts">
	import { language_names } from '@utils/languages';
	import Dateinput from '@components/Dateinput.svelte';
	import { enhance } from '$app/forms';
	import Sidebar from '@components/Sidebar.svelte';
	import FormControl from '@components/FormControl.svelte';
	import Rating from '@components/Rating.svelte';
	import { goto, invalidate, invalidateAll } from '$app/navigation';

	export let form: import('./$types').ActionData;
</script>

<Sidebar route="/" title="Nový záznam">
	{#if form?.error}
		<div class="text-error mb-4">
			{form?.error}
		</div>
	{/if}
	<form use:enhance method="POST" class="flex flex-col items-center justify-center">
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

		<Rating />
		<FormControl label="Programovací Jazyk" error={form?.errors?.language}>
			<select class="select select-bordered w-full" name="language">
				<option disabled selected>Vyberte Jazyk</option>
				{#each Object.entries(language_names) as l}
					<option value={l[0]}>{l[1]}</option>
				{/each}
			</select>
		</FormControl>

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

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		gap: 1rem;
		gap: 1rem;
	}
</style>
