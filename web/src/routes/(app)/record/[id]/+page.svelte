<script lang="ts">
	import Sidebar from '@components/Sidebar.svelte';
	import { get_text_color } from '@utils';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import LanguagePill from '@components/LanguagePill.svelte';
	import { page } from '$app/stores';
	import Stars from '@components/Stars.svelte';
	export let data: PageData;
</script>

<Sidebar
	route="/home{$page.url.search}"
	title="Záznam ze dne <br/>{new Date(data.record.date).toLocaleDateString('cs')}"
	description={data.record.description}
>
	<div class="grid grid-cols-2 gap-y-4">
		<div>
			<strong>Datum</strong>
			<strong>Délka</strong>
			<strong>Hodnocení</strong>
			<strong>Programovací jazyk</strong>
		</div>
		<div class="w-full">
			<div>{new Date(data.record.date).toLocaleDateString('cs')}</div>
			<div>{data.record.time}</div>
			<div><Stars number={data.record.rating} /></div>
			<div>
				<LanguagePill language={data.record.language ?? ''} />
			</div>
		</div>
	</div>
	<div class="flex items-center pt-8 btn-group">
		<a href="/edit/{data.record.id}{$page.url.search}" class="btn btn-primary gap-4">
			<iconify-icon icon="material-symbols:edit" />
			Upravit záznam
		</a>
		<form use:enhance method="POST">
			<input type="hidden" value={data.record.id} name="id" />
			<button type="submit" class="btn btn-error gap-2">
				<iconify-icon icon="mdi:trash-can" inline={true} width={22} />
				Smazat záznam
			</button>
		</form>
	</div>
</Sidebar>

<style>
	strong {
		@apply block;
	}

	.grid > * > * {
		@apply w-full border-b border-b-base-200 py-1.5;
	}
</style>
