<script lang="ts">
	import { enhance } from '$app/forms';
	import { site_name } from '@utils';
	import type { ActionData } from '../$types';

	export let form: ActionData;

	$: auth_error = form?.errors?.auth?.at(0) || '';
	$: email_error = form?.errors.email?.at(0) || '';
	$: password_error = form?.errors?.password?.at(0) || '';
</script>

<div class="grid place-items-center min-h-screen">
	<div class="card w-96 bg-base-300 text-neutral-content p-4 shadow-lg">
		<div class="card-body">
			<h1 class="card-title mb-8">
				Adminstrátorské přihlášení do UpShop {site_name}
			</h1>
			<div class="form-control">
				<div class="text-error">
					{auth_error}
				</div>
				<form method="POST" action="/auth/login" use:enhance>
					<input type="hidden" name="type" value="admins" />
					<label for="email" class="label"><span class="label-text">Email</span></label>
					<input
						type="email"
						name="email"
						id="email"
						class="input input-bordered w-full max-w-xs"
					/>
					<label for="email" class="label">
						<span class="label-text-alt text-error">{email_error}</span>
					</label>
					<label for="password" class="label"><span class="label-text">Heslo</span></label>
					<input
						type="password"
						name="password"
						id="password"
						class="input input-bordered w-full max-w-xs"
					/>
					<label for="password" class="label">
						<span class="label-text-alt text-error">{password_error}</span>
					</label>
					<button class="btn mt-4 max-w-xs" type="submit"> Přihlásit se </button>
				</form>
			</div>
		</div>
	</div>
</div>
