<script lang="ts">
	import { enhance } from '$app/forms';
	import { site_name } from '@utils';
	import type { ActionData } from './$types';
	import Input from '@components/Input.svelte';

	export let form: ActionData;

	$: auth_error = form?.errors?.auth?.at(0) || '';
	$: email_error = form?.errors.email?.at(0) || '';
	$: password_error = form?.errors?.password?.at(0) || '';
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col xl:flex-row-reverse gap-16">
		<div class="text-center xl:text-left">
			<h1 class="text-5xl font-bold">
				Přihlašte se do <br /> <span class="text-primary">UpShop {site_name}</span>
			</h1>

			<div class="alert alert-info shadow-lg mt-6">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current flex-shrink-0 w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>
						<strong>Verze: <code>{__VERSION__}</code></strong><br />
						Prosím zkontrolujte že verze opdovídá verzi na
						<a
							href="https://github.com/tomaskebrle/up-shop-qwerty/blob/main/web/package.json"
							class="link text-info-content">Githubu</a
						>
					</span>
				</div>
			</div>
		</div>
		<form
			class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
			method="POST"
			use:enhance
		>
			<div class="card-body">
				<div class="text-error">
					{auth_error}
				</div>

				<Input
					error={email_error}
					label="E-mail nebo uživatelské jméno"
					name="email"
					placeholder="martin.novak@upshop.cz"
					type="text"
				/>

				<Input
					error={password_error}
					label="Heslo"
					name="password"
					placeholder="********"
					type="password"
				/>

				<div class="form-control mt-6">
					<button class="btn btn-primary" type="submit">Přihlásit se</button>
				</div>

				<div class="flex w-full flex-col">
					<a href="/auth/login/admin" class="link link-secondary">Administrátorské přihlášení</a>
				</div>
			</div>
		</form>
	</div>
</div>
