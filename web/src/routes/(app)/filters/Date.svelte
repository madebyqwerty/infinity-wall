<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import {
		get_date_from_ddmmyyyy,
		get_date_in_ddmmyyyy,
		subtract_month,
		subtract_week,
		subtract_year
	} from '@utils/dates';
	import { page } from '$app/stores';
	import Dateinput from '@components/Dateinput.svelte';
	import FormControl from '@components/FormControl.svelte';

	let selected: Date;

	let from = get_date_from_ddmmyyyy(
		$page.url.searchParams.get('from') ?? get_date_in_ddmmyyyy(subtract_week(new Date()))
	);
	let to = new Date();

	async function update_date() {
		from = selected;
		to = new Date();

		await update_url();
	}

	async function update_url() {
		const url = $page.url;

		url.searchParams.set('from', get_date_in_ddmmyyyy(from));
		url.searchParams.set('to', get_date_in_ddmmyyyy(to));

		await goto(url.toString(), { noScroll: true });
		await invalidate('home');
	}
</script>

<div class="form-control">
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
	</select>

	<div class="flex py-4 gap-4">
		<FormControl label="Od">
			<Dateinput bind:date={from} on:select={update_url} />
		</FormControl>
		<FormControl label="Do">
			<Dateinput min={from} bind:date={to} on:select={update_url} />
		</FormControl>
	</div>
</div>
