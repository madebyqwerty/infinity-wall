<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { get_text_color } from '@utils';
	import { language_colors, language_names } from '@utils/languages';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
	console.log(data)
</script>

<Sidebar
	route="/"
	title="Záznam ze dne <br/>{new Date(data.record.date).toLocaleDateString('cs')}"
	description={data.record.description}
	size="max-w-lg"
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
	<div class="flex flex-row gap-1">
		<a href="/edit/{data.record.id}" class="btn btn-outline flex-grow">Upravit záznam</a>
		<form use:enhance method="POST">
			<input type="hidden" value={data.record.id} name="id" />
			<button type="submit" class="btn btn-outline btn-error">
				<iconify-icon
					icon="ion:trash-outline"
					inline={true}
					width={30}
				/>
			</button>
		</form>
	</div>
</Sidebar>
