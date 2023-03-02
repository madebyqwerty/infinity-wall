<script lang="ts">
	import type { LayoutData } from './$types';
	import { get_minute_sklonovani } from '@utils/dates';
	import { goto } from '$app/navigation';
	import type { RecordsResponse } from '@pocketbase/types';
	import LanguagePill from '@components/LanguagePill.svelte';
	export let data: LayoutData;

	interface SortingFunctions {
		newest: (d: RecordsResponse[]) => RecordsResponse[];
		oldest: (d: RecordsResponse[]) => RecordsResponse[];
		hardest: (d: RecordsResponse[]) => RecordsResponse[];
		easiest: (d: RecordsResponse[]) => RecordsResponse[];
		shortest: (d: RecordsResponse[]) => RecordsResponse[];
		longest: (d: RecordsResponse[]) => RecordsResponse[];
	}

	const { records } = data;
	let sorted_records: RecordsResponse[] = records;

	let selected: keyof SortingFunctions = 'newest';

	const time = (date: string) => new Date(date).getTime();
	const sorting_functions: SortingFunctions = {
		newest: (d: RecordsResponse[]) => d.sort((a, b) => time(b.date) - time(a.date)),
		oldest: (d: RecordsResponse[]) => d.sort((a, b) => time(a.date) - time(b.date)),
		hardest: (d: RecordsResponse[]) => d.sort((a, b) => b.rating - a.rating),
		easiest: (d: RecordsResponse[]) => d.sort((a, b) => a.rating - b.rating),
		shortest: (d: RecordsResponse[]) => d.sort((a, b) => a.time - b.time),
		longest: (d: RecordsResponse[]) => d.sort((a, b) => b.time - a.time)
	};

	function update_sort(type: keyof SortingFunctions = selected) {
		console.log('Sorting by', type);
		selected = type;
		sorted_records = sorting_functions[type](records);
	}

	const header = ['Datum', 'Délka', 'Hodnocení'];
	const header_active_values: Array<Array<keyof SortingFunctions>> = [
		['newest', 'oldest'],
		['longest', 'shortest'],
		['hardest', 'easiest']
	];
</script>

<section id="data" class="bg-base-100 bg-opacity-90 rounded-md p-8 w-full col-span-4">
	<div
		class="flex xl:flex-row flex-col xl:items-center gap-2 text-base-content text-opacity-75 mb-4 "
	>
		<h2 class="text-4xl text-base-content">Moje záznamy</h2>
		<div class="flex-grow" />
		<a href="/create" class="btn btn-sm btn-primary">Přidat záznam</a>
		<a href="/backup/import" class="btn btn-ghost btn-sm">Importovat zálohu</a>
		<a href="/backup/export" class="btn btn-ghost btn-sm">Exportovat zálohu</a>
	</div>
	<table class="table w-full">
		<thead class="sticky top-16">
			<tr>
				<th />
				{#each header as header_text, i}
					{@const active =
						selected === header_active_values[i][0] || selected === header_active_values[i][1]}
					<th
						on:click={() =>
							update_sort(
								selected === header_active_values[i][0]
									? header_active_values[i][1]
									: header_active_values[i][0]
							)}
					>
						<button class="flex items-center select-none cursor-pointer uppercase">
							{header_text}
							<div class="swap swap-rotate {active ? 'text-base-content' : 'text-base-200'}">
								<iconify-icon
									icon="material-symbols:arrow-drop-up-sharp"
									width={20}
									class={selected === header_active_values[i][0] ? 'swap-on' : 'swap-off'}
								/>
								<iconify-icon
									icon="material-symbols:arrow-drop-down-sharp"
									width={20}
									class={selected === header_active_values[i][1] ? 'swap-on' : 'swap-off'}
								/>
							</div>
						</button>
					</th>
				{/each}
				<th>Programovací jazyk</th>
			</tr>
		</thead>
		<tbody>
			{#key sorted_records}
				{#each sorted_records as record, i (record.id)}
					<tr
						class="hover cursor-pointer"
						style="--delay: {i * 0.1}s"
						on:click={() => goto(`/record/${record.id}`, { noScroll: true })}
					>
						<th class="text-base-content text-opacity-50 font-bold">{i + 1}</th>
						<td>{new Date(record.date).toLocaleDateString('cs')}</td>
						<td>{record.time} {get_minute_sklonovani(record.time)}</td>
						<td>{'*'.repeat(record.rating)}</td>
						<td>
							<LanguagePill language={record.language ?? ''} />
						</td>
					</tr>
				{/each}
			{/key}
		</tbody>
	</table>
</section>

<style>
	tr {
		animation: appear 0.5s ease-in-out;
		animation-fill-mode: forwards;
		opacity: 0;
		animation-delay: var(--delay);
	}
</style>
