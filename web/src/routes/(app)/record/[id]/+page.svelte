<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { get_text_color } from '@utils';
	import { language_colors, language_names } from '@utils/languages';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data)
</script>

<Sidebar
	route="/"
	title="Záznam ze dne {new Date(data.record.date).toLocaleDateString('cs')}"
	description={data.record.description}
	size="lg"
>
	<div class="grid grid-cols-8">
		<div class="col-span-3">
			<strong>Datum</strong><br />
			<strong>Délka</strong> <br />
			<strong>Hodnocení</strong> <br />
			<strong>Programovací jazyk</strong>
		</div>
		<div class="col-span-5">
			<div>{new Date(data.record.date).toLocaleDateString('cs')}</div>
			<div>{data.record.time}</div>
			<div>{'*'.repeat(data.record.rating)}</div>
			<div class="flex flex-wrap gap-1">
				<div class="badge badge-primary">
					{data.record.language}
				</div>
			</div>
		</div>
	</div>
	<a href="/edit/{data.record.id}" class="btn btn-outline w-full">Upravit záznam</a>
</Sidebar>
