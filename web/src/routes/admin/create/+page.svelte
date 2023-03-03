<script lang="ts">
	import Input from '@components/Input.svelte';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { PageData, ActionData } from './$types';
	import Sidebar from '@components/Sidebar.svelte';
	import { goto, invalidate } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;

	const is_create = $page.url.searchParams.get('edit') === null;

	const title = is_create ? 'Vytvořit nového uživatele' : 'Úprava uživatele';
	const button_title = is_create ? 'Vytvořit' : 'Upravit';

	$: name_error = form?.name?.at(0) || '';
	$: email_error = form?.email?.at(0) || '';
	$: username_error = form?.username?.at(0) || '';
	$: password_error = form?.password?.at(0) || '';
	$: pocketbase_error = form?.pocketbase || '';
</script>

<Sidebar {title} route="/admin">
	{#if pocketbase_error}
		<div class="alert alert-error">
			{pocketbase_error}
		</div>
	{/if}

	<form use:enhance method="POST" class="flex flex-col gap-4" on:submit={() => invalidate('admin')}>
		<input type="hidden" value={data.user?.id} name="id" />
		<Input
			placeholder="Martin Novák"
			value={data.user?.name || ''}
			error={name_error}
			label="Jméno"
			name="name"
			type="text"
		/>

		<Input
			error={email_error}
			label="E-mail"
			name="email"
			placeholder="martin.novak@upshop.cz"
			type="email"
			value={data.user?.email || ''}
		/>

		<Input
			error={username_error}
			label="Uživatelské jméno"
			name="username"
			placeholder="martin.novak"
			type="text"
			value={data.user?.username || ''}
		/>

		<Input
			error={password_error}
			label="Heslo"
			name="password"
			placeholder="********"
			type="password"
		/>

		<button type="submit" class="btn btn-primary"> {button_title} </button>
	</form>
</Sidebar>
