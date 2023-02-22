<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { get_minute_sklonovani } from '@utils/dates';
	import { language_colors, language_names } from '@utils/languages';

	const { records } = $page.data as PageData;
</script>

<section id="data" class="my-12">
	<h2 class="text-6xl text-primary">Moje záznamy</h2>
	<!-- Each block for records -->
	<div class="overflow-x-auto">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th>Datum</th>
					<th>Délka</th>
					<th>Programovací jazyky</th>
					<th>Favorite Color</th>
				</tr>
			</thead>
			<tbody>
				{#each records as record (record.id)}
					<tr class="hover">
						<th>{new Date(record.date).toLocaleDateString('cs')}</th>
						<td>{record.time} {get_minute_sklonovani(record.time)}</td>
						<td class="flex flex-wrap gap-1">
							{#each record.language as language}
								<div
									class="badge"
									style="background-color: {language_colors[
										language
									]}; border-color: {language_colors[language]}"
								>
									{language_names[language]}
								</div>
							{/each}
						</td>
						<td>Purple</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
