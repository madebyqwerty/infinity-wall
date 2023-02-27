<script lang="ts">
	import { get_date_in_ddmmyyyy } from '@utils/dates';
	import { DateInput } from 'date-picker-svelte';

	export let name = 'date';

	export let date_string = '';
	export let date = new Date();
	export let min: Date | undefined = undefined;

	$: date_string = get_date_in_ddmmyyyy(date);
</script>

<input type="hidden" bind:value={date_string} {name} />

<DateInput
	closeOnSelection={true}
	bind:value={date}
	{min}
	on:select
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

<style>
	:global(:root) {
		--date-picker-background: hsl(var(--b1));
		--date-picker-foreground: hsl(var(--bc));
		--date-picker-highlight-border: hsl(var(--pf));
		--date-picker-selected-color: hsl(var(--pc));
		--date-input-width: 100%;
	}
</style>
