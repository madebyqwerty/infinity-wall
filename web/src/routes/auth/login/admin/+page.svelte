<script lang="ts">
	import { enhance } from '$app/forms';
	import { site_name } from '@utils';
	import type { ActionData } from '../$types';
	import { page } from '$app/stores';
	import Input from '@components/Input.svelte';

	$: auth_error = $page.form?.errors?.auth?.at(0) || '';
	$: email_error = $page.form?.errors.email?.at(0) || '';
	$: password_error = $page.form?.errors?.password?.at(0) || '';
</script>

<div class="grid place-items-center min-h-screen">
	<div class="card w-96 bg-base-300 text-neutral-content p-4 shadow-lg">
		<div class="card-body">
			<h1 class="card-title mb-8">
				Administrátorské přihlášení do UpShop {site_name}
			</h1>
			<div class="text-error">
				{auth_error}
			</div>

			<form method="POST" use:enhance>
				<Input
					error={email_error}
					label="E-mail"
					name="email"
					placeholder="admin@upshop.cz"
					type="text"
				/>

				<Input
					error={password_error}
					label="Heslo"
					name="password"
					placeholder="******"
					type="password"
				/>
				<button class="btn mt-4 max-w-xs" type="submit"> Přihlásit se </button>
			</form>
		</div>
	</div>
</div>
