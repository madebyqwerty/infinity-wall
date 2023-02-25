<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { subtract_month, subtract_week, subtract_year } from '@utils/dates';
	import { page } from '$app/stores';

	let selected: Date;

	async function update_date(e: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		const url = $page.url;

		url.searchParams.set('from', selected.toISOString());
		url.searchParams.set('to', new Date().toISOString());

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
		<option>Vlastní datum</option>
	</select>
</div>
