<script lang="ts">
	import type { LayoutData } from './$types';
	import { get_minute_sklonovani } from '@utils/dates';
	import { goto } from '$app/navigation';
	import type { RecordsResponse } from '@pocketbase/types';
	import { date } from 'zod';
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

	function update_sort() {
		sorted_records = sorting_functions[selected](records);
	}
</script>

<section id="data" class="bg-base-100 bg-opacity-90 rounded-md p-8 w-full col-span-8">
	<div
		class="flex xl:flex-row flex-col xl:items-center gap-2 text-base-content text-opacity-75 mb-4 "
	>
		<h2 class="text-4xl text-base-content">Moje záznamy</h2>
		<div class="flex-grow" />
		<a href="/create" class="btn btn-sm btn-primary">Přidat záznam</a>
		<a href="/backup/import" class="btn btn-ghost btn-sm">Importovat zálohu</a>
		<a href="/backup/export" class="btn btn-ghost btn-sm">Exportovat zálohu</a>
	</div>
	<select
		class="select w-full max-w-xs select-sm my-4"
		bind:value={selected}
		on:change={update_sort}
	>
		<option disabled selected>Seřadit podle:</option>
		<option value="newest">Nejnovější</option>
		<option value="oldest">Nejstarší</option>
		<option value="hardest">Nejlepší</option>
		<option value="easiest">Nejhorší</option>
		<option value="shortest">Nejkratší</option>
		<option value="longest">Nejdelší</option>
	</select>
	<table class="table w-full">
		<thead class="sticky top-16">
			<tr>
				<th>Datum</th>
				<th>Délka</th>
				<th>Hodnocení</th>
				<th>Programovací jazyk</th>
			</tr>
		</thead>
		<tbody>
			{#key sorted_records}
				{#each sorted_records as record, i (record.id)}
					<tr
						class="hover cursor-pointer"
						on:click={() => goto(`/record/${record.id}`, { noScroll: true })}
						style="--delay:{i * 200}ms"
					>
						<td>{new Date(record.date).toLocaleDateString('cs')}</td>
						<td>{record.time} {get_minute_sklonovani(record.time)}</td>
						<td>{'*'.repeat(record.rating)}</td>
						<td>
							<div class="flex flex-wrap gap-1">
								<div class="badge badge-primary">
									{record.language}
								</div>
							</div>
						</td>
					</tr>
				{/each}
			{/key}
		</tbody>
	</table>
</section>

<style>
	@keyframes appear {
		from {
			opacity: 0;
			transform: translate(0, 20%);
		}
		to {
			transform: translate(0, 0);
			opacity: 100;
		}
	}

	tr {
		opacity: 0;
		animation: appear 0.5s ease-in-out;
		animation-fill-mode: forwards;
		animation-delay: var(--delay, 0ms);
	}
</style>
