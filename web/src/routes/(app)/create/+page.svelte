<script lang="ts">
<script lang="ts">
	import { language_names } from '@utils/languages';
	import { DateInput } from 'date-picker-svelte';
	import { enhance } from '$app/forms';
	import Sidebar from '@components/Sidebar.svelte';
	import FormControl from '@components/FormControl.svelte';
	import FormControl from '@components/FormControl.svelte';

	let rating = 3;
	let dateString = '';
	let date = new Date();

	export let form: import('./$types').ActionData;

	$: dateString = date.toISOString();
	let dateString = '';
	let date = new Date();

	export let form: import('./$types').ActionData;

	$: dateString = date.toISOString();

	$: console.log(form);
	$: console.log(form);
</script>

<Sidebar route="/" title="Nový záznam">
	{#if form?.error}
		<div class="text-error mb-4">
			{form?.error}
		</div>
	{/if}
	<form use:enhance method="POST" class="flex flex-col items-center justify-center">
		<input type="hidden" class="hidden" bind:value={dateString} name="date" />
		<DateInput
			closeOnSelection={true}
			bind:value={date}
			locale={{
				months: [
					'Leden',
					'Únor',
					'Březen',
					'Duben',
					'Květen',
					'Červen',
					'Červenec',
					'Srpen',
					'Září',
					'Říjen',
					'Listopad',
					'Prosince'
				],
				weekdays: ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
			}}
			format="dd. MM. yyyy"
		/>

		<FormControl label="Délka záznamu" error={form?.errors?.time}
			><input
				type="number"
				name="time"
				placeholder="Délka"
				class="input input-bordered"
				min={0}
			/></FormControl
		>

		<div class="flex items-center justify-between w-full">
			<div style="transition:250ms ease-in-out;opacity:{(5 - rating) / 4}">
				<iconify-icon
					icon="fluent:emoji-angry-24-regular"
					class="text-base-content translate-y-1"
					inline={true}
					width={30}
				/>
				icon="fluent:emoji-angry-24-regular" class="text-base-content translate-y-1" inline={true}
				width={30}
				/>
			</div>
			<div class="rating rating-lg">
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

			<div style="transition:250ms ease-in-out;opacity:{(rating - 1) / 4}">
				<iconify-icon
					icon="fluent:emoji-laugh-20-regular"
					class="text-base-content translate-y-1"
					inline={true}
					width={30}
				/>
				icon="fluent:emoji-laugh-20-regular" class="text-base-content translate-y-1" inline={true}
				width={30}
				/>
			</div>
		</div>

		<FormControl label="Programovací Jazyk" error={form?.errors?.language}>
			<select class="select select-bordered w-full" name="language">
				<option disabled selected>Vyberte Jazyk</option>
				{#each Object.entries(language_names) as l}
					<option value={l[0]}>{l[1]}</option>
				{/each}
			</select>
		</FormControl>

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

	:global(:root) {
		--date-picker-background: hsl(var(--b1));
		--date-picker-foreground: hsl(var(--bc));
		--date-picker-highlight-border: hsl(var(--pf));
		--date-picker-selected-color: hsl(var(--pc));
	:global(:root) {
		--date-picker-background: hsl(var(--b1));
		--date-picker-foreground: hsl(var(--bc));
		--date-picker-highlight-border: hsl(var(--pf));
		--date-picker-selected-color: hsl(var(--pc));
	}
</style>
