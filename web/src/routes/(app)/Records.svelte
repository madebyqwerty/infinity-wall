<script lang="ts">
	import type { LayoutData } from './$types';
	import { get_minute_sklonovani } from '@utils/dates';
	import { goto } from '$app/navigation';

	export let data: LayoutData;
	const { records } = data;
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
			{#each records as record (record.id)}
				<tr
					class="hover cursor-pointer"
					on:click={() => goto(`/record/${record.id}`, { noScroll: true })}
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
		</tbody>
	</table>
</section>
