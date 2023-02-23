<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { get_text_color } from '@utils';
	import { language_colors, language_names } from '@utils/languages';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Sidebar
	route="/"
	title="Záznam ze dne {new Date(data.record.time).toLocaleDateString('cs')}"
	description={data.record.description}
>
	<div class="grid grid-cols-8">
		<div class="col-span-3">
			<strong>Datum</strong><br />
			<strong>Délka</strong> <br />
			<strong>Hodnocení</strong> <br />
			<strong>Programovací jazyky</strong>
		</div>
		<div class="col-span-5">
			<div>{new Date(data.record.time).toLocaleDateString('cs')}</div>
			<div>{data.record.time}</div>
			<div>{'*'.repeat(data.record.rating)}</div>
			<div class="flex flex-wrap gap-1">
				{#each data.record.language as language}
					<div
						class="badge"
						style="background-color: {language_colors[language]}; border-color: {language_colors[
							language
						]}; color: {get_text_color(language_colors[language])};"
					>
						{language_names[language]}
					</div>
				{/each}
			</div>
		</div>
	</div>
</Sidebar>
