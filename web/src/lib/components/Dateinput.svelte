<script>
	import { DateInput } from 'date-picker-svelte';

	export let name = 'date';

	export let date_string = '';
	let date = new Date();
	$: date_string = date.toISOString();
</script>

<input type="hidden" bind:value={date_string} {name} />

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
