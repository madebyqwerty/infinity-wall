<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { get_date_in_ddmmyyyy, subtract_month, subtract_week, subtract_year } from '@utils/dates';
	import { page } from '$app/stores';
	import Dateinput from '@components/Dateinput.svelte';
	import FormControl from '@components/FormControl.svelte';

	let selected: Date | 'custom';

	let from = subtract_month(new Date());
	let to = new Date();

	async function update_date() {
		const url = $page.url;

		if (selected === 'custom') {
			url.searchParams.set('from', get_date_in_ddmmyyyy(from));
			url.searchParams.set('to', get_date_in_ddmmyyyy(to));

			await goto(url.toString(), { noScroll: true });
			await invalidate('home');
			return;
		}

		url.searchParams.set('from', get_date_in_ddmmyyyy(selected));
		url.searchParams.set('to', get_date_in_ddmmyyyy(new Date()));

		await goto(url.toString(), { noScroll: true });
		await invalidate('home');
	}
</script>

<div class="form-control w-full">
	<label class="label" for="date-select">
		<span class="label-text">Od kdy do kdy</span>
	</label>
	<select
		class="select select-sm bg-base-200"
		id="date-select"
		bind:value={selected}
		on:change={update_date}
	>
		<option value={subtract_week(new Date())}>Poslední týden</option>
		<option value={subtract_month(new Date())}>Posledních 30 dní</option>
		<option value={subtract_month(new Date(), 2)}>Posledních 60 dní</option>
		<option value={subtract_year(new Date())}>Poslední rok</option>
		<option value="custom">Vlastní datum</option>
	</select>

	{#if selected === 'custom'}
		<div class="flex w-full py-4 gap-4">
			<FormControl label="Od">
				<Dateinput bind:date={from} on:select={update_date} />
			</FormControl>
			<FormControl label="Do">
				<Dateinput min={from} bind:date={to} on:select={update_date} />
			</FormControl>
		</div>
	{/if}
</div>
